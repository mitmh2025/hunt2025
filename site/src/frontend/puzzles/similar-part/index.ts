import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Art History",
  slug: "art_history",
  initial_description: "An invitation to visit the Gala",
  answer: "FUR COAT",
  authors: ["Sarah Leadbeater", "Arcturus Wang"],
  editors: [
    "James Douberley",
    "Michele Pratusevich",
    "Nathan Fung",
    "Steve Banzaert",
    "Teddy McArthur",
  ],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 10.0,
      description: "Reminder to read the flavor text",
      keywords: ["flavor text"],
      nudge: "Have you read the flavor text?",
    },
    {
      order: 20.0,
      description: "Solvers aren’t sure what they’re looking for",
      keywords: ["what to look for"],
      nudge: "It’s interesting that all of these paintings are untitled.",
    },
    {
      order: 30.0,
      description: "Solvers are’nt sure how to apply the flavor text",
      keywords: ["flavor text", "mystery hunt history"],
      nudge:
        "How might these paintings relate to the history of the MIT Mystery Hunt?",
    },
    {
      order: 40.0,
      description: "Solvers haven’t figured out where to find the titles",
      keywords: [
        "flavor text",
        "painting titles",
        "applying info from old mystery hunts",
      ],
      nudge: "What mystery hunt item typically has titles?",
    },
    {
      order: 50.0,
      description:
        "Solvers are’nt sure where to find a list of old Mystery Hunt puzzles",
      keywords: ["mystery hunt archive"],
      nudge: "The MIT Mystery Hunt website includes an archive of old puzzles",
    },
    {
      order: 60.0,
      description: "Solvers are unsure how to narrow down the title options",
      keywords: ["years"],
      nudge: "There is a year associated with each of the paintings",
    },
    {
      order: 70.0,
      description:
        "Solvers don’t know what to do once they have found the titles",
      keywords: ["extraction", "solution words"],
      nudge:
        "You can view the solutions to old puzzles on the MIT Mystery Hunt website.",
    },
    {
      order: 80.0,
      description:
        "Solvers are’nt sure what to do once they have the instruction phrase",
      keywords: ["instruction phrase"],
      nudge:
        "That sounds like an instruction, why don’t you try doing that? You can bring your finished artwork to the Gala bar.",
    },
  ],
  canned_responses: [
    {
      guess: ["TAKEOUT FINGERPAINTS MAKEUP ALTERNATE STOLEN DIAMOND HISTORY"],
      reply:
        "Yes, please do that! We will only accept in-person submissions physically painted with a team member’s fingers, turned in at the bar. Please do NOT include any bodily fluids, you filthy monsters.",
    },
  ],
};

export default puzzle;
