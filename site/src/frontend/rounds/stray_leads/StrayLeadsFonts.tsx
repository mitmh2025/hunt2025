import { createGlobalStyle } from "styled-components";
import ReenieBeanie from "./assets/ReenieBeanie.ttf";
import RockSalt from "./assets/RockSalt.ttf";

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
