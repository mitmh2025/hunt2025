import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Mark",
  slug: "the_mark",
  code_name: "unique-australia",
  answer: "PANDORA",
  authors: ["Grant Elliott"],
  editors: ["James Douberley", "Jesse Moeller", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description:
        "Solvers have not found the pieces mentioned in the instructions",
      keywords: ["Stuck", "beginning"],
      nudge: "Have you performed a background check?",
    },
    {
      order: 10.0,
      description:
        "Solvers have found the pieces, but are stumped filling in the missing letters",
      keywords: ["Unknowns"],
      nudge:
        "As a word snakes though the chips, what letters come from the same chip?",
    },
    {
      order: 100.0,
      description: "Solvers are stuck on extraction",
      keywords: ["Extraction"],
      nudge:
        "Have you used all of the information in the puzzle? Reread the last instruction.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
