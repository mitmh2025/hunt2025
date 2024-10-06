import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import BackgroundCheckBody from "./BackgroundCheckBody";
import { type BackgroundCheckItem, type BackgroundCheckState } from "./types";
import { Background } from "./Layout";

const SLOTS = [
  "bgm01",
  "bgm02",
  "bgm03",
  "bgm04",
  "bgp01",
  "bgp02",
  "bgp03",
  "bgp04",
  "bgp05",
  "bgp06",
  "bgp07",
  "bgp08",
  "bgp09",
  "bgp10",
  "bgp11",
  "bgp12",
  "bgp13",
  "bgp14",
];

function lookupSlug(slot: string, teamState: TeamState): string | undefined {
  const round = teamState.rounds.background_check;
  const slotObj = round ? round.slots[slot] : undefined;
  return slotObj?.slug;
}

function itemForSlot(
  slot: string,
  teamState: TeamState,
): BackgroundCheckItem | [] {
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

export function backgroundCheckState(
  teamState: TeamState,
): BackgroundCheckState {
  const items = SLOTS.flatMap((slot: string) => itemForSlot(slot, teamState));
  return { items };
}

const BackgroundCheckRoundPage = ({ teamState }: { teamState: TeamState }) => {
  const state = backgroundCheckState(teamState);
  const inlineScript = `window.initialBackgroundCheckState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)}`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <Background id="background-check-root">
        <BackgroundCheckBody state={state} teamState={teamState} />
      </Background>
    </>
  );
};

export default BackgroundCheckRoundPage;
