import { type PuzzleDefinition } from "../types";
import IKidEweKnot from "./i-kid-ewe-knot";
import Puzzle from "./puzzle";
import Solution from "./solution";
import StitchySituation from "./stitchy-situation";

const puzzle: PuzzleDefinition = {
  title: "Weirdo Threaded Doodads",
  slug: "weirdo_threaded_doodads",
  initial_description: "Knitting instructions",
  answer: "PEARL STREET",
  authors: ["Kate Lynn", "Ariel Schwartz", "Kat Allen"],
  editors: ["Henry Wong", "Li-Mei Lim", "Robin Deits"],
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
      order: 1.0,
      description:
        "Solvers are looking at the first set of instructions and do not know where to start",
      keywords: ["start", "k", "p", "scarf"],
      nudge:
        "These are knitting instructions for a 128-stitch-wide scarf. This is probably too big to actually knit before Mystery Hunt is over—try charting it!",
    },
    {
      order: 1.9,
      description:
        "Solvers have charted the scarf and believe it to be a barcode, but cannot get it to scan.",
      keywords: ["scan", "chart", "barcode"],
      nudge:
        "Take a look at the flavor text. Your scarf will need to have certain proportions in order to scan. If you are still having trouble scanning your scarf after adjusting its proportions, you may need to look for a specific symbology. Why do you think the scarf is 128 stitches wide?",
    },
    {
      order: 2.0,
      description:
        "Solvers are looking at the second set of instructions and do not know where to start",
      keywords: ["second", "potholder"],
      nudge:
        "These are knitting instructions for a stranded (Fair Isle) potholder. If you don’t feel confident with stranded knitting, feel free to chart this one too!",
    },
    {
      order: 2.9,
      description:
        "Solvers have charted or knit the potholder and believe it to be a QR code, but cannot get it to scan.",
      keywords: ["scan", "qr code"],
      nudge:
        "Sometimes QR code scanners can have trouble scanning codes that are not square. Try blocking your potholder. If that doesn’t work, try charting it.",
    },
    {
      order: 3.0,
      description:
        "Solvers are looking at the third set of instructions and do not know where to start.",
      keywords: ["third", "bookmark"],
      nudge:
        "This is stranded knitting, but don’t worry—you’ll only ever be working with one strand at a time.",
    },
    {
      order: 3.5,
      description:
        "Solvers have charted this set of instructions instead of knitting it",
      keywords: ["scan", "chart", "bookmark"],
      nudge:
        "As the pattern says, you may need to actually knit this one to get your final answer.",
    },
    {
      order: 3.9,
      description:
        "Solvers have knit the bookmark but cannot read the final result",
      keywords: ["extraction", "bookmark", "read", "legible"],
      nudge:
        "Remember to stretch the bookmark vertically. You will want to hide the ribbing entirely. Some of the letters are lowercase.",
    },
  ],
  canned_responses: [],
  subpuzzles: [IKidEweKnot, StitchySituation],
};

export default puzzle;
