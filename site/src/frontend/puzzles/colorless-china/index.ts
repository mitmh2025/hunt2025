import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Eponymous Forensic Accountant",
  slug: "eponymous_forensic_accountant",
  code_name: "colorless-china",
  initial_description: "Physical Puzzle—Bring your own bag",
  answer: "COOKED BOOK",
  authors: ["Kawika Pierson", "Atul Shatavart Nadig"],
  editors: ["James Douberley", "Nathan Fung"],
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
      description: "Solvers don’t know what to do with the receipts",
      keywords: ["RECEIPT"],
      nudge: "The words on each receipt clue something eponymous.",
    },
    {
      order: 10.0,
      description:
        "Solvers know that the receipts clue eponyms but don’t know what to do next",
      keywords: ["SUSPECTS", "VICTIMS"],
      nudge:
        "There are two different eponymous laws that can help you detect the fraud.",
    },
    {
      order: 40.0,
      description:
        "Solvers have the suspects clue but don’t know what to do next.",
      keywords: ["EPONYM FRAUD", "PONZI", "MADOFF"],
      nudge:
        "Don’t find frauds that are eponymous, find the eponyms that are frauds.",
    },
    {
      order: 50.0,
      description:
        "Solvers have the victims clue but don’t know what to do next.",
      keywords: ["NUMBER"],
      nudge:
        "Forensic accountants are taught an eponymous law that helps them identify number cheaters.",
    },
    {
      order: 90.0,
      description:
        "Solvers have both clues and are not sure what to do with the diagram.",
      keywords: ["INTERSECTION", "VENN"],
      nudge:
        "Only the receipts that are fraudulent using both definitions are at the intersection of that Venn diagram. The first letter in the diagram’s eponym will help determine what specifically should be indexed.",
    },
  ],
  canned_responses: [
    {
      guess: [
        "NOW FIND THE FRAUDULENT EPONYMS",
        "NUMBER CHEATERS HAVE A NAMED LAW TO ALSO USE",
      ],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
