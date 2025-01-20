import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { ArchivalNotice } from "../../components/PuzzleLayout";
import { Errata, MailtoLink } from "../../components/StyledUI";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.illegal_search?.gates?.includes("isg33") ?? false;

  return (
    <>
      <Errata
        errata={[
          {
            timestamp: "January 17th, at 9:45 PM",
            message:
              "In the Stonemason, the string “Neighbors” should instead have been spelled “Neighbours”. We are not able to correct the physical objects.",
          },
        ]}
      />
      <ArchivalNotice />
      {pickupCompleted ? (
        <>
          <p>Our records show you have picked up your copy of this puzzle.</p>
          <p>
            You should have received a paper box containing thirteen paper
            objects. Please contact us at{" "}
            <MailtoLink
              subject={"Missing pieces for Smoke ’Em If You’ve Got ’Em"}
            />{" "}
            if it seems that you are missing pieces.
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
            Please contact us at{" "}
            <MailtoLink
              subject={"Missing pieces for Smoke ’Em If You’ve Got ’Em"}
            />{" "}
            if it seems that you are missing pieces.
          </p>
        </>
      )}
    </>
  );
};

export default Puzzle;
