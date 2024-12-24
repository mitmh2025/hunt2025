import { PuzzleColor } from "./Typedefs";

export const TUTORIAL_COLORS: PuzzleColor[] = [
  PuzzleColor.WHITE,
  PuzzleColor.BLACK,
  PuzzleColor.RED,
  PuzzleColor.BLUE,
  PuzzleColor.YELLOW,
  PuzzleColor.PURPLE,
  PuzzleColor.ORANGE,
  PuzzleColor.CREAM,
];

export const CLEANSTRING_REGEX = /[^0-9a-z]/gi;
export const LOCAL_STORAGE_PREFIX = "JARGON_";
export const HAS_STORAGE = typeof Storage !== "undefined";
