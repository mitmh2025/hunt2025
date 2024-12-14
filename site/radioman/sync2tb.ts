import { newFrontendClient } from "hunt2025/lib/api/frontend_client";
import { TeamInfoIntermediate } from "hunt2025/src/api/logic";
import {
  connect as redisConnect,
  teamRegistrationLog,
} from "hunt2025/src/api/redis";
import { newLogTailer } from "hunt2025/src/frontend/server/dataset_tailer";
import { z } from "zod";
import { type BaseCustomer, check, Client, type Customer } from "./tbapi";

const AdditionalInfoSchema = z
  .object({
    teamId: z.number().optional(),
    teamInfoEpoch: z.number().optional(),
  })
  .passthrough();

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

  const teamRegistrationLogTailer = newLogTailer({
    redisClient,
    fetchMethod:
      frontendApiClient.getFullTeamRegistrationLog.bind(frontendApiClient),
    log: teamRegistrationLog,
  });

  const customers = await tbClient.listCustomers();
  console.log("customers", customers);

  const customersByTeamId = new Map<number, Customer>();
  for (const customer of customers) {
    try {
      const additionalInfo = AdditionalInfoSchema.parse(
        customer.additionalInfo,
      );
      if (additionalInfo.teamId) {
        customersByTeamId.set(additionalInfo.teamId, customer);
      }
    } catch (e) {
      console.log("Customer without team", customer);
    }
  }

  const teamInfos = new Map<number, TeamInfoIntermediate>();

  const processTeamInfo = async (teamId: number) => {
    const team = teamInfos.get(teamId);
    if (!team) {
      throw new Error("missing TeamInfoIntermediate");
    }
    const { registration } = team;
    if (!registration) {
      console.warn(`Team ${teamId} doesn't have registration info yet`);
      return;
    }
    const customer: BaseCustomer = customersByTeamId.get(teamId) ?? {
      title: "",
      additionalInfo: {
        teamId,
      },
    };
    const additionalInfo = AdditionalInfoSchema.parse(customer.additionalInfo);
    if ((additionalInfo.teamInfoEpoch ?? 0) >= team.epoch) {
      console.warn(
        `Team ${teamId} already has epoch ${additionalInfo.teamInfoEpoch}; ignoring stale epoch ${team.epoch}`,
      );
      return;
    }
    customer.title = `${registration.name} (${registration.username})`;
    additionalInfo.teamInfoEpoch = team.epoch;
    customer.additionalInfo = additionalInfo;
    const newCustomer = await tbClient.client.customer
      .save({
        body: customer,
      })
      .then(check);
    customersByTeamId.set(teamId, newCustomer);
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
    (async () => {
      for (const teamId of modified) {
        await processTeamInfo(teamId);
      }
    })().catch((err: unknown) => {
      console.warn(err);
    });
  });

  await teamRegistrationLogTailer.readyPromise();

  console.log("radioman running");
}
main({ redisUrl, apiUrl, frontendApiSecret }).catch((err: unknown) => {
  console.error(err);
});
