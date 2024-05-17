import React from "react";
import type { ReactNode } from "react";

import type { TeamState } from "@/api/client";
import photoimage from "@/assets/demo-photo.png";

const ShadowDiamondRoundPage = ({ teamState }: { teamState: TeamState }) => {
  // TODO: Make helper functions/components
  const roundState = teamState.rounds["shadow_diamond"];
  if (roundState === undefined) {
    return undefined;
  }
  const slots = roundState.slots;
  const puzzleStates = teamState.puzzles;
  const ifUnlocked = (slot: string, component: ReactNode) => {
    const slug = slots[slot];
    const puzzleState = slug ? puzzleStates[slug] : undefined;
    if (puzzleState?.locked === "unlocked") {
      return component;
    }
    return undefined;
  };
  return (
    <div>
      <h1>Shadow Diamond investigation</h1>
      <p>TODO: show puzzle list based on props</p>
      {ifUnlocked(
        "sdm02",
        <a href={`/puzzles/${slots["sdm02"]}`}>sdm02 is unlocked</a>,
      )}
      {ifUnlocked(
        "sdm03",
        <a href={`/puzzles/${slots["sdm03"]}`}>
          sdm03 (which should be Casino) is unlocked
        </a>,
      )}
      <ul></ul>
      <img
        className="photo"
        src={photoimage}
        alt="Outline of suspect photograph"
      />
      <p>This image was included via SSR asset usage.</p>
      <div id="shadow-diamond-root" />
    </div>
  );
};

export default ShadowDiamondRoundPage;
