import Layout from "../components/Layout";
import { PUZZLES } from "../../puzzledata";
import { Request } from "express";
import React from "react";

const SHOW_SOLUTIONS = true;

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
  const puzzle = PUZZLES[slug];
  if (puzzle === undefined) {
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

  // TODO: Use round-specific puzzle page layout for result.body.round.  For
  // outlands puzzles, the layout may depend on round and puzzle visibility.

  // Select content component.
  const content = puzzle.content;
  const ContentComponent = content.component;
  const scripts = content.scripts;
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
  const puzzle = PUZZLES[slug];
  if (puzzle === undefined) {
    return (
      <Layout teamState={req.teamState}>
        <h1>Puzzle not found</h1>
        <p>
          The puzzle you requested a solution for (<code>{slug}</code>) exists,
          but we can't seem to find it.
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
