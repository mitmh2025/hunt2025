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
import { z } from "zod";
import { type BaseCustomer, check, Client, type Customer } from "./tbapi";

const AdditionalInfoSchema = z
  .object({
    teamId: z.number().optional(),
    teamInfoEpoch: z.number().optional(),
    teamStateEpoch: z.number().optional(),
  })
  .passthrough();

const DeviceAttributesSchema = z
  .object({
    en_knocks: z.boolean().optional(),
    en_funaround: z.boolean().optional(),
    en_rickroll: z.boolean().optional(),
    en_numbers: z.boolean().optional(),
    whep_url: z.string().optional(),
  })
  .passthrough();
type DeviceAttributes = z.infer<typeof DeviceAttributesSchema>;

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

const mediaBaseUrl = process.env.MEDIA_BASE_URL;

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("$REDIS_URL was not configured");
}
const tbArgs = {
  baseUrl: process.env.TB_BASE_URL ?? "",
  username: process.env.TB_USERNAME ?? "",
  password: process.env.TB_PASSWORD ?? "",
};
if (!tbArgs.baseUrl) {
  throw new Error("$TB_BASE_URL was not configured");
}
if (!tbArgs.username) {
  throw new Error("$TB_USERNAME was not configured");
}
if (!tbArgs.password) {
  throw new Error("$TB_PASSWORD was not configured");
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
  const tbClient = new Client(tbArgs);

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

  const customers = await tbClient.listCustomers();
  console.log("customers", customers);

  const customersByTeamId = new Map<number, Customer>();
  const deviceAttributesByTeamId = new Map<number, DeviceAttributes>();
  for (const customer of customers) {
    try {
      const additionalInfo = AdditionalInfoSchema.parse(
        customer.additionalInfo,
      );
      if (additionalInfo.teamId) {
        customersByTeamId.set(additionalInfo.teamId, customer);
        const resp = await tbClient.client.telemetry.getAttributesByScope({
          params: {
            entityType: "CUSTOMER",
            entityId: customer.id.id,
            scope: "SERVER_SCOPE",
          },
          query: {
            keys: ["device_attributes"],
          },
        });
        if (resp.status === 200) {
          for (const attr of resp.body) {
            if (attr.key === "device_attributes") {
              try {
                deviceAttributesByTeamId.set(
                  additionalInfo.teamId,
                  DeviceAttributesSchema.parse(attr.value),
                );
              } catch (e: unknown) {
                // ignore wrong schema, we'll just blow it away
              }
            }
          }
        }
      }
    } catch (e) {
      console.log("Customer without team", customer);
    }
  }

  const ws = await tbClient.connectWS();
  console.log(
    "result",
    await ws.sendCommand({
      type: "ENTITY_DATA" as const,
      query: {
        entityFilter: {
          type: "entityType",
          entityType: "CUSTOMER",
        },
        pageLink: {
          pageSize: 1000,
          page: 0,
        },
      },
    }),
  );

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
    const baseCustomer: BaseCustomer | Customer = customersByTeamId.get(
      teamId,
    ) ?? {
      title: "",
      additionalInfo: {
        teamId,
      },
    };
    let modified = false;
    const additionalInfo = AdditionalInfoSchema.parse(
      baseCustomer.additionalInfo,
    );
    if ((additionalInfo.teamInfoEpoch ?? 0) < team.epoch) {
      baseCustomer.title = `${registration.name} (${registration.username})`;
      additionalInfo.teamInfoEpoch = team.epoch;
      baseCustomer.additionalInfo = additionalInfo;
      modified = true;
    }
    let customer: Customer;
    if (!baseCustomer.id?.id || !("createdTime" in baseCustomer)) {
      customer = await tbClient.client.customer
        .save({
          body: baseCustomer,
        })
        .then(check);
      customersByTeamId.set(teamId, customer);
      modified = false;
    } else {
      customer = baseCustomer;
    }
    const teamState = teamStates.get(teamId);
    if (teamState && (additionalInfo.teamStateEpoch ?? 0) <= teamState.epoch) {
      // en_knocks should be set to true when practical-fighter is unlocked (and remain true). Prior to that it can be unset or false, the radio treats them the same
      // en_funaround should be set to true when dimpled-star is unlocked. (Same deal)
      // en_rickroll should be set to true when the blacklight mode for giant-switch is unlocked
      // en_numbers should be set to true when diligent-spy is unlocked
      const oldDeviceAttributes = deviceAttributesByTeamId.get(teamId);
      const deviceAttributes = {
        ...oldDeviceAttributes,
        en_knocks: teamState.puzzles_unlocked.has("songs_on_the_radio"),
        en_funaround: teamState.puzzles_unlocked.has("the_thief"),
        en_rickroll: teamState.puzzles_unlocked.has("given_up_blacklight"),
        en_numbers: teamState.puzzles_unlocked.has("can_do_transmissions"),
      };
      if (mediaBaseUrl && deviceAttributes.whep_url === undefined) {
        const path = `teams/${teamId}/radio`;
        const resp = await frontendApiClient.mintToken({
          body: {
            media: [
              {
                action: "read",
                path,
              },
            ],
          },
        });
        if (resp.status === 200) {
          deviceAttributes.whep_url = `${mediaBaseUrl}/${path}?jwt=${resp.body}`;
        } else {
          console.warn("Failed to mint token for", teamId, resp);
        }
      }
      if (
        oldDeviceAttributes?.en_knocks !== deviceAttributes.en_knocks ||
        oldDeviceAttributes.en_funaround !== deviceAttributes.en_funaround ||
        oldDeviceAttributes.en_numbers !== deviceAttributes.en_numbers ||
        oldDeviceAttributes.whep_url !== deviceAttributes.whep_url
      ) {
        await tbClient.client.telemetry
          .saveEntityAttributes({
            params: {
              entityType: "CUSTOMER",
              entityId: customer.id.id,
              scope: "SERVER_SCOPE",
            },
            body: {
              device_attributes: deviceAttributes,
            },
          })
          .then(check);
        deviceAttributesByTeamId.set(teamId, deviceAttributes);
        modified = true;
      }
      if ((additionalInfo.teamStateEpoch ?? 0) < teamState.epoch) {
        additionalInfo.teamStateEpoch = teamState.epoch;
        customer.additionalInfo = additionalInfo;
      }
    }
    if (modified) {
      customer = await tbClient.client.customer
        .save({
          body: customer,
        })
        .then(check);
      customersByTeamId.set(teamId, customer);
    }
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

  console.log("radioman running");
}
main({ redisUrl, apiUrl, frontendApiSecret }).catch((err: unknown) => {
  console.error(err);
});
