import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "In Communicado Tonight",
  slug: "in_communicado_tonight",
  code_name: "rare-block",
  initial_description:
    "Solvers are invited to make a phone call at the Gala bar",
  answer: "DOWN A RABBIT HOLE",
  authors: ["Steve Banzaert", "Brad Johnson"],
  editors: ["Alex Churchill", "Elan Blaustein", "Hubert Hwang"],
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
      order: 0.0,
      description: "Solvers don’t know how to start",
      keywords: ["start"],
      nudge: "You should do what the note says, in real life—go to the gala!",
    },
    {
      order: 10.0,
      description: "Solvers don’t know what to do with the switchboard",
      keywords: ["switchboard", "game"],
      nudge:
        "The switchboard behaves like a three-player rhythm game and/or whack-a-mole. The lights tell you when to plug in the patch cables, flip the switches, and turn the hand crank. One player needs to wear the headphones and transcribe the audio, which will be clearer the better you do at the game.",
    },
    {
      order: 20.0,
      description: "Solvers don’t know what to do after the game",
      keywords: ["data", "mechanics"],
      nudge:
        "The initial note from your source contains a phone number similar to what you should have heard from the switchboard—is there a mechanic that would extract a word from that number?",
    },
    {
      order: 90.0,
      description:
        "Solvers don’t know how to process the list of phone numbers",
      keywords: ["extraction"],
      nudge:
        "If you apply the mechanic from your source’s note you should see a list of words you can find on the reverse of your note sheet—almost. What’s wrong with these words?",
    },
    {
      order: 100.0,
      description: "Solvers don’t know what to do after extracting an answer",
      keywords: ["answer", "submit"],
      nudge:
        "Remember: the bartender told you to come back and tell them what you’d learned!",
    },
  ],
  canned_responses: [
    {
      guess: ["LAST CALL"],
      reply: "Great! Go back to the bar and try to make that call again.",
    },
  ],
};

export default puzzle;
