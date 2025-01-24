import React from "react";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNote } from "../../components/PuzzleLayout";
import etch from "./assets/etch.svg";
import jig from "./assets/jig.svg";
import presentation from "./assets/presentation.png";
import printable from "./assets/printable.pdf";

const Puzzle = (): JSX.Element => {
  return (
    <AuthorsNote as="div">
      <p>
        During Mystery Hunt, the puzzle was presented as 30 popsicle sticks in a
        heat-sealed cellophane bag:
      </p>

      <LinkedImage
        src={presentation}
        alt="30 popsicle sticks in a
        heat-sealed cellophane bag"
      />

      <p>
        If you would like to try and solve this puzzle at home, we have a few
        options for you.
      </p>

      <p>
        The first, and likely most straightforward, is to print out{" "}
        <a href={printable} target="_blank" rel="noreferrer">
          this file
        </a>{" "}
        on paper and cut into sticks.
      </p>

      <p>
        If you would like to try for authenticity, we produced the puzzle for
        Mystery Hunt using “standard” 0.375”×4.5” wooden popsicle sticks etched
        with a lasercutter. They were held in a{" "}
        <a href={jig} target="_blank" rel="noreferrer">
          laser-cut jig
        </a>{" "}
        and then{" "}
        <a href={etch} target="_blank" rel="noreferrer">
          raster-etched
        </a>
        . The jig contains both a frame for holding the sticks and an outer
        border that can be used for repeated registration against the laser
        cutter bed, which is quite convenient should you find yourself needing
        to load and unload 125 copies of the puzzle, as many laser cutter beds
        have an ambiguous (0,0) and/or are not square to themselves. You will
        probably find that performing a full laser/raster calibration cycle will
        greatly improve print quality. Because the print is sometimes quite
        small you will need to reject any popsicle sticks with excess staining
        or knots which can obscure the letters. The SVG file is organized in
        “solved” order so we recommend removing the sticks from the jig and
        shuffling them before looking for print errors.
      </p>

      <p>
        You may need to adjust the jig to reflect the popsicle sticks you
        purchase. While popsicle sticks are nominally 0.375”×4.5”, of the 4000
        sticks encountered in fabricating this puzzle we observed that all were
        slightly under-sized. About 75% of the sticks made a “free fit” into a
        frame with 4.45” long apertures, while the rest required a 4.50”
        opening. This may seem like a small difference but in the interest of
        readability the text was enlarged as much as possible and brought right
        to the edges of the sticks — allowing too much lateral movement risks
        losing some text elements off the ends.
      </p>

      <p>
        Should you have access to a lasercutter but a shortage of patience, you
        can of course also composite the jig atop the raster image and cut the
        sticks directly out of thin sheet material, at the cost of
        verisimilitude.
      </p>
    </AuthorsNote>
  );
};

export default Puzzle;
