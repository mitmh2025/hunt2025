import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "To Do: Tile That Rectangle",
  slug: "to_do_tile_that_rectangle",
  code_name: "distorted-bugle",
  initial_description:
    "Rectangles of different lengths with words on the center and edges",
  answer: "PINEWOOD LADDER",
  authors: ["Nathan Fung"],
  editors: ["Henry Wong", "Sid Creutz", "Steve Banzaert"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 5.0,
      description: "Solvers aren’t sure how to start",
      keywords: ["start"],
      nudge:
        "The pieces should be assembled so that the property described on the edge is true of the central word on the adjacent pieces.",
    },
    {
      order: 10.0,
      description: "Solvers aren’t sure what the overall shape is",
      keywords: ["start", "shape"],
      nudge:
        "Taking the smallest pieces as 1x1 squares, the overall assembled size of the rectangle is 6 by 9.5.",
    },
    {
      order: 20.0,
      description:
        "Solvers have assembled the pieces, but aren’t sure what to do next",
      keywords: ["assembled"],
      nudge:
        "After assembling the rectangle, there are unused properties facing the outside edge of the puzzle. Each long edge’s properties can be taken together to determine a unique word.",
    },
    {
      order: 50.0,
      description:
        "Solvers haven’t figured out what the assembled pieces work together to be",
      keywords: ["assembled"],
      nudge:
        "The words derived from the left and right edges of the diagram work together to suggest how to use the pieces.",
    },
    {
      order: 90.0,
      description: "Solvers aren’t sure how to extract",
      keywords: ["extraction"],
      nudge:
        "Each path through the diagram is bordered by a series of properties that allow determining a unique word for that path. The derived words from the top and bottom edge suggest what you need from the words on the paths.",
    },
  ],
  canned_responses: [
    {
      guess: ["GHOST LEG"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
