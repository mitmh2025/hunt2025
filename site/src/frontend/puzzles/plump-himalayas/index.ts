import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Control Room",
  slug: "control_room",
  code_name: "plump-himalayas",
  initial_description: "An invitation to schedule an interaction",
  answer: "PIVOT TABLE",
  authors: [
    "Robert “Fro” Myers",
    "Arcturus Wang",
    "Brie Frame",
    "Hubert Hwang",
    "Kevin Hwang",
  ],
  editors: ["Chris Gatesman", "Jesse Moeller", "Melanie Matchett Wood"],
  additional_credits: [
    {
      for_what: "Fabrication",
      who: [
        "Arcturus Wang",
        "Brie Frame",
        "Fabiola Hernandez",
        "Jennifer Wang",
        "Robert “Fro” Myers",
        "Sam Duffley",
      ],
    },
    {
      for_what: "Tech",
      who: ["Arcturus Wang", "Ariel Schwartz", "Quentin Smith"],
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
    copyable: false,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [],
  canned_responses: [],
};

export default puzzle;
