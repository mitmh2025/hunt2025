import React from "react";
import { styled } from "styled-components";
import Crossword from "../../components/Crossword";
import { AuthorsNote } from "../../components/PuzzleLayout";

const GRID = `
______
______
______
______
______
______
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split("").map((_) => " "));

const FlexWrapper = styled.div`
  display: flex;
  margin-bottom: 1em;
  gap: 16px;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <AuthorsNote>
        Note: Each square contains one letter (which may be any letter). There
        is no double-letter cube.
      </AuthorsNote>
      <FlexWrapper>
        <div>
          <div>
            <h4>Regular words</h4>
          </div>
          <div>Bit of scat? [1 pt]</div>
          <div>Zebra or donkey [2 pts]</div>
          <div>Grow dim [1 pt]</div>
          <div>In an ongoing quarrel [5 pts]</div>
          <div>Self-defense martial art [1 pt]</div>
          <div>___ up (pay) [1 pt]</div>
          <div>Bun, for example [1 pt]</div>
          <div>Inoculate, slangily [1 pt]</div>
          <div>Competing (for) [2 pts]</div>
        </div>
        <div>
          <div>
            <h4>Super Big words</h4>
          </div>
          <div>Make a start [2 pts]</div>
          <div>Empty [2 pts]</div>
          <div>Police raid [1 pt]</div>
          <div>Neologism [5 pts]</div>
          <div>Gala [1 pt]</div>
          <div>Crackpot [1 pt]</div>
          <div>Strand, or a color [3 pts]</div>
          <div>Palm protector [1 pt]</div>
          <div>Vegetable in Southern cuisine [1 pt]</div>
          <div>Covered with small scars [20 pts]</div>
          <div>Extravagant [11 pts]</div>
          <div>“Ika” on some menus [2 pts]</div>
          <div>Spirited mount [2 pts]</div>
          <div>Church obligation [2 pts]</div>
        </div>
      </FlexWrapper>
      <Crossword
        labels={GRID}
        getAdditionalCellStyles={({ row, column }) => {
          const isInnerRow = row > 0 && row < 5;
          const isInnerColumn = column > 0 && column < 5;
          if (isInnerRow && isInnerColumn) {
            return { backgroundColor: "#cccccc" };
          } else {
            return {};
          }
        }}
      />
    </>
  );
};

export default Puzzle;
