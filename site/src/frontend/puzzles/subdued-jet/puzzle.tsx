import React from "react";
import { styled } from "styled-components";
import { Errata } from "../../components/StyledUI";

const CenteredList = styled.ul`
  width: 100%;
  text-align: center;
  list-style-type: none;
`;

const Puzzle = () => {
  return (
    <>
      <Errata
        errata={[
          {
            timestamp: "January 19th, at 6:30 AM",
            message:
              "The alphabetized list below previously had one item out of alphabetical order. The items are now correctly sorted in alphabetical order.",
          },
        ]}
      />

      <p>
        You must be getting close to untangling Gladys’ web of business
        dealings. We received a letter from a source:
      </p>
      <blockquote>
        <p>
          Impressive work. I’m trusting you to follow the paper trails from each
          subsidiary now—at each step, one piece gets left behind. The shell
          corporations have covered their tracks too well; they won’t leave a
          trace.
        </p>

        <p>
          Once you understand the corporate structure, can you find the hidden
          pass-through company? It deals with each shell corp in exactly two
          ways. Take these records of transactions that each go through the
          hidden company once. Good luck.
        </p>

        <CenteredList>
          <li>CALIBER</li>
          <li>CLATTER</li>
          <li>KILLBUCK</li>
          <li>LOUDEST</li>
          <li>LOW HAT</li>
          <li>MASSED</li>
          <li>ON WATCH</li>
          <li>REGULATION</li>
          <li>SCORPION</li>
          <li>STILETTO</li>
        </CenteredList>
      </blockquote>
      <p className="puzzle-flavor">How should we confront Gladys?</p>
    </>
  );
};

export default Puzzle;
