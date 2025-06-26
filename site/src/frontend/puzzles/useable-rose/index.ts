import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Commentary",
  slug: "commentary",
  code_name: "useable-rose",
  initial_description: "A list of nonsense strings of text",
  answer: "WHITE HOUSE",
  authors: ["James Douberley", "Mike Mannis"],
  editors: ["Chris Gatesman", "Robin Deits", "Teddy McArthur"],
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
      order: 10.0,
      description:
        "Solvers have not figured out how to interpret the nonsense clues",
      nudge:
        "Look carefully at some of the nonsense clues - do you see any pieces of familiar words? Try separating each clue into multiple recognizable words.",
    },
    {
      order: 30.0,
      description:
        "Solvers have many (or all) of the clue answers but don’t know what to do with them",
      nudge:
        "You can do something with each clue answer individually.  A hint is embedded in the clue list!",
    },
    {
      order: 40.0,
      description: "Solvers still don’t know what to do with the clue answers",
      nudge:
        "Check the initial letters of the clue list.  They form a clue: TELCO COLOR CODE. Try searching this.",
    },
    {
      order: 50.0,
      description:
        "Solvers still don’t know what to do with clue answers even after seeing the hint for this step",
      nudge:
        "Each clue answer can be paired with a color to make a common two-word phrase or name.",
    },
    {
      order: 90.0,
      description:
        "Solvers have extracted and submitted the last partial answer but are still stuck",
      nudge:
        "You have solved a crossword clue to get HOUSE... what was the next thing you did during the puzzle for each clue answer?",
    },
  ],
  canned_responses: [
    {
      guess: ["HOME OR TV DR FIVE"],
      reply: "This is a clue! What word would fit?",
    },
    {
      guess: ["HOUSE"],
      reply: "Which house?",
    },
  ],
};

export default puzzle;
