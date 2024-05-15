import type { PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Casino",
  slug: "the_casino",
  authors: ["Elan Blaustein"],
  content: {
    component: Puzzle,
  },
  solution: Solution,
  answer: "FACE CARD SHARKS",
  hints: [], // TODO: typeset
  canned_responses: [], // TODO: typeset
};

export default puzzle;
