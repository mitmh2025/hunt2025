import React from "react";
import { styled } from "styled-components";
import pdf from "./assets/do-the-manual-calculations-dont-try-monte-carlo.pdf";

const StyledIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 8.5/11;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <StyledIframe src={pdf} />
    </>
  );
};

export default Puzzle;
