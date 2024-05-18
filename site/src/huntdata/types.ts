import type { FunctionComponent } from "react";
// Anywhere you see "id" in a type, this is a globally-unique string id known to the backend.

// An expression indicating the nature of a dependency.
export type Condition =
  | {
      type: "puzzle_solved";
      id: string; // The puzzle with this id must be solved.
      answer_count?: number; // If present, the required number of (unique) solves for this puzzle for this condition to be met.
    }
  | {
      type: "interaction_completed";
      id: string; // The id of the interaction which must be marked as completed before this condition is satisfied.
    };

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
  submit_constraints: Condition[]; // Conditions which must all be true to permit attempting to submit a guess for this answer.
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
  // TODO: in the fullness of time, we should lint for unassigned slots, and make assignment a required field, but not now
};

export type Round = {
  key: string; // The string prefix that we expect most puzzle ids in this round to share.
  slug: string; // The string presented in the URL when viewing this round's page.
  title: string; // The title of the round
  puzzles: PuzzleSlot[]; // The set of puzzle slots that are canonically in this round.
  unlock_conditions: Condition[]; // The set of unlock conditions that constrain when this round becomes visible.
};

export type Interaction = {
  id: string; // The globally-unique id for this interaction
  unlock_conditions: Condition[]; // A list of dependencies which must *all* be satisfied before this interaction becomes available
};

// A full description of a hunt.
export type Hunt = {
  rounds: Round[];
  interactions: Interaction[];
};
