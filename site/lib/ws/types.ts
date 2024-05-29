import type { TeamState, PuzzleState } from "../api/client";

export type Message =
  | {
      type: "team_state";
      data: TeamState;
    }
  | {
      type: "puzzle_state";
      data: PuzzleState;
    };
