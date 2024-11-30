import path from "path";
import express from "express";
import jwt from "jsonwebtoken";
import { healthzHandler, logMiddleware } from "../utils/expressMiddleware";

export default function ({
  jwtSecret,
  apiUrl,
}: {
  jwtSecret: string | Buffer | undefined;
  apiUrl: string | undefined;
}) {
  const app = express();

  if (!jwtSecret) {
    throw new Error("$JWT_SECRET not defined in production");
  }

  if (!apiUrl) {
    throw new Error("$API_BASE_URL not defined in production");
  }

  // Install /healthz before the log handler, so we don't log every health check.
  app.use("/healthz", healthzHandler);

  app.use(logMiddleware);

  app.get("/admin-token", (req, res) => {
    let adminUser = req.header("x-authentik-email");
    if (!adminUser) {
      if (process.env.NODE_ENV === "development") {
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

  app.use("/", express.static(path.join(__dirname, "ops-static")));

  return app;
}
