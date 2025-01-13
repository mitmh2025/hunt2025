import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.illegal_search?.gates?.includes("isg33") ?? false;

  return (
    <>
      {pickupCompleted ? (
        <>
          <p>Our records show you have picked up your copy of this puzzle.</p>
          <p>
            You should have received a paper box containing thirteen paper
            objects. Please contact us at info@mitmh2025.com if it seems that
            you are missing pieces.
          </p>
        </>
      ) : (
        <>
          <p>
            Please come to the Gala and ask the bartender if you can bum a
            puzzle.
          </p>
          <p>
            You should receive a paper box containing thirteen paper objects.
            Please contact us at info@mitmh2025.com if it seems that you are
            missing pieces.
          </p>
        </>
      )}
    </>
  );
};

export default Puzzle;
