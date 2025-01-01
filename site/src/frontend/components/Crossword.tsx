import React, { type ReactNode, type CSSProperties } from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "./CopyToClipboard";

/**
 * Given a list of coordinates and the width of a crossword grid, creates a
 * set of absolute indices corresponding to those coordinates.
 * @param coordinates A list of row,column coordinates.
 * @param width The width of the grid on which to plot the coordinates.
 * @returns The set of absolute indices (i.e. 0,0 = 0, 0,1 = 1, 1,0=width)
 *          represented by the coordinates.
 */
export function reduceCoordinatesToIndices(
  coordinates: { row: number; col: number }[],
  width: number,
): Set<number> {
  return coordinates.reduce<Set<number>>((acc, coords) => {
    acc.add(coords.row * width + coords.col);
    return acc;
  }, new Set<number>());
}

/**
 * Given a labels array, turn everything but "." (black square) into empty string.
 * Intended for use with labelsForEmptyCopy.
 * @param labels The labels to transform
 * @returns The given labels, stripped of all but "."
 */
export function filterLabelsToStructure(labels: string[][]): string[][] {
  return labels.map((row) => row.map((char) => (char === "." ? char : "")));
}

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

const HeaderCell = styled(StyledCell)`
  vertical-align: middle;
  text-align: right;
`;

const FooterCell = styled(StyledCell)`
  vertical-align: middle;
  text-align: left;
`;

const CellLabel = styled.span`
  position: absolute;
  top: 0px;
  left: 2px;
  font-size: 12px;
  .copying & {
    font-size: initial;
  }
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
  .copying & {
    font-size: initial;
  }
`;

type BaseCrosswordProps = {
  /**
   * List of rows of grid structure and labels. For a blank cell, pass empty string.
   * For a black cell, pass "."
   */
  labels: string[][];
  /** List of rows of full-sized cell contents */
  fill?: ReactNode[][];
  /** List of td contents to prepend to the beginnings of rows. Either the number of headers or their rowspans should span the whole table. */
  rowHeaders?: { contents: ReactNode; rowSpan?: number }[];
  /** List of td contents to append to the ends of rows. Either the number of footers or their rowspans should span the whole table. */
  rowFooters?: { contents: ReactNode; rowSpan?: number }[];
  /** A function that applies custom styles to a cell based on the row and column indices */
  getAdditionalCellStyles?: ({
    row,
    column,
  }: {
    row: number;
    column: number;
  }) => CSSProperties;
  /** A function that applies custom styles to a cell's fill based on the row and column indices of that cell */
  getAdditionalCellFillStyles?: ({
    row,
    column,
  }: {
    row: number;
    column: number;
  }) => CSSProperties;
  className?: string;
};

export type CrosswordProps = BaseCrosswordProps & {
  /**
   * Crossword can create an additional blank copy of itself when the copy-paste button is clicked.
   * This is the list of labels that will appear on that copy. In most cases, this should specify
   * black squares only (i.e., an array of arrays of empty strings and ".").
   * Pass null to suppress this behavior.
   */
  labelsForEmptyCopy?: string[][];
};

const CrosswordInner = ({
  labels,
  fill,
  rowHeaders,
  rowFooters,
  className,
  getAdditionalCellStyles,
  getAdditionalCellFillStyles,
}: BaseCrosswordProps): JSX.Element => {
  let headerCounter = 0;
  const rowIndexToHeader: Record<
    number,
    { contents: ReactNode; rowSpan?: number }
  > = {};
  for (const header of rowHeaders ?? []) {
    rowIndexToHeader[headerCounter] = header;
    headerCounter += header.rowSpan ?? 1;
  }

  let footerCounter = 0;
  const rowIndexToFooter: Record<
    number,
    { contents: ReactNode; rowSpan?: number }
  > = {};
  for (const footer of rowFooters ?? []) {
    rowIndexToFooter[footerCounter] = footer;
    footerCounter += footer.rowSpan ?? 1;
  }

  return (
    <Grid className={className}>
      {labels.map((row, i) => (
        <tr key={i}>
          {rowIndexToHeader[i] && (
            <HeaderCell rowSpan={rowIndexToHeader[i]?.rowSpan ?? 1}>
              {rowIndexToHeader[i]?.contents}
            </HeaderCell>
          )}
          {row.map((label, j) => {
            const key = `${i}-${j}`;
            const cellFill = fill?.[i]?.[j];
            if (label === ".") {
              return (
                <FilledCell
                  key={key}
                  style={
                    getAdditionalCellStyles?.({
                      row: i,
                      column: j,
                    }) ?? {}
                  }
                >
                  {cellFill && cellFill !== "." ? (
                    <CellContents
                      style={getAdditionalCellFillStyles?.({
                        row: i,
                        column: j,
                      })}
                    >
                      {cellFill}
                    </CellContents>
                  ) : undefined}
                </FilledCell>
              );
            } else {
              return (
                <StyledCell
                  key={key}
                  style={
                    getAdditionalCellStyles?.({
                      row: i,
                      column: j,
                    }) ?? {}
                  }
                >
                  {label ? <CellLabel>{label}</CellLabel> : undefined}
                  {cellFill ? (
                    <CellContents
                      style={getAdditionalCellFillStyles?.({
                        row: i,
                        column: j,
                      })}
                    >
                      {cellFill}
                    </CellContents>
                  ) : undefined}
                </StyledCell>
              );
            }
          })}
          {rowIndexToFooter[i] && (
            <FooterCell rowSpan={rowIndexToFooter[i]?.rowSpan ?? 1}>
              {rowIndexToFooter[i]?.contents}
            </FooterCell>
          )}
        </tr>
      ))}
    </Grid>
  );
};

const Crossword = ({
  labels,
  fill,
  labelsForEmptyCopy,
  rowHeaders,
  rowFooters,
  className,
  getAdditionalCellStyles,
  getAdditionalCellFillStyles,
}: CrosswordProps): JSX.Element => {
  return (
    <>
      <CrosswordInner
        labels={labels}
        fill={fill}
        rowHeaders={rowHeaders}
        rowFooters={rowFooters}
        className={className}
        getAdditionalCellStyles={getAdditionalCellStyles}
        getAdditionalCellFillStyles={getAdditionalCellFillStyles}
      />
      {labelsForEmptyCopy && (
        <>
          <br className={COPY_ONLY_CLASS} />
          <CrosswordInner
            labels={labelsForEmptyCopy}
            rowHeaders={rowHeaders}
            rowFooters={rowFooters}
            className={`${className ? className : ""} ${COPY_ONLY_CLASS}`}
            getAdditionalCellStyles={getAdditionalCellStyles}
            getAdditionalCellFillStyles={getAdditionalCellFillStyles}
          />
        </>
      )}
    </>
  );
};

export default Crossword;
