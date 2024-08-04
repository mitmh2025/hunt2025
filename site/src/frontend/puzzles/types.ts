import type { FunctionComponent } from "react";
// Anywhere you see "id" in a type, this is a globally-unique string id known to the backend.
import type { Condition } from "../../huntdata/types";
import type { Entrypoint } from "../server/assets";
// An expression indicating the nature of a dependency.

export type Hint = {
  order: number;
  description: string;
  keywords?: string[];
  nudge: string;
};

export type CannedResponse = {
  guess: string[]; // list of canonicalized guess values that will match to this reply
  reply: string;
};

export type AnswerWithSubmitConstraint = {
  answer: string;
  prize?: number; // Prize to grant if the answer is correct.
  submit_constraints: Condition[]; // Conditions which must all be true to permit attempting to submit a guess for this answer.
};

export type Content = {
  // TODO: figure out what props get passed to this FunctionComponent
  component: FunctionComponent;

  // If present, the scripts and stylesheets produced by the webpack entrypoint
  // of the given name will be injected into the page's <body> and <head>
  // respectively.
  entrypoint?: Entrypoint;
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
      prize?: number; // Prize to grant if the answer is correct.
    }
  | {
      // For puzzles that may have multiple answers and additional constraints, the
      // array form (with a plural key) is used.
      answers: AnswerWithSubmitConstraint[];
    }
);
