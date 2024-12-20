import React from "react";
import pdf from "./assets/engagements-and-other-crimes.pdf";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        Once you find your soulmate you’ll do whatever it takes to be together,
        but that doesn’t mean it will be easy; there’s no one telling you which
        way to go or in what order to go about things.
      </p>
      <p>
        You should have kept your invitation as a keepsake! If you need another,
        stop by the gala any time. Alternatively, click{" "}
        <a href={pdf} target="_blank" rel="noreferrer">
          here
        </a>
        , print double-sided (the front and back should line up), and cut out
        using the trim lines provided.
      </p>
    </>
  );
};

export default Puzzle;
