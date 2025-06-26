import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Sounds Like a Dodo to Me",
  slug: "sounds_like_a_dodo_to_me",
  code_name: "waterlogged-kiwi",
  initial_description:
    "Diary entries from a college student with some scribbles",
  answer: "PHILLIPS EXETER",
  authors: ["Becca Chang", "Atul Shatavart Nadig"],
  editors: ["Henry Wong", "James Douberley", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers do not know how to start",
      keywords: ["no idea", "start"],
      nudge:
        "The diary entries and scribbles are referring to specific locations.",
    },
    {
      order: 1.0,
      description: "Solvers do not know what locations they should find",
      keywords: ["locations", "no idea", "start"],
      nudge:
        "The locations being referenced are (mostly) places on the campus of MIT.",
    },
    {
      order: 10.0,
      description: "Solvers are having trouble understanding the diary entries",
      keywords: ["ID"],
      nudge: "Many of the diary entries may not make sense in the present.",
    },
    {
      order: 10.1,
      description:
        "Solvers are having trouble understanding the diary entries [stronger nudge]",
      nudge:
        "Each diary entry will allow you to identify the year in which it was written by relating to an event in MIT history.",
    },
    {
      order: 10.2,
      description: "Solvers are unable to identify the years of diary entries.",
      keywords: ["year"],
      nudge:
        "[Give explicit event that diary entry is referring to as needed]. It may help to keep in mind that many buildings are not the same as in the past. MIT also had its original campus in Boston.",
    },
    {
      order: 20.0,
      description: "Solvers do not understand the scribbles",
      keywords: ["scribble"],
      nudge:
        "The blue text is written in the present. Go out and find what they refer to!",
    },
    {
      order: 20.1,
      description: "Solvers do not understand the scribbles [strong nudge]",
      keywords: ["scribbles", "stuck"],
      nudge:
        "Each scribble is referring to text on a sign/plaque/room (mostly) on campus. [Tell them where some of them are if stuck]. The enumerations should help confirm you have the correct things.",
    },
    {
      order: 20.2,
      description: "Solvers are unsure if they have the correct texts",
      nudge:
        "The entries are arranged such that the texts to be noted are in alphabetical order.",
    },
    {
      order: 30.0,
      description:
        "Solvers have IDed everything, but are not sure what to do next",
      nudge:
        "The entries are currently in order of the text. There is something you can reorder by that makes sense.",
    },
    {
      order: 30.1,
      description:
        "Solvers have IDed everything, but are not sure what to do next [strong nudge]",
      nudge: "Reorder so that the diary entries are chronological.",
    },
    {
      order: 40.0,
      description:
        "Solvers have noticed a phrase after reordering and are trying to apply it.",
      nudge:
        "As the scribbles say, there are two distinct extractions, and this is one of them. You’ll still need to find the other to combine them.",
    },
    {
      order: 50.0,
      description: "Solvers have correct ordering but are stuck",
      nudge: "Are you using all the information in the diary entries?",
    },
    {
      order: 50.1,
      description: "Solvers have correct ordering but are stuck [strong nudge]",
      nudge:
        "Each diary entry also refers to an MIT course offered during the time of the entry.",
    },
    {
      order: 60.0,
      description: "Solvers have correct order and courses, stuck",
      nudge: "What information have you noted that you have not used yet?",
    },
    {
      order: 60.1,
      description:
        "Solvers have correct order and courses, stuck [strong nudge]",
      nudge: "You need to use the course number and the text noted.",
    },
    {
      order: 60.2,
      description: "Solvers have correct order and courses, stuck [extraction]",
      nudge: "Index into the text by the course number in the diary entry.",
    },
    {
      order: 60.3,
      description: "Solvers are not able to identify some of the courses",
      nudge:
        "Not all courses are modern courses. Like the diary entries, some of these only apply in the past.",
    },
    {
      order: 90.0,
      description:
        "Solvers have sorted and indexed to get part of the cluephrase, but don’t have the other half.",
      nudge: "The starts of these diary entries are sometimes awkward.",
    },
    {
      order: 90.1,
      description:
        "Solvers have sorted and indexed to get part of the cluephrase, but don’t have the other half. [stronger nudge]",
      nudge:
        "Read the first letters of the diary entries in chronological order.",
    },
    {
      order: 99.9,
      description: "Solvers have both halves of the cluephrase.",
      nudge: "These are two parts of the cluephrase, combine them!",
    },
    {
      order: 100.0,
      description:
        "Solvers believe they have the correct answer to the combined cluephrase, but it is incorrect.",
      nudge:
        "As the scribble says, make sure to drop the last word for the actual answer.",
    },
  ],
  canned_responses: [
    {
      guess: ["HIGH SCHOOL", "PAUL M ROMER"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
