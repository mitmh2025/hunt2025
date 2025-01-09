import { createGlobalStyle } from "styled-components";
import CaveatRegular from "./Caveat-Regular.ttf";
import CourierRegular from "./CourierPrime-Regular.ttf";
import NotoColorEmoji from "./NotoColorEmoji-Regular.ttf";
import OswaldRegular from "./Oswald-Regular.ttf";

export const CaveatFont = createGlobalStyle`
  @font-face {
    font-family: "Caveat";
    src: url(${CaveatRegular});
    font-weight: normal;
    font-style: normal;
  }
`;

export const CourierFont = createGlobalStyle`
  @font-face {
    font-family: "Courier";
    src: url(${CourierRegular});
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

export const NotoColorEmojiFont = createGlobalStyle`
  @font-face {
    font-family: "Noto Color Emoji";
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url(${NotoColorEmoji});
  }
`;
