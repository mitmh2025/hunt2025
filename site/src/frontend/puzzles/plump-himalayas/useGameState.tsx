import { type Dispatch, type Reducer, useReducer } from "react";
import type { ControlRoomGameState, ControlRoomServerState } from "./types";

const DEFAULT_GAME_STATE: ControlRoomGameState = {
  started: true,
  tasks: [],
  verbs: [],
  nouns: [],
  instruction: { noun: "", verb: "" },
  noun: null,
  verb: null,
  lastNoun: "",
  lastVerb: "",
  disableNouns: false,
  disableVerbs: false,
};

export enum GameActionType {
  // Actions taken as the result of receiving a ws message
  SET_GAME_STATE = "SET_GAME_STATE",
  // Actions taken as the result of player input
  VOTE_NOUN = "VOTE_NOUN",
  VOTE_VERB = "VOTE_VERB",
  ENABLE_NOUNS = "ENABLE_NOUNS",
  ENABLE_VERBS = "ENABLE_VERBS",
}

type SetGameStateAction = {
  type: GameActionType.SET_GAME_STATE;
  state: ControlRoomServerState;
};

type VoteNounAction = {
  type: GameActionType.VOTE_NOUN;
  noun: string;
};

type VoteVerbAction = {
  type: GameActionType.VOTE_VERB;
  verb: string;
};

type EnableNounsAction = {
  type: GameActionType.ENABLE_NOUNS;
};

type EnableVerbsAction = {
  type: GameActionType.ENABLE_VERBS;
};

export type GameAction =
  | SetGameStateAction
  | VoteNounAction
  | VoteVerbAction
  | EnableNounsAction
  | EnableVerbsAction;

const reducer: Reducer<ControlRoomGameState, GameAction> = (
  state: ControlRoomGameState,
  action: GameAction,
): ControlRoomGameState => {
  switch (action.type) {
    case GameActionType.SET_GAME_STATE: {
      const { started, tasks, verbs, nouns, instruction } = action.state;
      return {
        ...state,
        started,
        tasks: tasks ?? [],
        verbs: verbs ?? [],
        nouns: nouns ?? [],
        instruction: instruction ?? { noun: "", verb: "" },
      };
    }
    case GameActionType.VOTE_NOUN:
      return {
        ...state,
        noun: action.noun,
        disableNouns: true,
      };
    case GameActionType.VOTE_VERB:
      return {
        ...state,
        verb: action.verb,
        disableVerbs: true,
      };
    case GameActionType.ENABLE_NOUNS:
      return {
        ...state,
        noun: null,
        lastNoun: state.noun,
        disableNouns: true,
      };
    case GameActionType.ENABLE_VERBS:
      return {
        ...state,
        verb: null,
        lastVerb: state.verb,
        disableVerbs: true,
      };
  }
};

export default function useGameState(): [
  ControlRoomGameState,
  Dispatch<GameAction>,
] {
  return useReducer(reducer, DEFAULT_GAME_STATE);
}
