import React from "react";
import { createGlobalStyle } from "styled-components";
import Lingo from "./assets/Lingo.ttf";

const Fonts = createGlobalStyle`
  @font-face {
    font-family: "Jargon";
    src: url(${Lingo});
    font-weight: normal;
    font-style: normal;
  }
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Fonts />
      <noscript>This puzzle requires Javascript.</noscript>
      <div id="jargon-root" />
    </>
  );
};

export default Puzzle;
