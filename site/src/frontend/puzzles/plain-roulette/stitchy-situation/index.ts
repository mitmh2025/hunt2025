import type { SubpuzzleDefinition } from "../../types";
import Puzzle from "./puzzle";

const puzzle: SubpuzzleDefinition = {
  title: "Stitchy Situation",
  slug: "stitchy_situation",
  parent_slug: "weirdo_threaded_doodads",
  content: {
    component: Puzzle,
  },
};

export default puzzle;
