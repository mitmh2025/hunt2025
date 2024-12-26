import React from "react";
import { styled } from "styled-components";
import {
  FlexWrapper,
  makeCells,
  ScrollWrapper,
  StyledSudoku,
  Sudoku,
} from "./puzzle";

const EvenMoreStyledSudoku = styled(StyledSudoku)`
  tr:nth-child(2) td {
    border-top-width: 2px !important;
  }
  tr:nth-child(3) td {
    border-bottom-width: 2px !important;
  }
  tr:nth-child(5) td {
    border-bottom-width: 2px !important;
  }
  td:nth-child(2) {
    border-left-width: 2px !important;
  }
  td:nth-child(3) {
    border-right-width: 2px !important;
  }
  td:nth-child(5) {
    border-right-width: 2px !important;
  }
`;

const FakeP = styled.div`
  margin: 1em 0;
`;

const Mono = styled.span`
  font-family: monospace;
`;

const StyledDetails = styled.details`
  margin-bottom: 1em;
`;

const SUDOKUS_1_1 = makeCells([
  ["      ", "21423 ", " 4231 ", " 3242 ", " 2314 ", " 3    "],
  ["   1  ", " 23412", " 3214 ", "21423 ", " 41323", " 1 2  "],
  [" 2 32 ", " 2413 ", " 4231 ", " 3124 ", " 3124 ", " 3 1  "],
  ["      ", " 43123", " 34213", " 1243 ", "32134 ", "  3   "],
]);

const SUDOKUS_1_2 = makeCells([
  ["      ", " 23141", "23142 ", " 42313", " 1423 ", "   3  "],
  ["    2 ", " 3241 ", "32314 ", "21422 ", " 41232", "   3  "],
  ["  2   ", " 23412", " 1234 ", "234122", " 41232", "  2 2 "],
  ["    2 ", " 41323", " 3214 ", " 23412", " 1423 ", " 4 2  "],
  ["  4   ", " 3124 ", " 42313", "313422", " 24132", " 2    "],
  ["  222 ", " 4231 ", " 3124 ", " 24132", "31342 ", "      "],
  ["      ", " 4231 ", "22431 ", " 13422", " 3124 ", " 232  "],
]);

const SUDOKUS_2 = makeCells([
  ["      ", " 42313", " 2413 ", " 3142 ", " 1324 ", "   21 "],
  ["   42 ", " 4213 ", " 1324 ", " 2431 ", "23142 ", "  2   "],
  [" 2 1  ", " 2143 ", " 4312 ", "41234 ", " 34213", "      "],
  ["    3 ", " 4231 ", " 2413 ", " 3124 ", " 1342 ", "  21  "],
  [" 3    ", "32134 ", " 34122", " 4321 ", "31234 ", "   1  "],
  [" 231  ", " 3241 ", " 1324 ", " 41323", " 2413 ", "      "],
  ["      ", "31342 ", " 31241", " 42313", "22413 ", "    2 "],
]);

const SUDOKUS_3_1 = makeCells([
  ["   33 ", "23412 ", " 4321 ", "312432", "32134 ", "      "],
  ["      ", " 42132", " 3421 ", "31342 ", "321341", " 3    "],
  [" 2 3  ", " 14232", " 4312 ", " 2134 ", " 3241 ", "    2 "],
  [" 3    ", "31243 ", " 3421 ", " 21341", " 21343", "  2   "],
  ["      ", "23124 ", " 13422", " 2413 ", " 4231 ", " 122  "],
  ["   2  ", " 1432 ", " 4213 ", "23124 ", "32341 ", "  2   "],
  [" 2    ", " 2431 ", "31342 ", " 42132", "231422", "      "],
  ["  213 ", " 3241 ", " 1432 ", "32314 ", " 41232", "      "],
]);

const SUDOKUS_3_2 = makeCells([
  ["  2   ", " 2314 ", "14132 ", " 3421 ", "31243 ", "    2 "],
  ["  223 ", " 4321 ", "22143 ", " 1432 ", "23214 ", "  23  "],
  [" 2    ", "23214 ", " 24313", " 4123 ", " 13422", "    3 "],
  ["   2  ", "23124 ", " 1342 ", " 4231 ", "22413 ", "    2 "],
  [" 1  3 ", " 4312 ", " 24313", "31243 ", "23124 ", "      "],
]);

const SudokuWithMoreLines = ({
  sudoku,
}: {
  sudoku: string[][];
}): JSX.Element => {
  return (
    <EvenMoreStyledSudoku>
      {sudoku.map((row: string[], j: number) => (
        <tr key={`sudoku-row-${j}`}>
          {row.map((cell, k) => (
            <td key={`sudoku-row-${j}-cell-${k}`}>{cell}</td>
          ))}
        </tr>
      ))}
    </EvenMoreStyledSudoku>
  );
};

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle consists of five rows of skyscrapers puzzles in three
        groups. These can all be solved via the normal skyscrapers rules:
      </p>
      <ul>
        <li>
          Fill the grid with numbers 1-4 representing the heights of the
          skyscrapers.
        </li>
        <li>Numbers within each row and column must be unique.</li>
        <li>
          Numbers on the arrows outside the grid indicate how many unique
          skyscrapers can be seen from the associated perspective along the
          given row or column.
        </li>
      </ul>
      <p>
        Notably, the first two conditions mean that the solution to a skyscraper
        puzzle is a Latin square. A Sudoku puzzle must also be a Latin square
        (unique digits in each row and column), but it has an additional
        structure in that each major 2x2 block must also contain unique digits.
        Solving the skyscraper puzzles reveals that some of them are also
        “Sudokus” in that they also have this additional structure with unique
        digits in their major 2x2 blocks. The number of Sudokus in each group
        matches the number of entries in the tuple at the end of the group.
      </p>
      <p>The solved grids can be seen below.</p>
      <StyledDetails>
        <summary>Solved grids</summary>
        <ScrollWrapper>
          <FlexWrapper>
            {SUDOKUS_1_1.map((sudoku: string[][], i: number) => (
              <Sudoku key={`sudoku-row-1-${i}`} sudoku={sudoku} />
            ))}
          </FlexWrapper>
          <FlexWrapper>
            {SUDOKUS_1_2.map((sudoku: string[][], i: number) =>
              [3, 4, 5].includes(i) ? (
                <SudokuWithMoreLines
                  key={`sudoku-row-2-${i}`}
                  sudoku={sudoku}
                />
              ) : (
                <Sudoku key={`sudoku-row-2-${i}`} sudoku={sudoku} />
              ),
            )}
          </FlexWrapper>
        </ScrollWrapper>
        <ScrollWrapper>
          <FlexWrapper>
            {SUDOKUS_2.map((sudoku: string[][], i: number) =>
              [1, 2, 4].includes(i) ? (
                <SudokuWithMoreLines
                  key={`sudoku-row-3-${i}`}
                  sudoku={sudoku}
                />
              ) : (
                <Sudoku key={`sudoku-row-3-${i}`} sudoku={sudoku} />
              ),
            )}
          </FlexWrapper>
        </ScrollWrapper>
        <ScrollWrapper>
          <FlexWrapper>
            {SUDOKUS_3_1.map((sudoku: string[][], i: number) =>
              [3, 6, 7].includes(i) ? (
                <SudokuWithMoreLines
                  key={`sudoku-row-4-${i}`}
                  sudoku={sudoku}
                />
              ) : (
                <Sudoku key={`sudoku-row-4-${i}`} sudoku={sudoku} />
              ),
            )}
          </FlexWrapper>
          <FlexWrapper>
            {SUDOKUS_3_2.map((sudoku: string[][], i: number) =>
              [0, 1].includes(i) ? (
                <SudokuWithMoreLines
                  key={`sudoku-row-5-${i}`}
                  sudoku={sudoku}
                />
              ) : (
                <Sudoku key={`sudoku-row-5-${i}`} sudoku={sudoku} />
              ),
            )}
          </FlexWrapper>
        </ScrollWrapper>
      </StyledDetails>
      <p>
        The final thing that solvers must realize is that the number of
        skyscraper puzzles in each row matches the lengths of the names of the
        top 3 tallest skyscrapers in the world:
      </p>
      <FakeP>
        <div>BURJ</div>
        <div>KHALIFA</div>
      </FakeP>
      <FakeP>MERDEKA</FakeP>
      <FakeP>
        <div>SHANGHAI</div>
        <div>TOWER</div>
      </FakeP>
      <FakeP>
        These can be matched to the solved skyscrapers, and we can select the
        letters corresponding to the skyscraper Sudokus:
      </FakeP>
      <FakeP>
        <div>BURJ</div>
        <div>
          KHA<strong>LIF</strong>A
        </div>
        <div>(4&13, 5, 2&3)</div>
      </FakeP>
      <FakeP>
        <div>
          M<strong>ER</strong>D<strong>E</strong>KA
        </div>
        <div>(7, 8, 9)</div>
      </FakeP>
      <FakeP>
        <div>
          SHA<strong>N</strong>GH<strong>AI</strong>
        </div>
        <div>
          <strong>TO</strong>WER
        </div>
        <div>(6, 11, 12, 10, 1)</div>
      </FakeP>
      <p>
        Distributing these letters out to the order indicated by the tuples
        gives <Mono>OFFLINE RETAIL</Mono>, which does not fit the given blanks
        but which could be a description of{" "}
        <Mono>
          <strong>BRICK AND MORTAR</strong>
        </Mono>
        , which does fit the blanks and is the answer.
      </p>
    </>
  );
};

export default Solution;
