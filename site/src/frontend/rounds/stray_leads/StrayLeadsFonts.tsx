import { createGlobalStyle } from "styled-components";
import RockSalt from "./assets/RockSalt.ttf";

export const StrayLeadsFonts = createGlobalStyle`
@font-face {
  font-family: "Rock Salt";
  src: url("${RockSalt}") format("truetype");
}
`;
