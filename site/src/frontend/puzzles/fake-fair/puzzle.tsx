import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import Crossword, {
  calculateNumberLabels,
  filterLabelsToStructure,
} from "../../components/Crossword";
import { HScrollTableWrapper } from "../../components/StyledUI";
import {
  BARS_DOWN,
  BARS_RIGHT,
  GRID_1,
  GRID_1_ACROSS,
  GRID_1_DOWN,
  GRID_2,
  GRID_2_ACROSS,
  GRID_2_DOWN,
} from "./data";

const StyledCrossword = styled(Crossword)`
  width: 761px;
`;

const StyledTable = styled.table`
  margin-bottom: 1em;
  td {
    vertical-align: top;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

const FlexChild = styled.div`
  flex: 0 0 360px;
`;

const Puzzle = (): JSX.Element => {
  // Number labels are calculated separately...
  const labels1 = calculateNumberLabels(GRID_1);
  const labels2 = calculateNumberLabels(GRID_2);

  // ...and concatenated, so that we can render two side-by-side
  // grids in the same table, so that the grids copy/paste side by side.
  const concatenatedLabels: string[][] = [];
  for (let i = 0; i < labels1.length; i++) {
    const row = [...(labels1[i] ?? []), "", ...(labels2[i] ?? [])];
    concatenatedLabels.push(row);
  }

  return (
    <>
      <p className="puzzle-flavor">Look at the clues for the missing digits.</p>
      <HScrollTableWrapper>
        <StyledCrossword
          labels={concatenatedLabels}
          labelsForEmptyCopy={filterLabelsToStructure(concatenatedLabels)}
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
            return styles;
          }}
        />
      </HScrollTableWrapper>
      <FlexWrapper>
        <FlexChild>
          <h3>Left</h3>
          <p>
            <strong>Across</strong>
          </p>
          <StyledTable>
            {GRID_1_ACROSS.map(([num, clue]) => (
              <tr key={`grid1-across-${num}`}>
                <td>{`${num}.`}</td>
                <td>{clue}</td>
              </tr>
            ))}
          </StyledTable>
          <p>
            <strong>Down</strong>
          </p>
          <StyledTable>
            {GRID_1_DOWN.map(([num, clue]) => (
              <tr key={`grid1-down-${num}`}>
                <td>{`${num}.`}</td>
                <td>{clue}</td>
              </tr>
            ))}
          </StyledTable>
        </FlexChild>
        <FlexChild>
          <h3>Right</h3>
          <p>
            <strong>Across</strong>
          </p>
          <StyledTable>
            {GRID_2_ACROSS.map(([num, clue]) => (
              <tr key={`grid2-across-${num}`}>
                <td>{`${num}.`}</td>
                <td>{clue}</td>
              </tr>
            ))}
          </StyledTable>
          <p>
            <strong>Down</strong>
          </p>
          <StyledTable>
            {GRID_2_DOWN.map(([num, clue]) => (
              <tr key={`grid2-down-${num}`}>
                <td>{`${num}.`}</td>
                <td>{clue}</td>
              </tr>
            ))}
          </StyledTable>
        </FlexChild>
      </FlexWrapper>
    </>
  );
};

export default Puzzle;
