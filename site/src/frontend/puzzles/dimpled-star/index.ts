import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Thief",
  slug: "the_thief",
  initial_description: "Placeholder",
  answer: "RIDE SIDECAR",
  authors: ["Grant Elliott", "Erin Price", "John Silvio", "Kevin Hwang"],
  editors: ["Henry Wong", "James Douberley", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      freeform: "Round art: sagha, aldeka, tinaun, beccaee",
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
