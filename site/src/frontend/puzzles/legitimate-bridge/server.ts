import { type RequestHandler, type Request, type Response } from "express";
import { Router } from "websocket-express";
import { z } from "zod";
import { computeState } from "./logic";
import { checkGuessByUuid } from "./puzzle-components/SpoilerUtils";
import {
  type Group,
  type MinimalGroup,
  type MinimalPuzzle,
  type Puzzle,
  type PuzzleColor,
} from "./puzzle-components/Typedefs";

type ErrorResponse = {
  error: string;
};

/* Typedefs & schemas for state request */
type StateRequestBody = {
  solvedUuids: string[];
};
type StateResponse = {
  tutorialPuzzles: Record<PuzzleColor, (MinimalPuzzle | Puzzle)[]>;
  puzzleGroups?: (Group | MinimalGroup)[];
};
type StateResponseBody = StateResponse | ErrorResponse;
const stateRequestBodySchema = z.object({ solvedUuids: z.array(z.string()) });

/*
 * Puzzle state request.
 * Given all solved puzzles, figure out which puzzles should be shown to the user.
 */
const stateHandler: RequestHandler<
  Record<string, never>,
  StateResponseBody,
  StateRequestBody,
  Record<string, never>
> = (
  req: Request<Record<string, never>, StateResponseBody, StateRequestBody>,
  res: Response<StateResponseBody>,
) => {
  try {
    const { solvedUuids } = stateRequestBodySchema.parse(req.body);
    const uniqueSolvedUuids = new Set(solvedUuids);

    const responseBody = computeState(uniqueSolvedUuids);

    res.status(200).json(responseBody);
  } catch (error) {
    res.status(400).json({ error: "Invalid Inputs" });
  }
};

/* Typedefs and helpers for guess request */
type GuessRequestParams = {
  uuid: string;
};
type GuessRequestBody = {
  guess: string;
};
type IncorrectGuessResponse = Record<string, never>;
type CorrectGuessResponse = {
  solutionUuid: string;
};
type GuessResponseBody =
  | IncorrectGuessResponse
  | CorrectGuessResponse
  | ErrorResponse;
const guessRequestBodySchema = z.object({ guess: z.string() });

/*
 * Panel guess request.
 * Requires 'unsolved' UUID as a path parameter and guess as a body parameter.
 * If guess is correct, provides the solution UUID. If guess is incorrect, returns empty object.
 */
const guessHandler: RequestHandler<
  GuessRequestParams,
  GuessResponseBody,
  GuessRequestBody
> = (
  req: Request<GuessRequestParams, GuessResponseBody, GuessRequestBody>,
  res: Response<GuessResponseBody>,
) => {
  try {
    const { uuid } = req.params;
    const { guess } = guessRequestBodySchema.parse(req.body);
    const maybeSolutionUuid = checkGuessByUuid({ uuid, guess });
    if (maybeSolutionUuid !== null) {
      res.status(200).json({ solutionUuid: maybeSolutionUuid });
    } else {
      res.status(200).json({});
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Inputs" });
  }
};

const router = new Router();
router.post("/puzzle/:uuid", guessHandler);
router.post("/state", stateHandler);
export default router;
