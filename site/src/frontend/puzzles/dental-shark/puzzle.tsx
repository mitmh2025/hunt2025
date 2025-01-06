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
        You walk around, starting at local attractions and leaving a print with
        each step, keeping an eye on where your steps overlap. How can you learn
        what Katrina was up to at the Boardwalk?
      </p>
    </>
  );
};

export default Puzzle;
