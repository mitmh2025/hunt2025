// albumLookup and geoguessrLookup are imported to make sure the images make it into the server package, but are otherwise unused.  They are
// imported with a leading underscore to prevent typescript/lint errors
import {
  albumLookup as _albumLookup,
  geoguessrLookup as _geoguessrLookup,
} from "../../../../ops/src/opsdata/desertedNinjaImages";
import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "esTIMation dot jpg",
  slug: "estimation_dot_jpg",
  initial_description: "A live in-person pub quiz game",
  answer: "TO STATE THE OBVIOUS",
  authors: ["Hubert Hwang", "Kevin Hwang"],
  editors: [
    "Steve Banzaert",
    "James Douberley",
    "Robin Deits",
    "Arcturus Wang",
  ],
  code_name: "deserted-ninja",
  additional_credits: [
    {
      freeform:
        "Additional questions written by Steve Banzaert and Jesse Moeller",
    },
    {
      for_what: "Classroom photo",
      who: ["Keri Ashton Fullwood"],
    },
  ],
  content: {
    component: { lazy: () => import("./puzzle") },
    entrypoint: "puzzle_deserted_ninja",
    copyable: false,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [],
  canned_responses: [],
};

export default puzzle;
