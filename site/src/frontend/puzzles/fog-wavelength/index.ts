import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Cacciando Trio Misterioso",
  slug: "cacciando_trio_misterioso",
  code_name: "fog-wavelength",
  initial_description: "A sound clip and a music critic’s review",
  answer: "WALTZES AND MARCHES",
  authors: ["Denis Auroux"],
  editors: ["Anna Brunner", "Elan Blaustein", "Steve Banzaert"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 10.0,
      description: "Solvers don’t know where to start.",
      keywords: ["stuck", "getting started"],
      nudge:
        "Perhaps there is a message encoded inside some of the instruments’ parts? We suggest starting with either the piano or the tuba, both of which use well known codes. Try to figure out the encoding scheme, and proceed to decode the message.",
    },
    {
      order: 20.0,
      description:
        "Solvers have trouble hearing what’s going on with three instruments playing at once and wish they could separate them better.",
      keywords: ["separation", "individual instruments"],
      nudge:
        "Have you tried listening to the music with headphones? Note the comment in the critic’s review about the placement of the pianist.",
    },
    {
      order: 40.0,
      description:
        "Solvers are confused by the nonsense word “26edo” appearing in the tuba part.",
      keywords: ["26edo", "nonsense"],
      nudge: "Have you tried googling “26edo”?",
    },
    {
      order: 60.0,
      description:
        "Solvers don’t know how to measure the pitches of the flute notes",
      keywords: ["flute", "pitch", "frequency"],
      nudge:
        "It is easier to determine the height/frequency of a flute note if you compare it with a known note. Consider listening to the flute part with the help of a tuning app, a tone generator app, or a musical instrument to compare the played notes with known notes or determine their pitch. Or you can use software to produce a spectrogram (this may or may not detect correctly all the notes).",
    },
    {
      order: 70.0,
      description:
        "Solvers have tried mapping the entire flute range to A-Z and got nonsense",
      keywords: ["flute", "range", "nonsense"],
      nudge:
        "It is common for notes that are an octave apart (hence sound “the same, at a different height”) to be given the same name. There is something special about the tuning system used by the flute that provides a more natural mapping than mapping the entire range of the melodic line to letters A-Z.",
    },
    {
      order: 70.0,
      description:
        "Solvers aren’t sure what reference point to use for the flute note heights",
      keywords: ["flute", "reference pitch"],
      nudge:
        "What happens if you assume the usual A (440 Hz) is an A ? (Also, have you noticed that the provided score gives you one letter for each part?)",
    },
    {
      order: 99.0,
      description:
        "Solvers report feeling mildly unwell after listening to this piece of “music” for hours on end.",
      keywords: ["unwell", "sick", "nauseated"],
      nudge:
        "We sincerely apologize. If your symptoms are serious, please seek medical help as appropriate. Otherwise, consider just moving on to a different puzzle that doesn’t involve music and leaving this one to others with fresh ears.",
    },
  ],
  canned_responses: [
    {
      guess: ["MARCHES", "WALTZES"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
