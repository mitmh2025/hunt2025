import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Papa’s Bookcase",
  slug: "papas_bookcase",
  answer: "FEEL GOOD FICTION",
  authors: ["Hubert Hwang", "Alex St Claire", "James Douberley", "Mike Mannis"],
  editors: ["Kevin Hwang", "Li-Mei Lim", "Robin Deits"],
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
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [],
};

export default puzzle;
