import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Celestial Rope",
  slug: "celestial_rope",
  initial_description:
    "Physical Puzzle—A very long ribbon with tags",
  answer: "SKY REPLAY",
  authors: ["Erin Price", "Ariel Schwartz", "Kat Allen"],
  editors: ["Henry Wong", "James Douberley"],
  additional_credits: [
    {
      for_what: "Manufacturing",
      who: [
        "Arcturus Wang",
        "Ariel Schwartz",
        "Chris Pentacoff",
        "Erin Price",
        "Jesse Moeller",
        "Kat Allen",
        "Kevin Hwang",
        "Molly Frey",
        "Robert “Fro” Myers",
        "Simone Agha",
      ],
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
      order: 0.0,
      description: "Solvers don’t know how to start",
      keywords: ["wtf", "ribbon", "tags"],
      nudge:
        "Start by untangling your puzzle, then examine what’s on the tags. What is at these locations? Visiting the location at one end of the ribbon should help you figure out how to find what’s at the other locations.",
    },
    {
      order: 20.0,
      description:
        "Solvers have found some of the model locations but aren’t sure what to do with the ribbon",
      keywords: ["scale models", "infinite", "pluto"],
      nudge:
        "This puzzle requires an accurate measuring device. Check how far each tag is from the sun tag at one end. Tags with text will help you figure out where to start and tags with flags will tell you what you’re looking for.",
    },
    {
      order: 30.0,
      description: "Solvers don’t know how to match up the tags",
      keywords: ["tags", "flags", "match", "nine", "eighteen"],
      nudge:
        "Each text location can be matched to the location of a planet in a solar system scale model. The flags for the country or place where each model is located tell you how to match the drawings with a solar system scale model.",
    },
    {
      order: 40.0,
      description:
        "Solvers don’t know how to use the numbers on the tags with drawings",
      keywords: ["drawings", "numbers", "circles", "arrows", "degrees"],
      nudge:
        "The puzzle is also a solar system scale model. Use the measurements you took (precise measurements, right?) to get a distance and the degree measurements to get a bearing.",
    },
    {
      order: 60.0,
      description:
        "Solvers need help calculating where they can find the drawings",
      keywords: [
        "sun",
        "bearing",
        "drawings",
        "looking at planet",
        "looking at sun",
        "from planet",
      ],
      nudge:
        "The ribbon has a common reference point for all the planets. Imagine you are standing at the sun in each scale model and looking towards the planet marked on the ribbon. Turn as far as the number of degrees tells you and then travel the scaled distance to find the building in the drawing. There are websites that can help you calculate heading and distance between two points measured in latitude and longitude.",
    },
    {
      order: 80.0,
      description: "Solvers can’t match the enumerations",
      keywords: ["enumerations", "names", "buildings"],
      nudge:
        "The enumerations on the puzzle page match the names of the buildings. Use the language from the corresponding planet location tag.",
    },
    {
      order: 100.0,
      description: "Solvers have the locations but can’t extract",
      keywords: ["extract"],
      nudge:
        "The enumerations on the puzzle page were alphabetized. Sort the building names by associated planet and take the appropriate letter from each.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
