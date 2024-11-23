import React from "react";
import { styled } from "styled-components";

const ColoredTd = styled.td<{ $color: string; $textColor?: string }>`
  background-color: ${({ $color }) => $color};
  color: ${({ $textColor }) => $textColor ?? "inherit"};
`;

const StyledTable = styled.table`
  margin-bottom: 1em;
  td,
  th {
    padding: 1px 8px;
  }
`;

const Mono = styled.span`
  font-family: monospace;
`;

enum Color {
  CORAL = "CORAL",
  CREAM = "CREAM",
  CYAN = "CYAN",
  FAWN = "FAWN",
  GOLD = "GOLD",
  GRAY = "GRAY",
  JET = "JET",
  OLIVE = "OLIVE",
  ORANGE = "ORANGE",
  PEAR = "PEAR",
  PINK = "PINK",
  RED = "RED",
  SLATE = "SLATE",
}

const COLOR_TO_PRESENTATION: Record<Color, string> = {
  CORAL: "Coral",
  CREAM: "Cream",
  CYAN: "Cyan",
  FAWN: "Fawn",
  GOLD: "Gold",
  GRAY: "Gray",
  JET: "Jet",
  OLIVE: "Olive",
  ORANGE: "Orange",
  PEAR: "Pear",
  PINK: "Pink",
  RED: "Red",
  SLATE: "Slate",
};

const COLOR_TO_HEX: Record<Color, string> = {
  CORAL: "#FF7F50",
  CREAM: "#FFFDD0",
  CYAN: "#00FFFF",
  FAWN: "#E5AA70",
  GOLD: "#FFD700",
  GRAY: "#808080",
  JET: "#343434",
  OLIVE: "#808000",
  ORANGE: "#FFA500",
  PEAR: "#D1E231",
  PINK: "#FFC0CB",
  RED: "#FF0000",
  SLATE: "#708090",
};

const BLOCK_TABLE: {
  index: string;
  answer: string;
  color: Color;
}[] = [
  { index: "1", answer: "AWN", color: Color.JET },
  { index: "2", answer: "EAR", color: Color.CREAM },
  { index: "3", answer: "ED", color: Color.PEAR },
  { index: "4", answer: "ET", color: Color.RED },
  { index: "5", answer: "INK", color: Color.CYAN },
  { index: "6", answer: "LATE", color: Color.FAWN },
  { index: "7", answer: "LIVE", color: Color.PINK },
  { index: "8", answer: "OLD", color: Color.ORANGE },
  { index: "9", answer: "ORAL", color: Color.OLIVE },
  { index: "10", answer: "RANGE", color: Color.SLATE },
  { index: "11", answer: "RAY", color: Color.CORAL },
  { index: "12", answer: "REAM", color: Color.GRAY },
  { index: "13", answer: "YAN", color: Color.GOLD },
];

const CHAIN_TABLE: {
  colorWord: Color;
  cluedWord: string;
  letters: string;
  blockColor: Color;
}[] = [
  {
    colorWord: Color.CORAL,
    cluedWord: "ORAL",
    letters: "CL",
    blockColor: Color.OLIVE,
  },
  {
    colorWord: Color.OLIVE,
    cluedWord: "LIVE",
    letters: "I",
    blockColor: Color.PINK,
  },
  {
    colorWord: Color.PINK,
    cluedWord: "INK",
    letters: "P",
    blockColor: Color.CYAN,
  },
  {
    colorWord: Color.CYAN,
    cluedWord: "YAN",
    letters: "C",
    blockColor: Color.GOLD,
  },
  {
    colorWord: Color.GOLD,
    cluedWord: "OLD",
    letters: "OL",
    blockColor: Color.ORANGE,
  },
  {
    colorWord: Color.ORANGE,
    cluedWord: "RANGE",
    letters: "OR",
    blockColor: Color.SLATE,
  },
  {
    colorWord: Color.SLATE,
    cluedWord: "LATE",
    letters: "A",
    blockColor: Color.FAWN,
  },
  {
    colorWord: Color.FAWN,
    cluedWord: "AWN",
    letters: "F",
    blockColor: Color.JET,
  },
  {
    colorWord: Color.JET,
    cluedWord: "ET",
    letters: "T",
    blockColor: Color.RED,
  },
  {
    colorWord: Color.RED,
    cluedWord: "ED",
    letters: "E",
    blockColor: Color.PEAR,
  },
  {
    colorWord: Color.PEAR,
    cluedWord: "EAR",
    letters: "R",
    blockColor: Color.CREAM,
  },
  {
    colorWord: Color.CREAM,
    cluedWord: "REAM",
    letters: "CM",
    blockColor: Color.GRAY,
  },
  {
    colorWord: Color.GRAY,
    cluedWord: "RAY",
    letters: "Y",
    blockColor: Color.CORAL,
  },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The puzzle presents a set of 14 images on rectangles with a wood texture
        background. Some areas of these rectangles have color applied to them
        over the wood texture. Each image clues a word, and for most solvers
        identifying these words will be the first step of the puzzle. This
        identification is aided by two additional details of the images. First,
        the images are arranged in alphabetical order according to the clued
        words. Second, the width of each image is related to the number of
        letters in each word, with each image having one “blank” space on its
        left and then an additional length that directly varies with the number
        of letters in the clued word.
      </p>
      <p>
        During this step solvers might simultaneously identify some of the
        colors used on each block, since there is a consistent relationship
        between the color words and the clued words. Each clued word can be
        transformed into one of the color words by adding a single letter to the
        beginning of the word. The correct words and colors used on each block
        are are:
      </p>
      <StyledTable>
        <tr>
          <th>Image</th>
          <th>Clued Word</th>
          <th>Color on Block</th>
          <th>Hex Code</th>
        </tr>
        {BLOCK_TABLE.map(({ index, answer, color }) => (
          <tr key={`block-${index}`}>
            <td>{index}</td>
            <td>{answer}</td>
            <ColoredTd
              $color={COLOR_TO_HEX[color]}
              $textColor={color === Color.JET ? "white" : undefined}
            >
              {COLOR_TO_PRESENTATION[color]}
            </ColoredTd>
            <td>{COLOR_TO_HEX[color]}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        Once solvers have identified each of these words, the extraction relies
        on their recognizing that the puzzle title and the nature of the images
        both clue{" "}
        <a
          href="https://en.wikipedia.org/wiki/Relief_printing"
          target="_blank"
          rel="noreferrer"
        >
          relief printing
        </a>
        , a style of artwork that uses height differences on a block or a plate
        to transfer an image onto paper using ink. In order to see the
        extraction step solvers should imagine aligning the letters of each
        color word across the rectangle that has the image that clued it (RANGE
        would use O-RANGE, for example). The extraction aha comes from noticing
        that the application of color to only some areas of each image is like a
        relief print that only has ink in certain places. If the color words
        were movable type, then the only letters that would transfer would be
        the ones that were “inked” by the application of a color, and so only
        those letters should be extracted from each color word.
      </p>
      <p>
        As indicated by the flavor “Thanks for connecting me with these new
        colors” the extracted letters should be ordered according to a chain
        created by connecting the actual color used on each block with the image
        that is clued by that color. As an illustration, since the C/ORAL image
        uses the color OLIVE the next image in the chain is LIVE. Since the LIVE
        block uses the color PINK the next image in the chain is INK, and so on.
        The extracted letters, in the order implied by that chain are:
      </p>
      <StyledTable>
        <tr>
          <th>Color Word</th>
          <th>Clued Word</th>
          <th>Letters</th>
          <th>Color on Block</th>
        </tr>
        {CHAIN_TABLE.map(({ colorWord, cluedWord, letters, blockColor }, i) => (
          <tr key={`chain-${i}`}>
            <ColoredTd
              $color={COLOR_TO_HEX[colorWord]}
              $textColor={colorWord === Color.JET ? "white" : undefined}
            >
              {colorWord}
            </ColoredTd>
            <td>{cluedWord}</td>
            <td>{letters}</td>
            <ColoredTd
              $color={COLOR_TO_HEX[blockColor]}
              $textColor={blockColor === Color.JET ? "white" : undefined}
            >
              {COLOR_TO_PRESENTATION[blockColor]}
            </ColoredTd>
          </tr>
        ))}
      </StyledTable>
      This completes the clue phrase “<Mono>CLIP COLOR AFTER CMY”</Mono>, which
      once again references concepts from printing. The color after CMY in the
      CMYK color model often used in color printing refers to the “BLACK”, or
      Key layer. Of course, black is also a color word that follows the mechanic
      of the puzzle, and the final woodblock at the bottom of the puzzle gives
      solvers confirmation that this direction is correct, since the letters of
      BLACK fit in that block’s 5 spaces. The four question marks on the final
      block show that the first letter in black needs to be “clipped” in the way
      that our puzzle images clip the first letter off of their color words,
      leaving the word{" "}
      <Mono>
        <strong>LACK</strong>
      </Mono>
      , which is the answer.
    </>
  );
};

export default Solution;
