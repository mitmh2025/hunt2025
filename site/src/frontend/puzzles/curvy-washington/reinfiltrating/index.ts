import { type PuzzleDefinition } from "../../types";
import { CURVY_WASHINGTON_AUTHORS, CURVY_WASHINGTON_EDITORS } from "../shared";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "RE-Infiltrating the Criminal Underworld",
  slug: "re_infiltrating_the_criminal_underworld",
  code_name: "curvy-washington (reinfiltrating)",
  answer: "I KNEW YOU WERE TROUBLE",
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
