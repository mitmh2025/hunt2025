import { randomBytes } from "node:crypto";
import app from "./app";
import regsite from "./frontend/regsite/app";

const portStr = process.env.PORT ?? "3000";
const port = isNaN(parseInt(portStr)) ? portStr : parseInt(portStr);

const enabledComponents = new Set(
  (process.env.HUNT_COMPONENTS ?? "api,ws,ui,reg").split(","),
);

const regsitePortStr = process.env.REGSITE_PORT ?? "3001";
const regsitePort = isNaN(parseInt(regsitePortStr))
  ? regsitePortStr
  : parseInt(regsitePortStr);

// N.B. process.env.NODE_ENV is compiled by webpack
const environment = process.env.NODE_ENV ?? "development";

let apiUrl = process.env.API_BASE_URL;
if (environment === "development" && enabledComponents.has("api") && !apiUrl) {
  apiUrl = `http://localhost:${port}/api`;
}

let dbEnvironment = process.env.DB_ENV;
if (environment === "development" && !dbEnvironment) {
  dbEnvironment = "development";
}

let jwtSecret: string | Buffer | undefined = process.env.JWT_SECRET;
if (environment === "development" && !jwtSecret) {
  jwtSecret = randomBytes(128);
}

let frontendApiSecret: string | undefined = process.env.FRONTEND_API_SECRET;
if (environment === "development" && !frontendApiSecret) {
  frontendApiSecret = randomBytes(16).toString("hex");
}
if (!frontendApiSecret) {
  throw new Error("$FRONTEND_API_SECRET not defined in production");
}

let dataApiSecret: string | undefined = process.env.DATA_API_SECRET;
if (environment === "development" && !dataApiSecret) {
  dataApiSecret = randomBytes(16).toString("hex");
}
if (!dataApiSecret) {
  throw new Error("$DATA_API_SECRET not defined in production");
}

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  console.error(
    "$REDIS_URL was not configured -- WEBSOCKET/DEVTOOLS WILL BE BROKEN!",
  );
  console.error(
    "Please set up redis and set REDIS_URL to redis://localhost/ or similar",
  );
}

app({
  enabledComponents,
  dbEnvironment,
  jwtSecret,
  frontendApiSecret,
  dataApiSecret,
  apiUrl,
  redisUrl,
})
  .then((app) =>
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    }),
  )
  .catch((err: unknown) => {
    console.error(err);
  });

if (enabledComponents.has("reg") && apiUrl) {
  regsite({
    apiUrl,
  }).listen(regsitePort, () => {
    console.log(`Regsite listening on port ${regsitePort}`);
  });
}
