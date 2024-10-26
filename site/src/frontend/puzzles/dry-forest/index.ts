import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Fechtb\u00fcch",
  slug: "fechtbuch",
  initial_description: "Medieval descriptions of battles",
  answer: "FIVE HOLE",
  authors: ["Ariel Schwartz", "Dan Collins", "Teddy McArthur"],
  editors: ["James Douberley", "Michele Pratusevich", "Steve Banzaert"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers do not know where to start",
      keywords: ["italic text", "weird words", "where to start"],
      nudge:
        "These are formal heraldic blazons, but describing something more modern than medieval crests.",
    },
    {
      order: 10.0,
      description:
        "Solvers know that the blurbs include blazons, but do not know what dataset the blazons are pulled from.",
      keywords: ["title", "author"],
      nudge:
        "A fechtb\u00fcch is a medieval German sword fighting manual. J\u00fcrgen is a German name. What does it mean in English? Try googling the manuscript author’s translated name.",
    },
    {
      order: 25.0,
      description:
        "Solvers have identified that this is a puzzle about hockey but do not know what the blazons represent, or think it only represents logos.",
      keywords: ["blazon", "heraldry"],
      nudge:
        "Medieval knights had their heraldry on their shields. Where do modern-day athletes display theirs?",
    },
    {
      order: 50.0,
      description:
        "Solvers have identified that this is a puzzle about fights in the NHL and are trying to narrow down the data set",
      keywords: ["timeframe", "season"],
      nudge:
        "The manuscript was written ‘after the last winter’. It is currently winter, so this manuscript was written last summer. Which months does an NHL season span?",
    },
    {
      order: 100.0,
      description:
        "Solvers have identified every fight and every fighter and are trying to extract.",
      keywords: ["extraction"],
      nudge:
        "Have you used all the information on the jerseys of the ‘knights’ that are ‘settling their differences?’",
    },
  ],
  canned_responses: [],
};

export default puzzle;
