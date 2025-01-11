import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Broken Record",
  slug: "broken_record",
  initial_description:
    "A list of crossword-style clues and images of several records",
  answer: "DESTINYS CHILD",
  authors: ["Erin Price", "Alex St Claire", "Anna Brunner"],
  editors: ["Hubert Hwang", "James Douberley"],
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
      order: 25.0,
      description:
        "Solvers have found answers to most of the clues but don’t know how to fit them in the records.",
      keywords: ["records", "too long"],
      nudge:
        "How can you make the answers longer to fit into the blanks on the records? What happens when you play a broken record?",
    },
    {
      order: 50.0,
      description:
        "Solvers have entered the duplicated phrases on the records but are getting gibberish",
      keywords: ["eldwollptttls"],
      nudge: "What direction does a record typically get played in?",
    },
    {
      order: 75.0,
      description:
        "Solvers have the extracted letters from the phrases and gotten 3 words",
      nudge: "Have you tried reapplying the mechanic?",
    },
    {
      order: 100.0,
      description: "Solvers have the 3 song names",
      keywords: ["extraction"],
      nudge:
        "The blanks at the center of the last record should tell you what we’re looking for as an answer. What do these 3 songs have in common?",
    },
  ],
  canned_responses: [
    {
      guess: ["BILLS BILLS BILLS JUMPIN JUMPIN NO NO NO"],
      reply: "What do those three things have in common?",
    },
    {
      guess: ["BILLS JUMPIN NO"],
      reply: "Do I need to repeat myself?",
    },
  ],
};

export default puzzle;
