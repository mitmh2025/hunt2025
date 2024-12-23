import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "🔎🧊",
  slug: "🔎🧊",
  initial_description: "A bunch of emojis.",
  answer: "CHIFFONIER",
  authors: ["Alex St Claire"],
  editors: [
    "Chris Gatesman",
    "Kevin Hwang",
    "Michele Pratusevich",
    "Robin Deits",
  ],
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
      description: "Solvers have begun identifying emoji names",
      nudge:
        "Do you notice anything in common amongst the emoji names in the top section?",
    },
    {
      order: 20.0,
      description:
        "Solvers have discovered the top section all involves 6 letter length emoji names",
      keywords: ["length"],
      nudge: 'How could you generate a "cube" as hinted at by title?',
    },
    {
      order: 30.0,
      description: "Solvers have made a 6 sided cube of letters",
      nudge: "How might you search the cube?",
    },
    {
      order: 50.0,
      description:
        "Solvers know it's a 3D word search but have not found all the words",
      keywords: ["Word search"],
      nudge:
        "The words are in alphabetical order. Additionally make sure to search in all directions (including the three dimensional diagonals).",
    },
    {
      order: 90.0,
      description:
        "Solvers have found all the words but unsure how to extract answer",
      keywords: ["Extraction"],
      nudge: 'What does the Latin word "Gemini" translate to?',
    },
  ],
  canned_responses: [],
};

export default puzzle;
