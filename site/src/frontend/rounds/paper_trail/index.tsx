import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import { Root } from "./Layout";
import PaperTrailBody from "./PaperTrailBody";
import { type PaperTrailState, type PaperTrailItem } from "./types";

const SUBSIDIARY_SLOTS = [
  "ptp01",
  "ptp02",
  "ptp03",
  "ptp04",
  "ptp05",
  "ptp06",
  "ptp07",
  "ptp08",
  "ptp09",
  "ptp10",
  "ptp11",
  "ptp12",
  "ptp13",
  "ptp14",
  "ptp15",
  "ptp16",
  "ptp17",
];

const SHELL_SLOTS = [
  "ptm01",
  "ptm02",
  "ptm03",
  "ptm04",
  "ptm05",
  "ptm06",
  "ptm07",
  "ptm08",
];

function lookupSlug(slot: string, teamState: TeamState): string | undefined {
  const round = teamState.rounds.paper_trail;
  const slotObj = round ? round.slots[slot] : undefined;
  return slotObj?.slug;
}

function itemForSlot(slot: string, teamState: TeamState): PaperTrailItem | [] {
  const slug = lookupSlug(slot, teamState);
  if (!slug) return [];

  const puzzleDefinition = PUZZLES[slug];
  const puzzleState = teamState.puzzles[slug];
  const title = puzzleDefinition?.title ?? `Stub puzzle for slot ${slot}`;
  if (!puzzleState) {
    // This should not happen, but hard to prove to the typechecker.
    return [];
  }

  return {
    title,
    slug,
  };
}

export function paperTrailState(teamState: TeamState): PaperTrailState {
  const subsidiaryItems = SUBSIDIARY_SLOTS.flatMap((slot: string) =>
    itemForSlot(slot, teamState),
  );
  const groups = [
    {
      label: "Subsidiary corporations",
      items: subsidiaryItems,
    },
  ];

  const shellItems = SHELL_SLOTS.flatMap((slot: string) =>
    itemForSlot(slot, teamState),
  );
  if (shellItems.length > 0) {
    groups.push({
      label: "Shell corporations",
      items: shellItems,
    });
  }

  const superItem = ["ptm09"].flatMap((slot: string) =>
    itemForSlot(slot, teamState),
  );
  if (superItem.length > 0) {
    groups.push({
      label: "The Shell Game",
      items: superItem,
    });
  }

  return {
    groups,
  };
}

const PapertrailRoundPage = ({ teamState }: { teamState: TeamState }) => {
  const state = paperTrailState(teamState);
  const inlineScript = `window.initialPaperTrailState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)};`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <Root id="paper-trail-root">
        <PaperTrailBody state={state} teamState={teamState} />
      </Root>
    </>
  );
};

export default PapertrailRoundPage;
