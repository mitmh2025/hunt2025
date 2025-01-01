import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import Crossword, { calculateNumberLabels } from "../../components/Crossword";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import {
  BARS_DOWN,
  BARS_RIGHT,
  BLUE_HIGHLIGHTS,
  FILL,
  GRID_1,
  GRID_2,
  RED_HIGHLIGHTS,
  SOLUTION_TABLE,
  YELLOW_HIGHLIGHTS,
} from "./data";

const StyledTable = styled.table`
  margin: 1em 0;
`;

const Solution = (): JSX.Element => {
  const labels1 = calculateNumberLabels(GRID_1);
  const labels2 = calculateNumberLabels(GRID_2);
  const concatenatedLabels: string[][] = [];
  for (let i = 0; i < labels1.length; i++) {
    const row = [...(labels1[i] ?? []), "", ...(labels2[i] ?? [])];
    concatenatedLabels.push(row);
  }

  return (
    <>
      <p>
        The two grids are abstract representations of a left and right hand with
        palms upturned. Five Down clues in each hand refer to the names of the
        fingers: (THUMB) TACKS, (INDEX) CASE, (MIDDLE) CLASS, and so on. The
        first letters of the clues for these entries spell out{" "}
        <Mono>CHIROMANCY</Mono> left to right, when put in grid order, which is
        another word for palm reading. The flavor “Look at the clues for the
        missing digits” is intended to point to this.
      </p>
      <p>
        In each grid, the solver will see the four palm lines (HEART, HEAD,
        LIFE, FATE) spelled out in the grid, each with one letter added in the
        middle. Each line appears in approximately the position and orientation
        that these lines would be on a hand. The palm line words are read in
        right to left order in the right-hand grid. Reading the extra letters in
        each grid left to right and top to bottom, these spell <Mono>PALM</Mono>{" "}
        (left grid) and <Mono>TREE</Mono> (right grid), forming the answer,{" "}
        <PuzzleAnswer>PALM TREE</PuzzleAnswer>.
      </p>
      <Crossword
        labels={concatenatedLabels}
        fill={FILL}
        getAdditionalCellStyles={({ row, column }) => {
          const styles: CSSProperties = {};
          if (column === 9) {
            // Spacer column.
            styles.backgroundColor = "transparent";
            styles.border = "none";
          }
          if (BARS_RIGHT?.[row]?.[column] === "|") {
            styles.borderRightWidth = "3px";
          }
          if (BARS_DOWN?.[row]?.[column] === "_") {
            styles.borderBottomWidth = "3px";
          }
          const index = row * 19 + column;
          if (YELLOW_HIGHLIGHTS.has(index)) {
            styles.backgroundColor = "#ffff00";
          } else if (BLUE_HIGHLIGHTS.has(index)) {
            styles.backgroundColor = "#00ffff";
          } else if (RED_HIGHLIGHTS.has(index)) {
            styles.backgroundColor = "#ff0000";
          }
          return styles;
        }}
      />
      <StyledTable>
        <tr>
          <th>Digit (L to R in grid order)</th>
          <th>Starred clue entries (L to R)</th>
          <th>Starred clue (L to R)</th>
        </tr>
        {SOLUTION_TABLE.map(([digit, starredEntry, starredClue], i) => (
          <tr key={i}>
            <td>{digit}</td>
            <td>{starredEntry}</td>
            <td>
              <strong>{starredClue.slice(0, 1)}</strong>
              {starredClue.slice(1)}
            </td>
          </tr>
        ))}
      </StyledTable>
    </>
  );
};

export default Solution;
