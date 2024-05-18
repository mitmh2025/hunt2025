import path from "path";
import express from "express";
import morgan from "morgan";
import { WebSocketExpress } from "websocket-express";
import { getRouter } from "./api/server";
import { getUiRouter } from "./frontend/server/routes";

const LOG_FORMAT_DEBUG =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":req[Authorization]"';
const LOG_FORMAT = LOG_FORMAT_DEBUG; //"tiny";

export default function ({ apiUrl }: { apiUrl: string }) {
  const app = new WebSocketExpress();

  app.use(morgan(LOG_FORMAT));

  // Mount the API router at /api
  const apiRouter = getRouter();
  app.use("/api", apiRouter);

  // Serve assets from the bundle without auth
  app.use("/assets", express.static(path.join(__dirname, "assets")));

  // Forward all other requests to the UI router, which we expect to
  // handle most user requests.
  const uiRouter = getUiRouter({ apiUrl });
  app.use("/", uiRouter);

  return app;
}
