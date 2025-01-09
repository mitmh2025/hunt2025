import { type Dispatch, type Reducer, useReducer } from "react";
import type {
  GuessResponsesByUuid,
  MinimalPuzzle,
  MinimalRound,
  MinimalRounds,
} from "./Typedefs";
import { getGuessedUuids, getGuessesByUuid } from "./Util";

export type PuzzleState = {
  availableRounds: MinimalRounds;
  disabledByUuid: Record<string, boolean>;
  guessedUuids: Set<string>;
  guessResponsesByUuid: GuessResponsesByUuid;
  queryByUuid: Record<string, string>;
};

const DEFAULT_PUZZLE_STATE = {
  availableRounds: { rounds: [] },
  disabledByUuid: [...getGuessedUuids()].reduce<Record<string, boolean>>(
    (acc, uuid) => {
      acc[uuid] = true;
      return acc;
    },
    {},
  ),
  guessedUuids: getGuessedUuids(),
  guessResponsesByUuid: {},
  queryByUuid: getGuessesByUuid(),
};

export enum PuzzleActionType {
  GUESS = "GUESS",
  INPUT = "INPUT",
  REFRESH_STATE = "REFRESH_STATE",
  RESTART_PUZZLE = "RESTART_PUZZLE",
  RESTART_ROUND = "RESTART_ROUND",
}

type GuessAction = {
  type: PuzzleActionType.GUESS;
  uuid: string;
  guess: string;
};

type InputAction = {
  type: PuzzleActionType.INPUT;
  uuid: string;
  input: string;
};

type RefreshStateAction = {
  type: PuzzleActionType.REFRESH_STATE;
  availableRounds: MinimalRounds;
  guessResponsesByUuid: GuessResponsesByUuid;
};

type RestartPuzzleAction = {
  type: PuzzleActionType.RESTART_PUZZLE;
};

type RestartRoundAction = {
  type: PuzzleActionType.RESTART_ROUND;
  round: MinimalRound;
};

export type PuzzleAction =
  | GuessAction
  | InputAction
  | RefreshStateAction
  | RestartPuzzleAction
  | RestartRoundAction;

const reducer: Reducer<PuzzleState, PuzzleAction> = (
  state: PuzzleState,
  action: PuzzleAction,
): PuzzleState => {
  switch (action.type) {
    case PuzzleActionType.GUESS: {
      const newGuessedUuids = [...state.guessedUuids, action.uuid];
      const newDisabledByUuid = {
        ...state.disabledByUuid,
      };
      newDisabledByUuid[action.uuid] = true;
      return {
        ...state,
        guessedUuids: new Set(newGuessedUuids),
        disabledByUuid: newDisabledByUuid,
      };
    }
    case PuzzleActionType.INPUT: {
      const newQueryByUuid = {
        ...state.queryByUuid,
      };
      newQueryByUuid[action.uuid] = action.input;
      return {
        ...state,
        queryByUuid: newQueryByUuid,
      };
    }
    case PuzzleActionType.REFRESH_STATE:
      return {
        ...state,
        availableRounds: action.availableRounds,
        guessResponsesByUuid: action.guessResponsesByUuid,
      };
    case PuzzleActionType.RESTART_PUZZLE:
      return {
        ...DEFAULT_PUZZLE_STATE,
        disabledByUuid: {},
        guessedUuids: new Set(),
        queryByUuid: {},
      };
    case PuzzleActionType.RESTART_ROUND: {
      const roundUuids = action.round.puzzles.reduce<Set<string>>(
        (acc: Set<string>, puzzle: MinimalPuzzle) => {
          acc.add(puzzle.uuid);
          return acc;
        },
        new Set<string>(),
      );
      const newDisabledByUuid: Record<string, boolean> = {};
      for (const [uuid, disabled] of Object.entries(state.disabledByUuid)) {
        if (!roundUuids.has(uuid)) {
          newDisabledByUuid[uuid] = disabled;
        }
      }
      const newGuessResponsesByUuid: GuessResponsesByUuid = {};
      for (const [uuid, response] of Object.entries(
        state.guessResponsesByUuid,
      )) {
        if (!roundUuids.has(uuid)) {
          newGuessResponsesByUuid[uuid] = response;
        }
      }
      const newGuessedUuids = new Set<string>();
      for (const uuid of [...state.guessedUuids]) {
        if (!roundUuids.has(uuid)) {
          newGuessedUuids.add(uuid);
        }
      }
      const newQueryByUuid: Record<string, string> = {};
      for (const [uuid, query] of Object.entries(state.queryByUuid)) {
        if (!roundUuids.has(uuid)) {
          newQueryByUuid[uuid] = query;
        }
      }
      return {
        ...state,
        availableRounds: {
          rounds: state.availableRounds.rounds,
        },
        guessedUuids: newGuessedUuids,
        disabledByUuid: newDisabledByUuid,
        guessResponsesByUuid: newGuessResponsesByUuid,
        queryByUuid: newQueryByUuid,
      };
    }
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
