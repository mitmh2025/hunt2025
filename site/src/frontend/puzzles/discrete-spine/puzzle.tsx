import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import audio from "./assets/audio.mp3";
import captions from "./assets/captions.vtt";
import image from "./assets/image.png";

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TallFlexWrapper = styled(FlexWrapper)`
  height: 150px;
`;

const FixedSizeDiv = styled.div`
  width: 160px;
  flex: 0 0;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">A change of perspective isn’t automatic.</p>
      <LinkedImage
        src={image}
        alt="A handbound notebook with angular glyphs written on it with thick black lines. Some regions of the notebook are circled in blue pen. On the right-hand page of the notebook, an 8-item ordered list is scribbled using the same sort of angular glyph."
      />
      <TallFlexWrapper>
        <audio controls src={audio}>
          <track
            label="English"
            kind="captions"
            srcLang="en"
            src={captions}
            default
          />
        </audio>
        <FixedSizeDiv>
          <details>
            <summary>Audio transcript</summary>
            <FlexWrapper>ɹiʧaɪleɪ zeɪpu lənɔr vɜr</FlexWrapper>
          </details>
        </FixedSizeDiv>
      </TallFlexWrapper>
    </>
  );
};

export default Puzzle;
