import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "As the World Turandot",
  slug: "as_the_world_turandot",
  initial_description: "TV listings with a paragraph describing each episode",
  answer: "LA GIOCONDA",
  authors: ["Julian West"],
  editors: ["Erin Price", "Henry Wong", "James Douberley", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Simone Agha"],
    },
    {
      for_what: "Title",
      who: ["Erin Price"],
    },
  ],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 10.0,
      description: "Solvers have not identified anything",
      keywords: ["stuck", "no idea"],
      nudge:
        "These sound like descriptions of *soap operas*. What are they really?",
    },
    {
      order: 20.0,
      description: "Solvers think it’s about operas, but can’t find any",
      keywords: ["opera"],
      nudge:
        "The clue at 2pm is a pretty famous one. What is the title suggesting?",
    },
    {
      order: 50.0,
      description:
        "Solvers have identified half or more but are struggling with the last few",
      keywords: ["operas", "last ones", "obscure", "unfamiliar"],
      nudge: "Can you identify why the clues have been given in this order?",
    },
    {
      order: 60.0,
      description:
        "Solvers know that they are ordered alphabetically by composer, but stuck on last few",
      keywords: ["composers", "last ones"],
      nudge:
        "Have you noticed that all of the names of characters appear to be wrong?",
    },
    {
      order: 80.0,
      description:
        "Solvers have identified most of the operas but are stuck for extraction",
      keywords: ["extraction"],
      nudge:
        "How could you connect these clues to put them into a different order?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
