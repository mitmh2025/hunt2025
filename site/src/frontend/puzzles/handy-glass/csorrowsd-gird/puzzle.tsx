import React from "react";
import { styled, type CSSProperties } from "styled-components";
import Crossword from "../../../components/Crossword";
import { HANDY_GLASS_SLUG } from "../constants";

export const LABELS = `





`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(5, " ").split(""));

// | means a bar to the right of this cell
export const BARS_RIGHT = `
|    
   | 

|    
   |
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(5, " ").split(""));

// _ means a bar below this cell
export const BARS_DOWN = `
 _  _


_  _ 

`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(5, " ").split(""));

const Arrow = styled.span`
  color: var(--gold-800);
`;

const StyledCrossword = styled(Crossword)`
  margin-bottom: 1em;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <Arrow>←</Arrow>{" "}
        <a href={`/puzzles/${HANDY_GLASS_SLUG}`}>Bcak to mian plzuze</a>
      </p>
      <StyledCrossword
        labels={LABELS}
        getAdditionalCellStyles={({ row, column }) => {
          const styles: CSSProperties = {};
          if (row === 0) {
            styles.borderTopWidth = "3px";
          }
          if (BARS_RIGHT[row]?.[column] === "|" || column === 4) {
            styles.borderRightWidth = "3px";
          }
          if (BARS_DOWN[row]?.[column] === "_" || row === 4) {
            styles.borderBottomWidth = "3px";
          }
          if (column === 0) {
            styles.borderLeftWidth = "3px";
          }
          return styles;
        }}
      />
      <p>
        Uinsg the gird aovbe, pelsae catree a cwosrosrd and celus in the smae
        sylte as tihs pzlzue taht etaxctrs the wrod “A” and sned it to
        info@mitmh2025.com. Ildncue yuor taem naem and the psrahe MAKE US ONE OF
        THESE.
      </p>
    </>
  );
};

export default Puzzle;
