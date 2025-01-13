import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Making Contact With An Informant",
  slug: "making_contact_with_an_informant",
  code_name: "pricey-robot",
  answer: "UNITY",
  authors: [
    "Leland Aldridge",
    "Atul Shatavart Nadig",
    "Erin Price",
    "J. Heléne Andersson",
    "Laura Nicholson",
    "rfong",
    "Steven Keyes",
    "Teddy McArthur",
    "Wesley Graybill",
  ],
  editors: [
    "James Douberley",
    "Michele Pratusevich",
    "Nathan Fung",
    "Robin Deits",
  ],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [],
};

export default puzzle;
