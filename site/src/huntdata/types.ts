// Anywhere you see "id" or "slug" in a type, this is a globally-unique (within the type) string id known to the backend.

// An expression indicating the nature of a dependency.
export type Condition =
  | {
      slot_solved: string; // The puzzle in this slot must be solved.
    }
  | {
      slot_unlocked: string; // The puzzle in this slot must be unlocked.
    }
  | {
      interaction_completed: string; // The id of the interaction which must be marked as completed before this condition is satisfied.
    }
  | {
      puzzles_unlocked: number; // The number of puzzles unlocked in a set.
      slots?: string[]; // The list of puzzle slots to check, if not all non-meta puzzles in the current round.
    }
  | {
      puzzles_solved: number; // The number of puzzles solved in a set.
      slots?: string[]; // The list of puzzle slots to check, if not all non-meta puzzles in the current round.
    }
  | {
      gate_satisfied: string; // The id of the gate which must be marked as completed before this condition is satisfied.
    }
  | {
      round_unlocked: string; // The slug of the round which must be unlocked before this condition is satisfied.
    }
  | Condition[] // All of the conditions must be true (empty array is true)
  | { oneOf: Condition[] }; // Any of the conditions must be true (empty array is false);

export type PuzzleSlot = {
  id: string; // globally-unique id for this puzzle slot
  slug?: string; // slug of the puzzle currently assigned to this slot
  // TODO: in the fullness of time, we should lint for unassigned slots, and make slug a required field, but not now

  // Is this puzzle a meta?  Metapuzzles are excluded by default from the set
  // of slots satisfying puzzles_solved and puzzles_unlocked, and they may be
  // presented at the top of puzzle lists.
  is_meta?: boolean;

  // If present, the amount of currency to reward for completing this puzzle.
  // If absent, prize defaults to 0 if `is_meta` is true, 1 otherwise.
  prize?: number;

  // A note on the condition specifiers below: it is generally expected that
  // * most standard non-meta puzzles will have an `unlockable_if` condition
  //   driven by `puzzles_unlocked`
  // * puzzles with particular physical space or schedule requirements may have
  //   a custom `unlocked_if`
  // * metapuzzles will have `unlocked_if` with a `puzzles_unlocked` condition
  //   since we don't want them to cost any unlock currency since it could result
  //   in teams getting stuck if they spend all their unlocks on metas instead of
  //   feeders.  Teams should simply observe the discovery and unlock of a
  //   metapuzzle when they unlock a sufficient set of feeders.

  unlockable_if?: Condition; // Conditions under which the puzzle is unlockable. If unset, the puzzle is not unlockable.
  unlock_cost?: number; // If the puzzle is unlockable, how much it should cost to unlock. Defaults to 1.
  unlocked_if?: Condition; // Conditions under which the puzzle is unlocked.
};

export type Gate = {
  id: string; // unique id for this gate
  title?: string; // Description of what the user did to satisfy this gate

  // If present, conditions under which the gate is automatically marked as satisfied.
  // If absent, equivalent to the gate will only be marked satisfied via an
  // explicit API call (equivalent to { oneOf: [] }).
  satisfied_if?: Condition;
};

export type Round = {
  slug: string; // The string presented in the URL when viewing this round's page.
  title: string; // The title of the round
  puzzles: PuzzleSlot[]; // The set of puzzle slots that are canonically in this round.

  gates?: Gate[]; // A set of gates which are owned by this round

  interactions?: Interaction[];

  // Notes on expected Round unlock_if behaviors:
  // * The first round will be unlocked by default.
  // * Each side investigation will be unlocked when a particular meta is
  //   solved and an interaction is completed.
  // * The late-game investigation will be unlocked when all the side
  //   investigations are solved and their interactions are completed.

  unlock_if: Condition; // The set of unlock conditions that constrain when this round becomes visible.
};

export type Interaction = {
  id: string; // The globally-unique id for this interaction
  unlock_if: Condition; // A list of dependencies which must *all* be satisfied before this interaction becomes available
};

// A full description of a hunt.
export type Hunt = {
  rounds: Round[];
};
