import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import jigsaw from "./assets/the-inspectre-jigsaw.svg";
import paper from "./assets/the-inspectre.pdf";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams were instructed to visit us at the Gala to
          pick up the puzzle. When they did so, they received a paper mat and a
          bag of pinkish-red transparent acrylic jigsaw pieces.{" "}
        </p>

        <p>
          The jigsaw was cut on a lasercutter from 1/16” transparent fluorescent
          red{" "}
          <a
            href="https://houstonacrylic.com/collections/1-16-acrylic/products/1-16-fluorescent-red-pink-cast-acrylic-sheet"
            target="_blank"
            rel="noreferrer"
          >
            acrylic
          </a>
          ; any thickness/shade of transparent acrylic can be used, although
          we’d recommend 1/8” or thinner and a non-clear color for keeping track
          of pieces. The SVG for the jigsaw can be found{" "}
          <a href={jigsaw} target="_blank" rel="noreferrer">
            here
          </a>
          , with cut lines in red and score lines in blue. When scaling, please
          note that the bounding box is 11.75”x18.75”. Note that this svg
          contains the fully-assembled jigsaw, but once removed from the
          lasercutter bed we don’t expect it to impact the fun or challenge of
          assembling the pieces.
        </p>

        <p>
          The underlying mat is{" "}
          <a href={paper} target="_blank" rel="noreferrer">
            here
          </a>{" "}
          and was printed on 13”x19” cardstock; if printing at home, it can be
          split into 4 letter-sized chunks and taped together carefully.
        </p>
      </AuthorsNoteBlock>
    </>
  );
};

export default Puzzle;
