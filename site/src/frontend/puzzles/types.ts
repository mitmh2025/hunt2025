import type { FunctionComponent } from "react";
// Anywhere you see "id" in a type, this is a globally-unique string id known to the backend.
import type { Entrypoint } from "../server/assets";

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

export type Content = {
  // TODO: figure out what props get passed to this FunctionComponent
  component: FunctionComponent;

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
  title: string;
  slug: string;
  answer: string;
  authors: string[];
  editors: string[];
  additional_credits: AdditionalCredit[];
  content: Content;
  solution: Content;
  hints: Hint[];
  canned_responses: CannedResponse[];
};
