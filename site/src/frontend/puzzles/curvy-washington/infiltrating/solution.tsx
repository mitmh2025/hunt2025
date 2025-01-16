import React from "react";
import { PuzzleAnswer } from "../../../components/StyledUI";

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This was a scavenger hunt. If the judges determined a team had earned
        sufficient street cred, they were told to call in{" "}
        <PuzzleAnswer>MISCHIEF MANAGED</PuzzleAnswer>, which awarded them a 🔍
        Clue (free answer).
      </p>
    </>
  );
};

export default Solution;
