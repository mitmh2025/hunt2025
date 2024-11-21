import { existsSync } from "fs";
import path from "path";
import cookieParser from "cookie-parser";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import asyncHandler from "express-async-handler";
import morgan from "morgan";
import multer from "multer";
import React from "react";
import { newAuthClient } from "../../../lib/api/auth_client";
import { newClient } from "../../../lib/api/client";
import renderApp from "../utils/renderApp";
import LogIn from "./routes/LogIn";
import RegistrationHome from "./routes/RegistrationHome";
import UpdateRegistration from "./routes/UpdateRegistration";
import type { MutableTeamRegistration } from "lib/api/frontend_contract";

const LOG_FORMAT_DEBUG =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":req[Authorization]"';
const LOG_FORMAT = LOG_FORMAT_DEBUG; //"tiny";

export default function ({ apiUrl }: { apiUrl: string }) {
  const app = express();

  // Install /healthz before the log handler, so we don't log every health check.
  app.use("/healthz", (_, res) => {
    res.send("ok");
  });

  app.use(morgan(LOG_FORMAT));

  const staticPath = process.env.STATIC_PATH ?? path.join(__dirname, "static");
  if (existsSync(staticPath)) {
    // Serve static assets from the bundle without auth
    app.use("/static", express.static(staticPath));
  }

  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false })); // Avoid nonstandard form nonsense
  app.use(multer().none()); // Don't handle file uploads

  app.use((req: Request, _res: Response, next: NextFunction) => {
    req.api = newClient(
      apiUrl,
      req.cookies.mitmh2025_auth as string | undefined,
    );
    req.authApi = newAuthClient(apiUrl);
    req.authenticated = req.cookies.mitmh2025_auth !== undefined;
    next();
  });

  app.get(
    "/",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      await renderApp(
        () => ({
          node: <RegistrationHome isAuthed={!!req.authenticated} />,
          title: "Registration",
        }),
        req,
        res,
        next,
      );
    }),
  );

  app.get(
    "/login",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (req.authenticated) {
        res.redirect("/registration");
        return;
      }

      await renderApp(
        () => ({
          node: <LogIn />,
          title: "Log In",
        }),
        req,
        res,
        next,
      );
    }),
  );

  app.post(
    "/login",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (req.authenticated) {
        res.redirect("/registration");
        return;
      }

      const { username, password } = req.body as {
        username?: string;
        password?: string;
      };

      const handleErr = (error: string) =>
        renderApp(
          () => ({
            node: <LogIn error={error} username={username} />,
            title: "Log In",
          }),
          req,
          res,
          next,
        );

      if (!username || !password) {
        await handleErr("Username and password are required.");
        return;
      }

      const authResp = await req.authApi.login({
        body: { username, password },
      });

      if (authResp.status === 200) {
        res.cookie("mitmh2025_auth", authResp.body.token, {
          httpOnly: true,
          secure: true,
        });
        res.redirect("/registration");
        return;
      }

      if (authResp.status === 403) {
        await handleErr("Invalid username or password.");
        return;
      }

      await handleErr("An unknown error occurred.");
    }),
  );

  app.get("/logout", (_req: Request, res: Response) => {
    res.clearCookie("mitmh2025_auth");
    res.redirect("/");
  });

  app.get(
    "/registration",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (!req.authenticated) {
        res.redirect("/login");
        return;
      }

      const registrationResp = await req.api.getRegistration();
      if (registrationResp.status !== 200) {
        // TODO: handle auth errors
        next(new Error("Failed to load registration data"));
        return;
      }

      await renderApp(
        () => ({
          node: (
            <UpdateRegistration
              registration={registrationResp.body}
              values={registrationResp.body}
            />
          ),
          title: "Registration",
        }),
        req,
        res,
        next,
      );
    }),
  );

  app.post(
    "/registration",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (!req.authenticated) {
        res.redirect("/login");
        return;
      }

      const registrationResp = await req.api.getRegistration();
      if (registrationResp.status !== 200) {
        // TODO: handle auth errors
        next(new Error("Failed to load registration data"));
        return;
      }

      const updateResp = await req.api.updateRegistration({
        body: req.body as MutableTeamRegistration,
      });

      let message: string;
      let values: MutableTeamRegistration;
      if (updateResp.status === 200) {
        message = "Registration updated successfully!";
        values = updateResp.body;
      } else {
        console.log("ERROR", JSON.stringify(updateResp, null, 2));
        message = "Failed to update registration data";
        values = req.body as MutableTeamRegistration;
      }

      await renderApp(
        () => ({
          node: (
            <UpdateRegistration
              registration={registrationResp.body}
              values={values}
              message={message}
            />
          ),
          title: "Registration",
        }),
        req,
        res,
        next,
      );
    }),
  );

  // TODO
  // GET /registration/new
  //   Authed -> redirect to /registration
  //   Unauthed -> Render registration form

  // TODO
  // POST /registration/new
  //   Authed -> redirect to /registration, ignore body
  //   Unauthed -> Process post body
  //     Valid -> set mitmh2025_auth cookie, redirect to /registration
  //     Invalid -> render registration form with error messages

  return app;
}
