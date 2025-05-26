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

/* Typedefs & schemas for state request */
export type StateRequestBody = {
  guessesByUuid: Record<string, string>;
};
export type StateResponse = {
  rounds: MinimalRounds;
  guessResponses: GuessResponsesByUuid;
};

export const generateResponse = ({
  guessesByUuid,
}: StateRequestBody): StateResponse => {
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
      puzzleStatuses.add(guessResponses[puzzle.uuid]?.status ?? PuzzleStatus.X);
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

  return {
    rounds,
    guessResponses,
  };
};
