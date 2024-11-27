import path from "path";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import asyncHandler from "express-async-handler";
import React from "react";
import { newAuthClient } from "../../../lib/api/auth_client";
import { cleanUrlEncodedDataFromRegistrationUpdate } from "../components/UpdateRegistrationFormInputs";
import {
  addParserMiddleware,
  addStaticMiddleware,
  healthzHandler,
  logMiddleware,
} from "../utils/expressMiddleware";
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

export default function ({
  apiUrl,
  registrationOpen,
}: {
  apiUrl: string;
  registrationOpen: boolean;
}) {
  const app = express();

  // Install /healthz before the log handler, so we don't log every health check.
  app.use("/healthz", healthzHandler);

  app.use(logMiddleware);

  addStaticMiddleware(app, path.join(__dirname, "static"));

  addParserMiddleware(app, {
    cookies: true,
    urlencoded: true,
  });

  app.use(
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      req.authApi = newAuthClient(
        apiUrl,
        req.cookies.mitmh2025_auth as string | undefined,
      );

      if (req.cookies.mitmh2025_auth) {
        const registrationResp = await req.authApi.getRegistration();
        if (
          registrationResp.status === 401 ||
          registrationResp.status === 404
        ) {
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
            <RegistrationHome
              isAuthed={!!req.teamRegistration}
              registrationOpen={registrationOpen}
            />
          ),
          title: "Registration",
          layout: RegsiteLayout,
        }),
        req,
        res,
        next,
      );
    }),
  );

  if (registrationOpen) {
    app.get(
      "/login",
      asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        if (req.teamRegistration) {
          res.redirect("/registration");
          return;
        }

        await renderApp(
          () => ({
            node: <LogIn />,
            title: "Log In",
            layout: RegsiteLayout,
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
              node: <LogIn error={error} username={username} />,
              title: "Log In",
              layout: RegsiteLayout,
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
              <UpdateRegistration
                registration={registration}
                values={registration}
                message={
                  req.query.new ? "Registration created successfully!" : ""
                }
                errors={{}}
              />
            ),
            title: "Registration",
            layout: RegsiteLayout,
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
              <UpdateRegistration
                registration={registration}
                values={values}
                message={message}
                errors={errors}
              />
            ),
            title: "Registration",
            layout: RegsiteLayout,
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
            node: <NewRegistration values={{}} errors={{}} />,
            title: "Register Your Team",
            layout: RegsiteLayout,
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
        if (createResp.status === 409) {
          message = "Username already taken";
          values = data;
          errors = {};
        } else if (responseIsZodError(createResp)) {
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
              <NewRegistration
                values={values}
                message={message}
                errors={errors}
              />
            ),
            title: "Register Your Team",
            layout: RegsiteLayout,
          }),
          req,
          res,
          next,
        );
      }),
    );
  }

  return app;
}
