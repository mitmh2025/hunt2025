import React from "react";
import { styled } from "styled-components";
import nurikabe from "./assets/nurikabe-solved.png";
import nurikabeWithLetters from "./assets/nurikabe-with-letters.png";

const SolutionTable = styled.table`
  border-collapse: collapse;

  & th,
  & td {
    padding: 0.5rem;
    border: 1px solid black;
  }
`;

const SolutionData: [url: string, island: string, letter: string][] = [
  ["https://en.wikipedia.org/wiki/Bacalao_(phantom_island)", "(B)ACALAO", "B"],
  ["https://en.wikipedia.org/wiki/Mayda", "M(A)YDA", "A"],
  ["https://en.wikipedia.org/wiki/Atlantis", "A(T)LANTIS", "T"],
  ["https://en.wikipedia.org/wiki/Hyperborea", "(H)YPERBOREA", "H"],
  ["https://en.wikipedia.org/wiki/Brasil_(mythical_island)", "(B)RASIL", "B"],
  ["https://en.wikipedia.org/wiki/Royllo", "(R)OYLLO", "R"],
  ["https://en.wikipedia.org/wiki/Frisland", "FR(I)SLAND", "I"],
  ["https://en.wikipedia.org/wiki/Groclant", "GRO(C)LANT", "C"],
  ["https://en.wikipedia.org/wiki/Kantia", "(K)ANTIA", "K"],
];

const Solution = () => {
  return (
    <>
      <p>
        Solvers are presented with a grid of letters and numbers as well as
        flavortext that asks them to solve the{" "}
        <em>puzzle of islands in the stream</em>. This refers to{" "}
        <a href="https://en.wikipedia.org/wiki/Nurikabe_(puzzle)">Nurikabe</a>,
        the logic puzzle that is also called “Islands in the stream.” It
        involves dividing the grid into connected groups of islands (with the
        number denoting its size) and a single other connected group that forms
        the stream, with no 2x2 squares. By ignoring the letters and using the
        numbers as Nurikabe clues, we can solve the logic puzzle. On solving the
        Nurikabe puzzle, the following islands are obtained:
      </p>

      <img src={nurikabe} alt="Solved Nurikabe puzzle" />

      <p>
        On adding back the letters and only keeping the “islands”, we get the
        following:
      </p>

      <img src={nurikabeWithLetters} alt="Nurikabe puzzle with letters added" />

      <p>
        The letters of each island, when taken in reading order, seem to spell
        out a word. Solvers must then make the connection to phantom islands
        (also clued by the “unreal islands” title and the ghost shape of the
        grid), islands that were at some point thought to exist but were later
        discovered to not.
      </p>

      <p>
        Each word in the islands is the name of a phantom island but is missing
        one letter that has been replaced with the number. The “missing”
        letters, taken in reading order, spell out the answer:{" "}
        <code>BATH BRICK</code>
      </p>

      <SolutionTable>
        <thead>
          <tr>
            <th>Phantom Island</th>
            <th>Letter</th>
          </tr>
        </thead>
        <tbody>
          {SolutionData.map(([url, island, letter]) => (
            <tr key={island}>
              <td>
                <a href={url}>{island}</a>
              </td>
              <td>
                <code>{letter}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </SolutionTable>
    </>
  );
};

export default Solution;
