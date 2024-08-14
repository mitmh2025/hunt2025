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

const SHOW_SOLUTIONS = true as boolean;

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
  const initialPuzzleData = JSON.stringify(result.body);
  const inlineScript = `window.initialPuzzleData = ${initialPuzzleData}; window.puzzleSlug = "${slug}";`;
  const guessFrag = (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />
      <div id="puzzle-guesses">
        <PuzzleGuessSection
          slug={slug}
          initialGuesses={guesses}
          solved={!!result.body.answer}
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
  if (result.body.locked !== "unlocked") {
    return undefined;
  }

  // TODO: Use round-specific puzzle page layout for result.body.round.  For
  // outlands puzzles, the layout may depend on round and puzzle visibility.

  // Select content component.
  const content = puzzle.content;
  const ContentComponent = content.component;
  const entrypoints = [
    "puzzle" as const,
    ...(content.entrypoint ? [content.entrypoint] : []),
  ];
  const title = puzzle.title;

  const node = (
    <>
      <PuzzleWrapper>
        <PuzzleHeader>
          <PuzzleTitle>{title}</PuzzleTitle>
          {/* TODO: add guess form, history, errata, etc. */}
          {guessFrag}
        </PuzzleHeader>
        <PuzzleMain id="puzzle-content" className="puzzle-content">
          <ContentComponent />
        </PuzzleMain>
      </PuzzleWrapper>
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
  const entrypoints = content.entrypoint ? [content.entrypoint] : [];
  const title = puzzle.title;
  const authors = formatList(puzzle.authors);
  const editors = formatList(puzzle.editors);
  const acknowledgements = puzzle.additional_credits.map((credit) => (
    <h3 key={credit.for_what}>
      {credit.for_what} by {formatList(credit.who)}
    </h3>
  ));

  const answers =
    "answer" in puzzle
      ? [puzzle.answer]
      : puzzle.answers.map((ansObject) => ansObject.answer);
  const answerLabel = answers.length > 1 ? "Answers" : "Answer";

  const node = (
    <div>
      <h1>Solution to {title}</h1>
      <h2>
        {answerLabel}:{" "}
        {answers.map((answer, i) => (
          <Spoiler key={i}>{answer}</Spoiler>
        ))}
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
