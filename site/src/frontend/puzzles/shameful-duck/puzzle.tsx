import React from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../lib/api/client";
import puzzle from "./assets/anything-is-popsicle.pdf";

const StyledIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 8.5/11;
`;

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
          <p>
            The following PDF is provided for accessibility and/or remote
            solving.
          </p>
          <StyledIframe src={puzzle} />
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
