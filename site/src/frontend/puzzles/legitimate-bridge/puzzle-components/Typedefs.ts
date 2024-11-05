import { css, type RuleSet } from "styled-components";

export enum NonPuzzleColor {
  GRAY = "GRAY",
}

export enum PuzzleColor {
  WHITE = "WHITE",
  BLACK = "BLACK",
  RED = "RED",
  BLUE = "BLUE",
  YELLOW = "YELLOW",
  PURPLE = "PURPLE",
  ORANGE = "ORANGE",
  CREAM = "CREAM",
}

export type Color = NonPuzzleColor | PuzzleColor;

export const COLOR_TO_CSS: {
  [color in Color]: RuleSet<object>;
} = {
  [PuzzleColor.WHITE]: css`
    background-color: white;
  `,
  [PuzzleColor.BLACK]: css`
    background-color: black;
  `,
  [PuzzleColor.RED]: css`
    background-color: #aa1919;
  `,
  [PuzzleColor.BLUE]: css`
    background-color: #094a89;
  `,
  [PuzzleColor.YELLOW]: css`
    background-color: yellow;
  `,
  [PuzzleColor.PURPLE]: css`
    background-color: #8a19aa;
  `,
  [PuzzleColor.ORANGE]: css`
    background-color: #ff8900;
  `,
  [PuzzleColor.CREAM]: css`
    background-color: #f3d793;
  `,
  [NonPuzzleColor.GRAY]: css`
    background-color: #b1b1b1;
  `,
};

export enum Height {
  HIGH = "HIGH",
  MIDDLE = "MIDDLE",
  LOW = "LOW",
}

export type MinimalNonCreamPuzzle = {
  uuid: string;
  color: PuzzleColor;
  height: Height;
  prompt: string;
  solutionFontSize: number;
  placeholder: string;
  fontSize: number;
};

export type Solution = {
  solutionUuid: string;
  solution: string;
};

export type NonCreamPuzzle = MinimalNonCreamPuzzle & Solution;

export type CreamPart = {
  prompt: string;
  fontSize: number;
};

export type MinimalCreamPuzzle = Omit<MinimalNonCreamPuzzle, "fontSize"> & {
  color: PuzzleColor.CREAM;
  parts: CreamPart[];
};

export type CreamPuzzle = MinimalCreamPuzzle & Solution;

export type MinimalPuzzle = MinimalCreamPuzzle | MinimalNonCreamPuzzle;
export type Puzzle = CreamPuzzle | NonCreamPuzzle;

export function isSolvedPuzzle(
  puzzle: MinimalPuzzle | Puzzle,
): puzzle is Puzzle {
  return "solutionUuid" in puzzle;
}

export function isCreamPuzzle(
  puzzle: MinimalNonCreamPuzzle | MinimalCreamPuzzle,
): puzzle is MinimalCreamPuzzle {
  return puzzle.color === PuzzleColor.CREAM;
}

export type MinimalSubgroup = {
  uuid: string;
  puzzles:
    | [MinimalNonCreamPuzzle]
    | [MinimalNonCreamPuzzle, MinimalNonCreamPuzzle]
    | [MinimalNonCreamPuzzle, MinimalNonCreamPuzzle, MinimalNonCreamPuzzle];
};

export type MinimalBaseGroup<TGroup extends GroupType> = {
  uuid: string;
  type: TGroup;
  firstPuzzle: MinimalNonCreamPuzzle;
};

export type MinimalStandardGroup = MinimalBaseGroup<GroupType.STANDARD> & {
  lastPuzzle?: MinimalNonCreamPuzzle;
  subgroups?: [MinimalSubgroup] | [MinimalSubgroup, MinimalSubgroup];
};

export type MinimalCombineTwoGroup = MinimalBaseGroup<GroupType.COMBINE_TWO> & {
  lastPuzzle?: MinimalCreamPuzzle;
  subgroups?: [MinimalSubgroup] | [MinimalSubgroup, MinimalSubgroup];
};

export type MinimalCombineThreeGroup =
  MinimalBaseGroup<GroupType.COMBINE_THREE> & {
    lastPuzzle?: MinimalCreamPuzzle;
    subgroups?:
      | [MinimalSubgroup]
      | [MinimalSubgroup, MinimalSubgroup]
      | [MinimalSubgroup, MinimalSubgroup, MinimalSubgroup];
  };

export type Subgroup = Omit<MinimalSubgroup, "puzzles"> & {
  puzzles: [NonCreamPuzzle, NonCreamPuzzle, NonCreamPuzzle];
  solutionUuid: string;
  resistance: number;
};

export function isSolvedSubgroup(
  subgroup: Subgroup | MinimalSubgroup,
): subgroup is Subgroup {
  return "solutionUuid" in subgroup;
}

export enum GroupType {
  STANDARD = "STANDARD",
  COMBINE_TWO = "COMBINE_TWO",
  COMBINE_THREE = "COMBINE_THREE",
}

export type BaseGroupSolution = {
  solutionUuid: string;
  firstPuzzle: NonCreamPuzzle;
  finalVoltage: number;
};

export type StandardGroupSolution = BaseGroupSolution & {
  subgroups: [Subgroup, Subgroup];
  lastPuzzle: NonCreamPuzzle;
};

export type CombineGroupSolution = BaseGroupSolution & {
  lastPuzzle: CreamPuzzle;
};

export type CombineTwoGroupSolution = CombineGroupSolution & {
  subgroups: [Subgroup, Subgroup];
};

export type CombineThreeGroupSolution = CombineGroupSolution & {
  subgroups: [Subgroup, Subgroup, Subgroup];
};

export type StandardGroup = Omit<
  MinimalStandardGroup,
  "firstPuzzle" | "lastPuzzle" | "subgroups"
> &
  StandardGroupSolution;

export type CombineTwoGroup = Omit<
  MinimalCombineTwoGroup,
  "firstPuzzle" | "lastPuzzle" | "subgroups"
> &
  CombineTwoGroupSolution;

export type CombineThreeGroup = Omit<
  MinimalCombineThreeGroup,
  "firstPuzzle" | "lastPuzzle" | "subgroups"
> &
  CombineThreeGroupSolution;

export type MinimalGroup =
  | MinimalStandardGroup
  | MinimalCombineTwoGroup
  | MinimalCombineThreeGroup;

export type Group = StandardGroup | CombineTwoGroup | CombineThreeGroup;
