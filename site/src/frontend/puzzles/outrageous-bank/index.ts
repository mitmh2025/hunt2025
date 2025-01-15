import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "It’s All Cheep (And a Sheep) to Me",
  slug: "its_all_cheep_and_a_sheep_to_me",
  code_name: "outrageous-bank",
  initial_description: "A video featuring cartoon animals and bouncy music",
  answer: "HEREFORD CATTLE",
  authors: ["J. Heléne Andersson", "Liz Oppenheim", "Sarah Leadbeater"],
  editors: ["Joanna Murray", "Kevin Hwang", "Melanie Matchett Wood"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 5.0,
      description: "Getting started",
      keywords: ["languages"],
      nudge:
        "It looks like the captions are written in a bunch of different languages.",
    },
    {
      order: 10.0,
      description: "Figuring out what the video is referring to",
      keywords: ["identification", "images", "music"],
      nudge:
        "Have you figured out where the music and images come from? They are all from a single set of sources.",
    },
    {
      order: 15.0,
      description:
        "If they can’t find a canonical source for the animals sounds in all the languages",
      keywords: ["canonical source", "animal sounds"],
      nudge:
        "The music and images are all from the same set of videos by the same YouTube account. Shazam should be able to help.",
    },
    {
      order: 20.0,
      description: "If the source material is still elusive",
      keywords: ["canonical source", "animal sounds", "languages"],
      nudge:
        "The music and images can be found in the YouTube account Pulcino Pio.",
    },
    {
      order: 25.0,
      description: "If they don’t know how to use the video",
      keywords: ["onomatopoeia", "animal sounds", "linguistic differences"],
      nudge: "What noise does a cow make in German? How about in French?",
    },
    {
      order: 30.0,
      description:
        "If they haven’t figured out how the animal noises are related to the clues",
      keywords: ["onomatopoeia", "animal sounds"],
      nudge:
        "Use the language the clue is written in to find the sound the animal pictured makes",
    },
    {
      order: 65.0,
      description:
        "If the clue answers don’t match with the sounds and clues are solved in English",
      keywords: ["language", "animal sounds"],
      nudge:
        "The clues are in different languages. How about the answers to the clues?",
    },
    {
      order: 90.0,
      description: "extraction",
      keywords: ["extraction"],
      nudge:
        "How is the sound that the animal makes related to the answers to the clues? The sound spelled out in the source video is close to the answer to the clue in the same language.",
    },
  ],
  canned_responses: [
    {
      guess: ["MAKE VIDEO IN OTHER LANGUAGE"],
      reply:
        "That is correct! Please make a video of the verse of the song containing all the animals in a language not used in this puzzle (live action with animals would make us extra happy) and send it to us at info@mitmh2025.com. Include your team name and the phrase MAKE VIDEO IN OTHER LANGUAGE in the subject line.",
    },
  ],
};

export default puzzle;
