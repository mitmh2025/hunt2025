import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.stakeout?.gates?.includes("sog02") ?? false;

  return (
    <>
      <p className="puzzle-flavor">In fact, it’s kind of muddy.</p>
      {pickupCompleted ? (
        <>
          <p>Our records show you have picked up your copy of this puzzle.</p>
          <p>
            You should have received ten transparency sheets and three sheets of
            paper. Please contact us at info@mitmh2025.com if it seems that you
            are missing pieces.
          </p>
        </>
      ) : (
        <>
          <p>Please come to the Gala to pick up your copy of this puzzle.</p>
          <p>
            You should receive ten transparency sheets and three sheets of
            paper. Please contact us at info@mitmh2025.com if it seems that you
            are missing pieces.
          </p>
        </>
      )}
    </>
  );
};

export default Puzzle;
