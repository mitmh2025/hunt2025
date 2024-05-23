import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import RoundPuzzleList from "../../components/RoundPuzzleList";

const PapertrailRoundPage = ({ teamState }: { teamState: TeamState }) => {
  return (
    <div>
      <h1>Papertrail round page</h1>
      <RoundPuzzleList teamState={teamState} round="papertrail" />
    </div>
  );
};

export default PapertrailRoundPage;
