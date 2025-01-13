import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Where Am I?",
  slug: "where_am_i",
  code_name: "scornful-screen",
  initial_description: "A travel vlog video",
  answer: "ZAKYNTHOS",
  authors: ["Teddy McArthur"],
  editors: [
    "Chris Gatesman",
    "Michele Pratusevich",
    "Nathan Fung",
    "Steve Banzaert",
  ],
  additional_credits: [
    {
      // Will appear in-app as 'Evan performed by'
      for_what: "Evan performed",
      who: [
        "Amanda Giermann",
        "Anisa Schardl",
        "Dee Ruttenberg",
        "Paul Hlebowoitsh",
        "Sid Creutz",
        "Steve Banzaert",
        "Steven Vanderveer",
        "Teddy McArthur",
        "Zachary Eucker",
      ],
    },
  ],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.005,
      description:
        "Solvers are viewing the video and are unsure where to start.",
      keywords: ["starting"],
      nudge:
        "Unusually for a video like this, this travel vlog never actually tells you where it’s being filmed. Try using what you can see, along with occasional hints in the narration, to figure out where each video was filmed.",
    },
    {
      order: 1.011,
      description: "Solvers are having difficulty identifying clip 1.",
      nudge:
        "Consider what you can see in the background at the very start of the clip and what the narrator says about his planned trip. Combining these two clues will limit the number of possible locations, especially if you consider why he thinks that British Airways might have been “appropriate.”",
    },
    {
      order: 1.014,
      description: "Solvers are having difficulty identifying clip 4.",
      nudge:
        "This is a pretty close shot on the performers, which doesn’t give a lot of room to identify surroundings. Try identifying what piece is being performed, and then use what you can find about where the piece was performed to confirm your surroundings.",
    },
    {
      order: 1.015,
      description: "Solvers are having difficulty identifying clip 5.",
      nudge:
        "The narrator mentions seeing the eclipse at this planetarium (or, well, intending to). We know from the narrator’s lines in the first clip that he isn’t leaving the country. What American planetariums were in the path of totality for the 2024 total solar eclipse?",
    },
    {
      order: 1.016,
      description:
        "Solvers are having difficulty identifying clip 6 (or have requested help and have unwittingly misidentified clip 6).",
      nudge:
        "While this may look like the most famous version of this monument at first, the lack of crowds in the middle of the day indicate that it isn’t—and if you compare the surroundings, you can confirm that it isn’t. Try seeing if there are other versions of this monument installed in parks elsewhere in the country.",
    },
    {
      order: 1.5,
      description:
        "Solvers have identified (or mostly identified) the clips and are unsure of how to proceed.",
      nudge:
        "In his last video, the narrator instructs you to look up his username on a social media service. Is there a way you can use the clips you have identified to provide what sounds like a reasonable name for a travel vlogger’s social media account?  And is there a way you can use the skills you have honed during the puzzle on the final clip to determine where to find that account?",
    },
    {
      order: 2.001,
      description:
        "Solvers have found the social media account and are unsure where to begin.",
      nudge:
        "Just like in the video, you should try to identify where each of these pictures was taken. As Evan says, these were all taken in the greater Boston area—specifically, Boston, Cambridge, and Brookline. Once you’ve done that, consider how the text of each post relates to what you learn about each location.",
    },
    {
      order: 2.006,
      description:
        "Solvers are having difficulty identifying the sixth photo (a small park).",
      nudge:
        "The text describes this as in downtown Boston. This photo shows more or less the entirety of this park. Try looking at downtown Boston on a map and finding small parks—smaller than a city block—then see if you can match photos of those parks to the photo that you are seeing.",
    },
    {
      order: 2.5,
      description:
        "Solvers have identified (or mostly identified) the photos’ location, but not the additional data.",
      nudge:
        "In the opening post, Evan talks about how “you gotta really go out of your way” to find these spots. But you can clearly see that these are not off the beaten path—just the opposite. How did Evan get to these locations?",
    },
    {
      order: 2.6,
      description:
        "Solvers have identified the photos and the additional information needed to extract, but have not determined the method.",
      nudge:
        "Look at the whole of each post’s text. Some of the language is a bit stilted, isn’t it?  Consider each post in the context of the additional information about each location that you have gathered.",
    },
    {
      order: 2.9,
      description:
        "Solvers have extracted the phrase from the social media account, but are unsure what to do.",
      nudge:
        "The next step is for teams to go to the Stata Center’s first level and look at the boards there to see what you can find. If you have gone there and did not find anything, please come up to the Gala or send us an email and let us know. If you are a remote team, please send us an email.",
    },
    {
      order: 3.5,
      description:
        "Solvers have found the final text of the puzzle, but are unsure how to extract.",
      keywords: ["extraction"],
      nudge:
        "How many numbers are on the flyer? Does this match with any information you already have? (Remember—the numbers in the dates in the footer are a requirement for flyers posted at MIT and are not part of the puzzle content.)",
    },
  ],
  canned_responses: [
    {
      guess: ["EVANSTRIP"],
      reply: "Keep going!",
    },
    {
      guess: ["GO SEE STATA BOARD FIRST LEVEL"],
      reply: "Well? Go do it!",
    },
  ],
};

export default puzzle;
