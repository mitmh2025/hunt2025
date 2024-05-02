import HUNT from "./index";

// Filter out frontend-oriented elements of Hunt data to allow exporting the
// hunt structure (as used by the backend) as a single JSON blob.

const huntdata = {
  rounds: HUNT.rounds.map((round) => {
    const { puzzles, ...roundRest } = round;
    return {
      puzzles: puzzles.map((puzzleSlot) => {
        const { assignment, ...puzzleSlotRest } = puzzleSlot;
        let newAssignment;
        if (assignment) {
          const { title, slug, authors, hints, canned_responses } = assignment;
          // These fields are mutually exclusive
          const answer = (assignment as any).answer;
          const answers = (assignment as any).answers;
          newAssignment = {
            title,
            slug,
            authors,
            answer,
            answers,
            hints,
            canned_responses,
          };
        }
        return {
          assignment: newAssignment,
          ...puzzleSlotRest,
        };
      }),
      ...roundRest,
    };
  }),
  interactions: HUNT.interactions,
};

const dump = JSON.stringify(huntdata);
console.log(dump);
