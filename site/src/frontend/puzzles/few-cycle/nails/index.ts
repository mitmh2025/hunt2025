import { type SubpuzzleDefinition } from "../../types";

const puzzle: SubpuzzleDefinition = {
  title: "Come Get Your Nails Done",
  slug: "come_get_your_nails_done",
  content: {
    component: { lazy: () => import("./puzzle") },
  },
};

export default puzzle;
