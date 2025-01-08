import { CLEANSTRING_REGEX } from "./PuzzleConstants";
import {
  ALL_PUZZLES_BY_UUID,
  GROUPED_PUZZLES,
  TUTORIAL_PUZZLES_BY_COLOR,
} from "./Spoilers";
import {
  type Group,
  GroupType,
  isCreamPuzzle,
  type MinimalGroup,
  type MinimalNonCreamPuzzle,
  type MinimalPuzzle,
  type MinimalSubgroup,
  type Puzzle,
  PuzzleColor,
  type Subgroup,
} from "./Typedefs";

const MAX_TUTORIAL_PARALLELISM = 3;
const MAX_GROUP_PARALLELISM = 1;

/**
 * Checks whether a guess is correct for a puzzle, given its uuid.
 * @returns {(string | null)} The solution uuid for the puzzle if the guess is correct, or nothing if the guess is incorrect.
 */
export function checkGuessByUuid({
  uuid,
  guess,
}: {
  uuid: string;
  guess: string;
}): string | null {
  if (uuid in ALL_PUZZLES_BY_UUID) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ids are hard-coded and therefore stable
    const puzzle = ALL_PUZZLES_BY_UUID[uuid]!;
    const cleanGuess = guess.toUpperCase().replaceAll(CLEANSTRING_REGEX, "");
    const cleanSolution = puzzle.solution
      .toUpperCase()
      .replace(CLEANSTRING_REGEX, "");
    if (cleanGuess === cleanSolution) {
      return puzzle.solutionUuid;
    }
    return null;
  } else {
    throw new Error(`Invalid uuid provided for puzzle guess: ${uuid}`);
  }
}

function makeMinimalPuzzle(puzzle: Puzzle): MinimalPuzzle {
  return {
    uuid: puzzle.uuid,
    height: puzzle.height,
    prompt: puzzle.prompt,
    placeholder: puzzle.placeholder,
    solutionFontSize: puzzle.solutionFontSize,
    ...(isCreamPuzzle(puzzle)
      ? // Color must be specified down here so TypeScript knows we're specifying the
        // correct value for a cream puzzle
        { color: PuzzleColor.CREAM, parts: puzzle.parts }
      : { color: puzzle.color, fontSize: puzzle.fontSize }),
  };
}

export function getOpenPuzzlesInGroup(
  solvedUuids: Set<string>,
  puzzles: Puzzle[],
  paralellism: number,
): (Puzzle | MinimalPuzzle)[] {
  let numUnsolvedPuzzles = 0;
  const openPuzzles: MinimalPuzzle[] = [];
  for (const puzzle of puzzles) {
    if (numUnsolvedPuzzles >= paralellism) {
      break;
    }
    if (solvedUuids.has(puzzle.solutionUuid)) {
      openPuzzles.push(puzzle);
    } else {
      numUnsolvedPuzzles++;
      openPuzzles.push(makeMinimalPuzzle(puzzle));
    }
  }
  return openPuzzles;
}

/**
 * Determines which tutorial puzzles should be open for a color, given the list of puzzles a user has solved.
 * There should be up to three tutorial puzzles per color at a time.
 */
export function getOpenPuzzlesForTutorial(
  solvedUuids: Set<string>,
  color: PuzzleColor,
): MinimalPuzzle[] {
  const puzzles = TUTORIAL_PUZZLES_BY_COLOR[color];
  return getOpenPuzzlesInGroup(solvedUuids, puzzles, MAX_TUTORIAL_PARALLELISM);
}

function getMinimalSubgroup(
  solvedUuids: Set<string>,
  subgroup: Subgroup,
): MinimalSubgroup {
  return {
    uuid: subgroup.uuid,
    puzzles: getOpenPuzzlesInGroup(
      solvedUuids,
      subgroup.puzzles,
      MAX_GROUP_PARALLELISM,
    ) as
      | [MinimalNonCreamPuzzle]
      | [MinimalNonCreamPuzzle, MinimalNonCreamPuzzle]
      | [MinimalNonCreamPuzzle, MinimalNonCreamPuzzle, MinimalNonCreamPuzzle],
  };
}

/**
 * Determines which subgroups and puzzles should be open for a given group, given the list of puzzles a user has solved.
 */
export function getMinimalGroup(
  solvedUuids: Set<string>,
  group: Group,
): MinimalGroup {
  const solvedFirstPuzzle = solvedUuids.has(group.firstPuzzle.solutionUuid);
  const minimalGroup: MinimalGroup = {
    uuid: group.uuid,
    type: group.type,
    firstPuzzle: solvedFirstPuzzle
      ? group.firstPuzzle
      : (makeMinimalPuzzle(group.firstPuzzle) as MinimalNonCreamPuzzle),
  };
  if (solvedFirstPuzzle) {
    let subgroups:
      | [MinimalSubgroup]
      | [MinimalSubgroup, MinimalSubgroup]
      | [MinimalSubgroup, MinimalSubgroup, MinimalSubgroup];
    const solvedFirstSubgroup = group.subgroups[0].puzzles.every(
      ({ solutionUuid }) => solvedUuids.has(solutionUuid),
    );
    const solvedSecondSubgroup = group.subgroups[1].puzzles.every(
      ({ solutionUuid }) => solvedUuids.has(solutionUuid),
    );
    if (solvedFirstSubgroup) {
      if (!solvedSecondSubgroup) {
        subgroups = [
          group.subgroups[0],
          getMinimalSubgroup(solvedUuids, group.subgroups[1]),
        ];
      } else {
        const solvedLastPuzzle = solvedUuids.has(group.lastPuzzle.solutionUuid);
        if (group.type === GroupType.COMBINE_THREE) {
          const solvedThirdSubgroup = group.subgroups[2].puzzles.every(
            ({ solutionUuid }) => solvedUuids.has(solutionUuid),
          );
          if (solvedThirdSubgroup) {
            subgroups = [...group.subgroups];
            if (solvedLastPuzzle) {
              minimalGroup.lastPuzzle = group.lastPuzzle;
            } else {
              minimalGroup.lastPuzzle = makeMinimalPuzzle(group.lastPuzzle);
            }
          } else {
            subgroups = [
              group.subgroups[0],
              group.subgroups[1],
              getMinimalSubgroup(solvedUuids, group.subgroups[2]),
            ];
          }
        } else if (solvedLastPuzzle) {
          subgroups = [...group.subgroups];
          minimalGroup.lastPuzzle = group.lastPuzzle;
        } else {
          subgroups = [...group.subgroups];
          minimalGroup.lastPuzzle = makeMinimalPuzzle(group.lastPuzzle);
        }
      }
    } else {
      subgroups = [getMinimalSubgroup(solvedUuids, group.subgroups[0])];
    }
    minimalGroup.subgroups = subgroups;
  }

  return minimalGroup;
}

export function getMinimalGroups(solvedUuids: Set<string>): MinimalGroup[] {
  const groups: MinimalGroup[] = [];
  for (const group of GROUPED_PUZZLES) {
    groups.push(getMinimalGroup(solvedUuids, group));
  }
  return groups;
}
