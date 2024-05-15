import type { PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";
import { lookupScript, lookupStylesheet } from "@/assets";

const puzzle: PuzzleDefinition = {
  title: "Just Keep Swiping",
  slug: "just_keep_swiping",
  authors: ["Somebody"],
  content: {
    component: Puzzle,
    scripts: [lookupScript("tinder")],
    stylesheets: [lookupStylesheet("tinder")],
  },
  solution: {
    component: Solution,
  },
  answer: "SWIPE LEFT",
  hints: [], // TODO: typeset
  canned_responses: [], // TODO: typeset
};

export default puzzle;
