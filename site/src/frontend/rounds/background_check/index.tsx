import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import RoundPuzzleList from "../../components/RoundPuzzleList";

const BackgroundCheckRoundPage = ({ teamState }: { teamState: TeamState }) => {
  return (
    <div>
      <h1>Background Check round page</h1>
      <RoundPuzzleList teamState={teamState} round="background_check" />
    </div>
  );
};

export default BackgroundCheckRoundPage;
