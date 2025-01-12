import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Read Between the Lines",
  slug: "read_between_the_lines",
  code_name: "fake-fair",
  initial_description: "Two crosswords",
  answer: "PALM TREE",
  authors: ["Dee Ruttenberg", "Anisa Schardl", "Chris Post"],
  editors: ["Anna Brunner", "Hubert Hwang", "James Douberley"],
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
      order: 10.0,
      description: "Solvers have solved the crossword puzzles.",
      keywords: [
        "crossword",
        "grid",
        "clues",
        "complete",
        "finished",
        "completed",
        "completely",
      ],
      nudge:
        "When you solved the crossword grid, there were some clues that did not quite fit their crossword grid entries. Take a look at those clues and their answers.",
    },
    {
      order: 20.0,
      description:
        "Solvers have identified that the crossword grids depict hands.",
      keywords: ["hand", "palm", "hands", "palms", "fingers", "finger"],
      nudge:
        "Have you looked at the first letters of the clues associated with the fingers?",
    },
    {
      order: 30.0,
      description:
        "Solvers have identified that the puzzle involves chiromancy.",
      keywords: [
        "palmistry",
        "palm reading",
        "chiromancy",
        "chirology",
        "cheirology",
        "hand reading",
        "fortune telling",
      ],
      nudge:
        "Now that you know this puzzle is about chiromancy, you need to do some hand reading.",
    },
    {
      order: 90.0,
      description:
        "Solvers are still stuck after learning that they need to do some chiromancy.",
      keywords: [
        "extraction",
        "palmistry",
        "palm reading",
        "chiromancy",
        "chirology",
        "hand reading",
        "fortune telling",
      ],
      nudge:
        "Look for the names of some of the hand lines in their approximate positions on the grids relative to the fingers, and then check for something extra inside each of them.",
    },
  ],
  canned_responses: [
    {
      guess: ["CHIROMANCY"],
      reply: "This is a clue. Keep going!",
    },
  ],
};

export default puzzle;
