import type { PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Shell Corporation 2: Triple A Accounting, LLC",
  slug: "shell_corporation_2",
  authors: ["Li-Mei Lim"],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  answer: "ROUNDING ERROR",
  hints: [
    {
      order: 1,
      description: "The solvers don't know where to start.",
      nudge:
        "The first lines after the flavortext give a hint to how many feeders are used in this puzzle and how to use them.",
    },
    {
      order: 2,
      description: "The solvers still aren't sure how to start.",
      nudge:
        "This puzzle uses two feeder answers that must be processed in a way that is consistent with the given inequalities. The flavortext gives hints at how to interpret the feeder answers to be used in this puzzle.",
    },
    {
      order: 3,
      description: "The solvers are confused by the pictures.",
      nudge: "The pictures each clue something from a particular set.",
    },
    {
      order: 3.5,
      description: "The solvers are still confused by the pictures.",
      nudge: "The pictures each clue a number.",
    },
    {
      order: 5,
      description:
        "The solvers have the variables correct but don't understand what they are computing in each expression.",
      nudge:
        "Each expression evaluates to a number with (at most) two decimal places. It should be close to a significant number.",
    },
    {
      order: 50,
      description:
        "The solvers have computed all the expressions but don't know what to do with them.",
      keywords: ["extraction"],
      nudge:
        "The expressions each differ from an important value by a little bit. The flavortext hints at how to process the differences.",
    },
    {
      order: 100,
      description:
        "The solvers are concerned that not all of their answers fit.",
      keywords: ["answers", "assignment", "feeders"],
      nudge:
        "You may be able to solve this meta without all the answers and figure out the remaining feeder assignments later.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
