import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import photoimage from "../../../assets/demo-photo.png";
import IsolatedScripts from "../../components/IsolatedScripts";
import RoundPuzzleList from "../../components/RoundPuzzleList";
import { lookupScript } from "../../server/assets";

const ShadowDiamondRoundPage = ({ teamState }: { teamState: TeamState }) => {
  const roundState = teamState.rounds.shadow_diamond;
  if (roundState === undefined) {
    return undefined;
  }
  return (
    <div>
      <h1>Shadow Diamond investigation</h1>
      <img
        className="photo"
        src={photoimage}
        alt="Outline of suspect photograph"
      />
      <p>This image was included via SSR asset usage.</p>
      <RoundPuzzleList teamState={teamState} round="shadow_diamond" />
      <div id="shadow-diamond-root" />
      <IsolatedScripts scripts={[lookupScript("shadow_diamond")]} />
    </div>
  );
};

export default ShadowDiamondRoundPage;
