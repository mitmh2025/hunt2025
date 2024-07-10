import { randomBytes } from "node:crypto";
import app from "./app";

const portStr = process.env.PORT ?? "3000";
const port = isNaN(parseInt(portStr)) ? portStr : parseInt(portStr);

const apiUrl = process.env.API_BASE_URL ?? "http://localhost:3000/api";
// N.B. process.env.NODE_ENV is compiled by webpack
const environment = process.env.NODE_ENV ?? "development";
const dbEnvironment = process.env.DB_ENV ?? "development";

let jwtSecret: string | Buffer | undefined = process.env.JWT_SECRET;
if (environment === "development" && !jwtSecret) {
  jwtSecret = randomBytes(128);
}
if (!jwtSecret) {
  throw new Error("$JWT_SECRET not defined in production");
}

let frontendApiSecret: string | undefined = process.env.FRONTEND_API_SECRET;
if (environment === "development" && !frontendApiSecret) {
  frontendApiSecret = randomBytes(16).toString("hex");
}
if (!frontendApiSecret) {
  throw new Error("$FRONTEND_API_SECRET not defined in production");
}

app({
  dbEnvironment,
  jwtSecret,
  frontendApiSecret,
  apiUrl,
  redisUrl: process.env.REDIS_URL,
})
  .then((app) =>
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    }),
  )
  .catch((err: unknown) => {
    console.error(err);
  });
