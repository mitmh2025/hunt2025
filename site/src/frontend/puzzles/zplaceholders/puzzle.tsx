import React from "react";

function puzzleF(answer: string) {
  return () => {
  return (
    <>
      Submit {answer} as the answer to this puzzle.
    </>
  );
};
}

export default puzzleF;
