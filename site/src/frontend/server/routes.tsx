import path from "path";
import cookieParser from "cookie-parser";
import express, {
  type Request,
  type Response,
  type RequestHandler,
  type NextFunction,
} from "express";
import asyncHandler from "express-async-handler";
import type { ParamsDictionary } from "express-serve-static-core";
import multer from "multer";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "websocket-express";
import { newAuthClient } from "../../../lib/api/auth_client";
import { newClient } from "../../../lib/api/client";
import { newFrontendClient } from "../../../lib/api/frontend_client";
import { type RedisClient } from "../../app";
import { allPuzzlesHandler } from "./routes/all_puzzles";
import { hackLoginGetHandler } from "./routes/login";
import {
  puzzleHandler,
  type PuzzleParams,
  solutionHandler,
  puzzleGuessPostHandler,
  puzzleUnlockPostHandler,
} from "./routes/puzzle";
import { roundHandler, type RoundParams } from "./routes/round";
import { getWsHandler } from "./ws";

// Type parameters to RequestHandler are:
// 1. Params
// 2. ResBody
// 3. ReqBody
// 4. ReqQuery
//
// When annotating particular handlers, annotations should name concrete types
// rather than interfaces.
type LoginQueryTypes = {
  next: string;
};
type LoginReqBody = {
  username: string;
  password: string;
};
type LoginPostParams = Record<string, never>;
const loginPostHandler: RequestHandler<
  LoginPostParams,
  unknown,
  LoginReqBody,
  LoginQueryTypes
> = asyncHandler(async (req, res) => {
  // TODO: implement CSRF tokens for forms
  // TODO: forward the login attempt to the backend, handle failures, and
  //       return the session id provided, instead of this in-memory hack.
  // TODO: validate req.body with zod
  const { username, password } = req.body;
  const loginResult = await req.authApi.login({
    body: {
      username,
      password,
    },
  });
  if (loginResult.status !== 200 && loginResult.status !== 403) {
    console.log("login result", loginResult, loginResult.body);
    res.status(500).send("Internal server error");
    return;
  }
  const qs = req.query.next;
  // Don't bother with weird query string formats.  Get a string, or get your
  // next path ignored.
  const target = qs && typeof qs === "string" ? qs : "/";
  if (loginResult.status === 200) {
    res.cookie("mitmh2025_auth", loginResult.body.token, {
      httpOnly: true,
      sameSite: true,
      // secure: true,
    });

    // Redirect to the page the user was trying to view before getting redirected
    // to the login page, or the root route if absent.

    res.redirect(target);
    return;
  }
  res.redirect(`/login?next=${encodeURIComponent(target)}`);
});

function logoutHandler(_req: Request, res: Response) {
  res.cookie("mitmh2025_auth", "", { expires: new Date(0) });
  res.redirect("/");
}

const render404 = (_req: Request, res: Response) => {
  const html =
    "<!DOCTYPE html><html><body><h1>404 Not Found</h1><p>We didn&apos;t find what you were looking for.</p></body></html>";
  res.status(404).send(html);
};

const render500 = (
  res: Response,
  showError: boolean,
  status: number,
  errorText: string,
) => {
  const doctype = "<!DOCTYPE html>";
  const reactRoot = (
    <html lang="en">
      <body>
        <h1>500 Service Temporarily Unavailable</h1>
        {showError ? (
          <>
            <p>API request returned {status}:</p>
            <pre>{errorText}</pre>
          </>
        ) : undefined}
      </body>
    </html>
  );
  const html = doctype + renderToString(reactRoot) + "\n";
  res.status(500).send(html);
};

export async function getUiRouter({
  apiUrl,
  frontendApiSecret,
  redisClient,
}: {
  apiUrl: string;
  frontendApiSecret: string;
  redisClient?: RedisClient;
}) {
  const router = new Router();
  router.use(cookieParser());
  router.use(express.urlencoded({ extended: false })); // Avoid nonstandard form nonsense
  router.use(express.json());
  router.use(multer().none()); // Don't handle file uploads
  router.use(express.text());

  router.use("/client", express.static(path.join(__dirname, "static/client")));

  router.use((req: Request, _res: Response, next: NextFunction) => {
    req.authApi = newAuthClient(apiUrl);
    req.frontendApi = newFrontendClient(apiUrl, frontendApiSecret);
    next();
  });

  const unauthRouter = new Router();
  unauthRouter.use((req: Request, _res: Response, next: NextFunction) => {
    req.api = newClient(
      apiUrl,
      req.cookies.mitmh2025_auth as string | undefined,
    );
    next();
  });

  const authRouter = new Router();
  authRouter.use(
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      req.api = newClient(
        apiUrl,
        req.cookies.mitmh2025_auth as string | undefined,
      );
      const teamStateResp = await req.api.getMyTeamState();
      if (teamStateResp.status === 401) {
        // Unauthorized means we should prompt the user to log in
        res.redirect(`login?next=${encodeURIComponent(req.path)}`);
        return;
      }
      if (teamStateResp.status !== 200) {
        // We didn't get an acceptable answer from the backend, so complain and
        // don't render anything else since we don't have the state necessary
        // to do so correctly.
        const showError = process.env.NODE_ENV === "development";
        render500(
          res,
          showError,
          teamStateResp.status,
          teamStateResp.body as string,
        );
        return;
      }
      req.teamState = teamStateResp.body;
      next();
    }),
  );

  unauthRouter.get(
    "/login",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      await renderApp(hackLoginGetHandler, req, res, next);
    }),
  );
  unauthRouter.post("/login", loginPostHandler);
  unauthRouter.get("/logout", logoutHandler);

  authRouter.ws("/ws", await getWsHandler(redisClient));

  authRouter.get(
    "/",
    asyncHandler(
      async (
        req: Request<{ roundSlug: string | undefined }>,
        res: Response,
        next: NextFunction,
      ) => {
        // Root page should be shadow diamond round page
        req.params.roundSlug = "shadow_diamond";
        await renderApp(roundHandler, req as Request<RoundParams>, res, next);
      },
    ),
  );
  authRouter.get(
    "/rounds/:roundSlug",
    asyncHandler(
      async (req: Request<RoundParams>, res: Response, next: NextFunction) => {
        await renderApp(roundHandler, req, res, next);
      },
    ),
  );
  authRouter.get(
    "/puzzles/:puzzleSlug",
    asyncHandler(
      async (req: Request<PuzzleParams>, res: Response, next: NextFunction) => {
        await renderApp(puzzleHandler, req, res, next);
      },
    ),
  );
  authRouter.post("/puzzles/:puzzleSlug/guess", puzzleGuessPostHandler);
  authRouter.post("/puzzles/:puzzleSlug/unlock", puzzleUnlockPostHandler);
  authRouter.get(
    "/puzzles/:puzzleSlug/solution",
    asyncHandler(
      async (req: Request<PuzzleParams>, res: Response, next: NextFunction) => {
        await renderApp(solutionHandler, req, res, next);
      },
    ),
  );
  authRouter.get(
    "/all_puzzles",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      await renderApp(allPuzzlesHandler, req, res, next);
    }),
  );

  router.use(unauthRouter);
  router.use(authRouter);

  return router;
}

const oneDay = String(60 * 60 * 24);

async function renderApp<Params extends ParamsDictionary>(
  handler: (req: Request<Params>) => React.ReactNode,
  req: Request<Params>,
  res: Response,
  _next: NextFunction,
) {
  const reactRoot = await handler(req);
  if (reactRoot === undefined) {
    render404(req, res);
    return;
  }

  const doctype = "<!DOCTYPE html>";
  const html = doctype + renderToString(reactRoot) + "\n";
  res.set({
    "Content-Type": `text/html; charset=utf-8`,
    "Cache-Control": `s-maxage=60, stale-while-revalidate=${oneDay}`,
  });
  res.status(200);
  res.send(html);
}
