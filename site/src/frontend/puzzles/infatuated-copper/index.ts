import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Tunnels Beneath the Institute",
  slug: "the_tunnels_beneath_the_institute",
  initial_description:
    "A sequence of 14 video, audio, and text clips, each with an associated content warning.",
  answer: "POSANGAR",
  authors: ["John Toomey"],
  editors: ["Anna Brunner", "Michele Pratusevich", "Teddy McArthur"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 20.0,
      description:
        "Solvers have found the properties referenced by the clips (tv series, podcast, fiction site), but have not figured out what to do with them.",
      keywords: ["identification"],
      nudge:
        "Each clip occurs wholly within a particular episode of the series being referenced.",
    },
    {
      order: 50.0,
      description:
        "Solvers have found the specific episodes referenced by the clips, but have not figured how to sort them.",
      keywords: ["sort"],
      nudge:
        "The flavortext makes multiple references to another episodic horror franchise. Try googling some of the phrases therein that seem oddly specific or otherwise incongruent to the rest of the text's tone.",
    },
    {
      order: 60.0,
      description:
        "Solvers have determined the episodic horror franchise referenced in the flavortext, but still do not know how to sort the data they have gathered.",
      keywords: ["sort"],
      nudge:
        "Some of the words in the flavortext come directly from a particular event that occurs during The Magnus Archives.",
    },
    {
      order: 70.0,
      description:
        "Solvers have determined the specific event in The Magnus Archives referenced by the flavortext, but still can't figure out how to sort the episode titles.",
      keywords: ["sort"],
      nudge:
        "The text of the Mass Ritual contains a sort order. The bulk of this ordering looks like “crawls and chokes and blinds and […]”. Use this ordering as a sort for your data set.",
    },
    {
      order: 75.0,
      description:
        "Solvers have attempted to use the Mass Ritual's text as a sort, but are still having difficulty getting the episode titles sorted properly.",
      keywords: ["sort"],
      nudge:
        "The Mass Ritual's incantation begins with a reference to The Eye (“You who watch…”) and then refers to each of the other entities with a single verb in the list that comes after the words “the awful dread”. Match these up with the provided content warnings to get an ordering.",
    },
    {
      order: 80.0,
      description:
        "Solvers have sorted the identified episodes by the Mass Ritual order, but don't know what to do next.",
      keywords: ["extraction"],
      nudge: "Try entering the sorted episode titles into the provided grid.",
    },
    {
      order: 90.0,
      description:
        "Solvers have entered the sorted titles into the provided grid, but don't know what to do next.",
      keywords: ["extraction"],
      nudge:
        "The content warnings for each of the clips, properly sorted, contain a clue as to what to look for next.",
    },
    {
      order: 100.0,
      description:
        "Solvers have found the clue embedded in the content warnings, but don't know what to do next.",
      keywords: ["extraction"],
      nudge:
        "Look for TRIGRAM OVERLAPs (partially overlapping groupings of three letters which span adjacent grid rows) in your completed grid.",
    },
  ],
  canned_responses: [
    {
      guess: ["RECORD A STATEMENT"],
      reply:
        "Record a statement about an unnatural occurrence you experienced during The Hunt, in the style of The Magnus Archives, and email it to us at info@mitmh2025.com. Please include your team name and the phrase RECORD A STATEMENT in the email.",
    },
    {
      guess: ["TRIGRAM OVERLAP"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
