import { createGlobalStyle } from "styled-components";
import JustAnotherHand from "./assets/JustAnotherHand-Regular.ttf";

export const StakeoutFonts = createGlobalStyle`
@font-face {
  font-family: "Just Another Hand";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(${JustAnotherHand}) format("truetype");
}
`;
