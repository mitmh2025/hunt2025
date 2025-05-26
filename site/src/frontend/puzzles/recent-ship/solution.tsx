import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import {
  FlexWrapper,
  makeCells,
  ScrollWrapper,
  StyledTable,
  SudokuLine,
} from "./puzzle";

const FakeP = styled.div`
  margin: 1em 0;
`;

const StyledDetails = styled.details`
  margin-bottom: 1em;
`;

const SUDOKUS_1_1 = makeCells([
  "          1    2 32        ",
  "21423   23412  2413   43123",
  " 4231   3214   4231   34213",
  " 3142  21423   3124   1243 ",
  " 2314   41323  1342  32134 ",
  " 3      1 2    3 1     3   ",
]);

const SUDOKUS_1_2 = makeCells([
  "           2    2        2    4      222        ",
  " 23141  3241   23412  41323  3124   4231   4231 ",
  "23142  32314   1234   3214   42313  3124  22413 ",
  " 42313 21432  234122  23412 313422  24132  13422",
  " 1423   41232  41232  1423   24132 31342   3124 ",
  "   3      3     2 2   4 2    2             232  ",
]);

const SUDOKUS_2 = makeCells([
  "          42   2 1       3   3      231         ",
  " 42313  4213   2143   4231  32134   3241  31342 ",
  " 2413   1324   4312   2413   34122  1324   31241",
  " 3142   2431  41234   3124   4321   41323  42313",
  " 1324  23142   34213  1342  31243   2413  22413 ",
  "   21    2             21      1              2 ",
]);

const SUDOKUS_3_1 = makeCells([
  "   33          2 3    3               2    2       213 ",
  "23412   42132  14232 31243  23124   1432   2431   3241 ",
  " 4321   3421   4312   3421   13422  4213  31324   1432 ",
  "312432 31342   2134   21341  2413  23124   42132 32314 ",
  "32134  321341  3241   43123  4231  32341  231422  41232",
  "        3         2    2     122     2                 ",
]);

const SUDOKUS_3_2 = makeCells([
  "  2      223   2        2    1  3 ",
  " 2314   4321  23214  23124   4312 ",
  "14132  22143   24313  1342   24313",
  " 3421   1432   4123   4231  31243 ",
  "31243  23214   13422 22413  23124 ",
  "    2    23       3      2        ",
]);

const SudokuButMoreLines = ({
  moreLinesIndices,
  rows,
}: {
  moreLinesIndices: number[];
  rows: string[][];
}): JSX.Element => {
  return (
    <StyledTable>
      {rows.map((row: string[], j: number) => {
        // console.error("Row index", j);
        return (
          <tr key={`sudoku-row-${j}`}>
            {row.map((cell, k) => {
              const sudokuIndex = Math.floor(k / 7);
              const indexWithinSudoku = k % 7;

              const styles: CSSProperties = {};
              if (moreLinesIndices.includes(sudokuIndex)) {
                const isInnerColumn =
                  indexWithinSudoku > 0 && indexWithinSudoku < 6;
                if (j === 1 && isInnerColumn) {
                  styles.borderTopWidth = "3px";
                }
                if ((j === 2 || j === 4) && isInnerColumn) {
                  styles.borderBottomWidth = "3px";
                }

                const isInnerRow = j > 0 && j < 6;
                if (indexWithinSudoku === 1 && isInnerRow) {
                  styles.borderLeftWidth = "3px";
                }
                if (
                  (indexWithinSudoku === 2 || indexWithinSudoku === 4) &&
                  isInnerRow
                ) {
                  styles.borderRightWidth = "3px";
                }
              }
              return (
                <td key={`sudoku-row-${j}-cell-${k}`} style={styles}>
                  {cell}
                </td>
              );
            })}
          </tr>
        );
      })}
    </StyledTable>
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
            <SudokuLine rows={SUDOKUS_1_1} />
          </FlexWrapper>
          <FlexWrapper>
            <SudokuButMoreLines
              moreLinesIndices={[3, 4, 5]}
              rows={SUDOKUS_1_2}
            />
          </FlexWrapper>
        </ScrollWrapper>
        <ScrollWrapper>
          <FlexWrapper>
            <SudokuButMoreLines moreLinesIndices={[1, 2, 4]} rows={SUDOKUS_2} />
          </FlexWrapper>
        </ScrollWrapper>
        <ScrollWrapper>
          <FlexWrapper>
            <SudokuButMoreLines
              moreLinesIndices={[3, 6, 7]}
              rows={SUDOKUS_3_1}
            />
          </FlexWrapper>
          <FlexWrapper>
            <SudokuButMoreLines moreLinesIndices={[0, 1]} rows={SUDOKUS_3_2} />
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
        <PuzzleAnswer>BRICK AND MORTAR</PuzzleAnswer>, which does fit the blanks
        and is the answer.
      </p>
    </>
  );
};

export default Solution;
