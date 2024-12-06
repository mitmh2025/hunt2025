import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import MissingDiamondBody from "./MissingDiamondBody";
import { type MissingDiamondState, type MissingDiamondItem } from "./types";

const SLOTS = [
  "mdm01",
  "mdm02",
  "mdm03",
  "mdm04",
  "mdm05",
  "mdp01",
  "mdp02",
  "mdp03",
  "mdp04",
  "mdp05",
  "mdp06",
  "mdp07",
  "mdp08",
  "mdp09",
  "mdp10",
  "mdp11",
  "mdp12",
  "mdp13",
  "mdp14",
  "mdp15",
  "mdp16",
  "mdp17",
  "mdp18",
  "mdp19",
  "mdp20",
  "mdp21",
  "mdp22",
  "mdp23",
  "mdp24",
  "mdp25",
  "mdp26",
  "mdp27",
  "mdp28",
];

function lookupSlug(
  slot: string,
  teamState: TeamHuntState,
): string | undefined {
  const round = teamState.rounds.the_missing_diamond;
  const slotObj = round ? round.slots[slot] : undefined;
  return slotObj?.slug;
}

function itemForSlot(
  slot: string,
  teamState: TeamHuntState,
): MissingDiamondItem | [] {
  const slug = lookupSlug(slot, teamState);
  if (!slug) return [];

  const puzzleDefinition = PUZZLES[slug];
  const puzzleState = teamState.puzzles[slug];
  const title = puzzleDefinition?.title ?? `Stub puzzle for slot ${slot}`;
  const desc = puzzleDefinition?.initial_description;
  if (!puzzleState) {
    // This should not happen, but hard to prove to the typechecker.
    return [];
  }

  return {
    title,
    slug,
    desc,
  };
}

export function missingDiamondState(
  teamState: TeamHuntState,
): MissingDiamondState {
  const items = SLOTS.flatMap((slot: string) => itemForSlot(slot, teamState));
  return { items };
}

const MissingDiamondRoundPage = ({
  teamState,
}: {
  teamState: TeamHuntState;
}) => {
  const state = missingDiamondState(teamState);
  const inlineScript = `window.initialMissingDiamondState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)}`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="missing-diamond-root">
        <MissingDiamondBody state={state} teamState={teamState} />
      </div>
    </>
  );
};

export default MissingDiamondRoundPage;
