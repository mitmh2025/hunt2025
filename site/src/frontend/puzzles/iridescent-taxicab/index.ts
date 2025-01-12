import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "We Can Do This All Day",
  slug: "we_can_do_this_all_day",
  code_name: "iridescent-taxicab",
  initial_description: "An indication to schedule an interaction",
  answer: "LEAFY ARLINGTON",
  authors: ["Kevin Hwang"],
  editors: ["Elan Blaustein", "James Douberley", "Steve Banzaert"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description:
        "solvers have attempted the interaction a first time but were unsuccessful",
      nudge:
        "If at first you don’t succeed, try try again. Hopefully you took a photo of the task list so you can plan for what props you might need.",
    },
    {
      order: 30.0,
      description: "solvers do not know where to obtain props (banana)",
      keywords: ["banana"],
      nudge:
        "There’s always bananas in the banana lounge (in building 26). Or at least hopefully there are. If there aren’t any it’s not my fault.",
    },
    {
      order: 30.0,
      description: "solvers do not know where to obtain props (headlamp)",
      keywords: ["headlamps"],
      nudge:
        "Did you know that some crazy people go exploring without proper lights? I know. Sometimes people just plan on using their cellphone flashlights for everything. I bet that’d look silly.",
    },
    {
      order: 30.0,
      description: "solvers do not know where to obtain props (rubik’s cube)",
      keywords: ["rubik’s cube"],
      nudge:
        "There aren’t really set on-campus places to borrow a rubik’s cube, but there are websites that can simulate one.",
    },
    {
      order: 30.0,
      description: "solvers do not know where to obtain props (sock)",
      keywords: ["sock"],
      nudge:
        "If you’re having trouble finding socks, consider checking your feet. If you don’t have any, check someone else’s feet.",
    },
    {
      order: 30.0,
      description:
        "solvers do not know where to obtain props (breakdancing skillz)",
      keywords: ["breakdancing"],
      nudge:
        "Breakdancing is hard. I could never do anything as cool as those olympic breakdancers do.",
    },
    {
      order: 30.0,
      description: "solvers do not know where to obtain props (apple)",
      keywords: ["apple"],
      nudge: "Balancing an apple on my head? Sorry, I use an android.",
    },
    {
      order: 50.0,
      description:
        "Solvers have completed the scavenger hunt but don’t know what to do next",
      keywords: ["certificate"],
      nudge:
        "Look at the images on the certificate. Do these locations look familiar?",
    },
    {
      order: 75.0,
      description:
        "Solvers have identified the locations but don’t know what to do next",
      keywords: ["certificate"],
      nudge:
        "Did anything stand out about the tasks and locations that were part of the Infinite Scavenger Hunt? How might one connect these two things together?",
    },
    {
      order: 100.0,
      description: "Solvers have paired up the locations and tasks",
      keywords: ["final extraction"],
      nudge:
        "Index into the bolded word or words as presented on the task sheet by the corresponding number on the certificate. The final answer has enumeration (5 9).",
    },
  ],
  canned_responses: [],
};

export default puzzle;
