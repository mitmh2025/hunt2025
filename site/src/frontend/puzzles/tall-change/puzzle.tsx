import React from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import img01 from "./assets/1.png";
import img02 from "./assets/2.jpg";

const SizedWrapper = styled.div`
  width: 100%;
`;

const TableCell = styled.td<{ highlight: "yellow" | "black" | null }>`
  width: 40px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #000;
  background-color: ${({ highlight }) =>
    highlight === "yellow"
      ? "yellow"
      : highlight === "black"
        ? "black"
        : "white"};
  color: ${({ highlight }) => (highlight === "black" ? "white" : "inherit")};

  &:nth-child(even):not(:nth-child(14)) {
    border-right: 8px solid #000;
  }
`;

const GarmentTable = styled.table`
  border-collapse: collapse;
  margin: 20px auto;
`;

type HighlightedCells = Record<string, "yellow" | "black" | null>;
type TableCellData = {
  row: number;
  col: number;
  highlight: "yellow" | "black" | null;
};

const Puzzle = () => {
  const highlightedCells: HighlightedCells = {
    "4,0": "black",
    "8,0": "yellow",
    "6,2": "black",
    "5,4": "black",
    "7,4": "black",
    "0,5": "yellow",
    "6,5": "black",
    "1,7": "yellow",
    "6,7": "black",
    "7,7": "yellow",
    "1,9": "yellow",
    "4,9": "black",
    "7,9": "yellow",
    "1,11": "yellow",
    "0,12": "yellow",
    "1,12": "yellow",
    "4,12": "black",
    "2,13": "yellow",
    "7,13": "black",
    "2,14": "yellow",
  };

  const generateTableData = (
    rows: number,
    columns: number,
    highlightedCells: HighlightedCells,
  ): TableCellData[][] => {
    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: columns }, (_, colIndex) => ({
        row: rowIndex,
        col: colIndex,
        highlight: highlightedCells[`${rowIndex},${colIndex}`] ?? null,
      })),
    );
  };

  const tableData = generateTableData(15, 15, highlightedCells);

  return (
    <>
      <SizedWrapper>
        <LinkedImage
          className={NO_COPY_CLASS}
          src={img01}
          alt="a picture of a bunch of different dresses on a white background"
        />
      </SizedWrapper>
      <br />

      <SizedWrapper>
        <LinkedImage
          className={NO_COPY_CLASS}
          src={img02}
          alt="a picture of a rack of garment bags with various graphics above them, and columns of empty squares in each bag"
        />
      </SizedWrapper>
      <GarmentTable className={COPY_ONLY_CLASS}>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <TableCell
                  key={colIndex}
                  highlight={cell.highlight}
                ></TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </GarmentTable>
    </>
  );
};

export default Puzzle;
