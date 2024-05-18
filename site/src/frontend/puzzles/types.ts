import type { FunctionComponent } from "react";
// Anywhere you see "id" in a type, this is a globally-unique string id known to the backend.

import type { Condition } from "../../huntdata/types";
// An expression indicating the nature of a dependency.

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
