import React from "react";
import glass from "./assets/glass.png";

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        The hard parts of glass-making are finding the ingredients, and making
        it come out pure.
      </p>

      {/* eslint-disable-next-line jsx-a11y/alt-text -- would be spoilery */}
      <img src={glass} />
    </>
  );
};

export default Puzzle;
