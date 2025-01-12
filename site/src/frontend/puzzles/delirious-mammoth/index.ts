import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Whose Song Is It Anyway?",
  slug: "whose_song_is_it_anyway",
  code_name: "delirious-mammoth",
  initial_description: "A series of audio clips",
  answer: "HEDWIG AND THE ANGRY INCH",
  authors: [
    "Melanie Matchett Wood",
    "Atul Shatavart Nadig",
    "Drew Fisher",
    "Jess Knapp",
    "Nine Morch",
  ],
  editors: [
    "J. Heléne Andersson",
    "Li-Mei Lim",
    "Nathan Fung",
    "Robin Deits",
    "Sid Creutz",
  ],
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
      order: 1.0,
      description: "Solvers have not broken in",
      nudge:
        "These are not well-known songs as presented, but the lyrics and the music separately are each similar to a well-known song.",
    },
    {
      order: 10.0,
      description:
        "Solvers have identified some songs, but no connection between them. [First Hint]",
      nudge: "All the songs have something in common.",
    },
    {
      order: 15.0,
      description:
        "Solvers have identified some songs, but no connection between them. [Second Hint]",
      nudge:
        "All the songs are from Broadway musicals.  All are either well-known songs, or from well-known musicals.",
    },
    {
      order: 20.0,
      description:
        "Solvers have identified the genre, but are having trouble identifying the tunes.",
      nudge:
        "If you don’t have someone on your team who is familiar with Broadway tunes, you can try computer tools that can recognize sung or hummed tunes.  Beware that some of these are much better than others.  You can also get different results from playing the recordings directly versus singing or humming yourself.",
    },
    {
      order: 30.0,
      description:
        "Solvers have identified the genre, but are having trouble identifying the singer of the lyrics.",
      nudge:
        "You can find online compendiums of Broadway lyrics and limit your search to one of them.",
    },
    {
      order: 35.0,
      description:
        "Solvers are searching within a database of Broadway lyrics, but are having trouble identifying the songs.",
      nudge:
        "All of the significant words in the lyrics have been changed, but you may be able to guess what word another is substituting for and then search for that.",
    },
    {
      order: 40.0,
      description:
        "Solvers have identified songs, but do not know what to do with the data.",
      keywords: ["extraction"],
      nudge: "The title clues the relevant feature of the identified songs.",
    },
  ],
  canned_responses: [
    {
      guess: ["SHOW BY TRASK AND MITCHELL"],
      reply: "That is a clue.",
    },
  ],
};

export default puzzle;
