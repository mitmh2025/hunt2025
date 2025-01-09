import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Shell Corporation 3: Superior Stonework",
  slug: "shell_corporation_3",
  answer: "ST PETERS BASILICA",
  authors: ["David Greenspan"],
  editors: ["James Douberley", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Simone Agha"],
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
      order: 1,
      description: "Solvers do not know how to start the puzzle.",
      keywords: ["start"],
      nudge:
        "The word search can be solved normally to find a set of 11 items with something in common.",
    },
    {
      order: 2,
      description:
        "Solvers have found the names in the word search, but cannot identify their commonality.",
      nudge:
        "All of these people have something in common, relating to MIT and the lawn in front of the Great Dome.",
    },
    {
      order: 2.1,
      description: "Solvers still cannot find these people.",
      nudge:
        "These individuals all spoke at MIT Commencement, which happens on the Killian Court lawn, in consecutive years.",
    },
    {
      order: 3,
      description:
        "Solvers have all the right people and have ordered their names by commencement year, but don’t know what to do next.",
      nudge: "The middle initials of these speakers are all incorrect.",
    },
    {
      order: 4,
      description:
        "Solvers have found the phrase ROT THIRTEEN, but don’t know what to do with it.",
      nudge:
        "The remainder of the wordsearch grid is still unused, and ROT THIRTEEN is a common operation that can be done on a selection of letters.",
    },
    {
      order: 5,
      description:
        "Solvers are looking for the 6-letter key but do not know how the answers play in.",
      keywords: ["keyword", "answer assignment"],
      nudge:
        "The feeder answers for this meta-puzzle can be plugged into the columns of the Great Dome, and the highlighted 3rd letters read out, to form a 6 letter word. Deciding what feeders to use and where in order to form a 6 letter word, is up to you.",
    },
    {
      order: 100,
      description: "Solvers are concerned that not all of their answers fit.",
      keywords: ["answers", "feeders", "assignment"],
      nudge:
        "You may be able to solve this meta without all the answers and figure out the remaining feeder assignments later.",
    },
  ],
  canned_responses: [
    {
      guess: ["ROT THIRTEEN"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
