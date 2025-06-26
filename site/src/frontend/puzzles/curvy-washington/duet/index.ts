import { type PuzzleDefinition } from "../../types";
import { CURVY_WASHINGTON_AUTHORS, CURVY_WASHINGTON_EDITORS } from "../shared";

const puzzle: PuzzleDefinition = {
  title: "The Comeback: It Takes Two",
  slug: "the_comeback_it_takes_two",
  code_name: "curvy-washington (duet)",
  answer: "TREBLE THREAT",
  authors: CURVY_WASHINGTON_AUTHORS,
  editors: CURVY_WASHINGTON_EDITORS,
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [],
  canned_responses: [],
};

export default puzzle;
