import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Downright Backwards",
  slug: "downright_backwards",
  code_name: "able-worm",
  initial_description:
    "A list of crossword clues and a list of number triplets",
  answer: "GUIANA CHESTNUT",
  authors: ["Leland Aldridge"],
  editors: ["James Douberley", "Li-Mei Lim"],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 0.0,
      description:
        "Solvers are working on answering the clues but are unsure of their answers",
      keywords: ["Clues"],
      nudge:
        "There are constraints on the clue answers that can help you cut out incorrect answers. Is there a feature that many of your solid answers have in common?",
    },
    {
      order: 30.0,
      description:
        "Solvers have answered most of the clues and are trying to determine what to do with these answers",
      keywords: ["Shape", "grid", "crossword"],
      nudge:
        "Consider the total number of letters in all of your Across answers, or in all of your down answers. How is that number related to the length of each answer?",
    },
    {
      order: 60.0,
      description:
        "Solvers have constructed some grids but do not know how to put them together",
      keywords: ["Order", "arrangement"],
      nudge:
        "The clues “horizontal line” and “vertical line” give answers that fit appropriately into your grid. Look for how that idea can be extended in another direction.",
    },
    {
      order: 100.0,
      description:
        "Solvers have fully arranged all of their answers and are trying to interpret the final number triplets",
      keywords: ["Coordinates", "positive", "negative", "forward", "backward"],
      nudge:
        "The x and y directions should be taken as they usually would be on a graph. For the z direction, consider the title of the puzzle in light of the writing directions in x and y.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
