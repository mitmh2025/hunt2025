import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The 10000-Sheet Excel File",
  slug: "the_10000_sheet_excel_file",
  initial_description: "An Excel file with 10000 sheets.",
  answer: "HMS ALCASTON",
  authors: ["Hubert Hwang"],
  editors: ["Melanie Matchett Wood", "Steve Banzaert", "Teddy McArthur"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.1,
      description: "Solvers are having trouble opening the file",
      keywords: ["file", "opening"],
      nudge:
        "The provided file is in the XLSX file format, which is for Microsoft Excel.  If you have access to Excel, that will be the easiest way to access the contents of the file.  You may also be able to use LibreOffice or various programming libraries (for example, pandas or openpyxl in Python).",
    },
    {
      order: 10.0,
      description: "Solvers are having trouble with the first step",
      keywords: ["visible", "first step"],
      nudge:
        "The flavortext tells you to start with what you can see.  See what is visible in each of the 10000 sheets and put them all together.",
    },
    {
      order: 10.1,
      description:
        "Solvers are having trouble with the first step (medium hint)",
      keywords: ["visible", "first step"],
      nudge:
        "In each sheet, there is a single number visible.  Each number is in a different location, and is always an integer between 0 and 255 (inclusive).  What kind of data structure does that imply?",
    },
    {
      order: 10.2,
      description:
        "Solvers are having trouble with the first step (strong hint)",
      keywords: ["visible", "first step"],
      nudge:
        "Consider each visible number as a grayscale pixel (between 0 and 255).  Use them to create a 100x100 image.",
    },
    {
      order: 30.0,
      description: "Solvers are not sure how to use the image instruction",
      keywords: ["image"],
      nudge:
        "Consider what the image says.  What would that mean in the context of a spreadsheet puzzle?",
    },
    {
      order: 30.1,
      description:
        "Solvers are not sure how to use the image instruction (strong hint)",
      keywords: ["image"],
      nudge:
        "The image gives a formula that you can run, but does not specify a particular sheet.  You should run it for *all* of them.",
    },
    {
      order: 50.0,
      description:
        "Solvers are not sure how to interpret the results of the image instruction (light hint)",
      nudge:
        "You should have a series of numbers.  What property do all the numbers share?  How might that relate to the image instruction you used to create the numbers?",
    },
    {
      order: 50.1,
      description:
        "Solvers are not sure how to interpret the results of the image instruction (strong hint)",
      nudge:
        "Each number is three or four digits, and the tens digit is only ever 0, 1, or 2.  The image instruction was “=SUM(A01:Z26)”.  What encoding does this suggest you apply?",
    },
    {
      order: 70.0,
      description:
        "Solvers have a long string of letters and are not sure what to do with them",
      keywords: ["letters"],
      nudge:
        "Look for obvious words in the string and replace them with shorter equivalents.  When you do that, look at what you have left.",
    },
    {
      order: 90.0,
      description:
        "Solvers have a message about conditional formatting but are not sure what to look at",
      keywords: ["conditional", "formatting"],
      nudge:
        "The term “fill color” refers to the background color used as a conditional formatting rule.  Closely examine the fill colors on the indicated sheets.",
    },
    {
      order: 90.1,
      description:
        "Solvers have a message about conditional formatting but are not sure what to look at (strong hint)",
      keywords: ["conditional", "formatting"],
      nudge:
        "At first glance, the conditional formatting rule for each of those sheets uses a black fill color, but look more closely at the components.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
