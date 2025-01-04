import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "His Life-Story",
  slug: "his_life_story",
  initial_description:
    "A series of gifs of Ouija boards with a series of cards with notes below.",
  answer: "SCULLETTS CONE",
  authors: ["Laina Lomina"],
  editors: ["Nathan Fung", "Robin Deits", "Will Day"],
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
      description: "Solvers aren’t sure where to start",
      keywords: ["ouija"],
      nudge:
        "What are the Ouija boards spelling? Those don’t seem to be words, but they’re still worth paying attention to.",
    },
    {
      order: 20.0,
      description:
        "Solvers have transcribed some Ouija messages but don’t know what to do with them",
      keywords: ["ouija"],
      nudge:
        "The Ouija boards are spelling out something you might be able to find in a library (or, I should say, a very specific Library).",
    },
    {
      order: 25.0,
      description: "Solvers still don’t know what the boards are spelling",
      keywords: ["ouija"],
      nudge: "These messages are all Library of Congress call numbers.",
    },
    {
      order: 30.0,
      description:
        "Solvers have identified the books but don’t know what to do next",
      keywords: ["books"],
      nudge:
        "Have you looked at the first letters of the titles? Remember that book titles omit leading articles like “a” or “the” when presented in a card catalog.",
    },
    {
      order: 50.0,
      description: "Solvers don’t know what notes to decode",
      keywords: ["decode"],
      nudge:
        "You’ll need to match up the given cards with the actual books you’ve found.",
    },
    {
      order: 60.0,
      description:
        "Solvers have found the DECODE clue but don’t know what person is being referenced",
      keywords: ["decode"],
      nudge:
        "These books are all in a particular person’s Special Collection. That person was famous for many things, including debunking supposed paranormal events.",
    },
    {
      order: 75.0,
      description: "Solvers don’t know what data to decode in the notes",
      keywords: ["decode"],
      nudge:
        "The donor of these books made his own code, should he find himself needing to communicate from beyond the grave.",
    },
    {
      order: 90.0,
      description:
        "Solvers have decoded the code words but are getting nonsense",
      keywords: ["decode"],
      nudge:
        "Remember to OMIT SPIRITS. Some of these books have some pretty weird looking author lists…",
    },
  ],
  canned_responses: [
    {
      guess: ["DECODE HIS NOTES OMIT SPIRITS"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
