export type AllPuzzlesPuzzle = {
  slug: string;
  title: string;
  is_meta?: boolean;
  state?: "unlocked" | "unlockable" | "locked";
  answer?: string;
  desc?: string;
};

export type AllPuzzlesInteraction = {
  slug: string;
  title: string;
  state: "unlocked" | "running" | "completed";
  result?: string;
};

export type AllPuzzlesRound = {
  slug: string;
  title: string;
  puzzles: AllPuzzlesPuzzle[];
  interactions?: AllPuzzlesInteraction[];
};

export type AllPuzzlesState = {
  epoch: number;
  rounds: AllPuzzlesRound[];
  stray: AllPuzzlesPuzzle[];
  currency: number;
};
