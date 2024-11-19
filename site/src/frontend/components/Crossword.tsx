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
  text-align: left;
  vertical-align: top;
  position: relative;
`;

const FilledCell = styled(StyledCell)`
  background-color: black;
  color: white;
  width: 40px;
  height: 40px;
`;

const CellLabel = styled.span`
  position: absolute;
  top: 0px;
  left: 2px;
  font-size: 12px;
`;

const CellContents = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  top: 4px;
  bottom: 0;
  text-align: center;
  vertical-align: middle;
  font-size: 24px;
`;

type CrosswordProps = {
  /** List of rows of grid structure and labels. For a blank cell, pass empty string. For a black cell, pass "." */
  labels: string[][];
  /** List of rows of full-sized cell contents */
  fill?: string[][];
  /** A function that applies custom styles based on the row and column indices of a cell */
  getAdditionalStyles?: (row: number, column: number) => CSSProperties;
  className?: string;
};

const Crossword = ({
  labels,
  fill,
  className,
  getAdditionalStyles,
}: CrosswordProps): JSX.Element => {
  return (
    <Grid className={className}>
      {labels.map((row, i) => (
        <tr key={i}>
          {row.map((label, j) => {
            const key = `${i}-${j}`;
            const cellFill = fill?.[i]?.[j];
            if (label === ".") {
              return (
                <FilledCell key={key} style={getAdditionalStyles?.(i, j) ?? {}}>
                  {cellFill && cellFill !== "." ? (
                    <CellContents>{cellFill}</CellContents>
                  ) : undefined}
                </FilledCell>
              );
            } else {
              return (
                <StyledCell key={key} style={getAdditionalStyles?.(i, j) ?? {}}>
                  {label ? <CellLabel>{label}</CellLabel> : undefined}
                  {cellFill ? (
                    <CellContents>{cellFill}</CellContents>
                  ) : undefined}
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
