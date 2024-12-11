import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Mark",
  slug: "the_mark",
  initial_description: "A small hexagonal grid and a set of clear rules.",
  answer: "PANDORA",
  authors: ["Grant Elliott"],
  editors: ["James Douberley", "Jesse Moeller", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description:
        "Solvers have not found the pieces mentioned in the instructions",
      keywords: ["stuck", "beginning"],
      nudge: "Have you performed a background check?",
    },
    {
      order: 10.0,
      description:
        "Solvers have found the background cheques, but are stumped filling in the missing letters",
      keywords: ["unknowns"],
      nudge:
        "As a word snakes though the chips, what letters come from the same chip?",
    },
    {
      order: 100.0,
      description: "Solvers are stuck on extraction",
      keywords: ["extraction"],
      nudge:
        "Have you used all of the information in the puzzle? Reread the last instruction.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
