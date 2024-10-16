import { createGlobalStyle } from "styled-components";
import KiwiMaruLight from "./assets/KiwiMaru-Light.ttf";
import KiwiMaruMedium from "./assets/KiwiMaru-Medium.ttf";
import KiwiMaruRegular from "./assets/KiwiMaru-Regular.ttf";

export const PaperTrailFonts = createGlobalStyle`
@font-face {
  font-family: "Kiwi Maru";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url("${KiwiMaruLight}") format("truetype");
}

@font-face {
  font-family: "Kiwi Maru";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("${KiwiMaruRegular}") format("truetype");
}

@font-face {
  font-family: "Kiwi Maru";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("${KiwiMaruMedium}") format("truetype");
}
`;
