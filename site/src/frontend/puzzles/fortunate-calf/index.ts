import type { PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Casino",
  slug: "the_casino",
  authors: ["Elan Blaustein"],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Nine Morch"],
    },
  ],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  answer: "FACE CARD SHARKS",
  hints: [], // TODO: typeset
  canned_responses: [], // TODO: typeset
};

export default puzzle;
