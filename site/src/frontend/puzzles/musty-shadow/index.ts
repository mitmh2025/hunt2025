import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Eras Puzzle",
  slug: "the_eras_puzzle",
  initial_description: "Colored node charts with pianos and guitars.",
  answer: "LUCKIER",
  authors: ["Stratton Vakirtzis"],
  editors: ["Anna Brunner", "Li-Mei Lim", "Steve Banzaert"],
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
      order: 0.0,
      description: "Starting the puzzle",
      keywords: ["starting", "eras"],
      nudge:
        "Who is this puzzle about and has many different eras? And what could each of the colored squares and circles represent (from their discography)?",
    },
    {
      order: 10.0,
      description:
        "Solvers have identified this is a Taylor Swift puzzle but have made no further progress",
      keywords: ["Taylor Swift", "songs", "albums"],
      nudge:
        "Each of the squares represent an album and the color associated with that album era. Each of the circle nodes represent a song from that album/era (don’t forget to look at Taylor’s Versions of the albums). The set of initial emoji nodes each represent one song from each of the 11 albums. How are the songs able to be connected?",
    },
    {
      order: 30.0,
      description:
        "Solvers have identified each of the squares as albums and nodes as songs but are not sure how everything is connected",
      keywords: ["connected", "arrows", "transformations"],
      nudge:
        // Unicode symbols here are musical notes.
        "How can “I keep my side of the street 𝅘𝅥𝅮Clean𝅘𝅥𝅮”, when “all I think about is 𝅘𝅥𝅮Karma𝅘𝅥𝅮”? 𝅘𝅥𝅮Look What You Made Me Do𝅘𝅥𝅮! If you are struggling to find connections, this tool may also assist: https://shaynak.github.io/taylor-swift/ . Some of the gradient colored nodes reference songs that appear either on multiple albums, appear between eras, or are on movie soundtracks.",
    },
    {
      order: 60.0,
      description:
        "Solvers haven’t extracted the cluephrase from the red circles but have the song title node connections.",
      keywords: ["red circles", "list"],
      nudge:
        "Which songs could fit in the vertical list of blanks? Take the extracted red letters also reading vertically and don’t forget to rearrange by each of the initial emoji songs (one per album).",
    },
    {
      order: 90.0,
      description:
        "Solvers have extracted the main cluephrase and know to find surprise songs from the Eras Tour but are unable to extract the answer.",
      keywords: ["extraction", "surprise songs", "mashups", "acoustic set"],
      nudge:
        "What could each of the guitar or piano emoji songs represent at the end of each graph with reference to the Eras Tour? What could a half piano or guitar mean?\r\n\r\nThere are 7 tour dates referenced in this puzzle (each represented by a different dress color) and each acoustic set has between 2-4 surprise songs played that night. Now find the missing surprise song from each set!",
    },
  ],
  canned_responses: [
    {
      guess: ["FIND MISSING SURPRISE SONG IN EACH ACOUSTIC SET"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
