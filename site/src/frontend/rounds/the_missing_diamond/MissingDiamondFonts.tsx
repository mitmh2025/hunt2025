import { createGlobalStyle } from "styled-components";
import ReenieBeanie from "../../hub/assets/fonts/ReenieBeanie-Regular.ttf";

export const MissingDiamondFonts = createGlobalStyle`
@font-face {
  font-family: "Reenie Beanie";
  font-style: normal;
  font-display: swap;
  src: url("${ReenieBeanie}") format('truetype');
}
`;
