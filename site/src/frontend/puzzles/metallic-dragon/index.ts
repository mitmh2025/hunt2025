import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Word Yore",
  slug: "word_yore",
  initial_description:
    "You are presented with an old-school-looking phone interface (via web browser) and a textbox.",
  answer: "GRASS",
  authors: ["Michele Pratusevich"],
  editors: ["Anna Brunner", "Hubert Hwang", "tinaun"],
  additional_credits: [],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_metallic_dragon",
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers don't know how to get started",
      keywords: ["get started"],
      nudge:
        "This puzzle is a text adventure. Type something into the box at the bottom and click the arrow to send your message.",
    },
    {
      order: 10.0,
      description:
        "Solvers have explored the text adventure but haven't mapped it out",
      keywords: ["map"],
      nudge:
        'The map for this text adventure is a phone keypad. The text in each room obliquely hints at each room\'s canonical "number"',
    },
    {
      order: 40.0,
      description: "Solvers don't know why a word is capitalized in each room",
      keywords: ["capitalized", "grammatically incorrect"],
      nudge:
        'One word is capitalized in each line of text; this word is intended to be a different word instead. You use numbers instead of "NORTH/SOUTH/EAST/WEST" to navigate between rooms, and the capitalized word follows the same pattern.',
    },
    {
      order: 65.0,
      description:
        "Solvers have the textonym phrase (PERT AND ANIMATED FIVE TUBE PASTA FOUR RIMS OF FACE HOLE FOUR) but don't know how to solve it",
      keywords: ["textonym", "clue phrase"],
      nudge:
        "The phrase PERT AND ANIMATED FIVE TUBE PASTA FOUR RIMS OF FACE HOLE FOUR is cluing 3 words and their enumerations",
    },
    {
      order: 80.0,
      description:
        "Solvers have the phrase PERKY ZITI LIPS but don't know what to do next",
      keywords: ["cluephrase"],
      nudge:
        "Have you tried re-applying the textonym mechanic to the cluephrase PERKY ZITI LIPS?",
    },
    {
      order: 100.0,
      description: "Solvers have REPLY WITH KISS but can't get an answer",
      keywords: ["instruction"],
      nudge: "Have you tried submitting a single word into the answer checker?",
    },
  ],
  canned_responses: [
    {
      guess: ["KISS"],
      reply:
        "Aww, that's so sweet of you!  Why don't you text a kiss to (617) 798-6122\u202c?",
    },
    {
      guess: ["PERKY ZITI LIPS"],
      reply: "Have you reapplied the mechanic?",
    },
    {
      guess: ["REPLY WITH KISS"],
      reply: "Just one word, please.",
    },
  ],
};

export default puzzle;
