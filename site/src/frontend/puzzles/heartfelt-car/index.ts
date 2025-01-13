import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Be Kind, Rewind",
  slug: "be_kind_rewind",
  code_name: "heartfelt-car",
  initial_description:
    "A series of text descriptions and a link to a map of several locations",
  answer: "HARD DISK SPACE",
  authors: ["Erin Price", "Nathan Fung", "Sarah Leadbeater"],
  editors: ["Cyrus Eyster", "James Douberley", "Joanna Murray"],
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
      order: 0.0,
      description: "Solvers don’t know how to interpret the text",
      keywords: ["clues", "text"],
      nudge: "What are these descriptions of?",
    },
    {
      order: 25.0,
      description: "Solvers don’t know what to do with the map locations",
      keywords: ["map", "locations", "towns"],
      nudge: "How can you make it as if you were standing at each location?",
    },
    {
      order: 30.0,
      description: "Solvers don’t know what to look for in streetview",
      keywords: ["streetview", "locations"],
      nudge: "Look around. Do you see anything unusual?",
    },
    {
      order: 40.0,
      description: "Solvers still don’t know what to look for in streetview",
      keywords: ["streetview", "locations"],
      nudge: "Can you be kind and rewind?",
    },
    {
      order: 85.0,
      description: "Solvers don’t know what to use to extract",
      keywords: ["extraction"],
      nudge:
        "What do all these locations have in common? How does that relate to the clues?",
    },
    {
      order: 90.0,
      description: "Solvers don’t know what to extract from",
      keywords: ["extraction"],
      nudge:
        "Why are the clues such different lengths? Do they match with something else?",
    },
    {
      order: 95.0,
      description: "Solvers don’t know what letter to extract",
      keywords: ["extraction"],
      nudge:
        "Are there words in the descriptions that are special in some way, or thematic to the puzzle?",
    },
    {
      order: 98.0,
      description: "Solvers still don’t know what letter to extract",
      keywords: ["extraction"],
      nudge:
        "“Ripsnorter” is kind of an unusual word. I wonder if there’s a good synonym for that?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
