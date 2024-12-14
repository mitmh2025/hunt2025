import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.stakeout?.gates?.includes("sog03") ?? false;

  return (
    <>
      {pickupCompleted ? (
        <>
          <p>Our records show you have picked up your copy of this puzzle.</p>
          <p>
            You should have received thirty popsicle sticks in a sealed
            cellophane bag.
          </p>
        </>
      ) : (
        <>
          <p>Please come to the Gala to pick up your copy of this puzzle.</p>
          <p>
            You should receive thirty popsicle sticks in a sealed cellophane
            bag.
          </p>
        </>
      )}
    </>
  );
};

export default Puzzle;
