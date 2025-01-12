import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Tailing a Lead",
  slug: "tailing_a_lead",
  code_name: "submissive-tap",
  answer: "TALE AS OLD AS TIME",
  authors: [
    "Wesley Graybill",
    "Caroline Elliott",
    "Grant Elliott",
    "James Douberley",
  ],
  editors: [
    "Henry Wong",
    "Leland Aldridge",
    "Michele Pratusevich",
    "Wesley Graybill",
  ],
  additional_credits: [],
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
