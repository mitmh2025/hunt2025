import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import paper from "./assets/its-not-clear-paper.pdf";
import transparencies from "./assets/its-not-clear-transparencies.pdf";
import puzzlePSD from "./assets/its-not-clear.psd";
import puzzleXCF from "./assets/its-not-clear.xcf";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">In fact, it’s kind of muddy.</p>
      <AuthorsNoteBlock>
        <p>
          This puzzle was provided to solvers as ten transparencies and three
          sheets of paper. We additionally did 1–2 rounds of testsolving
          virtually using Photoshop or GIMP files with multiple layers, although
          our testsolvers generally found that experience to be rather tedious.
        </p>
        <p>
          We’ve included PDFs for both the{" "}
          <a href={transparencies} target="_blank" rel="noreferrer">
            transparencies
          </a>{" "}
          and the{" "}
          <a href={paper} target="_blank" rel="noreferrer">
            sheets of paper
          </a>{" "}
          if you’d like to try and produce your own copy of the puzzle. We
          recommend using a laser printer for the best saturation and results.
          We used a commercial Canon laser printer with transparencies designed
          for laser printing, although even so we ran into some issues with
          sticking and quality control. Anecdotally, we got better quality
          prints when the printer was completely cool. As with any print setup,
          babysitting and appropriate tuning may help improve quality.
        </p>
        <p>
          We’ve additionally included both{" "}
          <a href={puzzlePSD} target="_blank" rel="noreferrer">
            PSD
          </a>{" "}
          and{" "}
          <a href={puzzleXCF} target="_blank" rel="noreferrer">
            XCF
          </a>{" "}
          files if you’d like to try and solve this virtually.
        </p>
      </AuthorsNoteBlock>
    </>
  );
};

export default Puzzle;
