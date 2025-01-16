import { type PuzzleDefinition } from "../../types";
import { CURVY_WASHINGTON_AUTHORS, CURVY_WASHINGTON_EDITORS } from "../shared";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Trainee’s First Recital",
  slug: "trainees_first_recital",
  code_name: "curvy-washington (recital)",
  answer: "A TRUE VIRTUOSO",
  authors: CURVY_WASHINGTON_AUTHORS,
  editors: CURVY_WASHINGTON_EDITORS,
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
