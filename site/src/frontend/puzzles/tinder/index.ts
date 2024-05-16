import type { PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Just Keep Swiping",
  slug: "just_keep_swiping",
  authors: ["Somebody"],
  content: {
    component: Puzzle,
    entrypoint: "tinder",
  },
  solution: {
    component: Solution,
  },
  answer: "ROUGH DATE",
  hints: [], // TODO: typeset
  canned_responses: [], // TODO: typeset
};

export default puzzle;
