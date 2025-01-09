import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Find Other Ways of Seeing",
  slug: "find_other_ways_of_seeing",
  initial_description:
    "Strange printed text with handwritten notes and a short voice clip",
  answer: "RED SASH",
  authors: ["Leland Aldridge"],
  editors: ["Anna Brunner", "Li-Mei Lim", "Teddy McArthur"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers are trying to interpret the writing in the puzzle",
      keywords: ["Writing", "Language"],
      nudge:
        "The writing system used is from an external source. If you are not familiar with it, an image search of some words will probably turn up something helpful.",
    },
    {
      order: 20.0,
      description:
        "Solvers have interpreted the clues and come up with answers",
      keywords: ["Answers"],
      nudge:
        "All the text in this puzzle uses the same script, with different styles between typed and written words.",
    },
    {
      order: 30.0,
      description:
        "Solvers have interpreted the clues, come up with answers, and read the previous hint",
      keywords: ["Answers", "Writing"],
      nudge: "You should write your answers in the puzzle’s script as well.",
    },
    {
      order: 40.0,
      description: "Solvers have written all the answers appropriately",
      keywords: ["Written", "Script"],
      nudge:
        "You can pair each answer from the left side of the puzzle with an answer on the right side. You can probably notice some sort of similarity between how some pairs of answers are written.",
    },
    {
      order: 50.0,
      description:
        "Solvers are trying to pair left and write answers after having written them appropriately",
      keywords: ["Pairing", "Exact"],
      nudge:
        "Note that the title instructs you to “find other ways of seeing” and that the flavor text speaks of a “change of perspective.” Each glyph in a given answer should be treated the same way. If you are unsure what sort of change of perspective is needed: consider the source material and what each glyph is visually representing.",
    },
    {
      order: 60.0,
      description:
        "Solvers have paired up all the left and right answers with a specific operation for each pair",
      keywords: ["Rotations", "Ordering"],
      nudge:
        "With what you already know, the meaning of each item in the handwritten list should be clear. What should be done with these? Consider that the flavor tells you that what you’re trying to do “isn’t automatic.” If not automatic, then what?",
    },
    {
      order: 70.0,
      description:
        "Solvers are looking at the game manual pages for the named areas and are unsure how to use them",
      keywords: ["Manual", "Instruction booklet", "Game areas"],
      nudge:
        "Note that the puzzle image itself looks like a pair of manual pages, and that there’s a feature of the puzzle image you haven’t yet used.",
    },
    {
      order: 80.0,
      description: "Solvers have found the indicated portions of the manual",
      keywords: ["Circled words", "manual"],
      nudge:
        "You have seen each of the circled words before. Note that there are a number of sets of eight things in the puzzle, but only one of them is numbered.",
    },
    {
      order: 90.0,
      description: "Solvers have ordered all the pairs of clue answers",
      keywords: ["Ordered", "extraction", "audio"],
      nudge:
        "The last piece of the puzzle is the audio. You should write out what is being said, in an appropriate way. Note that a recurring number appears once again.",
    },
    {
      order: 100.0,
      description:
        "Solvers have transcribed everything in the puzzle, have paired all answers in a fully understood way, and have ordered these pairs",
      keywords: ["Extraction", "audio"],
      nudge:
        "What you should take out of your answer pairs is an ordered set of transformations. The audio is in the correct order as given.",
    },
  ],
  canned_responses: [
    {
      guess: ["CARMINE OBI THREE FOUR"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
