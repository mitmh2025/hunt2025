import { createGlobalStyle } from "styled-components";
import ReenieBeanie from "../../hub/assets/fonts/ReenieBeanie-Regular.ttf";
import RockSalt from "../../hub/assets/fonts/RockSalt.ttf";

export const StrayLeadsFonts = createGlobalStyle`
  @font-face {
    font-family: "Rock Salt";
    src: url("${RockSalt}") format("truetype");
  }
  @font-face {
    font-family: "Reenie Beanie";
    src: url("${ReenieBeanie}") format("truetype");
  }
`;
