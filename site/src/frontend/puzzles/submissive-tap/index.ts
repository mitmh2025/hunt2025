import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Tailing a Lead",
  slug: "tailing_a_lead",
  code_name: "submissive-tap",
  answer: "TALE AS OLD AS TIME",
  authors: [
    "Wesley Graybill",
    "Caroline Elliott",
    "Grant Elliott",
    "James Douberley",
    "Leland Aldridge",
  ],
  editors: [
    "Henry Wong",
    "Leland Aldridge",
    "Michele Pratusevich",
    "Wesley Graybill",
  ],
  additional_credits: [
    {
      who: ["rfong"],
      for_what: "Videography",
    },
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
      guess: ["MRS POTTS LYRIC"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
