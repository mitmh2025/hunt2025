import React from "react";
import { AuthorsNote } from "../../components/PuzzleLayout";

const Puzzle = () => {
  return (
    <>
      <AuthorsNote>
        Editors’ Note: This is a “metapuzzle”, a puzzle that uses the answers
        from other puzzles as inputs. To solve it, you’ll need to determine what
        answers in the round are used as inputs, and how to use them together to
        find another answer. Many metapuzzles, including most in this Hunt, will
        not have these notes to label them. Sometimes that’s part of the fun!
      </AuthorsNote>
      <p className="puzzle-flavor">
        As you pass many shady characters in the art gallery, you ponder how to
        supplement your understanding of Papa’s actions.
      </p>
    </>
  );
};

export default Puzzle;
