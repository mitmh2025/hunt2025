import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Why Kan’t We Be Friends, Too?",
  slug: "why_kant_we_be_friends_too",
  initial_description:
    "A video and a map of a neighborhood with letters overlaid",
  answer: "FOOTSTEPS",
  authors: ["Mike Mannis"],
  editors: ["Anna Brunner", "Henry Wong", "Hubert Hwang", "James Douberley"],
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
      order: 15.0,
      description:
        "Solvers think source is a video game but are looking at games like Stardew Valley, Animal Crossing, etc",
      nudge:
        "This puzzle is about a video game. What type of game do the figure above the map and the audio in the final scene of the video make you think of?",
    },
    {
      order: 25.0,
      description:
        "Solvers are looking at video games including fighting games but have not figured out the source",
      nudge:
        "You are looking for a popular fighting game. The puzzle title is a big hint, as well as the audio at the beginning and end of the video. The final scene also contains a few more subtle hints.",
    },
    {
      order: 40.0,
      description:
        "Solvers have determined the source is Mortal Kombat, but not the exact game",
      nudge:
        "All of the scenes with characters refer to a specific Mortal Kombat game. The final scene provides a hint to the time period; the title also contains a hint.",
    },
    {
      order: 50.0,
      description:
        "Solves know the source is Mortal Kombat 2 but have not figured out what the scenes are showing",
      nudge:
        "Mortal Kombat 2 included an…interesting way to handle your opponents after winning the match that was a tongue-in-cheek response to the complaints about the violence from the first game.",
    },
    {
      order: 60.0,
      description:
        "Solvers have matched the scenes with the correct characters and friendship moves but don’t know what to do next",
      nudge:
        "Now that you have the friendships from the video, you need a way to move around the neighborhood map. What might give you directions?",
    },
    {
      order: 90.0,
      description:
        "Solvers are still stuck on extraction after identifying friendships",
      nudge:
        "You need to use the moveset for each friendship finishing move and apply that as directions to traverse the neighborhood map. The flavor text hints how far you will be moving.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
