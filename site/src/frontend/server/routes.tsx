import stream from "node:stream";
import type { ReadableStream as NodeReadableStream } from "node:stream/web";
import path from "path";
import { routerLocationAsyncLocalStorage } from "@mfng/core/router-location-async-local-storage";
import {
  createRscActionStream,
  createRscAppStream,
  createRscFormState,
} from "@mfng/core/server/rsc";
import { createHtmlStream } from "@mfng/core/server/ssr";
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
import parseurl from "parseurl";
import * as React from "react";
import { renderToString, type ReactFormState } from "react-dom/server";
import { Router } from "websocket-express";
import { newClient } from "../../../lib/api/client";
import {
  reactJsManifest,
  reactClientManifest,
  reactServerManifest,
  reactSsrManifest,
} from "./manifests";
import { hackLoginGetHandler } from "./routes/login";
import { puzzleHandler, solutionHandler } from "./routes/puzzle";
import { roundHandler, type RoundParams } from "./routes/round";

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
  // TODO: extract the POSTed username/password from the form data
  // TODO: implement CSRF tokens for forms
  // TODO: forward the login attempt to the backend, handle failures, and
  //       return the session id provided, instead of this in-memory hack.
  const { username, password } = req.body;
  const loginResult = await req.api.auth.login({
    body: {
      username,
      password,
    },
  });
  if (loginResult.status != 200 && loginResult.status != 403) {
    console.log("login result", loginResult, loginResult.body);
    res.status(500).send("Internal server error");
    return;
  }
  const qs = req.query.next;
  // Don't bother with weird query string formats.  Get a string, or get your
  // next path ignored.
  const target = qs && typeof qs === "string" ? qs : "/";
  if (loginResult.status == 200) {
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

function addRoute<P extends ParamsDictionary>(
  router: Router,
  path: string,
  handler: (req: Request<P>) => React.ReactNode,
) {
  router.get(
    path,
    asyncHandler(async (req: Request<P>, res: Response, next: NextFunction) => {
      await renderApp(handler, req, res, next);
    }),
  );
  router.post(
    path,
    asyncHandler(
      async (
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any -- ResBody defaults to any */
        req: Request<P, any, string | FormData>,
        res: Response,
        next: NextFunction,
      ) => {
        await handlePost(handler, req, res, next);
      },
    ),
  );
}

export function getUiRouter({ apiUrl }: { apiUrl: string }) {
  const router = new Router();
  router.use(cookieParser());
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  router.use(multer().none()); // Don't handle file uploads
  router.use(express.text());

  router.use("/client", express.static(path.join(__dirname, "static/client")));

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
      const teamStateResp = await req.api.public.getMyTeamState();
      if (teamStateResp.status === 401) {
        // Unauthorized means we should prompt the user to log in
        res.redirect(`login?next=${encodeURIComponent(req.path)}`);
        return;
      }
      if (teamStateResp.status !== 200) {
        // We didn't get an acceptable answer from the backend, so complain and
        // don't render anything else since we don't have the state necessary
        // to do so correctly.
        const showError = process.env.NODE_ENV == "development";
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
  addRoute(authRouter, "/rounds/:roundSlug", roundHandler);
  addRoute(authRouter, "/puzzles/:puzzleSlug", puzzleHandler);
  addRoute(authRouter, "/puzzles/:puzzleSlug/solution", solutionHandler);

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
  formState?: ReactFormState,
) {
  const url = parseurl(req);

  return routerLocationAsyncLocalStorage.run(
    { pathname: url?.pathname ?? "", search: url?.search ?? "" },
    async () => {
      const reactRoot = await handler(req);
      if (reactRoot === undefined) {
        render404(req, res);
        return;
      }

      const rscStream = createRscAppStream(reactRoot, {
        reactClientManifest,
        //TODO: mainCssHref: cssManifest[`main.css`]!,
        formState,
      });

      if (req.get("accept") === `text/x-component`) {
        res.set({
          "Content-Type": `text/x-component; charset=utf-8`,
          "Cache-Control": `s-maxage=60, stale-while-revalidate=${oneDay}`,
        });
        res.status(200);

        stream.Readable.fromWeb(
          rscStream as NodeReadableStream<Uint8Array>,
        ).pipe(res);
        return;
      }

      const mainJs = reactJsManifest[`main.js`];
      const htmlStream = await createHtmlStream(rscStream, {
        reactSsrManifest,
        bootstrapScripts: mainJs ? [mainJs] : [],
        formState,
      });
      res.set({
        "Content-Type": `text/html; charset=utf-8`,
        "Cache-Control": `s-maxage=60, stale-while-revalidate=${oneDay}`,
      });
      res.status(200);
      stream.Readable.fromWeb(
        htmlStream as NodeReadableStream<Uint8Array>,
      ).pipe(res);
    },
  );
}

async function handlePost<Params extends ParamsDictionary>(
  handler: (req: Request<Params>) => React.ReactNode,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any -- ResBody defaults to any */
  req: Request<Params, any, string | FormData>,
  res: Response,
  next: NextFunction,
) {
  const serverReferenceId = req.get(`x-rsc-action`);

  if (serverReferenceId) {
    // POST via callServer:

    const contentType = req.get(`content-type`);

    const body = contentType?.startsWith(`multipart/form-data`)
      ? req.body
      : req.body;

    const rscActionStream = await createRscActionStream({
      body,
      serverReferenceId,
      reactClientManifest,
      reactServerManifest,
    });

    res.set({ "Content-Type": `text/x-component` });
    res.status(rscActionStream ? 200 : 500);
    stream.Readable.fromWeb(
      rscActionStream as NodeReadableStream<Uint8Array>,
    ).pipe(res);
    return;
  } else {
    // POST before hydration (progressive enhancement):

    const formData = req.body as FormData;
    const formState = await createRscFormState(formData, reactServerManifest);

    return renderApp(handler, req, res, next, formState);
  }
}
