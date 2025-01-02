import React from "react";
import { type CSSProperties, styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import Crossword from "../../components/Crossword";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNote } from "../../components/PuzzleLayout";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import {
  ACROSS,
  type Color,
  COLOR_TO_HEX,
  CORN_MAZES,
  type CornMaze,
  DOWN,
} from "./data";

const SizedImage = styled(LinkedImage)<{ $width: number }>`
  display: block;
  margin: auto;
  width: ${({ $width }) => $width}%;
`;

const StyledTable = styled.table`
  margin-bottom: 1em;
  border-spacing: 8px;
  td {
    vertical-align: top;
  }
`;

export const CopyableCornMaze = ({
  className = "",
  cornMaze,
  puzzleMode,
}: {
  className?: string;
  cornMaze: CornMaze;
  puzzleMode: boolean;
}): JSX.Element => {
  const grid = cornMaze.grid
    // Break into rows...
    .split("\n")
    // ...but get rid of the empty first and last rows from having the backticks on their own lines
    .slice(1, -1)
    .map((row) => row.split(""));
  // Same deal for fill
  const fillToPick = cornMaze.fill
    .split("\n")
    .slice(1, -1)
    .map((row) => row.split(""));
  // Same deal for color
  const color = cornMaze.color
    .split("\n")
    .slice(1, -1)
    .map((row) => row.split(""));
  let counter = cornMaze.startsAt;
  const wallIndices = new Set<number>();
  const scarecrowIndices = new Set<number>();
  const holeIndices = new Set<number>();
  const labels: string[][] = [];
  const labelsForEmptyCopy: string[][] = [];
  const fill: string[][] = [];
  for (const [i, row] of grid.entries()) {
    const labelsRow: string[] = [];
    const labelsForEmptyCopyRow: string[] = [];
    const fillRow: string[] = [];
    for (const [j, char] of row.entries()) {
      const index = i * cornMaze.width + j;
      let cellFill = "";
      if (!puzzleMode || cornMaze.pickFillIndices.has(index)) {
        cellFill = fillToPick?.[i]?.[j] ?? "";
      }
      if (char === "x") {
        wallIndices.add(index);
        const label =
          !puzzleMode && ["^", ">", "v", "<"].includes(cellFill)
            ? `e${cellFill}`
            : "";
        labelsRow.push(puzzleMode ? label : "");
        labelsForEmptyCopyRow.push(puzzleMode ? label : "");
        fillRow.push(puzzleMode ? "" : label);
      } else if (char === "s") {
        scarecrowIndices.add(index);
        labelsRow.push(puzzleMode ? "sc" : "");
        labelsForEmptyCopyRow.push("sc");
        fillRow.push(puzzleMode ? "" : "sc");
      } else if (char === "o") {
        holeIndices.add(index);
        labelsRow.push(puzzleMode ? "o" : "");
        labelsForEmptyCopyRow.push(puzzleMode ? "o" : "");
        fillRow.push(puzzleMode ? "" : cellFill);
      } else if (char === "#") {
        labelsRow.push(`${counter}`);
        labelsForEmptyCopyRow.push("");
        fillRow.push(cellFill);
        counter++;
      } else {
        labelsRow.push("");
        labelsForEmptyCopyRow.push("");
        fillRow.push(cellFill);
      }
    }
    labels.push(labelsRow);
    labelsForEmptyCopy.push(labelsForEmptyCopyRow);
    fill.push(fillRow);
  }
  return (
    <Crossword
      className={puzzleMode ? `${COPY_ONLY_CLASS} ${className}` : className}
      labels={labels}
      fill={fill}
      {...(puzzleMode ? { labelsForEmptyCopy } : {})}
      getAdditionalCellStyles={({ row, column }) => {
        const index = row * cornMaze.width + column;
        const styles: CSSProperties = {};
        let backgroundColor = null;
        if (!puzzleMode) {
          const shorthand = color?.[row]?.[column] ?? null;
          if (shorthand) {
            backgroundColor = COLOR_TO_HEX[shorthand as Color];
          }
        }
        if (cornMaze.outlineIndices.has(index)) {
          styles.border = "3px solid black";
          if (!puzzleMode) {
            styles.backgroundColor = backgroundColor ?? "#cccccc";
          }
        } else if (cornMaze.goldIndices.has(index)) {
          styles.backgroundColor = backgroundColor ?? "#f1c232";
        } else if (wallIndices.has(index)) {
          styles.color = "white";
          if (
            row === 0 ||
            column === 0 ||
            row === grid.length - 1 ||
            column === cornMaze.width - 1
          ) {
            styles.backgroundColor = backgroundColor ?? "#274e13";
          } else {
            styles.backgroundColor = backgroundColor ?? "#4f742d";
          }
        } else if (scarecrowIndices.has(index)) {
          styles.color = "white";
          styles.backgroundColor = "black";
        } else if (holeIndices.has(index)) {
          if (puzzleMode) {
            styles.color = "red";
          } else {
            styles.border = "3px solid black";
          }
          styles.backgroundColor =
            backgroundColor ?? (puzzleMode ? "#b6d7a8" : "#cccccc");
        } else if (backgroundColor) {
          styles.backgroundColor = backgroundColor;
        }
        return styles;
      }}
    />
  );
};

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        Ugh, a corn maze. It’s fine, you’ll just take the shortest possible path
        and get this over with. You’ll be ok as long as you don’t walk next to
        any scary scarecrows. The farmer tries to give you a hint that sounds
        like “whirred pears” (did you hear that correctly?), but it goes in one
        ear and out…somewhere. You see some interesting tidbits in the
        hedge—maybe you’ll gather a few on your way out.
      </p>
      <AuthorsNote>
        Each clue belongs to one grid and clues with the same number are given
        in random order.
      </AuthorsNote>
      <SizedImage
        $width={100}
        className={NO_COPY_CLASS}
        src={image1}
        alt="A crossword grid, stylized to appear like a corn maze"
      />
      <SizedImage
        $width={(23 / 29) * 100}
        className={NO_COPY_CLASS}
        src={image2}
        alt="A crossword grid, stylized to appear like a corn maze"
      />
      <SizedImage
        $width={(23 / 29) * 100}
        className={NO_COPY_CLASS}
        src={image3}
        alt="A crossword grid, stylized to appear like a corn maze"
      />
      <SizedImage
        $width={(23 / 29) * 100}
        className={NO_COPY_CLASS}
        src={image4}
        alt="A crossword grid, stylized to appear like a corn maze"
      />
      <SizedImage
        $width={(23 / 29) * 100}
        className={NO_COPY_CLASS}
        src={image5}
        alt="A crossword grid, stylized to appear like a corn maze"
      />
      {CORN_MAZES.map((cornMaze, i) => (
        <React.Fragment key={i}>
          <CopyableCornMaze cornMaze={cornMaze} puzzleMode={true} />
          <br className={COPY_ONLY_CLASS} />
        </React.Fragment>
      ))}
      <p>
        <strong>Across</strong>
      </p>
      <StyledTable>
        {ACROSS.map(({ number, clues }) =>
          clues.map((clue, i) => (
            <tr key={`across-${number}-${i}`}>
              {i === 0 && <td rowSpan={clues.length}>{number}</td>}
              <td>{clue}</td>
            </tr>
          )),
        )}
      </StyledTable>
      <p>
        <strong>Down</strong>
      </p>
      <StyledTable>
        {DOWN.map(({ number, clues }) =>
          clues.map((clue, i) => (
            <tr key={`down-${number}-${i}`}>
              {i === 0 && <td rowSpan={clues.length}>{number}</td>}
              <td>{clue}</td>
            </tr>
          )),
        )}
      </StyledTable>
    </>
  );
};

export default Puzzle;
