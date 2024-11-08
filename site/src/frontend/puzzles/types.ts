import type { FunctionComponent } from "react";
import type { Router } from "websocket-express";
import { type TeamHuntState } from "../../../lib/api/client";
import type { Entrypoint } from "../server/assets";

// Anywhere you see "id" in a type, this is a globally-unique string id known to the backend.

export type Hint = {
  order: number;
  description: string;
  keywords?: string[];
  nudge: string;
};

export type CannedResponse = {
  guess: string[]; // list of canonicalized guess values that will match to this reply
  reply: string;

  // If true, matching this canned response should provide the solve reward (and getting the actual
  // answer providing the solve reward.
  // On objects where this is set to true, `guess` should be a single-item array, to avoid allowing
  // multiple canned responses to provide the solve reward.
  providesSolveReward?: boolean;
};

export type Content = {
  // TODO: figure out what props get passed to this FunctionComponent
  component: FunctionComponent<{ teamState: TeamHuntState }>;

  // If present, the scripts and stylesheets produced by the webpack entrypoint
  // of the given name will be injected into the page's <body> and <head>
  // respectively.
  entrypoint?: Entrypoint;
};

export type AdditionalCredit = {
  for_what: string;
  who: string[];
};

export type PuzzleDefinition = {
  // The title, which should be written in title case
  title: string;

  // The unique slug for this puzzle, which should be approximately the title in all lowercase, with
  // spaces replaced with underscores.
  slug: string;

  // The non-spoilery description of this puzzle, as seen by hunters while the puzzle is locked but
  // unlockable (by spending unlock currency).  This should be a description of what hunters will
  // see on the puzzle page once they unlock the puzzle.
  initial_description?: string;

  // The canonicalized answer to this puzzle.  It should be written in all caps with appropriate
  // whitespace.
  answer: string;

  // The list of authors of this puzzle.  Lead author should be first; the other authors should be
  // sorted alphabetically by lowercased display name.
  authors: string[];

  // The list of editors on this puzzle, sorted by lowercased display name.
  editors: string[];

  // Any additional credits (e.g. tech, art) that we should give for the construction,
  // implementation, execution, or production of this puzzle.
  additional_credits: AdditionalCredit[];

  // The React component that contains the puzzle content we render in the <div id="puzzle-content">.
  // It should NOT include a div for the title; it should be purely the puzzle content.
  content: Content;

  // The React component that contains the solution writeup that we render on the solution page.
  // The actual answer and credits will be generated from the other fields of PuzzleDefinition, so this
  // should just be the text and images of the steps, and any additional author notes.
  solution: Content;

  // The collection of hints provided by the authors to help hint responders.  These are not
  // expected to be displayed to solvers directly; they're meant to help guide our operations team.
  hints: Hint[];

  // Canned responses confirming intermediate progress.  When a team submits a guess that matches a
  // canned response, the `reply` will be shown on the page in response to that guess.
  // In the future, we may add additional canned response features for e.g. accepting file uploads,
  // or coordinating times for visiting a particular room.
  canned_responses: CannedResponse[];

  // If provided, an additional websocket-express Router that should be mounted at `/puzzles/<slug>/`
  // to allow for additional puzzle-specific server behavior.
  router?: Router;
};
