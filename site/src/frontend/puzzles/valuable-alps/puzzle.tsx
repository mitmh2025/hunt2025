import React from "react";
import { styled } from "styled-components";
import type { TeamHuntState } from "../../../../lib/api/client";
import { CLUES } from "./data";

const ClueGroup = styled.div`
  margin: 1em 0;
`;

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.murder_in_mitropolis?.gates?.includes("tmg01");

  return (
    <>
      {pickupCompleted ? (
        <>
          <p>Our records show you have picked up your copy of this puzzle.</p>
          <p>
            You should have received thirteen unique precut pieces of cardstock.
          </p>
        </>
      ) : (
        <>
          <p>Please come to the Gala to pick up your copy of this puzzle.</p>
          <p>You should receive thirteen unique precut pieces of cardstock.</p>
        </>
      )}
      {CLUES.map((group, i) => (
        <ClueGroup key={`group-${i}`}>
          {group.slice(0, 1).map(({ clue }, j) => (
            <div key={`clue-${i}-${j}`}>
              <strong>{clue}</strong>
            </div>
          ))}
          {group.slice(1).map(({ clue }, j) => (
            <div key={`clue-${i}-${j + 1}`}>{clue}</div>
          ))}
        </ClueGroup>
      ))}
    </>
  );
};

export default Puzzle;
