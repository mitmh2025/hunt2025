export type ControlRoomInfo = {
  whepUrl: string;
  wsUrl: string;
};

export type PHAction = {
  verb: string;
  noun: string;
};

export type PHTask = {
  text: string;
  finished: boolean;
};

export type PHVote = {
  choice: Partial<PHAction>;
  old: PHAction;
};

export type PHGameState =
  | {
      started: false;
    }
  | {
      started: true;
      tasks: PHTask[];
      verbs: string[];
      nouns: string[];
      action: PHAction;
    };
