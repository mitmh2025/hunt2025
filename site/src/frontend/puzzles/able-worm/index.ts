import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Downright Backwards",
  slug: "downright_backwards",
  initial_description:
    "A list of crossword-style clues sorted into two halves, and a list of number triplets.",
  answer: "GUIANA CHESTNUT",
  authors: ["Leland Aldridge"],
  editors: ["James Douberley", "Li-Mei Lim"],
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
        "Solvers have not figured out that answers are all five letters",
      keywords: ["Clues"],
      nudge:
        "There are constraints on the clue answers that can help you cut out incorrect answers. Is there a feature that many of your solid answers have in common?",
    },
    {
      order: 30.0,
      description:
        "Solvers have not figured out that the answers should be arranged into five 5x5 grids",
      keywords: ["Shape", "grid", "crossword"],
      nudge:
        "Consider the total number of letters in all of your Across answers, or in all of your down answers. How is that number related to the length of each answer?",
    },
    {
      order: 60.0,
      description:
        "Solvers have correctly constructed all five 5x5 grids but do not know how to put them together",
      keywords: ["Order", "cube", "arrangement"],
      nudge:
        'The clues "horizontal line" and "vertical line" give answers that fit appropriately into your grid. Look for how that idea can be extended in another direction.',
    },
    {
      order: 100.0,
      description:
        "Solvers do not know which directions in the cube should be considered positive or negative",
      keywords: ["Coordinates", "positive", "negative", "forward", "backward"],
      nudge:
        "The x and y directions should be taken as they usually would be on a graph. For the z direction, consider the title of the puzzle in light of the writing directions in x and y.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
