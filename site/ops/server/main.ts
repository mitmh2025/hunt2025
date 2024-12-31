import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import express, { type RequestHandler, type Request } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";
import { allowInsecureRequests, discovery } from "openid-client";
import { Passport } from "passport";
import { type VerifiedCallback } from "passport-jwt";
import OAuth2Strategy, { type VerifyCallback } from "passport-oauth2";
import { authentikJwtStrategy } from "../../lib/auth";

const LOG_FORMAT_DEBUG =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":req[Authorization]"';
const LOG_FORMAT = LOG_FORMAT_DEBUG; //"tiny";

export const logMiddleware = morgan(LOG_FORMAT);

const environment = process.env.NODE_ENV;
if (environment !== "development" && environment !== "production") {
  throw new Error("$NODE_ENV not set to development or production");
}

async function newPassport({
  server,
  clientID,
  clientSecret,
}: {
  server: string;
  clientID: string;
  clientSecret: string;
}) {
  const config = await discovery(
    new URL(server),
    clientID,
    clientSecret,
    undefined,
    {
      execute: environment === "development" ? [allowInsecureRequests] : [],
    },
  );
  const metadata = config.serverMetadata();

  if (
    !metadata.authorization_endpoint ||
    !metadata.token_endpoint ||
    !metadata.jwks_uri
  ) {
    throw new Error("OpenID discovery doc missing required fields");
  }

  const passport = new Passport();
  passport.use(
    "mitmh2025",
    new OAuth2Strategy(
      {
        authorizationURL: metadata.authorization_endpoint,
        tokenURL: metadata.token_endpoint,
        clientID,
        clientSecret,
        callbackURL: "/auth/mitmh2025/callback",
      },
      (
        accessToken: string,
        _refreshToken: string,
        _profile: unknown,
        cb: VerifyCallback,
      ) => {
        cb(null, accessToken);
      },
    ),
  );
  passport.use(
    "authentikJwt",
    authentikJwtStrategy(
      metadata.jwks_uri,
      (req: Request) =>
        (req.cookies.mitmh2025_api_auth as string | undefined) ?? null,
      (req: Request, _, done: VerifiedCallback) => {
        done(null, req.cookies.mitmh2025_api_auth);
      },
    ),
  );
  return passport;
}

async function buildApp({
  apiUrl,
  oauthServer,
  clientID,
  clientSecret,
}: {
  apiUrl: string;
  oauthServer: string;
  clientID: string;
  clientSecret: string;
}) {
  const app = express();

  const passport = await newPassport({
    server: oauthServer,
    clientID,
    clientSecret,
  });

  // Install /healthz before the log handler, so we don't log every health check.
  app.use("/healthz", (_req, res) => res.send("ok"));

  app.use(cookieParser());
  app.use(logMiddleware);

  app.get(
    "/auth/mitmh2025/callback",
    passport.authenticate("mitmh2025", {
      session: false,
      failureRedirect: "/",
    }) as RequestHandler,
    function (req, res) {
      // Successful authentication, redirect home.
      res.cookie("mitmh2025_api_auth", req.user, {
        httpOnly: false,
        sameSite: "lax",
      });
      res.redirect(process.env.OAUTH_SUCCESS_REDIRECT_URL ?? "/");
    },
  );

  if (environment === "development") {
    const proxy = createProxyMiddleware({
      target: apiUrl,
    });
    app.use("/api", proxy as RequestHandler);
  }

  // Require auth for any other URL
  app.use(
    passport.authenticate(["authentikJwt", "mitmh2025"], {
      session: false,
    }) as RequestHandler,
  );

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

if (!apiUrl) {
  throw new Error("$API_BASE_URL not defined in production");
}

const oauthServer = process.env.OAUTH_SERVER;
const clientID = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
if (!oauthServer) {
  throw new Error("$OAUTH_SERVER not defined");
}
if (!clientID) {
  throw new Error("$OAUTH_CLIENT_ID not defined");
}
if (!clientSecret) {
  throw new Error("$OAUTH_CLIENT_SECRET not defined");
}

buildApp({
  apiUrl,
  oauthServer,
  clientID,
  clientSecret,
})
  .then((app) =>
    app.listen(opssitePort, () => {
      console.log(`Ops site listening on port ${opssitePort}`);
    }),
  )
  .catch((e: unknown) => {
    console.error(e);
  });
