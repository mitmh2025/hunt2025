import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import { MailtoLink } from "../../components/StyledUI";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }) => {
  const pickupCompleted =
    teamState.rounds.missing_diamond?.gates?.includes("mdg01") ?? false;

  if (pickupCompleted) {
    return (
      <>
        <p>Our records show you have picked up your copy of this puzzle.</p>
        <p>
          You should have received exactly 45 small pieces and one rod in a
          ziploc bag. No two pieces should be exactly identical. Please contact
          us at{" "}
          <MailtoLink
            subject={"Missing pieces for Educational Rite of Passage"}
          />{" "}
          if it seems that you are missing pieces.
        </p>
      </>
    );
  }

  return (
    <>
      <p>Please come to the Gala to pick up your copy of this puzzle.</p>
      <p>
        You should receive exactly 45 small pieces and one rod in a ziploc bag.
        No two pieces should be exactly identical. Please contact us at{" "}
        <MailtoLink
          subject={"Missing pieces for Educational Rite of Passage"}
        />{" "}
        if it seems that you are missing pieces.
      </p>
    </>
  );
};

export default Puzzle;
