import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image1 from "./assets/image1.png";
import image10 from "./assets/image10.png";
import image11 from "./assets/image11.png";
import image12 from "./assets/image12.png";
import image13 from "./assets/image13.png";
import image14 from "./assets/image14.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import image6 from "./assets/image6.png";
import image7 from "./assets/image7.png";
import image8 from "./assets/image8.png";
import image9 from "./assets/image9.png";

const WIDTH_UNIT = 112.5;

const SizedWrapper = styled.div<{ $margin?: number; $widthUnits: number }>`
  margin-top: ${({ $margin }) => $margin ?? 0}px;
  width: ${({ $widthUnits }) => $widthUnits * WIDTH_UNIT}px;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        Thanks for connecting me with these new colors!
      </p>
      <SizedWrapper $widthUnits={4}>
        <LinkedImage
          src={image1}
          alt="A wood-textured rectangle with an engraving and a swatch of black color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={4}>
        <LinkedImage
          src={image2}
          alt="A wood-textured rectangle with an engraving and a swatch of beige color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={3}>
        <LinkedImage
          src={image3}
          alt="A wood-textured rectangle with an engraving and a swatch of green color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={3}>
        <LinkedImage
          src={image4}
          alt="A wood-textured rectangle with an engraving and a swatch of red color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={4}>
        <LinkedImage
          src={image5}
          alt="A wood-textured rectangle with an engraving and a swatch of blue color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={5}>
        <LinkedImage
          src={image6}
          alt="A wood-textured rectangle with an engraving and a swatch of brown color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={5}>
        <LinkedImage
          src={image7}
          alt="A wood-textured rectangle with an engraving and a swatch of pink color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={4}>
        <LinkedImage
          src={image8}
          alt="A wood-textured rectangle with an engraving and a swatch of orange color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={5}>
        <LinkedImage
          src={image9}
          alt="A wood-textured rectangle with an engraving and a swatch of dark green color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={6}>
        <LinkedImage
          src={image10}
          alt="A wood-textured rectangle with an engraving and a swatch of dark blue color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={4}>
        <LinkedImage
          src={image11}
          alt="A wood-textured rectangle with an engraving and a swatch of reddish-orange color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={5}>
        <LinkedImage
          src={image12}
          alt="A wood-textured rectangle with an engraving and a swatch of gray color."
        />
      </SizedWrapper>
      <SizedWrapper $widthUnits={5}>
        <LinkedImage
          src={image13}
          alt="A wood-textured rectangle with an engraving and a swatch of yellow color."
        />
      </SizedWrapper>
      <SizedWrapper $margin={160} $widthUnits={5}>
        <LinkedImage
          src={image14}
          alt="A wood-textured rectangle with an engraving of four question marks."
        />
      </SizedWrapper>
    </>
  );
};

export default Puzzle;
