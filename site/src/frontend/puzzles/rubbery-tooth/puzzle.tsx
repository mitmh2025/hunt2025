import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import gridPrint from "./assets/grid-print.pdf";
import imagesPrint from "./assets/images-print.pdf";
import presentation from "./assets/presentation.jpg";
import tagsPrint from "./assets/tags-print.pdf";
import tagsTiled from "./assets/tags-tiled.svg";

const SizedLinkedImage = styled(LinkedImage)`
  & img {
    max-width: 50%;
  }
`;

const Puzzle = (): JSX.Element => {
  return (
    <AuthorsNoteBlock>
      <p>
        During Mystery Hunt, this puzzle was presented as a plastic bag fastened
        by 4 bread tags and containing 14 pieces of paper:
      </p>

      <SizedLinkedImage
        src={presentation}
        alt="A plastic bag containing 14 pieces of paper and fastened with 4 bread tags"
      />

      <p>
        If you’d like to solve this puzzle at home, you can print out a copy of
        the{" "}
        <a href={tagsPrint} target="_blank" rel="noreferrer">
          tags
        </a>
        ,{" "}
        <a href={imagesPrint} target="_blank" rel="noreferrer">
          images
        </a>
        , and{" "}
        <a href={gridPrint} target="_blank" rel="noreferrer">
          grid
        </a>
        . The tags should be cut on their red outlines and the 13 images should
        be cut along the black lines. The scale of the various components is
        relevant to the puzzle, and these PDF files are all designed to fill a
        sheet of 8.5”×11” paper, so make sure they do not get scaled down when
        printing.
      </p>

      <p>
        For Mystery Hunt, the images and grid were printed on approximately
        100lb cardstock. The grid was cut into a 8.5”×8.5” square (with 0.5”
        borders) and folded flat into quarters. The tags were lasercut from{" "}
        <a
          href="https://modifiedsupply.com/products/gemini-duets-laser-xt-engraving-plastic-purple-white"
          target="_blank"
          rel="noreferrer"
        >
          1/16” two-color engraving plastic
        </a>{" "}
        (green lines are engraved and red lines are cut). All cardstock
        materials were then put into{" "}
        <a
          href="https://www.amazon.com/dp/B08LQBC5XK"
          target="_blank"
          rel="noreferrer"
        >
          plastic bags
        </a>{" "}
        and closed off with the tags. (Alternatively, if you’d like to
        mass-manufacture the puzzle, you can use{" "}
        <a href={tagsTiled} target="_blank" rel="noreferrer">
          this pre-tiled file
        </a>{" "}
        for lasercutting.)
      </p>
    </AuthorsNoteBlock>
  );
};

export default Puzzle;
