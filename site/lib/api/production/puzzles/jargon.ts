import {
  type Group,
  type MinimalGroup,
  type MinimalPuzzle,
  type Puzzle,
  type PuzzleColor,
} from "../../../../src/frontend/puzzles/legitimate-bridge/puzzle-components/Typedefs";
import rootUrl from "../../../../src/frontend/utils/rootUrl";

export async function makeGuess({
  uuid,
  guess,
}: {
  uuid: string;
  guess: string;
}): Promise<{
  solutionUuid?: string;
}> {
  const response = await fetch(`${rootUrl}/puzzles/jargon/puzzle/${uuid}`, {
    method: "POST",
    body: JSON.stringify({ guess }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("An unexpected error occurred");
  }

  const { solutionUuid } = (await response.json()) as {
    solutionUuid?: string;
  };
  return { solutionUuid };
}

export async function getState(solvedUuids: Set<string>): Promise<{
  tutorialPuzzles: Record<PuzzleColor, (MinimalPuzzle | Puzzle)[]>;
  puzzleGroups?: (Group | MinimalGroup)[];
}> {
  const response = await fetch(`${rootUrl}/puzzles/jargon/state`, {
    method: "POST",
    body: JSON.stringify({ solvedUuids: [...solvedUuids] }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An unexpected error occurred");
  }

  return (await response.json()) as {
    tutorialPuzzles: Record<PuzzleColor, (MinimalPuzzle | Puzzle)[]>;
    puzzleGroups?: (Group | MinimalGroup)[];
  };
}
