import * as k8s from "@kubernetes/client-node";
import { initClient, initContract } from "@ts-rest/core";
import { newFrontendClient } from "hunt2025/lib/api/frontend_client";
import {
  TeamInfoIntermediate,
  TeamStateIntermediate,
} from "hunt2025/src/api/logic";
import {
  connect as redisConnect,
  activityLog,
  teamRegistrationLog,
} from "hunt2025/src/api/redis";
import { newLogTailer } from "hunt2025/src/frontend/server/dataset_tailer";
import HUNT from "hunt2025/src/huntdata";
import { K8s, kind } from "kubernetes-fluent-client";
import { WatchPhase } from "kubernetes-fluent-client/dist/fluent/types";
import { Queue } from "modern-async";
import pRetry from "p-retry"; // eslint-disable-line import/default, import/no-named-as-default -- eslint fails to parse the import
import { z } from "zod";

let apiUrl = process.env.API_BASE_URL;
if (process.env.NODE_ENV === "development" && !apiUrl) {
  apiUrl = `http://localhost:3000/api`;
}
if (!apiUrl) {
  throw new Error("$API_BASE_URL was not configured");
}

const frontendApiSecret = process.env.FRONTEND_API_SECRET;
if (!frontendApiSecret) {
  throw new Error("$FRONTEND_API_SECRET was not configured");
}

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("$REDIS_URL was not configured");
}

const outputBaseUrl = process.env.OUTPUT_BASE_URL ?? "";
if (!outputBaseUrl) {
  throw new Error("$OUTPUT_BASE_URL was not configured");
}

const liquidsoapImage = process.env.LIQUIDSOAP_IMAGE;
if (!liquidsoapImage) {
  throw new Error("$LIQUIDSOAP_IMAGE was not configured");
}

const storageClassName = process.env.PVC_STORAGE_CLASS_NAME;

const RadioTeamStateSchema = z.object({
  team_id: z.number(),
  epoch: z.number(),
  quixotic_shoe_enabled: z.boolean(),
  icy_box_enabled: z.boolean(),
  interaction: z.boolean(),
});

type RadioTeamState = z.infer<typeof RadioTeamStateSchema>;

const c = initContract();
const radioContract = c.router({
  setTeamState: {
    method: "POST",
    path: "/setTeamState",
    body: RadioTeamStateSchema,
    responses: {
      200: c.otherResponse({ contentType: "text/plain", body: z.string() }),
      400: c.otherResponse({ contentType: "text/plain", body: z.string() }),
      412: c.otherResponse({ contentType: "text/plain", body: z.string() }),
    },
    strictStatusCodes: true,
  },
});

const namespace = "radio";

function catch404(e: unknown): undefined {
  if (e instanceof k8s.ApiException && e.code === 404) {
    return undefined;
  }
  throw e;
}

async function main({
  redisUrl,
  apiUrl,
  frontendApiSecret,
}: {
  redisUrl: string;
  apiUrl: string;
  frontendApiSecret: string;
}) {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();

  const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
  const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
  const objectApi = kc.makeApiClient(k8s.KubernetesObjectApi);

  try {
    await coreV1Api.readNamespace({
      name: namespace,
    });
  } catch (e: unknown) {
    await coreV1Api.createNamespace({
      body: {
        metadata: {
          name: namespace,
        },
      },
    });
  }
  try {
    await coreV1Api.readNamespacedService({
      namespace,
      name: "radio",
    });
  } catch (e: unknown) {
    await coreV1Api.createNamespacedService({
      namespace,
      body: {
        metadata: {
          namespace,
          name: "radio",
          labels: {
            app: "radio",
          },
        },
        spec: {
          clusterIP: "None",
          selector: {
            app: "radio",
          },
        },
      },
    });
  }

  const redisClient = await redisConnect(redisUrl);

  const frontendApiClient = newFrontendClient(apiUrl, {
    type: "frontend",
    frontendSecret: frontendApiSecret,
  });

  const activityLogTailer = newLogTailer({
    redisClient,
    fetchMethod: frontendApiClient.getFullActivityLog.bind(frontendApiClient),
    log: activityLog,
  });
  activityLogTailer.start();

  const teamRegistrationLogTailer = newLogTailer({
    redisClient,
    fetchMethod:
      frontendApiClient.getFullTeamRegistrationLog.bind(frontendApiClient),
    log: teamRegistrationLog,
  });
  teamRegistrationLogTailer.start();

  const teamInfos = new Map<number, TeamInfoIntermediate>();
  const teamStates = new Map<number, TeamStateIntermediate>();
  let emptyTeamState = new TeamStateIntermediate(HUNT);

  const syncQueue = new Queue(1);

  const apply = <T extends k8s.KubernetesObject>(spec: T) =>
    objectApi.patch<T>(
      spec,
      undefined, // pretty
      undefined, // dryRun
      "sync2k8s", // fieldManager
      true, // force
      k8s.PatchStrategy.ServerSideApply,
    );

  const processTeamInfo = async (teamId: number) => {
    const team = teamInfos.get(teamId);
    if (!team) {
      console.warn(`Team ${teamId} doesn't have registration info yet`);
      return;
    }
    const { registration } = team;
    if (!registration) {
      console.warn(`Team ${teamId} doesn't have registration info yet`);
      return;
    }
    const ssName = `radio-${teamId}`;
    const existing = await appsV1Api
      .readNamespacedStatefulSet({
        namespace,
        name: ssName,
      })
      .catch(catch404);
    const shouldExist = !team.deactivated;
    if (!shouldExist) {
      if (existing) {
        await appsV1Api.deleteNamespacedStatefulSet({
          namespace,
          name: ssName,
        });
      }
      // Nothing else to do.
      return;
    }
    const labels = {
      app: "radio",
      teamId: `${teamId}`,
    };
    const ensureSecret = async () => {
      const name = `radio-${teamId}`;
      const existing = await coreV1Api
        .readNamespacedSecret({
          namespace,
          name,
        })
        .catch(catch404);
      if (existing) {
        const existingOutputUrl = Buffer.from(
          existing.data?.OUTPUT_URL ?? "",
          "base64",
        ).toString("utf8");
        if (existingOutputUrl.startsWith(outputBaseUrl)) {
          return name;
        }
      }
      // TODO: Any other condition that should also trigger update?
      const path = `teams/${teamId}/radio`;
      const resp = await frontendApiClient.mintToken({
        body: {
          media: [
            {
              action: "publish",
              path,
            },
          ],
        },
      });
      if (resp.status !== 200) {
        throw new Error("failed to mint token");
      }
      await apply<k8s.V1Secret>({
        apiVersion: "v1",
        kind: "Secret",
        metadata: {
          namespace,
          name,
        },
        stringData: {
          OUTPUT_URL: `${outputBaseUrl}/${path}?jwt=${resp.body}`,
        },
      });
      return name;
    };
    const secretName = await ensureSecret();
    // Server-side apply can be called an arbitrary number of times
    await apply<k8s.V1StatefulSet>({
      apiVersion: "apps/v1",
      kind: "StatefulSet",
      metadata: {
        namespace,
        name: ssName,
        labels,
      },
      spec: {
        selector: {
          matchLabels: labels,
        },
        serviceName: "radio",
        volumeClaimTemplates: [
          {
            metadata: {
              name: "state",
            },
            spec: {
              accessModes: ["ReadWriteOnce"],
              resources: {
                requests: {
                  storage: "100Mi",
                },
              },
              storageClassName,
            },
          },
        ],
        template: {
          metadata: {
            labels,
          },
          spec: {
            containers: [
              {
                name: "liquidsoap",
                image: liquidsoapImage,
                env: [
                  {
                    name: "TEAM_ID",
                    value: `${teamId}`,
                  },
                  {
                    name: "STATE_DIRECTORY",
                    value: "/state",
                  },
                  {
                    name: "OUTPUT_URL",
                    valueFrom: {
                      secretKeyRef: {
                        name: secretName,
                        key: "OUTPUT_URL",
                      },
                    },
                  },
                ],
                livenessProbe: {
                  httpGet: {
                    path: "/healthz",
                    port: 80,
                  },
                  // Wait up to 5 minute for the container to become ready again.
                  failureThreshold: 300,
                  periodSeconds: 1,
                },
                readinessProbe: {
                  httpGet: {
                    path: "/healthz",
                    port: 80,
                  },
                  // Wait up to 1 minute for the container to become ready again.
                  failureThreshold: 60,
                  periodSeconds: 1,
                },
                startupProbe: {
                  httpGet: {
                    path: "/healthz",
                    port: 80,
                  },
                  // Wait up to 5 minute for the container to become ready.
                  failureThreshold: 300,
                  periodSeconds: 1,
                },
                volumeMounts: [
                  {
                    name: "state",
                    mountPath: "/state",
                  },
                ],
              },
            ],
          },
        },
      },
    });
    // StatefulSet exists now
  };

  teamRegistrationLogTailer.watchLog((items) => {
    const modified = new Set<number>();
    for (const entry of items) {
      const teamInfo =
        teamInfos.get(entry.team_id) ?? new TeamInfoIntermediate();
      teamInfos.set(entry.team_id, teamInfo.reduce(entry));
      modified.add(entry.team_id);
    }
    console.log("team registration modified for", modified);
    for (const teamId of modified) {
      syncQueue
        .exec(() => processTeamInfo(teamId))
        .catch((err: unknown) => {
          console.warn(err);
        });
    }
  });

  await teamRegistrationLogTailer.readyPromise();

  const radioTeamStates = new Map<number, RadioTeamState>();
  const radioTeamStateSubscribers = new Map<number, (() => void)[]>();

  const processTeamState = (teamId: number) => {
    // We received activity log update(s) for the team.
    const teamState = teamStates.get(teamId);
    if (!teamState) {
      console.warn(
        `processTeamState called for ${teamId} which doesn't have state`,
      );
      return;
    }
    const radioTeamState: RadioTeamState = {
      team_id: teamId,
      epoch: teamState.epoch,
      quixotic_shoe_enabled: teamState.gates_satisfied.has("ptg03"),
      icy_box_enabled: teamState.gates_satisfied.has("ptg04"),
      interaction: false, // TODO
    };
    radioTeamStates.set(teamId, radioTeamState);
    const subs = radioTeamStateSubscribers.get(teamId) ?? [];
    radioTeamStateSubscribers.delete(teamId);
    for (const s of subs) {
      s();
    }
  };

  // uid to AbortController
  const podSyncers = new Map<string, AbortController>();

  const launchPodSyncer = (teamId: number, podIP: string) => {
    const controller = new AbortController();
    const radioClient = initClient(radioContract, {
      baseUrl: `http://${podIP}`,
      throwOnUnknownStatus: true,
    });

    const aborted = new Promise<void>((_, reject) => {
      if (controller.signal.aborted) {
        reject(controller.signal.reason as Error);
      }
      controller.signal.addEventListener("abort", () => {
        reject(controller.signal.reason as Error);
      });
    });

    void (async () => {
      for (;;) {
        const updated = new Promise<void>((resolve) => {
          radioTeamStateSubscribers.set(teamId, [
            ...(radioTeamStateSubscribers.get(teamId) ?? []),
            resolve,
          ]);
        });
        await pRetry(
          async () => {
            const rts = radioTeamStates.get(teamId);
            if (!rts) {
              throw new Error("RadioTeamState not ready yet?!");
            }
            const resp = await radioClient.setTeamState({ body: rts });
            if (resp.status === 400) {
              console.error("found wrong team at", podIP, resp.body);
              controller.abort();
              return;
            }
            if (resp.status === 200) {
              console.log(
                "sent epoch",
                rts.epoch,
                "for team",
                teamId,
                "to",
                podIP,
              );
            } else {
              console.log("stale team state for", podIP, rts, resp.body);
            }
            // Whether it succeeded (200) or was stale (412), we have to wait for the next update.
          },
          {
            onFailedAttempt: (err) => {
              console.warn(
                "failed to propagate team",
                teamId,
                "state to",
                podIP,
                err,
              );
            },
            forever: true,
            minTimeout: 100,
            maxTimeout: 1000,
            signal: controller.signal,
          },
        );
        await Promise.race([updated, aborted]);
      }
    })().catch((e: unknown) => {
      console.log("error watching", teamId, "on IP", podIP, e);
    });

    return controller;
  };

  const watcher = K8s(kind.Pod)
    .WithLabel("app", "radio")
    .Watch((pod, phase) => {
      const uid = pod.metadata?.uid;
      const name = pod.metadata?.name;
      const teamId = parseInt(pod.metadata?.labels?.teamId ?? "", 10);
      if (!uid || !name || !teamId) {
        console.warn("received incomplete pod update", phase, pod);
        return;
      }
      const podPhase = pod.status?.phase;
      const podIP = pod.status?.podIP;
      if (
        (phase === WatchPhase.Added || phase === WatchPhase.Modified) &&
        podPhase === "Running" &&
        podIP
      ) {
        // New or modified pod, make sure we're trying to sync it.
        if (!podSyncers.has(uid)) {
          console.log("starting new syncer for", teamId, "on", podIP);
          podSyncers.set(uid, launchPodSyncer(teamId, podIP));
        }
      } else {
        // Pod is not ready yet or anymore; stop trying to sync it.
        const syncer = podSyncers.get(uid);
        if (syncer) {
          console.log("aborting syncer for teamId", teamId, "on", uid);
          syncer.abort();
          podSyncers.delete(uid);
        }
      }
    });

  activityLogTailer.watchLog((items) => {
    const modified = new Set<number>();
    for (const entry of items) {
      const teamId = entry.team_id;
      const teamIds = new Set<number>();
      if (teamId === undefined) {
        emptyTeamState = emptyTeamState.reduce(entry);
        for (const teamId of teamStates.keys()) {
          teamIds.add(teamId);
        }
      } else {
        teamIds.add(teamId);
      }
      for (const teamId of teamIds) {
        const teamState =
          teamStates.get(teamId) ??
          new TeamStateIntermediate(HUNT, emptyTeamState);
        teamStates.set(teamId, teamState.reduce(entry));
        modified.add(teamId);
      }
    }
    console.log("team info updated for", modified);
    for (const teamId of modified) {
      syncQueue
        .exec(() => {
          processTeamState(teamId);
        })
        .catch((err: unknown) => {
          console.warn(err);
        });
    }
  });

  await activityLogTailer.readyPromise();

  void watcher.start();

  console.log("sync2k8s running");
}
main({ redisUrl, apiUrl, frontendApiSecret }).catch((err: unknown) => {
  console.error(err);
});
