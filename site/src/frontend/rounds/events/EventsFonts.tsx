import { createGlobalStyle } from "styled-components";
import EccentricStd from "../../hub/assets/fonts/EccentricStd.ttf";
import Playwrite from "../../hub/assets/fonts/PlaywriteES.ttf";

export const EventsFonts = createGlobalStyle`
@font-face {
  font-family: "Eccentric";
  src: url("${EccentricStd}") format("truetype");
}

@font-face {
  font-family: "Playwrite";
  src: url("${Playwrite}") format("truetype");
}
`;
