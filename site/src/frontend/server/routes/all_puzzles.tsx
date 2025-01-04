import { type Request } from "express";
import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import {
  type AllPuzzlesState,
  type AllPuzzlesRound,
} from "../../client/all_puzzles_types";
import AllPuzzlesList from "../../components/AllPuzzlesList";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import { Wrapper } from "../../components/StyledUI";
import { INTERACTIONS } from "../../interactions";
import { PUZZLES } from "../../puzzles";

export function allPuzzlesState(teamState: TeamHuntState): AllPuzzlesState {
  const rounds = Object.entries(teamState.rounds).map(([roundKey, round]) => {
    const metas = Object.entries(round.slots).filter(([_slot, { is_meta }]) => {
      return !!is_meta;
    });
    const nonMetas = Object.entries(round.slots).filter(
      ([_slot, { is_meta }]) => {
        return !is_meta;
      },
    );
    const puzzles = [...metas, ...nonMetas].map(([slot, { slug, is_meta }]) => {
      const puzzle = PUZZLES[slug];
      const title = puzzle?.title ?? `Stub puzzle for slot ${slot}`;
      const lockState = teamState.puzzles[slug]?.locked;
      const answer = teamState.puzzles[slug]?.answer;
      const desc = puzzle?.initial_description;
      return {
        slug,
        title,
        desc,
        is_meta,
        state: lockState,
        answer,
      };
    });
    const renderedRound: AllPuzzlesRound = {
      slug: roundKey,
      title: round.title,
      puzzles,
    };
    if (round.interactions) {
      const interactions = Object.entries(round.interactions).map(
        ([interactionSlug, interactionState]) => {
          const intDefinition =
            INTERACTIONS[interactionSlug as keyof typeof INTERACTIONS];
          return {
            slug: interactionSlug,
            title: intDefinition.title,
            state: interactionState.state,
            result: interactionState.result,
          };
        },
      );
      renderedRound.interactions = interactions;
    }
    return renderedRound;
  });
  const stray = Object.entries(teamState.puzzles)
    .filter(([_, p]) => p.stray)
    .map(([slug, p]) => {
      const puzzle = PUZZLES[slug];
      const title = puzzle?.title ?? `Stub puzzle for stray puzzle ${slug}`;
      const lockState = p.locked;
      const answer = p.answer;
      const desc = puzzle?.initial_description;
      return {
        slug,
        title,
        desc,
        state: lockState,
        answer,
        is_meta: false, // Stray puzzles better not ever be metas
      };
    });
  return {
    epoch: teamState.epoch,
    rounds,
    stray,
    currency: teamState.currency,
  };
}

export function allPuzzlesHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const state = allPuzzlesState(teamState.state);
  const inlineScript = `window.initialAllPuzzlesState = ${JSON.stringify(state)}`;

  const node = (
    <Wrapper>
      <h1>All puzzles</h1>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="all-puzzles-root">
        <AllPuzzlesList state={state} />
      </div>
    </Wrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      entrypoints: ["all_puzzles" as const],
      title: "All puzzles",
    },
    teamState,
  );
}
