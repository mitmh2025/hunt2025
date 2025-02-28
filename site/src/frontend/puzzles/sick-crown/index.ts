import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Papa’s Bookcase (Under Blacklight)",
  slug: "papas_bookcase_blacklight",
  code_name: "sick-crown",
  answer: "ADOPT A BABY VOICE",
  authors: ["Alex St Claire", "Mike Mannis"],
  editors: ["James Douberley", "Kevin Hwang", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Round Art",
      who: [
        "Simone Agha",
        "Anna Brunner",
        "Gareth Hinds",
        "Nine Morch",
        "rfong",
        "Karen Rustad Tolva",
        "Arcturus Wang",
      ],
    },
    {
      for_what: "Tech",
      who: ["Drew Fisher", "Fuzzy Shonaldmann"],
    },
  ],
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
      description: "Solvers trying to determine what is relevant to meta",
      keywords: ["Start of meta"],
      nudge:
        "The meta involves five puzzles that need to be re-solved producing five new answers under the blacklight.",
    },
    {
      order: 20.0,
      description:
        "Solvers have not discovered the newly available clue in the room",
      nudge: "Have you checked the phone in Papa’s office?",
    },
    {
      order: 30.0,
      description:
        "Solvers don’t know what to do with the four highlighted books",
      nudge:
        "The phone could help you understand what to do with these books.  They don’t match to feeder answers.",
    },
    {
      order: 50.0,
      description: "Solvers don’t know what the feeders represent",
      nudge:
        "The feeder answers all belong to a category of things, and it isn’t books.",
    },
    {
      order: 55.0,
      description: "Solvers still haven’t identified feeders",
      nudge:
        "The feeders are all movie titles.  The flavor text will help you with the next steps.",
    },
    {
      order: 60.0,
      description: "Solvers know what feeders represent, but are stuck",
      nudge:
        "The flavor text will help you here.  Leads (actors) from the movies did something relating to books...",
    },
    {
      order: 80.0,
      description:
        "Solvers have the correct books identified but are stuck at extraction",
      nudge:
        "Use the indexing from the telephone hint with the feeder answers.",
    },
  ],
  canned_responses: [
    {
      guess: ["INDEX ANSWERS"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
