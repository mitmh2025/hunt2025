// import Boardwalk from './dental-shark';
import Casino from "./fortunate-calf";
import Tinder from "./tinder";
import type { PuzzleDefinition } from "./types";

export const PUZZLES: Record<string, PuzzleDefinition> = {
  just_keep_swiping: Tinder,
  the_casino: Casino,
};
