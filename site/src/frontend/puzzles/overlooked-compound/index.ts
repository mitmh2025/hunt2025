import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Dear Diary",
  slug: "dear_diary",
  initial_description: "Two paragraphs of prose",
  answer: "SPEECH",
  authors: ["Mike Mannis"],
  editors: ["Amanda Giermann", "Hubert Hwang", "Steve Banzaert"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 10.0,
      description: "Solvers have not even noticed the missing letters",
      nudge:
        "Read the text carefully; some words are odd and out of place.  Those words need to be transformed – they are missing something.",
    },
    {
      order: 30.0,
      description:
        "Solvers have some but not all of the initial missing letters and are struggling with the extracted phrase (e.g. they have PERIODS ID INT CHARS)",
      nudge:
        "Reread the text very carefully.  You don’t have all of the missing letters yet.  There are 22 in total.",
    },
    {
      order: 50.0,
      description:
        "Solvers are having trouble interpreting PERIODS HIDE SILENT CHARS and are thinking about time periods, historical characters, or other unrelated paths.",
      nudge:
        "Interpret the extracted hint very literally.  You do not need outside references or historical knowledge to solve this puzzle.",
    },
    {
      order: 70.0,
      description:
        "Solvers are still struggling. They are looking at the periods in the text (as punctuation) but are missing the next mechanic.",
      nudge:
        "To find “everything” that is missing, you will need to find hidden things like you did in step one – in the middle of other things.",
    },
    {
      order: 80.0,
      description:
        "Solvers just cannot get to the final mechanic despite more vague hints",
      nudge:
        "If each period were a letter, could you make a word from what’s around it?",
    },
  ],
  canned_responses: [
    {
      guess: ["PERIODS HIDE SILENT CHARS"],
      reply:
        "Indeed they do.  It seems you haven’t found *everything* that is missing.",
    },
  ],
};

export default puzzle;
