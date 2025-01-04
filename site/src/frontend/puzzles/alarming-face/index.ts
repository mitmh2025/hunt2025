import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Formula Won",
  slug: "formula_won",
  initial_description:
    "Videos of a video game car driving around various race tracks.",
  answer: "NIKI LAUDA",
  authors: ["Mike Mannis"],
  editors: ["Erin Price", "James Douberley", "Steve Banzaert"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.0,
      description:
        "Solvers are having trouble getting started or are stuck somewhere",
      nudge:
        "There are many tasks that can be done in parallel. See hints ordered from 20 to 60 for more specific guidance with initial tasks.",
    },
    {
      order: 20.0,
      description: "Solvers aren’t sure what to do with the circuit tracks",
      nudge:
        "These tracks exist in real life; it will be helpful to identify them.",
    },
    {
      order: 40.0,
      description: "Solvers don’t know what the circuit billboards mean",
      nudge:
        "Watch the videos closely when the driver slows down. Is the billboard the only unusual thing on the track?",
    },
    {
      order: 50.0,
      description:
        "Solvers have figured out the circuit billboards but not how to use them",
      nudge:
        "The identified racehorses won in specific years. You need to use those years to identify F1 winners at specific tracks.",
    },
    {
      order: 60.0,
      description:
        "Solvers don’t know what to do with the country billboards in the last track",
      nudge:
        "The billboards in each country (the last two letters) are arranged in pairs. Try looking up each pair in Google maps.",
    },
    {
      order: 80.0,
      description:
        "Solvers have circuit winners and data from the country billboards in the last track but are stuck",
      nudge:
        "The last track has a very unusual layout. Try drawing it, using the arches, buildings, and billboards as landmarks to determine direction and distance for all the turns and straightaways. “Scripted” in the flavor text applies to this!",
    },
    {
      order: 90.0,
      description:
        "Solvers have GRANDPRE from the last track but don’t know what it means or how to use it",
      nudge:
        "GRANDPRÉ (plus the billboard of Cypher from The Matrix) = Grandpré cipher. The digits extracted from the billboards on the last track are an index into data from the circuit tracks using that cipher.",
    },
  ],
  canned_responses: [
    {
      guess: ["GRANDPRE", "GRANDPRÉ", "RUSH AUSTRIAN"],
      reply: "Keep going!",
    },
    {
      guess: ["LAUDA"],
      reply: "We’re looking for first and last name.",
    },
  ],
};

export default puzzle;
