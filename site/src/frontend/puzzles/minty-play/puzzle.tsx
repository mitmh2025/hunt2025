import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import cerealBox from "./assets/cereal-box.pdf";

const Puzzle = (): JSX.Element => {
  return (
    <AuthorsNoteBlock>
      <p>
        During Mystery Hunt, this puzzle was presented as an assembled cereal
        box, approximately 5⅛”×4”×2”. If you’d like to solve this puzzle at
        home, you can download{" "}
        <a href={cerealBox} target="_blank" rel="noreferrer">
          the flattened cereal box
        </a>
        , which has been shrunk slightly to fit on 8.5”×11” paper. For the best
        experience, we suggest printing in color on 110pt (or thicker)
        cardstock, although it shouldn’t be necessary to print in color (or
        print at all) in order to solve the puzzle. If you’d like to assemble
        it, you can cut along the dark brown outline, fold, and tape as
        indicated. We included two dark-colored crayons for ease of solving.
      </p>
    </AuthorsNoteBlock>
  );
};

export default Puzzle;
