import React from "react";
import { AuthorsNote } from "../../components/PuzzleLayout";

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        You’ve spotted Katrina at suspicious locations around Chinatown, and
        you’ve taken the traditional photos as evidence. But photos aren’t
        enough—get out there and find what she left at the dead drops!
      </p>

      <p className="puzzle-flavor">
        How should we let Katrina know we’re onto her?
      </p>

      <noscript>
        <AuthorsNote>
          This puzzle required teams to visit locations around campus. There is
          an alternative version of this puzzle that can be completed virtually,
          but which requires Javascript to be enabled.
        </AuthorsNote>
      </noscript>

      <div id="chinatown-root" />
    </>
  );
};

export default Puzzle;
