import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import Crossword, {
  reduceCoordinatesToIndices,
} from "../../components/Crossword";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import { BARS_DOWN, BARS_RIGHT, LABELS } from "./puzzle";

const FILL = `
LFETCLAFUNLA
SBMAAPTOWSAR
EOTERAALKNEL
SAIMLDEROITT
PYONUPIANCSE
CUOLTFANNOTA
ISNRUERNNOOE
SIEFLELGHITS
THSITRYEVTEO
RCAELRRIALHH
OSETISATEERS
ATRSEDNSLSIA
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const HIGHLIGHTS = reduceCoordinatesToIndices(
  [
    { row: 1, col: 2 },
    { row: 1, col: 10 },
    { row: 2, col: 8 },
    { row: 3, col: 6 },
    { row: 4, col: 4 },
    { row: 4, col: 10 },
    { row: 5, col: 2 },
    { row: 5, col: 7 },
    { row: 6, col: 5 },
    { row: 6, col: 9 },
    { row: 7, col: 3 },
    { row: 7, col: 10 },
    { row: 8, col: 1 },
    { row: 9, col: 3 },
    { row: 10, col: 1 },
    { row: 10, col: 9 },
  ],
  12,
);

const Indent = styled.p`
  margin-left: 2em;
`;

const StyledCrossword = styled(Crossword)`
  margin-bottom: 1em;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>This crossword references the “jumbled letters” meme:</p>
      <Indent>
        <i>
          Aoccdrnig to rscheearch at Cmabrigde uinervtisy, it deosn’t mttaer
          waht oredr the ltteers in a wrod are, the olny iprmoetnt tihng is taht
          the frist and lsat ltteres are at the rghit pclae. The rset can be a
          tatol mses and you can sitll raed it wouthit a porbelm. Tihs is
          bcuseae we do not raed ervey lteter by it slef but the wrod as a
          wlohe.
        </i>
      </Indent>
      <p>
        In this barred crossword, each clue is presented in this shuffled
        manner, and the clue answers must be entered into the grid in the same
        way (i.e., first and last letters are in the right place, letters in the
        middle are jumbled).
      </p>
      <p>
        Some middle letters end up in the right spots even after jumbling, and
        notably these letters are in the correct spots in both the across and
        down words that they are in. Extract those letters in grid order to read
        the message <Mono>MAKE US ONE OF THESE</Mono>. Upon submitting that,
        teams need to make a crossword puzzle in the same vein in order to get
        the answer to the puzzle, <PuzzleAnswer>[PLACEHOLDER]</PuzzleAnswer>.
      </p>
      <p>The filled in grid and clue answers are provided below:</p>
      <StyledCrossword
        labels={LABELS}
        fill={FILL}
        getAdditionalCellStyles={({ row, column }) => {
          const styles: CSSProperties = {};
          if (row === 0) {
            styles.borderTopWidth = "3px";
          }
          if (BARS_RIGHT?.[row]?.[column] === "|" || column === 11) {
            styles.borderRightWidth = "3px";
          }
          if (BARS_DOWN?.[row]?.[column] === "_" || row === 11) {
            styles.borderBottomWidth = "3px";
          }
          if (column === 0) {
            styles.borderLeftWidth = "3px";
          }
          if (HIGHLIGHTS.has(row * 12 + column)) {
            styles.backgroundColor = "#ffff00";
          }
          return styles;
        }}
      />
    </>
  );
};

export default Solution;
