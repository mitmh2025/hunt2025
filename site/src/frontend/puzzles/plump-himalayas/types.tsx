export type ControlRoomInfo = {
  whepUrl: string;
  wsUrl: string;
};

export type ControlRoomInstruction = {
  verb: string;
  noun: string;
};

export type ControlRoomTask = {
  text: string;
  finished: boolean;
};

export type ControlRoomVote = {
  choice: Partial<ControlRoomInstruction>;
  old: ControlRoomInstruction;
};

export type ControlRoomServerMessage = {
  tasks: ControlRoomTask[];
  verbs: string[];
  nouns: string[];
  instruction: ControlRoomInstruction;
};

type NotStartedState = { started: false } & Partial<ControlRoomServerMessage>;
type StartedState = { started: true } & ControlRoomServerMessage;

export type ControlRoomServerState = NotStartedState | StartedState;

export type ControlRoomGameState = ControlRoomServerState & {
  noun: string | null;
  verb: string | null;
  lastNoun: string | null;
  lastVerb: string | null;
  disableNouns: boolean;
  disableVerbs: boolean;
};
