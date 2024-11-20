import React from "react";
import { styled } from "styled-components";
import captions from "./assets/captions.vtt";
import cobraBow from "./assets/cobra_bow.mp4";
import fakeMike from "./assets/fake_mike.pdf";

const StyledIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 8.5/11;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">“Hey, Vig? What key are we in?”</p>
      <p>
        Sheet music (<a href={fakeMike}>PDF Link</a>):
      </p>
      <StyledIframe src={fakeMike} />
      <p>Video tutorial:</p>
      <video width={440} controls>
        <source src={cobraBow} type="video/mp4" />
        <track
          label="English"
          kind="captions"
          srcLang="en"
          src={captions}
          default
        />
      </video>
    </>
  );
};

export default Puzzle;
