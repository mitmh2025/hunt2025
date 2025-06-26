import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Educational Rite of Passage",
  slug: "educational_rite_of_passage",
  code_name: "circular-greece",
  initial_description: "Physical Puzzle—45 3D-printed pieces and a stick",
  answer: "RAW ANTIQUE BRASS",
  authors: ["Laura Nicholson", "Arcturus Wang", "Robert “Fro” Myers"],
  editors: ["Elan Blaustein", "Michele Pratusevich", "Nathan Fung"],
  additional_credits: [
    {
      for_what: "Fabrication",
      who: [
        "Evan Broder",
        "Chris Post",
        "Jesse Moeller",
        "Arcturus Wang",
        "Brie Frame",
        "Kevin Hwang",
        "J. Heléne Andersson",
        "James Douberley",
        "Robert “Fro” Myers",
        "Simone Agha",
      ],
    },
  ],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: false,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers have opened a bag of plastic pieces and a rod.",
      keywords: ["plastic", "pieces", "jigsaw"],
      nudge:
        "Some of these pieces should fit with each other to make recognizable objects!",
    },
    {
      order: 30.0,
      description: "Solvers have assembled pieces into rings.",
      keywords: ["jigsaw", "rings", "brass rat"],
      nudge: "This ring shape is pretty common around MIT!",
    },
    {
      order: 31.0,
      description:
        "Solvers have identified that these rings are shaped like brass rats.",
      keywords: ["rings", "brass rat", "years"],
      nudge: "Did you know that every class ring has a unique design?",
    },
    {
      order: 40.0,
      description:
        "Solvers have identified years and are unsure what to do next.",
      keywords: ["brass rat", "years", "ordering"],
      nudge:
        "You may be able to place the rings on the provided timeline in order to figure out what to do next.",
    },
    {
      order: 41.0,
      description: "Solvers have placed the rings on the rod.",
      keywords: ["brass rat", "rod", "ordering"],
      nudge:
        "If you align the rings in the same way, you should be able to read down the lines and find an instruction.",
    },
    {
      order: 50.0,
      description: "Solvers have the phrase “SPIN RINGS PER ROD”",
      keywords: ["brass rat", "rod", "spin"],
      nudge:
        "Spin the ring according to the arrows on the rod, one letter per arrow.",
    },
    {
      order: 51.0,
      description:
        "Solvers have placed the rings on the rod, but the instruction looks incorrect.",
      keywords: ["brass rat", "years", "ordering", "flip"],
      nudge: "It’s traditional to flip rings the other way upon graduation.",
    },
    {
      order: 100.0,
      description: "Solvers have moved the bezels as instructed.",
      keywords: ["bezel", "move", "up"],
      nudge:
        "You might notice there’s a letter engraved on the back of the bezel, and a signed integer engraved where the bezel sits. How do you combine them?",
    },
  ],
  canned_responses: [
    {
      guess: ["MOVE BEZELS UP TWO", "SPIN RINGS PER ROD"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
