import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import { reduceCoordinatesToIndices } from "../../components/Crossword";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import { GRID, WordSearch } from "./puzzle";

const BIRDS: [string, string][] = [
  ["Ichabod", "Crane"],
  ["Clarice", "Starling"],
  ["Christopher", "Robin"],
  ["Jack", "Sparrow"],
  ["Florence", "Nightingale"],
  ["Emma", "Swan"],
  ["Taylor", "Swift"],
  ["Sheryl", "Crow"],
  ["Sigourney", "Weaver"],
  ["Tony", "Hawk"],
  ["David", "Canary"],
  ["Ricky", "Martin"],
];

const PINK_HIGHLIGHT_INDICES = reduceCoordinatesToIndices(
  [
    { row: 1, col: 3 },
    { row: 1, col: 4 },
    { row: 1, col: 5 },
    { row: 1, col: 6 },
    { row: 2, col: 2 },
    { row: 2, col: 7 },
    { row: 3, col: 1 },
    { row: 3, col: 4 },
    { row: 3, col: 5 },
    { row: 3, col: 8 },
    { row: 4, col: 1 },
    { row: 4, col: 3 },
    { row: 4, col: 6 },
    { row: 4, col: 8 },
    { row: 5, col: 2 },
    { row: 5, col: 6 },
    { row: 5, col: 8 },
    { row: 6, col: 2 },
    { row: 6, col: 5 },
    { row: 6, col: 8 },
    { row: 7, col: 4 },
    { row: 7, col: 7 },
    { row: 8, col: 4 },
    { row: 8, col: 6 },
    { row: 9, col: 4 },
    { row: 9, col: 7 },
    { row: 9, col: 9 },
    { row: 9, col: 10 },
    { row: 9, col: 11 },
    { row: 9, col: 12 },
    { row: 10, col: 5 },
    { row: 10, col: 7 },
    { row: 10, col: 8 },
    { row: 10, col: 13 },
    { row: 10, col: 14 },
    { row: 11, col: 4 },
    { row: 11, col: 15 },
    { row: 12, col: 3 },
    { row: 12, col: 16 },
    { row: 13, col: 3 },
    { row: 13, col: 17 },
    { row: 14, col: 4 },
    { row: 14, col: 15 },
    { row: 14, col: 16 },
    { row: 15, col: 5 },
    { row: 15, col: 6 },
    { row: 15, col: 13 },
    { row: 15, col: 14 },
    { row: 16, col: 7 },
    { row: 16, col: 8 },
    { row: 16, col: 10 },
    { row: 16, col: 11 },
    { row: 16, col: 12 },
    { row: 17, col: 9 },
    { row: 18, col: 9 },
    { row: 19, col: 9 },
    { row: 19, col: 10 },
    { row: 20, col: 9 },
    { row: 20, col: 11 },
    { row: 21, col: 9 },
    { row: 21, col: 12 },
    { row: 22, col: 9 },
    { row: 22, col: 11 },
    { row: 23, col: 9 },
    { row: 23, col: 10 },
    { row: 24, col: 9 },
    { row: 25, col: 8 },
    { row: 25, col: 9 },
    { row: 26, col: 7 },
    { row: 26, col: 9 },
    { row: 27, col: 6 },
    { row: 27, col: 9 },
    { row: 28, col: 9 },
    { row: 29, col: 9 },
    { row: 30, col: 8 },
    { row: 30, col: 9 },
  ],
  19,
);
const YELLOW_HIGHLIGHT_INDICES = reduceCoordinatesToIndices(
  [
    { row: 0, col: 6 },
    { row: 1, col: 2 },
    { row: 1, col: 13 },
    { row: 2, col: 3 },
    { row: 2, col: 4 },
    { row: 2, col: 12 },
    { row: 3, col: 3 },
    { row: 3, col: 11 },
    { row: 4, col: 2 },
    { row: 4, col: 5 },
    { row: 4, col: 10 },
    { row: 5, col: 9 },
    { row: 6, col: 10 },
    { row: 7, col: 9 },
    { row: 8, col: 8 },
    { row: 8, col: 11 },
    { row: 10, col: 3 },
    { row: 10, col: 11 },
    { row: 11, col: 2 },
    { row: 11, col: 11 },
    { row: 11, col: 13 },
    { row: 12, col: 1 },
    { row: 12, col: 12 },
    { row: 13, col: 0 },
    { row: 13, col: 11 },
    { row: 14, col: 10 },
    { row: 14, col: 17 },
    { row: 15, col: 9 },
    { row: 15, col: 17 },
    { row: 16, col: 17 },
    { row: 17, col: 17 },
    { row: 18, col: 6 },
    { row: 18, col: 7 },
    { row: 18, col: 8 },
    { row: 18, col: 10 },
    { row: 18, col: 11 },
    { row: 18, col: 12 },
    { row: 18, col: 17 },
    { row: 19, col: 4 },
    { row: 19, col: 17 },
    { row: 20, col: 5 },
    { row: 20, col: 17 },
    { row: 21, col: 6 },
    { row: 21, col: 17 },
    { row: 22, col: 7 },
    { row: 22, col: 17 },
    { row: 23, col: 8 },
    { row: 23, col: 17 },
    { row: 24, col: 11 },
    { row: 25, col: 5 },
    { row: 25, col: 10 },
    { row: 25, col: 12 },
    { row: 26, col: 6 },
    { row: 26, col: 11 },
    { row: 26, col: 13 },
    { row: 27, col: 7 },
    { row: 27, col: 14 },
    { row: 28, col: 8 },
    { row: 28, col: 15 },
  ],
  19,
);
const INTERSECTION_INDICES = reduceCoordinatesToIndices(
  [
    { row: 1, col: 5 },
    { row: 3, col: 4 },
    { row: 6, col: 8 },
    { row: 9, col: 4 },
    { row: 9, col: 7 },
    { row: 9, col: 11 },
    { row: 10, col: 14 },
    { row: 13, col: 17 },
    { row: 18, col: 9 },
    { row: 23, col: 10 },
    { row: 24, col: 9 },
    { row: 29, col: 9 },
  ],
  19,
);

const StyledTable = styled.table`
  margin: 1em 0;
  border-spacing: 8px 0;
  th {
    text-align: left;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle begins as a standard word search. Reading across, down, and
        diagonally, we can find (in no particular order): CRANE, STARLING,
        ROBIN, SPARROW, NIGHTINGALE, SWAN, SWIFT, CROW, WEAVER, HAWK, CANARY,
        and MARTIN, all of which are names of birds.
      </p>
      <p>
        However, as suggested by the flavor, these are not just birds but in
        fact the names of various “birds”, like Donald Duck, as referenced in
        the flavor. In fact, these are the last names of a collection of real or
        fictional “birds”:
      </p>
      <StyledTable>
        <tr>
          <th>First Name</th>
          <th>Bird</th>
        </tr>
        {BIRDS.map(([first, last], i) => (
          <tr key={`bird-${i}`}>
            <td>{first}</td>
            <td>{last}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        The first names of our birds can be found in the grid as well, but not
        in a row; instead, they form a path with orthogonal and diagonal
        connections. To aid in identifying the first and last names, a series of
        blanks are given below the grid, into which the various first and last
        names can be placed in alphabetical order.
      </p>
      <p>
        Highlighting the birds in yellow and the first names in pink, we get:
      </p>
      <WordSearch>
        {GRID.map((row, i) => (
          <tr key={`row-${i}`}>
            {row.map((cell, j) => {
              const index = i * row.length + j;
              const styles: CSSProperties = {};
              if (PINK_HIGHLIGHT_INDICES.has(index)) {
                styles.backgroundColor = "#ff00ff";
              } else if (YELLOW_HIGHLIGHT_INDICES.has(index)) {
                styles.backgroundColor = "#ffff00";
              }
              if (INTERSECTION_INDICES.has(index)) {
                styles.color = "#ffffff";
                styles.fontWeight = 700;
              }
              return (
                <td key={`cell-${i}-${j}`} style={styles}>
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </WordSearch>
      <p>
        The intersections between the bird names and first names spell{" "}
        <Mono>FORENAME RYAN</Mono>. And the names themselves form the shape of a
        flamingo, so our answer is the final “bird”,{" "}
        <PuzzleAnswer>RYAN FLAMINGO</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;
