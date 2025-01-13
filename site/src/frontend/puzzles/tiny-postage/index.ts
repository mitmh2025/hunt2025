import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Smoke ’Em if you’ve got ’Em",
  slug: "smoke_em_if_youve_got_em",
  code_name: "tiny-postage",
  initial_description: "A paper box with thirteen paper objects inside.",
  answer: "MANUEL ORIBE",
  authors: ["Brie Frame", "Erin Price"],
  editors: [
    "Henry Wong",
    "James Douberley",
    "Li-Mei Lim",
    "Robin Deits",
    "Teddy McArthur",
  ],
  additional_credits: [
    {
      for_what: "Kakuros",
      who: ["Denis Auroux"],
    },
  ],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 9.0,
      description:
        "ACADEMIC: solvers are confused about how to fill in answers",
      nudge:
        "The questions are presented in order but the sets of answers are presented alphabetically. Find the correct set of answers for each question and fill in the bubbles for each correct answer.",
    },
    {
      order: 10.0,
      description:
        "ACADEMIC: solvers have filled in answers to trivia questions but don’t know what to do with the Scantron",
      keywords: ["extraction"],
      nudge:
        "A Scantron machine would read the sheet from a different direction. Have you tried looking at it from a different perspective?",
    },
    {
      order: 11.0,
      description:
        "ACADEMIC: solvers have the number 8.314 but don’t know how to get a letter from that",
      nudge:
        "Look closely at the bubbles in rows 18-23 on the Scantron sheet for units on this number.",
    },
    {
      order: 15.0,
      description:
        "ACTOR: solvers recognize Shakespeare characters, but don’t recognize where the data set is coming from",
      keywords: ["start", "actors"],
      nudge:
        "“This school” is MIT, of course, and “the Bard” is Shakespeare. All of the actors in question performed here between 2007 and 2023.",
    },
    {
      order: 17.0,
      description:
        "ACTOR: solvers have filled in all feeder names and have found the characters and names for the central clues, but need help with the final aha",
      keywords: ["extraction"],
      nudge:
        "The final four names create first and last names of two people who are NOT members of the MIT Shakespeare Ensemble. What have they performed in together?",
    },
    {
      order: 21.0,
      description:
        "BARTENDER: solvers have noticed color words but may not know the establishments are real, and/or don’t know how to order them",
      keywords: ["order"],
      nudge: "Where can you find these bars in real life?",
    },
    {
      order: 22.0,
      description:
        "BARTENDER: solvers have arranged bars and extracted ART SHAPE from first letters of colors but don’t know where to go from here",
      keywords: ["art shape"],
      nudge:
        "The art being referenced can be found somewhere on campus. Try googling words in groups to find the art. What shape is it?",
    },
    {
      order: 25.0,
      description:
        "CORONER: solvers don’t know where to start and don’t seem to have found the separate sheet with graphics",
      keywords: ["start", "what is this"],
      nudge:
        "The tissue samples have been properly filed in the cigarette box itself. Make sure you have found them before proceeding.",
    },
    {
      order: 26.0,
      description:
        "CORONER: solvers have linked the “tissue samples” with the puzzle text, but either don’t know it references a sculpture or don’t know where to find it on campus",
      nudge:
        "The coroner’s subject can be found at 84 Mass Ave. You should probably examine it in person. Bring a coat.",
    },
    {
      order: 30.0,
      description:
        "FLORIST: solvers have filled in the grid but can’t get an answer from it",
      keywords: ["extraction"],
      nudge:
        "One flower of each color was unclued. What word could follow each of the unclued flowers?",
    },
    {
      order: 35.0,
      description:
        "LOGICIAN: solvers have filled in the kakuro but don’t know what to do with the answer",
      keywords: ["filled grid", "extraction"],
      nudge: "Have you tried visiting the room number you just found?",
    },
    {
      order: 40.0,
      description:
        "PHOTOGRAPHER: solvers don’t know how to start and give no indication that they have visited the relevant physical location on campus",
      keywords: ["start"],
      nudge:
        "Walk along the infinite corridor on the 4th floor of building 4. It’ll come to you in a flash.",
    },
    {
      order: 41.0,
      description:
        "PHOTOGRAPHER: solvers aren’t sure how to follow the instructions",
      nudge:
        "Start on a tile where you can see yourself without any interruptions from engraving. Each instruction describes one or more tiles that you will need to use to move around the grid. “Turn” means turn left or right, making an angle of 120 degrees; “sharp turn” means turn left or right, making an angle of 60 degrees.",
    },
    {
      order: 42.0,
      description:
        "PHOTOGRAPHER: solvers have completed the tile walk but need help getting an answer from it",
      keywords: ["extraction"],
      nudge:
        "Every tile you’ve landed on was signed by the artist. What superstars!",
    },
    {
      order: 45.0,
      description:
        "POET: solvers don’t know where to start and don’t know that there is a location on campus being referenced",
      keywords: ["start"],
      nudge:
        "An oversized Nyan Cat once flew in Lobby 7 as a hack. Where on campus can you find it now?",
    },
    {
      order: 46.0,
      description:
        "POET: solvers got the above hint and still can’t find the on-campus location referenced",
      keywords: ["where"],
      nudge:
        "An oversized Nyan Cat is currently flying in a hallway connecting Building 2 and Building 14.",
    },
    {
      order: 47.0,
      description:
        "POET: solvers found the Course 21 displays in Building 14 but are having trouble connecting poems with any particular display",
      keywords: ["match"],
      nudge:
        "The poet simply rhymed extracts from the words of others—quotes from faculty and students, in specific.",
    },
    {
      order: 48.0,
      description:
        "POET: solvers have matched up poems to quotes, noted the matching words, and need help getting the final aha",
      keywords: ["extraction"],
      nudge:
        "The poet’s works have as many words in a line as there are letters in the name of the person being quoted. How curious!",
    },
    {
      order: 50.0,
      description:
        "POLICE OFFICER: solvers don’t know where to start and give no indication of having visited a physical location on campus",
      keywords: ["start"],
      nudge:
        "There is a memorial to a fallen police officer on campus. You should pay it a visit and get in touch with your feelings.",
    },
    {
      order: 55.0,
      description:
        "STONEMASON: solvers find the wording of the stone fruit anagram constraint confusing",
      keywords: ["stone fruit"],
      nudge:
        "When looking for these anagrams, only whole words will be used. Additional words may appear in the block, but no part of them will be included in the anagram; conversely, if a word is included in the anagram, no part of that word will be ignored.",
    },
    {
      order: 56.0,
      description:
        "STONEMASON: solvers have completed the grid and found LOBBY 7, but need help with the final aha",
      keywords: ["lobby 7", "extraction"],
      nudge:
        "When you visit Lobby 7, look up and see if you can find the Apprentice’s inscription carving. Huh. Looks like they indeed got exactly one thing right.",
    },
    {
      order: 60.0,
      description:
        "SWIMMER: since they’ve been told not to eat the capsule, solvers don’t know what else to do with it",
      keywords: ["capsule"],
      nudge:
        "Did you ever play with Magic Grow capsules as a kid? Let this capsule go for a little swim. It’ll take a couple of minutes.",
    },
    {
      order: 90.0,
      description:
        "DEAD DROP: solvers are confused about the wording of the Academic constraint",
      keywords: ["academic"],
      nudge:
        "Each of the topics has four questions, but often more than one answer per question. For clarity: how many bubbles do you fill in for each topic?",
    },
    {
      order: 91.0,
      description:
        "DEAD DROP: solvers are confused about the Stonemason’s constraint",
      keywords: ["stonemason"],
      nudge:
        "The Stonemason loves the SUPERBOWL, but someone else’s puzzle clued that string of letters with a space in it.",
    },
    {
      order: 99.0,
      description: "Solvers don’t have a blacklight",
      keywords: ["blacklight"],
      nudge:
        "The Gala is black tie; maybe they have blacklights. Go to a bartender and say “Got a blacklight?”",
    },
    {
      order: 100.0,
      description:
        "Solvers have identified the blacklight clues but can’t get the final answer",
      keywords: ["branil"],
      nudge: "The orientation of the blacklight numbers is important.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
