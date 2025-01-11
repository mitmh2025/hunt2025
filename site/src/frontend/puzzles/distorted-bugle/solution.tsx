import React from "react";
import LinkedImage from "../../components/LinkedImage";
import { PuzzleAnswer } from "../../components/StyledUI";
import imgsolved from "./assets/solution-assembled.svg";

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The pieces can be assembled as an edge-to-face assembly puzzle so that
        the property described on the edge of a piece matches the face word of
        the piece that is adjacent along that edge.
      </p>
      <p>
        The properties along the outer edge of the fully assembled rectangle are
        unused in the initial assembly. These properties on each long edge can
        be taken together to uniquely determine the words STARTS, GHOST, LEG,
        and ENDS.
      </p>
      <p>
        This suggests considering the piece edges within the rectangle as a{" "}
        <a
          href="https://en.wikipedia.org/wiki/Ghost_leg"
          target="_blank"
          rel="noreferrer"
        >
          ghost leg
        </a>{" "}
        diagram. The ghost leg diagram has 7 paths. Considering each path in
        turn, the properties that border that path can be used to determine a
        unique word. These words are POUND, INTESTINE, NATURAL, EAR, WICKED,
        OMEGA, and OLD. Considering the starts and ends of these words from left
        to right (using the starts in the order of the words at the top and the
        ends of the words in the order of the words at the bottom) spells the
        answer <PuzzleAnswer>PINEWOOD LADDER</PuzzleAnswer>.
      </p>
      <LinkedImage src={imgsolved} alt="Solved puzzle" />
    </>
  );
};

export default Solution;
