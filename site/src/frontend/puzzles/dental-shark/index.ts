import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "The Boardwalk",
  slug: "the_boardwalk",
  code_name: "dental-shark",
  authors: ["Michelle Rosen"],
  editors: ["James Douberley", "Henry Wong", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [],
  answer: "BAIL MATE",
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: false,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 0,
      description:
        "The solvers haven’t figured out what these answers have in common.",
      keywords: ["start"],
      nudge:
        "The title of this puzzle, as well as each of the answers is a specific location. Consider how to make them into properties.",
    },
    {
      order: 10,
      description:
        "The solvers have figured out that these are Monopoly properties, but aren’t sure what to do with them.",
      keywords: ["monopoly"],
      nudge:
        "Each of these properties should have a specific position on the board.",
    },
    {
      order: 11,
      description:
        "The solvers have placed the locations on a board but haven’t figured out to write one letter at a time.",
      keywords: ["monopoly", "properties", "placed"],
      nudge:
        "In this game, you travel around the board. Try doing that with the property names.",
    },
    {
      order: 95,
      description:
        "The solvers have written the letters but don’t know how to extract.",
      keywords: ["extraction"],
      nudge:
        "With all the letters written out, you’ll find some commonalities in certain locations.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
