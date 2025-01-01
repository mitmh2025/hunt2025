import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import Crossword, { calculateNumberLabels } from "../../components/Crossword";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import {
  BARS_1_DOWN,
  BARS_1_RIGHT,
  BARS_2_DOWN,
  BARS_2_RIGHT,
  BLUE_HIGHLIGHTS_1,
  BLUE_HIGHLIGHTS_2,
  FILL_1,
  FILL_2,
  GRID_1,
  GRID_2,
  RED_HIGHLIGHTS_1,
  RED_HIGHLIGHTS_2,
  SOLUTION_TABLE,
  YELLOW_HIGHLIGHTS_1,
  YELLOW_HIGHLIGHTS_2,
} from "./data";
import { FlexWrapper } from "./puzzle";

const StyledTable = styled.table`
  margin: 1em 0;
`;

const Solution = (): JSX.Element => {
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
      <FlexWrapper>
        <Crossword
          labels={calculateNumberLabels(GRID_1)}
          fill={FILL_1}
          getAdditionalCellStyles={({ row, column }) => {
            const styles: CSSProperties = {};
            if (BARS_1_RIGHT?.[row]?.[column] === "|") {
              styles.borderRightWidth = "3px";
            }
            if (BARS_1_DOWN?.[row]?.[column] === "_") {
              styles.borderBottomWidth = "3px";
            }
            const index = row * 9 + column;
            if (YELLOW_HIGHLIGHTS_1.has(index)) {
              styles.backgroundColor = "#ffff00";
            } else if (BLUE_HIGHLIGHTS_1.has(index)) {
              styles.backgroundColor = "#00ffff";
            } else if (RED_HIGHLIGHTS_1.has(index)) {
              styles.backgroundColor = "#ff0000";
            }
            return styles;
          }}
        />
        <Crossword
          labels={calculateNumberLabels(GRID_2)}
          fill={FILL_2}
          getAdditionalCellStyles={({ row, column }) => {
            const styles: CSSProperties = {};
            if (BARS_2_RIGHT?.[row]?.[column] === "|") {
              styles.borderRightWidth = "3px";
            }
            if (BARS_2_DOWN?.[row]?.[column] === "_") {
              styles.borderBottomWidth = "3px";
            }
            const index = row * 9 + column;
            if (YELLOW_HIGHLIGHTS_2.has(index)) {
              styles.backgroundColor = "#ffff00";
            } else if (BLUE_HIGHLIGHTS_2.has(index)) {
              styles.backgroundColor = "#00ffff";
            } else if (RED_HIGHLIGHTS_2.has(index)) {
              styles.backgroundColor = "#ff0000";
            }
            return styles;
          }}
        />
      </FlexWrapper>
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
