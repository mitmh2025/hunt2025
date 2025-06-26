import type { SubpuzzleDefinition } from "../../types";

const puzzle: SubpuzzleDefinition = {
  title: "DraughtQueens",
  slug: "draughtqueens",
  answer: "CARTEL",
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
};

export default puzzle;
