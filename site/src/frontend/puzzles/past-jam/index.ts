import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "O, Woe is Me",
  slug: "o_woe_is_me",
  initial_description: "Cryptic Crossword",
  answer: "JUGAL BONE",
  authors: ["Julian West"],
  editors: ["Nathan Fung", "Robin Deits", "Teddy McArthur"],
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
      order: 10.0,
      description: "Solvers have solved very few clues overall.",
      keywords: ["started", "idea"],
      nudge:
        "Some of the clues really can’t be solved until you know exactly what 10across and 15across are. But some can. Look for those.",
    },
    {
      order: 40.0,
      description:
        "Solvers have solved about half the “normal” clues but very few “perimeter” clues.",
      keywords: ["perimeter"],
      nudge: "In what order might the perimeter clues be presented?",
    },
    {
      order: 80.0,
      description:
        "Solvers are nearly finished but don’t know what to extract.",
      keywords: ["extraction"],
      nudge:
        "Do you know what words go into the perimeter? How many words is that?",
    },
    {
      order: 95.0,
      description:
        "Stuck on one of the last two clues (“Ride to take place...”)",
      keywords: ["last", "two", "ride"],
      nudge:
        "The definition in this clue is a slang usage. One of the part-words is a very common word.",
    },
    {
      order: 96.0,
      description: "Stuck on one of the last two clues (“15’s article...”)",
      keywords: ["last", "two", "article"],
      nudge:
        "This is an obscure word; there’s a related word which will probably be more familiar to you. One of the part-words is a common word, but is clued in one of its less common usages.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
