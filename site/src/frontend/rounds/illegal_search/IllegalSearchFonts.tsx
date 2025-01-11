import { createGlobalStyle } from "styled-components";
import AlegreyaSCBold from "./assets/fonts/AlegreyaSC-Bold.ttf";
import AlegreyaSCItalic from "./assets/fonts/AlegreyaSC-Italic.ttf";
import AlegreyaSCRegular from "./assets/fonts/AlegreyaSC-Regular.ttf";

export const IllegalSearchFonts = createGlobalStyle`
  @font-face {
    font-family: "Alegreya SC";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("${AlegreyaSCRegular}") format("truetype");
  }
  @font-face {
    font-family: "Alegreya SC";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url("${AlegreyaSCBold}") format("truetype");
  }
  @font-face {
    font-family: "Alegreya SC";
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url("${AlegreyaSCItalic}") format("truetype");
  }
`;
