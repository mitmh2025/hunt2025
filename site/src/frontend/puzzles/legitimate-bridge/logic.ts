import {
  getOpenPuzzlesForTutorial,
  getMinimalGroups,
} from "./puzzle-components/SpoilerUtils";
import {
  TUTORIAL_COLORS,
  TUTORIAL_SOLUTION_UUIDS,
} from "./puzzle-components/Spoilers";
import {
  type Group,
  type MinimalGroup,
  type MinimalPuzzle,
  type Puzzle,
  PuzzleColor,
} from "./puzzle-components/Typedefs";

export const computeState = (
  solvedUuids: Set<string>,
): {
  tutorialPuzzles: Record<PuzzleColor, (MinimalPuzzle | Puzzle)[]>;
  puzzleGroups?: (Group | MinimalGroup)[];
} => {
  const tutorialPuzzles = TUTORIAL_COLORS.reduce(
    (acc: Record<PuzzleColor, MinimalPuzzle[]>, color: PuzzleColor) => {
      acc[color] = getOpenPuzzlesForTutorial(solvedUuids, color);
      return acc;
    },
    {
      [PuzzleColor.WHITE]: [],
      [PuzzleColor.BLACK]: [],
      [PuzzleColor.RED]: [],
      [PuzzleColor.BLUE]: [],
      [PuzzleColor.YELLOW]: [],
      [PuzzleColor.PURPLE]: [],
      [PuzzleColor.ORANGE]: [],
      [PuzzleColor.CREAM]: [],
    },
  );

  const numValidTutorialSolutionUuids = [...solvedUuids].filter((uuid) =>
    TUTORIAL_SOLUTION_UUIDS.has(uuid),
  ).length;
  const showGroups =
    numValidTutorialSolutionUuids >=
    Math.floor(TUTORIAL_SOLUTION_UUIDS.size / 2);

  return {
    tutorialPuzzles,
    ...(showGroups ? { puzzleGroups: getMinimalGroups(solvedUuids) } : {}),
  };
};
