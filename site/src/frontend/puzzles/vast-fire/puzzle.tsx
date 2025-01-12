import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import captions from "./assets/captions.vtt";
import cobraBow from "./assets/cobra_bow.mp4";
import fakeMike from "./assets/fake_mike.png";

const ImageWrapper = styled.div`
  width: 75%;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">“Hey, Vig? What key are we in?”</p>
      <p>Sheet music:</p>
      <ImageWrapper>
        <LinkedImage src={fakeMike} alt="Sheet music with slashes" />
      </ImageWrapper>
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
