import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Unreal Islands",
  slug: "unreal_islands",
  initial_description: "A grid filled with letters and numbers",
  answer: "BATH BRICK",
  authors: ["Becca Chang", "Atul Shatavart Nadig", "Henry Wong"],
  editors: ["Henry Wong", "Li-Mei Lim", "Robin Deits", "Tanya Khovanova"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers have no idea what to do",
      keywords: ["No idea", "starting"],
      nudge:
        "Look at the flavortext more closely, and in particular the phrase “Islands in the stream.”",
    },
    {
      order: 1.0,
      description:
        "Solvers think the flavortext refers to the song by Dolly Parton",
      keywords: ["song", "islands in the stream"],
      nudge:
        "The phrase “islands in the stream” is not referring to a song. Look for puzzles with this name.",
    },
    {
      order: 2.0,
      description: "Solvers want strong nudge on what to start with",
      keywords: ["start"],
      nudge:
        "The flavortext is referring to the Nikoli logic puzzle “Nurikabe.”",
    },
    {
      order: 10.0,
      description: "Solvers are not able to solve the nurikabe puzzle",
      keywords: ["logic puzzle", "nurikabe"],
      nudge:
        "Make sure you look at the rules of nurikabe—the stream is one connected region without 2x2 blocks, and there are no unclued islands. Some regions (especially the top-center) are quite constrained.",
    },
    {
      order: 80.0,
      description: "Solvers have solved nurikabe, don’t know what to do next",
      keywords: ["nurikabe", "solved", "extraction"],
      nudge:
        "You solved “islands in the stream.” Look at the islands and the letters in them.",
    },
    {
      order: 81.0,
      description: "Solvers don’t know what to do with letters on islands",
      keywords: ["letters", "islands", "nurikabe"],
      nudge:
        "As the flavortext, the words in these islands are “missing” something. ALANTIS with a number in it might be the easiest to figure out. The title and the shape of the grid may be useful to think of.",
    },
    {
      order: 82.0,
      description: "Solvers don’t understand what to do with letters at all",
      keywords: ["extraction"],
      nudge:
        "Each island contains the name of a ghost/phantom island with a letter replaced with a number.",
    },
    {
      order: 99.0,
      description: "Solvers have island names and are stuck",
      keywords: ["final extraction", "extraction"],
      nudge: "Can you see what was “missing” from the islands?",
    },
    {
      order: 100.0,
      description: "Solvers are stuck on extraction and want strong nudge",
      keywords: ["extraction"],
      nudge:
        "The letters that are missing from the islands spell out the answer.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
