import { type RequestHandler, type Request, type Response } from "express";
import { Router } from "websocket-express";
import { z } from "zod";
import enumd from "./assets/enumd.mp3";
import {
  checkGuessByUuid,
  getRoundByPuzzleUuid,
  makeMinimalRound,
} from "./puzzle-components/SpoilerUtil";
import { ROUNDS } from "./puzzle-components/Spoilers";
import {
  type GuessResponsesByUuid,
  type MinimalRound,
  type MinimalRounds,
  RoundStatus,
  PuzzleStatus,
} from "./puzzle-components/Typedefs";

type ErrorResponse = {
  error: string;
};

/* Typedefs & schemas for state request */
type StateRequestBody = {
  guessesByUuid: Record<string, string>;
};
type StateResponse = {
  rounds: MinimalRounds;
  guessResponses: GuessResponsesByUuid;
};
type StateResponseBody = StateResponse | ErrorResponse;
const stateRequestBodySchema = z.object({
  guessesByUuid: z.record(z.string(), z.string()),
});

/*
 * Puzzle state request.
 * Given all guesses for all puzzles, return what puzzles & rounds should be available.
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
    const { guessesByUuid } = stateRequestBodySchema.parse(req.body);
    // Start with the Apostrophe round.
    let highestRound = 1;
    const guessResponses: GuessResponsesByUuid = {};
    for (const [uuid, guess] of Object.entries(guessesByUuid)) {
      // What round is this puzzle in?
      const round = getRoundByPuzzleUuid(uuid);
      if (highestRound < round.order) {
        highestRound = round.order;
      }
      guessResponses[uuid] = checkGuessByUuid(uuid, guess);
    }

    const roundStatuses = new Set<RoundStatus>();
    const minimalRounds: MinimalRound[] = [];
    let previousRoundStatus: RoundStatus | null = null;
    for (const round of ROUNDS) {
      if (previousRoundStatus === RoundStatus.INCOMPLETE) {
        break;
      }
      let roundStatus: RoundStatus;
      const puzzleStatuses = new Set<PuzzleStatus>();
      for (const puzzle of round.puzzles) {
        puzzleStatuses.add(
          guessResponses[puzzle.uuid]?.status ?? PuzzleStatus.X,
        );
      }
      if (puzzleStatuses.size === 1) {
        if (puzzleStatuses.has(PuzzleStatus.CHECK)) {
          roundStatus = RoundStatus.COMPLETED;
        } else if (puzzleStatuses.has(PuzzleStatus.QUESTION)) {
          roundStatus = RoundStatus.SOMEHOW_COMPLETED;
        } else {
          roundStatus = RoundStatus.INCOMPLETE;
        }
      } else {
        roundStatus = RoundStatus.INCOMPLETE;
      }
      previousRoundStatus = roundStatus;
      roundStatuses.add(roundStatus);
      minimalRounds.push(makeMinimalRound(round, roundStatus));
    }

    const rounds: MinimalRounds = {
      rounds: minimalRounds,
    };
    if (rounds.rounds.length === ROUNDS.length && roundStatuses.size === 1) {
      if (roundStatuses.has(RoundStatus.SOMEHOW_COMPLETED)) {
        rounds.message =
          "Congratulations? You have won the spelling bee? Judge Dexter applauds you, but the other judges’ notes are filled with red marks. Merriam doesn’t understand what he is hearing and Webster can’t find the right words.";
        rounds.audio = enumd;
      } else if (roundStatuses.has(RoundStatus.COMPLETED)) {
        rounds.message =
          "Congratulations! You have won the spelling bee! But for some reason, one of the judges looks very solty…";
      }
    }

    const responseBody: StateResponseBody = {
      rounds,
      guessResponses,
    };
    res.status(200).json(responseBody);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid Inputs" });
  }
};

const router = new Router();
router.post("/state", stateHandler);
export default router;
