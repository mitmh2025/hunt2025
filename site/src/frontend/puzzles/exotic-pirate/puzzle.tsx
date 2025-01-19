import React from "react";
import { styled } from "styled-components";
import Blanks from "../../components/Blanks";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import imgDots from "./assets/dots.png";
import img1 from "./assets/image1.jpg";
import img10 from "./assets/image10.jpg";
import img11 from "./assets/image11.jpg";
import img12 from "./assets/image12.jpg";
import img13 from "./assets/image13.jpg";
import img14 from "./assets/image14.jpg";
import img15 from "./assets/image15.jpg";
import img16 from "./assets/image16.jpg";
import img17 from "./assets/image17.jpg";
import img18 from "./assets/image18.jpg";
import img19 from "./assets/image19.jpg";
import img2 from "./assets/image2.jpg";
import img20 from "./assets/image20.jpg";
import img21 from "./assets/image21.jpg";
import img22 from "./assets/image22.jpg";
import img23 from "./assets/image23.jpg";
import img24 from "./assets/image24.jpg";
import img25 from "./assets/image25.jpg";
import img26 from "./assets/image26.jpg";
import img27 from "./assets/image27.jpg";
import img28 from "./assets/image28.jpg";
import img29 from "./assets/image29.jpg";
import img3 from "./assets/image3.jpg";
import img30 from "./assets/image30.jpg";
import img31 from "./assets/image31.jpg";
import img32 from "./assets/image32.jpg";
import img33 from "./assets/image33.jpg";
import img34 from "./assets/image34.jpg";
import img35 from "./assets/image35.jpg";
import img36 from "./assets/image36.jpg";
import img37 from "./assets/image37.jpg";
import img38 from "./assets/image38.jpg";
import img39 from "./assets/image39.jpg";
import img4 from "./assets/image4.jpg";
import img40 from "./assets/image40.jpg";
import img41 from "./assets/image41.jpg";
import img42 from "./assets/image42.jpg";
import img43 from "./assets/image43.jpg";
import img44 from "./assets/image44.jpg";
import img46 from "./assets/image46.jpg";
import img47 from "./assets/image47.jpg";
import img48 from "./assets/image48.jpg";
import img49 from "./assets/image49.jpg";
import img5 from "./assets/image5.jpg";
import img50 from "./assets/image50.jpg";
import img51 from "./assets/image51.jpg";
import img52 from "./assets/image52.jpg";
import img53 from "./assets/image53.jpg";
import img54 from "./assets/image54.jpg";
import img6 from "./assets/image6.jpg";
import img7 from "./assets/image7.jpg";
import img8 from "./assets/image8.jpg";
import img9 from "./assets/image9.jpg";

export const orderedImages = [
  img53,
  img47,
  img11,
  img19,
  img29,
  img5,
  img20,
  img36,
  img27,
  img37,
  img41,
  img13,
  img4,
  img22,
  img8,
  img12,
  img51,
  img23,
  img6,
  img16,
  img50,
  img54,
  img48,
  img3,
  img9,
  img34,
  img42,
  img26,
  img32,
  img30,
  img33,
  img10,
  img1,
  img43,
  img7,
  img52,
  img17,
  img31,
  img49,
  img25,
  img21,
  img24,
  img18,
  img38,
  img28,
  img15,
  img40,
  img46,
  img2,
  img44,
  img35,
  img39,
  img14,
];

const StyledTD = styled.td`
  border: 1px solid black;
  padding: 1rem;
  text-align: center;

  a {
    display: flex;
  }
`;

const StyledLinkedImage = styled(LinkedImage)`
  img {
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: inherit;
  }
`;

const AnswerBlanks = styled.p`
  font-size: 22pt;
  text-align: center;
`;

const ClueTable = styled.table`
  border-collapse: collapse;
  margin-top: 2rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
`;

const ClueBlock = (index: number) => {
  return (
    <>
      <StyledTD>{index + 1}</StyledTD>
      <StyledTD>
        <img src={orderedImages[index] ?? ""} alt="" />
      </StyledTD>
    </>
  );
};

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        It looks like the winner’s circle has gotten jumbled, but with some
        careful sorting, the right arrangement should emerge!
      </p>
      <StyledLinkedImage src={imgDots} alt="A connect-the-dots style puzzle" />
      <ClueTable>
        {orderedImages.map((_, index) => {
          if (index % 4 === 0) {
            return (
              <tr key={index}>
                {ClueBlock(index)}
                {orderedImages[index + 1] && ClueBlock(index + 1)}
                {orderedImages[index + 2] && ClueBlock(index + 2)}
                {orderedImages[index + 3] && ClueBlock(index + 3)}
              </tr>
            );
          }
          return null;
        })}
      </ClueTable>
      <Blanks
        className={COPY_ONLY_CLASS}
        structure={["_", "_", "_", "_", "", "_", "_", "_", "_", "_", "_"]}
      />
      <AnswerBlanks className={NO_COPY_CLASS}>
        _ _ _ _ &nbsp; _ _ _ _ _ _
      </AnswerBlanks>
    </>
  );
};

export default Puzzle;
