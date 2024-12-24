import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image1 from "./assets/image1.png";
import image10 from "./assets/image10.png";
import image11 from "./assets/image11.png";
import image12 from "./assets/image12.png";
import image13 from "./assets/image13.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import image6 from "./assets/image6.png";
import image7 from "./assets/image7.png";
import image8 from "./assets/image8.png";
import image9 from "./assets/image9.png";

const Header = styled.div`
  margin-bottom: 1em;
  max-width: 450px;
  display: flex;
  gap: 16px;
`;

const SizedImage = styled(LinkedImage)<{ $width: number }>`
  flex: 0 0 auto;
  width: ${({ $width }) => $width}px;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  overflow-x: auto;
`;

const ALT_TEXT = "A swatch of multicolor woven fabric.";

const IMAGES = [
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Header>
        <SizedImage $width={200} src={image1} alt={ALT_TEXT} />
        <p className="puzzle-flavor">
          Suddenly you register that there is an unusual sett of fabric swatches
          in the theatre costume closet, but when you try to determine their
          background you draw a blank. Count them among the many threads you
          still need to investigate…
        </p>
      </Header>
      <FlexWrapper>
        {IMAGES.map((image, i) => (
          <SizedImage $width={500} key={i} src={image} alt={ALT_TEXT} />
        ))}
        <LinkedImage
          src={image13}
          alt="A section of multicolor woven fabric with ragged edges."
        />
      </FlexWrapper>
    </>
  );
};

export default Puzzle;
