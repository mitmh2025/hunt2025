import path from "path";
import express from "express";
import { connect as dbConnect } from "../../api/db";
import { connect as redisConnect } from "../../api/redis";
import { getRouter } from "../../api/server";
import HUNT from "../../huntdata";
import { healthzHandler, logMiddleware } from "../utils/expressMiddleware";

export default async function ({
  dbEnvironment,
  jwtSecret,
  frontendApiSecret,
  dataApiSecret,
  redisUrl,
}: {
  dbEnvironment: string | undefined;
  jwtSecret: string | Buffer | undefined;
  frontendApiSecret: string;
  dataApiSecret: string | undefined;
  redisUrl?: string;
}) {
  const hunt = HUNT;
  const app = express();

  if (!dbEnvironment) {
    throw new Error("$DB_ENV not defined in production");
  }
  if (!jwtSecret) {
    throw new Error("$JWT_SECRET not defined in production");
  }
  if (!dataApiSecret) {
    throw new Error("$DATA_API_SECRET not defined in production");
  }

  const redisClient = redisUrl ? await redisConnect(redisUrl) : undefined;
  const knex = await dbConnect(dbEnvironment);

  // Install /healthz before the log handler, so we don't log every health check.
  app.use("/healthz", healthzHandler);

  app.use(logMiddleware);

  app.use(
    "/api",
    getRouter({
      jwtSecret,
      frontendApiSecret,
      dataApiSecret,
      knex,
      hunt,
      redisClient,
      isOpsSite: true,
    }),
  );

  app.use("/", express.static(path.join(__dirname, "ops-static")));

  return app;
}
