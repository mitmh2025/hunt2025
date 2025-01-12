import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Seeing the Big Picture",
  slug: "seeing_the_big_picture",
  code_name: "lofty-theory",
  answer: "THE OLD COLLAGE TRY",
  authors: ["Leland Aldridge", "Li-Mei Lim", "Wesley Graybill"],
  editors: ["James Douberley", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Anna Brunner"],
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
