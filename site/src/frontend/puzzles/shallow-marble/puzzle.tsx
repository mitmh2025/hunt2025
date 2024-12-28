import React from "react";
import { styled } from "styled-components";
import { deviceMax } from "../../utils/breakpoints";
import { DownRightClues, UpClues } from "./data";

const Clues = styled.div`
  display: flex;

  @media ${deviceMax.sm} {
    flex-direction: column;
  }
`;

const ClueGroup = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        What’s up with this crossword? It seems downright annoying.
      </p>

      <p>
        This diagramless crossword features a 15x15 grid with 180-degree
        rotational symmetry. All entries are at least three letters long, and
        all squares are checked. Entry 5 begins in the first square of the
        second row.
      </p>

      <Clues>
        <ClueGroup>
          <h3>???</h3>
          <ol>
            {UpClues.map(([num, clue, _]) => {
              return (
                <li key={num} value={num}>
                  {clue}
                </li>
              );
            })}
          </ol>
        </ClueGroup>

        <ClueGroup>
          <h3>???</h3>
          <ol>
            {DownRightClues.map(([num, clue, _]) => {
              return (
                <li key={num} value={num}>
                  {clue}
                </li>
              );
            })}
          </ol>
        </ClueGroup>
      </Clues>
    </>
  );
};

export default Puzzle;
