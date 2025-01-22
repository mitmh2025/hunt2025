import type { SubpuzzleDefinition } from "../../types";
import Puzzle from "./puzzle";

const puzzle: SubpuzzleDefinition = {
  title: "Can-Do Transmissions: Radio Static",
  slug: "can_do_transmissions_static",
  content: {
    component: Puzzle,
    entrypoint: "puzzle_diligent_spy",
  },
};

export default puzzle;
