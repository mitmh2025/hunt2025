import type { SubpuzzleDefinition } from "../../types";

const puzzle: SubpuzzleDefinition = {
  title: "I Kid Ewe Knot",
  slug: "i_kid_ewe_knot",
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
};

export default puzzle;
