import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import genogram1 from "./assets/genogram1.png";
import genogram2 from "./assets/genogram2.png";
import genogram3 from "./assets/genogram3.png";
import genogram4 from "./assets/genogram4.png";
import genogram5 from "./assets/genogram5.png";
import genogram6 from "./assets/genogram6.png";
import grid1 from "./assets/grid1.png";
import grid10 from "./assets/grid10.png";
import grid11 from "./assets/grid11.png";
import grid12 from "./assets/grid12.png";
import grid13 from "./assets/grid13.png";
import grid14 from "./assets/grid14.png";
import grid15 from "./assets/grid15.png";
import grid2 from "./assets/grid2.png";
import grid3 from "./assets/grid3.png";
import grid4 from "./assets/grid4.png";
import grid5 from "./assets/grid5.png";
import grid6 from "./assets/grid6.png";
import grid7 from "./assets/grid7.png";
import grid8 from "./assets/grid8.png";
import grid9 from "./assets/grid9.png";

const ImageWrapper = styled.div`
  margin: 3em 0;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        Sometimes she recycles names, other times dresses. Sometimes she hands
        them down to someone else, but that’s another story.
      </p>
      <ImageWrapper>
        <LinkedImage src={genogram1} alt="A genogram" />
      </ImageWrapper>
      <ImageWrapper>
        <LinkedImage src={genogram2} alt="A genogram" />
      </ImageWrapper>
      <ImageWrapper>
        <LinkedImage src={genogram3} alt="A genogram" />
      </ImageWrapper>
      <ImageWrapper>
        <LinkedImage src={genogram4} alt="A genogram" />
      </ImageWrapper>
      <ImageWrapper>
        <LinkedImage src={genogram5} alt="A genogram" />
      </ImageWrapper>
      <ImageWrapper>
        <LinkedImage src={genogram6} alt="A genogram" />
      </ImageWrapper>
      <p>Enter names left to right, top to bottom.</p>
      <FlexWrapper>
        <img
          src={grid1}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid2}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid3}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid4}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid5}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid6}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid7}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid8}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid9}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid10}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid11}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid12}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid13}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid14}
          alt="Cropped photo of a fabric garment, with a grid overlaid."
        />
        <img
          src={grid15}
          alt="The outline of a dress, with a large grid overlaid."
        />
      </FlexWrapper>
    </>
  );
};

export default Puzzle;
