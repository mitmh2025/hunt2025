import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Chinatown",
  slug: "chinatown",
  code_name: "rude-field",
  answer: "CRY STOOL PIDGIN",
  authors: ["Henry Wong", "Arcturus Wang", "Hubert Hwang", "Jesse Moeller"],
  editors: ["James Douberley", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Round art (excluding photos)",
      who: ["Simone Agha"],
    },
    {
      for_what: "Photos",
      who: [
        "Arcturus Wang",
        "Jesse Moeller",
        "John Silvio",
        "Nine Morch",
        "Ollie Shonaldmann",
        "Robert “Fro” Myers",
      ],
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
      description: "Solvers are at the start of the puzzle",
      keywords: ["photos", "polaroids"],
      nudge:
        "Look at the photos for the round art! These are all unique locations on campus that can be identified with a little legwork. (You will likely need to physically explore the space.)",
    },
    {
      order: 20.0,
      description: "Solvers have identified most/all locations.",
      keywords: ["photos", "polaroids", "locations", "groups"],
      nudge: "Do you see any possible dead drops in these photos?",
    },
    {
      order: 21.0,
      description: "Solvers have keyed in on benches as important",
      keywords: ["bench", "groups", "photos", "polaroids", "locations"],
      nudge:
        "Do you think Katrina might be heading towards these dead drops in the other photos?",
    },
    {
      order: 50.0,
      description: "Solvers have identified all location groups and benches.",
      keywords: ["bench", "location"],
      nudge:
        "Congrats! You’ve found all of Katrina’s dead drops. Is the flavortext telling you to *do* something with them?",
    },
    {
      order: 60.0,
      description:
        "Solvers have found all notes and have not yet used any feeders.",
      keywords: ["notes", "bench", "location", "chinese"],
      nudge: "There is a language whose usage is strongly clued in this round.",
    },
    {
      order: 61.0,
      description:
        "Solvers have found all notes and know this is a Chinese language puzzle.",
      keywords: ["notes", "chinese", "character", "composition"],
      nudge:
        "Do the boxes at the end of each note evoke something? What goes in those boxes?",
    },
    {
      order: 90.0,
      description:
        "Solvers have found all notes and composed all chinese characters.",
      keywords: [
        "composition",
        "compose",
        "characters",
        "chinese",
        "translation",
        "birds",
      ],
      nudge: "The English translations may be helpful here.",
    },
    {
      order: 91.0,
      description:
        "Solvers have found all notes and translated all chinese characters.",
      keywords: [
        "composition",
        "compose",
        "characters",
        "chinese",
        "translation",
        "birds",
      ],
      nudge:
        "Do the lengths of the English translations of these characters match the lengths of the birds on the notes? (Some of these translations are more unique than others—start there!)",
    },
    {
      order: 100.0,
      description:
        "Solvers have extracted a letter from each character and are stuck on ordering.",
      keywords: ["ordering"],
      nudge: "It may help to plot letters and benches geographically on a map.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
