import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Incognito",
  slug: "incognito",
  code_name: "heavy-iron",
  initial_description: "Cryptic crossword",
  answer: "PERP",
  authors: ["Alex Churchill", "Leland Aldridge"],
  editors: ["James Douberley", "Robin Deits", "Tanya Khovanova"],
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
      description: "What do we do with this?",
      nudge: "It’s a cryptic crossword. Try solving some of the clues.",
    },
    {
      order: 20.0,
      description:
        "Solvers can solve some of the clues but can’t solve 11A, 13A, 14A, 23A, 28A, 38A, 45A, 49A, 51A, 55A, 58A, 63A, 66A, 68A, 5D, 24D, 29D, 34D, 36D, 37D, 43D, 52D, 56D",
      nudge:
        "Some of these clues might seem unusual. But you should still be able to infer what the answer is, because of the way cryptic clues have both a definition and a wordplay half. Keep track of any unexpected definitions or synonyms that don’t seem to match: you might need them later...",
    },
    {
      order: 50.0,
      description:
        "Solvers have worked out there’s a logic puzzle hidden in here, but haven’t got all the names, nationalities or professions of the five Rambling Club members",
      keywords: ["rambling", "logic"],
      nudge:
        "You need to find out who’s in the Rambling Club. You’ll get forenames from 23A, 28A, 38A, 49A, 55A, 58A, 5D, 29D, 37D; surnames from 45A, 51A, 55A, 34D, 52D, 56D; genders from 23A and 45A; jobs from 13A, 38A, 51A, 55A, 66A, 68A, 36D, 37D; and nationalities from 11A, 49A, 66A, 68A, 5D, 36D, 56D.",
    },
    {
      order: 70.0,
      description:
        "Solvers have worked out most of the logic puzzle but can’t find the extraction",
      keywords: ["extraction"],
      nudge:
        "Have you noticed anything unusual about the grid now you’ve put some letters into it?",
    },
    {
      order: 80.0,
      description:
        "Solvers have worked out most of the logic puzzle but can’t find the secret message about the extraction",
      keywords: ["extraction"],
      nudge:
        "Look for a secret message in the grid that tells you how to extract the answer.",
    },
    {
      order: 90.0,
      description:
        "Solvers have solved the logic puzzle and found the “MURDERER INFO ENTRY INTERSECTIONS GIVE ANSWER” clue but can’t put them together",
      keywords: ["murderer", "intersections"],
      nudge:
        "If you’ve worked out who you think is the guilty party, find which clues or entries give information about them! Which includes those that directly tell you the killer *isn’t* someone, such as 63A and 5D.",
    },
  ],
  canned_responses: [
    {
      guess: ["MURDERER INFO ENTRY INTERSECTIONS GIVE ANSWER"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
