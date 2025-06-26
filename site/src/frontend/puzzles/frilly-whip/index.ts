import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Alias",
  slug: "alias",
  code_name: "frilly-whip",
  answer: "CALL HIM SHIRLEY MAYBE",
  authors: ["Grant Elliott"],
  editors: ["James Douberley", "Jesse Moeller", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Round Art",
      who: ["Simone Agha", "Nine Morch"],
    },
    {
      for_what: "Carter photo",
      who: ["tinaun (actor)", "Atul Shatavart Nadig", "Sue Broder"],
    },
  ],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: false,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers are stuck at the beginning",
      keywords: ["Meta", "start", "stumped"],
      nudge: "What are all of the submeta answers? Does the flavor help?",
    },
    {
      order: 10.0,
      description:
        "Solvers understand they need to resize but aren’t getting anything interesting",
      keywords: ["Resize", "game console", "resolution", "size"],
      nudge:
        "What would it mean to think like Carter? Is anyone on your team knowledgable of signal processing?",
    },
    {
      order: 11.0,
      description:
        "Solvers understand they need to resize but still aren’t getting anything interesting",
      keywords: ["Resize", "game console", "resolution", "size"],
      nudge:
        "Don’t just take him down to size, do it like he would - with aliasing.",
    },
    {
      order: 20.0,
      description: "Solvers have new shells for the submetas but are stuck",
      keywords: ["Shells", "metas", "resolve"],
      nudge: "Don’t stop now! Keep thinking like Carter!",
    },
    {
      order: 21.0,
      description:
        "Solvers have new shells for the submetas but are still stuck",
      keywords: ["Shells", "metas", "resolve"],
      nudge:
        "Clues you’ve used before only work this time around under a new name.",
    },
    {
      order: 100.0,
      description:
        "Solvers have the three submetas but are stuck on calling in the answer",
      keywords: ["Answers", "extraction"],
      nudge: "Don’t overthink it. Remember the cities have an ordering too.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
