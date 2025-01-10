import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Chemicals Are Sexy",
  slug: "chemicals_are_sexy",
  initial_description:
    "Cryptic-y clues and chemical bottles",
  answer: "ESCALATION",
  authors: ["Sid Creutz", "Chris Roske", "Kevin Hwang"],
  editors: ["Joel Fried", "Jonathan Lay", "Steve Banzaert"],
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
      description: "Solvers are unfamiliar with cryptics",
      keywords: ["what kinds of clues", "first two groups"],
      nudge:
        "Some of the clues in this puzzle are in the style of cryptic wordplay clues. If you are unfamiliar with cryptics, an introductory reference for them is https://www.puzzazz.com/how-to/cryptic-crosswords. Note that the clues in this puzzle lack the definition portion of a standard cryptic clue.",
    },
    {
      order: 0.1,
      description:
        "Solvers are unfamiliar with cryptics and may need a starting nudge",
      keywords: ["not sure where to start"],
      nudge:
        "If you are new to cryptic clues, start with the second set of clues (the right-justified set). The first set of clues are also cryptic in nature but have some unusual features.",
    },
    {
      order: 1.0,
      description: "The solvers are stuck starting the puzzle",
      keywords: ["not sure where to start"],
      nudge:
        "There are three sets of clues. One from each group will be matched up with the others.",
    },
    {
      order: 10.0,
      description: "Solvers are stuck on the second set of clues, nudge",
      keywords: ["second set of clues"],
      nudge: "The clues in the second section output words fitting a theme.",
    },
    {
      order: 11.0,
      description: "Solvers are stuck on the second set of clues, large hint",
      keywords: ["second set of clues"],
      nudge:
        "The clues in the second section produce common names of chemicals.",
    },
    {
      order: 40.0,
      description: "Solvers are stuck on the first set of clues",
      keywords: ["first set of clues", "digits"],
      nudge:
        "The first set of clues contain some entries that do not clue standard English words.",
    },
    {
      order: 41.0,
      description:
        "Solvers are still having difficulty on the first set of clues",
      keywords: ["first set of clues", "digits"],
      nudge:
        "Some of the wordplay in the first section references digits (in addition to letters). The clues in the first section will not produce english words as output.",
    },
    {
      order: 42.0,
      description: "Solvers still stuck on first sections, need a big hint",
      keywords: ["first set of clues", "digits"],
      nudge: "The clues in the first section produce molecular formulas.",
    },
    {
      order: 70.0,
      description: "Solvers are stuck on the third set of clues, slight nudge",
      keywords: ["third set of clues", "bottles", "warning labels"],
      nudge:
        "The third set of clues are different from the first two - rather than cryptic wordplay, these are more direct hints.",
    },
    {
      order: 71.0,
      description: "Solvers are stuck on the third set of clues, bigger hint",
      keywords: ["third set of clues", "bottles", "warning labels"],
      nudge:
        "The warning notes are technically correct statements about different chemicals. Most of these can be confirmed via wikipedia.",
    },
    {
      order: 80.0,
      description:
        "Solvers have solved all three sets of clues but do not know what the numbers are for.",
      keywords: ["shifts", "enumerations"],
      nudge:
        "One clue from each section can be grouped together. This will provide three numerical shifts in order.",
    },
    {
      order: 81.0,
      description: "Solvers don’t know what CAS numbers are, light hint",
      keywords: ["shifts", "enumerations"],
      nudge: "There is a system for numerically identifying chemicals.",
    },
    {
      order: 82.0,
      description: "Solvers don’t know what CAS numbers are, big hint",
      keywords: ["shifts", "enumerations"],
      nudge:
        "Chemicals can be numerically identified with what is called a CAS number. This consists of three numbers, in order, separated by dashes.",
    },
    {
      order: 83.0,
      description: "Solvers don’t know what CAS numbers are, explicit hint",
      keywords: ["shifts", "enumerations"],
      nudge:
        "Identify the 11 chemicals and find their CAS numbers (generally easy to find with google). Apply the corresponding shifts to the three parts of the CAS number to obtain a new CAS number.",
    },
    {
      order: 90.0,
      description: "Solvers need help with final extraction",
      keywords: ["extraction"],
      nudge:
        "Applying numerical shifts to the CAS number of each original chemical produces a new chemical. Compare these to the unshifted chemical.",
    },
    {
      order: 91.0,
      description: "Solver need help with final extraction, bigger hint",
      keywords: ["extraction"],
      nudge:
        "The new shifted chemicals resemble the original chemicals except with one or two atoms of the same element replaced with a new element (e.g. Mg(OH)2 -> Ca(OH)2).",
    },
    {
      order: 92.0,
      description:
        "Solvers need help with final extraction, explicit instruction",
      keywords: ["extraction"],
      nudge:
        "List the new elements found in the shifted chemicals in the order provided by the first set of clues, as elemental abbreviations, in order to obtain the final instruction.",
    },
  ],
  canned_responses: [
    {
      guess: ["CALLINESCALATION"],
      reply: "That looks good, call it in!",
    },
  ],
};

export default puzzle;
