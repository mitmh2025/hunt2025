import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Navigating High Society",
  slug: "navigating_high_society",
  code_name: "velvety-change",
  answer: "COSMOPOLITAN",
  authors: [
    "Wesley Graybill",
    "Caroline Elliott",
    "Grant Elliott",
    "Leland Aldridge",
  ],
  editors: [
    "Amanda Giermann",
    "James Douberley",
    "Jesse Moeller",
    "Leland Aldridge",
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
