import { type Request, type RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import PuzzleGuessSection from "../../components/PuzzleGuessSection";
import {
  PuzzleHeader,
  PuzzleTitle,
  PuzzleWrapper,
  PuzzleMain,
} from "../../components/PuzzleLayout";
import Spoiler from "../../components/Spoiler";
import { PUZZLES } from "../../puzzles";
import {
  BackgroundCheckWrapper,
  BackgroundCheckMain,
  BackgroundCheckHeader,
} from "../../components/BackgroundCheckPuzzleLayout";
import { type Entrypoint } from "../assets";

const SHOW_SOLUTIONS = true as boolean;

/* eslint-disable @typescript-eslint/no-explicit-any -- I'm not clever enough to name the types for this, but we're not bothering with props so they shouldn't matter */
type RoundSpecificComponentManifest = {
  wrapper?: React.ComponentType<any>;
  header?: React.ComponentType<any>;
  title?: React.ComponentType<any>;
  main?: React.ComponentType<any>;
  entrypoint?: Entrypoint;
};
/* eslint-enable @typescript-eslint/no-explicit-any -- End of round-specific component manifest exceptions */

// Add round-specific component overrides here
const ROUND_PUZZLE_COMPONENT_MANIFESTS: Record<
  string,
  RoundSpecificComponentManifest
> = {
  the_missing_diamond: {},
  stakeout: {},
  illegal_search: {},
  paper_trail: {},
  background_check: {
    main: BackgroundCheckMain,
    header: BackgroundCheckHeader,
    wrapper: BackgroundCheckWrapper,
  },
  the_murder: {},
  outlands: {},
};

// URL parameters
export type PuzzleParams = {
  puzzleSlug: string;
};

export async function puzzleHandler(req: Request<PuzzleParams>) {
  if (!req.teamState) {
    return undefined;
  }
  const slug = req.params.puzzleSlug;
  const result = await req.api.getPuzzleState({
    params: { slug: slug },
  });
  if (result.status !== 200) {
    // Puzzle doesn't exist or team doesn't have access.
    return undefined;
  }
  const guesses = result.body.guesses;
  const initialGuesses = JSON.stringify(result.body.guesses);
  const inlineScript = `window.initialGuesses = ${initialGuesses}; window.puzzleSlug = "${slug}";`;
  const noopOnGuessesUpdate = () => {
    /* no-op, this is noninteractive in SSR */
  };
  const guessFrag = (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />
      <div id="puzzle-guesses">
        <PuzzleGuessSection
          slug={slug}
          guesses={guesses}
          onGuessesUpdate={noopOnGuessesUpdate}
        />
      </div>
    </>
  );

  // Look up puzzle by slug.  If none exists, 404.
  const puzzle = PUZZLES[slug];
  if (puzzle === undefined) {
    if (process.env.NODE_ENV === "development") {
      // This should only be reachable in dev mode.
      const node = (
        <div>
          <h1>Puzzle not assigned (devmode-only page)</h1>
          <p>
            The puzzle you requested (<code>{slug}</code>) exists as a stub, as
            it has no typeset content defined in{" "}
            <code>src/frontend/puzzles/index.ts</code>. This page would 404 in
            production, but for development we will pretend there is some
            content here so that we can test unlock mechanics.
          </p>
          {result.body.locked === "locked" ? (
            <p>This puzzle is currently locked.</p>
          ) : undefined}
          {result.body.locked === "unlockable" ? (
            <>
              <p>
                This puzzle is currently locked so guess submissions will 404,
                but it can be unlocked by spending unlock currency.
              </p>
              <form method="POST" action={`/puzzles/${slug}/unlock`}>
                <button type="submit">Unlock puzzle</button>
              </form>
            </>
          ) : undefined}
          {result.body.locked === "unlocked" ? (
            result.body.answer !== undefined ? (
              <>
                <p>This puzzle is solved.</p>
                {guessFrag}
              </>
            ) : (
              <>
                <p>
                  This puzzle is unlocked. The backend will accept the answer{" "}
                  <code>PLACEHOLDER ANSWER</code> as correct.
                </p>
                {guessFrag}
              </>
            )
          ) : undefined}
          <div id="puzzle-content" className="puzzle-content">
            Puzzle content would go here.
          </div>
        </div>
      );
      return wrapContentWithNavBar(
        {
          node,
          entrypoints: ["puzzle" as const],
        },
        req.teamState,
      );
    } else {
      return undefined;
    }
  }

  // If this puzzle is not unlocked, 404.  Ideally we'd do this check as soon as we get the API
  // result, but devmode wants to render an unlock/info page even when the puzzle is locked.
  const puzzleState = req.teamState.puzzles[slug];
  if (!puzzleState) {
    return undefined;
  }

  // If this puzzle is not unlocked, 404.  Ideally we'd do this check as soon as we get the API
  // result, but devmode wants to render an unlock/info page even when the puzzle is locked.
  if (result.body.locked !== "unlocked") {
    return undefined;
  }

  // TODO: Use round-specific puzzle page layout for result.body.round.  For
  // outlands puzzles, the layout may depend on round and puzzle visibility.

  // Select content component.
  const content = puzzle.content;
  const ContentComponent = content.component;
  const title = puzzle.title;

  // Use the components for the relevant round.
  const roundSpecificManifest =
    ROUND_PUZZLE_COMPONENT_MANIFESTS[puzzleState.round];

  const entrypoints = [
    "puzzle" as const,
    ...(roundSpecificManifest?.entrypoint
      ? [roundSpecificManifest.entrypoint]
      : []),
    ...(content.entrypoint ? [content.entrypoint] : []),
  ];

  const PuzzleWrapperComponent =
    roundSpecificManifest?.wrapper ?? PuzzleWrapper;
  const PuzzleHeaderComponent = roundSpecificManifest?.header ?? PuzzleHeader;
  const PuzzleTitleComponent = roundSpecificManifest?.title ?? PuzzleTitle;
  const PuzzleMainComponent = roundSpecificManifest?.main ?? PuzzleMain;

  const node = (
    <>
      <PuzzleWrapperComponent>
        <PuzzleHeaderComponent>
          <PuzzleTitleComponent>{title}</PuzzleTitleComponent>
          {/* TODO: add guess form, history, errata, etc. */}
          {guessFrag}
        </PuzzleHeaderComponent>
        <PuzzleMainComponent id="puzzle-content" className="puzzle-content">
          <ContentComponent />
        </PuzzleMainComponent>
      </PuzzleWrapperComponent>
    </>
  );

  // TODO: include title
  return wrapContentWithNavBar(
    {
      node,
      entrypoints,
    },
    req.teamState,
  );
}

type PuzzleGuessReqBody = {
  guess: string;
};

export const puzzleGuessPostHandler: RequestHandler<
  PuzzleParams,
  unknown,
  PuzzleGuessReqBody,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  // TODO: validate req.body with zod
  const { guess } = req.body;
  const slug = req.params.puzzleSlug;
  const result = await req.api.submitGuess({
    body: {
      guess,
    },
    params: {
      slug,
    },
  });

  if (req.headers.accept !== "application/json") {
    // Must be browser falling back to basic HTML forms.
    res.redirect(`/puzzles/${slug}`);
    return;
  }

  // FIXME: handle translating rate-limits into something for browser code to consume
  if (result.status !== 200) {
    console.log(result.body);
    res.status(result.status).json({
      status: "error",
      message: "Submission failed",
    });
  } else {
    res.json(result.body);
  }
});

export const puzzleUnlockPostHandler: RequestHandler<
  PuzzleParams,
  unknown,
  Record<string, never>,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  const slug = req.params.puzzleSlug;
  console.log("try unlock", slug);
  const result = await req.api.unlockPuzzle({
    params: {
      slug,
    },
  });

  if (req.headers.accept !== "application/json") {
    // noscript fallback; redirect to the now-unlocked puzzle
    res.redirect(`/puzzles/${slug}`);
    return;
  }

  if (result.status !== 200) {
    // TODO: figure out how we want to handle errors
    console.log(result.body);
    res.status(result.status).json({
      status: "error",
      message: "Unlock request failed",
    });
  } else {
    res.json(result.body);
  }
});

function formatList(things: string[]): string {
  if (things.length === 2) return things.join(" and ");
  if (things.length > 2)
    return `${things.slice(0, -1).join(", ")}, and ${things[things.length - 1]}`;
  return things[0] ?? "";
}

export function solutionHandler(req: Request<PuzzleParams>) {
  if (!req.teamState) {
    return undefined;
  }
  // Only show solutions if we're in dev mode and showing solutions is enabled
  if (process.env.NODE_ENV !== "development" || !SHOW_SOLUTIONS) {
    return undefined;
  }

  const slug = req.params.puzzleSlug;
  const puzzle = PUZZLES[slug];
  if (puzzle === undefined) {
    const node = (
      <div>
        <h1>Puzzle not found</h1>
        <p>
          The puzzle you requested a solution for (<code>{slug}</code>) exists,
          but we can&rsquo;t seem to find it.
        </p>
      </div>
    );
    return wrapContentWithNavBar({ node }, req.teamState);
  }

  // TODO: look up round-specific solution page layout if applicable.
  const content = puzzle.solution;
  const SolutionComponent = content.component;

  // Use the entrypoint for pages in the relevant round.
  const puzzleState = req.teamState.puzzles[slug];
  const roundSpecificManifest = puzzleState
    ? ROUND_PUZZLE_COMPONENT_MANIFESTS[puzzleState.round]
    : undefined;
  const entrypoints = [
    ...(content.entrypoint ? [content.entrypoint] : []),
    ...(roundSpecificManifest?.entrypoint
      ? [roundSpecificManifest.entrypoint]
      : []),
  ];

  const title = puzzle.title;
  const authors = formatList(puzzle.authors);
  const editors = formatList(puzzle.editors);
  const acknowledgements = puzzle.additional_credits.map((credit) => (
    <h3 key={credit.for_what}>
      {credit.for_what} by {formatList(credit.who)}
    </h3>
  ));

  const answer = puzzle.answer;
  const node = (
    <div>
      <h1>Solution to {title}</h1>
      <h2>
        Answer: <Spoiler>{answer}</Spoiler>
      </h2>
      <h3>By {authors}</h3>
      <h3>Edited by {editors}</h3>
      {acknowledgements}
      <div id="solution-content" className="solution-content">
        <SolutionComponent />
      </div>
    </div>
  );

  // TODO: include an appropriate title?
  return wrapContentWithNavBar(
    {
      node,
      entrypoints,
    },
    req.teamState,
  );
}
