import type { PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Chinatown",
  slug: "chinatown",
  authors: ["Placeholder Author"],
  editors: [],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  answer: "CRY STOOL PIDGIN",
  hints: [],
  canned_responses: [],
}

export default puzzle;
