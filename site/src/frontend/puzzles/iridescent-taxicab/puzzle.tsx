import React from "react";
import { ArchivalNotice, AuthorsNote } from "../../components/PuzzleLayout";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <ArchivalNotice />
      <AuthorsNote>
        Please contact HQ to schedule a judging for the Infinite Scavenger Hunt
        by calling (617)-324-7732.
      </AuthorsNote>
    </>
  );
};

export default Puzzle;
