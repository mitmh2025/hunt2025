import path from "path";
import { Router, WebSocketExpress } from "websocket-express";
import { newFrontendClient } from "../lib/api/frontend_client";
import { activityLog, teamRegistrationLog } from "./api/data";
import { connect as dbConnect } from "./api/db";
import { connect as redisConnect } from "./api/redis";
import { getRouter } from "./api/server";
import {
  getAuthRouter,
  getBaseRouter,
  registerUiRoutes,
} from "./frontend/server/routes";
import { WebsocketManager } from "./frontend/server/ws";
import {
  addStaticMiddleware,
  healthzHandler,
  logMiddleware,
} from "./frontend/utils/expressMiddleware";
import HUNT from "./huntdata";

export default async function ({
  enabledComponents,
  dbEnvironment,
  jwtSecret,
  frontendApiSecret,
  apiUrl,
  redisUrl,
}: {
  enabledComponents: Set<string>;
  dbEnvironment: string | undefined;
  jwtSecret: string | Buffer | undefined;
  frontendApiSecret: string;
  apiUrl: string | undefined;
  redisUrl?: string;
}) {
  const redisClient = redisUrl ? await redisConnect(redisUrl) : undefined;

  const hunt = HUNT;

  const app = new WebSocketExpress();

  // Install /healthz before the log handler, so we don't log every health check.
  app.use("/healthz", healthzHandler);

  app.use(logMiddleware);

  if (enabledComponents.has("api")) {
    if (!dbEnvironment) {
      throw new Error("$DB_ENV not defined in production");
    }
    if (!jwtSecret) {
      throw new Error("$JWT_SECRET not defined in production");
    }

    const knex = await dbConnect(dbEnvironment);

    if (redisClient !== undefined) {
      // Make sure Redis is up to date
      await activityLog.refreshRedisLog(redisClient, knex);
      await teamRegistrationLog.refreshRedisLog(redisClient, knex);
    }

    // Mount the API router at /api
    const apiRouter = getRouter({
      jwtSecret,
      frontendApiSecret,
      knex,
      hunt,
      redisClient,
    });
    app.use("/api", apiRouter);
  }

  if (enabledComponents.has("ui")) {
    addStaticMiddleware(app, path.join(__dirname, "static"));
  }

  if (enabledComponents.has("ui") || enabledComponents.has("ws")) {
    if (!apiUrl) {
      throw new Error("$API_BASE_URL unset but ui or ws server requested");
    }
    console.log("Accessing API via", apiUrl);
    const uiRouter = getBaseRouter({ apiUrl, frontendApiSecret });
    const unauthRouter = new Router();
    const authRouter = getAuthRouter();

    if (enabledComponents.has("ui")) {
      registerUiRoutes({ hunt, unauthRouter, authRouter });
    }
    if (enabledComponents.has("ws") && redisClient) {
      const wsManager = new WebsocketManager({
        hunt,
        redisClient,
        frontendApiClient: newFrontendClient(apiUrl, frontendApiSecret),
      });
      const wsHandler = wsManager.requestHandler.bind(wsManager);
      authRouter.ws("/ws", wsHandler);
    }

    uiRouter.use(unauthRouter);
    uiRouter.use(authRouter);

    // Forward all other requests to the UI router, which we expect to
    // handle most user requests.
    app.use("/", uiRouter);
  }

  return app;
}
