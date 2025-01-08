import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Do The Manual Calculations (Don’t Try Monte Carlo)",
  slug: "do_the_manual_calculations_dont_try_monte_carlo",
  initial_description:
    "Some increasingly unusual chessboards and graphs with rules.",
  answer: "BLISTER",
  authors: ["Nicholas Georgiou"],
  editors: ["Julian West", "Michele Pratusevich", "Teddy McArthur"],
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
      order: 0.1,
      description: "Initial hint?",
      keywords: ["getting started 1"],
      nudge: "Double Title Manifests Clue",
    },
    {
      order: 0.2,
      description: "Solvers are yet to find underlying puzzle mechanic",
      keywords: ["getting started 2"],
      nudge:
        "The terminology/notation used in the puzzle/title should give some clues to the underlying puzzle mechanic",
    },
    {
      order: 25.1,
      description:
        "Solvers are aware of the DTMC connection but not sure what to do next",
      keywords: ["mathematics 1"],
      nudge:
        "The diagrams present a static representation of a particular Markov chain specified by the proposal/acceptance rules",
    },
    {
      order: 25.2,
      description:
        "Solvers are aware that the puzzle presents some Markov chains but are unsure what to calculate",
      keywords: ["mathematics 2"],
      nudge:
        "The examples given at the start of each stage give some indication of what needs calculating and some of the steps involved in the calculations",
    },
    {
      order: 25.3,
      description:
        "Solvers need help with understanding the specific Markov chains",
      keywords: ["mathematics 3"],
      nudge:
        "A Markov chain is determined by its transition probabilities, which can be calculated from the given proposal/acceptance rules",
    },
    {
      order: 25.4,
      description:
        "Solvers are still stuck understanding the specific Markov chains",
      keywords: ["mathematics 4"],
      nudge:
        "The presented Markov chains can be viewed as random walks on (weighted) graphs",
    },
    {
      order: 30.1,
      description: "Solvers have not identified the meaning of pi",
      keywords: ["identifying pi 1"],
      nudge:
        "The symbol pi is a commonly used notation in this mathematical context (but not for 3.1415...)",
    },
    {
      order: 30.2,
      description: "Solvers are still unsure how to calculate expected return",
      keywords: ["identifying pi 2"],
      nudge:
        "There is a simple relationship between pi and the expected returns",
    },
    {
      order: 50.2,
      description: "Solvers still stuck with calculation of pi",
      keywords: ["simplifying calculations 1"],
      nudge:
        "The pi-values can be determined from parameters of the abstract graphs",
    },
    {
      order: 70.1,
      description: "Solvers need help with calculating pi",
      keywords: ["simplifying calculations 2"],
      nudge:
        "Calculating pi in general can be tricky, but the calculations simplify when the Markov chain is reversible.",
    },
    {
      order: 80.0,
      description:
        "Solvers are not sure that their answers to Stages 1-3 are correct",
      keywords: ["confirmation of answers to stages 1-3"],
      nudge:
        "The Intermezzo checker board should provide some confirmation of correct calculations",
    },
    {
      order: 90.1,
      description: "Solvers are unsure what to do in Final Stage",
      keywords: ["final stage 1"],
      nudge:
        "The tortoise is slow and the hare is fast (and speed is inversely proportional to time taken)",
    },
    {
      order: 90.2,
      description: "Solvers have not constructed a final board",
      keywords: ["final stage 2"],
      nudge: "Consider how boards A-G might be combined to form a final board",
    },
    {
      order: 90.3,
      description: "Solvers unsure what to do with final board",
      keywords: ["final stage 3"],
      nudge:
        "A common puzzle element is to “repeat the mechanic”…time to recalculate!",
    },
  ],
  canned_responses: [
    {
      guess: ["CORRECT"],
      reply: "Yes! Answers to Stages 1-3 correct! On to the Final Stage!",
    },
  ],
};

export default puzzle;
