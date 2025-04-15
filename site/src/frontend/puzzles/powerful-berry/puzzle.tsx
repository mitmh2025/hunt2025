import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import rootUrl from "../../utils/rootUrl";
import rope from "./assets/rope.jpg";

const StyledImage = styled(LinkedImage)`
  & img {
    max-width: 450px;
  }
`;

const Puzzle = () => {
  return (
    <>
      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams were instructed to visit the Gala to pick
          up their copy of this puzzle. When they did so, they received a very
          long ribbon tangled up in a zipper lock bag with 19 paper tags
          attached to it at uneven intervals.
        </p>

        <p>
          <center>
            <StyledImage
              src={rope}
              alt="A long ribbon stretched out along the hallway of building 16."
            />
            <br />
            <em>A team begins to untangle their Celestial Rope</em>
          </center>
        </p>

        <p>
          If you’d like to solve this puzzle, we have created a{" "}
          <a
            href={`${rootUrl}/virtual_ribbon`}
            target="_blank"
            rel="noopener noreferrer"
          >
            virtual ribbon
          </a>{" "}
          as an alternative.
        </p>
      </AuthorsNoteBlock>

      <div>
        <div>(1 1 4 9 3)</div>
        <div>(3 4 5 5)</div>
        <div>(7 8 14)</div>
        <div>(8 3)</div>
        <div>(3 6 10 13 6 7)</div>
        <div>(7 15)</div>
        <div>(5 7 6)</div>
        <div>(3 7 5 6 3)</div>
        <div>(10 7)</div>
      </div>
    </>
  );
};

export default Puzzle;
