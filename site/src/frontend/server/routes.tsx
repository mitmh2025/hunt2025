import {
  type Request,
  type Response,
  type RequestHandler,
  type NextFunction,
} from "express";
import asyncHandler from "express-async-handler";
import { Router } from "websocket-express";
import { newAuthClient } from "../../../lib/api/auth_client";
import { newClient } from "../../../lib/api/client";
import { newFrontendClient } from "../../../lib/api/frontend_client";
import { type Hunt } from "../../huntdata/types";
import { PUZZLES } from "../puzzles";
import {
  comboLockPostHandler,
  fuseboxPostHandler,
  modalPostHandler,
  nodeRequestHandler,
} from "../rounds/illegal_search";
import { addParserMiddleware } from "../utils/expressMiddleware";
import renderApp, { render500 } from "../utils/renderApp";
import { activityLogHandler } from "./routes/activity_log";
import { allPuzzlesHandler } from "./routes/all_puzzles";
import {
  interactionCompletePostHandler,
  type InteractionParams,
  interactionRequestHandler,
  interactionStartPostHandler,
} from "./routes/interaction";
import { hackLoginGetHandler } from "./routes/login";
import {
  puzzleHandler,
  type PuzzleParams,
  solutionHandler,
  puzzleGuessPostHandler,
  puzzleUnlockPostHandler,
} from "./routes/puzzle";
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

export function getBaseRouter({
  apiUrl,
  frontendApiSecret,
}: {
  apiUrl: string;
  frontendApiSecret: string;
}) {
  const router = new Router();
  addParserMiddleware(router, {
    cookies: true,
    urlencoded: true,
    json: true,
    text: true,
  });

  router.use((req: Request, _res: Response, next: NextFunction) => {
    req.authApi = newAuthClient(apiUrl);
    req.frontendApi = newFrontendClient(apiUrl, frontendApiSecret);
    req.api = newClient(
      apiUrl,
      req.cookies.mitmh2025_auth as string | undefined,
    );
    next();
  });

  return router;
}

export function getAuthRouter() {
  const authRouter = new Router();
  authRouter.use(
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const teamStateResp = await req.api.getMyTeamState();
      if (teamStateResp.status === 401) {
        // Unauthorized means we should prompt the user to log in
        res.redirect(`/login?next=${encodeURIComponent(req.path)}`);
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
  return authRouter;
}

export function registerUiRoutes({
  hunt,
  authRouter,
  unauthRouter,
}: {
  hunt: Hunt;
  authRouter: Router;
  unauthRouter: Router;
}) {
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
        req.params.roundSlug = "the_missing_diamond";
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
  authRouter.get("/rounds/illegal_search/node/:nodeSlug", nodeRequestHandler);
  authRouter.post("/rounds/illegal_search/modal", modalPostHandler);
  authRouter.post(
    "/rounds/illegal_search/locks/painting1",
    comboLockPostHandler,
  );
  authRouter.post("/rounds/illegal_search/locks/painting2", fuseboxPostHandler);
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
    "/interactions/:slug",
    asyncHandler(
      async (
        req: Request<InteractionParams>,
        res: Response,
        next: NextFunction,
      ) => {
        await renderApp(interactionRequestHandler, req, res, next);
      },
    ),
  );
  // These two POST handlers for interactions are currently only used for devtools to allow
  // synthesizing starting and completing the interaction.  In practice, the backend would determine
  // when the interaction has completed and with what result.
  authRouter.post("/interactions/:slug/start", interactionStartPostHandler);
  authRouter.post(
    "/interactions/:slug/complete",
    interactionCompletePostHandler,
  );

  authRouter.get(
    "/all_puzzles",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      await renderApp(allPuzzlesHandler, req, res, next);
    }),
  );

  authRouter.get(
    "/activity_log",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      await renderApp(activityLogHandler, req, res, next);
    }),
  );

  // Mount any puzzle-specific routes
  hunt.rounds.forEach((round) => {
    round.puzzles.forEach((puzzle) => {
      const slug = puzzle.slug;
      if (slug) {
        const puzzleDefinition = PUZZLES[slug];
        if (puzzleDefinition && "router" in puzzleDefinition) {
          const puzzleRouter = puzzleDefinition.router;
          if (puzzleRouter) {
            const base = `/puzzles/${slug}`;
            //console.log("Mounting handler at", base);
            authRouter.use(base, puzzleRouter);
          }
        }
      }
    });
  });
}
