import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Shell Corporation 4: Crystal-Clear Refinery",
  slug: "shell_corporation_4",
  authors: ["David Greenspan"],
  editors: ["James Douberley", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [],
  answer: "ACRYLATE",
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1,
      description: "Solvers have not figured out where to start.",
      keywords: ["start"],
      nudge:
        "This meta-puzzle uses 4 answers, one per column. The punctuation given should help with placing these.",
    },
    {
      order: 1.5,
      description: "Solvers are having trouble placing answers.",
      nudge:
        "Each of the answers feeding this meta has a glass-making ingredient, which needs to be treated as a single letter when placing in the grid. The columns also repeat, each with a different period.",
    },
    {
      order: 2,
      description:
        "Solvers have placed answers and cannot figure out the next step.",
      nudge:
        "The periodic nature of these repeating columns means that different letters will line up further down. The flavortext suggests a specific set of letters to look for.",
    },
    {
      order: 3,
      description:
        "Solvers have found multiple(s) where the answers would line up to spell PURE",
      keywords: ["extraction"],
      nudge:
        "Using the 4-digit value of the row(s) you have found, along with the digits 0-9 in the grid (each associated with a letter), should output 4 letters per row identified.",
    },
    {
      order: 3.5,
      description: "Solvers have found ACRY",
      keywords: ["extraction"],
      nudge:
        "The periodicity of these different length repeating strings is 6552, so there will be two instances where they line up in the range of 0-9999.",
    },
    {
      order: 100,
      description: "Solvers are concerned that not all of their answers fit.",
      keywords: ["answers", "assignment", "feeders"],
      nudge:
        "You may be able to solve this meta without all the answers and figure out the remaining feeder assignments later.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
