import { randomBytes } from "node:crypto";
import { newMockOAuthServer } from "../lib/auth";
import app from "./app";
import regsite from "./frontend/regsite/app";
import "./frontend/server/radio-assets";

const portStr = process.env.PORT ?? "3000";
const port = isNaN(parseInt(portStr)) ? portStr : parseInt(portStr);

let defaultComponents = "api,ws,ui,reg";

// N.B. process.env.NODE_ENV is compiled by webpack
const environment = process.env.NODE_ENV ?? "development";

let jwksUri = process.env.JWKS_URI;

if (environment === "development" && jwksUri === undefined) {
  defaultComponents += ",oauth2";
}

const enabledComponents = new Set(
  (process.env.HUNT_COMPONENTS ?? defaultComponents).split(","),
);

const regsitePortStr = process.env.REGSITE_PORT ?? "3001";
const regsitePort = isNaN(parseInt(regsitePortStr))
  ? regsitePortStr
  : parseInt(regsitePortStr);

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
  console.log(
    `Generated random frontend API secret for development: ${frontendApiSecret}`,
  );
}

let dataApiSecret: string | undefined = process.env.DATA_API_SECRET;
if (environment === "development" && !dataApiSecret) {
  dataApiSecret = randomBytes(16).toString("hex");
}

let mediaBaseUrl = process.env.MEDIA_BASE_URL;
if (environment === "development" && !mediaBaseUrl) {
  mediaBaseUrl = "http://localhost:8889";
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

const registrationOpen = !process.env.REGISTRATION_CLOSED;

const emailFrom = process.env.EMAIL_FROM;

async function main() {
  if (!frontendApiSecret) {
    throw new Error("$FRONTEND_API_SECRET not defined in production");
  }
  if (environment === "development" && enabledComponents.has("oauth2")) {
    const oauth = await newMockOAuthServer(3004);
    const baseUrl = oauth.issuer.url;
    jwksUri = `${baseUrl}/jwks`;
    console.log(
      `Mock OAuth2 server listening on ${baseUrl}/.well-known/openid-configuration`,
    );
  }
  await app({
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
  }).then((app) =>
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    }),
  );

  if (enabledComponents.has("reg") && apiUrl) {
    regsite({
      apiUrl,
      registrationOpen,
    }).listen(regsitePort, () => {
      console.log(`Regsite listening on port ${regsitePort}`);
    });
  }
}
main().catch((err: unknown) => {
  console.error(err);
});
