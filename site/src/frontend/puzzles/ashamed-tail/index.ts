import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Absolutely Not Balderdash",
  slug: "absolutely_not_balderdash",
  initial_description: "Five groups of crossword-style clues.",
  answer: "NIMBLE FEET",
  authors: ["Julian West", "Chris Pringle"],
  editors: ["Anna Brunner", "Melanie Matchett Wood", "Teddy McArthur"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 10.0,
      description:
        "Solvers have solved some clues but don’t see an overall structure.",
      keywords: ["ambiguous", "have in common", "consistency"],
      nudge:
        "What is the total length, adding them up, of all the required answers in a block of clues?",
    },
    {
      order: 20.0,
      description:
        "Solvers know that the answers in a block total 100 letters.",
      keywords: ["awkward clues", "panalphabetic"],
      nudge:
        "What is the total length of all the *clues* in a block? Does that number suggest anything? What else might two blocks have in common?",
    },
    {
      order: 51.1,
      description: "Solvers are stuck on the “Asia folk” clue in block 1",
      keywords: ["block 1", "Asia folk"],
      nudge:
        "The nationality associated with these “Asia folk” is actually an obsolete term.",
    },
    {
      order: 51.2,
      description:
        "Solvers are stuck on the “Tuileries art exhibition” clue in block 1",
      keywords: ["block 1", "Tuileries art exhibition"],
      nudge: "Where are the Tuileries, and what can you find there?",
    },
    {
      order: 51.3,
      description:
        "Solvers are stuck on the “TV Drew or Spade” clue in block 1",
      keywords: ["block 1", "TV Drew or Spade"],
      nudge:
        "Think of fictional characters named Drew and Spade who have something in common. What is their profession?",
    },
    {
      order: 52.1,
      description:
        "Solvers are stuck on the “eye imagizer dot” clue in block 2",
      keywords: ["block 2", "eye imagizer dot"],
      nudge: "The “eye imagizer dot” is a specific part of the eye.",
    },
    {
      order: 52.2,
      description:
        "Solvers are stuck on the “avis (needing a queen?)” clue in block 2",
      keywords: ["block 2", "avis (needing a queen?)"],
      nudge: "What kind of bird would need a queen?",
    },
    {
      order: 53.1,
      description:
        "Solvers are stuck on the “we find e.g. Pisces” clue in block 3",
      keywords: ["block 3", "we find eg. Pisces"],
      nudge:
        "One region of the sky where Pisces is located is the zodiac. Find another one.",
    },
    {
      order: 53.2,
      description: "Solvers are stuck on the “to the max” clue in block 3",
      keywords: ["block 3", "to the max"],
      nudge:
        "“to the max” is a lot less formal than the (non-English) term that it is cluing.",
    },
    {
      order: 54.1,
      description:
        "Solvers are stuck on the “sings “Abdulmajid”” or “warble “Zoe”, “Geronimo”” clues in block 4",
      keywords: ["block 4"],
      nudge:
        "“sings “Abdulmajid”” and “warble “Zoe”” are basically the same kind of clue, and looking for the same kind of answer.",
    },
    {
      order: 54.2,
      description: "Solvers are stuck on the “>>> than a few” clue in block 4",
      keywords: ["block 4", ">>> than a few", "more than a few"],
      nudge:
        "The answer to the “more than a few” clue really is a *lot* more than a few.",
    },
    {
      order: 55.1,
      description:
        "Solvers are stuck on the “slogan of Henry V” clue in block 5",
      keywords: ["block 5", "slogan of Henry V"],
      nudge:
        "We’re looking for an actual slogan used by Henry the Fifth (and other British monarchs). It doesn’t appear in Shakespeare’s play about Henry V.",
    },
    {
      order: 55.2,
      description: "Solvers are stuck on the “dig & die” clue in block 5",
      keywords: ["block 5", "dig & die"],
      nudge:
        "For “dig & die”, we want something that you might dig, and in which you might die.",
    },
    {
      order: 90.0,
      description:
        "They have completely solved at least three blocks, but don’t know what to extract.",
      keywords: ["Extraction"],
      nudge:
        "Do you know what word game uses this letter distribution? Does that give you an idea of what to extract?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
