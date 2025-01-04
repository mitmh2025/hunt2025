import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Give This Grid a Shake",
  slug: "give_this_grid_a_shake",
  initial_description:
    "Two short lists of crossword clues, and an empty 6x6 grid.",
  answer: "THE BLACK MARKET",
  authors: ["David Greenspan"],
  editors: ["Henry Wong", "James Douberley", "Li-Mei Lim"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.0,
      description:
        "Solvers have started answering the clues, but aren’t sure what to do with the words.",
      keywords: ["starting"],
      nudge:
        "The title, point values, and instructions under the grid suggest what this puzzle is about. What has a double letter cube?",
    },
    {
      order: 2.0,
      description:
        "Solvers still don’t know what this puzzle is about after previous hint.",
      keywords: ["still starting"],
      nudge:
        "This puzzle uses the rules of 4x4 Boggle and 6x6 Super Big Boggle.",
    },
    {
      order: 5.0,
      description:
        "Solvers know it’s referencing Boggle but aren’t sure what to do with the words",
      keywords: ["mechanic"],
      nudge:
        "You have to put one letter in each square to make a Boggle grid that contains all of the words. The “Regular” words must all be found in the shaded area.",
    },
    {
      order: 10.0,
      description:
        "Solvers understand what they have to do, but not how to approach the task and make progress.",
      keywords: ["approach"],
      nudge: "Try working out the 4x4 grid first, by hand.",
    },
    {
      order: 25.0,
      description:
        "Solvers are not able to complete the 4x4 and may have a word wrong.",
      keywords: ["words"],
      nudge: "The answer to “Bit of scat?” is DOO (a pun).",
    },
    {
      order: 40.0,
      description:
        "Solvers have the nine Regular words correct, but can’t seem to build the 4x4 after trying for quite a while.",
      keywords: ["arrangement"],
      nudge:
        "The letters A, D, I, and U are in the center 2x2 area of the grid.",
    },
    {
      order: 95.0,
      description:
        "Solvers have completed the grid and just need an extraction.",
      keywords: ["extraction"],
      nudge: "Read around the grid.",
    },
  ],
  canned_responses: [
    {
      guess: ["SUBMIT THE BLACK MARKET"],
      reply: "Well, go ahead and submit it!",
    },
  ],
};

export default puzzle;
