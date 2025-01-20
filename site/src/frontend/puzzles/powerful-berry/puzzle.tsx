import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { MailtoLink } from "../../components/StyledUI";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.background_check?.gates?.includes("bgg01") ?? false;

  return (
    <>
      {pickupCompleted ? (
        <>
          <p>Our records show you have picked up your copy of this puzzle.</p>
          <p>
            You should have received a very long ribbon with nineteen paper tags
            attached. Please contact us at{" "}
            <MailtoLink subject={"Missing pieces for Celestial Rope"} /> if it
            seems that you are missing pieces.
          </p>
        </>
      ) : (
        <>
          {" "}
          <p>Please come to the Gala to pick up your copy of this puzzle.</p>
          <p>
            You should receive a very long ribbon with nineteen paper tags
            attached. Please contact us at{" "}
            <MailtoLink subject={"Missing pieces for Celestial Rope"} /> if it
            seems that you are missing pieces.
          </p>
        </>
      )}
      <div>
        <div>(1 1 4 9 3)</div>
        <div>(3 4 5 5)</div>
        <div>(7 8 14)</div>
        <div>(8 3)</div>
        <div>(3 6 10 13 6 7)</div>
        <div>(7 15)</div>
        <div>(5 7 6)</div>
        <div>(3 7 5 6 3)</div>
        <div>(10 7)</div>
      </div>
    </>
  );
};

export default Puzzle;
