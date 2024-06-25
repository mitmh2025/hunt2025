import { randomBytes } from "node:crypto";
import app from "./app";

const portStr = process.env.PORT ?? "3000";
const port = isNaN(parseInt(portStr)) ? portStr : parseInt(portStr);

const apiUrl = process.env.API_BASE_URL ?? "http://localhost:3000/api";
// N.B. process.env.NODE_ENV is compiled by webpack
const environment = process.env.NODE_ENV ?? "development";
const db_environment = process.env.DB_ENV ?? "development";
let jwt_secret: string | Buffer | undefined = process.env.JWT_SECRET;
if (environment == "development" && !jwt_secret) {
  jwt_secret = randomBytes(128);
}
if (!jwt_secret) {
  throw new Error("$JWT_SECRET not defined in production");
}

app({
  db_environment,
  jwt_secret,
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
