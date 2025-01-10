import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Temporal Investigations",
  slug: "temporal_investigations",
  initial_description: "Short summaries of sci fi events",
  answer: "BRUSH WITH FATE",
  authors: ["Anna Brunner"],
  editors: ["Joel Fried", "Melanie Matchett Wood", "Teddy McArthur"],
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
      description:
        "Solvers have identified that this is about Star Trek but not what to do. (light hint)",
      keywords: ["star trek", "clues", "summaries"],
      nudge:
        "What is each of these clues describing? And what is wrong about each description?",
    },
    {
      order: 11.0,
      description:
        "Solvers have identified that this is about Star Trek but not what to do. (strong hint)",
      keywords: ["star trek", "clues", "summaries"],
      nudge:
        "In the episode or movie being described, which of the character names is incorrect? Who should be there instead?",
    },
    {
      order: 30.0,
      description:
        "Solvers have identified some of the pairs of incorrect and correct characters (light hint)",
      keywords: ["characters", "names", "extraction"],
      nudge: "How are the correct characters and incorrect characters related?",
    },
    {
      order: 31.0,
      description:
        "Solvers have identified some of the pairs of incorrect and correct characters (medium hint)",
      keywords: ["characters", "names", "extraction"],
      nudge:
        "Each pair of characters are “almost completely different,” implying that there is one similarity.",
    },
    {
      order: 32.0,
      description:
        "Solvers have identified some of the pairs of incorrect and correct characters (strong hint)",
      keywords: ["characters", "names", "extraction"],
      nudge:
        "Each pair of characters shares exactly one letter in the same position within each of their names.",
    },
    {
      order: 90.0,
      description:
        "Solvers have not figured out what the timeline chart means (light hint)",
      keywords: ["extraction", "order", "timeline", "chart"],
      nudge:
        "While the clues focus on specific moments, this chart gives a much broader view of the entire media property.",
    },
    {
      order: 91.0,
      description:
        "Solvers have not figured out what the timeline chart means (strong hint)",
      keywords: ["extraction", "order", "timeline", "chart"],
      nudge:
        "The x-axis indicates air date and the y-axis is the general time when the series is set in-universe.",
    },
    {
      order: 99.0,
      description: "Solvers have not figured out extraction order",
      keywords: ["extraction", "order"],
      nudge:
        "Have you tried reconstructing the timeline according to the chart given?",
    },
    {
      order: 100.0,
      description:
        "Solvers have not figured out extraction order (strong hint)",
      keywords: ["extraction", "order", "timeline", "chart"],
      nudge:
        "Reorder the clues by the original air date of the episode/movie being described. The chart can help you place the clued episodes within their particular Star Trek series.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
