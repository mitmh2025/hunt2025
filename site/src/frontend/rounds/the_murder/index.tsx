import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import MurderBody from "./MurderBody";
import { type MurderState } from "./types";

const MURDER_SLOTS = [
  "tmp01",
  "tmp02",
  "tmp03",
  "tmp04",
  "tmp05",
  "tmp06",
  "tmp07",
  "tmp08",
  "tmp09",
  "tmp10",
  "tmp11",
  "tmp12",
  "tmp13",
  "tmp14",
  "tmp15",
  "tmp16",
  "tmp17",
  "tmp18",
  "tmp19",
  "tmp20",
  "tmp21",
  "tmp22",
  "tmp23",
  "tmp24",
  "tmm01",
] as const;

export function murderState(teamState: TeamHuntState): MurderState {
  const round = teamState.rounds.the_murder;
  if (!round) return { items: [] };

  const items = MURDER_SLOTS.flatMap((slotId) => {
    const slot = round.slots[slotId];
    if (!slot) return [];
    const slug = slot.slug;
    const puzzleDefinition = PUZZLES[slug];
    return {
      title: puzzleDefinition?.title ?? `Stub puzzle for slot ${slotId}`,
      slug,
    };
  });

  return { items };
}

const MurderRoundPage = ({ teamState }: { teamState: TeamHuntState }) => {
  const state = murderState(teamState);
  const inlineScript = `window.initialMurderState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)};`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="the-murder-root">
        <MurderBody state={state} teamState={teamState} />
      </div>
    </>
  );
};

export default MurderRoundPage;
