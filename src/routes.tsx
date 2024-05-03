import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  request,
} from "express";
import React from "react";
import { Router } from "websocket-express";
import { renderToString } from "react-dom/server";
import { newClient } from "./api/client";
import cookieParser from "cookie-parser";

import type { Round, PuzzleSlot } from "../puzzledata/types";
import HUNT from "../puzzledata";
import { ROUND_PAGE_MAP } from "./components/rounds";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";

const SHOW_SOLUTIONS = true;
const LOG_REQUESTS = true;

function requestLogger(req: Request, _res: Response, next: NextFunction) {
  // Middleware that just logs requests on the way in for development
  console.log(`${req.method} ${req.path} ${req.headers["cookie"]}`);
  next();
}

function hackLoginGetHandler(_req: Request, res: Response) {
  const doctype = "<!DOCTYPE html>";
  const doc = (
    <Layout>
      <LoginPage />
    </Layout>
  );
  const html = doctype + renderToString(doc) + "\n";
  res.send(html);
}

interface LoginQueryTypes {
  next: string;
}
interface RequestWithAPI extends Request {
  api: ReturnType<typeof newClient>;
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

  const doctype = "<!DOCTYPE html>";
  // TODO: pass props about current unlock state to Component
  const doc = (
    <Layout session={req.session}>
      <Component session={req.session} />
    </Layout>
  );
  const html = doctype + renderToString(doc) + "\n";
  res.send(html);
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

  const doctype = "<!DOCTYPE html>";
  const doc = (
    <Layout session={req.session}>
      <h1>{title}</h1>
      {/* TODO: add guess form, history, errata, etc. */}
      <div id="puzzle-content">
        <Content />
      </div>
    </Layout>
  );
  const html = doctype + renderToString(doc) + "\n";
  res.send(html);
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
  const doctype = "<!DOCTYPE html>";
  const doc = (
    <Layout session={req.session}>
      <h1>Solution to {title}</h1>
      <div id="solution-content">
        <Solution />
      </div>
    </Layout>
  );
  const html = doctype + renderToString(doc) + "\n";
  res.send(html);
}

export function getUiRouter({ apiUrl }) {
  const router = new Router();
  if (LOG_REQUESTS) {
    router.use(requestLogger);
  }
  router.use(cookieParser());
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  router.use((req, res, next) => {
    req.api = newClient(apiUrl, req.cookies["mitmh2025_auth"]);
    return next();
  });

  router.get("/login", hackLoginGetHandler);
  router.post("/login", loginPostHandler);
  router.get("/logout", logoutHandler);

  router.get("/", (req, res) => {
    // Root page should be shadow diamond round page
    return renderRound(req, res, "sd");
  });
  router.get("/rounds/:roundSlug", roundHandler);
  router.get("/puzzles/:puzzleSlug", puzzleHandler);
  router.get("/puzzles/:puzzleSlug/solution", solutionHandler);
  return router;
}
