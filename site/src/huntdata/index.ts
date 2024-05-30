// This is the canonical description of the structure of our hunt, with a full
// enumeration of rounds, puzzles, interactions, and the dependency structure.
import type { Hunt } from "./types";

// prettier-ignore
const HUNT: Hunt = {
  rounds: [
    {
      slug: "shadow_diamond", // mounted at root
      title: "The Shadow Diamond",
      puzzles: [
        // slots (28 feeders, 4 metas, 1 super)
        { id: "sdp01", unlocked_if: [] }, // unlocked by default
        { id: "sdp02", unlocked_if: [] }, // unlocked by default
        { id: "sdp03", unlocked_if: [] }, // unlocked by default
        { id: "sdp04", unlockable_if: [], unlock_cost: 1 }, // initially visible
        { id: "sdp05", unlockable_if: [], unlock_cost: 1 }, // initially visible
        { id: "sdp06", unlockable_if: { puzzles_unlocked: 4 }, unlock_cost: 1 },
        { id: "sdp07", unlockable_if: { puzzles_unlocked: 5 }, unlock_cost: 1 },
        { id: "sdp08", unlockable_if: { puzzles_unlocked: 6 }, unlock_cost: 1 },
        { id: "sdp09", unlockable_if: { puzzles_unlocked: 7 }, unlock_cost: 1 },
        { id: "sdp10", unlockable_if: { puzzles_unlocked: 8 }, unlock_cost: 1 },
        { id: "sdp11", unlockable_if: { puzzles_unlocked: 9 }, unlock_cost: 1 },
        { id: "sdp12", unlockable_if: { puzzles_unlocked: 10 }, unlock_cost: 1 },
        { id: "sdp13", unlockable_if: { puzzles_unlocked: 11 }, unlock_cost: 1 },
        { id: "sdp14", unlockable_if: { puzzles_unlocked: 12 }, unlock_cost: 1 },
        { id: "sdp15", unlockable_if: { puzzles_unlocked: 13 }, unlock_cost: 1 },
        { id: "sdp16", unlockable_if: { puzzles_unlocked: 14 }, unlock_cost: 1 },
        { id: "sdp17", unlockable_if: { puzzles_unlocked: 15 }, unlock_cost: 1 },
        { id: "sdp18", unlockable_if: { puzzles_unlocked: 16 }, unlock_cost: 1 },
        { id: "sdp19", unlockable_if: { puzzles_unlocked: 17 }, unlock_cost: 1 },
        { id: "sdp20", unlockable_if: { puzzles_unlocked: 18 }, unlock_cost: 1 },
        { id: "sdp21", unlockable_if: { puzzles_unlocked: 19 }, unlock_cost: 1 },
        { id: "sdp22", unlockable_if: { puzzles_unlocked: 20 }, unlock_cost: 1 },
        { id: "sdp23", unlockable_if: { puzzles_unlocked: 21 }, unlock_cost: 1 },
        { id: "sdp24", unlockable_if: { puzzles_unlocked: 22 }, unlock_cost: 1 },
        { id: "sdp25", unlockable_if: { puzzles_unlocked: 23 }, unlock_cost: 1 },
        { id: "sdp26", unlockable_if: { puzzles_unlocked: 24 }, unlock_cost: 1 },
        { id: "sdp27", unlockable_if: { puzzles_unlocked: 25 }, unlock_cost: 1 },
        { id: "sdp28", unlockable_if: { puzzles_unlocked: 26 }, unlock_cost: 1 },
        {
          // Boardwalk (meta)
          id: "sdm01",
          is_meta: true,
          unlocked_if: {
            puzzles_unlocked: 5,
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
        },
        {
          // Jewelry Store (meta)
          id: "sdm02",
          is_meta: true,
          unlocked_if: {
            puzzles_unlocked: 5,
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
        },
        {
          // Casino (meta)
          id: "sdm03",
          slug: "the_casino",
          is_meta: true,
          unlocked_if: {
            puzzles_unlocked: 5,
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
        },
        {
          // Art Gallery (meta)
          id: "sdm04",
          is_meta: true,
          unlocked_if: {
            puzzles_unlocked: 5,
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
        },
        {
          id: "sdm05",
          is_meta: true,
          unlocked_if: {
            puzzles_unlocked: 2,
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
        { id: "sop01", unlockable_if: [], unlock_cost: 1 },
        { id: "sop02", unlockable_if: [], unlock_cost: 1 },
        { id: "sop03", unlockable_if: [], unlock_cost: 1 },
        { id: "sop04", unlockable_if: { puzzles_unlocked: 1 }, unlock_cost: 1 },
        { id: "sop05", unlockable_if: { puzzles_unlocked: 2 }, unlock_cost: 1 },
        { id: "sop06", unlockable_if: { puzzles_unlocked: 3 }, unlock_cost: 1 },
        { id: "sop07", unlockable_if: { puzzles_unlocked: 4 }, unlock_cost: 1 },
        { id: "sop08", unlockable_if: { puzzles_unlocked: 5 }, unlock_cost: 1 },
        { id: "sop09", unlockable_if: { puzzles_unlocked: 6 }, unlock_cost: 1 },
        { id: "sop10", unlockable_if: { puzzles_unlocked: 7 }, unlock_cost: 1 },
        { id: "sop11", unlockable_if: { puzzles_unlocked: 8 }, unlock_cost: 1 },
        { id: "sop12", unlockable_if: { puzzles_unlocked: 9 }, unlock_cost: 1 },
        { id: "sop13", unlockable_if: { puzzles_unlocked: 10 }, unlock_cost: 1 },
        { id: "sop14", unlockable_if: { puzzles_unlocked: 11 }, unlock_cost: 1 },
        { id: "sop15", unlockable_if: { puzzles_unlocked: 12 }, unlock_cost: 1 },
        { id: "sop16", unlockable_if: { puzzles_unlocked: 13 }, unlock_cost: 1 },
        { id: "sop17", unlockable_if: { puzzles_unlocked: 14 }, unlock_cost: 1 },
        { id: "sop18", unlockable_if: { puzzles_unlocked: 15 }, unlock_cost: 1 },
        { id: "sop19", unlockable_if: { puzzles_unlocked: 16 }, unlock_cost: 1 },
        { id: "sop20", unlockable_if: { puzzles_unlocked: 17 }, unlock_cost: 1 },
        { id: "sop21", unlockable_if: { puzzles_unlocked: 18 }, unlock_cost: 1 },
        { id: "sop22", unlockable_if: { puzzles_unlocked: 19 }, unlock_cost: 1 },
        { id: "sop23", unlockable_if: { puzzles_unlocked: 20 }, unlock_cost: 1 },
        { id: "sop24", unlockable_if: { puzzles_unlocked: 21 }, unlock_cost: 1 },
        { id: "sop25", unlockable_if: { puzzles_unlocked: 22 }, unlock_cost: 1 },
        { id: "sop26", unlockable_if: { puzzles_unlocked: 23 }, unlock_cost: 1 },
        { id: "sop27", unlockable_if: { puzzles_unlocked: 24 }, unlock_cost: 1 },
        { id: "sop28", unlockable_if: { puzzles_unlocked: 25 }, unlock_cost: 1 },
        { id: "sop29", unlockable_if: { puzzles_unlocked: 26 }, unlock_cost: 1 },
        { id: "sop30", unlockable_if: { puzzles_unlocked: 27 }, unlock_cost: 1 },
        { id: "sop31", unlockable_if: { puzzles_unlocked: 28 }, unlock_cost: 1 },
        { id: "sop32", unlockable_if: { puzzles_unlocked: 29 }, unlock_cost: 1 },
        { id: "sop33", unlockable_if: { puzzles_unlocked: 30 }, unlock_cost: 1 },
        { id: "sop34", unlockable_if: { puzzles_unlocked: 31 }, unlock_cost: 1 },
        { id: "sop35", unlockable_if: { puzzles_unlocked: 32 }, unlock_cost: 1 },
        { id: "sop36", unlockable_if: { puzzles_unlocked: 33 }, unlock_cost: 1 },
        { id: "sop37", unlockable_if: { puzzles_unlocked: 34 }, unlock_cost: 1 },
        { id: "sop38", unlockable_if: { puzzles_unlocked: 35 }, unlock_cost: 1 },
        { id: "sop39", unlockable_if: { puzzles_unlocked: 36 }, unlock_cost: 1 },
        { id: "sop40", unlockable_if: { puzzles_unlocked: 37 }, unlock_cost: 1 },
        { id: "sop41", unlockable_if: { puzzles_unlocked: 38 }, unlock_cost: 1 },
        { id: "sop42", unlockable_if: { puzzles_unlocked: 39 }, unlock_cost: 1 },
        { id: "som01", is_meta: true, unlocked_if: { puzzles_unlocked: 30 } }, // (meta)
      ],
      unlock_if: [
        { slot_solved: "sdm01" },
        { interaction_completed: "interview_at_the_boardwalk" },
      ],
    },
    {
      slug: "paper_trail",
      title: "Paper Trail",
      puzzles: [
        // 16 feeders, 8 metas, 1 super
        { id: "ptp01", unlockable_if: [], unlock_cost: 1 },
        { id: "ptp02", unlockable_if: [], unlock_cost: 1 },
        { id: "ptp03", unlockable_if: [], unlock_cost: 1 },
        { id: "ptp04", unlockable_if: { puzzles_unlocked: 1 }, unlock_cost: 1 },
        { id: "ptp05", unlockable_if: { puzzles_unlocked: 2 }, unlock_cost: 1 },
        { id: "ptp06", unlockable_if: { puzzles_unlocked: 3 }, unlock_cost: 1 },
        { id: "ptp07", unlockable_if: { puzzles_unlocked: 4 }, unlock_cost: 1 },
        { id: "ptp08", unlockable_if: { puzzles_unlocked: 5 }, unlock_cost: 1 },
        { id: "ptp09", unlockable_if: { puzzles_unlocked: 6 }, unlock_cost: 1 },
        { id: "ptp10", unlockable_if: { puzzles_unlocked: 7 }, unlock_cost: 1 },
        { id: "ptp11", unlockable_if: { puzzles_unlocked: 8 }, unlock_cost: 1 },
        { id: "ptp12", unlockable_if: { puzzles_unlocked: 9 }, unlock_cost: 1 },
        { id: "ptp13", unlockable_if: { puzzles_unlocked: 10 }, unlock_cost: 1 },
        { id: "ptp14", unlockable_if: { puzzles_unlocked: 11 }, unlock_cost: 1 },
        { id: "ptp15", unlockable_if: { puzzles_unlocked: 12 }, unlock_cost: 1 },
        { id: "ptp16", unlockable_if: { puzzles_unlocked: 13 }, unlock_cost: 1 },
        { id: "ptm01", is_meta: true, unlocked_if: { puzzles_unlocked: 10 } }, // meta 1
        { id: "ptm02", is_meta: true, unlocked_if: { puzzles_unlocked: 10 } }, // meta 2
        { id: "ptm03", is_meta: true, unlocked_if: { puzzles_unlocked: 10 } }, // meta 3
        { id: "ptm04", is_meta: true, unlocked_if: { puzzles_unlocked: 10 } }, // meta 4
        { id: "ptm05", is_meta: true, unlocked_if: { puzzles_unlocked: 10 } }, // meta 5
        { id: "ptm06", is_meta: true, unlocked_if: { puzzles_unlocked: 10 } }, // meta 6 dir: "profitable-trunk"
        { id: "ptm07", is_meta: true, unlocked_if: { puzzles_unlocked: 10 } }, // meta 7 dir: "green-princess"
        { id: "ptm08", is_meta: true, unlocked_if: { puzzles_unlocked: 10 } }, // meta 8 dir: "bountiful-maple"
        { id: "ptm09", is_meta: true, unlocked_if: { puzzles_unlocked: 10 } }, // supermeta
      ],
      unlock_if: [
        { slot_solved: "sdm02" },
        { interaction_completed: "interview_at_the_jewelry_store" },
      ],
    },
    {
      slug: "background_check",
      title: "Background Check",
      puzzles: [
        // TODO
      ],
      unlock_if: [
        { slot_solved: "sdm03" },
        { interaction_completed: "interview_at_the_casino" },
      ],
    },
    {
      slug: "illegal_search",
      title: "Illegal Search",
      puzzles: [
        // The first 5 puzzles are unlockable once they are discovered in the UI.
        { id: "isp01", unlockable_if: { gate_satisfied: "isg01" }, unlock_cost: 1 },
        { id: "isp02", unlockable_if: { gate_satisfied: "isg02" }, unlock_cost: 1 },
        { id: "isp03", unlockable_if: { gate_satisfied: "isg03" }, unlock_cost: 1 },
        { id: "isp04", unlockable_if: { gate_satisfied: "isg04" }, unlock_cost: 1 },
        { id: "isp05", unlockable_if: { gate_satisfied: "isg05" }, unlock_cost: 1 },
        // The next 5 puzzles are unlockable once they are discovered in the
        // UI, but will not be discoverable until the corresponding lock is
        // satisfied.
        { id: "isp06", unlockable_if: { gate_satisfied: "isg11" }, unlock_cost: 1 },
        { id: "isp07", unlockable_if: { gate_satisfied: "isg12" }, unlock_cost: 1 },
        { id: "isp08", unlockable_if: { gate_satisfied: "isg13" }, unlock_cost: 1 },
        { id: "isp09", unlockable_if: { gate_satisfied: "isg14" }, unlock_cost: 1 },
        { id: "isp10", unlockable_if: { gate_satisfied: "isg15" }, unlock_cost: 1 },

        // The next 8 puzzles are only discoverable once the first meta is
        // solved and they are discovered in the UI.
        { id: "isp11", unlockable_if: [{ gate_satisfied: "isg17" }, { slot_solved: "ism01" }], unlock_cost: 1 },
        { id: "isp12", unlockable_if: [{ gate_satisfied: "isg18" }, { slot_solved: "ism01" }], unlock_cost: 1 },
        { id: "isp13", unlockable_if: [{ gate_satisfied: "isg19" }, { slot_solved: "ism01" }], unlock_cost: 1 },
        { id: "isp14", unlockable_if: [{ gate_satisfied: "isg20" }, { slot_solved: "ism01" }], unlock_cost: 1 },
        { id: "isp15", unlockable_if: [{ gate_satisfied: "isg21" }, { slot_solved: "ism01" }], unlock_cost: 1 },
        { id: "isp16", unlockable_if: [{ gate_satisfied: "isg22" }, { slot_solved: "ism01" }], unlock_cost: 1 },
        { id: "isp17", unlockable_if: [{ gate_satisfied: "isg23" }, { slot_solved: "ism01" }], unlock_cost: 1 },
        { id: "isp18", unlockable_if: [{ gate_satisfied: "isg24" }, { slot_solved: "ism01" }], unlock_cost: 1 },

        { id: "ism01", is_meta: true, unlocked_if: [{ gate_satisfied: "isg00" }] }, // Bookcase
        { id: "ism02", is_meta: true, unlocked_if: [{ slot_solved: "ism01", answer_count: 1 }, { gate_satisfied: "isg16" }] },
      ],
      gates: [
        // Prototype; these particular gate assignments may not be final
        { id: "isg00" }, // examine the bookcase
        { id: "isg01" }, // find the first object in the first room
        { id: "isg02" }, // find the second object in the first room
        { id: "isg03" }, // find the third object in the first room
        { id: "isg04" }, // find the fourth object in the first room
        { id: "isg05" }, // find the last object in the first room
        { id: "isg06" }, // complete the directional lock
        { id: "isg07" }, // complete the binary switches
        { id: "isg08" }, // complete the combination lock
        { id: "isg09" }, // complete the numeric lock
        { id: "isg10" }, // complete the word lock
        { id: "isg11" }, // find the object behind the directional lock
        { id: "isg12" }, // find the object behind the binary switch lock
        { id: "isg13" }, // find the object behind the combination lock
        { id: "isg14" }, // find the object behind the numeric lock
        { id: "isg15" }, // find the object behind the word lock
        { id: "isg16" }, // find the star pattern in the second room
        { id: "isg17" }, // find the first object in the second room
        { id: "isg18" }, // find the second object in the second room
        { id: "isg19" }, // find the third object in the second room
        { id: "isg20" }, // find the fourth object in the second room
        { id: "isg21" }, // find the fifth object in the second room
        { id: "isg22" }, // find the sixth object in the second room
        { id: "isg23" }, // find the seventh object in the second room
        { id: "isg24" }, // find the eighth object in the second room
        { id: "isg25" }, // obtain the blacklight
      ],
      unlock_if: [
        { slot_solved: "sdm04" },
        { interaction_completed: "interview_at_the_art_gallery" },
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
      id: "interview_at_the_boardwalk",
      unlock_if: [{ slot_solved: "sdm01" }],
    },
    {
      id: "interview_at_the_jewelry_store",
      unlock_if: [{ slot_solved: "sdm02" }],
    },
    {
      id: "interview_at_the_casino",
      unlock_if: [{ slot_solved: "sdm03" }],
    },
    {
      id: "interview_at_the_art_gallery",
      unlock_if: [{ slot_solved: "sdm04" }],
    },
    {
      // The four interactions at the ends of each side investigation are live
      // interactions, not in-site interactions, but we might have
      // prerecorded video for remote solvers/folks missing at the time, so
      // they might need URLs anyway
      id: "meet_katrina",
      unlock_if: [
        { slot_solved: "som01" }, // stakeout meta
      ],
    },
    {
      id: "meet_gladys",
      unlock_if: [
        { slot_solved: "ptm09" }, // papertrail super
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
        { slot_solved: "ism01", answer_count: 2 },
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
