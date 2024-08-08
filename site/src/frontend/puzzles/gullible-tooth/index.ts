import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Shell Corporation 1 - Tasty Food Processors",
  slug: "shell_corporation_1",
  authors: ["Li-Mei Lim", "James Douberley"],
  answer: "SLIVERS",
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [],
};

export default puzzle;
