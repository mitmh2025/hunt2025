import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import RoundPuzzleList from "../../components/RoundPuzzleList";

const DeadThiefRoundPage = ({ teamState }: { teamState: TeamState }) => {
  return (
    <div>
      <h1>The Dead Thief round page</h1>
      <RoundPuzzleList teamState={teamState} round="the_dead_thief" />
    </div>
  );
};

export default DeadThiefRoundPage;
