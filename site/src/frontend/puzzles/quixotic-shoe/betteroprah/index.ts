import type { SubpuzzleDefinition } from "../../types";
import Puzzle from "./puzzle";

const puzzle: SubpuzzleDefinition = {
  title: "BetterOprah",
  slug: "betteroprah",
  answer: "MOVE",
  content: {
    component: Puzzle,
    copyable: true,
  },
};

export default puzzle;
