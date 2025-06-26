import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Networking Event",
  slug: "networking_event",
  code_name: "confused-antarctica",
  initial_description:
    "Some strange clues, a list of words, and a cute little stick figure dude",
  answer: "FAT TUESDAY",
  authors: ["Andrew Russell"],
  editors: ["Chris Gatesman", "Joanna Murray", "Kevin Hwang"],
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
      order: 5.0,
      description:
        "If they are stuck at the very beginning because clues make no sense",
      nudge:
        "Many of the provided clues do not lead to real things.  Don’t take them too literally, or you won’t find any of the answers.",
    },
    {
      order: 6.0,
      description: "stronger hint if they are stuck at the very beginning",
      nudge:
        "Clue F) gives the answer SNAP CHAAT, which is a fictional food. It does not really exist.  Ginger cookies are called “ginger snaps” and chaat is a style of Indian street food where spices and chutney are added to something... for example “samosa chaat”.  Many of the answers are fictional in this way.",
    },
    {
      order: 15.0,
      description: "They have a few answers but don’t know what to do next",
      nudge:
        "Say your answers out loud, and keep the title “Networking Event” in mind.",
    },
    {
      order: 16.0,
      description:
        "Stronger hint if they have the clue answers but dont know how to get the social networking sites.",
      nudge:
        "One of your answers in PHASE BOOK... which sounds a lot like FACEBOOK.",
    },
    {
      order: 25.0,
      description: "they can’t find some of the social networking apps",
      nudge:
        "Many of the items you need are very popular... but a few of them are obscure or even defunct.",
    },
    {
      order: 26.0,
      description:
        "Stronger hint if they are missing some social networking platforms",
      nudge:
        "KOO and VINE no longer exist, but are still on this list of social networking platforms.  There are a few others like that.",
    },
    {
      order: 40.0,
      description:
        "They did not notice the special font, or didn’t copy it into their spread sheet.",
      nudge:
        "Zoom in on the font used for letter label for each clue.  And remember the “Networking” in the title.",
    },
    {
      order: 41.0,
      description: "Stronger hint for the font",
      nudge:
        "Make sure you didn’t print this in black and white. If you zoom into the font you will see purple circles which are nodes connected by straight lines which are edges.",
    },
    {
      order: 50.0,
      description:
        "The solvers have not yet figured out how to make a graph from a word pair.",
      nudge:
        "Take a close look at the USELESS EXAMPLE.  Try to understand exactly how this pair of words give the stick man graph.",
    },
    {
      order: 51.0,
      description:
        "Stronger hint if they are still stuck on how to make a graph from a word pair",
      nudge:
        "Notice the letters in USELESS line up with the letters in EXAMPLE.  The nth letter in each word give a two-letter pair that forms a connection, drawn as a edge connecting nodes (purple circles).",
    },
    {
      order: 60.0,
      description:
        "They have the social networking sites, but don’t know how to pair them with the words from the word bank",
      nudge:
        "The items you have found will pair with words from the word bank of equal length.  The only way to figure out which word it gets paired with is trial and error.  So get to drawing some graphs.",
    },
    {
      order: 61.0,
      description:
        "stronger hint for how to get a letter from a pair of social network plus wordbank word",
      nudge:
        "Don’t just count nodes and edges. You need to draw a graph with nodes connected by edges... then find the letter which is isomorphic to the graph you get.",
    },
    {
      order: 75.0,
      description:
        "They are stuck because they are trying to associate the letter to the left of each clue with the clue.",
      nudge: "Not all letter graph networks are used and some repeat.",
    },
    {
      order: 90.0,
      description:
        "They are very close but have trouble parsing the final clue phrase",
      nudge: "The final phrase is split into three independent parts.",
    },
    {
      order: 91.0,
      description: "Stronger hint for finding the final clue phrase",
      nudge:
        "The enumeration and grouping of the final clue phrase is  (5) (8) (3 4 6)",
    },
    {
      order: 99.0,
      description:
        "They have the answer but are not submitting it because they think more is needed",
      nudge:
        "The bead necklace and the extra word in the word bank only help you confirm that your answer is correct. They are not needed to get the correct answer.",
    },
  ],
  canned_responses: [
    {
      guess: ["FAT USED AY", "FAT USED AYY", "FAT USED AYYY"],
      reply: "You’re on the right track. Keep going!",
    },
    {
      guess: ["OBESE PREOWNED THE FONZ SAYING"],
      reply: "This is the correct clue. What’s next?",
    },
  ],
};

export default puzzle;
