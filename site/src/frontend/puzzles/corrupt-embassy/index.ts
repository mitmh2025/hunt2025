import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Story Vision Contest",
  slug: "story_vision_contest",
  initial_description:
    "17 strange, very short, stories. 17 flags and associated numbers.",
  answer: "PERRALLE",
  authors: ["Joanna Murray", "Will Day"],
  editors: ["Anna Brunner", "Melanie Matchett Wood", "Michele Pratusevich"],
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
      description: "Solvers haven’t yet broken in",
      nudge:
        "Think about Vision Contests that lots of European countries participate in.",
    },
    {
      order: 10.0,
      description:
        "Solvers have surmised that Eurovision is the theme but are struggling to identify individual songs.",
      keywords: ["eurovision"],
      nudge:
        "‘Party for Everybody’ was the Russian Eurovision entry in 2012, the staging for which involved 6 old women baking bread.",
    },
    {
      order: 50.0,
      description:
        "Solvers have identified all the Eurovision entries and some fairytale details but haven’t found the intermediate clue phrase",
      keywords: ["eurovision", "fairytale", "folktale"],
      nudge: "Look at the song titles specifically.",
    },
    {
      order: 60.0,
      description:
        "Solvers have identified some Eurovision entries and some motif indices but are struggling to identify the remainder of either",
      keywords: ["smith thompson motif", "fairytale", "folktale"],
      nudge:
        "Compare the chronological order of the Eurovision entries you have with the ordering of the motif indices you’ve found.",
    },
    {
      order: 80.0,
      description:
        "Solvers have identified all of the Eurovision entries and the Motif indices",
      keywords: ["extraction"],
      nudge:
        "Compare the motif index associated with a Eurovision entry to that country’s score given in the puzzle. Is there a natural ordering to the motif indices?",
    },
    {
      order: 90.0,
      description:
        "Solvers have extracted the answer clue phrase ’TARIFASONGALBANIAN’",
      keywords: ["tarifa song albanian", "tarifa", "song", "albanian"],
      nudge: "Look for Eurovision entries where ‘Tarifa’ is the artist.",
    },
    {
      order: 100.0,
      description: "Solvers have found the song ‘Fairytale’ by Eneda Tarifa",
      keywords: ["eneda tarifa", "fairytale"],
      nudge: "Was this song ever known by another title?",
    },
  ],
  canned_responses: [
    {
      guess: ["STITH THOMPSON MOTIF", "TARIFA SONG ALBANIAN"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
