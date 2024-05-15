import Layout from "../components/Layout";
import HUNT from "../../puzzledata";
import { Round, PuzzleSlot } from "puzzledata/types";
import { Request } from "express";
import React from "react";

const SHOW_SOLUTIONS = true;

function lookupPuzzleBySlug(
  slug: string | undefined,
): [Round, PuzzleSlot] | undefined {
  if (slug === undefined) return undefined;
  // returns [round, puzzle] if found or undefined if not
  const rounds = HUNT.rounds;
  for (let r = 0; r < rounds.length; r++) {
    const round = rounds[r]!;
    const puzzles = round.puzzles;
    for (let p = 0; p < puzzles.length; p++) {
      const puzzleSlot = puzzles[p]!;
      if (puzzleSlot.assignment !== undefined) {
        if (puzzleSlot.assignment.slug === slug) {
          return [round, puzzleSlot];
        }
      }
    }
  }

  return undefined;
}

export async function puzzleHandler(req: Request) {
  const slug = req.params.puzzleSlug;
  if (slug === undefined) {
    return undefined;
  }
  const result = await req.api.public.getPuzzleState({
    params: { slug: slug },
  });
  if (result.status !== 200) {
    // Puzzle doesn't exist or team doesn't have access.
    return undefined;
  }

  // Look up puzzle by slug.  If none exists, 404.
  const match = lookupPuzzleBySlug(slug);
  if (match === undefined) {
    return (
      <Layout teamState={req.teamState}>
        <h1>Puzzle not found</h1>
        <p>
          The puzzle you requested (<code>{slug}</code>) exists, but we can't
          seem to find it.
        </p>
      </Layout>
    );
  }

  // Puzzle is valid and known to have an assignment.
  const [_round, puzzleSlot] = match;

  // TODO: look up round-specific puzzle page layout, if applicable.  For
  // outlands puzzles, the layout may depend on round and puzzle visibility.

  // TODO: fetch puzzle details from backend (in particular, for guess history)

  // Select content component.
  const content = puzzleSlot.assignment!.content;
  const ContentComponent = content.component;
  const { scripts, stylesheets } = content;
  const title = puzzleSlot.assignment!.title;

  return (
    <Layout
      scripts={scripts}
      stylesheets={stylesheets}
      teamState={req.teamState}
    >
      <h1>{title}</h1>
      {/* TODO: add guess form, history, errata, etc. */}
      <div id="puzzle-content" className="puzzle-content">
        <ContentComponent />
      </div>
    </Layout>
  );
}

export function solutionHandler(req: Request) {
  // Only show solutions if we're in dev mode
  if (process.env.NODE_ENV !== "development" || SHOW_SOLUTIONS !== true) {
    return undefined;
  }

  const slug = req.params.puzzleSlug;
  const match = lookupPuzzleBySlug(slug);
  if (match === undefined) {
    return undefined;
  }
  const [_round, puzzleSlot] = match;

  // TODO: look up round-specific solution page layout if applicable.

  const content = puzzleSlot.assignment!.solution;
  const SolutionComponent = content.component;
  const { scripts, stylesheets } = content;
  const title = puzzleSlot.assignment!.title;
  return (
    <Layout
      scripts={scripts}
      stylesheets={stylesheets}
      teamState={req.teamState}
    >
      <h1>Solution to {title}</h1>
      <div id="solution-content">
        <SolutionComponent />
      </div>
    </Layout>
  );
}
