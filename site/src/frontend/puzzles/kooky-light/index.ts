import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "It’s Not Clear",
  slug: "its_not_clear",
  code_name: "kooky-light",
  initial_description: "Physical Puzzle—several sheets of transparencies",
  answer: "FORWARD SLASH",
  authors: ["Elan Blaustein", "Erin Price"],
  editors: ["Anna Brunner", "Chris Gatesman", "Kevin Hwang"],
  additional_credits: [
    {
      for_what: "Fabrication",
      who: ["James Douberley"],
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
      description: "Solvers don’t know what to do with the transparencies",
      keywords: ["start", "transparencies"],
      nudge:
        "You will need to stack the transparencies on top of one another to create whole pictures. Start by looking for a rectangle on each sheet and lining each rectangle up with the next. When all the rectangles are aligned, what’s inside will give you a hint as to what the final products have in common.",
    },
    {
      order: 10.0,
      description: "Solvers don’t know what to do with the outlines",
      keywords: ["outlines", "numbers"],
      nudge:
        "Assemble nine images whose borders match each of the provided outlines. The numbers will help you ensure you’re not missing any pieces.",
    },
    {
      order: 50.0,
      description: "Solvers need help to identify one of the objects",
      keywords: ["picture", "outline", "missing building"],
      nudge:
        "The letters on one piece of each building give the alphabetical ordering of the buildings by name. This should help narrow your search.",
    },
    {
      order: 75.0,
      description: "Solvers don’t know what the dots and lines are forming",
      keywords: ["dots", "lines", "symbols", "cipher", "code"],
      nudge:
        "The flavor text tells you “it’s kind of muddy in here.” What kind of place is muddy? This might lead you to a particular cipher.",
    },
    {
      order: 75.1,
      description: "Solvers still can’t identify the cipher",
      keywords: ["dots", "lines", "symbols", "cipher", "code"],
      nudge: "This puzzle uses the pigpen cipher.",
    },
    {
      order: 90.0,
      description: "Solvers can’t order the decoded letters",
      keywords: ["cluephrase", "letters", "anagram"],
      nudge:
        "Order the pigpen letters you extracted from each building by the A-I letters that appear on the buildings themselves, which order the buildings alphabetically. This will reveal a cluephrase and enumeration.",
    },
    {
      order: 100.0,
      description: "Solvers can’t interpret the cluephrase",
      keywords: [
        "chiat day",
        "symbol",
        "seven",
        "five",
        "seven five",
        "extraction",
        "final answer",
      ],
      nudge:
        "Frank Gehry designed another building for this company. Look at the original name for the building to see what symbol is used in the name. SEVEN FIVE is an enumeration.",
    },
  ],
  canned_responses: [
    {
      guess: ["ORIGINAL CHIAT DAY SYMBOL SEVEN FIVE"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
