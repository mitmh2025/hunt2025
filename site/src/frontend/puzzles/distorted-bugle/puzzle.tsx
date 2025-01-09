import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import pieces1 from "./assets/pieces1.svg";
import pieces2 from "./assets/pieces2.svg";
import pieces3 from "./assets/pieces3.svg";
import pieces4 from "./assets/pieces4.svg";
import pieces5 from "./assets/pieces5.svg";
import allpieces from "./assets/puzzlepieces.pdf";

const StyledImage = styled(LinkedImage)`
  display: block;
  img {
    margin: -10% 0;

    @media print {
      margin: auto;
    }
  }
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        A printable version can be found{" "}
        <a href={allpieces} target="_blank" rel="noreferrer">
          here
        </a>
        .
      </p>
      <ul>
        <li>Rectangular</li>
        <li>No empty spaces</li>
        <li>No rotations or reflections</li>
      </ul>
      <StyledImage src={pieces1} alt="Puzzle pieces with words" />
      <StyledImage src={pieces2} alt="Puzzle pieces with words" />
      <StyledImage src={pieces3} alt="Puzzle pieces with words" />
      <StyledImage src={pieces4} alt="Puzzle pieces with words" />
      <StyledImage src={pieces5} alt="Puzzle pieces with words" />
    </>
  );
};

export default Puzzle;
