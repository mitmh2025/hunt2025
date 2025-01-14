import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Killer",
  slug: "the_killer",
  code_name: "jubilant-table",
  answer: "COLLAR A WILD ROVER",
  authors: ["Julian West"],
  editors: ["Erin Price", "James Douberley", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      freeform: "Additional authors: Chris Pringle and Joanna Murray",
    },
    {
      for_what: "Art",
      who: ["Simone Agha"],
    },
    {
      for_what: "Story writing and editing support",
      who: ["John Silvio"],
    },
    {
      for_what: "Additional puzzle contributions",
      who: [
        "Ben Haytack",
        "Sam Dell",
        "Tom Cochrane",
        "Tom Rackham",
        "Will Day",
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
      order: 10.0,
      description: "Solvers are still unlocking pages",
      keywords: ["pages"],
      nudge:
        "These pages will tell a story but you are receiving them out of order. Do you know whether you have all the pages yet? Do you have an estimate for how many there will be?",
    },
    {
      order: 25.0,
      description: "Solvers don’t know what to put in the blanks",
      nudge:
        "Each time you solve a puzzle, you find a few more pages. You can use the puzzles to help you figure out how to sort the pages, by filling in the blanks.",
    },
    {
      order: 30.0,
      description:
        "Solvers are making connections but don’t have anything close to a full chapter",
      keywords: ["connections", "chapter"],
      nudge:
        "Sometimes you can guess that one page follows another based on voice or plot. But think about what might connect an entire chapter.",
    },
    {
      order: 50.0,
      description: "Solvers have one or two chapters largely complete",
      keywords: ["ordering", "themes", "mechanism"],
      nudge:
        "Each chapter has a theme that runs through it. These always relate to something which the narrator is actually observing or imagining.",
    },
    {
      order: 60.0,
      description:
        "Solvers are working on identifying each chapter’s throughline.",
      keywords: ["some chapters"],
      nudge:
        "Some of the threads that run through the chapters are presented more directly than others. You might find direct quotes in some chapters and more obscured hints in others.",
    },
    {
      order: 81.0,
      description: "Solvers are stuck on Papa’s chapter",
      keywords: ["Papa"],
      nudge:
        "Papa says “I love this picture” because he is watching one of his favourite Hollywood films.",
    },
    {
      order: 82.0,
      description: "Solvers are stuck on Carter’s chapter",
      keywords: ["Carter"],
      nudge:
        "Carter says “think about everything that’s happened in those twenty years”. He means that very precisely.",
    },
    {
      order: 83.0,
      description: "Solvers are stuck on Gladys’s chapter",
      keywords: ["Gladys"],
      nudge:
        "Gladys is following a train of thought which begins with the words “Dum-di-dum. In the Louvre Museum.” Two other characters, in their own chapters, also give hints about what Gladys likes.",
    },
    {
      order: 83.1,
      description:
        "Solvers have identified the theme but are having trouble with the correct sort for Gladys",
      nudge:
        "There have been many versions--make sure you’re looking at the original, which is period-appropriate for this Hunt.",
    },
    {
      order: 84.0,
      description: "Solvers are stuck on Baby’s chapter",
      keywords: ["Baby"],
      nudge:
        "Where is Baby, and why might she find such an assortment of interesting characters there? She’s moving from room to room in an order commonly used in this type of place.",
    },
    {
      order: 85.0,
      description: "Solvers are stuck on Katrina’s chapter",
      keywords: ["Katrina"],
      nudge:
        "Katrina is walking down a street. A specific street. Things she sees there trigger associations, although you might need the internet to understand them all.",
    },
    {
      order: 86.0,
      description: "Solvers are stuck on Billie’s chapter",
      keywords: ["Billie"],
      nudge:
        "Where does this chapter take place? What would Billie see there? If you finish this chapter, it’s worth reading it carefully, because Billie is putting all the clues together and cracking the case.",
    },
    {
      order: 86.1,
      description:
        "Solvers don’t know what order Billie’s chapter should be in",
      nudge:
        "Billie says “I think just as well inbound as outbound.” Try going inbound.",
    },
    {
      order: 90.0,
      description:
        "Solvers have all the chapters sorted individually but are struggling to extract",
      nudge:
        "The flavortext hints at how you can order the chapters. There are hints in each of the chapters, and in their cover page art, to help with this.",
    },
    {
      order: 95.0,
      description:
        "Solvers don’t know how to use the question marks on each page",
      nudge:
        "You placed a puzzle answer on each page with a question mark. Each question mark needs to be replaced by a dot or a dash. How could you associate a dot or dash with each puzzle answer?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
