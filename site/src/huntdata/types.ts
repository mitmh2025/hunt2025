import type { FunctionComponent } from "react";
// Anywhere you see "id" in a type, this is a globally-unique string id known to the backend.

// An expression indicating the nature of a dependency.
export type Condition =
  | ({
      answer_count?: number; // If present, the required number of (unique) solves for this puzzle for this condition to be met.
    } & (
      | {
          slot_solved: string; // The puzzle in this slot must be solved.
        }
      | {
          slug_solved: string; // The puzzle with this slug must be solved.
        }
    ))
  | {
      interaction_completed: string; // The id of the interaction which must be marked as completed before this condition is satisfied.
    }
  | {
      puzzles_solved: number; // The number of puzzles solved in a set.
      slots?: string[]; // The list of puzzle slots to check, if not all puzzles in the current round.
    }
  | Condition[] // All of the conditions must be true (empty array is true)
  | { oneOf: Condition[] }; // Any of the conditions must be true (empty array is false);

export type Hint = {
  order: number;
  keywords: string[];
  nudge: string;
};

export type CannedResponse = {
  guess: string[]; // list of canonicalized guess values that will match to this reply
  reply: string;
};

export type AnswerWithSubmitConstraint = {
  answer: string;
  submit_if: Condition; // Conditions which must all be true to permit attempting to submit a guess for this answer.
};

export type Content = {
  // TODO: figure out what props get passed to this FunctionComponent
  component: FunctionComponent;

  // Scripts that will be injected into the page's <head> when rendered.
  // Generally, should contain the result of lookupScript(webpackEntryPoint)
  scripts?: string[];

  // Stylesheets that will be injected into the page's <head> when rendered.
  // Generally, should contain the result of lookupStylesheet(webpackEntryPoint)
  stylesheets?: string[];
};

export type PuzzleDefinition = {
  title: string;
  slug: string;
  authors: string[];
  submit_constraints?: Condition[][]; // Parallel array to answers
  content: Content;
  solution: Content;
  hints: Hint[];
  canned_responses: CannedResponse[];
} & (
  | {
      // Most puzzles have only one answer.  This form should behave equivalent
      // to/be shorthand for "an answers array with one AnswerWithSubmitConstraint,
      // with an empty submit_constraints array."
      answer: string;
    }
  | {
      // For puzzles that may have multiple answers and additional constraints, the
      // array form (with a plural key) is used.
      answers: AnswerWithSubmitConstraint[];
    }
);

export type PuzzleSlot = {
  id: string; // globally-unique id for this puzzle slot
  slug?: string; // slug of the puzzle currently assigned to this slot
  // TODO: in the fullness of time, we should lint for unassigned slots, and make slug a required field, but not now
  visible_if?: Condition; // Conditions under which the puzzle is visible. If unset, the puzzle is visible if it is unlocked or unlockable.
  unlockable_if?: Condition; // Conditions under which the puzzle is unlockable. If unset, the puzzle is not unlockable.
  unlocked_if?: Condition; // Conditions under which the puzzle is unlocked.
};

export type Round = {
  slug: string; // The string presented in the URL when viewing this round's page.
  title: string; // The title of the round
  puzzles: PuzzleSlot[]; // The set of puzzle slots that are canonically in this round.
  unlock_if: Condition; // The set of unlock conditions that constrain when this round becomes visible.
};

export type Interaction = {
  id: string; // The globally-unique id for this interaction
  unlock_if: Condition; // A list of dependencies which must *all* be satisfied before this interaction becomes available
};

// A full description of a hunt.
export type Hunt = {
  rounds: Round[];
  interactions: Interaction[];
};
