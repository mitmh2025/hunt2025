import { newFrontendClient } from "hunt2025/lib/api/frontend_client";
import {
  connect as redisConnect,
  teamRegistrationLog,
} from "hunt2025/src/api/redis";
import { newLogTailer } from "hunt2025/src/frontend/server/dataset_tailer";

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

async function main({
  redisUrl,
  apiUrl,
  frontendApiSecret,
}: {
  redisUrl: string;
  apiUrl: string;
  frontendApiSecret: string;
}) {
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

  teamRegistrationLogTailer.watchLog((items) => {
    console.log("got batch", items);
  });

  await teamRegistrationLogTailer.readyPromise();

  console.log("radioman running");
}
main({ redisUrl, apiUrl, frontendApiSecret }).catch((err: unknown) => {
  console.error(err);
});
