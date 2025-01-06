import * as k8s from "@kubernetes/client-node";
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
import { Queue } from "modern-async";

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

const liquidsoapImage = process.env.LIQUIDSOAP_IMAGE;
if (!liquidsoapImage) {
  throw new Error("$LIQUIDSOAP_IMAGE was not configured");
}

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

  const processTeam = async (teamId: number) => {
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
    // Server-side apply can be called an arbitrary number of times
    await objectApi.patch<k8s.V1StatefulSet>(
      {
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
          template: {
            metadata: {
              labels,
            },
            spec: {
              containers: [
                {
                  name: "liquidsoap",
                  image: liquidsoapImage,
                },
              ],
            },
          },
        },
      },
      undefined, // pretty
      undefined, // dryRun
      "sync2k8s", // fieldManager
      true, // force
      k8s.PatchStrategy.ServerSideApply,
    );
  };

  teamRegistrationLogTailer.watchLog((items) => {
    const modified = new Set<number>();
    for (const entry of items) {
      const teamInfo =
        teamInfos.get(entry.team_id) ?? new TeamInfoIntermediate();
      teamInfos.set(entry.team_id, teamInfo.reduce(entry));
      modified.add(entry.team_id);
    }
    console.log("After batch teams", teamInfos);
    for (const teamId of modified) {
      syncQueue
        .exec(() => processTeam(teamId))
        .catch((err: unknown) => {
          console.warn(err);
        });
    }
  });

  await teamRegistrationLogTailer.readyPromise();

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
    console.log("After batch teams", teamStates);
    for (const teamId of modified) {
      syncQueue
        .exec(() => processTeam(teamId))
        .catch((err: unknown) => {
          console.warn(err);
        });
    }
  });

  await activityLogTailer.readyPromise();

  console.log("sync2k8s running");
}
main({ redisUrl, apiUrl, frontendApiSecret }).catch((err: unknown) => {
  console.error(err);
});
