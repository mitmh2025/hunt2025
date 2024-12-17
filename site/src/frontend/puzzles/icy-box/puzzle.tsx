import React from "react";
import { styled } from "styled-components";
import { CaveatFont } from "../../assets/SharedFonts";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import paper from "./assets/paper.jpg";

const FontWrapper = styled.div`
  font-family: "Caveat";
  font-size: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Paper = styled.img`
  width: 100%;
`;

const StyledImage = styled.img<{ $left: number; $top: number }>`
  width: 15%;
  position: absolute;
  left: ${({ $left }) => $left}%;
  top: ${({ $top }) => $top}%;
`;

const PositionedText = styled.div<{ $left: number; $top: number }>`
  position: absolute;
  left: ${({ $left }) => $left}%;
  top: ${({ $top }) => $top}%;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <CaveatFont />
      <Wrapper>
        <Paper
          src={paper}
          alt="An old piece of paper thas has been crumpled and straightened out."
        />
        <StyledImage $left={10} $top={12} src={image1} alt="A squiggly line." />
        <StyledImage $left={10} $top={24} src={image2} alt="A squiggly line." />
        <StyledImage $left={10} $top={36} src={image3} alt="A squiggly line." />
        <StyledImage $left={10} $top={48} src={image4} alt="A squiggly line." />
        <StyledImage $left={10} $top={60} src={image5} alt="A squiggly line." />
        <PositionedText $left={85} $top={4}>
          <FontWrapper>7/1/87</FontWrapper>
        </PositionedText>
        <PositionedText $left={30} $top={30}>
          <FontWrapper>
            <div>Ms. Bennett—</div>
            <div>
              Listen for the clues. The War Department will provide the signals.
            </div>
            <div>Look for either first or last names.</div>
            <div>I’m retiring after this last transmission.</div>
            <div>Please keep this note safely hidden in the dress.</div>
          </FontWrapper>
        </PositionedText>
      </Wrapper>
    </>
  );
};

export default Puzzle;
