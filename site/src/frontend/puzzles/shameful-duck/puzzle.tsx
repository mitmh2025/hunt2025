import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import { MailtoLink } from "../../components/StyledUI";

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
            cellophane bag. Please contact us at{" "}
            <MailtoLink subject={"Missing pieces for Anything is Popsicle"} />{" "}
            if it seems that you are missing pieces.
          </p>
        </>
      ) : (
        <>
          <p>Please come to the Gala to pick up your copy of this puzzle.</p>
          <p>
            You should receive thirty popsicle sticks in a sealed cellophane
            bag. Please contact us at{" "}
            <MailtoLink subject={"Missing pieces for Anything is Popsicle"} />{" "}
            if it seems that you are missing pieces.
          </p>
        </>
      )}
    </>
  );
};

export default Puzzle;
