import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { MailtoLink } from "../../components/StyledUI";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.murder_in_mitropolis?.gates?.includes("tmg04");

  return (
    <>
      {pickupCompleted ? (
        <>
          <p>Our records show you have picked up your copy of this puzzle.</p>
          <p>
            You should have received a sealed envelope containing 116 pieces of
            paper and 40 magnets. (Any pieces of paper with nothing but a large
            X on both sides were included by mistake, are not part of the puzzle
            (including counting towards the 116 pieces), and should be
            discarded.) Please contact us at{" "}
            <MailtoLink
              subject={
                "Missing pieces for abstract art and poems / concerning a pale blue dot / and many more friends"
              }
            />{" "}
            if it seems that you are missing pieces.
          </p>
        </>
      ) : (
        <>
          <p>Please come to the Gala to pick up your copy of this puzzle.</p>
          <p>
            You should receive a sealed envelope containing 116 pieces of paper
            and 40 magnets. (Any pieces of paper with nothing but a large X on
            both sides were included by mistake, are not part of the puzzle
            (including counting towards the 116 pieces), and should be
            discarded.) Please contact us at{" "}
            <MailtoLink
              subject={
                "Missing pieces for abstract art and poems / concerning a pale blue dot / and many more friends"
              }
            />{" "}
            if it seems that you are missing pieces.
          </p>
        </>
      )}
    </>
  );
};

export default Puzzle;
