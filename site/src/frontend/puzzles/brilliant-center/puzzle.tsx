import React from "react";
import { styled } from "styled-components";
import puzzle from "./assets/mellow-planet.pdf";

const StyledIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 8.5/11;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <StyledIframe src={puzzle} />
    </>
  );
};

export default Puzzle;
