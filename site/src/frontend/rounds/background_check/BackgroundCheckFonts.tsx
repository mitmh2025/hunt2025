import { createGlobalStyle } from "styled-components";
import MarcellusRegular from "./assets/Marcellus-Regular.ttf";
import MarcellusSCRegular from "./assets/MarcellusSC-Regular.ttf";

export const BackgroundCheckFonts = createGlobalStyle`
@font-face {
  font-family: "Marcellus";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("${MarcellusRegular}") format("truetype");
}
@font-face {
  font-family: "Marcellus SC";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("${MarcellusSCRegular}") format("truetype");
}
`;
