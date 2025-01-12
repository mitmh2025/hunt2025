import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Battle Factory",
  slug: "battle_factory",
  code_name: "firsthand-cat",
  initial_description: "A bunch of Pokémon with names",
  answer: "CHOKING HAZARD",
  authors: ["Dee Ruttenberg"],
  editors: ["Jonathan Lay", "Kevin Hwang", "Sid Creutz"],
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
      order: 10.0,
      description: "Solvers are not sure how to start",
      keywords: ["starting"],
      nudge: "You will want to make a chain using two Pokémon at a time.",
    },
    {
      order: 20.0,
      description: "Solvers can’t make sense of the Pokémon names",
      nudge: "The wild Pokémon are too weak and will need to evolve.",
    },
    {
      order: 21.0,
      description: "Solvers still can’t make sense of the Pokémon names",
      nudge: "When a Pokémon evolves, their name changes.",
    },
    {
      order: 22.0,
      description:
        "Solvers don’t understand how the names are supposed to change",
      nudge:
        "Apply the same mechanic used to change a Pokémon’s name to another Pokémon’s given name to form a chain.",
    },
    {
      order: 50.0,
      description:
        "Solvers have identified many Pokémon, but don’t understand what to do with the trainers",
      nudge: "There are 13 Pokémon and 13 trainers in total.",
    },
    {
      order: 51.0,
      description:
        "Solvers still don’t understand how the trainers are associated with the Pokémon",
      nudge:
        "After evolving a Pokémon’s name, the new name should match up with one of the trainers’ titles (e.g. “Linguist”)",
    },
    {
      order: 75.0,
      description:
        "Solvers have matched the Pokémon and trainers but don’t know how to extract",
      nudge:
        "Compare the evolved Pokémon name with the trainer name with a matching title.",
    },
    {
      order: 76.0,
      description:
        "Solvers still don’t understand how to extract from the Pokémon and trainers",
      nudge:
        "The evolved Pokémon name and corresponding trainer names share a letter in the same position.",
    },
    {
      order: 77.0,
      description:
        "Solvers have extracted letters but don’t know what order in which to read them",
      nudge:
        "The Pokémon form a chain via the evolution mechanic. Be sure to start from the Starter Pokémon.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
