import express, { Request, Response, RequestHandler, NextFunction } from "express";
import { Router } from "websocket-express";
import { Client, newClient } from "@/api/client";
import cookieParser from "cookie-parser";
import multer from "multer";
import parseurl from "parseurl";
import stream from "stream";
import path from "path";

import {routerLocationAsyncLocalStorage} from '@mfng/core/router-location-async-local-storage';
import {
  createRscActionStream,
  createRscAppStream,
  createRscFormState,
} from '@mfng/core/server/rsc';
import {createHtmlStream} from '@mfng/core/server/ssr';
import * as React from 'react';
import type {ReactFormState} from 'react-dom/server';
//import * as manifests from './handler/manifests.js';
import {
  cssManifest,
  jsManifest,
  reactClientManifest,
  reactServerManifest,
  reactSsrManifest,
} from './handler/manifests.js';

//console.log("manifests", manifests);

import type { Round, PuzzleSlot } from "../puzzledata/types";
import HUNT from "../puzzledata";
import { ROUND_PAGE_MAP } from "./components/rounds";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";

const SHOW_SOLUTIONS = true;

function hackLoginGetHandler(_req: Request, res: Response) {
  return (
    <Layout>
      <LoginPage />
    </Layout>
  );
}

interface LoginQueryTypes {
  next: string;
}
interface RequestWithAPI extends Request {
  api: Client;
}
const loginPostHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  LoginQueryTypes
> = async (req: RequestWithAPI, res) => {
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

const renderRound = (req: Request, res: Response, roundKey: string) => {
  const Component = ROUND_PAGE_MAP[roundKey]!;

  // TODO: pass props about current unlock state to Component
  return (
    <Layout teamState={req.teamState}>
      <Component />
    </Layout>
  );
};

const render404 = (_req: Request, res: Response) => {
  const html =
    "<!DOCTYPE html><html><body><h1>404 Not Found</h1><p>We didn&apos;t find what you were looking for.</p></body></html>";
  res.status(404).send(html);
};

function roundHandler(req: RequestWithAPI, res: Response) {
  // Look up round by slug.  If none exists, 404.
  const round = HUNT.rounds.filter(
    (round) => round.slug === req.params.roundSlug,
  )[0];
  if (round) {
    return renderRound(req, res, round.key);
  } else {
    return render404(req, res);
  }
}

function lookupPuzzleBySlug(
  slug: string | undefined,
): [Round, PuzzleSlot] | undefined {
  if (slug === undefined) return undefined;
  // returns [round, puzzle] if found or undefined if not
  const rounds = HUNT.rounds;
  for (let r = 0; r < rounds.length; r++) {
    const round = rounds[r]!;
    const puzzles = round.puzzles;
    for (let p = 0; p < puzzles.length; p++) {
      const puzzleSlot = puzzles[p]!;
      if (puzzleSlot.assignment !== undefined) {
        if (puzzleSlot.assignment.slug === slug) {
          return [round, puzzleSlot];
        }
      }
    }
  }

  return undefined;
}

function puzzleHandler(req: RequestWithAPI, res: Response) {
  // Look up puzzle by slug.  If none exists, 404.
  const slug = req.params.puzzleSlug;
  const match = lookupPuzzleBySlug(slug);
  if (match === undefined) {
    return render404(req, res);
  }

  // Puzzle is valid and known to have an assignment.
  const [_round, puzzleSlot] = match;

  // TODO: look up round-specific puzzle page layout, if applicable.  For
  // outlands puzzles, the layout may depend on round and puzzle visibility.

  // TODO: fetch puzzle details from backend (in particular, for guess history)

  // Select content component.
  const Content = puzzleSlot.assignment!.content;
  const title = puzzleSlot.assignment!.title;

  return (
    <Layout teamState={req.teamState}>
      <h1>{title}</h1>
      {/* TODO: add guess form, history, errata, etc. */}
      <div id="puzzle-content">
        <Content />
      </div>
    </Layout>
  );
}

function solutionHandler(req: RequestWithAPI, res: Response) {
  // Only show solutions if we're in dev mode
  if (process.env.NODE_ENV !== "development" || SHOW_SOLUTIONS !== true) {
    return render404(req, res);
  }

  const slug = req.params.puzzleSlug;
  const match = lookupPuzzleBySlug(slug);
  if (match === undefined) {
    return render404(req, res);
  }
  const [_round, puzzleSlot] = match;

  // TODO: look up round-specific solution page layout if applicable.

  const Solution = puzzleSlot.assignment!.solution;
  const title = puzzleSlot.assignment!.title;
  return (
    <Layout teamState={req.teamState}>
      <h1>Solution to {title}</h1>
      <div id="solution-content">
        <Solution />
      </div>
    </Layout>
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

  // FIXME: routes
  router.get("/", renderApp);
  router.post("/", handlePost);

  return router;
}

function App(req: RequestWithAPI) {
  return (
    <Layout teamState={req?.teamState}>
      <div>Hello world</div>
    </Layout>);
}

const oneDay = 60 * 60 * 24;

async function renderApp(
  req: Request,
  res: Response,
  next: NextFunction,
  formState?: ReactFormState,
) {
  const {pathname, search} = parseurl(req);


  return routerLocationAsyncLocalStorage.run({pathname, search}, async () => {
    const rscAppStream = createRscAppStream(<App req={req}/>, {
      reactClientManifest,
      //FIXME: mainCssHref: cssManifest[`main.css`]!,
      formState,
    });

    if (req.get('accept') === `text/x-component`) {
      res.set({
        'Content-Type': `text/x-component; charset=utf-8`,
        'Cache-Control': `s-maxage=60, stale-while-revalidate=${oneDay}`,
      });
      res.status(200);
      await stream.Readable.fromWeb(rscAppStream).pipe(res);
      return;
    }

    console.log("ssr manifest", reactSsrManifest);

    const htmlStream = await createHtmlStream(rscAppStream, {
      reactSsrManifest,
      bootstrapScripts: [jsManifest[`main.js`]!],
      formState,
    });

    res.set({
      'Content-Type': `text/html; charset=utf-8`,
      'Cache-Control': `s-maxage=60, stale-while-revalidate=${oneDay}`,
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

async function handlePost(req: Request, res: Response, next: NextFunction) {
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

    res.set({'Content-Type': `text/x-component`});
    res.status(rscActionStream ? 200 : 500);
    await stream.Readable.fromWeb(rscActionStream).pipe(res);
    return;
  } else {
    // POST before hydration (progressive enhancement):

    const formData = req.body;
    const formState = await createRscFormState(formData, reactServerManifest);

    return renderApp(req, res, next, formState);
  }
}

function getRoutes() {
  // FIXME
  const unauthRouter = express.Router();
  unauthRouter.use((req, res, next) => {
    req.api = newClient(apiUrl, req.cookies["mitmh2025_auth"]);
    return next();
  });

  const authRouter = express.Router();
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

  unauthRouter.get("/login", hackLoginGetHandler);
  unauthRouter.post("/login", loginPostHandler);
  unauthRouter.get("/logout", logoutHandler);

  authRouter.get("/", (req, res) => {
    // Root page should be shadow diamond round page
    return renderRound(req, res, "sd");
  });
  authRouter.get("/rounds/:roundSlug", roundHandler);
  authRouter.get("/puzzles/:puzzleSlug", puzzleHandler);
  authRouter.get("/puzzles/:puzzleSlug/solution", solutionHandler);

  router.use(unauthRouter);
  router.use(authRouter);

  return router;
}
