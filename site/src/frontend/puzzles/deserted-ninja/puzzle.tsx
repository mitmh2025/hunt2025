import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
//  const pickupCompleted =
//    teamState.rounds.stakeout?.gates?.includes("sog03") ?? false;

  return (
    <>
      <p>Puzzle goes here</p>
    </>
  );
};

export default Puzzle;
