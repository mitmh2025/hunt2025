import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Just Plane Wrong",
  slug: "just_plane_wrong",
  code_name: "artistic-aztec",
  initial_description: "A series of technical drawings",
  answer: "FIRE EXTINGUISHER",
  authors: ["Sarah Leadbeater"],
  editors: [
    "Hubert Hwang",
    "Jonathan Lay",
    "Michele Pratusevich",
    "Teddy McArthur",
  ],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: false,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 0.0,
      description:
        "If the solvers have not yet identified what kind of drawings these are.",
      keywords: ["getting started", "type of drawing"],
      nudge: "These are 3-view orthographic drawings.",
    },
    {
      order: 10.0,
      description:
        "If solvers have not identified how the 3 views relate to each other",
      keywords: ["orthographic type", "angle"],
      nudge:
        "Each orthographic drawings is a third angle view showing the top, front, and right views of a single object.",
    },
    {
      order: 20.0,
      description:
        "If solvers are wondering if these are actual pieces that can be made or if there is missing information",
      keywords: ["missing", "constructible"],
      nudge:
        "Each orthographic drawing is complete, constructible, and not missing any information.",
    },
    {
      order: 50.0,
      description:
        "If solvers don’t know how to go about figuring out the shapes of the various objects.",
      keywords: ["3D", "approach", "CAD"],
      nudge:
        "There are many methods that can be used to visualize what the 3D parts would look like. They can be created in CAD, or overlaid in Photoshop. You may just be able to sketch out an approximation of the pieces by thinking about what the shapes would look like in 3D.",
    },
    {
      order: 75.0,
      description: "If solvers aren’t sure what to do with the pieces",
      keywords: ["assemble", "3D puzzle"],
      nudge:
        "The 3D pieces that would be made from these drawings assemble into a single object.",
    },
    {
      order: 80.0,
      description:
        "If solvers are struggling to figure out how the parts go together.",
      keywords: ["assemble", "pin", "cylinder"],
      nudge:
        "Some parts of the object have recognizable features that might help you to identify the final object (example: The 9th image has a distinctive feature). Other parts are similar in shape and probably go together (example: images 10, 11, and 12).",
    },
    {
      order: 100.0,
      description: "If they don’t recognize it as the answer",
      keywords: ["extraction", "assemble"],
      nudge:
        "The name of the single object that is made from the combined pieces is the answer.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
