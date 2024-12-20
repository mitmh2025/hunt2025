import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Songs on the Radio",
  slug: "songs_on_the_radio",
  initial_description: "A music puzzle for musicians",
  answer: "GUARDIAN LAVENDER",
  authors: ["Eric Marion", "Arcturus Wang", "Evan Broder"],
  editors: ["James Douberley", "Michele Pratusevich", "Steve Banzaert"],
  additional_credits: [
    {
      freeform: "Voiceover by Evan Broder",
    },
  ],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers are having trouble getting started",
      nudge:
        "Each of the provided clues is an excerpt of lyrics to a song, with a single word (or part of a word) removed. Try to identify each of the missing words.",
    },
    {
      order: 25.0,
      description:
        "Solvers have identified all of the clues and don't know what to do with them",
      nudge:
        "The flavortext tells you that this is a criss-cross puzzle. We've given the grid to you. Can you find a grid or design anywhere that looks like it could be a criss-cross grid? (If you haven't encountered a criss-cross puzzle before, you can find some examples here: https://www.puzzles.wiki/wiki/Criss-Cross)",
    },
    {
      order: 40.0,
      description:
        "Solvers have completed the criss-cross grid but are unsure what to do next",
      nudge:
        "On the radio, there are circles intended to direct you to specific features of the criss-cross. Can you use those to get an answer or cluephrase?",
    },
    {
      order: 41.0,
      description:
        "Solvers have the criss-cross cluephrase but are unsure what to do with it",
      nudge:
        "The cluephrase is a reference to a pop song from the 70's. Can you find it by searching for the phrase?",
    },
    {
      order: 50.0,
      description:
        "Solvers have unlocked Station Pi but are unsure how to make notes",
      nudge:
        "The voiceover mentioned that 4 of your 6 inputs are available to you. In the original puzzle, 6 of the clues had a symbol next to them. Can you connect those clues to the radio somehow?",
    },
    {
      order: 51.0,
      description: "Solvers are still unsure how to make notes",
      nudge:
        "For the first level, there are 4 ways to make notes on the radio:\r\n* Knocking on the radio\r\n* Touching one of the metal bolts in the radio's feet\r\n* Pressing the button labeled with a triangle\r\n* Shining a light (such as a phone flashlight) through the hole on the back next to the antenna symbol",
    },
    {
      order: 55.0,
      description:
        "Solvers are struggling to determine the Station Pi note sequences",
      nudge:
        "If you're struggling to tell the notes apart or put them in the correct sequence, you can use a tuner app to help identify the notes you need to play and the notes that you know how to play. We've had good luck with Tuner T1 (https://jsplash.com/tuner-t1.html) and the Musicca Tuner (https://www.musicca.com/tuner)",
    },
  ],
  canned_responses: [
    {
      guess: ["DAWN IF YOU WANT ME"],
      reply: "This is a cluephrase. Keep going!",
    },
    {
      guess: ["KNOCK THREE TIMES"],
      reply:
        "Good idea! You'll get the best reaction if you do that with a little confidence on the top surface (you probably already know of what).",
    },
  ],
};

export default puzzle;
