import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image1 from "./assets/image1.png";

const StyledImageWrapper = styled.div`
  margin-bottom: 1em;
`;

const Solution = () => {
  return (
    <>
      <p>
        The names of all the emojis in the 6x6 grid are of 6 length. This allows
        you to construct a 3D 6x6x6 cube. The puzzle is a 3D word search as
        indicated by the title 🔎🧊. The 13 emojis below the grid are the words
        you need to search. Decoding the search emoji names will generate words
        in alphabetical order of length 4-6.
      </p>
      <p>
        All of the words in the search go through unique letters in the cube
        (there are no overlaps).
      </p>
      <p>
        The flavor text of 🔎♊ is “search for gemini”. Gemini is Latin for
        “twins” and is often associated with twins. In this case it’s hinting at
        duplicates. If you look at the letters used in each emoji in the grid
        there are 10 emojis that have two duplicate letters in the word used
        (for example both “C”s in CANCER). See emojis in green and in red
        borders. If you extract these duplicate letters left-to-right then
        top-to-bottom it spells out the answer: CHIFFONIER.
      </p>
      <p>
        Author’s note: A CHIFFONIER is a piece of furniture with layers of
        drawers and a mirror on top. This puzzle is a bunch of layers and
        actually has a mirror on top (see fourth emoji on first row).
      </p>
      <StyledImageWrapper>
        <LinkedImage
          src={image1}
          alt="In the top left, a 6x6 table with words, some highlighted in green and red. In the top right, corresponding emoji icons for each word in the left grid. In the bottom left, a letter grid with a word search. In the bottom right, a key listing 13 words alphabetically."
        />
      </StyledImageWrapper>
    </>
  );
};

export default Solution;
