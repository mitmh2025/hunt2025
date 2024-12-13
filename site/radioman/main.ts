import { newFrontendClient } from "hunt2025/lib/api/frontend_client";
import {
  connect as redisConnect,
  teamRegistrationLog,
} from "hunt2025/src/api/redis";
import { newLogTailer } from "hunt2025/src/frontend/server/dataset_tailer";
import { Client } from "./tbapi";
import { TeamInfoIntermediate } from "hunt2025/src/api/logic";

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

  const teamInfos: Map<number, TeamInfoIntermediate> = new Map();

  teamRegistrationLogTailer.watchLog((items) => {
    for (const entry of items) {
      const teamInfo = teamInfos.get(entry.team_id) ?? new TeamInfoIntermediate();
      teamInfos.set(entry.team_id, teamInfo.reduce(entry));
    }
    console.log("After batch teams", teamInfos);
  });

  await teamRegistrationLogTailer.readyPromise();

  console.log("radioman running");
}
main({ redisUrl, apiUrl, frontendApiSecret }).catch((err: unknown) => {
  console.error(err);
});
