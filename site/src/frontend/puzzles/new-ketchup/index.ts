import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import router from "./server";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "What Do They Call You?",
  slug: "what_do_they_call_you",
  initial_description: "A text adventure chat interface with one button",
  answer: "LITTLE TOM",
  authors: ["Karen Tolva", "Drew Fisher"],
  editors: ["Anna Brunner", "James Douberley", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_new_ketchup",
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [],
  router,
};

export default puzzle;
