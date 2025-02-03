import React from "react";
import { PuzzleAnswer } from "../../../components/StyledUI";
import rootUrl from "../../../utils/rootUrl";

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Upon successfully performing a the Star-Spangled Banner{" "}
        <a href={`${rootUrl}/puzzles/songs_on_the_radio/solution`}>
          on their radios
        </a>
        , teams were told to call in{" "}
        <PuzzleAnswer>A TRUE VIRTUOSO</PuzzleAnswer>, which rewarded them with a
        Key 🗝️.
      </p>
    </>
  );
};

export default Solution;
