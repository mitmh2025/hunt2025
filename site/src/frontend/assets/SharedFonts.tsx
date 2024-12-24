import { createGlobalStyle } from "styled-components";
import CaveatRegular from "./Caveat-Regular.ttf";
import OswaldRegular from "./Oswald-Regular.ttf";

export const CaveatFont = createGlobalStyle`
  @font-face {
    font-family: "Caveat";
    src: url(${CaveatRegular});
    font-weight: normal;
    font-style: normal;
  }
`;

export const OswaldFont = createGlobalStyle`
  @font-face {
    font-family: "Oswald";
    src: url(${OswaldRegular});
    font-weight: normal;
    font-style: normal;
  }
`;
