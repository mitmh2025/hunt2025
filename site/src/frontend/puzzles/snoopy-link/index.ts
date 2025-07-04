import { type PuzzleDefinition } from "../types";
import adam from "./assets/adam.mp3";

const puzzle: PuzzleDefinition = {
  title: "He Shouldn’t Have Eaten The Apple",
  slug: "he_shouldnt_have_eaten_the_apple",
  code_name: "snoopy-link",
  initial_description: "A bunch of nonsense clues",
  answer: "SAMGAKSAN",
  authors: ["Brad Johnson"],
  editors: [
    "James Douberley",
    "Nathan Fung",
    "Robin Deits",
    "Teddy McArthur",
    "tinaun",
  ],
  additional_credits: [
    {
      freeform: "Special Thanks to Adam Conover",
    },
  ],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 10.0,
      description: "Solvers don’t know how to interpret these clues",
      nudge:
        "Something seems wrong in each of these clues. Could they “actually” need some other word?",
    },
    {
      order: 10.5,
      description: "Solvers still don’t know how to interpret these clues",
      nudge: "Have you tried separating each clue into two parts?",
    },
    {
      order: 20.0,
      description:
        "Solvers have some of the clue answers but don’t know what to do with them",
      nudge:
        "The flavor text mentions things being “all over the map”. Try looking at your answers that way.",
    },
    {
      order: 30.0,
      description:
        "Solvers have the answers on the map but don’t know what to get out of it",
      nudge:
        "You replaced some words to make those clues work. Have you used the words you replaced yet?",
    },
    {
      order: 50.0,
      description:
        "Solvers have sorted the answers but don’t know what to get out of it",
      nudge:
        "Well, you’ve used the words you replaced already. What words did you replace them with?",
    },
    {
      order: 70.0,
      description:
        "Solvers have the clue phrase after sorting, but don’t recognize the reference",
      nudge: "There’s a recent Adam who’s famous for Ruin[ing] Everything",
    },
    {
      order: 90.0,
      description:
        "Solvers have identified episodes but not what to do with them",
      keywords: ["extraction"],
      nudge:
        "The episodes you’ve found are all in the first 26 aired per season.",
    },
  ],
  canned_responses: [
    {
      guess: ["ADAM RUINS EPISODE NUMS", "SORT ON UNESCO HERITAGE"],
      reply: "Keep going!",
    },
    {
      guess: ["NOW RUIN SOMETHING ELSE"],
      reply:
        "That’s right! Send us an email with your team name, and a fact or piece of trivia that ruins something for us, and we’ll give you the final answer. Send the email to info@mitmh2025.com with the subject line “NOW RUIN SOMETHING ELSE”.\n\nDuring Mystery Hunt, if teams sent us an email ruining something that we found sufficiently disappointing, they would receive a ",
      link: {
        display:
          "MITropolis Breaking News update over their radio (and via email)",
        href: adam,
      },
    },
  ],
};

export default puzzle;
