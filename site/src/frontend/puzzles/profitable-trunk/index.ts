import type { PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Shell Corporation 5: Stellar Public Relations",
  slug: "shell_corporation_5",
  code_name: "profitable-trunk",
  authors: ["Li-Mei Lim"],
  editors: ["James Douberley", "Robin Deits"],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  answer: "MARCUS ODAY",
  hints: [
    {
      order: 1,
      description: "The solvers don’t know where to start.",
      keywords: ["start"],
      nudge:
        "The top set of numbered blanks gives clues about which feeder answers are used in this puzzle.",
    },
    {
      order: 2,
      description: "The solvers don’t understand the meaning of the colors.",
      nudge:
        "The colors give incomplete information about repeated letters in the feeder answers.",
    },
    {
      order: 3,
      description:
        "The solvers haven’t figured out what the puzzle is about and how to fill in the blanks below.",
      nudge:
        "Each set of blanks above matches with one below, with the colored letters in common. The flavortext hints at what kinds of things fill in the blanks below.",
    },
    {
      order: 4,
      description: "The solvers still don’t know what the puzzle is about.",
      nudge: "This puzzle is about the moon.",
    },
    {
      order: 10,
      description:
        "The solvers have identified the lunar features but don’t know what to do next.",
      keywords: ["extraction"],
      nudge: "Use the sequences of numbers at the end to draw some paths.",
    },
    {
      order: 100,
      description:
        "The solvers are concerned that not all of their answers fit.",
      keywords: ["answers", "assignment", "feeders"],
      nudge:
        "You may be able to solve this meta without all the answers and figure out the remaining feeder assignments later.",
    },
  ],
  canned_responses: [
    {
      guess: ["MARCUS D ODAY", "MARCUS DRIVER ODAY"],
      reply: "This is a little too much; just first and last name are enough",
    },
    {
      guess: ["ODAY"],
      reply: "Almost there, but we’re looking for something more full.",
    },
    {
      guess: ["ODAY CRATER"],
      reply: "Almost there.  Who is it named for?",
    },
  ],
};

export default puzzle;
