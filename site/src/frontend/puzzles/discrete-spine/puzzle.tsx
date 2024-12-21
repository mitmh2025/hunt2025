import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import audio from "./assets/audio.mp3";
import captions from "./assets/captions.vtt";
import image from "./assets/image.png";

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">A change of perspective isn't automatic.</p>
      <LinkedImage
        src={image}
        alt="A handbound notebook with angular glyphs written on it with thick black lines. Some regions of the notebook are circled in blue pen. On the right-hand page of the notebook, an 8-item ordered list is scribbled using the same sort of angular glyph."
      />
      <StyledDiv>
        <audio controls src={audio}>
          <track
            label="English"
            kind="captions"
            srcLang="en"
            src={captions}
            default
          />
        </audio>
      </StyledDiv>
    </>
  );
};

export default Puzzle;
