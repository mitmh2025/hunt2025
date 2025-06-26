import type { SubpuzzleDefinition } from "../../types";

const puzzle: SubpuzzleDefinition = {
  title: "Can-Do Transmissions: Radio Static",
  slug: "can_do_transmissions_static",
  content: {
    component: { lazy: () => import("./puzzle") },
    entrypoint: "puzzle_diligent_spy",
  },
};

export default puzzle;
