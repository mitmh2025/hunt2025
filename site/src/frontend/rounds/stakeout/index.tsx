import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import RoundPuzzleList from "../../components/RoundPuzzleList";

const StakeoutRoundPage = ({ teamState }: { teamState: TeamState }) => {
  return (
    <div>
      <h1>Stakeout round page</h1>
      <RoundPuzzleList teamState={teamState} round="stakeout" />
    </div>
  );
};

export default StakeoutRoundPage;
