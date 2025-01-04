export type MinimalPuzzle = {
  uuid: string;
  wordAudio: string;
  meaningAudio: string;
  useAudio: string;
};

export type Puzzle = MinimalPuzzle & {
  solutionAUuid: string;
  solutionBUuid: string;
  answerA: string;
  answerB: string;
  excerpt: string;
  extraction: string;
};

export enum RoundStatus {
  INCOMPLETE = "INCOMPLETE",
  COMPLETED = "COMPLETED",
  SOMEHOW_COMPLETED = "SOMEHOW_COMPLETED",
}

export type MinimalRound = {
  name: string;
  puzzles: MinimalPuzzle[];
  message?: string;
  enumerationAudio?: string;
};

export type Round = {
  uuid: string;
  order: number;
  name: string;
  enumerationAudio: string;
  puzzles: Puzzle[];
};

export type MinimalRounds = {
  rounds: MinimalRound[];
  message?: string;
  audio?: string;
};

export enum PuzzleStatus {
  CHECK = "CHECK",
  QUESTION = "QUESTION",
  X = "X",
}

export type GuessResponse = {
  uuid: string;
  response: string;
  status: PuzzleStatus;
  firstIncorrectIndex?: number;
};

export type GuessResponsesByUuid = Record<string, GuessResponse>;
