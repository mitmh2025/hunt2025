import React from "react";
import { styled } from "styled-components";
import Crossword from "../../components/Crossword";
import { GRID } from "./puzzle";

const StyledCrossword = styled(Crossword)`
  margin-bottom: 1rem;
`;

const ClueTable = styled.table`
  tbody td:nth-child(1) {
    text-align: right;
    padding-right: 1em;
  }
  tbody td:nth-child(2) {
    font-family:
      Roboto Mono,
      monospace;
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
          <tr>
            <td>7A</td>
            <td>A FOX</td>
            <td>Odd letters of AlF’s plus OX</td>
            <td></td>
          </tr>
          <tr>
            <td>8A</td>
            <td>OLEANDER</td>
            <td>anagram “dear Leon”</td>
            <td>blackthorn</td>
          </tr>
          <tr>
            <td>9A</td>
            <td>HARRIS</td>
            <td>first letters of “had a rotten rating in sitcom”</td>
            <td>entry</td>
          </tr>
          <tr>
            <td>10A</td>
            <td>IGNORE</td>
            <td>feIGN OR Enact</td>
            <td>lazily</td>
          </tr>
          <tr>
            <td>12A</td>
            <td>KERNEL OF TRUTH</td>
            <td>anagram “letter for hunk”</td>
            <td />
          </tr>
          <tr>
            <td>14A</td>
            <td>LIQUID CRYSTAL</td>
            <td>
              convertible = LIQUID, anagram “last” after market call = CRY
            </td>
            <td>conclusion</td>
          </tr>
          <tr>
            <td>18A</td>
            <td>SEARCH</td>
            <td>anagram “arches”</td>
            <td>headland</td>
          </tr>
          <tr>
            <td>20A</td>
            <td>CANING</td>
            <td>concerned = “caring” minus R plus N (chess)</td>
            <td />
          </tr>
          <tr>
            <td>22A</td>
            <td>TOLLFREE</td>
            <td>&amp;lit, ring = TOLL</td>
            <td>smile</td>
          </tr>
          <tr>
            <td>23A</td>
            <td>ELOI</td>
            <td>one = I after “OLE” (reversal)</td>
            <td>aye</td>
          </tr>

          <tr>
            <td>1D</td>
            <td>OFLATE</td>
            <td>FLAT surrounded by O (first letter of owner) and E (east)</td>
            <td />
          </tr>
          <tr>
            <td>2D</td>
            <td>AXER</td>
            <td>EX reversed (brings up) inside AR</td>
            <td />
          </tr>
          <tr>
            <td>3D</td>
            <td>DORSAL</td>
            <td>anagram “or lads”</td>
            <td>steal</td>
          </tr>
          <tr>
            <td>4D</td>
            <td>RELIEF</td>
            <td>anagram “I feel” after R</td>
          </tr>
          <tr>
            <td>5D</td>
            <td>ENSNARES</td>
            <td>reversed hidden word: purSE RAN SNEakily</td>
            <td>diamonds</td>
          </tr>
          <tr>
            <td>6D</td>
            <td>BEER</td>
            <td>BR (banker minus ANKE) filled with EE (inside of deed)</td>
            <td>currency</td>
          </tr>
          <tr>
            <td>11D</td>
            <td>ETHEL</td>
            <td>Bethel minus B</td>
            <td />
          </tr>
          <tr>
            <td>12D</td>
            <td>KILNS</td>
            <td>
              “like” reversed (coming back) and curtailed (almost) = KIL,
              nightclubs on the edges = NS
            </td>
            <td />
          </tr>
          <tr>
            <td>13D</td>
            <td>NEUTRALS</td>
            <td>anagram “tans rule”</td>
            <td>footwear</td>
          </tr>
          <tr>
            <td>15D</td>
            <td>D SHARP</td>
            <td>D plus “sharpton” minus “ton”</td>
            <td />
          </tr>
          <tr>
            <td>16D</td>
            <td>ROCKET</td>
            <td>stalwart = rock, alien = ET</td>
            <td />
          </tr>
          <tr>
            <td>17D</td>
            <td>AT NOON</td>
            <td>
              November = N, old = O, love = O, last letter of forsaken, after A
              plus first letter of tail
            </td>
            <td>Loretta</td>
          </tr>
          <tr>
            <td>19D</td>
            <td>EROS</td>
            <td>upset = SORE, reversed (over)</td>
            <td>smell</td>
          </tr>
          <tr>
            <td>21D</td>
            <td>NOEL</td>
            <td>“Leon” reversed</td>
            <td />
          </tr>
        </tbody>
      </ClueTable>

      <p>This gives the following grid:</p>
      <StyledCrossword labels={GRID} fill={GRID_FILL_PT1} />

      <p>Each of the extra words is a clue for another answer:</p>

      <table>
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
      </table>

      <p>
        The new answers must also be “packed” into the grid (as clued by the
        flavor). Some of the black squares can be used to fit the new answers
        into the grid, giving this grid:
      </p>
      <StyledCrossword labels={GRID} fill={GRID_FILL_PT2} />

      <p>
        The final puzzle answer is read along the diagonal using the newly
        inserted letters: <strong>C FOR CLARENDON</strong>.
      </p>
    </>
  );
};

export default Solution;
