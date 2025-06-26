import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Beyond a Shadow of a Doubt",
  slug: "beyond_a_shadow_of_a_doubt",
  code_name: "total-part",
  initial_description: "A series of colorful dropquote puzzles",
  answer: "YOU PLAYED IT",
  authors: ["Joel Fried"],
  editors: ["Erin Price", "Henry Wong", "Laura Nicholson", "Teddy McArthur"],
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
      order: 30.0,
      description:
        "Solvers are around the third grid, but are stuck when normal dropquote rules don’t work.",
      keywords: ["gray letters", "missing letters", "extra letters"],
      nudge:
        "This is not a normal drop quote grid. Each color has its own rules. Use context clues like how many letters are in column as well as story elements to help determine what those rules might be.",
    },
    {
      order: 45.0,
      description:
        "Continue to be stuck on middle to late grids. Do not understand the movement rules of the letters",
      keywords: [
        "letter rules",
        "number of letters in each column doesn’t match grid",
      ],
      nudge:
        "Reread the text of the sections already solved carefully. Look for keywords like rook, gambit, check, and mate. Does that hint at what the movement rules for each color should be?",
    },
    {
      order: 60.0,
      description:
        "Completed first four or five grids. Understand chess connection and how each piece moves, but stuck on grid",
      keywords: ["bishop", "queen", "stuck", "5th grid"],
      nudge:
        "Looks for places to get started in grid. Knights, Pawns, and King can only reach limited spots, so start by trying to fill out the first couple of rows. Look for other places where are limited options such as sides where bishops can only go in one direction. Try to read the story and think about what word make sense to follow. Take long words and use tools to try to determine possible options.  As you fill in squares find what the remaining legal spots for pieces left.",
    },
    {
      order: 82.0,
      description:
        "Solvers have finished the first 5 grids and are working on the last one. They have made the chess connection, and understand what to do, but are having trouble finishing the grid",
      keywords: ["queen", "last grid", "pink squares", "stuck"],
      nudge: "The third row of the last grid starts with meandering.",
    },
    {
      order: 95.0,
      description:
        "Solvers have finished all grids and are stuck on the extraction",
      keywords: ["grid done", "extraction", "chess board", "colors", "queen"],
      nudge:
        "Carefully read the last section. Are there instructions of what you should do next?   Note who you are chasing as well as any clues to tell you where to start. Consider if there is any information from the other sections of this puzzle that may inform your path.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
