import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.the_missing_diamond?.gates?.includes("mdg02") ?? false;

  if (pickupCompleted) {
    return (
      <>
        <p>Our records show you have picked up your copy of this puzzle.</p>
        <p>
          You should have received a plastic bag containing 14 pieces of paper
          fastened by 4 bread tags.
        </p>
      </>
    );
  }

  return (
    <>
      <p>Please come to the Gala to pick up your copy of this puzzle.</p>
      <p>
        You should receive a plastic bag containing 14 pieces of paper fastened
        by 4 bread tags.
      </p>
    </>
  );
};

export default Puzzle;
