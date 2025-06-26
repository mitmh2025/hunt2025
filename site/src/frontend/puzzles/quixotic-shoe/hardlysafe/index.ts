import type { SubpuzzleDefinition } from "../../types";

const puzzle: SubpuzzleDefinition = {
  title: "HardlySafe",
  slug: "hardlysafe",
  answer: "IMAGE",
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
};

export default puzzle;
