import { type PuzzleDefinition } from "../types";
import finalAnswer from "./assets/finalanswer.mp3";

const puzzle: PuzzleDefinition = {
  title: "In Communicado Tonight",
  slug: "in_communicado_tonight",
  code_name: "rare-block",
  initial_description:
    "Solvers are invited to make a phone call at the Gala bar",
  answer: "DOWN A RABBIT HOLE",
  authors: ["Steve Banzaert", "Brad Johnson"],
  editors: ["Alex Churchill", "Elan Blaustein", "Hubert Hwang"],
  additional_credits: [
    {
      for_what: "Fabrication",
      who: [
        "Chris Pentacoff",
        "Chris Post",
        "Sarah Leadbeater",
        "Will Tymowski",
        "Eric Broder",
      ],
    },
    {
      for_what: "Voice acting",
      who: [
        "Arcturus Wang",
        "Molly Frey",
        "Tucker Elliott",
        "Drew Fisher",
        "Cyrus Eyster",
        "Alex Churchill",
        "Andrew Russell",
        "Steve Banzaert",
        "Karen Rustad Tolva",
        "Luiza Elliott",
      ],
    },
    {
      for_what: "Gala phone booth photo",
      who: ["Keri Ashton Fullwood"],
    },
    {
      for_what: "Archival videography",
      who: ["Steve Ewing of Stand Inside Media"],
    },
    {
      for_what: "Archival video editing",
      who: ["rfong"],
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
      reply:
        "Great! Go back to the bar and try to make that call again.\n\nDuring Mystery Hunt, after returning to the Gala, teams would find that the previously broken phone was now working. They would receive a call with the final answer to the puzzle: DOWN A RABBIT HOLE. If you’d like to hear that call, you can ",
      link: { href: finalAnswer, display: "listen to it here" },
    },
  ],
};

export default puzzle;
