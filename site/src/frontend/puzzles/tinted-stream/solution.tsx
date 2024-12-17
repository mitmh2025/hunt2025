import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import genogram1 from "./assets/solution-genogram1.png";
import genogram2 from "./assets/solution-genogram2.png";
import genogram3 from "./assets/solution-genogram3.png";
import genogram4 from "./assets/solution-genogram4.png";
import genogram5 from "./assets/solution-genogram5.png";
import genogram6 from "./assets/solution-genogram6.png";
import grid1 from "./assets/solution-grid1.png";
import grid10 from "./assets/solution-grid10.png";
import grid11 from "./assets/solution-grid11.png";
import grid12 from "./assets/solution-grid12.png";
import grid13 from "./assets/solution-grid13.png";
import grid14 from "./assets/solution-grid14.png";
import grid15 from "./assets/solution-grid15.png";
import grid2 from "./assets/solution-grid2.png";
import grid3 from "./assets/solution-grid3.png";
import grid4 from "./assets/solution-grid4.png";
import grid5 from "./assets/solution-grid5.png";
import grid6 from "./assets/solution-grid6.png";
import grid7 from "./assets/solution-grid7.png";
import grid8 from "./assets/solution-grid8.png";
import grid9 from "./assets/solution-grid9.png";

const Mono = styled.span`
  font-family: monospace;
`;

const ImageWrapper = styled.div`
  margin: 3em 0;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Six unlabeled genograms (or Jane-ograms!) describe the webs of
        relationships in the six novels of Jane Austen (as of the end of each
        novel). Solvers must recognize the relationships and identify each
        character. Genograms are presented in alphabetical order by novel. Some
        icons are filled with 1-2 costume details.
      </p>
      <p>
        Below are 14 “patches” which give a wider view of a costume detail from
        the genograms and a grid patchwork shape. Each patch can be matched to
        two characters from the genograms. With some internet research and the
        help of{" "}
        <a
          href="https://recycledmoviecostumes.com"
          target="_blank"
          rel="noreferrer"
        >
          Recycled Movie Costumes
        </a>{" "}
        (or similar websites), solvers will discover that the BBC and other
        period drama productions often use the same costumes in different
        productions. For instance, a green pelisse worn by Amanda Hale as Mary
        Musgrove in the 2007 adaptation of Persuasion was worn the next year by
        Daisy Haggard as Anne Steele in the 2008 Sense and Sensibility. The icon
        for Mary Musgrove on the Persuasion genogram and the icon for Anne
        Steele in the Sense and Sensibility genogram are both filled with a
        detail from this costume. Solvers can use the larger images to help find
        the correct costume. Each costume was also worn in a non-Austen
        production, by a character whose name fits into the grid on the image
        (in this case, SELINA from Mr. Malcolm’s List, 2022). Patches are
        presented in alphabetical order by character name.{" "}
      </p>
      <p>
        An illustration of a regency style gown has an oddly shaped grid
        overlaid, with two columns indicated. The costume patches can be
        arranged uniquely within the grid, using bolded cell borders as
        indications of left or right edges. When the names of the non-Austen
        characters are filled in, solvers can read down the indicated columns to
        get <Mono>ABANDONED AUSTEN AS PLANT GENUS EIGHT</Mono>.
      </p>
      <p>
        Jane Austen died with four works unfinished: Catherine, Lady Susan,
        Sanditon, and The Watsons. Only The Watsons, which she stopped writing
        and abandoned early in her career, can be associated with an eight
        letter plant genus:{" "}
        <Mono>
          <strong>WATSONIA</strong>
        </Mono>
        .
      </p>
      <p>
        Thank you to Recycled Movie Costumes, a site without which this puzzle
        would not exist!
      </p>
      <ImageWrapper>
        <LinkedImage src={genogram1} alt="The genogram for Emma" />
      </ImageWrapper>
      <ImageWrapper>
        <LinkedImage src={genogram2} alt="The genogram for Mansfield Park" />
      </ImageWrapper>
      <ImageWrapper>
        <LinkedImage src={genogram3} alt="The genogram for Northanger Abbey" />
      </ImageWrapper>
      <ImageWrapper>
        <LinkedImage src={genogram4} alt="The genogram for Persuasion" />
      </ImageWrapper>
      <ImageWrapper>
        <LinkedImage
          src={genogram5}
          alt="The genogram for Pride and Prejudice1"
        />
      </ImageWrapper>
      <ImageWrapper>
        <LinkedImage
          src={genogram6}
          alt="The genogram for Sense and Sensibility"
        />
      </ImageWrapper>
      <p>Enter names left to right, top to bottom.</p>
      <FlexWrapper>
        <img
          src={grid1}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out ALLAN WOODCOURT"
        />
        <img
          src={grid2}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out ANN DOBBIN"
        />
        <img
          src={grid3}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out ANNABELLA MILBANKE"
        />
        <img
          src={grid4}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out ARABELLA STRANGE"
        />
        <img
          src={grid5}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out CLARA COPPERFIELD"
        />
        <img
          src={grid6}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out HARRIET WANTAGE"
        />
        <img
          src={grid7}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out JOHANNA GAUSS"
        />
        <img
          src={grid8}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out LADY GRESHAM"
        />
        <img
          src={grid9}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out LADY JUDITH MILBANKE"
        />
        <img
          src={grid10}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out MADAME THENARDIER"
        />
        <img
          src={grid11}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out MARIANA"
        />
        <img
          src={grid12}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out MRS PRIESTLY"
        />
        <img
          src={grid13}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out SELINA"
        />
        <img
          src={grid14}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid spelling out ZEPHINE"
        />
        <img
          src={grid15}
          alt="A large multicolored grid, with all the previous grids from above pieced together like a jigsaw puzzle. Two columns are highlighted, reading ABANDONED AUSTEN AS PLANE GENUS EIGHT."
        />
      </FlexWrapper>
    </>
  );
};

export default Solution;
