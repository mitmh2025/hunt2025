import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Zing it Again",
  slug: "zing_it_again",
  code_name: "practical-dragon",
  initial_description: "Rebus puzzles",
  answer: "THE BEATLES",
  authors: ["Alex St Claire"],
  editors: [
    "J. Heléne Andersson",
    "Jesse Moeller",
    "Robin Deits",
    "Steve Banzaert",
  ],
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
      order: 10.0,
      description: "Start",
      nudge: "The rebuses relate to three different data sources.",
    },
    {
      order: 15.0,
      description: "Solvers have not found the data sources",
      keywords: ["Identify"],
      nudge:
        "The three data sources are clued by the three two letter indicators in the bottom most image: “BB”, “HM”, and “WA”",
    },
    {
      order: 20.0,
      description: "Solvers haven’t had break-in",
      nudge:
        "Recommended rebuses that are a little easier to break-in on the three categories might be (1) 13th line starting w/ “(31/31)” (2) 35th line starting w/ “(12/12)” (3) 22nd line starting w/ “(12/19)”. Ignore the “(#/#)” initially. Each of these comes from a different category.",
    },
    {
      order: 25.0,
      description:
        "Solvers have found the three data sources but not sure on what many of the rebuses clue",
      keywords: ["Identify"],
      nudge:
        "The puzzle title includes the word “Zing” which is a pun on “Sing” and “Zingers”.",
    },
    {
      order: 30.0,
      description:
        "Solvers have found data sources but haven’t figured out all the rebuses or what to do with them",
      keywords: ["Songs"],
      nudge:
        "One of the pieces of data on the rebus is presented in alphabetical order to help with identification. The correct length of that information is also given by the “B” in the “(A/B)” to eliminate any ambiguities. This is the important piece of information you should be using.",
    },
    {
      order: 50.0,
      description: "Solvers have figured out the band names",
      keywords: ["band", "artist"],
      nudge:
        "The “(A/B)“ is a letter index into the band name. The initial presented alphabetical ordering of bands is not the method of organization. You need to separate the three categories into individual groups and figure out the correct ordering.",
    },
    {
      order: 60.0,
      description: "Solvers are trying to re-sort each category",
      keywords: ["Sorting"],
      nudge:
        "The three data sets are sorted in different manners. They are hinted at by the three images at the bottom.",
    },
    {
      order: 70.0,
      description:
        "Solvers have the three new song puns/parodies but are stuck",
      keywords: ["Final Extraction"],
      nudge: "Maybe you should do what you did earlier “again“?",
    },
    {
      order: 85.0,
      description:
        "Solvers have gotten the three new song puns/parodies but can’t index into them",
      keywords: ["Final Extraction"],
      nudge:
        "The bottom image is telling you to index into each of the respective category sub-extraction. If you try to index into the sub-extraction phrase it won’t work (in particular SCHOOLY BULLY which is far too short to index into). You should be indexing into the same type of information that you did in the prior step.",
    },
    {
      order: 95.0,
      description: "Solvers have the sub-extraction phrase HEAR COMES THE PUN",
      keywords: ["Final answer"],
      nudge:
        "There is an extremely well known band that sung a popular song that is very similar sounding. The band has a name that is itself also a pun.",
    },
  ],
  canned_responses: [
    {
      guess: [
        "A FLOCK OF SEAGULLS",
        "DON MCLEAN",
        "I RAN SO TARO WAY",
        "SAM THE SHAM AND THE PHARAOHS",
        "SCHOOLY BULLY",
        "THE SAGA BEGINS",
      ],
      reply: "Keep going!",
    },
    {
      guess: ["BEATLES"],
      reply: "Please resubmit as THE BEATLES",
    },
    {
      guess: ["HEAR COMES THE PUN"],
      reply: "What pun sang that pun?",
    },
    {
      guess: ["SAM THE SHAM & THE PHARAOHS"],
      reply: "Use the AND spelling",
    },
  ],
};

export default puzzle;
