import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import captions1 from "./assets/captions1.vtt";
import captions2 from "./assets/captions2.vtt";
import captions3 from "./assets/captions3.vtt";
import captions4 from "./assets/captions4.vtt";
import captions5 from "./assets/captions5.vtt";
import captions6 from "./assets/captions6.vtt";
import captions7 from "./assets/captions7.vtt";
import captions8 from "./assets/captions8.vtt";
import captions9 from "./assets/captions9.vtt";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import image6 from "./assets/image6.png";
import image7 from "./assets/image7.png";
import image8 from "./assets/image8.png";
import image9 from "./assets/image9.png";
import track1 from "./assets/track1.mp3";
import track2 from "./assets/track2.mp3";
import track3 from "./assets/track3.mp3";
import track4 from "./assets/track4.mp3";
import track5 from "./assets/track5.mp3";
import track6 from "./assets/track6.mp3";
import track7 from "./assets/track7.mp3";
import track8 from "./assets/track8.mp3";
import track9 from "./assets/track9.mp3";

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Scroller = styled.div`
  width: 900px;
`;

const Row = styled.div`
  display: flex;
  align-items: top;
  gap: 16px;
  &:last-child {
    margin-bottom: 16px;
  }
`;

const AudioWrapper = styled.span`
  padding-top: 16px;
`;

const SizedImage = styled(LinkedImage)<{
  $paddingTop?: number;
  $paddingBottom?: number;
}>`
  flex-basis: 75%;
  padding-top: ${({ $paddingTop }) => $paddingTop ?? 16}px;
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom ?? 16}px;
  background-color: white;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Scroller>
          <Row>
            <AudioWrapper>
              <audio controls src={track1}>
                <track default kind="captions" srcLang="en" src={captions1} />
              </audio>
            </AudioWrapper>
            <SizedImage
              $paddingTop={31}
              src={image1}
              alt="A musical staff. On the staff itself are five circles, the fourth of which is outlined in red instead of black, with a number 16 inside. There are ten circles below the staff, in a group of four and a group of six. In the group of six, the second and third circles are outlined in red instead of black, and have numbers 3 and 21 inside them respectively."
            />
          </Row>
          <Row>
            <AudioWrapper>
              <audio controls src={track2}>
                <track default kind="captions" srcLang="en" src={captions2} />
              </audio>
            </AudioWrapper>
            <SizedImage
              src={image2}
              alt="A musical staff. On the staff itself are ten circles, the sixth of which is outlined in red instead of black, with a number 5 inside. There are five circles below the staff, the second of which is outlined in red instead of black, with a number 13 inside."
            />
          </Row>
          <Row>
            <AudioWrapper>
              <audio controls src={track3}>
                <track default kind="captions" srcLang="en" src={captions3} />
              </audio>
            </AudioWrapper>
            <SizedImage
              src={image3}
              alt="A musical staff. On the staff itself are five circles, the third of which is outlined in red instead of black, with a number 22 inside. There are three circles below the staff, the first of which is outlined in red instead of black, with a number 20 inside."
            />
          </Row>
          <Row>
            <AudioWrapper>
              <audio controls src={track4}>
                <track default kind="captions" srcLang="en" src={captions4} />
              </audio>
            </AudioWrapper>
            <SizedImage
              src={image4}
              alt="A musical staff. On the staff itself are eleven circles, in a gropu of four and a group of seven. In the group of seven, the second circle is outlined in red instead of black, with a number 12 inside. There are seven circles below the staff, the second and fourth of which are outlined in red instead of black, and have numbers 8 and 14 inside them respectively."
            />
          </Row>
          <Row>
            <AudioWrapper>
              <audio controls src={track5}>
                <track default kind="captions" srcLang="en" src={captions5} />
              </audio>
            </AudioWrapper>
            <SizedImage
              src={image5}
              alt="A musical staff. On the staff itself are five circles, the fourth of which is outlined in red instead of black, with a number 6 inside. There are four circles below the staff, the first of which is outlined in red instead of black, with a number 15 instide."
            />
          </Row>
          <Row>
            <AudioWrapper>
              <audio controls src={track6}>
                <track default kind="captions" srcLang="en" src={captions6} />
              </audio>
            </AudioWrapper>
            <SizedImage
              src={image6}
              alt="A musicla staff. On the staff itself are seven circles, the third of which is outlined in red instead of black, with a number 19 inside. There are eight circles below the staff, in a group of five and a group of three. In the group of five, the third circle is outlined in red instead of black, with a number 17 inside. In the group of three, the second circle is outlined in red instead of black, with a number 9 inside."
            />
          </Row>
          <Row>
            <AudioWrapper>
              <audio controls src={track7}>
                <track default kind="captions" srcLang="en" src={captions7} />
              </audio>
            </AudioWrapper>
            <SizedImage
              src={image7}
              alt="A musical staff. On the staff itself are seven circles, the fifth of which is outlined in red instead of black, with a number 11 inside. There are three circles below the staff, the first of which is outlined in red instad of black, with a number 10 inside."
            />
          </Row>
          <Row>
            <AudioWrapper>
              <audio controls src={track8}>
                <track default kind="captions" srcLang="en" src={captions8} />
              </audio>
            </AudioWrapper>
            <SizedImage
              src={image8}
              alt="A musical staff. On the staff itself are seven circles, the second of which is outlined in red instead of black, with a number 2 inside. There are five circles below the staff, the first of which is outlined in red instead of black, with a number 7 inside."
            />
          </Row>
          <Row>
            <AudioWrapper>
              <audio controls src={track9}>
                <track default kind="captions" srcLang="en" src={captions9} />
              </audio>
            </AudioWrapper>
            <SizedImage
              $paddingBottom={32}
              src={image9}
              alt="A musical staff. On the staff itself are six circles, the second of which is outlined in red instead of black, with a number 1 inside. There are five circles below the staff, the first and fourth of which are outlined in red instead of black, with numbers 4 and 18 inside them respectively."
            />
          </Row>
        </Scroller>
      </Wrapper>
    </>
  );
};

export default Puzzle;
