import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";
import { Router } from "websocket-express";
import { newClient } from "@/api/client";
import cookieParser from "cookie-parser";
import multer from "multer";
import parseurl from "parseurl";
import stream from "stream";
import path from "path";

import { routerLocationAsyncLocalStorage } from "@mfng/core/router-location-async-local-storage";
import {
  createRscActionStream,
  createRscAppStream,
  createRscFormState,
} from "@mfng/core/server/rsc";
import { createHtmlStream } from "@mfng/core/server/ssr";
import * as React from "react";
import type { ReactFormState } from "react-dom/server";
//import * as manifests from './handler/manifests.js';
import {
  cssManifest,
  jsManifest,
  reactClientManifest,
  reactServerManifest,
  reactSsrManifest,
} from "./handler/manifests.js";

//console.log("manifests", manifests);

import { roundHandler } from "./routes/round";
import { puzzleHandler, solutionHandler } from "./routes/puzzle";
import { hackLoginGetHandler } from "./routes/login";

interface LoginQueryTypes {
  next: string;
}
const loginPostHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  LoginQueryTypes
> = async (req: Request, res) => {
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
  const qs = req.query["next"];
  const target = qs ? (typeof qs === "string" ? qs : qs[0]) : "/";
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
};

function logoutHandler(_req: Request, res: Response) {
  res.cookie("mitmh2025_auth", "", { expires: new Date(0) });
  res.redirect("/");
}

const render404 = (_req: Request, res: Response) => {
  const html =
    "<!DOCTYPE html><html><body><h1>404 Not Found</h1><p>We didn&apos;t find what you were looking for.</p></body></html>";
  res.status(404).send(html);
};

export function getUiRouter({ apiUrl }: { apiUrl: string }) {
  const router = new Router();
  router.use(cookieParser());
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  router.use(multer().none()); // Don't handle file uploads
  router.use(express.text());

  router.use("/client", express.static(path.join(__dirname, "static/client")));

  const unauthRouter = new Router();
  unauthRouter.use((req, _res, next) => {
    req.api = newClient(apiUrl, req.cookies["mitmh2025_auth"]);
    return next();
  });

  const authRouter = new Router();
  authRouter.use(async (req, res, next) => {
    req.api = newClient(apiUrl, req.cookies["mitmh2025_auth"]);
    const teamStateResp = await req.api.public.getMyTeamState();
    if (teamStateResp.status != 200) {
      res.redirect(`login?next=${encodeURIComponent(req.path)}`);
      return;
    }
    req.teamState = teamStateResp.body;
    return next();
  });

  const addRoute = (
    router: Router,
    path: string,
    handler: (req: Request) => React.ReactNode,
  ) => {
    router.get(
      path,
      async (req, res, next) => await renderApp(handler, req, res, next),
    );
    router.post(
      path,
      async (req, res, next) => await handlePost(handler, req, res, next),
    );
  };

  unauthRouter.get(
    "/login",
    async (req, res, next) =>
      await renderApp(hackLoginGetHandler, req, res, next),
  );
  unauthRouter.post("/login", loginPostHandler);
  unauthRouter.get("/logout", logoutHandler);

  addRoute(authRouter, "/", (req) => {
    // Root page should be shadow diamond round page
    req.params.roundSlug = "shadow_diamond";
    return roundHandler(req);
  });
  addRoute(authRouter, "/rounds/:roundSlug", roundHandler);
  addRoute(authRouter, "/puzzles/:puzzleSlug", puzzleHandler);
  addRoute(authRouter, "/puzzles/:puzzleSlug/solution", solutionHandler);

  router.use(unauthRouter);
  router.use(authRouter);

  return router;
}

const oneDay = 60 * 60 * 24;

async function renderApp(
  handler: (req: Request) => React.ReactNode,
  req: Request,
  res: Response,
  _next: NextFunction,
  formState?: ReactFormState,
) {
  const { pathname, search } = parseurl(req);

  return routerLocationAsyncLocalStorage.run({ pathname, search }, async () => {
    console.log("renderApp", pathname, search);
    const app = await handler(req);
    if (app === undefined) {
      return render404(req, res);
    }

    const rscAppStream = createRscAppStream(app, {
      reactClientManifest,
      //FIXME: mainCssHref: cssManifest[`main.css`]!,
      formState,
    });

    if (req.get("accept") === `text/x-component`) {
      res.set({
        "Content-Type": `text/x-component; charset=utf-8`,
        "Cache-Control": `s-maxage=60, stale-while-revalidate=${oneDay}`,
      });
      res.status(200);
      await stream.Readable.fromWeb(rscAppStream).pipe(res);
      return;
    }

    const htmlStream = await createHtmlStream(rscAppStream, {
      reactSsrManifest,
      bootstrapScripts: [jsManifest[`main.js`]!],
      formState,
    });

    res.set({
      "Content-Type": `text/html; charset=utf-8`,
      "Cache-Control": `s-maxage=60, stale-while-revalidate=${oneDay}`,
    });
    res.status(200);
    // for await (const chunk of htmlStream) {
    //   console.log("chunk", new TextDecoder("utf-8").decode(chunk));
    //   res.write(chunk);
    // }
    // res.end();
    await stream.Readable.fromWeb(htmlStream).pipe(res);
  });
}

async function handlePost(
  handler: (req: Request) => React.ReactNode,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const serverReferenceId = req.get(`x-rsc-action`);

  if (serverReferenceId) {
    // POST via callServer:

    const contentType = req.get(`content-type`);

    const body = await (contentType?.startsWith(`multipart/form-data`)
      ? req.body
      : req.body);

    const rscActionStream = await createRscActionStream({
      body,
      serverReferenceId,
      reactClientManifest,
      reactServerManifest,
    });

    res.set({ "Content-Type": `text/x-component` });
    res.status(rscActionStream ? 200 : 500);
    await stream.Readable.fromWeb(rscActionStream).pipe(res);
    return;
  } else {
    // POST before hydration (progressive enhancement):

    const formData = req.body;
    const formState = await createRscFormState(formData, reactServerManifest);

    return renderApp(handler, req, res, next, formState);
  }
}
