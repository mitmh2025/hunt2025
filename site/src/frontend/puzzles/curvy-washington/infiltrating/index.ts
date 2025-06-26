import { type PuzzleDefinition } from "../../types";
import { CURVY_WASHINGTON_AUTHORS, CURVY_WASHINGTON_EDITORS } from "../shared";

const puzzle: PuzzleDefinition = {
  title: "Infiltrating the Criminal Underworld",
  slug: "infiltrating_the_criminal_underworld",
  code_name: "curvy-washington (infiltrating)",
  answer: "MISCHIEF MANAGED",
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
