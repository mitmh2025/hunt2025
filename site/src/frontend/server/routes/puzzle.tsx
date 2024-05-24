import { type Request, type RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import React from "react";
import Layout from "../../components/Layout";
import PuzzleGuessSection from "../../components/PuzzleGuessSection";
import { PUZZLES } from "../../puzzles";
import { lookupScript } from "../assets";

const SHOW_SOLUTIONS = true;

// URL parameters
export type PuzzleParams = {
  puzzleSlug: string;
};

export async function puzzleHandler(req: Request<PuzzleParams>) {
  const slug = req.params.puzzleSlug;
  const result = await req.api.public.getPuzzleState({
    params: { slug: slug },
  });
  if (result.status !== 200) {
    // Puzzle doesn't exist or team doesn't have access.
    return undefined;
  }
  const guesses = result.body.guesses;
  const initialGuesses = JSON.stringify(guesses);
  const inlineScript = `window.puzzle_initialGuesses = ${initialGuesses}; window.puzzle_slug = "${slug}";`;

  const guessFrag = (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />
      <div id="puzzle-guesses">
        <PuzzleGuessSection slug={slug} initialGuesses={guesses} />
      </div>
    </>
  );

  // Look up puzzle by slug.  If none exists, 404.
  const puzzle = PUZZLES[slug];
  if (puzzle === undefined) {
    if (process.env.NODE_ENV === "development") {
      // This should only be reachable in dev mode.
      return (
        <Layout teamState={req.teamState} scripts={[lookupScript("puzzle")]}>
          <h1>Puzzle not assigned (devmode-only page)</h1>
          <p>
            The puzzle you requested (<code>{slug}</code>) exists as a stub, as
            it has no typeset content defined in{" "}
            <code>src/frontend/puzzles/index.ts</code>. This page would 404 in
            production, but for development we will pretend there is some
            content here so that we can test unlock mechanics.
          </p>
          <p>
            The backend will accept the answer <code>PLACEHOLDER ANSWER</code>{" "}
            as correct.
          </p>
          {guessFrag}
          <div id="puzzle-content" className="puzzle-content">
            Puzzle content would go here.
          </div>
        </Layout>
      );
    } else {
      return undefined;
    }
  }

  // TODO: Use round-specific puzzle page layout for result.body.round.  For
  // outlands puzzles, the layout may depend on round and puzzle visibility.

  // Select content component.
  const content = puzzle.content;
  const ContentComponent = content.component;
  const scripts = [lookupScript("puzzle"), ...(content.scripts ?? [])];
  const stylesheets = content.stylesheets;
  const title = puzzle.title;

  return (
    <Layout
      scripts={scripts}
      stylesheets={stylesheets}
      teamState={req.teamState}
    >
      <h1>{title}</h1>
      {/* TODO: add guess form, history, errata, etc. */}
      {guessFrag}
      <div id="puzzle-content" className="puzzle-content">
        <ContentComponent />
      </div>
    </Layout>
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
  const result = await req.api.public.submitGuess({
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
    res.json({
      status: "error",
      message: "Submission failed",
    });
  } else {
    res.json(result.body);
  }
});

export function solutionHandler(req: Request<PuzzleParams>) {
  // Only show solutions if we're in dev mode
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- !SHOW_SOLUTIONS always falsy
  if (process.env.NODE_ENV !== "development" || !SHOW_SOLUTIONS) {
    return undefined;
  }

  const slug = req.params.puzzleSlug;
  const puzzle = PUZZLES[slug];
  if (puzzle === undefined) {
    return (
      <Layout teamState={req.teamState}>
        <h1>Puzzle not found</h1>
        <p>
          The puzzle you requested a solution for (<code>{slug}</code>) exists,
          but we can&rsquo;t seem to find it.
        </p>
      </Layout>
    );
  }

  // TODO: look up round-specific solution page layout if applicable.

  const content = puzzle.solution;
  const SolutionComponent = content.component;
  const scripts = content.scripts;
  const stylesheets = content.stylesheets;
  const title = puzzle.title;
  return (
    <Layout
      scripts={scripts}
      stylesheets={stylesheets}
      teamState={req.teamState}
    >
      <h1>Solution to {title}</h1>
      <div id="solution-content" className="solution-content">
        <SolutionComponent />
      </div>
    </Layout>
  );
}
