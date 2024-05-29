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

function createRedisClient(redisUrl: string) {
  const options = redisUrl.startsWith("unix://")
    ? { socket: { path: redisUrl.replace("unix://", "") } }
    : { url: redisUrl };
  return redisCreateClient(options);
}

export type RedisClient = ReturnType<typeof createRedisClient>;

export default async function ({
  db_environment,
  jwt_secret,
  apiUrl,
  redisUrl,
}: {
  db_environment: string;
  jwt_secret: string | Buffer;
  apiUrl: string;
  redisUrl?: string;
}) {
  const knex = await connect(db_environment);

  const redisClient = redisUrl ? createRedisClient(redisUrl) : undefined;

  const hunt = HUNT;

  const app = new WebSocketExpress();

  app.use(morgan(LOG_FORMAT));

  // Mount the API router at /api
  const apiRouter = getRouter({
    jwt_secret,
    knex,
    hunt,
  });
  app.use("/api", apiRouter);

  // Serve assets from the bundle without auth
  app.use("/assets", express.static(path.join(__dirname, "assets")));

  // Forward all other requests to the UI router, which we expect to
  // handle most user requests.
  const uiRouter = await getUiRouter({ apiUrl, redisClient });
  app.use("/", uiRouter);

  return app;
}
