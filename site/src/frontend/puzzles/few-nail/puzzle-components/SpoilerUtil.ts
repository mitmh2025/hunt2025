import { CLEANSTRING_REGEX } from "./Constants";
import {
  PUZZLES_BY_UUID,
  ROUNDS_BY_PUZZLE_UUID,
  ROUNDS_BY_SOLUTION_A_UUID,
  ROUNDS_BY_SOLUTION_B_UUID,
} from "./Spoilers";
import {
  type MinimalPuzzle,
  type MinimalRound,
  type Puzzle,
  type GuessResponse,
  PuzzleStatus,
  type Round,
  RoundStatus,
} from "./Typedefs";

export const makeMinimalPuzzle = (puzzle: Puzzle): MinimalPuzzle => {
  return {
    uuid: puzzle.uuid,
    wordAudio: puzzle.wordAudio,
    meaningAudio: puzzle.meaningAudio,
    useAudio: puzzle.useAudio,
  };
};

export const makeMinimalRound = (
  round: Round,
  status: RoundStatus,
): MinimalRound => {
  return {
    name: round.name,
    puzzles: round.puzzles.map((puzzle) => makeMinimalPuzzle(puzzle)),
    ...(status === RoundStatus.SOMEHOW_COMPLETED
      ? {
          status: RoundStatus.SOMEHOW_COMPLETED,
          message: "Congratulations? You have somehow completed this round.",
          enumerationAudio: round.enumerationAudio,
        }
      : status === RoundStatus.COMPLETED
        ? {
            status: RoundStatus.COMPLETED,
            message: "Congratulations! You have completed this round.",
          }
        : { status }),
  };
};

export const getRoundByPuzzleUuid = (uuid: string): Round => {
  const round =
    ROUNDS_BY_PUZZLE_UUID[uuid] ??
    ROUNDS_BY_SOLUTION_A_UUID[uuid] ??
    ROUNDS_BY_SOLUTION_B_UUID[uuid] ??
    null;
  if (!round) {
    throw new Error(`Could not find round for puzzle ${uuid}`);
  }
  return round;
};

function padGuess(cleanGuess: string, cleanAnswerA: string): string {
  if (cleanGuess.length >= cleanAnswerA.length) {
    return cleanGuess;
  } else if (cleanGuess === cleanAnswerA.slice(0, cleanGuess.length)) {
    return cleanGuess + "-";
  }
  return cleanGuess;
}

function findFirstWrongCharIndex(paddedGuess: string, cleanAnswerA: string) {
  for (let i = 0; i < Math.min(paddedGuess.length, cleanAnswerA.length); i++) {
    if (paddedGuess[i] !== cleanAnswerA[i]) {
      return i;
    }
  }
  return cleanAnswerA.length;
}

export const checkGuessByUuid = (
  uuid: string,
  guess: string,
): GuessResponse => {
  const puzzle = PUZZLES_BY_UUID[uuid];
  if (!puzzle) {
    throw new Error(`Could not found puzzle ${uuid}`);
  }
  const cleanGuess = guess.toUpperCase().replaceAll(CLEANSTRING_REGEX, "");
  const cleanAnswerA = puzzle.answerA
    .toUpperCase()
    .replace(CLEANSTRING_REGEX, "");
  const cleanAnswerB = puzzle.answerB
    .toUpperCase()
    .replace(CLEANSTRING_REGEX, "");
  if (cleanGuess === cleanAnswerA) {
    return {
      uuid: puzzle.solutionAUuid,
      response: guess,
      status: PuzzleStatus.CHECK,
    };
  } else if (cleanGuess === cleanAnswerB) {
    return {
      uuid: puzzle.solutionBUuid,
      response: guess,
      status: PuzzleStatus.QUESTION,
    };
  } else {
    // Find the first index at which there is an incorrect letter, according answerA.
    const paddedGuess = padGuess(cleanGuess, cleanAnswerA);
    const firstIncorrectIndex = findFirstWrongCharIndex(
      paddedGuess,
      cleanAnswerA,
    );
    return {
      uuid: puzzle.uuid,
      response: paddedGuess,
      firstIncorrectIndex,
      status: PuzzleStatus.X,
    };
  }
};
