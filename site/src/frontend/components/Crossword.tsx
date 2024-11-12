import React, { type CSSProperties } from "react";
import { styled } from "styled-components";

const Grid = styled.table`
  border-collapse: collapse;
  td {
    border: 1px solid black;
  }
`;

const StyledCell = styled.td`
  background-color: white;
  padding: 4px;
  width: 40px;
  height: 40px;
  vertical-align: top;
`;

const FilledCell = styled.td`
  background-color: black;
  width: 40px;
  height: 40px;
`;

type CrosswordProps = {
  /** List of rows of grid contents. For a blank cell, pass empty string. For a black cell, pass "." */
  grid: string[][];
  /** A function that applies custom styles based on the row and column indices of a cell */
  getAdditionalStyles?: (row: number, column: number) => CSSProperties;
  className?: string;
};

const Crossword = ({
  grid,
  className,
  getAdditionalStyles,
}: CrosswordProps): JSX.Element => {
  return (
    <Grid className={className}>
      {grid.map((row, i) => (
        <tr key={i}>
          {row.map((cell, j) => {
            const key = `${i}-${j}`;
            if (cell === ".") {
              return (
                <FilledCell
                  key={key}
                  style={getAdditionalStyles?.(i, j) ?? {}}
                />
              );
            } else {
              return (
                <StyledCell key={key} style={getAdditionalStyles?.(i, j) ?? {}}>
                  {cell}
                </StyledCell>
              );
            }
          })}
        </tr>
      ))}
    </Grid>
  );
};

export default Crossword;
