import { type Dispatch, type Reducer, useReducer } from "react";
import {
  type Group,
  isSolvedPuzzle,
  type MinimalGroup,
  type MinimalPuzzle,
  type MinimalSubgroup,
  type Puzzle,
  PuzzleColor,
  type Subgroup,
} from "./Typedefs";
import { flattenGroup, getSolvedUuids } from "./Util";

type PuzzleState = {
  availablePuzzleGroups: (Group | MinimalGroup)[];
  availableTutorialPuzzles: Record<PuzzleColor, (MinimalPuzzle | Puzzle)[]>;
  selectedColor: PuzzleColor | null;
  selectedGroup: Group | MinimalGroup | null;
  selectedPuzzle: MinimalPuzzle | Puzzle | null;
  selectedSubgroup: MinimalSubgroup | Subgroup | null;
  solvedUuids: Set<string>;
};

const DEFAULT_PUZZLE_STATE: PuzzleState = {
  availablePuzzleGroups: [],
  availableTutorialPuzzles: {
    [PuzzleColor.WHITE]: [],
    [PuzzleColor.BLACK]: [],
    [PuzzleColor.RED]: [],
    [PuzzleColor.BLUE]: [],
    [PuzzleColor.YELLOW]: [],
    [PuzzleColor.PURPLE]: [],
    [PuzzleColor.ORANGE]: [],
    [PuzzleColor.CREAM]: [],
  },
  selectedColor: null,
  selectedGroup: null,
  selectedPuzzle: null,
  selectedSubgroup: null,
  solvedUuids: getSolvedUuids(),
};

export enum PuzzleActionType {
  REFRESH_STATE = "REFRESH_STATE",
  RESET_STATE = "RESET_STATE",
  SELECT_COLOR = "SELECT_COLOR",
  SELECT_GROUP = "SELECT_GROUP",
  SELECT_PUZZLE = "SELECT_PUZZLE",
  SELECT_SUBGROUP = "SELECT_SUBGROUP",
  SET_SOLVED = "SET_SOLVED",
}

type RefreshStateAction = {
  type: PuzzleActionType.REFRESH_STATE;
  tutorialPuzzles: Record<PuzzleColor, (MinimalPuzzle | Puzzle)[]>;
  puzzleGroups?: (Group | MinimalGroup)[];
};

type ResetStateAction = {
  type: PuzzleActionType.RESET_STATE;
};

type SelectColorAction = {
  type: PuzzleActionType.SELECT_COLOR;
  color: PuzzleColor | null;
};

type SelectGroupAction = {
  type: PuzzleActionType.SELECT_GROUP;
  group: Group | MinimalGroup | null;
};

type SelectPuzzleAction = {
  type: PuzzleActionType.SELECT_PUZZLE;
  puzzle: MinimalPuzzle | Puzzle | null;
};

type SelectSubgroupAction = {
  type: PuzzleActionType.SELECT_SUBGROUP;
  subgroup: MinimalSubgroup | Subgroup | null;
};

type SetSolvedAction = {
  type: PuzzleActionType.SET_SOLVED;
  solutionUuid: string;
};

export type PuzzleAction =
  | RefreshStateAction
  | ResetStateAction
  | SelectColorAction
  | SelectGroupAction
  | SelectPuzzleAction
  | SelectSubgroupAction
  | SetSolvedAction;

const reducer: Reducer<PuzzleState, PuzzleAction> = (
  state: PuzzleState,
  action: PuzzleAction,
): PuzzleState => {
  switch (action.type) {
    case PuzzleActionType.REFRESH_STATE: {
      // Refresh group/subgroup/puzzle status if those specific groups/puzzles/subgroups have been solved
      let newSelectedGroup: Group | MinimalGroup | null = null;
      let newSelectedPuzzle: MinimalPuzzle | Puzzle | null = null;
      let newSelectedSubgroup: MinimalSubgroup | Subgroup | null = null;
      if (action.puzzleGroups) {
        const selectedGroup = state.selectedGroup;
        if (selectedGroup) {
          const maybeGroup = action.puzzleGroups.find(
            (group) => group.uuid === selectedGroup.uuid,
          );
          if (maybeGroup) {
            newSelectedGroup = maybeGroup;

            const selectedSubgroup = state.selectedSubgroup;
            const subgroups = maybeGroup.subgroups;
            if (selectedSubgroup && subgroups) {
              const maybeSubgroup = subgroups.find(
                (subgroup) => subgroup.uuid === selectedSubgroup.uuid,
              );
              if (maybeSubgroup) {
                newSelectedSubgroup = maybeSubgroup;
              }
            }
            const selectedPuzzle = state.selectedPuzzle;
            if (selectedPuzzle) {
              const maybePuzzle = flattenGroup(maybeGroup).find(
                (puzzle) => puzzle.uuid === selectedPuzzle.uuid,
              );
              if (maybePuzzle && isSolvedPuzzle(maybePuzzle)) {
                newSelectedPuzzle = maybePuzzle;
              }
            }
          }
        }
      }
      return {
        ...state,
        availablePuzzleGroups:
          action.puzzleGroups ?? state.availablePuzzleGroups,
        availableTutorialPuzzles: action.tutorialPuzzles,
        selectedGroup: newSelectedGroup ?? state.selectedGroup,
        selectedPuzzle: newSelectedPuzzle ?? state.selectedPuzzle,
        selectedSubgroup: newSelectedSubgroup ?? state.selectedSubgroup,
      };
    }
    case PuzzleActionType.RESET_STATE:
      return {
        ...DEFAULT_PUZZLE_STATE,
      };
    case PuzzleActionType.SELECT_COLOR:
      return {
        ...state,
        selectedColor: action.color,
        selectedGroup: null,
        selectedPuzzle: null,
        selectedSubgroup: null,
      };
    case PuzzleActionType.SELECT_GROUP:
      return {
        ...state,
        selectedColor: null,
        selectedGroup: action.group,
        selectedPuzzle: null,
        selectedSubgroup: null,
      };
    case PuzzleActionType.SELECT_PUZZLE:
      return {
        ...state,
        selectedColor: null,
        selectedSubgroup: null,
        selectedPuzzle: action.puzzle,
      };
    case PuzzleActionType.SELECT_SUBGROUP:
      return {
        ...state,
        selectedColor: null,
        selectedSubgroup: action.subgroup,
        selectedPuzzle: null,
      };
    case PuzzleActionType.SET_SOLVED:
      return {
        ...state,
        solvedUuids: new Set([...state.solvedUuids, action.solutionUuid]),
      };
    default:
      return state;
  }
};

export default function usePuzzleState(): [
  PuzzleState,
  Dispatch<PuzzleAction>,
] {
  return useReducer(reducer, DEFAULT_PUZZLE_STATE);
}
