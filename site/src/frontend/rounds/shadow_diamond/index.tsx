import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import photoimage from "../../../assets/demo-photo.png";

const ShadowDiamondRoundPage = ({ teamState }: { teamState: TeamState }) => {
  // TODO: Make helper functions/components
  const roundState = teamState.rounds["shadow_diamond"];
  if (roundState === undefined) {
    return undefined;
  }
  const slots = roundState.slots;
  const puzzleStates = teamState.puzzles;
  const linkIfUnlocked = (slot: string, linkText: string) => {
    const slug = slots[slot];
    const puzzleState = slug ? puzzleStates[slug] : undefined;
    if (puzzleState?.locked === "unlocked" && slug) {
      return <a href={`/puzzles/${slug}`}>{linkText}</a>;
    }
    return undefined;
  };
  return (
    <div>
      <h1>Shadow Diamond investigation</h1>
      <p>TODO: show puzzle list based on props</p>
      {linkIfUnlocked("sdm02", "sdm02 is unlocked")}
      {linkIfUnlocked("sdm03", "sdm03 (which should be Casino) is unlocked")}
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
