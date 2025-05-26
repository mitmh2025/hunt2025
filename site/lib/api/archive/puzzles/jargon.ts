import { computeState } from "../../../../src/frontend/puzzles/legitimate-bridge/logic";
import { checkGuessByUuid } from "../../../../src/frontend/puzzles/legitimate-bridge/puzzle-components/SpoilerUtils";
import {
  type Group,
  type MinimalGroup,
  type MinimalPuzzle,
  type Puzzle,
  type PuzzleColor,
} from "../../../../src/frontend/puzzles/legitimate-bridge/puzzle-components/Typedefs";

export function makeGuess({
  uuid,
  guess,
}: {
  uuid: string;
  guess: string;
}): Promise<{
  solutionUuid?: string;
}> {
  return Promise.resolve({
    solutionUuid: checkGuessByUuid({ uuid, guess }) ?? undefined,
  });
}

export async function getState(solvedUuids: Set<string>): Promise<{
  tutorialPuzzles: Record<PuzzleColor, (MinimalPuzzle | Puzzle)[]>;
  puzzleGroups?: (Group | MinimalGroup)[];
}> {
  return Promise.resolve(computeState(solvedUuids));
}
