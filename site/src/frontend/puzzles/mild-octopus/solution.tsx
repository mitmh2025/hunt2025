import React from "react";
import { styled } from "styled-components";

const MonoTD = styled.td`
  font-family: monospace;
`;

const MonoP = styled.p`
  font-family: monospace;
`;
const BoldMonoP = styled(MonoP)`
  font-weight: bold;
`;

const Solution = () => {
  return (
    <>
      <p>
        This meta is part of a larger round with a shared group of feeder
        puzzles. This solution will necessarily contain spoilers for the larger
        round.
      </p>

      <p>
        In this puzzle, the solver must back-construct{" "}
        <a href="https://en.wikipedia.org/wiki/Cryptic_crossword#How_cryptic_clues_work">
          cryptic wordplays
        </a>{" "}
        which resolve to the feeder answers. The wordplays have some words
        supplied as well as numbered blanks; all blanks with the same number
        contain the same word. At bottom is a list of parenthesized numbers,
        these are the lengths of the blank-filling words. This list is also in
        alphabetical order by the blank-filling words.
      </p>

      <p>
        Once the list has been constructed, the last long set of blanks can be
        filled in to make one final wordplay which resolves to the answer to
        this meta.
      </p>

      <p>With blanks filled, the clues and feeder solutions are:</p>

      <table>
        <thead>
          <tr>
            <th>Cryptic clue</th>
            <th>Wordplay</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Real estate area has mid style and large email sign</td>
            <MonoTD>ACR(_Y_+L+AT)E</MonoTD>
            <MonoTD>ACRYLATE</MonoTD>
          </tr>
          <tr>
            <td>Swiss mountain and one unit of energy inside</td>
            <MonoTD>ALP+(A+CAL)+AND</MonoTD>
            <MonoTD>ALPACALAND</MonoTD>
          </tr>
          <tr>
            <td>Email distribution tool picked up by retreating Confederate</td>
            <MonoTD>B(LIST)ER←</MonoTD>
            <MonoTD>BLISTER</MonoTD>
          </tr>
          <tr>
            <td>Mountain-ringed area with Swiss domain and novel</td>
            <MonoTD>M(A)T+CH+BOOK</MonoTD>
            <MonoTD>MATCHBOOK</MonoTD>
          </tr>
          <tr>
            <td>Novel openers in total</td>
            <MonoTD>NO_+NET</MonoTD>
            <MonoTD>NONET</MonoTD>
          </tr>
          <tr>
            <td>Mid-sized dash in novel style</td>
            <MonoTD>P(EN)ROSE</MonoTD>
            <MonoTD>PENROSE</MonoTD>
          </tr>
          <tr>
            <td>Novel openers</td>
            <MonoTD>PENROSE*</MonoTD>
            <MonoTD>PENROSE</MonoTD>
          </tr>
        </tbody>
      </table>

      <p>This makes the final wordplay:</p>
      <pre>
        Dash, dash, one large and retreating. Energy: total. Email real Swiss
        openers.
      </pre>
      {/* prettier-ignore */}
      <pre>    M        I   L     +   (L+I+M)←    E.      T.     E.    R.   S.</pre>
      <BoldMonoP>MILLIMETERS</BoldMonoP>
      <p>
        <code>--</code> is M in morse code. One, in roman numerals, is I. Large
        simply becomes L. We echo the MIL in reverse for “and retreating”. The
        remaining five letters are the first letters of the five words preceding
        “openers” – the opener of each word.
      </p>
      <p>For reference, the list of blank-filling words is:</p>
      <ol>
        <li>and</li>
        <li>area</li>
        <li>dash</li>
        <li>email</li>
        <li>energy</li>
        <li>large</li>
        <li>mid</li>
        <li>mountain</li>
        <li>novel</li>
        <li>one</li>
        <li>openers</li>
        <li>real</li>
        <li>retreating</li>
        <li>style</li>
        <li>Swiss</li>
        <li>total</li>
      </ol>
    </>
  );
};

export default Solution;
