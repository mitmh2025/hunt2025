import React from "react";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNote } from "../../components/PuzzleLayout";
import pieces1 from "./assets/pieces1.svg";
import pieces2 from "./assets/pieces2.svg";
import pieces3 from "./assets/pieces3.svg";
import pieces4 from "./assets/pieces4.svg";
import pieces5 from "./assets/pieces5.svg";
import allpieces from "./assets/puzzlepieces.pdf";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <ul>
        <li>Rectangular</li>
        <li>No empty spaces</li>
        <li>No rotations or reflections</li>
      </ul>
      <AuthorsNote>
        Author’s note: a printable version of these images can be found{" "}
        <a href={allpieces} target="_blank" rel="noreferrer">
          here
        </a>
        .
      </AuthorsNote>
      <LinkedImage src={pieces1} alt="Puzzle pieces with words" />
      <LinkedImage src={pieces2} alt="Puzzle pieces with words" />
      <LinkedImage src={pieces3} alt="Puzzle pieces with words" />
      <LinkedImage src={pieces4} alt="Puzzle pieces with words" />
      <LinkedImage src={pieces5} alt="Puzzle pieces with words" />
    </>
  );
};

export default Puzzle;
