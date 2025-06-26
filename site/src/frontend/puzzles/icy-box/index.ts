import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "A Weathered Note",
  slug: "a_weathered_note",
  code_name: "icy-box",
  initial_description: "A weathered note",
  answer: "ABOUT",
  authors: ["Matt Scanlan"],
  editors: ["James Douberley", "Joanna Murray", "Rad Z", "Teddy McArthur"],
  additional_credits: [
    {
      for_what: "Voice acting",
      who: ["Drew Fisher"],
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
      description: "No progress and looking for where to start.",
      nudge:
        "Did you see the news of codebreakers solving the mystery of an 1888 antique dress and an old note?",
    },
    {
      order: 1.0,
      description:
        "Solvers have made a link to some news articles but don’t know what to do with that information",
      nudge:
        "The codebreakers for Ms. Bennett’s dress used an old war department book to solve the mystery. Can this book be used with any other data available?",
    },
    {
      order: 2.1,
      description:
        "The weather reports have been fully or partially solved for each person but are now stuck on how to proceed with that data.",
      nudge:
        "The number of squiggly lines matches the number of names uncovered. Try to find the link between the two sets of data.",
    },
    {
      order: 2.2,
      description:
        "The weather reports have been fully or partially solved for each person but are still stuck on how to proceed with that data.",
      nudge:
        "The retired clue is referencing hurricanes. Try to find the match between the squiggly lines, retired hurricanes, and the names uncovered from the weather reports.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
