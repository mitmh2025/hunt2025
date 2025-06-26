import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Taste Explosion",
  slug: "taste_explosion",
  code_name: "next-van",
  initial_description: "A word search with color splotches at the bottom",
  answer: "FISH AND CHIPS",
  authors: ["James Douberley", "Emilie Josephs"],
  editors: ["Li-Mei Lim", "Robin Deits"],
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
      order: 1.0,
      description:
        "Solvers have found some things in the word search, but don’t know what to do with them",
      keywords: ["start"],
      nudge:
        "Each of the 15 entries in the word search is part of a set, which can be associated with the colors below.",
    },
    {
      order: 1.5,
      description:
        "Solvers have found all the word search entries but cannot find their commonalities",
      keywords: ["data set", "connection"],
      nudge:
        "All of the 15 entries are flavors of Lay’s Potato Chips found around the world, and can be associated with the the color splotches by their bag colors.",
    },
    {
      order: 2.0,
      description:
        "Solvers have associated the flavors to the bag colors, but don’t know how to extract",
      keywords: ["flavors", "extraction"],
      nudge:
        "The blanks before and after the bag colors should indicate which letters to take from the grid.",
    },
    {
      order: 3.0,
      description:
        "Solvers have found the cluephrase and acted on it, but are unsure what to do next",
      keywords: ["ruffle", "ruffled", "grid", "next step"],
      nudge:
        "The new top and bottom rows of the ruffled grid will spell out what to do.",
    },
    {
      order: 4.0,
      description:
        "Solvers have found more flavors, with turns, in the ruffled grid",
      keywords: ["extraction"],
      nudge: "The newly found flavors with turns form identifiable shapes.",
    },
  ],
  canned_responses: [
    {
      guess: ["FISH+CHIPS"],
      reply: "3 English words, please!",
    },
    {
      guess: ["FISHNCHIPS"],
      reply: "3 English words please!",
    },
  ],
};

export default puzzle;
