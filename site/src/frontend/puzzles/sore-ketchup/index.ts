import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Knights of the Square Table",
  slug: "knights_of_the_square_table",
  initial_description: "A 9x9 grid logic puzzle",
  answer: "MORTHOND",
  authors: ["David Greenspan", "Robin Deits"],
  editors: ["Chris Gatesman", "James Douberley", "tinaun"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 5.0,
      description:
        "Solvers don’t understand how to turn the flavor text into instructions for the logic puzzle",
      keywords: ["confused", "knights"],
      nudge:
        "This is a Sudoku played with the letters A, B, D, E, F, H, I, J, K.  In addition to the normal Sudoku rules, alphabetically consecutive letters may not be orthogonally adjacent, except where indicated by an arrow, which points from the earlier to the later letter in the alphabet. Identical letters may not occur in two cells which are a knight’s move apart, except where indicated in the grid.",
    },
    {
      order: 10.0,
      description:
        "Solvers have no idea how to start placing letters in the grid.",
      keywords: ["start"],
      nudge:
        "The entry in the sixth row, fifth column is the same as the entry in the fourth row, eighth column.",
    },
    {
      order: 10.1,
      description:
        "Solvers don’t understand how the previous hint was supposed to help them",
      keywords: ["stuck"],
      nudge:
        "The entry in the fourth row, eighth column is preceded alphabetically by one letter, and it must also be followed by two other consecutive alphabetical letters. Therefore it must come from a run of 4 consecutive alphabetical letters.",
    },
    {
      order: 10.2,
      description:
        "Solvers are still stuck and just want us to tell them what to do.",
      keywords: ["stuck"],
      nudge:
        "The entry in the fourth row, eighth column is an I. It must be preceded by an H in the square to its left.",
    },
    {
      order: 90.0,
      description:
        "Solvers have filled out the grid but don’t know how to extract",
      keywords: ["extraction"],
      nudge:
        "The tuples at the end of the puzzle give (row, column) indices of squares in your completed grid.",
    },
    {
      order: 95.0,
      description:
        "Solvers have the extracted letters but dont know what to do with the “+”s.",
      keywords: ["extraction", "plus"],
      nudge: "Treat A=1, B=2,  then sum the given pairs.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
