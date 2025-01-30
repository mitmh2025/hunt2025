import React from "react";
import { Math, MI } from "../../../components/MathML";
import { AuthorsNoteBlock } from "../../../components/PuzzleLayout";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">You thought one was enough? It takes two.</p>
      <AuthorsNoteBlock>
        <p>
          Successfully performing this task will not give you an answer used in
          any metapuzzle. Instead, you will receive one Key 🗝️.
        </p>
        <p>
          Judging will occur at the Gala. When you are ready for your spotlight
          performance, come to the Gala and find a member of the Press.
        </p>
      </AuthorsNoteBlock>
      <p>
        You will need to play a song on your radio, as a duet with another team.
        Your radio must be tuned to station{" "}
        <Math>
          <MI>π</MI>
        </Math>
        . The choice of song is yours.
      </p>
    </>
  );
};

export default Puzzle;
