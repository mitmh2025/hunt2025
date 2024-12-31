import { createGlobalStyle } from "styled-components";
import EccentricStd from "./assets/fonts/EccentricStd.ttf";
import Playwrite from "./assets/fonts/PlaywriteES.ttf";
import RockSalt from "./assets/fonts/RockSalt.ttf";

export const HubFonts = createGlobalStyle`
@font-face {
  font-family: "Eccentric";
  src: url("${EccentricStd}") format("truetype");
}
@font-face {
  font-family: "Rock Salt";
  src: url("${RockSalt}") format("truetype");
}
@font-face {
  font-family: "Playwrite";
  src: url("${Playwrite}") format("truetype");
}
`;
