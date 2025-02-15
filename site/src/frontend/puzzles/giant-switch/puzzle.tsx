import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
// Not used presentationally on the website, but included so that
// they are picked up by the assets pipeline and can be played on
// the radio.
import "./assets/rickroll.opus";
import "./assets/interrupt-891.opus";
import "./assets/interrupt-905.opus";
import "./assets/interrupt-917.opus";
import "./assets/interrupt-933.opus";
import "./assets/interrupt-965.opus";
import "./assets/interrupt-987.opus";
import "./assets/interrupt-1011.opus";
import "./assets/interrupt-1051.opus";
import "./assets/interrupt-1063.opus";
import { AuthorsNote } from "../../components/PuzzleLayout";
import { Errata } from "../../components/StyledUI";
// Used presentationally
import img1 from "./assets/img1.jpg";
import img10 from "./assets/img10.svg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";
import img7 from "./assets/img7.jpg";
import img8 from "./assets/img8.jpg";
import img9 from "./assets/img9.jpg";

const StyledImage = styled(LinkedImage)`
  display: block;
  margin-bottom: 1em;
`;

const Puzzle = () => {
  return (
    <>
      <Errata
        errata={[
          {
            timestamp: "January 19th, at 12:50 AM",
            message:
              "The sixth location pictured here is unexpectedly inaccessible this weekend.  You may be able to retrieve the relevant information from outside its basement entrance. Please do not disrupt the (non puzzle-related) occupants of this room.",
          },
        ]}
      />
      <div id="given-up-root" />
      <StyledImage src={img1} alt="A ceiling" />
      <StyledImage src={img2} alt="A ceiling" />
      <StyledImage src={img3} alt="A ceiling" />
      <StyledImage src={img4} alt="A ceiling" />
      <StyledImage src={img5} alt="A ceiling" />
      <StyledImage src={img6} alt="A ceiling" />
      <AuthorsNote>
        We apologize that the above location is unexpectedly inaccessible this
        weekend. You may be able to retrieve the relevant information from
        outside its basement entrance. Please do not disrupt the (non
        puzzle-related) occupants of this room.
      </AuthorsNote>
      <StyledImage src={img7} alt="A ceiling" />
      <StyledImage src={img8} alt="A ceiling" />
      <StyledImage src={img9} alt="A ceiling" />
      <LinkedImage
        src={img10}
        alt="A circular diagram. The top half of the circle has a semicircular band of tick marks, around which are scattered capital letters. The bottom half of the circle has a circular logo reading D&amp;M, and below that letters FM."
      />
    </>
  );
};

export default Puzzle;
