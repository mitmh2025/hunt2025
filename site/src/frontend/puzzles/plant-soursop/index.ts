import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Editor’s Solemnity",
  slug: "editors_solemnity",
  code_name: "plant-soursop",
  initial_description: "A series of nonsense phrases",
  answer: "KNIFE",
  authors: ["Teddy McArthur", "tinaun"],
  editors: ["Henry Wong", "James Douberley"],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 10.1,
      description: "Solvers are unsure where to start.",
      keywords: ["start"],
      nudge:
        "These appear to be nonsense phrases, but there’s a method to the mayhem here. Try looking past any spacing or punctuation and seeing what you find.",
    },
    {
      order: 10.2,
      description: "Solvers are still unsure of where to start.",
      nudge:
        "This puzzle is a reverse printer’s devilry. In a printer’s devilry, nonsense words become a reasonable phrase when a word is added. Here, nonsense phrases become a reasonable phrase when a word is removed-- specifically, a definition of the removed word.",
    },
    {
      order: 90.1,
      description:
        "Solvers have an answer for each line, but are unsure of extraction.",
      keywords: ["extraction"],
      nudge:
        "To get these words, you had to remove them from the middle of each line. Can you repeat the mechanic on these words?",
    },
  ],
  canned_responses: [
    {
      guess: ["ANSKNIFEWER"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
