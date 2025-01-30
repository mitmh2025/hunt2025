import React from "react";
import rootUrl from "../../utils/rootUrl";
const Puzzle = () => {
  return (
    <>
      <a
        target="_blank"
        href={`${rootUrl}/puzzles/_land/fullscreen`}
        rel="noreferrer"
      >
        View puzzle (opens in a new tab)
      </a>
    </>
  );
};

export default Puzzle;
