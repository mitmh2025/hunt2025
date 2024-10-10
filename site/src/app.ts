import path from "path";
import express from "express";
import morgan from "morgan";
import { createClient as redisCreateClient } from "redis";
import { WebSocketExpress } from "websocket-express";
import { connect } from "./api/db";
import { getRouter } from "./api/server";
import { getUiRouter } from "./frontend/server/routes";
import HUNT from "./huntdata";

const LOG_FORMAT_DEBUG =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":req[Authorization]"';
const LOG_FORMAT = LOG_FORMAT_DEBUG; //"tiny";

async function createRedisClient(redisUrl: string) {
  const options = redisUrl.startsWith("unix://")
    ? { socket: { path: redisUrl.replace("unix://", "") } }
    : { url: redisUrl };
  const client = redisCreateClient(options);
  // We must set an error handler, or the whole process will get terminated if our connection to
  // redis ever fails!
  client.on("error", (err) => {
    console.log("redis error", err);
  });
  await client.connect();
  return client;
}

export type RedisClient = Awaited<ReturnType<typeof createRedisClient>>;

export default async function ({
  dbEnvironment,
  jwtSecret,
  frontendApiSecret,
  apiUrl,
  redisUrl,
}: {
  dbEnvironment: string;
  jwtSecret: string | Buffer;
  frontendApiSecret: string;
  apiUrl: string;
  redisUrl?: string;
}) {
  const knex = await connect(dbEnvironment);

  const redisClient = redisUrl ? await createRedisClient(redisUrl) : undefined;

  const hunt = HUNT;

  const app = new WebSocketExpress();

  app.use(morgan(LOG_FORMAT));

  // Mount the API router at /api
  const apiRouter = getRouter({
    jwtSecret,
    frontendApiSecret,
    knex,
    hunt,
    redisClient,
  });
  app.use("/api", apiRouter);

  // Serve static assets from the bundle without auth
  app.use("/static", express.static(path.join(__dirname, "static")));

  // Forward all other requests to the UI router, which we expect to
  // handle most user requests.
  const uiRouter = await getUiRouter({
    hunt,
    apiUrl,
    frontendApiSecret,
    redisClient,
  });
  app.use("/", uiRouter);

  return app;
}
