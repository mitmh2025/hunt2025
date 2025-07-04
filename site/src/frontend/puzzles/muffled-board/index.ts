import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Press Play",
  slug: "press_play",
  code_name: "muffled-board",
  initial_description: "Audio files of singing",
  answer: "STENOGRAPHERS",
  authors: [
    "Alex St Claire",
    "Ariel Schwartz",
    "Hubert Hwang",
    "Steve Banzaert",
  ],
  editors: ["Kevin Hwang", "Rad Z", "Steve Banzaert"],
  additional_credits: [
    {
      for_what: "Singing",
      who: ["Ariel Schwartz", "Hubert Hwang"],
    },
    {
      for_what: "Background music",
      who: ["Steve Banzaert"],
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
      description: "Solvers have figured out they are all real songs",
      keywords: ["Start of puzzle"],
      nudge:
        "All audio files are covers of famous songs with one thing that is off compared to original. What is the change?",
    },
    {
      order: 40.0,
      description: "Solvers have found there are a bunch of off key words",
      keywords: ["Pitch", "Tune", "Off Key"],
      nudge:
        "Make sure you are looking at the off key words in the order that they are given. Do you notice anything?",
    },
    {
      order: 50.0,
      description: "Solvers are looking at the off key words in order given",
      keywords: ["Pitch", "Tune", "Off Key"],
      nudge: "Look at the first letters of the off-key words.",
    },
    {
      order: 70.0,
      description:
        "Puzzlers have found the intermediate answer but unsure of extraction",
      keywords: ["Extraction"],
      nudge:
        "QWERTY is referring to a standard layout keyboard and title is referring to the song titles.",
    },
    {
      order: 90.0,
      description:
        "Puzzlers have found the intermediate answer and are looking at the song titles on a keyboard but unsure of how to extract.",
      keywords: ["Extraction"],
      nudge:
        "Try typing the song titles on a QWERTY keyboard. Do you notice anything?",
    },
    {
      order: 95.0,
      description:
        "Puzzlers have tried typing out the songs on a QWERTY keyboard",
      keywords: ["Extraction"],
      nudge:
        "Have you found the “off key“ when typing out the song titles on a QWERTY keyboard?",
    },
  ],
  canned_responses: [
    {
      guess: ["QWERTY OF TITLE"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
