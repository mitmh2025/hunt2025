import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNote } from "../../components/PuzzleLayout";
import pieces1 from "./assets/pieces1.svg";
import pieces2 from "./assets/pieces2.svg";
import pieces3 from "./assets/pieces3.svg";
import pieces4 from "./assets/pieces4.svg";
import pieces5 from "./assets/pieces5.svg";
import allpieces from "./assets/puzzlepieces.pdf";

const StyledImage = styled(LinkedImage)`
  display: block;
  @media screen {
    overflow: hidden;

    img {
      margin: -5% 0 -10% 0;
    }
  }
`;

const FinalImage = styled(StyledImage)`
  @media screen {
    img {
      margin-bottom: -60%;
      width: 100%;
    }
  }
`;

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
      <StyledImage src={pieces1} alt="Puzzle pieces with words" />
      <StyledImage src={pieces2} alt="Puzzle pieces with words" />
      <StyledImage src={pieces3} alt="Puzzle pieces with words" />
      <StyledImage src={pieces4} alt="Puzzle pieces with words" />
      <FinalImage src={pieces5} alt="Puzzle pieces with words" />
    </>
  );
};

export default Puzzle;
