import { type Request, type RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import { type PuzzleStateLogEntry } from "../../../../lib/api/frontend_contract";
import { getBackgroundCheckManifestOverrides } from "../../components/BackgroundCheckPuzzleLayout";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import { getMissingDiamondHeader } from "../../components/MissingDiamondPuzzleLayout";
import PuzzleGuessSection from "../../components/PuzzleGuessSection";
import PuzzleHints from "../../components/PuzzleHints";
import {
  SolutionHintTable,
  SolutionCannedResponseTable,
} from "../../components/SolutionLayout";
import Stamp from "../../components/SparkleStamps";
import { PUZZLES, SUBPUZZLES } from "../../puzzles";
import { NODE_IDS_BY_PUZZLE_SLUG } from "../../rounds/illegal_search/graph";
import { missingDiamondState } from "../../rounds/missing_diamond";
import { PUZZLE_SLUGS_WITH_PUBLIC_STATE_LOG } from "../constants";
import {
  type ComponentManifest,
  DEFAULT_MANIFEST,
  ROUND_PUZZLE_COMPONENT_MANIFESTS,
} from "./manifests";

const SHOW_SOLUTIONS = true as boolean;

function getComponentManifestForPuzzle(
  teamState: TeamHuntState,
  slug: string,
  usage: "puzzle" | "solution",
): ComponentManifest {
  const puzzleState = teamState.puzzles[slug];
  if (!puzzleState) {
    return DEFAULT_MANIFEST;
  }

  if (puzzleState.round === "background_check") {
    const matchingSlotEntry = Object.entries(
      teamState.rounds.background_check?.slots ?? {},
    ).find(
      ([_slot, slotObj]: [string, { slug: string; is_meta?: boolean }]) => {
        return slotObj.slug === slug;
      },
    );
    if (!matchingSlotEntry) {
      return DEFAULT_MANIFEST; // how did this get here?
    }
    const overrides = getBackgroundCheckManifestOverrides(
      matchingSlotEntry[0],
      usage,
    );
    return Object.assign(
      {},
      DEFAULT_MANIFEST,
      ROUND_PUZZLE_COMPONENT_MANIFESTS.background_check,
      overrides,
    );
  }

  if (puzzleState.round === "illegal_search") {
    const illegalSearchEntry = Object.entries(
      teamState.rounds.illegal_search?.slots ?? {},
    ).find(
      ([_slot, slotObj]: [string, { slug: string; is_meta?: boolean }]) => {
        return slotObj.slug === slug;
      },
    );

    if (!illegalSearchEntry) {
      return DEFAULT_MANIFEST; // how did this get here?
    }

    const slot = illegalSearchEntry[0];
    if (["isp19", "isp20", "isp21", "isp22", "isp23", "ism03"].includes(slot)) {
      return Object.assign(
        {},
        DEFAULT_MANIFEST,
        ROUND_PUZZLE_COMPONENT_MANIFESTS.illegal_search_blacklight,
      );
    }
  }

  const roundSpecificOverrides =
    ROUND_PUZZLE_COMPONENT_MANIFESTS[puzzleState.round] ?? {};
  if (puzzleState.round === "missing_diamond") {
    return Object.assign({}, DEFAULT_MANIFEST, roundSpecificOverrides, {
      header: getMissingDiamondHeader({
        state: missingDiamondState(teamState),
        slug,
      }),
    });
  }
  return Object.assign({}, DEFAULT_MANIFEST, roundSpecificOverrides);
}

export type SubpuzzleParams = {
  subpuzzleSlug: string;
};

export async function subpuzzleHandler(req: Request<SubpuzzleParams>) {
  const teamState = req.teamState;
  if (!teamState) {
    return undefined;
  }

  const slug = req.params.subpuzzleSlug;
  const subpuzzle = SUBPUZZLES[slug];
  if (!subpuzzle) {
    return undefined;
  }

  await req.api.markSubpuzzleUnlocked({ params: { slug } });

  const result = await req.api.getSubpuzzleState({ params: { slug: slug } });
  if (result.status !== 200) {
    return undefined;
  }

  // If the puzzle has an answer, create a guess section.
  let guessFrag = <></>;
  if (subpuzzle.answer) {
    const guesses = result.body.guesses;
    const initialSubpuzzleGuesses = JSON.stringify(guesses);
    const inlineScript = `window.initialSubpuzzleGuesses = ${initialSubpuzzleGuesses}; window.puzzleSlug = "${slug}"; window.parentSlug = "${subpuzzle.parent_slug}";`;
    const noopOnGuessesUpdate = () => {
      /* no-op, this is noninteractive in SSR */
    };
    guessFrag = (
      <>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: inlineScript }}
        />
        <div id="subpuzzle-guesses">
          <PuzzleGuessSection
            type="subpuzzle"
            slug={slug}
            guesses={guesses}
            onGuessesUpdate={noopOnGuessesUpdate}
          />
        </div>
      </>
    );
  }

  let puzzleStateFrag = <></>;
  if (PUZZLE_SLUGS_WITH_PUBLIC_STATE_LOG.includes(subpuzzle.parent_slug)) {
    const puzzleStateLogResult = await req.frontendApi.getFullPuzzleStateLog({
      query: { team_id: teamState.teamId, slug: subpuzzle.parent_slug },
    });
    if (puzzleStateLogResult.status !== 200) {
      // Something has gone wrong. These puzzles need puzzle state log access, so
      // we should fail if we can't include it.
      return undefined;
    }
    const puzzleStateLog = puzzleStateLogResult.body;
    const initialPuzzleStateLog = JSON.stringify(puzzleStateLog);
    const puzzleStateLogScript = `window.initialPuzzleStateLog = ${initialPuzzleStateLog};`;
    puzzleStateFrag = (
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: puzzleStateLogScript }}
      />
    );
  }

  // Select content component.
  const content = subpuzzle.content;
  const ContentComponent = content.component;
  const title = subpuzzle.title;

  const manifest = getComponentManifestForPuzzle(
    teamState.state,
    subpuzzle.parent_slug,
    "puzzle",
  );
  const entrypoints = [
    "puzzle" as const,
    ...(manifest.entrypoint ? [manifest.entrypoint] : []),
    ...(content.entrypoint ? [content.entrypoint] : []),
  ];

  const PuzzleWrapperComponent = manifest.wrapper;
  const PuzzleHeaderComponent = manifest.header;
  const PuzzleTitleComponent = manifest.title;
  const PuzzleTitleWrapperComponent = manifest.titleWrapper;
  const PuzzleMainComponent = manifest.main;
  const PuzzleFooterComponent = manifest.footer;
  const PuzzleFontsComponent = manifest.fonts;

  const node = (
    <>
      {PuzzleFontsComponent ? <PuzzleFontsComponent /> : undefined}
      <PuzzleWrapperComponent>
        <PuzzleHeaderComponent>
          <PuzzleTitleWrapperComponent>
            <PuzzleTitleComponent>
              <span>{title}</span>
            </PuzzleTitleComponent>
          </PuzzleTitleWrapperComponent>
          {guessFrag}
        </PuzzleHeaderComponent>
        <PuzzleMainComponent
          id="puzzle-content"
          className="puzzle-content"
          data-copyable={content.copyable ? "true" : undefined}
        >
          {puzzleStateFrag}
          <ContentComponent
            type="subpuzzle"
            teamState={teamState.state}
            subpuzzleState={result.body}
            query={req.query}
          />
        </PuzzleMainComponent>
        <PuzzleFooterComponent />
      </PuzzleWrapperComponent>
    </>
  );

  return wrapContentWithNavBar(
    {
      node,
      entrypoints,
      title: subpuzzle.title,
    },
    teamState,
  );
}

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
          type="puzzle"
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
          title: `Stub puzzle for ${slug}`,
        },
        req.teamState,
      );
    } else {
      return undefined;
    }
  }

  // If this puzzle is not unlocked, 404.  Ideally we'd do this check as soon as we get the API
  // result, but devmode wants to render an unlock/info page even when the puzzle is locked.
  const puzzleState = req.teamState.state.puzzles[slug];
  if (!puzzleState) {
    return undefined;
  }

  // If this puzzle is not unlocked, 404.  Ideally we'd do this check as soon as we get the API
  // result, but devmode wants to render an unlock/info page even when the puzzle is locked.
  if (result.body.locked !== "unlocked") {
    return undefined;
  }

  let puzzleStateFrag = <></>;
  let puzzleStateLog: PuzzleStateLogEntry[] | undefined = undefined;
  if (PUZZLE_SLUGS_WITH_PUBLIC_STATE_LOG.includes(slug)) {
    const puzzleStateLogResult = await req.frontendApi.getFullPuzzleStateLog({
      query: { team_id: req.teamState.teamId, slug },
    });
    if (puzzleStateLogResult.status !== 200) {
      // Something has gone wrong. These puzzles need puzzle state log access, so
      // we should fail if we can't include it.
      return undefined;
    }
    puzzleStateLog = puzzleStateLogResult.body;
    const initialPuzzleStateLog = JSON.stringify(puzzleStateLog);
    const puzzleStateLogScript = `window.initialPuzzleStateLog = ${initialPuzzleStateLog}`;
    puzzleStateFrag = (
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: puzzleStateLogScript }}
      />
    );
  }

  // TODO: Use round-specific puzzle page layout for result.body.round.  For
  // outlands puzzles, the layout may depend on round and puzzle visibility.

  // Select content component.
  const content = puzzle.content;
  const ContentComponent = content.component;
  const title = puzzle.title;

  // Use the components for the relevant round.
  const manifest = getComponentManifestForPuzzle(
    req.teamState.state,
    slug,
    "puzzle",
  );

  const entrypoints = [
    "puzzle" as const,
    ...(manifest.entrypoint ? [manifest.entrypoint] : []),
    ...(content.entrypoint ? [content.entrypoint] : []),
  ];

  const PuzzleWrapperComponent = manifest.wrapper;
  const PuzzleTitleWrapperComponent = manifest.titleWrapper;
  const PuzzleHeaderComponent = manifest.header;
  const PuzzleTitleComponent = manifest.title;
  const PuzzleBacklinkComponent = manifest.backlink;
  const PuzzleMainComponent = manifest.main;
  const PuzzleFooterComponent = manifest.footer;
  const PuzzleFontsComponent = manifest.fonts;

  // Create a backlink, if we need one (Background Check metas construct theirs
  // separately.)
  let backlinkFrag = <></>;
  const isBackgroundCheckMeta = Object.entries(
    req.teamState.state.rounds.background_check?.slots ?? {},
  ).find(([_slot, slotObj]: [string, { slug: string; is_meta?: boolean }]) => {
    return slotObj.slug === slug && slotObj.is_meta;
  });
  if (!isBackgroundCheckMeta) {
    let backlinkHref = `/rounds/${puzzleState.round}`;
    let backlinkRoundTitle =
      req.teamState.state.rounds[puzzleState.round]?.title;
    if (puzzleState.round === "stray_leads") {
      backlinkHref = "/rounds/stray_leads";
      backlinkRoundTitle = "Stray Leads";
    } else if (puzzleState.round === "illegal_search") {
      // We want to go back to the same node we were at before.
      const node_id = NODE_IDS_BY_PUZZLE_SLUG[slug] ?? null;
      if (node_id) {
        backlinkHref += `?node=${node_id}`;
      }
    }
    const backlinkChildren = `← Back to ${backlinkRoundTitle}`;
    backlinkFrag = (
      <PuzzleBacklinkComponent href={backlinkHref}>
        {backlinkChildren}
      </PuzzleBacklinkComponent>
    );
  }

  const node = (
    <>
      {PuzzleFontsComponent ? <PuzzleFontsComponent /> : undefined}
      <PuzzleWrapperComponent>
        <PuzzleHeaderComponent>
          {puzzleState.answer && <Stamp />}
          <PuzzleTitleWrapperComponent>
            {backlinkFrag}
            <PuzzleTitleComponent>
              <span>{title}</span>
            </PuzzleTitleComponent>
          </PuzzleTitleWrapperComponent>
          {/* TODO: add guess form, history, errata, etc. */}
          {guessFrag}
        </PuzzleHeaderComponent>
        <PuzzleMainComponent
          id="puzzle-content"
          className="puzzle-content"
          data-copyable={content.copyable ? "true" : undefined}
        >
          {puzzleStateFrag}
          <ContentComponent
            type="puzzle"
            teamName={req.teamState.info.teamName}
            teamState={req.teamState.state}
            puzzleState={result.body}
            puzzleStateLog={puzzleStateLog}
            query={req.query}
          />
        </PuzzleMainComponent>
        <PuzzleFooterComponent />
      </PuzzleWrapperComponent>
    </>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: puzzle.title,
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

export const subpuzzleGuessPostHandler: RequestHandler<
  PuzzleParams,
  unknown,
  PuzzleGuessReqBody,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  // TODO: validate req.body with zod
  const { guess } = req.body;
  const slug = req.params.puzzleSlug;
  const result = await req.api.submitSubpuzzleGuess({
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
          but we can’t seem to find it.
        </p>
      </div>
    );
    return wrapContentWithNavBar(
      { node, title: `Missing Solution for ${slug}` },
      req.teamState,
    );
  }

  // TODO: look up round-specific solution page layout if applicable.
  const content = puzzle.solution;
  const SolutionComponent = content.component;

  // Use the entrypoint for pages in the relevant round.
  const manifest = getComponentManifestForPuzzle(
    req.teamState.state,
    slug,
    "solution",
  );
  const entrypoints = [
    "solution" as const,
    ...(manifest.entrypoint ? [manifest.entrypoint] : []),
  ];

  const SolutionWrapperComponent = manifest.wrapper;
  const SolutionHeaderComponent = manifest.header;
  const SolutionTitleWrapperComponent = manifest.titleWrapper;
  const SolutionBacklinkComponent = manifest.backlink;
  const SolutionTitleComponent = manifest.title;
  const SolutionMainComponent = manifest.main;
  const SolutionFooterComponent = manifest.footer;
  const SolutionFontsComponent = manifest.fonts;
  const SolutionAcknowledgementBlockComponent = manifest.acknowledgementBlock;
  const SolutionAcknowledgementComponent = manifest.acknowledgement;
  const SolutionAnswerComponent = manifest.answer;
  const SolutionSpoilerComponent = manifest.spoiler;

  const title = puzzle.title;
  const authors = formatList(puzzle.authors);
  const editors = formatList(puzzle.editors);
  const acknowledgements = puzzle.additional_credits.map((credit) =>
    "freeform" in credit ? (
      <SolutionAcknowledgementComponent key={credit.freeform}>
        {credit.freeform}
      </SolutionAcknowledgementComponent>
    ) : (
      <SolutionAcknowledgementComponent key={credit.for_what}>
        {credit.for_what} by {formatList(credit.who)}
      </SolutionAcknowledgementComponent>
    ),
  );

  // Create a backlink, if we need one (Background Check metas construct theirs
  // separately.)
  let backlinkFrag = <></>;
  const isBackgroundCheckMeta = Object.entries(
    req.teamState.state.rounds.background_check?.slots ?? {},
  ).find(([_slot, slotObj]: [string, { slug: string; is_meta?: boolean }]) => {
    return slotObj.slug === slug && slotObj.is_meta;
  });
  if (!isBackgroundCheckMeta) {
    backlinkFrag = (
      <SolutionBacklinkComponent href={`/puzzles/${slug}`}>
        ← Back to puzzle
      </SolutionBacklinkComponent>
    );
  }

  const answer = puzzle.answer;
  const inlineScript = `window.hints = ${JSON.stringify(puzzle.hints)}; window.cannedResponses = ${JSON.stringify(puzzle.canned_responses)};`;
  const node = (
    <>
      {SolutionFontsComponent ? <SolutionFontsComponent /> : undefined}
      <SolutionWrapperComponent>
        <SolutionHeaderComponent>
          <SolutionTitleWrapperComponent>
            {backlinkFrag}
            <SolutionTitleComponent>Solution to {title}</SolutionTitleComponent>
          </SolutionTitleWrapperComponent>
          <SolutionAnswerComponent>
            Answer:{" "}
            <SolutionSpoilerComponent>{answer}</SolutionSpoilerComponent>
          </SolutionAnswerComponent>
          <SolutionAcknowledgementBlockComponent>
            <SolutionAcknowledgementComponent>
              By {authors}
            </SolutionAcknowledgementComponent>
            <SolutionAcknowledgementComponent>
              Edited by {editors}
            </SolutionAcknowledgementComponent>
            {acknowledgements}
          </SolutionAcknowledgementBlockComponent>
        </SolutionHeaderComponent>
        <SolutionMainComponent
          id="solution-content"
          className="solution-content"
        >
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: inlineScript }}
          />
          <div id="solution-hints">
            <SolutionHintTable hints={puzzle.hints} />
          </div>
          <div id="solution-canned-responses">
            <SolutionCannedResponseTable
              cannedResponses={puzzle.canned_responses}
            />
          </div>
          <SolutionComponent
            type="solution"
            teamState={req.teamState.state}
            query={req.query}
          />
        </SolutionMainComponent>
        <SolutionFooterComponent />
      </SolutionWrapperComponent>
    </>
  );

  return wrapContentWithNavBar(
    {
      node,
      entrypoints,
      title: `Solution for ${title}`,
    },
    req.teamState,
  );
}

export async function puzzleHintsHandler(req: Request<PuzzleParams>) {
  if (!req.teamState) {
    return undefined;
  }
  const slug = req.params.puzzleSlug;
  const result = await req.api.getPuzzleState({
    params: { slug: slug },
  });
  if (result.status !== 200 || result.body.locked !== "unlocked") {
    // Puzzle doesn't exist or team doesn't have access.
    return undefined;
  }

  const hints = result.body.hints;
  const initialHints = JSON.stringify(hints);
  const initialTeamState = JSON.stringify(req.teamState.state);
  const inlineScript = `window.initialHints = ${initialHints}; window.initialTeamState=${initialTeamState}; window.puzzleSlug = "${slug}";`;

  const hintsFrag = (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />
      <div id="puzzle-hints">
        <PuzzleHints
          slug={slug}
          hints={hints}
          teamState={req.teamState.state}
          onReceiveHintsFromApi={() => {
            /* noop */
          }}
        />
      </div>
    </>
  );

  // Look up puzzle by slug.  If none exists, 404.
  const puzzle = PUZZLES[slug];
  if (puzzle === undefined) {
    return undefined;
  }
  const title = puzzle.title;

  // Use the components for the relevant round.
  const manifest = getComponentManifestForPuzzle(
    req.teamState.state,
    slug,
    "puzzle",
  );

  const entrypoints = [
    "hints" as const,
    ...(manifest.entrypoint ? [manifest.entrypoint] : []),
  ];

  const HintsWrapperComponent = manifest.wrapper;
  const HintsTitleWrapperComponent = manifest.titleWrapper;
  const HintsHeaderComponent = manifest.header;
  const HintsTitleComponent = manifest.title;
  const HintsBacklinkComponent = manifest.backlink;
  const HintsMainComponent = manifest.main;
  const HintsFooterComponent = manifest.footer;
  const HintsFontsComponent = manifest.fonts;

  const backlinkFrag = (
    <>
      <HintsBacklinkComponent href={`/puzzles/${slug}`}>
        ← Back to puzzle
      </HintsBacklinkComponent>
    </>
  );

  const node = (
    <>
      {HintsFontsComponent ? <HintsFontsComponent /> : undefined}

      <HintsWrapperComponent>
        <HintsHeaderComponent>
          <HintsTitleWrapperComponent>
            {backlinkFrag}
            <HintsTitleComponent>
              <span>Hints For {title}</span>
            </HintsTitleComponent>
          </HintsTitleWrapperComponent>
        </HintsHeaderComponent>
        <HintsMainComponent id="hints-content" className="hints-content">
          {hintsFrag}
        </HintsMainComponent>
        <HintsFooterComponent />
      </HintsWrapperComponent>
    </>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: puzzle.title,
      entrypoints,
    },
    req.teamState,
  );
}
