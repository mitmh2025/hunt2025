import React from "react";
import { styled } from "styled-components";
import pdf from "./assets/networking-event.pdf";

const StyledIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 8.5/11;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <a href={pdf} target="_blank" rel="noreferrer">
          Direct PDF link
        </a>
      </p>
      <StyledIframe src={pdf} />
    </>
  );
};

export default Puzzle;
