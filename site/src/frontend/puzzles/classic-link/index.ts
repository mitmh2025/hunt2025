import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Half Baked",
  slug: "half_baked",
  code_name: "classic-link",
  initial_description: "Photos of ingredients and baked goods",
  answer: "BANANA BREAD",
  authors: ["Sue Broder", "Eric Broder"],
  editors: ["Amanda Giermann", "J. Heléne Andersson", "James Douberley"],
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
      order: 1.0,
      description:
        "Solvers have not even figured out that an ingredient is missing",
      keywords: ["What do I do with this"],
      nudge: "What is missing from the photos on the left?",
    },
    {
      order: 2.0,
      description:
        "The solvers have not figured out the full name of the missing ingredient or don’t understand the enumerations on the left",
      keywords: ["missing ingredient", "enumeration"],
      nudge: "Have you looked for very specific versions of each missing item?",
    },
    {
      order: 3.0,
      description: "The solvers have not found the correct recipes",
      keywords: ["recipe"],
      nudge:
        "Instead of searching the internet, have you tried searching the grocery store?",
    },
    {
      order: 4.0,
      description: "Solvers have not found the specific canonical recipes",
      keywords: ["recipe"],
      nudge:
        "The specific relevant recipes can be found on the missing ingredients from the left-side photos.",
    },
    {
      order: 5.0,
      description:
        "Solvers have identified the correct recipes and missing ingredients and matched them",
      keywords: ["extraction"],
      nudge:
        "Once you have all the recipes identified, the measurement in the right-hand column will help you pick a specific ingredient from that recipe.",
    },
    {
      order: 6.0,
      description: "Final step",
      keywords: ["Extraction"],
      nudge:
        "Once you have identified all the baked goods and recipes and used the measurements to pick specific ingredients from those recipes, read the first letters of those ingredients (full names). The left column is alphabetized, so you’ll want to read in the order of the right column.",
    },
  ],
  canned_responses: [
    {
      guess: ["GIVE US DOUGH"],
      reply:
        "Bring us dough—but fully baked, please!  Bring the real thing to the bartenders at the Gala, who will give you the puzzle answer. The bartenders are a bit snobbish, so homemade items will get you some bonus points.\n\nDuring Mystery Hunt, when teams presented the bartenders with (hopefully) an actual baked good, they were given the final answer (something they had already found!): BANANA BREAD.",
      providesSolveReward: true,
    },
  ],
};

export default puzzle;
