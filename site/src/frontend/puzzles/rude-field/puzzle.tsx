import React from "react";
import { ArchivalNotice } from "../../components/PuzzleLayout";

const Puzzle = () => {
  return (
    <>
      <ArchivalNotice />

      <p className="puzzle-flavor">
        You’ve spotted Katrina at suspicious locations around Chinatown, and
        you’ve taken the traditional photos as evidence. But photos aren’t
        enough—get out there and find what she left at the dead drops!
      </p>

      <p className="puzzle-flavor">
        How should we let Katrina know we’re onto her?
      </p>
    </>
  );
};

export default Puzzle;
