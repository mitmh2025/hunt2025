import path from "path";
import { Router, WebSocketExpress } from "websocket-express";
import { newFrontendClient } from "../lib/api/frontend_client";
import {
  activityLog,
  teamRegistrationLog,
  puzzleStateLog,
  teamInteractionStateLog,
} from "./api/data";
import { connect as dbConnect } from "./api/db";
import { getMailer } from "./api/email";
import { connect as redisConnect } from "./api/redis";
import { getRouter } from "./api/server";
import { VirtualInteractionEngine } from "./frontend/interactions/virtual_interaction_engine";
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
import rootUrl from "./frontend/utils/rootUrl";
import HUNT from "./huntdata";

export default async function ({
  enabledComponents,
  dbEnvironment,
  jwtSecret,
  jwksUri,
  frontendApiSecret,
  dataApiSecret,
  mediaBaseUrl,
  apiUrl,
  redisUrl,
  emailFrom,
}: {
  enabledComponents: Set<string>;
  dbEnvironment: string | undefined;
  jwtSecret: string | Buffer | undefined;
  jwksUri: string | undefined;
  frontendApiSecret: string;
  dataApiSecret: string | undefined;
  mediaBaseUrl: string | undefined;
  apiUrl: string | undefined;
  redisUrl?: string;
  emailFrom?: string;
}) {
  const redisClient = redisUrl ? await redisConnect(redisUrl) : undefined;

  if (
    process.env.NODE_ENV === "development" &&
    redisClient &&
    enabledComponents.has("api")
  ) {
    try {
      // Wipe data every time we start in development, since the database might have regressed.
      for await (const key of redisClient.scanIterator()) {
        await redisClient.del(key);
      }
    } catch (err) {
      console.error("failed to wipe redis:", err);
    }
  }

  const hunt = HUNT;

  const app = new WebSocketExpress();

  // Install /healthz before the log handler, so we don't log every health check.
  app.use("/healthz", healthzHandler);

  // Similar for the current time endpoint.
  app.get("/currentTime", (_req, res) => {
    res.send(`${Date.now()}`);
  });

  app.use(logMiddleware);

  if (enabledComponents.has("api")) {
    if (!dbEnvironment) {
      throw new Error("$DB_ENV not defined in production");
    }
    if (!jwtSecret) {
      throw new Error("$JWT_SECRET not defined in production");
    }
    if (!dataApiSecret) {
      throw new Error("$DATA_API_SECRET not defined in production");
    }
    if (!mediaBaseUrl) {
      throw new Error("$MEDIA_BASE_URL not defined in production");
    }
    if (process.env.NODE_ENV !== "development" && emailFrom === undefined) {
      throw new Error("$EMAIL_FROM not defined in production");
    }

    const knex = await dbConnect(dbEnvironment, redisClient);

    if (redisClient !== undefined) {
      // Make sure Redis is up to date
      await activityLog.refreshRedisLog(redisClient, knex);
      await teamRegistrationLog.refreshRedisLog(redisClient, knex);
      await puzzleStateLog.refreshRedisLog(redisClient, knex);
      await teamInteractionStateLog.refreshRedisLog(redisClient, knex);
    }

    const mailer = getMailer({ emailFrom });

    // Mount the API router at /api
    const apiRouter = await getRouter({
      jwtSecret,
      jwksUri,
      frontendApiSecret,
      dataApiSecret,
      mediaBaseUrl,
      knex,
      hunt,
      redisClient,
      mailer,
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
        frontendApiClient: newFrontendClient(apiUrl, {
          type: "frontend",
          frontendSecret: frontendApiSecret,
        }),
      });
      const wsHandler = wsManager.requestHandler.bind(wsManager);
      authRouter.ws("/ws", wsHandler);
    }

    uiRouter.use(unauthRouter);
    uiRouter.use(authRouter);

    // Forward all other requests to the UI router, which we expect to
    // handle most user requests.
    app.use(`${rootUrl}/`, uiRouter);

    if (rootUrl !== "") {
      app.get("/", (_req, res) => {
        res.redirect(rootUrl);
      });
    }
  }

  if (enabledComponents.has("inteng")) {
    if (!redisClient) {
      throw new Error("redisClient required for inteng component");
    }
    if (!apiUrl) {
      throw new Error("$API_BASE_URL unset but inteng server requested");
    }
    const engine = new VirtualInteractionEngine({
      redisClient,
      frontendApiClient: newFrontendClient(apiUrl, {
        type: "frontend",
        frontendSecret: frontendApiSecret,
      }),
    });
    engine.start();
  }

  return app;
}
