import type { SubpuzzleDefinition } from "../../types";

const puzzle: SubpuzzleDefinition = {
  title: "BetterOprah",
  slug: "betteroprah",
  answer: "MOVE",
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
};

export default puzzle;
