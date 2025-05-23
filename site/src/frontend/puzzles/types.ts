import { type ParsedQs } from "qs";
import type { FunctionComponent } from "react";
import type { Router } from "websocket-express";
import { z } from "zod";
import type {
  PuzzleState,
  SubpuzzleState,
  TeamHuntState,
} from "../../../lib/api/client";
import { type PuzzleStateLogEntry } from "../../../lib/api/frontend_contract";
import type { Entrypoint } from "../server/assets";

// Anywhere you see "id" in a type, this is a globally-unique string id known to the backend.

export const HintSchema = z.object({
  order: z.number(),
  description: z.string(),
  keywords: z.array(z.string()).optional(),
  nudge: z.string(),
});

export type Hint = z.infer<typeof HintSchema>;

export const CannedResponseLinkSchema = z.object({
  // What the text of the link should read
  display: z.string(),
  href: z.string(),
});

export type CannedResponseLink = z.infer<typeof CannedResponseLinkSchema>;

export const CannedResponseSchema = z.object({
  // list of canonicalized guess values that will match to this reply
  guess: z.array(z.string()),
  reply: z.string(),

  // If present, this link will be displayed immediately after `reply` in the guess table.
  link: CannedResponseLinkSchema.optional(),

  // If true, matching this canned response should provide the solve reward (and getting the actual
  // answer providing the solve reward.
  // On objects where this is set to true, `guess` should be a single-item array, to avoid allowing
  // multiple canned responses to provide the solve reward.
  providesSolveReward: z.boolean().optional(),
});

export type CannedResponse = z.infer<typeof CannedResponseSchema>;

type BaseContentProps = {
  teamState: TeamHuntState;
  query: ParsedQs;
};

type PuzzleContentProps = BaseContentProps & {
  teamName: string;
  teamId: number;
  teamUsername: string;
  teamJwt: string | undefined;
  type: "puzzle";
  puzzleSlug: string;
  puzzleState: PuzzleState;
  puzzleStateLog: PuzzleStateLogEntry[] | undefined;
};

type SubpuzzleContentProps = BaseContentProps & {
  type: "subpuzzle";
  subpuzzleState: SubpuzzleState;
};

type SolutionContentProps = BaseContentProps & {
  type: "solution";
};

type ContentProps<T extends "puzzle" | "subpuzzle" | "solution"> =
  T extends "puzzle"
    ? PuzzleContentProps
    : T extends "subpuzzle"
      ? SubpuzzleContentProps
      : SolutionContentProps;

export type Content<T extends "puzzle" | "subpuzzle" | "solution"> = {
  // TODO: figure out what props get passed to this FunctionComponent
  component: FunctionComponent<ContentProps<T>>;
};

type EnrichedPuzzleContentProps = {
  // If present, the scripts and stylesheets produced by the webpack entrypoint
  // of the given name will be injected into the page's <body> and <head>
  // respectively.
  entrypoint?: Entrypoint;

  // If true, the puzzle will include a copy-to-clipboard button floating in the
  // bottom-left of the page which will copy the entire content of the puzzle to
  // the clipboard.
  copyable?: boolean;
};

export type PuzzleContent = Content<"puzzle"> & EnrichedPuzzleContentProps;

export type SubpuzzleContent = Content<"subpuzzle"> &
  EnrichedPuzzleContentProps;

export type SolutionContent = Content<"solution">;

export const AdditionalCreditSchema = z.union([
  z.object({
    for_what: z.string(),
    who: z.array(z.string()),
  }),
  z.object({ freeform: z.string() }),
]);

export type AdditionalCredit = z.infer<typeof AdditionalCreditSchema>;

export const PuzzleDefinitionMetadataSchema = z.object({
  // The title, which should be written in title case
  title: z.string(),

  // The unique slug for this puzzle, which should be approximately the title in all lowercase, with
  // spaces replaced with underscores.
  slug: z.string(),

  // Puzzup code name for this puzzle
  code_name: z.string(),

  // The non-spoilery description of this puzzle, as seen by hunters while the puzzle is locked but
  // unlockable (by spending unlock currency).  This should be a description of what hunters will
  // see on the puzzle page once they unlock the puzzle.
  initial_description: z.string().optional(),

  // The canonicalized answer to this puzzle.  It should be written in all caps with appropriate
  // whitespace.
  answer: z.string(),

  // The list of authors of this puzzle.  Lead author should be first; the other authors should be
  // sorted alphabetically by lowercased display name.
  authors: z.array(z.string()),

  // The list of editors on this puzzle, sorted by lowercased display name.
  editors: z.array(z.string()),

  // Any additional credits (e.g. tech, art) that we should give for the construction,
  // implementation, execution, or production of this puzzle.
  additional_credits: z.array(AdditionalCreditSchema),

  // The collection of hints provided by the authors to help hint responders.  These are not
  // expected to be displayed to solvers directly; they're meant to help guide our operations team.
  hints: z.array(HintSchema),

  // Canned responses confirming intermediate progress.  When a team submits a guess that matches a
  // canned response, the `reply` will be shown on the page in response to that guess.
  // In the future, we may add additional canned response features for e.g. accepting file uploads,
  // or coordinating times for visiting a particular room.
  canned_responses: z.array(CannedResponseSchema),
});

export type PuzzleDefinitionMetadata = z.infer<
  typeof PuzzleDefinitionMetadataSchema
>;

export type SubpuzzleDefinition = {
  title: string;
  slug: string;
  content: SubpuzzleContent;
  answer?: string;
};

export type PuzzleDefinition = PuzzleDefinitionMetadata & {
  // The React component that contains the puzzle content we render in the <div id="puzzle-content">.
  // It should NOT include a div for the title; it should be purely the puzzle content.
  content: PuzzleContent;

  // The React component that contains the solution writeup that we render on the solution page.
  // The actual answer and credits will be generated from the other fields of PuzzleDefinition, so this
  // should just be the text and images of the steps, and any additional author notes.
  solution: SolutionContent;

  // If provided, an additional websocket-express Router that should be mounted at `/puzzles/<slug>/`
  // to allow for additional puzzle-specific server behavior.
  router?: Router;

  // Slugs for any subpuzzle pages associated with this puzzle. Subpuzzles do not have individual answers,
  // but they may update hunt state when accessed.
  subpuzzles?: SubpuzzleDefinition[];
};
