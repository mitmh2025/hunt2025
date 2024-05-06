// This is the canonical description of the structure of our hunt, with a full
// enumeration of rounds, puzzles, interactions, and the dependency structure.

// import Boardwalk from './dental-shark';
import Casino from "./fortunate-calf";
import Tinder from "./tinder";

import type { Hunt } from "./types";

const HUNT: Hunt = {
  rounds: [
    {
      key: "sd", // Shadow Diamond
      slug: "shadow_diamond", // mounted at root
      title: "The Shadow Diamond",
      puzzles: [
        // slots (28 feeders, 4 metas, 1 super)
        { id: "sdp01" },
        { id: "sdp02" },
        { id: "sdp03" },
        { id: "sdp04" },
        { id: "sdp05" },
        { id: "sdp06" },
        { id: "sdp07" },
        { id: "sdp08" },
        { id: "sdp09" },
        { id: "sdp10" },
        { id: "sdp11" },
        { id: "sdp12" },
        { id: "sdp13" },
        { id: "sdp14" },
        { id: "sdp15" },
        { id: "sdp16" },
        { id: "sdp17" },
        { id: "sdp18" },
        { id: "sdp19" },
        { id: "sdp20" },
        { id: "sdp21" },
        { id: "sdp22" },
        { id: "sdp23" },
        { id: "sdp24" },
        { id: "sdp25" },
        { id: "sdp26" },
        { id: "sdp27" },
        { id: "sdp28" },
        { id: "sdpfake", assignment: Tinder }, // Tinder, fake thing I'm doing to test integrating other build deps
        { id: "sdm01" }, // Boardwalk (meta)
        { id: "sdm02" }, // Jewelry Store (meta)
        { id: "sdm03", assignment: Casino }, // Casino (meta)
        { id: "sdm04" }, // Estate (meta)
        { id: "sdm05" }, // Where is the Diamond? (super)
      ],
      unlock_conditions: [
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
      key: "so", // Stakeout
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
      unlock_conditions: [
        { type: "puzzle_solved", id: "sdm01" },
        { type: "interaction_completed", id: "interview_the_longshoreman" },
      ],
    },
    {
      key: "pt", // Paper Trail
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
      unlock_conditions: [
        { type: "puzzle_solved", id: "sdm02" },
        { type: "interaction_completed", id: "interview_the_salesman" },
      ],
    },
    {
      key: "is", // Illegal Search
      slug: "illegal_search",
      title: "Illegal Search",
      puzzles: [
        // TODO
      ],
      unlock_conditions: [
        { type: "puzzle_solved", id: "sdm03" },
        { type: "interaction_completed", id: "interview_the_bookmaker" },
      ],
    },
    {
      key: "bg", // Background Check
      slug: "background_check",
      title: "Background Check",
      puzzles: [
        // TODO
      ],
      unlock_conditions: [
        { type: "puzzle_solved", id: "sdm04" },
        { type: "interaction_completed", id: "interview_the_valet" },
      ],
    },
    {
      key: "dt", // The Dead Thief
      slug: "the_dead_thief",
      title: "The Dead Thief",
      puzzles: [
        // TODO
      ],
      unlock_conditions: [
        { type: "interaction_completed", id: "meet_billie" },
        { type: "interaction_completed", id: "catch_the_thief" },
      ],
    },
    {
      key: "rd", // The Real Diamond
      slug: "the_real_diamond",
      title: "The Real Diamond",
      puzzles: [
        // TODO
      ],
      unlock_conditions: [
        { type: "interaction_completed", id: "meet_katrina" },
        { type: "interaction_completed", id: "meet_gladys" },
        { type: "interaction_completed", id: "meet_carter" },
        { type: "interaction_completed", id: "meet_papa" },
        { type: "interaction_completed", id: "unmask_the_killer" },
      ],
    },
  ],
  interactions: [
    {
      id: "meet_billie",
      unlock_conditions: [{ type: "puzzle_solved", id: "sdm05" }],
    },
    {
      id: "catch_the_thief",
      unlock_conditions: [{ type: "interaction_completed", id: "meet_billie" }],
    },
    {
      id: "interview_the_longshoreman",
      unlock_conditions: [{ type: "puzzle_solved", id: "sdm01" }],
    },
    {
      id: "interview_the_salesman",
      unlock_conditions: [{ type: "puzzle_solved", id: "sdm02" }],
    },
    {
      id: "interview_the_bookmaker",
      unlock_conditions: [{ type: "puzzle_solved", id: "sdm03" }],
    },
    {
      id: "interview_the_valet",
      unlock_conditions: [{ type: "puzzle_solved", id: "sdm04" }],
    },
    {
      id: "meet_katrina",
      unlock_conditions: [
        // TODO: solve stakeout super, once we know the puzzle id
      ],
    },
    {
      id: "meet_gladys",
      unlock_conditions: [
        // TODO: solve paper trail super, once we know the puzzle id
      ],
    },
    {
      id: "meet_carter",
      unlock_conditions: [
        // TODO: solve background check super, once we know the puzzle id
      ],
    },
    {
      id: "meet_papa",
      unlock_conditions: [
        // TODO: solve illegal search super, once we know the puzzle id
      ],
    },
    {
      id: "unmask_the_killer",
      unlock_conditions: [
        // TODO: solve unmask the killer (The Dead Thief supermeta), once we know the puzzle id
      ],
    },
    {
      id: "find_the_diamond",
      unlock_conditions: [
        { type: "interaction_completed", id: "meet_katrina" },
        { type: "interaction_completed", id: "meet_gladys" },
        { type: "interaction_completed", id: "meet_carter" },
        { type: "interaction_completed", id: "meet_papa" },
        { type: "interaction_completed", id: "unmask_the_killer" },
      ],
    },
  ],
};

export default HUNT;
