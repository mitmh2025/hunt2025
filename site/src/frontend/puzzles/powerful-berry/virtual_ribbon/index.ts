import type { SubpuzzleDefinition } from "../../types";

const puzzle: SubpuzzleDefinition = {
  title: "Virtual Ribbon",
  slug: "virtual_ribbon",
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
};

export default puzzle;
