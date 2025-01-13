import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title:
    "abstract art and poems / concerning a pale blue dot / and many more friends",
  slug: "abstract_art_and_poems_concerning_a_pale_blue_dot_and_many_more_friends",
  code_name: "granular-shoe",
  initial_description: "Physical Puzzle—Printed magnets and strips of paper",
  answer: "LA SERENISSIMA",
  authors: ["Anna Brunner"],
  editors: ["J. Heléne Andersson", "Laura Nicholson", "Melanie Matchett Wood"],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Anna Brunner"],
    },
    {
      for_what: "Fabrication",
      who: [
        "Aletta Tibbetts",
        "Erin Price",
        "Grace Daigle",
        "Molly Frey",
        "Sarah Leadbeater",
        "Will Tymowski",
      ],
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
      order: 10.0,
      description:
        "Solvers have assembled all the art and “magnet poetry” jigsaws and want a nudge about what to do next.",
      keywords: ["beginning"],
      nudge:
        "One set of text clues has numbers in brackets, try figuring out what words should fit in those spots. You could also try to figure out what the other set of text clues mean. You can worry about figuring out what the art means a little later.",
    },
    {
      order: 30.0,
      description:
        "Solvers have assembled the magnet poetry but do not know what to do with it (medium hint)",
      keywords: ["haikus", "magnet poetry"],
      nudge: "These poems have a source. (Try googling some of them.)",
    },
    {
      order: 40.0,
      description:
        "Solvers have reconstructed the clue phrase but are confused by what to do with it",
      keywords: ["ordering", "clue phrase", "Shakespeare"],
      nudge:
        "Look at who is saying each quote and think about the theme of the puzzle. Maybe try googling all these names together",
    },
    {
      order: 60.0,
      description:
        "Solvers have assembled the magnet poetry but do not know what to do with it (strong hint)",
      keywords: ["haikus", "magnet poetry"],
      nudge:
        "These haikus were all abstract summaries for abstracts submitted to the Lunar and Planetary Science Conference. You need to find the abstracts they go with and take a look at them. See anything familiar?",
    },
    {
      order: 80.0,
      description:
        "Solvers have found the abstracts but aren’t sure what to do with them. (medium hint)",
      keywords: ["extraction", "abstracts", "art", "haikus", "LPSC"],
      nudge:
        "Do you see anything familiar when you look at the contents of the abstracts themselves?",
    },
    {
      order: 85.0,
      description:
        "Solvers have found the abstracts but aren’t sure what to do with them. (much stronger hint)",
      keywords: ["extraction", "abstracts", "LPSC", "art"],
      nudge:
        "Each LPSC abstract should have a plot that looks a lot like one of the “abstract” arts you re-assembled. The “?” on each art clue should correspond to a letter on the original plot.",
    },
    {
      order: 90.0,
      description:
        "Solvers have found the sources of the art but are having trouble extracting some of the letters.",
      keywords: ["extraction", "abstracts", "art", "LPSC"],
      nudge:
        "The ?’s are always written in the same orientation as the letter it represents on the plot. Some of the art represents only part of a plot. If there are parentheses around a question mark, look for a letter in parentheses in the right spot.",
    },
    {
      order: 95.0,
      description:
        "Solvers have gotten the clue phrase and found the Uranian moons, but still don’t understand the order to use (strong hint)",
      keywords: ["ordering", "clue phrase", "moons of Uranus"],
      nudge:
        "Order the clues by how far they orbit from Uranus (by semi-major axis).",
    },
  ],
  canned_responses: [
    {
      guess: [
        "YOU COULD LEARN OUR SECRETS BY COMPARISON OF WHERE OUT YONDER EACH LITTLE ROCK CIRCLED THE BIGGER CLOUD WORLD",
      ],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
