import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Papa’s Bookcase (Under Blacklight)",
  slug: "papas_bookcase_blacklight",
  answer: "ADOPT A BABY VOICE",
  authors: ["Alex St Claire", "Mike Mannis"],
  editors: ["James Douberley", "Kevin Hwang", "Li-Mei Lim", "Robin Deits"],
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
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [],
};

export default puzzle;
