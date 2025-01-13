import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Neatly Drawn",
  slug: "neatly_drawn",
  code_name: "exotic-pirate",
  initial_description:
    "A connect-the-dots puzzle where each dot is associated with an image",
  answer: "BIRD ORCHID",
  authors: ["Li-Mei Lim"],
  editors: ["Joel Fried", "Michele Pratusevich", "Robin Deits"],
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
      description: "Solvers don’t know where to start",
      keywords: ["start"],
      nudge:
        "Try identifying some of the images.  In particular, #3, #13, #19, #34, #38, and #52 may be familiar.",
    },
    {
      order: 5.0,
      description:
        "Solvers have identified some images but don’t yet see a connection between them or know how to use them.",
      nudge:
        "All the images come from children’s books with something in common.",
    },
    {
      order: 10.0,
      description:
        "Solvers know that the images come from Caldecott-awarded books, but haven’t separated winners from honorees.",
      nudge:
        "The flavortext says the winners’ circle has gotten jumbled - can you separate out the winners?",
    },
    {
      order: 45.0,
      description:
        "Solvers have figured out that the images are from Caldecott-awarded books and have separated winners and honorees, but don’t know how to order the images.",
      keywords: ["order"],
      nudge:
        "Each of these books was awarded the Caldecott medal or honor in a particular year.",
    },
    {
      order: 50.0,
      description:
        "Solvers have figured out that the images are from Caldecott-awarded books and have ordered the books by year, but haven’t separated winners and honorees and therefore aren’t able to draw good pictures.",
      nudge:
        "The flavortext says that the winners circle is jumbled.  Separate things out to make two separate pictures.",
    },
    {
      order: 100.0,
      description:
        "Solvers have separated and ordered the images and connected the corresponding dots, but are stuck on the extraction.",
      keywords: ["extraction"],
      nudge:
        "The answer is two words that fit in the blanks given, clued by the two pictures you get by connecting the dots.  The first word is a general term, but the second word is specific.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
