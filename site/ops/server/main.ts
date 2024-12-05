import { randomBytes } from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import jwt from "jsonwebtoken";
import morgan from "morgan";

const LOG_FORMAT_DEBUG =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":req[Authorization]"';
const LOG_FORMAT = LOG_FORMAT_DEBUG; //"tiny";

export const logMiddleware = morgan(LOG_FORMAT);

const environment = process.env.NODE_ENV;
if (environment !== "development" && environment !== "production") {
  throw new Error("$NODE_ENV not set to development or production");
}

function buildApp({
  jwtSecret,
  apiUrl,
}: {
  jwtSecret: string | Buffer;
  apiUrl: string;
}) {
  const app = express();

  // Install /healthz before the log handler, so we don't log every health check.
  app.use("/healthz", (_req, res) => res.send("ok"));

  app.use(logMiddleware);

  app.get("/admin-token", (req, res) => {
    let adminUser = req.header("x-authentik-email");
    if (!adminUser) {
      if (environment === "development") {
        adminUser = "dev@example.com";
      } else {
        res.status(403).send("No x-authentik-email header");
        return;
      }
    }

    const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour
    const renewAfter = new Date(expiresAt * 1000 - 5 * 60 * 1000); // 5 minutes before expiration

    res.json({
      token: jwt.sign({ adminUser, exp: expiresAt }, jwtSecret),
      apiUrl: apiUrl,
      renewAfter: renewAfter.toISOString(),
    });
  });

  app.use(
    "/",
    express.static(
      path.join(path.dirname(fileURLToPath(import.meta.url)), "../static"),
    ),
  );

  return app;
}

const opssitePortStr = process.env.OPSSITE_PORT ?? "3002";
const opssitePort = isNaN(parseInt(opssitePortStr))
  ? opssitePortStr
  : parseInt(opssitePortStr);

let apiUrl = process.env.API_BASE_URL;
if (environment === "development" && !apiUrl) {
  apiUrl = `http://localhost:3000/api`;
}

let jwtSecret: string | Buffer | undefined = process.env.JWT_SECRET;
if (environment === "development" && !jwtSecret) {
  jwtSecret = randomBytes(128);
}

if (!jwtSecret) {
  throw new Error("$JWT_SECRET not defined in production");
}

if (!apiUrl) {
  throw new Error("$API_BASE_URL not defined in production");
}

buildApp({
  jwtSecret,
  apiUrl,
}).listen(opssitePort, () => {
  console.log(`Ops site listening on port ${opssitePort}`);
});
