import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "In a Different Direction",
  slug: "in_a_different_direction",
  initial_description: "A diagramless crossword",
  answer: "GREEDY PIGGY",
  authors: ["Hubert Hwang"],
  editors: ["Anna Brunner", "Li-Mei Lim", "Teddy McArthur"],
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
      order: 0.0,
      description:
        "Solvers are having trouble getting started / do not know what a diagramless is",
      keywords: ["start"],
      nudge:
        "As the puzzle states, this is a diagramless crossword.  That means that you need to use the clues to help you figure out the shape of the grid.  You are told that the grid is 15x15, and that if you rotate it 180 degrees, the grid will look the same.  You are also told that all clue answers (entries) are at least three letters long, and that all squares are “checked” (that is, each letter in the grid is part of two different entries).  You may wish to start by solving some of the clues and then seeing how you can make the entries overlap with each other.",
    },
    {
      order: 20.0,
      description:
        "Solvers have some clue answers but are struggling to fit them into a grid",
      keywords: ["grid", "fit"],
      nudge:
        "Note that the headings of each set of clues are not the usual “Across” and “Down”, and consider the title.  Look for something that might help you figure out the directions.",
    },
    {
      order: 20.1,
      description: "Solvers are still struggling to fit answers into the grid",
      keywords: ["grid", "fit"],
      nudge:
        "Look back at the flavortext.  It should tell you what directions the clue answers proceed in.",
    },
    {
      order: 95.0,
      description:
        "Solvers have a complete or mostly complete grid but are having trouble extracting",
      keywords: ["extraction"],
      nudge:
        "Since the clue answers don’t read in the usual directions, you obviously can’t read anything from the grid normally…or can you?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
