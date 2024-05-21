// This is the canonical description of the structure of our hunt, with a full
// enumeration of rounds, puzzles, interactions, and the dependency structure.
import type { Hunt } from "./types";

const HUNT: Hunt = {
  rounds: [
    {
      slug: "shadow_diamond", // mounted at root
      title: "The Shadow Diamond",
      puzzles: [
        // slots (28 feeders, 4 metas, 1 super)
        { id: "sdp01", unlocked_if: [] }, // unlocked by default
        { id: "sdp02", unlocked_if: [] }, // unlocked by default
        { id: "sdp03", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1 },
        { id: "sdp04", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1 },
        { id: "sdp05", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1 },
        { id: "sdp06", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1 },
        { id: "sdp07", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1 },
        { id: "sdp08", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1 },
        { id: "sdp09", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1 },
        { id: "sdp10", unlockable_if: { puzzles_solved: 8 }, unlock_cost: 1 },
        { id: "sdp11", unlockable_if: { puzzles_solved: 9 }, unlock_cost: 1 },
        { id: "sdp12", unlockable_if: { puzzles_solved: 10 }, unlock_cost: 1 },
        { id: "sdp13", unlockable_if: { puzzles_solved: 11 }, unlock_cost: 1 },
        { id: "sdp14", unlockable_if: { puzzles_solved: 12 }, unlock_cost: 1 },
        { id: "sdp15", unlockable_if: { puzzles_solved: 13 }, unlock_cost: 1 },
        { id: "sdp16", unlockable_if: { puzzles_solved: 14 }, unlock_cost: 1 },
        { id: "sdp17", unlockable_if: { puzzles_solved: 15 }, unlock_cost: 1 },
        { id: "sdp18", unlockable_if: { puzzles_solved: 16 }, unlock_cost: 1 },
        { id: "sdp19", unlockable_if: { puzzles_solved: 17 }, unlock_cost: 1 },
        { id: "sdp20", unlockable_if: { puzzles_solved: 18 }, unlock_cost: 1 },
        { id: "sdp21", unlockable_if: { puzzles_solved: 19 }, unlock_cost: 1 },
        { id: "sdp22", unlockable_if: { puzzles_solved: 20 }, unlock_cost: 1 },
        { id: "sdp23", unlockable_if: { puzzles_solved: 21 }, unlock_cost: 1 },
        { id: "sdp24", unlockable_if: { puzzles_solved: 22 }, unlock_cost: 1 },
        { id: "sdp25", unlockable_if: { puzzles_solved: 23 }, unlock_cost: 1 },
        { id: "sdp26", unlockable_if: { puzzles_solved: 24 }, unlock_cost: 1 },
        { id: "sdp27", unlockable_if: { puzzles_solved: 25 }, unlock_cost: 1 },
        { id: "sdp28", unlockable_if: { puzzles_solved: 26 }, unlock_cost: 1 },
        {
          id: "sdm01",
          unlocked_if: {
            puzzles_solved: 5,
            slots: [
              "sdp01",
              "sdp02",
              "sdp03",
              "sdp04",
              "sdp05",
              "sdp06",
              "sdp07",
            ],
          },
        }, // Boardwalk (meta)
        {
          id: "sdm02",
          unlocked_if: {
            puzzles_solved: 5,
            slots: [
              "sdp08",
              "sdp09",
              "sdp10",
              "sdp11",
              "sdp12",
              "sdp13",
              "sdp14",
            ],
          },
        }, // Jewelry Store (meta)
        {
          id: "sdm03",
          slug: "the_casino",
          unlocked_if: {
            puzzles_solved: 5,
            slots: [
              "sdp15",
              "sdp16",
              "sdp17",
              "sdp18",
              "sdp19",
              "sdp20",
              "sdp21",
            ],
          },
        }, // Casino (meta)
        {
          id: "sdm04",
          unlocked_if: {
            puzzles_solved: 5,
            slots: [
              "sdp22",
              "sdp23",
              "sdp24",
              "sdp25",
              "sdp26",
              "sdp27",
              "sdp28",
            ],
          },
        }, // Estate (meta)
        {
          id: "sdm05",
          unlocked_if: {
            puzzles_solved: 2,
            slots: ["sdm01", "sdm02", "sdm03", "sdm04"],
          },
        }, // Where is the Diamond? (super)
      ],
      unlock_if: [
        // These are the conditions for the /round/ page being visible.
        // The initial round should be open from the start, with maybe a
        // wall-clock time condition?
      ],
      // TODO:
      // * default reward amount for solving puzzles in this round?
      // * something describing intended visibility rules to apply?
      // * default cost of unlocking a visible puzzle in this round?
    },
    {
      slug: "stakeout",
      title: "Stakeout",
      puzzles: [
        // 42 feeders, 1 meta
        { id: "sop01" },
        { id: "sop02" },
        { id: "sop03" },
        { id: "sop04" },
        { id: "sop05" },
        { id: "sop06" },
        { id: "sop07" },
        { id: "sop08" },
        { id: "sop09" },
        { id: "sop10" },
        { id: "sop11" },
        { id: "sop12" },
        { id: "sop13" },
        { id: "sop14" },
        { id: "sop15" },
        { id: "sop16" },
        { id: "sop17" },
        { id: "sop18" },
        { id: "sop19" },
        { id: "sop20" },
        { id: "sop21" },
        { id: "sop22" },
        { id: "sop23" },
        { id: "sop24" },
        { id: "sop25" },
        { id: "sop26" },
        { id: "sop27" },
        { id: "sop28" },
        { id: "sop29" },
        { id: "sop30" },
        { id: "sop31" },
        { id: "sop32" },
        { id: "sop33" },
        { id: "sop34" },
        { id: "sop35" },
        { id: "sop36" },
        { id: "sop37" },
        { id: "sop38" },
        { id: "sop39" },
        { id: "sop40" },
        { id: "sop41" },
        { id: "sop42" },
        { id: "som01" }, // (meta)
      ],
      unlock_if: [
        { slot_solved: "sdm01" },
        { interaction_completed: "interview_the_longshoreman" },
      ],
    },
    {
      slug: "paper_trail",
      title: "Paper Trail",
      puzzles: [
        // 16 feeders, 8 metas, 1 super
        { id: "ptp01" },
        { id: "ptp02" },
        { id: "ptp03" },
        { id: "ptp04" },
        { id: "ptp05" },
        { id: "ptp06" },
        { id: "ptp07" },
        { id: "ptp08" },
        { id: "ptp09" },
        { id: "ptp10" },
        { id: "ptp11" },
        { id: "ptp12" },
        { id: "ptp13" },
        { id: "ptp14" },
        { id: "ptp15" },
        { id: "ptp16" },
        { id: "ptm01" }, // meta 1
        { id: "ptm02" }, // meta 2
        { id: "ptm03" }, // meta 3
        { id: "ptm04" }, // meta 4
        { id: "ptm05" }, // meta 5
        { id: "ptm06" }, // meta 6 dir: "profitable-trunk"
        { id: "ptm07" }, // meta 7 dir: "green-princess"
        { id: "ptm08" }, // meta 8 dir: "bountiful-maple"
        { id: "ptm09" }, // supermeta
      ],
      unlock_if: [
        { slot_solved: "sdm02" },
        { interaction_completed: "interview_the_salesman" },
      ],
    },
    {
      slug: "illegal_search",
      title: "Illegal Search",
      puzzles: [
        // TODO
      ],
      unlock_if: [
        { slot_solved: "sdm03" },
        { interaction_completed: "interview_the_bookmaker" },
      ],
    },
    {
      slug: "background_check",
      title: "Background Check",
      puzzles: [
        // TODO
      ],
      unlock_if: [
        { slot_solved: "sdm04" },
        { interaction_completed: "interview_the_valet" },
      ],
    },
    {
      slug: "the_dead_thief",
      title: "The Dead Thief",
      puzzles: [
        // TODO
      ],
      unlock_if: [
        { interaction_completed: "meet_billie" },
        { interaction_completed: "catch_the_thief" },
      ],
    },
    {
      slug: "the_real_diamond",
      title: "The Real Diamond",
      puzzles: [
        // TODO
      ],
      unlock_if: [
        { interaction_completed: "meet_katrina" },
        { interaction_completed: "meet_gladys" },
        { interaction_completed: "meet_carter" },
        { interaction_completed: "meet_papa" },
        { interaction_completed: "unmask_the_killer" },
      ],
    },
  ],
  interactions: [
    {
      id: "meet_billie",
      unlock_if: [{ slot_solved: "sdm05" }],
    },
    {
      id: "catch_the_thief",
      unlock_if: [{ interaction_completed: "meet_billie" }],
    },
    {
      id: "interview_the_longshoreman",
      unlock_if: [{ slot_solved: "sdm01" }],
    },
    {
      id: "interview_the_salesman",
      unlock_if: [{ slot_solved: "sdm02" }],
    },
    {
      id: "interview_the_bookmaker",
      unlock_if: [{ slot_solved: "sdm03" }],
    },
    {
      id: "interview_the_valet",
      unlock_if: [{ slot_solved: "sdm04" }],
    },
    {
      id: "meet_katrina",
      unlock_if: [
        // TODO: solve stakeout super, once we know the slot id
      ],
    },
    {
      id: "meet_gladys",
      unlock_if: [
        // TODO: solve paper trail super, once we know the slot id
      ],
    },
    {
      id: "meet_carter",
      unlock_if: [
        // TODO: solve background check super, once we know the slot id
      ],
    },
    {
      id: "meet_papa",
      unlock_if: [
        // TODO: solve illegal search super, once we know the slot id
      ],
    },
    {
      id: "unmask_the_killer",
      unlock_if: [
        // TODO: solve unmask the killer (The Dead Thief supermeta), once we know the slot id
      ],
    },
    {
      id: "find_the_diamond",
      unlock_if: [
        { interaction_completed: "meet_katrina" },
        { interaction_completed: "meet_gladys" },
        { interaction_completed: "meet_carter" },
        { interaction_completed: "meet_papa" },
        { interaction_completed: "unmask_the_killer" },
      ],
    },
  ],
};

export default HUNT;
