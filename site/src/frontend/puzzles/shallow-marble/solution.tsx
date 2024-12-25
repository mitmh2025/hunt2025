import React, { useCallback, type CSSProperties } from "react";
import { styled } from "styled-components";
import Crossword from "../../components/Crossword";
import { DownRightClues, UpClues } from "./data";

const SolutionTable = styled.table`
  & th,
  & td {
    padding: 0 0.5em;
  }
`;

const GridLabels: string[][] = [
  [".", ".", ".", "1", ".", ".", ".", "2", ".", ".", ".", "3", "4", ".", "."],
  ["5", ".", ".", "6", " ", ".", ".", "7", " ", ".", "8", "9", " ", " ", "."],
  [
    "10",
    " ",
    ".",
    "11",
    " ",
    " ",
    "12",
    "13",
    " ",
    " ",
    "14",
    " ",
    " ",
    " ",
    " ",
  ],
  [
    "15",
    " ",
    " ",
    "16",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "17",
    " ",
    "18",
    " ",
  ],
  [
    "19",
    " ",
    " ",
    ".",
    "20",
    " ",
    "21",
    " ",
    "22",
    "23",
    " ",
    ".",
    " ",
    ".",
    "24",
  ],
  [".", "25", " ", " ", ".", " ", ".", " ", ".", ".", " ", ".", "26", " ", "."],
  [
    "27",
    ".",
    "28",
    " ",
    ".",
    "29",
    " ",
    "30",
    " ",
    ".",
    "31",
    " ",
    "32",
    " ",
    " ",
  ],
  ["33", " ", ".", " ", ".", ".", " ", ".", " ", ".", ".", " ", ".", "34", " "],
  [
    "35",
    " ",
    " ",
    "36",
    " ",
    ".",
    "37",
    " ",
    "38",
    " ",
    ".",
    "39",
    " ",
    ".",
    "40",
  ],
  [".", "41", " ", ".", " ", ".", ".", " ", ".", " ", ".", "42", " ", " ", "."],
  [
    "43",
    ".",
    " ",
    ".",
    "44",
    " ",
    "45",
    "46",
    " ",
    "47",
    " ",
    ".",
    " ",
    " ",
    " ",
  ],
  [
    "48",
    " ",
    "49",
    " ",
    "50",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "51",
    " ",
    " ",
  ],
  [
    "52",
    " ",
    " ",
    " ",
    " ",
    "53",
    " ",
    " ",
    "54",
    "55",
    " ",
    " ",
    ".",
    "56",
    " ",
  ],
  [
    ".",
    "57",
    " ",
    " ",
    "58",
    ".",
    "59",
    " ",
    ".",
    ".",
    "60",
    " ",
    ".",
    ".",
    "61",
  ],
  [
    ".",
    ".",
    "62",
    "63",
    ".",
    ".",
    ".",
    "64",
    ".",
    ".",
    ".",
    "65",
    ".",
    ".",
    ".",
  ],
];

const GridFill = [
  ["", "", "", "A", "", "", "", "E", "", "", "", "O", "A", "", ""],
  ["O", "", "", "L", "L", "", "", "C", "M", "", "S", "R", "R", "C", ""],
  ["R", "A", "", "A", "A", "L", "M", "A", "A", "I", "A", "U", "O", "L", "E"],
  ["F", "I", "R", "S", "T", "W", "O", "R", "D", "G", "R", "E", "E", "D", "Y"],
  ["A", "E", "A", "", "E", "A", "Y", "R", "E", "A", "E", "", "T", "", "E"],
  ["", "L", "S", "A", "", "H", "", "E", "", "", "P", "", "E", "N", ""],
  ["A", "", "T", "S", "", "S", "R", "T", "R", "", "O", "T", "M", "N", "A"],
  ["D", "B", "", "O", "", "", "A", "", "A", "", "", "A", "", "I", "E"],
  ["A", "U", "S", "C", "S", "", "B", "N", "C", "O", "", "W", "T", "", "T"],
  ["", "C", "E", "", "R", "", "", "A", "", "H", "", "S", "I", "E", ""],
  ["D", "", "H", "", "O", "O", "L", "G", "N", "A", "A", "", "A", "L", "S"],
  ["S", "E", "C", "O", "N", "D", "W", "O", "R", "D", "P", "I", "G", "G", "Y"],
  ["L", "T", "A", "I", "O", "I", "O", "D", "U", "I", "A", "R", "", "O", "A"],
  ["", "A", "E", "R", "D", "", "C", "R", "", "", "N", "I", "", "", "D"],
  ["", "", "P", "T", "", "", "", "E", "", "", "", "S", "", "", ""],
];

const IsoGrid = `
.
..
LAP
STET
DEAR.
..CID.
ACHOO..
DUE.NICE
ABS.ODOR.
...CROWD..
ALTOS.LOU..
FESS...GRINS
RIAA..BANDAI.
OAR..SAN.APR..
...SEHR.CHAI...
 ..ATA.TAO..GOD
  .LAWYER..SAGA
   ALLOR...WILY
    ..MRE.OATTS
     ..ADAPT...
      .CAGE.MIT
       EMIR.ENE
        ..AETNA
         .SUE..
          .RODE
           ORLY
            ACE
             ..
              .
`
  .split("\n")
  .map((row) => row.padEnd(15, " "));

const IsoGridLabels = IsoGrid.map((row) =>
  row.split("").map((c) => (c === "." ? "." : " ")),
);
const IsoGridFill = IsoGrid.map((row) =>
  row.split("").map((c) => (c === "." || c === " " ? "" : c)),
);

const Solution = () => {
  const styleIsoGrid = useCallback(
    ({ row, column }: { row: number; column: number }): CSSProperties => {
      if ((IsoGrid[row] ?? "")[column] === " ") {
        return { border: "none" };
      }
      return {};
    },
    [],
  );

  return (
    <>
      <p>
        As hinted by the flavortext, this is a diagramless crossword, except
        that the two directions are “up” and “down-right” (diagonal). The
        completed grid looks like:
      </p>

      <Crossword labels={GridLabels} fill={GridFill} />

      <p>
        There are two rows in this grid with no black squares. These two rows
        read <code>FIRST WORD GREEDY</code> and <code>SECOND WORD PIGGY</code>.
        The answer to the puzzle is therefore <code>GREEDY PIGGY</code>.
      </p>

      <p>All clue answers are as follows:</p>

      <h3>Up</h3>
      <SolutionTable>
        <thead>
          <tr>
            <th>Number</th>
            <th>Clue</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {UpClues.map(([num, clue, answer]) => (
            <tr key={num}>
              <td>{num}</td>
              <td>{clue}</td>
              <td>
                <code>{answer}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </SolutionTable>

      <h3>Down-Right</h3>
      <SolutionTable>
        <thead>
          <tr>
            <th>Number</th>
            <th>Clue</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {DownRightClues.map(([num, clue, answer]) => (
            <tr key={num}>
              <td>{num}</td>
              <td>{clue}</td>
              <td>
                <code>{answer}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </SolutionTable>

      <h3>Author’s note</h3>
      <p>
        I hope that the up and downright answers challenged your crossword
        intuition as much as they did mine. In fact, to actually set the grid
        and confirm that it was fully connected, I needed to convert it into the
        following isomorphic grid that uses across and down clues only:
      </p>

      <Crossword
        labels={IsoGridLabels}
        fill={IsoGridFill}
        getAdditionalCellStyles={styleIsoGrid}
      />
    </>
  );
};

export default Solution;
