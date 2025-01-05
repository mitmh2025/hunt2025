import React from "react";
import { styled } from "styled-components";
import Crossword from "../../components/Crossword";
import { HScrollTableWrapper } from "../../components/StyledUI";
import { GRID } from "./puzzle";

const StyledCrossword = styled(Crossword)`
  margin-bottom: 1rem;
`;

const ClueTable = styled.table`
  margin-bottom: 1rem;
  tbody td:nth-child(1) {
    text-align: right;
    padding-right: 1em;
  }
  tbody td:nth-child(2) {
    font-family: "Roboto Mono", monospace;
  }
`;

const CluePairTable = styled.table`
  margin-bottom: 1rem;
  tbody td:nth-child(1) {
    min-width: 110px;
  }
`;

const GRID_FILL_PT1 = [
  ".O.A.D.R.E.B.",
  "AFOX.OLEANDER",
  ".L.E.R.L.S.E.",
  "HARRIS.IGNORE",
  ".T...A.E.A..T",
  "KERNELOFTRUTH",
  "I..E.....E..E",
  "LIQUIDCRYSTAL",
  "N..T.S.O...T.",
  "SEARCH.CANING",
  ".R.A.A.K.O.O.",
  "TOLLFREE.ELOI",
  ".S.S.P.T.L.N.",
].map((s: string) => s.split(""));

const GRID_FILL_PT2 = [
  "CODA.D.R.E.B.",
  "AFOX.OLEANDER",
  "SLOE.R.L.S.E.",
  "HARRIS.IGNORE",
  ".T..CAPE.A..T",
  "KERNELOFTRUTH",
  "I..E..A..E..E",
  "LIQUIDCRYSTAL",
  "N..T.SHOE..T.",
  "SEARCH.CANING",
  ".R.A.A.K.ODOR",
  "TOLLFREE.ELOI",
  ".S.S.P.T.LYNN",
].map((s: string) => s.split(""));

const CLUES: [string, string, string, string][] = [
  ["7A", "A FOX", "Odd letters of AlF’s plus OX", ""],
  ["8A", "OLEANDER", "anagram “dear Leon”", "blackthorn"],
  ["9A", "HARRIS", "first letters of “had a rotten rating in sitcom”", "entry"],
  ["10A", "IGNORE", "feIGN OR Enact", "lazily"],
  ["12A", "KERNEL OF TRUTH", "anagram “letter for hunk”", ""],
  [
    "14A",
    "LIQUID CRYSTAL",
    "convertible = LIQUID, anagram “last” after market call = CRY",
    "conclusion",
  ],
  ["18A", "SEARCH", "anagram “arches”", "headland"],
  ["20A", "CANING", "concerned = “caring” minus R plus N (chess)", ""],
  ["22A", "TOLLFREE", "&lit, ring = TOLL", "smile"],
  ["23A", "ELOI", "one = I after “OLE” (reversal)", "aye"],
  [
    "1D",
    "OFLATE",
    "FLAT surrounded by O (first letter of owner) and E (east)",
    "",
  ],
  ["2D", "AXER", "EX reversed (brings up) inside AR", ""],
  ["3D", "DORSAL", "anagram “or lads”", "steal"],
  ["4D", "RELIEF", "anagram “I feel” after R", ""],
  ["5D", "ENSNARES", "reversed hidden word: purSE RAN SNEakily", "diamonds"],
  [
    "6D",
    "BEER",
    "BR (banker minus ANKE) filled with EE (inside of deed)",
    "currency",
  ],
  ["11D", "ETHEL", "Bethel minus B", ""],
  [
    "12D",
    "KILNS",
    "“like” reversed (coming back) and curtailed (almost) = KIL, nightclubs on the edges = NS",
    "",
  ],
  ["13D", "NEUTRALS", "anagram “tans rule”", "footwear"],
  ["15D", "D SHARP", "D plus “sharpton” minus “ton”", ""],
  ["16D", "ROCKET", "stalwart = rock, alien = ET", ""],
  [
    "17D",
    "AT NOON",
    "November = N, old = O, love = O, last letter of forsaken, after A plus first letter of tail",
    "Loretta",
  ],
  ["19D", "EROS", "upset = SORE, reversed (over)", "smell"],
  ["21D", "NOEL", "“Leon” reversed", ""],
];

const CLUE_PAIRS: string[][] = [
  ["aye", "YEA"],
  ["blackthorn", "SLOE"],
  ["conclusion", "CODA"],
  ["currency", "CASH"],
  ["diamonds", "ICE"],
  ["entry", "DOOR"],
  ["footwear", "SHOE"],
  ["headland", "CAPE"],
  ["lazily", "IDLY"],
  ["Loretta", "LYNN"],
  ["smell", "ODOR"],
  ["smile", "GRIN"],
  ["steal", "POACH"],
];

const Solution = () => {
  return (
    <>
      <p>
        Solvers should first just fill in the grid by solving the cryptic clues,
        as in a normal cryptic crossword. However, as clued by the flavor text,
        some clues are “packed” with an extra word that is not used by either
        the wordplay or definition. Exactly thirteen of the twenty-four clues
        have an extra word. The answers and explanations are shown below:
      </p>
      <HScrollTableWrapper>
        <ClueTable>
          <thead>
            <tr>
              <th>Clue</th>
              <th>Answer</th>
              <th>Explanation</th>
              <th>Extra word</th>
            </tr>
          </thead>
          <tbody>
            {CLUES.map(([cluenum, answer, explanation, extra]) => (
              <tr key={cluenum}>
                <td>{cluenum}</td>
                <td>{answer}</td>
                <td>{explanation}</td>
                <td>{extra}</td>
              </tr>
            ))}
          </tbody>
        </ClueTable>
      </HScrollTableWrapper>

      <p>This gives the following grid:</p>
      <HScrollTableWrapper>
        <StyledCrossword labels={GRID} fill={GRID_FILL_PT1} />
      </HScrollTableWrapper>

      <p>Each of the extra words is a clue for another answer:</p>

      <HScrollTableWrapper>
        <CluePairTable>
          <thead>
            <tr>
              <th>Clue word</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {CLUE_PAIRS.map((pair, i) => {
              return (
                <tr key={`pair-${i}`}>
                  <td>{pair[0]}</td>
                  <td>{pair[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </CluePairTable>
      </HScrollTableWrapper>

      <p>
        The new answers must also be “packed” into the grid (as clued by the
        flavor). Some of the black squares can be used to fit the new answers
        into the grid, giving this grid:
      </p>
      <HScrollTableWrapper>
        <StyledCrossword labels={GRID} fill={GRID_FILL_PT2} getAdditionalCellStyles={({ row, column }) => {
          if (GRID[row]?.[column] === ".") {
            return {
              color: "white",
            };
          }
          return {};
        }}/>
      </HScrollTableWrapper>

      <p>
        The final puzzle answer is read along the diagonal using the newly
        inserted letters: <strong>C FOR CLARENDON</strong>.
      </p>
    </>
  );
};

export default Solution;
