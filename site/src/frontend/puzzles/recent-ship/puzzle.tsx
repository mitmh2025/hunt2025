import React from "react";
import { styled } from "styled-components";

export const ScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin: 1em 0;
`;

export const StyledSudoku = styled.table`
  border-collapse: collapse;
  flex: 0 0 auto;
  td {
    width: 25px;
    height: 25px;
    text-align: center;
    padding: 0;
  }
  tr:first-child {
    td:not(:first-child):not(:last-child) {
      background-color: var(--gray-400);
      clip-path: polygon(4% 4%, 96% 4%, 96% 75%, 50% 96%, 4% 75%);
    }
  }
  tr:not(:first-child):not(:last-child) {
    td:first-child {
      background-color: var(--gray-400);
      clip-path: polygon(4% 4%, 75% 4%, 96% 50%, 75% 96%, 4% 96%);
    }
    td:not(:first-child):not(:last-child) {
      border: 1px solid black;
    }
    td:last-child {
      background-color: var(--gray-400);
      clip-path: polygon(96% 4%, 96% 96%, 25% 96%, 4% 50%, 25% 4%);
    }
  }
  tr:last-child {
    td:not(:first-child):not(:last-child) {
      background-color: var(--gray-400);
      clip-path: polygon(4% 96%, 4% 25%, 50% 4%, 96% 25%, 96% 96%);
    }
  }
`;

const Blanks = styled.span`
  white-space: pre;
`;

const BigFont = styled.span`
  font-size: 24px;
`;

export function makeCells(tables: string[][]): string[][][] {
  return tables.map((table) =>
    table.map((row) => row.split("").map((cell) => cell)),
  );
}

const SUDOKUS_1_1 = makeCells([
  ["      ", "21 2  ", "    1 ", "    2 ", "      ", " 3    "],
  ["   1  ", "     2", "  2   ", "2     ", "     3", " 1 2  "],
  [" 2 32 ", "      ", "    1 ", " 3    ", "      ", " 3 1  "],
  ["      ", "  3  3", "     3", "      ", "3  3  ", "  3   "],
]);

const SUDOKUS_1_2 = makeCells([
  ["      ", " 2   1", "2   2 ", "     3", "      ", "   3  "],
  ["    2 ", "      ", "3 3   ", "2   2 ", "     2", "   3  "],
  ["  2   ", "     2", "      ", "2    2", "     2", "  2 2 "],
  ["    2 ", "   3 3", "      ", "     2", "      ", " 4 2  "],
  ["  4   ", "      ", "     3", "3    2", "     2", " 2    "],
  ["  222 ", "      ", "      ", "     2", "3  4  ", "      "],
  ["      ", "    1 ", "2     ", " 1   2", "      ", " 232  "],
]);

const SUDOKUS_2 = makeCells([
  ["      ", "     3", " 2    ", "  1   ", "   2  ", "   21 "],
  ["   42 ", "      ", "  3   ", "      ", "2     ", "  2   "],
  [" 2 1  ", "      ", "      ", "4     ", " 3   3", "      "],
  ["    3 ", "      ", " 2    ", " 3    ", "      ", "  21  "],
  [" 3    ", "3 1   ", "     2", "      ", "3     ", "   1  "],
  [" 231  ", "  2   ", " 1 2  ", "     3", "      ", "      "],
  ["      ", "3     ", "  1  1", "  2  3", "2     ", "    2 "],
]);

const SUDOKUS_3_1 = makeCells([
  ["   33 ", "2     ", "  3   ", "3    2", "3     ", "      "],
  ["      ", "     2", " 3    ", "3     ", "3    1", " 3    "],
  [" 2 3  ", "     2", "  3   ", "      ", "    1 ", "    2 "],
  [" 3    ", "3     ", "      ", "     1", "  3  3", "  2   "],
  ["      ", "2   4 ", " 1  22", "      ", "      ", " 122  "],
  ["   2  ", " 1    ", "   1  ", "2     ", "3 3   ", "  2   "],
  [" 2    ", "      ", "3     ", "     2", "2 1  2", "      "],
  ["  213 ", "      ", "      ", "3  1  ", "  1  2", "      "],
]);

const SUDOKUS_3_2 = makeCells([
  ["  2   ", "      ", "1     ", "      ", "3     ", "    2 "],
  ["  223 ", "      ", "2   3 ", "    2 ", "2     ", "  23  "],
  [" 2    ", "2     ", "     3", "  12  ", "    22", "    3 "],
  ["   2  ", "2  2  ", "    2 ", "      ", "22    ", "    2 "],
  [" 1  3 ", "      ", "     3", "3   3 ", "2     ", "      "],
]);

export const Sudoku = ({ sudoku }: { sudoku: string[][] }): JSX.Element => {
  return (
    <StyledSudoku>
      {sudoku.map((row: string[], j: number) => (
        <tr key={`sudoku-row-${j}`}>
          {row.map((cell, k) => (
            <td key={`sudoku-row-${j}-cell-${k}`}>{cell}</td>
          ))}
        </tr>
      ))}
    </StyledSudoku>
  );
};

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        I wanted some small Sudokus, but all I got were these tall, tall
        buildings.
      </p>
      <p>
        <strong>1ST 🥇:</strong>
      </p>
      <ScrollWrapper>
        <FlexWrapper>
          {SUDOKUS_1_1.map((sudoku: string[][], i: number) => (
            <Sudoku key={`sudoku-row-1-${i}`} sudoku={sudoku} />
          ))}
        </FlexWrapper>
        <FlexWrapper>
          {SUDOKUS_1_2.map((sudoku: string[][], i: number) => (
            <Sudoku key={`sudoku-row-2-${i}`} sudoku={sudoku} />
          ))}
        </FlexWrapper>
      </ScrollWrapper>
      <p>
        <BigFont>(4&13, 5, 2&3)</BigFont>
      </p>
      <hr />
      <p>
        <strong>2ND 🥈:</strong>
      </p>
      <ScrollWrapper>
        <FlexWrapper>
          {SUDOKUS_2.map((sudoku: string[][], i: number) => (
            <Sudoku key={`sudoku-row-3-${i}`} sudoku={sudoku} />
          ))}
        </FlexWrapper>
      </ScrollWrapper>
      <p>
        <BigFont>(7, 8, 9)</BigFont>
      </p>
      <hr />
      <p>
        <strong>3RD 🥉:</strong>
      </p>
      <ScrollWrapper>
        <FlexWrapper>
          {SUDOKUS_3_1.map((sudoku: string[][], i: number) => (
            <Sudoku key={`sudoku-row-4-${i}`} sudoku={sudoku} />
          ))}
        </FlexWrapper>
        <FlexWrapper>
          {SUDOKUS_3_2.map((sudoku: string[][], i: number) => (
            <Sudoku key={`sudoku-row-5-${i}`} sudoku={sudoku} />
          ))}
        </FlexWrapper>
      </ScrollWrapper>
      <p>
        <BigFont>(6, 11, 12, 10, 1)</BigFont>
      </p>
      <hr />
      <p>
        <BigFont>
          <Blanks>{"_ _ _ _ _  _ _ _  _ _ _ _ _ _"}</Blanks>
        </BigFont>
      </p>
    </>
  );
};

export default Puzzle;
