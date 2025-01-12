import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Given Up",
  slug: "given_up",
  code_name: "giant-switch",
  initial_description: "Photos of ceilings and a radio dial with letters",
  answer: "ATHLETIC CLUB",
  authors: ["Quentin Smith", "Kevin Hwang", "Richard Tibbetts"],
  editors: ["Chris Gatesman", "Evan Broder", "James Douberley"],
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
      description: "Solvers are not sure what the images are",
      keywords: ["pictures"],
      nudge:
        "The images are locations where the camera is pointed at the ceiling.",
    },
    {
      order: 5.0,
      description: "Solvers are not sure what the images are, larger hint",
      keywords: ["pictures"],
      nudge:
        "The images are locations on the MIT campus where the camera is pointed at the ceiling.",
    },
    {
      order: 10.0,
      description: "Solvers are not sure what to do with the dial",
      keywords: ["dial"],
      nudge:
        "The dial looks like the one on the radio provided to teams. Only one mode is marked, compared to the dual modes available on the radio itself.",
    },
    {
      order: 20.0,
      description: "Solvers are not sure what to do to start",
      keywords: ["pictures", "dial", "starting"],
      nudge:
        "You will need to locate these ceiling views on campus. You will need to bring your radio as well.",
    },
    {
      order: 30.0,
      description: "Solvers don’t know what to do at the indicated locations",
      keywords: ["locations", "ceilings", "radio", "campus"],
      nudge:
        "If you’re confident you have found the right view, consider what you can do with a radio set to FM.",
    },
    {
      order: 35.0,
      description:
        "Solvers don’t know what to do at the indicated locations (larger hint)",
      keywords: ["locations", "ceilings", "radio", "campus"],
      nudge: "Seek the radio dial, and listen carefully.",
    },
    {
      order: 40.0,
      description:
        "Solvers don’t know what to do at the indicated locations (direct instruction)",
      keywords: ["locations", "ceilings", "radio", "campus"],
      nudge:
        "At each location there is a radio signal that is not normally present on campus. You’ll know it when you hear it. You may want to listen to the whole song.",
    },
    {
      order: 50.0,
      description:
        "Solvers have identified frequencies that don’t perfectly align with letters",
      keywords: ["locations", "rickroll", "frequency", "radio", "dial image"],
      nudge:
        "Radio stations have to identify the frequency they’re broadcasting on. If in doubt, trust that frequency over the printed dial.",
    },
    {
      order: 75.0,
      description:
        "Solvers have heard radio stations and associated messages but don’t know how to extract answer.",
      keywords: ["rickroll", "song", "frequency", "dial"],
      nudge:
        "It’s time to extract. Each message provided you with two pieces of information, the frequency and the upcoming song or songs.",
    },
    {
      order: 80.0,
      description:
        "Solvers have heard radio stations and associated messages but don’t know how to extract answer (larger hint)",
      keywords: ["rickroll", "song", "frequency", "dial"],
      nudge:
        "There are 12 songs in total. Order them by their release dates. Note that two songs identified in the same stinger may not wind up adjacent to each other in the final sort order.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
