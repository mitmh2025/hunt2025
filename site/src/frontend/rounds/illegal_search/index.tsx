import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import RoundPuzzleList from "../../components/RoundPuzzleList";

const IllegalSearchRoundPage = ({ teamState }: { teamState: TeamState }) => {
  return (
    <div>
      <h1>Illegal Search round page</h1>
      <p>
        This will be substantially more complicated and will likely involve lots
        of additional frontend code
      </p>
      <RoundPuzzleList teamState={teamState} round="illegal_search" />
    </div>
  );
};

export default IllegalSearchRoundPage;
