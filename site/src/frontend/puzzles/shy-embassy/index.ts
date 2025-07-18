import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Papa’s Stash",
  slug: "papas_stash",
  code_name: "shy-embassy",
  answer: "ACCESS INVISIBLE INK",
  authors: ["Alex St Claire", "Mike Mannis"],
  editors: [
    "James Douberley",
    "Henry Wong",
    "Kevin Hwang",
    "Li-Mei Lim",
    "Robin Deits",
  ],
  additional_credits: [
    {
      for_what: "Round Art",
      who: [
        "Simone Agha",
        "Anna Brunner",
        "Lucid Clairvoyant",
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
    component: { lazy: () => import("./puzzle") },
    copyable: false,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 10.0,
      description: "Solvers are having trouble getting started",
      nudge:
        "Each feeder answer is associated with a line in the diagram, connecting two symbols",
    },
    {
      order: 30.0,
      description: "Solvers still aren’t sure what to do with feeder answers",
      nudge:
        "Each answer consists of two words, and connects two symbols. Each word of a feeder can be combined with another word to form something in a particular category, with the symbols providing a hint.",
    },
    {
      order: 50.0,
      description:
        "Solvers have identified all (or most) of the symbols and associated feeders to lines, but don’t know how to extract",
      nudge:
        "As hinted by the flavor text, you’ll need new words to extract from.",
    },
    {
      order: 70.0,
      description:
        "Solvers have the new words for extraction but are still stuck",
      nudge:
        "The letters on the lines are indices for extraction. You’ll need both the superhero and their alter egos for this step.",
    },
  ],
  canned_responses: [
    {
      guess: ["ACCESS SUE STORM INK", "ACCESS INVISIBLE WOMAN INK"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
