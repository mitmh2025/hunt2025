import React from "react";
import { Counter } from "@/components/counter";
import type { TeamState } from "@/api/client";

const ShadowDiamondRoundPage = ({ teamState }: { teamState: TeamState }) => {
  // TODO: Make helper functions/components
  const roundState = teamState.rounds["shadow_diamond"];
  if (roundState === undefined) {
    return undefined;
  }
  const slots = roundState.slots;
  const puzzleStates = teamState.puzzles;
  const ifUnlocked = (slot: string, component) => {
    const slug = slots[slot];
    const puzzleState = slug && puzzleStates[slug];
    if (puzzleState?.locked === "unlocked") {
      return component;
    }
  }
  return (
    <div>
      <h1>Shadow Diamond investigation</h1>
      <p>TODO: show puzzle list based on props</p>
      {ifUnlocked("sdm02", <a href={`/puzzles/${slots["sdm02"]}`}>sdm02 is unlocked</a>)}
      {ifUnlocked("sdm03", <a href={`/puzzles/${slots["sdm03"]}`}>sdm03 (which should be Casino) is unlocked</a>)}
      <ul></ul>
      <Counter />
    </div>
  );
};

export default ShadowDiamondRoundPage;
