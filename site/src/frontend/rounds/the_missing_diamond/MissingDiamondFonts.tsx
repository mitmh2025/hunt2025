import { createGlobalStyle } from "styled-components";
import EBGaramondItalic from "./assets/EBGaramond-Italic-VariableFont_wght.ttf";
import EBGaramondRegular from "./assets/EBGaramond-VariableFont_wght.ttf";

export const MissingDiamondFonts = createGlobalStyle`
@font-face {
  font-family: "EB Garamond";
  font-style: normal;
  font-display: swap;
  src: url("${EBGaramondRegular}") format("truetype");
}

@font-face {
  font-family: "EB Garamond";
  font-style: italic;
  font-display: swap;
  src: url("${EBGaramondItalic}") format("truetype");
}
`;
