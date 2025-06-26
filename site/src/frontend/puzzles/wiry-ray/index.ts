import { type PuzzleDefinition } from "../types";
import router from "./server";

const puzzle: PuzzleDefinition = {
  title: "Deepfrost",
  slug: "deepfrost",
  code_name: "wiry-ray",
  initial_description: "A text adventure",
  answer: "KENGREXAL",
  authors: ["Chris Gatesman", "Mark Gatesman"],
  editors: ["Anna Brunner", "Elan Blaustein", "Jesse Moeller"],
  additional_credits: [
    {
      freeform:
        "The puzzle authors would like to thank Aureeee, whose maps of the Decked Out 2 levels made this puzzle feasible to create!",
    },
  ],
  content: {
    component: { lazy: () => import("./puzzle") },
    entrypoint: "puzzle_wiry_ray",
    copyable: false,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 5.0,
      description:
        "Solvers have moved around the puzzle some but seem to be getting lost a lot.",
      keywords: ["Navigation", "Lost"],
      nudge:
        "The dungeon has various twists and turns making this not the easiest area to navigate without a map to guide you.",
    },
    {
      order: 6.0,
      description:
        "Solvers have not identified the source material or found the map. (weak hint)",
      keywords: ["map"],
      nudge:
        "Try looking up the name of the puzzle in conjunction with the name mentioned in the first room of the puzzle",
    },
    {
      order: 7.0,
      description:
        "Solvers have not identified the source material or found the map. (strong hint)",
      keywords: ["map"],
      nudge:
        "This is about Decked Out 2, a game made in Minecraft by TangoTek.",
    },
    {
      order: 10.0,
      description:
        "Solvers have found the map and don’t know what to do next/Don’t know what to do with the compass.",
      keywords: ["Hermitcraft", "Decked Out 2", "Compass"],
      nudge:
        "Your compass seems to point towards some interesting spots on the level when you set it to a number, follow it and see what you can find.",
    },
    {
      order: 15.0,
      description:
        "Solvers have found all of the artifacts on the first floor, but don’t know how to reach lower depths.",
      keywords: ["Artifacts", "Lower Floors"],
      nudge:
        "Somewhere in the dungeon is a path down to the lower floors, you just have to find it and open it.",
    },
    {
      order: 20.0,
      description:
        "Solvers have found the artifacts on the first floor and have found the door to the next floor but don’t know how to find the key.",
      keywords: ["Door", "Keys", "Crosses"],
      nudge:
        "The artifacts seem to point towards the key to the door down to the lower levels, having the coordinates of these artifacts would help immensely in making a cross with them and finding the intersection. Is there a command in the source material that might help you see your coordinates?",
    },
    {
      order: 22.0,
      description:
        "Solvers have found where the key is, but are unable to pick it up.",
      keywords: ["Key", "Library", "Sense something nearby"],
      nudge:
        "An attribute of the artifacts can be combined to get a number for the compass to find the key.",
    },
    {
      order: 70.0,
      description:
        "Solvers have found every compass artifact in the dungeon, and have found the message about the eggs, but don’t know what to do next.",
      keywords: ["Eggs", "Artifacts"],
      nudge:
        "The eggs want to find their artifacts, but which eggs have one, and which artifact is theirs? Once you figure that out connect them.",
    },
  ],
  canned_responses: [],
  // #!if TARGET !== "client" && !ARCHIVE_MODE
  router,
  // #!endif
};

export default puzzle;
