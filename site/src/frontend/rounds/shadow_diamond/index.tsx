import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import ShadowDiamondBody from "./ShadowDiamondBody";
import { type ShadowDiamondState, type ShadowDiamondItem } from "./types";

const SLOTS = [
  "sdm01",
  "sdm02",
  "sdm03",
  "sdm04",
  "sdm05",
  "sdp01",
  "sdp02",
  "sdp03",
  "sdp04",
  "sdp05",
  "sdp06",
  "sdp07",
  "sdp08",
  "sdp09",
  "sdp10",
  "sdp11",
  "sdp12",
  "sdp13",
  "sdp14",
  "sdp15",
  "sdp16",
  "sdp17",
  "sdp18",
  "sdp19",
  "sdp20",
  "sdp21",
  "sdp22",
  "sdp23",
  "sdp24",
  "sdp25",
  "sdp26",
  "sdp27",
  "sdp28",
];

function lookupSlug(slot: string, teamState: TeamState): string | undefined {
  const round = teamState.rounds.shadow_diamond;
  const slotObj = round ? round.slots[slot] : undefined;
  return slotObj?.slug;
}

function itemForSlot(
  slot: string,
  teamState: TeamState,
): ShadowDiamondItem | [] {
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

export function shadowDiamondState(teamState: TeamState): ShadowDiamondState {
  const items = SLOTS.flatMap((slot: string) => itemForSlot(slot, teamState));
  return { items };
}

const ShadowDiamondRoundPage = ({ teamState }: { teamState: TeamState }) => {
  const state = shadowDiamondState(teamState);
  const inlineScript = `window.initialShadowDiamondState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)}`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="shadow-diamond-root">
        <ShadowDiamondBody state={state} teamState={teamState} />
      </div>
    </>
  );
};

export default ShadowDiamondRoundPage;
