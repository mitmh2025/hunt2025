import { createGlobalStyle } from "styled-components";
import CaveatRegular from "./Caveat-Regular.ttf";

export const CaveatFont = createGlobalStyle`
  @font-face {
    font-family: "Caveat";
    src: url(${CaveatRegular});
    font-weight: normal;
    font-style: normal;
  }
`;
