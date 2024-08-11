import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Shell Corporation 8: Zoological Garden",
  slug: "shell_corporation_8",
  authors: ["Leland Aldridge", "James Douberley"],
  editors: ["James Douberley", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Arcturus Wang"],
    },
  ],
  answer: "ALPACA LAND",
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
