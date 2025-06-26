import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Passage of Time",
  slug: "passage_of_time",
  code_name: "calculating-mammoth",
  initial_description: "Crossword grid and clues",
  answer: "LIVING YEARS",
  authors: ["Alex St Claire"],
  editors: [
    "Erin Price",
    "James Douberley",
    "Joel Fried",
    "Nathan Fung",
    "Teddy McArthur",
  ],
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
      order: 5.0,
      description: "Beginning of puzzle",
      keywords: ["Start"],
      nudge:
        "The across/down clues are just normal crossword clues. The highlighted clues have multiple answers that fit in the various spots of the grid.",
    },
    {
      order: 30.0,
      description: "Puzzlers have begun finding many of the highlighted clues",
      keywords: ["Highlighted clues"],
      nudge:
        "The “main mechanic” clue is always found as the first across highlighted space in a given section of the grid. Try to figure out these six answers using crosses.",
    },
    {
      order: 40.0,
      description:
        "Puzzlers have found the “main mechanic” and identified most of the highlighted clues and are trying to figure out the purpose of the iconography",
      keywords: ["Index", "icons", "left side"],
      nudge:
        "The “main mechanic” clue labelled “t” is the roman numerals I-VI. The second icon .a-.f is referring to the corresponding clue for that region and the number is an index.",
    },
    {
      order: 60.0,
      description:
        "Players have extracted intermediate cluephrase on the left side",
      keywords: ["Conway"],
      nudge:
        "Conway is a reference to Conway’s game of life. You need to play the game.",
    },
    {
      order: 70.0,
      description:
        "Puzzlers have been trying to play Conway’s game of life but not sure how to extract",
      keywords: ["Conway", "Game of life"],
      nudge:
        "Make sure you are playing Conway’s game of life on (1) the full grid as one complete grid (i.e. don’t try to divide it into six different simulations) and (2) that the grid is infinite. Focus on the top section of the grid first.",
    },
    {
      order: 90.0,
      description:
        "Puzzlers have found the first part of the message in the first generation",
      keywords: ["extraction"],
      nudge: "You need to extract different letters at different time steps.",
    },
  ],
  canned_responses: [
    {
      guess: ["ANSWER IS LIVING YEARS"],
      reply: "Try submitting that?",
    },
    {
      guess: ["CONWAY"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
