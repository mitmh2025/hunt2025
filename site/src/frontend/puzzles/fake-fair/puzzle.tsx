import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import Crossword, {
  calculateNumberLabels,
  filterLabelsToStructure,
} from "../../components/Crossword";
import {
  BARS_1_DOWN,
  BARS_1_RIGHT,
  BARS_2_DOWN,
  BARS_2_RIGHT,
  GRID_1,
  GRID_1_ACROSS,
  GRID_1_DOWN,
  GRID_2,
  GRID_2_ACROSS,
  GRID_2_DOWN,
} from "./data";

export const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Puzzle = (): JSX.Element => {
  const labels1 = calculateNumberLabels(GRID_1);
  const labels2 = calculateNumberLabels(GRID_2);
  return (
    <>
      <p className="puzzle-flavor">Look at the clues for the missing digits.</p>
      <FlexWrapper>
        <Crossword
          labels={labels1}
          labelsForEmptyCopy={filterLabelsToStructure(labels1)}
          getAdditionalCellStyles={({ row, column }) => {
            const styles: CSSProperties = {};
            if (BARS_1_RIGHT?.[row]?.[column] === "|") {
              styles.borderRightWidth = "3px";
            }
            if (BARS_1_DOWN?.[row]?.[column] === "_") {
              styles.borderBottomWidth = "3px";
            }
            return styles;
          }}
        />
        <Crossword
          labels={labels2}
          labelsForEmptyCopy={filterLabelsToStructure(labels2)}
          getAdditionalCellStyles={({ row, column }) => {
            const styles: CSSProperties = {};
            if (BARS_2_RIGHT?.[row]?.[column] === "|") {
              styles.borderRightWidth = "3px";
            }
            if (BARS_2_DOWN?.[row]?.[column] === "_") {
              styles.borderBottomWidth = "3px";
            }
            return styles;
          }}
        />
      </FlexWrapper>
      <h3>Left</h3>
      <p>
        <strong>Across</strong>
      </p>
      <table>
        {GRID_1_ACROSS.map(([num, clue]) => (
          <tr key={`grid1-across-${num}`}>
            <td>{`${num}.`}</td>
            <td>{clue}</td>
          </tr>
        ))}
      </table>
      <p>
        <strong>Down</strong>
      </p>
      <table>
        {GRID_1_DOWN.map(([num, clue]) => (
          <tr key={`grid1-down-${num}`}>
            <td>{`${num}.`}</td>
            <td>{clue}</td>
          </tr>
        ))}
      </table>
      <h3>Right</h3>
      <p>
        <strong>Across</strong>
      </p>
      <table>
        {GRID_2_ACROSS.map(([num, clue]) => (
          <tr key={`grid2-across-${num}`}>
            <td>{`${num}.`}</td>
            <td>{clue}</td>
          </tr>
        ))}
      </table>
      <p>
        <strong>Down</strong>
      </p>
      <table>
        {GRID_2_DOWN.map(([num, clue]) => (
          <tr key={`grid2-down-${num}`}>
            <td>{`${num}.`}</td>
            <td>{clue}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Puzzle;
