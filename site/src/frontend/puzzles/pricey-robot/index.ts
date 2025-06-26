import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Making Contact With An Informant",
  slug: "making_contact_with_an_informant",
  code_name: "pricey-robot",
  answer: "UNITY",
  authors: [
    "Leland Aldridge",
    "Alex St Claire",
    "Atul Shatavart Nadig",
    "Erin Price",
    "J. Hel\u00e9ne Andersson",
    "Laura Nicholson",
    "Nicholas Georgiou",
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
  additional_credits: [
    {
      for_what: "Archival videography",
      who: ["Steve Ewing of Stand Inside Media"],
    },
    {
      for_what: "Archival video editing",
      who: ["Evan Broder"],
    },
  ],
  content: {
    component: { lazy: () => import("./puzzle") },
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [],
  canned_responses: [
    {
      guess: ["INGOT", "NAOMI", "TAFFY", "URBAN", "YONDU"],
      reply: "This is a correct answer.",
    },
  ],
};

export default puzzle;
