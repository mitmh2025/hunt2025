import { WebSocketExpress, Router } from 'websocket-express';
import { Request, Response, RequestHandler } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import HUNT from '../puzzledata';
import type { Round, PuzzleSlot } from '../puzzledata/types';
import { ROUND_PAGE_MAP } from './components/rounds';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';

const app = new WebSocketExpress();
const router = new Router();

const SHOW_SOLUTIONS = true;
const LOG_REQUESTS = true;
if (LOG_REQUESTS) {
  router.use((req, _res, next) => {
    // Middleware that just logs requests on the way in for development.
    console.log(`${req.method} ${req.path} ${req.headers['cookie']}`);
    next();
  });
}

// An in-memory session map for development, until we have a real backend
type Session = object;
const HACK_SESSIONS = new Map<string, Session>();

// If session is valid, returns session object.  Otherwise, returns undefined.
function fetchSessionState(sessId: string): Session | undefined {
  console.log(`fetch session ${sessId}`);
  // TODO: fetch from backend instead
  return HACK_SESSIONS.get(sessId);
};

// Allowlisted "no login required" routes.  All other requests will redirect to /login (with a next= parameter).
const UNAUTHENTICATED_ROUTES = [
  '/login',
  '/logout',
];

interface RequestWithSession extends Request {
  session: Session;
}

router.use((req, res, next) => {
  if (UNAUTHENTICATED_ROUTES.includes(req.path)) {
    // Allowlisted.  Skip session lookup.
    return next();
  } else {
    // Look up session id in cookie header, if present.
    // If cookie missing or session id invalid, redirect to /login
    // If session valid, populate req.session

    const cookies = req.headers["cookie"];
    if (cookies) {
      const parsedCookies = cookies.split(';').map(c => c.trim());
      const cookieKVPairs = parsedCookies.flatMap((cookie) => {
        const separatorPos = cookie.indexOf("=");
        if (separatorPos === -1) {
          return [];
        } else {
          const key = cookie.slice(0, separatorPos);
          const val = cookie.slice(separatorPos+1);
          return [[key, val]];
        }
      });
      // Only respect the first session cookie provided if multiple are presented.
      const sessionCookiePair = cookieKVPairs.filter(([k,_v]) => k === "sess_id")[0];
      if (sessionCookiePair !== undefined) {
        const sessionId = sessionCookiePair[1]!;
        const session = fetchSessionState(sessionId);
        if (session !== undefined) {
          req.session = session;
          return next();
        } else {
          console.log(`Invalid session id "${sessionId}"`);
        }
      }
    }

    // If for any reason we bailed from the happy path above, we didn't load a valid session.
    // Redirect to the login page.  Save the next param in the URL.
    res.redirect(`/login?next=${encodeURIComponent(req.path)}`);
  }
});

router.get('/login', (_req, res) => {
  const doctype = "<!DOCTYPE html>";
  const doc = (
    <Layout>
      <LoginPage />
    </Layout>
  );
  const html = doctype + renderToString(doc) + "\n";
  res.send(html);
});

// A fixed mock user state, set on initial login.
const SESSION_STUB = {
};

interface LoginQueryTypes {
  next: string;
}
const loginPostHandler: RequestHandler<unknown, unknown, unknown, LoginQueryTypes> = (req, res) => {
  // TODO: extract the POSTed username/password from the form data
  // TODO: implement CSRF tokens for forms
  // TODO: forward the login attempt to the backend, handle failures, and
  //       return the session id provided, instead of this in-memory hack.
  const sessId = crypto.randomUUID();
  HACK_SESSIONS.set(sessId, SESSION_STUB);

  res.setHeader('Set-Cookie', `sess_id=${sessId}`);

  // Redirect to the page the user was trying to view before getting redirected
  // to the login page, or the root route if absent.
  const qs = req.query['next'];
  const target = qs ? (typeof qs === "string" ? qs : qs[0] ) : '/';
  res.redirect(target);
}
router.post('/login', loginPostHandler);

router.get('/logout', (_req, res) => {
  // Unset the sess_id cookie, and redirect back to the index page.
  res.setHeader('Set-Cookie', "sess_id=; expires=Thu, Jan 01 1970 00:00:00 UTC");
  res.redirect('/');
});

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
  const html = "<!DOCTYPE html><html><body><h1>404 Not Found</h1><p>We didn&apos;t find what you were looking for.</p></body></html>";
  res.status(404).send(html);
};

router.get('/', (req, res) => {
  return renderRound(req, res, "sd");
});

router.get('/rounds/:roundSlug', (req: RequestWithSession, res: Response) => {
  // Look up round by slug.  If none exists, 404.
  const round = HUNT.rounds.filter((round) => round.slug === req.params.roundSlug)[0];
  if (round) {
    return renderRound(req, res, round.key)
  } else {
    return render404(req, res);
  }
});

// index known puzzles by slug
const puzzlesBySlug = new Map();
HUNT.rounds.forEach((round) => {
  round.puzzles.forEach((puzzleSlot) => {
    if (puzzleSlot.assignment !== undefined) {
      puzzlesBySlug.set(puzzleSlot.assignment.slug, puzzleSlot);
    }
  });
});

function lookupPuzzleBySlug(slug: string | undefined): [Round, PuzzleSlot] | undefined {
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

router.get('/puzzles/:puzzleSlug', (req: RequestWithSession, res: Response) => {
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

  const doctype = "<!DOCTYPE html>";
  const doc = (
    <Layout session={req.session}>
      <Content />
    </Layout>
  );
  const html = doctype + renderToString(doc) + "\n";
  res.send(html);
});

router.get('/puzzles/:puzzleSlug/solution', (req: RequestWithSession, res: Response) => {
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
  const doctype = "<!DOCTYPE html>";
  const doc = (
    <Layout session={req.session}>
      <Solution />
    </Layout>
  );
  const html = doctype + renderToString(doc) + "\n";
  res.send(html);
});

app.use("/", router);

export default app;
