import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Borderline Personality",
  slug: "borderline_personality",
  code_name: "calculating-square",
  initial_description: "A bunch of haiku—just, like, so many haiku",
  answer: "THE WHALE AND THE RISING SUN",
  authors: ["Brie Frame"],
  editors: ["Anna Brunner", "Kevin Hwang", "Steve Banzaert"],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
    entrypoint: "puzzle_calculating_square",
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 0.0,
      description:
        "Solvers don’t know what the haiku are referring to and are probably going down rabbit holes with the haiku syllable count",
      keywords: ["start"],
      nudge:
        "This puzzle must be solved by physically visiting The Borderline in the tunnel between Building 66 and E18. Once you are there in person, this puzzle will make a whole lot more sense!",
    },
    {
      order: 1.0,
      description:
        "Solvers have visited The Borderline but are having a hard time figuring out what the haiku refer to",
      nudge:
        "Each haiku references one of the artworks in the main passage of The Borderline, but each haiku is a little bit wrong in its description. Look for the line that does not fit the 5-7-5 syllable pattern; what word in that line is incorrect?",
    },
    {
      order: 2.0,
      description:
        "Solvers have matched haiku to artworks and have figured out what words to change, but can’t figure out how to get letters from this information",
      keywords: ["letter extraction"],
      nudge:
        "The letter in parentheses after each haiku is an index to the new correct word. As a solving aid, the haiku are given in alphabetical order by correct word.",
    },
    {
      order: 3.0,
      description:
        "Solvers have matched haiku to artwork and extracted letters from each haiku, but can’t figure out how to order them",
      keywords: ["answer", "order"],
      nudge:
        "You’ll need to be physically on campus at The Borderline for this step. The flavortext for this puzzle mentions that the artwork captivates “from top to bottom”—and these murals are all along an awfully long ramp, aren’t they?",
    },
  ],
  canned_responses: [
    {
      guess: ["SPIRITUWHALE"],
      reply:
        "invalid haiku / you have gone a step too far / enter all six words",
    },
  ],
};

export default puzzle;
