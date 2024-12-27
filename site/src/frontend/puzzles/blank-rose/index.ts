import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "📑🍝",
  slug: "📑🍝",
  initial_description:
    "A paragraph ❡ of emojipasta 😄🍝 and a note 📑 that you have to talk 🎙️ to other teams 👨‍👩‍👧‍👦 about it.",
  answer: "PIDAKALA WAR",
  authors: ["Ollie Shonaldmann", "Fuzzy Shonaldmann"],
  editors: ["Elan Blaustein", "Jesse Moeller", "Kevin Hwang", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "The solvers don’t know where to start",
      nudge:
        "This puzzle 🧩 pushes the boundaries 🗺️ of what you’re allowed ✅ to do in Mystery ❓ Hunt 🔎. Ask HQ 🏰 if you’re not sure if something’s allowed 🤔🤔🤔.",
    },
    {
      order: 30.0,
      description: "Solvers don’t have all the pieces",
      keywords: ["data"],
      nudge:
        "You should end up with 9️⃣ pieces before you can solve 💡 this puzzle 🧩. Ask more teams 🗣️🗣️🗣️!",
    },
    {
      order: 50.0,
      description: "Solvers don’t know what to do with the text they have",
      keywords: ["data set"],
      nudge:
        "Each of the pieces 🧩 you got 🤝 from another team 👬👭👫👬 references 👩‍🏫 a famous 🤩 copypasta ©️🍝.",
    },
    {
      order: 60.0,
      description: "Solvers have not put the pieces in order",
      keywords: ["ordering"],
      nudge:
        "Each piece 🧩 has two parts 1️⃣ 2️⃣: figure out which start 🔝 matches up with which end ⬇️.",
    },
    {
      order: 65.0,
      description: "Solvers are still stuck on ordering",
      keywords: ["ordering"],
      nudge:
        "The pieces 🧩 form a chain ⛓️: each piece has two parts 1️⃣ 2️⃣ and the second part 2️⃣ will match 🔥 to another first part 1️⃣, the second part 2️⃣ of that one will match 🎄 to the first 1️⃣ of another, etc. until you’ve built 👷 a complete circular chain ⛓️🌎⭕️.",
    },
    {
      order: 80.0,
      description: "Solvers are stuck on extraction",
      keywords: ["extraction"],
      nudge:
        "The second part of each piece 🧩 has the number 9️⃣ to indicate 👉 that there are nine total 🌎 parts. In addition, it has another number 1️⃣-8️⃣ that you can use for extraction 🦷.",
    },
    {
      order: 100.0,
      description: "Solvers are still stuck on extraction",
      keywords: ["extraction"],
      nudge:
        "Index 📗 into the word ✍️ indicated by the 🔲🔲🔲s in the text. Use the index ☝️ from the text that matches 🔗 the theme of the 🔲🔲🔲s.",
    },
  ],
  canned_responses: [
    {
      guess: ["SEND NUDE", "SEND NUDES"],
      reply: "🙈 You’re close, but please 🙏 don’t do that 🛑🛑🛑.",
    },
    {
      guess: ["SEND US ONE"],
      reply:
        "Write ✍️ your own emojipasta 😀🍝 and send ✉️ it to info@mitmh2025.com 🙏. Include your team name 📇 and the phrase 🗣️ SEND US ONE.",
    },
  ],
};

export default puzzle;
