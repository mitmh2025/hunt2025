import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "MITropolitan House of Fashion",
  slug: "mitropolitan_house_of_fashion",
  initial_description:
    "Hand-drawn pictures of dresses and racks of garment bags",
  answer: "SERENDIP SANCTUARY",
  authors: ["Emilie Josephs", "Rebecca Engelke"],
  editors: [
    "Alex Churchill",
    "Henry Wong",
    "Hubert Hwang",
    "Michele Pratusevich",
  ],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Rebecca Engelke"],
    },
  ],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.0,
      description:
        "The solvers have identified some of the outfits, but are having a hard time identifying all of them, and have not found a commonality between them.",
      nudge:
        "Once you have identified a few of the outfits, try identifying what they have in common. The title of this puzzle will help you identify an event that is relevant to all of them.",
    },
    {
      order: 2.0,
      description:
        "The solvers have identified a good number of the outfits and know where they were seen, but are unsure what piece of information about the outfit to use",
      nudge:
        "In addition to the common event, the title of the puzzle will help you identify what we want to know about each outfit.",
    },
    {
      order: 3.0,
      description:
        "The solvers have identified a good number of the dresses, and have figured out that they are from the MET Gala. Solvers think the dresses should go on the rack, but have not figured out where they go on the rack",
      nudge:
        "What do you notice about how the groups of garment bags on the rack are labelled? The symbol that labels each group should clue a detail about the specific event each outfit was worn at.",
    },
    {
      order: 4.0,
      description:
        "The solvers have placed outfits in the rack, but have not extracted a phrase from it",
      nudge:
        "What do you notice about the cells in the garment bags? Pay specific attention to the highlighted cells.",
    },
    {
      order: 5.0,
      description:
        "The solvers have gotten the names of the person who wore each look, but are unsure how to proceed.",
      nudge:
        "You already figured out where garments go on the rack. Now, take a look at the first letters of the names you got.",
    },
  ],
  canned_responses: [
    {
      guess: ["WHO WORE THAT"],
      reply: "You're on the right track!",
    },
    {
      guess: ["WORK IT AT OUR GALA"],
      reply:
        "Great idea! Come strut your stuff at the Gala's Red Carpet Photo Booth (as dressed up as you like) and share your photos with the bar staff.",
      providesSolveReward: true,
    },
  ],
};

export default puzzle;
