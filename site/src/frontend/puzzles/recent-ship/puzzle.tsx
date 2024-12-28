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

export const StyledTable = styled.table`
  border-collapse: collapse;
  flex: 0 0 auto;
  td {
    width: 25px;
    height: 25px;
    text-align: center;
    padding: 0;
  }
  tr:first-child {
    td:nth-child(7n + 2),
    td:nth-child(7n + 3),
    td:nth-child(7n + 4),
    td:nth-child(7n + 5) {
      background-color: var(--gray-400);
      clip-path: polygon(4% 4%, 96% 4%, 96% 75%, 50% 96%, 4% 75%);
    }
  }
  tr:not(:first-child):not(:last-child) {
    td:nth-child(7n + 1) {
      background-color: var(--gray-400);
      clip-path: polygon(4% 4%, 75% 4%, 96% 50%, 75% 96%, 4% 96%);
    }
    td:nth-child(7n + 2),
    td:nth-child(7n + 3),
    td:nth-child(7n + 4),
    td:nth-child(7n + 5) {
      border: 1px solid black;
    }
    td:nth-child(7n + 6) {
      background-color: var(--gray-400);
      clip-path: polygon(96% 4%, 96% 96%, 25% 96%, 4% 50%, 25% 4%);
    }
  }
  tr:last-child {
    td:nth-child(7n + 2),
    td:nth-child(7n + 3),
    td:nth-child(7n + 4),
    td:nth-child(7n + 5) {
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

export function makeCells(rows: string[]): string[][] {
  return rows.map((row) => row.split("").map((cell) => cell));
}

const SUDOKUS_1_1 = makeCells([
  "          1    2 32        ",
  "21 2        2          3  3",
  "    1    2        1       3",
  "    2  2       3           ",
  "            3        3  3  ",
  " 3      1 2    3 1     3   ",
]);

const SUDOKUS_1_2 = makeCells([
  "           2    2        2    4      222        ",
  " 2   1             2    3 3                   1 ",
  "2   2  3 3                       3        2     ",
  "     3 2   2  2    2      2 3    2      2  1   2",
  "            2      2             2 3  4         ",
  "   3      3     2 2   4 2    2             232  ",
]);

const SUDOKUS_2 = makeCells([
  "          42   2 1       3   3      231         ",
  "     3                      3 1      2    3     ",
  " 2       3            2          2  1 2     1  1",
  "  1           4       3                 3   2  3",
  "   2   2       3   3        3             2     ",
  "   21    2             21      1              2 ",
]);

const SUDOKUS_3_1 = makeCells([
  "   33          2 3    3               2    2       213 ",
  "2           2      2 3      2   4   1                  ",
  "  3     3       3            1  22    1   3            ",
  "3    2 3                  1        2           2 3  1  ",
  "3      3    1     1    3  3        3 3    2 1  2   1  2",
  "        3         2    2     122     2                 ",
]);

const SUDOKUS_3_2 = makeCells([
  "  2      223   2        2    1  3 ",
  "              2      2  2         ",
  "1      2   3       3     2       3",
  "           2    12          3   3 ",
  "3      2          22 22     2     ",
  "    2    23       3      2        ",
]);

export const SudokuLine = ({ rows }: { rows: string[][] }): JSX.Element => {
  return (
    <StyledTable>
      {rows.map((row, i) => (
        <tr key={i}>
          {row.map((cell, j) => (
            <td key={`${i}-${j}`}>{cell}</td>
          ))}
        </tr>
      ))}
    </StyledTable>
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
          <SudokuLine rows={SUDOKUS_1_1} />
        </FlexWrapper>
        <FlexWrapper>
          <SudokuLine rows={SUDOKUS_1_2} />
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
          <SudokuLine rows={SUDOKUS_2} />
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
          <SudokuLine rows={SUDOKUS_3_1} />
        </FlexWrapper>
        <FlexWrapper>
          <SudokuLine rows={SUDOKUS_3_2} />
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
