import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Kindred Spirits",
  slug: "kindred_spirits",
  initial_description:
    "A series of 50-60 crossword-style clues and a series of blanks separated by arrows.",
  answer: "FLYER",
  authors: [
    "Evan Broder",
    "Ariel Schwartz",
    "Baltazar Ortiz",
    "Chris Post",
    "Drew Fisher",
    "Helena Wang",
    "James Douberley",
    "James Harvey",
    "rfong",
    "Steven Keyes",
  ],
  editors: ["Anna Brunner", "Nathan Fung", "Teddy McArthur"],
  additional_credits: [
    {
      freeform:
        "Thanks to Dan Chadwich, Chief Swizzlestick of Kindred Cocktails, for providing the data for this puzzle",
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
      description:
        "Solvers have begun solving clues but are unsure how they are connected",
      keywords: ["starting", "clues"],
      nudge:
        "Each answer to these clues is the name of something. Can you figure out what they are names of? If you’re able to solve them, the answers to clues 33, 34, 42, or 50 may be particularly recognizable.",
    },
    {
      order: 0.5,
      description: "Solvers are still unsure how the clues are connected",
      keywords: ["starting", "clues"],
      nudge:
        "All of the clues refer to the names of cocktails. There are many recipes and websites for cocktails, but the title of the puzzle should help you find a specific website that you can use as a reference.",
    },
    {
      order: 1.0,
      description: "Solvers have not found a reference for the cocktails",
      keywords: ["starting", "clues", "reference"],
      nudge:
        "The website Kindred Cocktails (https://kindredcocktails.com/) has an extensive database of cocktail recipes and can be used for all of the drinks in this puzzle.",
    },
    {
      order: 20.0,
      description:
        "Solvers have identified the cocktails but are not sure what to do with them",
      keywords: ["clues", "usage"],
      nudge:
        "The positions of some of the clues are already provided as part of the puzzle. Now that you know these are cocktails, can you figure out a way to connect those to other clues? Do any of the cocktails have something in common?",
    },
    {
      order: 20.5,
      description: "Solvers are still unsure what to do with the cocktails",
      keywords: ["clues", "usage"],
      nudge:
        "You can connect cocktails by finding two with ingredient lists that are identical except for one swapped ingredient.",
    },
    {
      order: 21.0,
      description: "Solvers are struggling to connect the cocktails",
      keywords: ["cocktails", "usage", "connections"],
      nudge:
        'Here’s a few tips when you’re trying to connect cocktails. Each connection removes a single ingredient and adds a single ingredient, so the number of ingredients doesn’t change. You only need to use the name of the ingredient, not the amount. Also remember that while Kindred Cocktails has some complicated ingredients (such as "Aromatized wine, Lillet Blanc"), the flavor text tells you to ignore anything after a comma.',
    },
    {
      order: 40.0,
      description:
        "Solvers have placed many or all of the clues but are unsure how to complete the chains",
      keywords: ["cocktails", "chains"],
      nudge:
        "Have you checked to see how many clues there are vs. how many blanks there are? What about how many chains?",
    },
    {
      order: 41.0,
      description: "Solvers are still unsure how to complete the chains",
      keywords: ["cocktails", "chains"],
      nudge:
        "Each of the 10 chains is missing a single drink. Can you figure out what it is?",
    },
    {
      order: 42.0,
      description: "Solvers are unsure how to find the missing cocktails",
      keywords: ["cocktails", "chains", "missing"],
      nudge:
        "The Kindred Cocktails website lets you search by ingredients. Since each link in the chain involves swapping one ingredient for another, you can figure out which two ingredients were potentially swapped out and which two ingredients were potentially swapped in. You might have to try a few combinations!",
    },
    {
      order: 80.0,
      description:
        "Solvers have found the missing cocktails but are unsure how to utilize them",
      keywords: ["extraction"],
      nudge:
        "The ten chains aren’t all the same length. Now that you’ve identified the missing cocktails, can you tell why the chains are as long as they are?",
    },
    {
      order: 81.0,
      description:
        "Solvers are still unsure how to utilize the missing cocktails",
      keywords: ["extraction"],
      nudge:
        "The length of the name of each missing cocktail is the same as the length of the chain in which it occurs. Given that, how can you pick which letter to extract from the missing cocktails?",
    },
    {
      order: 82.0,
      description:
        "Solvers are still unsure how to extract from the missing cocktails",
      keywords: ["extraction"],
      nudge:
        "You can use the position of the missing cocktail within its chain to determine which letter to extract. If the cocktail is in the 5th position, then you should extract the 5th letter.",
    },
    {
      order: 90.0,
      description:
        "Solvers are struggling to identify the ingredients in their Gala cocktails",
      keywords: ["taste"],
      nudge:
        "You’ll need to use several of your senses to identify these ingredients—don’t forget sight and smell in addition to taste. Many of the drinks have one or more ingredients in common, too.",
    },
    {
      order: 95.0,
      description:
        "Solvers have identified the ingredients but are struggling to extract an answer",
      keywords: ["drinks", "gala", "extraction"],
      nudge:
        "Once you’ve identified the ingredients in each of the drinks, you should notice that they’re similar, but not quite identical. How are they different?",
    },
    {
      order: 100.0,
      description: "Solvers are unsure how to extract",
      keywords: ["drinks", "gala", "extraction"],
      nudge:
        "Each drink removes one ingredient from the previous drink and replaces it with a new one. Take the starting letter of each of those removed ingredients to get the answer.",
    },
  ],
  canned_responses: [
    {
      guess: ["BUY A FLIGHT"],
      reply:
        "Correct! Now go to the Gala and request a flight at the bar. Please make sure to send a few team members with no food allergies and an adventurous sense of taste.",
    },
  ],
};

export default puzzle;
