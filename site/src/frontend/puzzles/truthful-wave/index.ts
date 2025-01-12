import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Shell Corporation 7: Shingles, Ltd.",
  slug: "shell_corporation_7",
  code_name: "truthful-wave",
  authors: ["James Douberley"],
  editors: ["Li-Mei Lim", "Robin Deits"],
  additional_credits: [],
  answer: "PENROSE",
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1,
      description: "Solvers have not figured out where to break in.",
      keywords: ["start"],
      nudge:
        "This is a meta-puzzle, using 3 feeder answers as inputs, each clued by the items in the materials list.",
    },
    {
      order: 2,
      description: "Solvers are not sure what to do with answers.",
      nudge:
        "The number of letters in answers matches the number of cuttable tiles near the top, and the number of empty spaces in the board below. Answer letters will be placed to create valid words matching the clues.",
    },
    {
      order: 3,
      description: "Solvers have the grid filled in and all words identified.",
      keywords: ["extraction"],
      nudge:
        "The board and tiles evoke the layout of a specific game. Using the scoring rules of this game on each of the words (in the order given by the clue words below) will produce numbers in the range 1-26, which can be read out as letters.",
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
