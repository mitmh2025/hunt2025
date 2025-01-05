// albumLookup and geoguessrLookup are imported to make sure the images make it into the server package, but are otherwise unused.  They are
// imported with a leading underscore to prevent typescript/lint errors
import {
  albumLookup as _albumLookup,
  geoguessrLookup as _geoguessrLookup,
} from "../../../../ops/src/opsdata/desertedNinjaImages";
import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "esTIMation dot jpg",
  slug: "estimation_dot_jpg",
  initial_description:
    "You will be asked to up to 3 team members to participate in a quiz show.",
  answer: "TO STATE THE OBVIOUS",
  authors: ["Hubert Hwang", "Kevin Hwang"],
  editors: ["Steve Banzaert", "James Douberly", "Robin Deits", "Arcturus Wang"],
  additional_credits: [],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_deserted_ninja",
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [],
};

export default puzzle;
