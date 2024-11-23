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
import { cleanUrlEncodedDataFromRegistrationUpdate } from "../components/UpdateRegistrationFormInputs";
import renderApp from "../utils/renderApp";
import {
  responseIsZodError,
  responseToZodErrors,
} from "../utils/zodFieldErrors";
import RegsiteLayout from "./RegsiteLayout";
import LogIn from "./routes/LogIn";
import NewRegistration from "./routes/NewRegistration";
import RegistrationHome from "./routes/RegistrationHome";
import UpdateRegistration from "./routes/UpdateRegistration";
import type {
  MutableTeamRegistration,
  TeamRegistration,
} from "lib/api/frontend_contract";

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

  app.use(
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      req.authApi = newAuthClient(
        apiUrl,
        req.cookies.mitmh2025_auth as string | undefined,
      );

      if (req.cookies.mitmh2025_auth) {
        const registrationResp = await req.authApi.getRegistration();
        if (registrationResp.status === 401) {
          // Clear the cookie if the token is invalid
          res.clearCookie("mitmh2025_auth");
          next(new Error("Invalid auth token"));
          return;
        } else if (registrationResp.status !== 200) {
          console.log("Failed to load registration data", registrationResp);
          next(new Error("Failed to load registration data"));
          return;
        }

        req.teamRegistration = registrationResp.body;
      }

      next();
    }),
  );

  app.get(
    "/",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      await renderApp(
        () => ({
          node: (
            <RegsiteLayout>
              <RegistrationHome isAuthed={!!req.teamRegistration} />
            </RegsiteLayout>
          ),
          title: "Registration",
          noScripts: true,
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
      if (req.teamRegistration) {
        res.redirect("/registration");
        return;
      }

      await renderApp(
        () => ({
          node: (
            <RegsiteLayout>
              <LogIn />
            </RegsiteLayout>
          ),
          title: "Log In",
          noScripts: true,
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
      if (req.teamRegistration) {
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
            node: (
              <RegsiteLayout>
                <LogIn error={error} username={username} />
              </RegsiteLayout>
            ),
            title: "Log In",
            noScripts: true,
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
      if (!req.teamRegistration) {
        res.redirect("/login");
        return;
      }

      const registration = req.teamRegistration;

      await renderApp(
        () => ({
          node: (
            <RegsiteLayout>
              <UpdateRegistration
                registration={registration}
                values={registration}
                message={
                  req.query.new ? "Registration created successfully!" : ""
                }
                errors={{}}
              />
            </RegsiteLayout>
          ),
          title: "Registration",
          noScripts: true,
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
      if (!req.teamRegistration) {
        res.redirect("/login");
        return;
      }

      const data = cleanUrlEncodedDataFromRegistrationUpdate(
        req.body as Record<string, string | string[]>,
      );

      const registration = req.teamRegistration;
      const updateResp = await req.authApi.updateRegistration({
        body: data,
      });

      let message: string;
      let values: MutableTeamRegistration;
      let errors: { [K in keyof MutableTeamRegistration]?: string };
      if (updateResp.status === 200) {
        message = "Registration updated successfully!";
        values = updateResp.body;
        errors = {};
      } else if (responseIsZodError(updateResp)) {
        message = "Please fix the errors below";
        values = data;
        errors = responseToZodErrors(updateResp);
      } else {
        console.log("Unexpected error updating registration", updateResp);
        message = "An unknown error occurred";
        values = data;
        errors = {};
      }

      await renderApp(
        () => ({
          node: (
            <RegsiteLayout>
              <UpdateRegistration
                registration={registration}
                values={values}
                message={message}
                errors={errors}
              />
            </RegsiteLayout>
          ),
          title: "Registration",
          noScripts: true,
        }),
        req,
        res,
        next,
      );
    }),
  );

  app.get(
    "/registration/new",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (req.teamRegistration) {
        res.redirect("/registration");
        return;
      }

      await renderApp(
        () => ({
          node: (
            <RegsiteLayout>
              <NewRegistration values={{}} errors={{}} />
            </RegsiteLayout>
          ),
          title: "Register Your Team",
          noScripts: true,
        }),
        req,
        res,
        next,
      );
    }),
  );

  app.post(
    "/registration/new",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (req.teamRegistration) {
        res.redirect("/registration");
        return;
      }

      const body = req.body as Record<string, string | string[]>;

      const data = {
        username: String(body.username),
        password: String(body.password),
        ...cleanUrlEncodedDataFromRegistrationUpdate(
          req.body as Record<string, string | string[]>,
        ),
      };

      const createResp = await req.authApi.createRegistration({
        body: data,
      });

      if (createResp.status === 200) {
        res.cookie("mitmh2025_auth", createResp.body.token, {
          httpOnly: true,
          secure: true,
        });
        res.redirect("/registration?new=1");
        return;
      }

      let message: string;
      let values: Partial<TeamRegistration>;
      let errors: { [K in keyof TeamRegistration]?: string };
      if (responseIsZodError(createResp)) {
        message = "Please fix the errors below";
        values = data;
        errors = responseToZodErrors(createResp);
      } else {
        console.log("Unexpected error creating registration", createResp);
        message = "An unknown error occurred";
        values = data;
        errors = {};
      }

      await renderApp(
        () => ({
          node: (
            <RegsiteLayout>
              <NewRegistration
                values={values}
                message={message}
                errors={errors}
              />
            </RegsiteLayout>
          ),
          title: "Register Your Team",
          noScripts: true,
        }),
        req,
        res,
        next,
      );
    }),
  );

  return app;
}
