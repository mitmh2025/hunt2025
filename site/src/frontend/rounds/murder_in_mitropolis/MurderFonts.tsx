import { createGlobalStyle } from "styled-components";
import EccentricStd from "./assets/EccentricStd.ttf";

export const MurderFonts = createGlobalStyle`
@font-face {
  font-family: "Eccentric";
  src: url("${EccentricStd}") format("truetype");
}
`;
