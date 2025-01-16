import React from "react";
import { styled } from "styled-components";
import type { TeamHuntState } from "../../../../lib/api/client";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import { AuthorsNote } from "../../components/PuzzleLayout";
import { MailtoLink } from "../../components/StyledUI";
import crossDashWord from "./assets/cross-dash-word.pdf";
import { CLUES } from "./data";

const ClueGroup = styled.div`
  margin: 1em 0;
`;

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.murder_in_mitropolis?.gates?.includes("tmg03");

  return (
    <>
      {pickupCompleted ? (
        <>
          <p>Our records show you have picked up your copy of this puzzle.</p>
          <p>
            You should have received thirteen unique precut pieces of cardstock.
            Please contact us at{" "}
            <MailtoLink subject={"Missing pieces for Cross Dash Word"} /> if it
            seems that you are missing pieces.
          </p>
        </>
      ) : (
        <>
          <p>Please come to the Gala to pick up your copy of this puzzle.</p>
          <p>
            You should receive thirteen unique precut pieces of cardstock.
            Please contact us at{" "}
            <MailtoLink subject={"Missing pieces for Cross Dash Word"} /> if it
            seems that you are missing pieces.
          </p>
        </>
      )}
      <AuthorsNote>
        A PDF is linked{" "}
        <a href={crossDashWord} target="_blank" rel="noreferrer">
          here
        </a>{" "}
        if you’d like to produce your own copy (formatted for 11x17, 90lb index
        cardstock, with blue lines as cut lines), but we strongly recommend
        picking up the version that we’ve already printed and cut for you.
      </AuthorsNote>
      {CLUES.map((group, i) => (
        <React.Fragment key={`group-${i}`}>
          <ClueGroup>
            {group.slice(0, 1).map(({ clue }, j) => (
              <div key={`clue-${i}-${j}`}>
                <strong>{clue}</strong>
              </div>
            ))}
            {group.slice(1).map(({ clue }, j) => (
              <div key={`clue-${i}-${j + 1}`}>{clue}</div>
            ))}
          </ClueGroup>
          <br className={COPY_ONLY_CLASS} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Puzzle;
