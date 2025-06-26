import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "A Walk in the Park",
  slug: "a_walk_in_the_park",
  code_name: "misguided-revolution",
  initial_description:
    "Lists of common phrases and two large abstract graphics",
  answer: "LONG STRIDE",
  authors: ["Dan Pappas", "Stephanie Murray"],
  editors: [
    "Elan Blaustein",
    "Hubert Hwang",
    "James Douberley",
    "Melanie Matchett Wood",
    "tinaun",
  ],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Nine Morch"],
    },
  ],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers have not broken in yet",
      keywords: ["start", "begin", "images"],
      nudge:
        "Take a look at the images in the puzzle; what do they remind you of?  Don’t forget every part of the puzzle is fair game including the title and flavor text.",
    },
    {
      order: 10.0,
      description: "Solvers are having trouble identifying attractions",
      keywords: ["hints", "list", "break in"],
      nudge: "All the clues point to rides specifically",
    },
    {
      order: 25.0,
      description:
        "Solvers cannot identify second park after identifying Magic Kingdom",
      keywords: ["Park", "second", "map", "where is this"],
      nudge:
        "Remember Orlando has lots of parks and some of them like Disney are parks that are part of a bigger park.",
    },
    {
      order: 30.0,
      description:
        "Solvers cannot figure out what to do with rides once identified",
      keywords: ["rides", "clues", "extraction"],
      nudge:
        "Formatting is important in this puzzle.  Don’t forget every part of the puzzle is fair game including the title and flavor text.",
    },
    {
      order: 60.0,
      description:
        "Solvers can’t identify letters after identifying solving mechanism",
      keywords: ["letters", "drawing", "extraction"],
      nudge:
        "The letters may be upper or lower case. Make sure the lines are straight. It may be helpful to actually draw the lines on the official map.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
