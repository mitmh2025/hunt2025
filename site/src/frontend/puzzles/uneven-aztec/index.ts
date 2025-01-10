import type { PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "They Might Be Grad Students, But They’ve Got Your Number",
  slug: "they_might_be_grad_students_but_theyve_got_your_number",
  initial_description: "An abstract of an academic paper with references",
  answer: "RAP OFF KEY",
  authors: ["Erin Price", "Ariel Schwartz", "Eric Marion"],
  editors: ["Jonathan Lay", "Sid Creutz", "Steve Banzaert"],
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
      order: 0.0,
      description: "The solvers have not yet identified the Dial-a-Song album.",
      keywords: ["getting started"],
      nudge:
        "Have you noticed that all the citations reference the same journal, volume, issue, and pages? Try regrouping these letters, preserving order, and searching for the new grouping.",
    },
    {
      order: 10.0,
      description:
        "The solvers have identified that this is a puzzle about TMBG and Dial-a-Song, but have not yet identified that this is about the Dial-a-Song ALBUM rather than the list of songs on the telephone service.",
      keywords: ["year", "telephone", "stuck"],
      nudge:
        "This article was published in 2002. Try searching for that year alongside your current search string.",
    },
    {
      order: 25.0,
      description: "The solvers have identified the Dial-a-Song album.",
      keywords: ["a", "b"],
      nudge:
        "You’re working with a double album, so it has an A-side and a B-side",
    },
    {
      order: 75.0,
      description:
        "The solvers have received MATCH HOVERING SOMBRERO LYRICS cluephrase and are beginning extraction.",
      keywords: ["lyrics", "source"],
      nudge:
        "Try googling the authors of the paper to find a canonical source for following the extraction instructions.",
    },
    {
      order: 100.0,
      description:
        "The solvers have found the correct lyrics but do not know how to ‘match.’",
      keywords: ["extraction"],
      nudge:
        "Align the abstract and the lyrics word-by-word. You can do this in a spreadsheet with the SPLIT function. Several words appear at the same position in the abstract and in the song. Read the first letters of those words in order.",
    },
  ],
  canned_responses: [
    {
      guess: ["MATCH HOVERING SOMBRERO LYRICS"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
