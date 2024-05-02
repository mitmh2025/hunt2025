// This is the canonical description of the structure of our hunt, with a full
// enumeration of rounds, puzzles, interactions, and the dependency structure.

// import Boardwalk from './dental-shark';
import Casino from './fortunate-calf';
import type { Hunt } from './types';

const HUNT: Hunt = {
  rounds: [
    {
      key: "sd", // Shadow Diamond
      slug: "shadow_diamond", // mounted at root
      title: "The Shadow Diamond",
      puzzles: [ // slots
        { id: "sdp1" },
        { id: "sdp2" },
        // ...
        // TODO add additional feeders here
        // ...
        { id: "sdm1" }, // Boardwalk
        { id: "sdm2" }, // Jewelry Store
        { id: "sdm3", assignment: Casino }, // Casino
        { id: "sdm4" }, // Estate
        { id: "sdm5" }, // Where is the Diamond?
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
        // TODO add stub puzzle slots once we know how many there are
      ],
      unlock_conditions: [
        { type: "puzzle_solved", id: "sdm1" },
        { type: "interaction_completed", id: "interview_the_longshoreman" },
      ],
    },
    {
      key: "pt", // Paper Trail
      slug: "paper_trail",
      title: "Paper Trail",
      puzzles: [
        // TODO: feeders
        { id: "ptm1" }, // meta 1
        { id: "ptm2" }, // meta 2
        { id: "ptm3" }, // meta 3
        { id: "ptm4" }, // meta 4
        { id: "ptm5" }, // meta 5
        { id: "ptm6" }, // meta 6 dir: "profitable-trunk"
        { id: "ptm7" }, // meta 7 dir: "green-princess"
        { id: "ptm8" }, // meta 8 dir: "bountiful-maple"
      ],
      unlock_conditions: [
        { type: "puzzle_solved", id: "sdm2" },
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
        { type: "puzzle_solved", id: "sdm3" },
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
        { type: "puzzle_solved", id: "sdm4" },
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
      unlock_conditions: [
        { type: "puzzle_solved", id: "sdm5" },
      ],
    },
    {
      id: "catch_the_thief",
      unlock_conditions: [
        { type: "interaction_completed", id: "meet_billie" },
      ],
    },
    {
      id: "interview_the_longshoreman",
      unlock_conditions: [
        { type: "puzzle_solved", id: "sdm1" },
      ],
    },
    {
      id: "interview_the_salesman",
      unlock_conditions: [
        { type: "puzzle_solved", id: "sdm2" },
      ],
    },
    {
      id: "interview_the_bookmaker",
      unlock_conditions: [
        { type: "puzzle_solved", id: "sdm3" },
      ],
    },
    {
      id: "interview_the_valet",
      unlock_conditions: [
        { type: "puzzle_solved", id: "sdm4" },
      ],
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
