import { type PuzzleDefinition } from "../../types";
import { CURVY_WASHINGTON_AUTHORS, CURVY_WASHINGTON_EDITORS } from "../shared";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Comeback: It Takes Two",
  slug: "the_comeback_it_takes_two",
  code_name: "curvy-washington (duet)",
  answer: "TREBLE THREAT",
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
