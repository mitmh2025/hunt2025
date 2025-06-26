import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Shrinkage",
  slug: "shrinkage",
  code_name: "monstrous-spring",
  initial_description: "Two groups of clues and an image",
  answer: "NEWMANS APARTMENT",
  authors: ["Robin Deits", "Michele Pratusevich"],
  editors: ["Henry Wong", "Li-Mei Lim"],
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
      order: 15.0,
      description: "Solvers have some clues solved but don’t know what to do.",
      keywords: ["Title", "flavor"],
      nudge:
        "You might want to google the title or flavor text. Certain things…shrink when in the pool.",
    },
    {
      order: 20.0,
      description: "Solvers still don’t understand how shrinkage applies",
      keywords: ["shrinkage"],
      nudge:
        "The answers out of the pool are all longer than the answers in the pool. Can you pair them?",
    },
    {
      order: 50.0,
      description: "Solvers have the pairs but don’t know what to do",
      keywords: ["Pairs", "extraction"],
      nudge: "What did you remove when “shrinking” each word?",
    },
    {
      order: 75.0,
      description: "Solvers don’t know what order to read the new words",
      keywords: ["order"],
      nudge:
        "The clues out of the pool were given in alphabetical order by clue. In puzzle convention, this means that’s not the final order. The clues in the pool don’t seem to be in any apparent order, so perhaps that’s the order in which you should read!",
    },
    {
      order: 90.0,
      description: "Solvers have the clue phrase but don’t understand it",
      keywords: ["clue phrase"],
      nudge:
        "You should have two “shrunken” answers left in the pool. You need to unshrink those to find something to match the clue phrase. You’re looking for a location in the relevant fictional property.",
    },
  ],
  canned_responses: [
    {
      guess: ["MAN PART"],
      reply:
        "I don’t want to see that! It’s all shrunken and gross. Pretty sure your answer is out of the pool.",
    },
    {
      guess: ["PENIS"],
      reply: "You’ve gone too far. Way too far.",
    },
    {
      guess: [
        "THE FLAT IN THE SHOW ABOUT NO THING WHERE THE POST MAN HAS HIS BED",
      ],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
