import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Charged",
  slug: "charged",
  code_name: "lean-lock",
  initial_description:
    "Interactive interface with text entry boxes and lines between them",
  answer: "LEAF",
  authors: ["Henry Wong", "Robin Deits"],
  editors: ["James Douberley", "Li-Mei Lim"],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    entrypoint: "puzzle_lean_lock",
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers don’t know what to do with this interface",
      nudge:
        "This is a “funny farm” style interface. You’ll need to figure out what text you can enter in the unlabeled nodes. What do the words you can see have in common?",
    },
    {
      order: 10.0,
      description:
        "Solvers don’t know what kind of words to enter into the boxes",
      nudge:
        "You’ve been given BELGIUM and GUINEA. Do any other countries fit the other nodes?",
    },
    {
      order: 40.0,
      description:
        "Solvers have solved some countries but don’t understand how they relate",
      nudge:
        "The different colors/shapes of the lines connecting nodes express some relations between the countries. More specifically, they express a relationship between some particular national feature that each country has.",
    },
    {
      order: 50.0,
      description:
        "Solvers still don’t know what feature of the countries is being referred to",
      nudge: "The USA won’t appear in this puzzle: 13 stripes is way too many!",
    },
    {
      order: 75.0,
      description:
        "Solvers don’t understand the edges that involve the oval nodes",
      nudge:
        "The oval nodes are not countries. They describe some other object you might find on a flag.",
    },
    {
      order: 100.0,
      description:
        "Solvers have the grid filled out but don’t understand how to extract an answer",
      nudge:
        "The answer is in an oval, so it must be some object added to the flag of PERU to get the flag of CANADA.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
