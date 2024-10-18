import React from "react";
import { type TeamState } from "../../../../lib/api/client";

// TODO: track if we believe that the team has picked up their copy of this puzzle?
const Puzzle = ({ teamState }: { teamState: TeamState }) => {
  const pickupCompleted =
    "mdg01" in (teamState.rounds.missing_diamond?.gates ?? []);

  if (pickupCompleted) {
    return (
      <>
        <p>Our records show you have picked up your copy of this puzzle.</p>
        <p>
          You should have received exactly 45 small pieces and one rod in a
          ziploc bag. No two pieces should be exactly identical. Please contact
          us if it seems that you are missing pieces.
        </p>
      </>
    );
  }

  return (
    <>
      <p>Please come to the Gala to pick up your copy of this puzzle.</p>
      <p>
        You should receive exactly 45 small pieces and one rod in a ziploc bag.
        No two pieces should be exactly identical. Please contact us if it seems
        you are missing pieces.
      </p>
    </>
  );
};

export default Puzzle;
