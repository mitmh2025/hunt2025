import type { SubpuzzleDefinition } from "../../types";
import Puzzle from "./puzzle";

const puzzle: SubpuzzleDefinition = {
  title: "DraughtQueens",
  slug: "draughtqueens",
  answer: "CARTEL",
  content: {
    component: Puzzle,
    copyable: true,
  },
};

export default puzzle;
