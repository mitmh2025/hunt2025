import React from "react";
import { ArchivalNotice } from "../../components/PuzzleLayout";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <ArchivalNotice />

      <p className="puzzle-flavor">
        We cordially invite you to examine MoMH—the Museum of Mystery
        Hunt—currently on display at the Gala.
      </p>
    </>
  );
};

export default Puzzle;
