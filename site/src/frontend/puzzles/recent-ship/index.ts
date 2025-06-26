import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "A Sudoku?",
  slug: "a_sudoku",
  code_name: "recent-ship",
  initial_description: "Grids with numbers",
  answer: "BRICK AND MORTAR",
  authors: ["Tanya Khovanova", "Robin Deits"],
  editors: [
    "Elan Blaustein",
    "Henry Wong",
    "James Douberley",
    "Steve Banzaert",
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
      description: "Solvers don’t know how to start",
      keywords: ["no  idea", "getting started"],
      nudge:
        "The grids are a type of logic puzzle related to tall, tall buildings.",
    },
    {
      order: 10.0,
      description: "Solvers want to know how to start",
      keywords: ["start"],
      nudge: "The grids are a type of logic puzzle called Skyscrapers.",
    },
    {
      order: 50.0,
      description:
        "Solvers do not know what’s going on with the 1st, 2nd, and 3rd place trophies.",
      keywords: ["trophies"],
      nudge:
        "These are also referring to skyscrapers. What might skyscrapers be ranked on?",
    },
    {
      order: 55.0,
      description: "Solvers want an to know what’s going on with the trophies.",
      keywords: ["trophies"],
      nudge: "These are the tallest skyscrapers in the world.",
    },
    {
      order: 70.0,
      description:
        "Solvers don’t know what to make of the tuples in each trophy section",
      keywords: ["tuples"],
      nudge:
        "The numbers in the tuples run from 1 to 13. What are there 3 of in the 1st section, 3 of in the 2nd section, and 5 of in the 3rd section?",
    },
    {
      order: 80.0,
      description: "Solvers don’t know how to get letters for the tuples.",
      keywords: ["latin squares", "sudokus"],
      nudge:
        "Both Sudokus and Skyscrapers are Latin squares; but Sudokus have an additional property. We really wanted some Sudokus.",
    },
    {
      order: 95.0,
      description: "Solvers are stuck at the thirteen letter string",
      keywords: ["first string", "partial"],
      nudge:
        "What might be another name for such a retailer that fits the final enumeration.",
    },
  ],
  canned_responses: [
    {
      guess: ["OFFLINE RETAIL"],
      reply: "That’s a clue phrase. Keep going!",
    },
  ],
};

export default puzzle;
