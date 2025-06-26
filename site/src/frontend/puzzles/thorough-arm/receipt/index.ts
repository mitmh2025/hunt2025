import type { SubpuzzleDefinition } from "../../types";

const puzzle: SubpuzzleDefinition = {
  title: "Ye Olde Mystery Hunt Tavern Receipt",
  slug: "ye_olde_mystery_hunt_tavern_receipt",
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
};

export default puzzle;
