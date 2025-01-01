import React from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import Crossword from "../../components/Crossword";
import LinkedImage from "../../components/LinkedImage";
import puzzle from "./assets/puzzle.png";
import {
  ACROSS,
  COLOR,
  DOWN,
  FOOTERS,
  GRID,
  HEADERS,
  HIGHLIGHTED,
} from "./data";

const StyledTable = styled.table`
  margin: 1em 0;
`;

const Puzzle = (): JSX.Element => {
  let counter = 1;
  const labels: string[][] = [];
  for (const row of GRID) {
    const labelRow: string[] = [];
    for (const char of row) {
      if (char === "#") {
        labelRow.push(`${counter}`);
        counter++;
      } else if (char === " ") {
        labelRow.push("");
      } else {
        labelRow.push(char);
      }
    }
    labels.push(labelRow);
  }

  return (
    <>
      <p className="puzzle-flavor">
        Everyone starts out lost, but we find our way in our own time.
      </p>
      <LinkedImage
        className={NO_COPY_CLASS}
        src={puzzle}
        alt="A crossword puzzle with some cells highlighted in blue."
      />
      <Crossword
        className={COPY_ONLY_CLASS}
        labels={labels}
        rowHeaders={HEADERS}
        rowFooters={FOOTERS}
        getAdditionalCellStyles={({ row, column }) => {
          const backgroundColor = COLOR?.[row]?.[column] ?? "";
          if (backgroundColor && backgroundColor === ".") {
            return {
              backgroundColor: "#c9daf8",
            };
          }
          return {};
        }}
      />
      <p>
        <strong>Across</strong>
      </p>
      <StyledTable>
        {ACROSS.map(([num, clue]) => (
          <tr key={`across-${num}`}>
            <td>{num}</td>
            <td>{clue}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        <strong>Down</strong>
      </p>
      <StyledTable>
        {DOWN.map(([num, clue]) => (
          <tr key={`down-${num}`}>
            <td>{num}</td>
            <td>{clue}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        <strong>Highlighted</strong>
      </p>
      <StyledTable>
        {HIGHLIGHTED.map(([letter, clue]) => (
          <tr key={`highlighted-${letter}`}>
            <td>{letter}</td>
            <td>{clue}</td>
          </tr>
        ))}
      </StyledTable>
    </>
  );
};

export default Puzzle;
