import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Big Names",
  slug: "big_names",
  code_name: "important-green",
  initial_description:
    "A list of clues written in all caps, in two different sizes",
  answer: "THINK AGAIN",
  authors: ["Hubert Hwang"],
  editors: ["Anna Brunner", "James Douberley", "Rad Z"],
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
      order: 40.0,
      description:
        "Solvers have solved many of the clues but are having trouble figuring out the connection between them (light hint)",
      keywords: ["connection"],
      nudge:
        "One set of clues hints at famous scientists, and the clues are in all caps with Vs replacing Us.  Consider where that style of writing is used.",
    },
    {
      order: 41.0,
      description:
        "Solvers have solved many of the clues but are having trouble figuring out the connection between them (medium hint)",
      keywords: ["connection"],
      nudge:
        "Is there a specific location where all of those names are written in large letters? Perhaps somewhere nearby?",
    },
    {
      order: 42.0,
      description:
        "Solvers have solved many of the clues but are having trouble figuring out the connection between them (strong hint)",
      keywords: ["connection"],
      nudge: "These names are engraved around Killian Court.",
    },
    {
      order: 70.0,
      description:
        "Solvers have figured out the connection with the clues in larger text but not the clues in smaller text (light hint)",
      keywords: ["small", "smaller"],
      nudge:
        "Consider the flavortext and the big names.  Where might you find a smaller name, and how might they embellish themselves (but only a bit) in a way to turn them into a clue answer?",
    },
    {
      order: 70.1,
      description:
        "Solvers have figured out the connection with the clues in larger text but not the clues in smaller text (medium hint)",
      keywords: ["small", "smaller"],
      nudge:
        "Look at the “smaller names” near a particular “big name”, and see if there’s a way to associate a smaller name with a clue answer that involves only a slight addition.",
    },
    {
      order: 70.2,
      description:
        "Solvers have figured out the connection with the clues in larger text but not the clues in smaller text (strong hint)",
      keywords: ["small", "smaller"],
      nudge:
        "Each clue answer is a transaddition of one of the smaller names.  That is, it’s an anagram of all of the letters in the smaller name plus an extra letter.",
    },
    {
      order: 99.0,
      description: "Solvers are having trouble with extraction",
      keywords: ["extraction"],
      nudge: "Use the “big names” as an ordering for the embellishments.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
