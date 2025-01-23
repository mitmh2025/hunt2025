import React from "react";
import { AuthorsNote } from "../../components/PuzzleLayout";
import model_3mf from "./assets/rings-with-detentes-postsolve.3mf";
import model_stl from "./assets/rings-with-detentes-postsolve.stl";
import pdf_sticker from "./assets/rod-sticker.pdf";

const Puzzle = () => {
  return (
    <AuthorsNote as="div">
      <p>
        During Mystery Hunt, teams were instructed to visit us at the Gala to
        pick up the puzzle. When they did so, they received a zipper lock bag
        containing 45 small 3D-printed pieces and a 12” long, ¾” diameter wooden
        dowel with a sticker on it.
      </p>

      <p>
        If you’d like to solve this puzzle for yourself, you can find the
        sticker for the dowel{" "}
        <a href={pdf_sticker} target="_blank" rel="noreferrer">
          here
        </a>{" "}
        and the source file for the 3D printed pieces{" "}
        <a href={model_3mf} target="_blank" rel="noreferrer">
          here
        </a>{" "}
        (in 3MF format) or{" "}
        <a href={model_stl} target="_blank" rel="noreferrer">
          here
        </a>{" "}
        (in STL format). Note that the sticker is intended to be printed on A4
        (not letter) sized paper; be careful of scaling. For Hunt, the puzzle
        was printed using Hatchbox’s{" "}
        <a
          href="https://www.hatchbox3d.com/collections/pla-1-75mm/products/3d-pla-1kg1-75-shny-brnz"
          target="_blank"
          rel="noreferrer"
        >
          metallic finish bronze PLA filament
        </a>
        . It should be solvable with any material, but it may be more difficult
        to see fine details with white or black. The 3MF file also reflects the
        settings we used for printing the puzzle using a Bambu X1-series
        printer. These settings were primarily chosen to improve the surface
        finish and lustre of the finished prints, but should not be necessary
        for solving, and you may need to make adjustments for different
        printers. We recommend printing with supports enabled for the best
        solving experience, although they are not strictly necessary.
      </p>

      <p>
        You can also find the OnShape file used to produce the puzzle{" "}
        <a
          href="https://cad.onshape.com/documents/d96dc5539b37502e00e55df7/w/07d99548c15b394bb3432926/e/0d9a17b6d1c7aa63c71d6fb7?renderMode=0&uiState=678fedb86da0a13e5ad260e4"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        , although that will spoil some steps of the puzzle.
      </p>
    </AuthorsNote>
  );
};

export default Puzzle;
