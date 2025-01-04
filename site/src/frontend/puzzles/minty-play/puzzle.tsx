import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.stakeout?.gates?.includes("sog01") ?? false;

  if (pickupCompleted) {
    return (
      <>
        <p>Our records show you have picked up your copy of this puzzle.</p>
        <p>
          You should have received a miniature cereal box containing several
          crayons. Please contact us at info@mitmh2025.com if it seems that you
          are missing pieces.
        </p>
      </>
    );
  }
  return (
    <>
      <p>Please come to the Gala to pick up your copy of this puzzle.</p>
      <p>
        You should receive a miniature cereal box containing several crayons.
        Please contact us at info@mitmh2025.com if it seems that you are missing
        pieces.
      </p>
    </>
  );
};

export default Puzzle;
