import { randomBytes } from "node:crypto";
import app from "./app";

const port = 3000;

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
  jwt_secret: jwt_secret,
  apiUrl: "http://localhost:3000",
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
