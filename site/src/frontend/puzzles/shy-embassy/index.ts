import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Papa’s Stash",
  slug: "papas_stash",
  initial_description: "Second submeta for Illegal Search",
  answer: "ACCESS INVISIBLE INK",
  authors: ["Alex St Claire", "Mike Mannis"],
  editors: [
    "James Douberley",
    "Henry Wong",
    "Kevin Hwang",
    "Li-Mei Lim",
    "Robin Deits",
  ],
  additional_credits: [
    {
      for_what: "Art",
      who: [
        "Anna Brunner",
        "Arcturus Wang",
        "Gareth",
        "Karen Rustad Tolva",
        "Nine Morch",
        "rfong",
        "Simone Agha",
      ],
    },
    {
      for_what: "Tech",
      who: ["Drew Fisher", "Fuzzy Shonaldmann"],
    },
  ],
  content: {
    component: Puzzle,
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [
    {
      guess: ["ACCESS INVISIBLE WOMAN INK"],
      reply: 'Resubmit without "woman"',
    },
    {
      guess: ["ACCESS SUE STORM INK"],
      reply: "Sue Storm?",
    },
    {
      guess: ["INVISIBLE INK"],
      reply: "Submit full answer phrase",
    },
  ],
};

export default puzzle;
