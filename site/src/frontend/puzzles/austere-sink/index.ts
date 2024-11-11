import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Doable Double",
  slug: "doable_double",
  initial_description:
    "A list of two word phrases and a diagram with boxes and arrows. Fish puzzle.",
  answer: "SILK",
  authors: ["Karen Rustad Tolva"],
  editors: ["Hubert Hwang", "Jonathan Lay", "Michele Pratusevich"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.1,
      description:
        "The solvers have not figured out what they’re supposed to do with the word pairs.",
      keywords: ["pairs", "words", "what"],
      nudge:
        "Each pair of words is a clue for a different pair of words with a particular constraint.",
    },
    {
      order: 1.2,
      description:
        "The solvers don’t understand the transformation for the initial clued pair of words.",
      keywords: [
        "pairs",
        "words",
        "what",
        "rule",
        "transformation",
        "append",
        "anagram",
      ],
      nudge:
        "The two words clued by each clue pair have a lot in common. The title of the puzzle could be such a result (with a clue pair being something like “achievable twin”).",
    },
    {
      order: 5.1,
      description:
        "The solvers don’t know what to do with the initial set of result pairs / the second tier of the diagram",
      keywords: [
        "word",
        "pair",
        "letter",
        "differ",
        "diagram",
        "arrow",
        "level",
        "tier",
      ],
      nudge: "Pay attention to the arrows in the diagram, and do it again.",
    },
    {
      order: 100.0,
      description:
        "The solvers have all of the second level pairs of words but don’t know how to extract letters for the answer.",
      keywords: ["extraction", "second", "level", "tier", "complete"],
      nudge:
        "What letter would appear in the “star” slot, if the second level pairs were written the same as the first level pairs?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
