import React from "react";
import { styled } from "styled-components";
import { PuzzleAnswer } from "../../components/StyledUI";
import solution from "./assets/solution.mp4";

const Sudoku = styled.table`
  margin-bottom: 1em;
  font-family:
    Roboto Mono,
    monospace;
  border-collapse: collapse;
  border: 2px solid black;
  tr:nth-child(3n) {
    border-bottom: 2px solid black;
  }
  td {
    border: 1px solid black;
    width: 2em;
    height: 2em;
    text-align: center;
    &:nth-child(3n) {
      border-right-width: 2px;
    }
  }
`;

const StyledTable = styled.table`
  margin-bottom: 1em;
`;

const GRID = [
  "AKFJEIBDH",
  "IDHFKBJEA",
  "EJBADHFKI",
  "KFJDAEHIB",
  "BIDHFKEAJ",
  "HAEBIJKFD",
  "JEKIBDAHF",
  "FBIKHADJE",
  "DHAEJFIBK",
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle consists of a Sudoku (with additional rules) played with
        letters instead of digits—the knights’ initials give us A, B, D, E, F,
        H, I, J, K. The first step is to fill in the grid:
      </p>
      <p>The completed grid is:</p>
      <Sudoku>
        {GRID.map((row, i) => (
          <tr key={`${i}`}>
            {row.split("").map((char, j) => (
              <td key={`${i}-${j}`}>{char}</td>
            ))}
          </tr>
        ))}
      </Sudoku>
      <p>
        We can then take the provided indices below the grid and extract their
        resulting letters:
      </p>
      <StyledTable>
        <tr>
          <th>Coordinates</th>
          <th>Letter 1</th>
          <th>Letter 2</th>
        </tr>
        <tr>
          <td>(1, 7) + (8, 4)</td>
          <td>B</td>
          <td>K</td>
        </tr>
        <tr>
          <td>(1, 5) + (4, 3)</td>
          <td>E</td>
          <td>J</td>
        </tr>
        <tr>
          <td>(7, 8) + (7, 1)</td>
          <td>H</td>
          <td>J</td>
        </tr>
        <tr>
          <td>(6, 5) + (3, 8)</td>
          <td>I</td>
          <td>K</td>
        </tr>
        <tr>
          <td>(5, 3) + (9, 1)</td>
          <td>D</td>
          <td>D</td>
        </tr>
        <tr>
          <td>(1, 3) + (3, 9)</td>
          <td>F</td>
          <td>I</td>
        </tr>
        <tr>
          <td>(4, 4) + (2, 7)</td>
          <td>D</td>
          <td>J</td>
        </tr>
        <tr>
          <td>(2, 6) + (3, 3)</td>
          <td>B</td>
          <td>B</td>
        </tr>
      </StyledTable>
      <p>
        Treating A as 1, B as 2, etc., we can perform arithmetic on the letter
        values to get the final answer:
      </p>
      <StyledTable>
        <tr>
          <th>Coordinates</th>
          <th>Letter 1</th>
          <th>Letter 2</th>
          <th>Letter Sum</th>
        </tr>
        <tr>
          <td>(1, 7) + (8, 4)</td>
          <td>B</td>
          <td>K</td>
          <td>M</td>
        </tr>
        <tr>
          <td>(1, 5) + (4, 3)</td>
          <td>E</td>
          <td>J</td>
          <td>O</td>
        </tr>
        <tr>
          <td>(7, 8) + (7, 1)</td>
          <td>H</td>
          <td>J</td>
          <td>R</td>
        </tr>
        <tr>
          <td>(6, 5) + (3, 8)</td>
          <td>I</td>
          <td>K</td>
          <td>T</td>
        </tr>
        <tr>
          <td>(5, 3) + (9, 1)</td>
          <td>D</td>
          <td>D</td>
          <td>H</td>
        </tr>
        <tr>
          <td>(1, 3) + (3, 9)</td>
          <td>F</td>
          <td>I</td>
          <td>O</td>
        </tr>
        <tr>
          <td>(4, 4) + (2, 7)</td>
          <td>D</td>
          <td>J</td>
          <td>N</td>
        </tr>
        <tr>
          <td>(2, 6) + (3, 3)</td>
          <td>B</td>
          <td>B</td>
          <td>D</td>
        </tr>
      </StyledTable>
      <p>
        which is <PuzzleAnswer>MORTHOND</PuzzleAnswer>.
      </p>
      <h3>Video walkthrough</h3>
      <p>
        A walkthrough of a possible solution path is given below—note that this
        walkthrough is done numerically with H=1, I=2, J=3, K=4, D=5, E=6, 7=F,
        8=A, 9=B.
      </p>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- video does not have audio component */}
      <video width={500} controls>
        <source src={solution} type="video/mp4" />
      </video>
    </>
  );
};

export default Solution;
