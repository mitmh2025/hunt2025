import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Jewelry Store",
  slug: "the_jewelry_store",
  answer: "OFFER CARAT TO A LAPIDARY",
  authors: ["Mike Mannis", "Alex St Claire"],
  editors: [
    "James Douberley",
    "Henry Wong",
    "Melanie Matchett Wood",
    "Robin Deits",
  ],
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
        "Solvers are lost initially or going down wrong rabbit holes",
      nudge:
        "The flavor text about the jeweler and the image on the puzzle page hint what you are trying to do with the feeder answers.",
    },
    {
      order: 20.0,
      description: "Solvers know to chain answers but haven’t yet realized how",
      nudge:
        "Bracelets are formed by closed links connected together.  How can you link these answers together in a loop?  They connect where they have something in common.",
    },
    {
      order: 25.0,
      description:
        "Solvers know to make chains and have noticed some trigrams (probably palindromic ones) but not others (likely missed wrapping ones at answer boundaries)",
      keywords: ["ALA", "ARA"],
      nudge:
        "Trigrams are significant.  Do you see others?  How would they appear in a chained bracelet?",
    },
    {
      order: 50.0,
      description:
        "Solvers have formed the loop/chain but don’t know how to extract",
      nudge:
        "The places where the answers/links connect are significant.  The flavor text tells you where to begin.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
