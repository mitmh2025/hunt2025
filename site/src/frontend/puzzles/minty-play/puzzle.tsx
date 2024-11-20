import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted = "mdg01" in (teamState.rounds.stakeout?.gates ?? []);

  if (pickupCompleted) {
    return (
      <>
        <p>Our records show you have picked up your copy of this puzzle.</p>
        <p>
          You should have received a miniature cereal box containing several
          crayons.
        </p>
      </>
    );
  }
  return (
    <>
      <p>Please come to the Gala to pick up your copy of this puzzle.</p>
      <p>
        You should receive a miniature cereal box containing several crayons.
      </p>
    </>
  );
};

export default Puzzle;
