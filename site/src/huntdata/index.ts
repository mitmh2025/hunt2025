// This is the canonical description of the structure of our hunt, with a full
// enumeration of rounds, puzzles, interactions, and the dependency structure.
import { type Hunt, type PuzzleSlot } from "./types";

const BGCHECK_FEEDER_SLOTS = {
  the_mark: ["bgp01", "bgp04", "bgp05", "bgp07", "bgp14"], // The Rio Times
  the_grand_illusion: ["bgp03", "bgp06", "bgp09", "bgp11"], // Le Monde
  the_oversight: ["bgp02", "bgp08", "bgp10", "bgp12", "bgp13"], // The Egyptian Gazette
};

// In the background check round, metas become unlocked when all of the
// following conditions are met:
// * At least 7 feeders in the round are solved
// * At least 2 feeders associated with each meta are solved.
const BGCHECK_META_UNLOCK_CONDITION = [
  { puzzles_solved: 7 },
  { puzzles_solved: 2, slots: BGCHECK_FEEDER_SLOTS.the_mark },
  { puzzles_solved: 2, slots: BGCHECK_FEEDER_SLOTS.the_grand_illusion },
  { puzzles_solved: 2, slots: BGCHECK_FEEDER_SLOTS.the_oversight },
];

// prettier-ignore
const HUNT: Hunt = {
  rounds: [
    {
      slug: "the_missing_diamond", // mounted at root
      title: "The Missing Diamond",
      puzzles: [
        // slots (28 feeders, 4 metas, 1 super)
        // Start with 11 puzzles unlockable and 9 unlock currency.
        // Make 2 more puzzles unlockable after each solve.
        { id: "mdp01", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1 }, // unlockable by default
        { id: "mdp02", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "they_might_be_grad_students_but_theyve_got_your_number" },
        { id: "mdp03", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1 },
        { id: "mdp04", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "downright_backwards" },
        { id: "mdp05", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1 },
        { id: "mdp06", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "mastering_the_art_of_conch_frocking" },
        { id: "mdp07", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1 },
        { id: "mdp08", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "educational_rite_of_passage" },
        { id: "mdp09", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1 },
        { id: "mdp10", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1 },
        { id: "mdp11", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1 },
        { id: "mdp12", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1 },
        { id: "mdp13", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1 },
        { id: "mdp14", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1 },
        { id: "mdp15", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1 },
        { id: "mdp16", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1 },
        { id: "mdp17", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1 },
        { id: "mdp18", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1 },
        { id: "mdp19", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1 },
        { id: "mdp20", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1 },
        { id: "mdp21", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1 },
        { id: "mdp22", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1 },
        { id: "mdp23", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1 },
        { id: "mdp24", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1 },
        { id: "mdp25", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1 },
        { id: "mdp26", unlockable_if: { puzzles_solved: 8 }, unlock_cost: 1 },
        { id: "mdp27", unlockable_if: { puzzles_solved: 8 }, unlock_cost: 1 },
        { id: "mdp28", unlockable_if: { puzzles_solved: 9 }, unlock_cost: 1 },
        {
          // Boardwalk (meta)
          id: "mdm01",
          slug: "the_boardwalk",
          is_meta: true,
          unlocked_if: {
            // Unlocks when 5 of 6 feeders solved
            // TODO: correct specific slots
            puzzles_solved: 5,
            slots: [
              "mdp01",
              "mdp05",
              "mdp09",
              "mdp13",
              "mdp17",
              "mdp21",
            ],
          },
        },
        {
          // Jewelry Store (meta)
          id: "mdm02",
          slug: "the_jewelry_store",
          is_meta: true,
          unlocked_if: {
            // Unlocks when 5 of 7 feeders solved
            // TODO: correct specific slots
            puzzles_solved: 5,
            slots: [
              "mdp02",
              "mdp06",
              "mdp10",
              "mdp14",
              "mdp18",
              "mdp22",
              "mdp26",
            ],
          },
        },
        {
          // Casino (meta)
          id: "mdm03",
          slug: "the_casino",
          is_meta: true,
          unlocked_if: {
            // Unlocks when 5 of 7 feeders solved
            // TODO: correct specific slots
            puzzles_solved: 5,
            slots: [
              "mdp03",
              "mdp07",
              "mdp11",
              "mdp15",
              "mdp19",
              "mdp23",
              "mdp27",
            ],
          },
        },
        {
          // Art Gallery (meta)
          id: "mdm04",
          slug: "the_art_gallery",
          is_meta: true,
          unlocked_if: {
            // Unlocks when 5 of 8 feeders solved
            // TODO: correct specific slots
            puzzles_solved: 5,
            slots: [
              "mdp04",
              "mdp08",
              "mdp12",
              "mdp16",
              "mdp20",
              "mdp24",
              "mdp25",
              "mdp28",
            ],
          },
        },
        {
          // We want the super (which involves a live interaction with Billie and kicking off the
          // funaround) to become available only once the four metas are solved.  However, because
          // each meta solve unlocks a dialogue tree interaction, and we don't want to have new
          // content competing for solvers' attention, we schedule this meta to release once all
          // four dialogue-tree interactions are completed.  This also potentially gives us the
          // duration of the final dialogue tree interaction to gather any relevant actors for the
          // kickoff of the funaround.
          id: "mdm05",
          is_meta: true,
          unlocked_if: [
            { interaction_completed: "interview_at_the_boardwalk" },
            { interaction_completed: "interview_at_the_jewelry_store" },
            { interaction_completed: "interview_at_the_casino" },
            { interaction_completed: "interview_at_the_art_gallery" },
          ],
        }, // Where is the Diamond? (super)
      ],
      gates: [
        { id: "hunt_started" }, // Hunt started.  Nothing is unlocked until this gate is satisfied.
        { id: "mdg01" }, // Picked up Educational Rite of Passage from Gala
      ],
      interactions: [
        // These four interviews are the MATE-style in-site interactions which
        // become available after each of the four metas which open a side
        // investigation.  Each should become immediately available to teams upon
        // solving the corresponding metapuzzle.
        {
          id: "interview_at_the_boardwalk",
          unlock_if: [{ slot_solved: "mdm01" }],
        },
        {
          id: "interview_at_the_jewelry_store",
          unlock_if: [{ slot_solved: "mdm02" }],
        },
        {
          id: "interview_at_the_casino",
          unlock_if: [{ slot_solved: "mdm03" }],
        },
        {
          id: "interview_at_the_art_gallery",
          unlock_if: [{ slot_solved: "mdm04" }],
        },

        {
          // This is a brief in-person interaction which is expected to happen
          // after teams solve the Missing Diamond super but before they go on the
          // funaround.
          id: "meet_billie",
          unlock_if: [{ slot_solved: "mdm05" }],
        },
        {
          // This is a longer in-person interaction which is expected to happen
          // after teams complete the funaround.
          id: "catch_the_thief",
          unlock_if: [{ interaction_completed: "meet_billie" }],
        },
      ],
      unlock_if: [
        // These are the conditions for the /round/ page being visible.
        // The initial round should be open only once we mark the "hunt
        // started" gate as satisfied.
        { gate_satisfied: "hunt_started" },
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
        // Start with 5 unlockable, make 1.5 (rounding up) more unlockable after each solve.
        { id: "sop01", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1, slug: "an_exchange_of_vows" }, // TODO: this slug may not go in this spot
        { id: "sop02", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1, slug: "sing_like_a_canary" }, // TODO: this slug may not go in this spot
        { id: "sop03", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1, slug: "just_plane_wrong" }, // TODO: this slug may not go in this spot
        { id: "sop04", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1, slug: "broken_record" }, // TODO: this slug may not go in this spot
        { id: "sop05", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1, slug: "lab_scrabble" }, // TODO: this slug may not go in this spot
        { id: "sop06", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1, slug: "a_math_quiz" }, // TODO: this slug may not go in this spot
        { id: "sop07", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1, slug: "fight_night_at_mos" }, // TODO: this slug may not go in this spot
        { id: "sop08", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1, slug: "dear_diary" }, // TODO: this slug may not go in this spot
        { id: "sop09", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1, slug: "doable_double" }, // TODO: this slug may not go in this spot
        { id: "sop10", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1, slug: "the_ultimate_insult" }, // TODO: this slug may not go in this spot
        { id: "sop11", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1, slug: "cruciverbal" }, // TODO: this slug may not go in this spot
        { id: "sop12", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "commentary" },  // TODO: this slug may not go in this spot
        { id: "sop13", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "taste_explosion" }, // TODO: this slug may not go in this spot
        { id: "sop14", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1, slug: "temporal_investigations" }, // TODO: this slug may not go in this spot
        { id: "sop15", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1, slug: "some_assembly_required" }, // TODO: this slug may not go in this spot
        { id: "sop16", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1, slug: "be_mine" }, // TODO: this slug my not go in this spot
        { id: "sop17", unlockable_if: { puzzles_solved: 8 }, unlock_cost: 1, slug: "recipe_substitutions" }, // TODO: this slug my not go in this spot
        { id: "sop18", unlockable_if: { puzzles_solved: 9 }, unlock_cost: 1, slug: "big_names" }, // TODO: this slug my not go in this spot
        { id: "sop19", unlockable_if: { puzzles_solved: 9 }, unlock_cost: 1, slug: "seating_arrangements" }, // TODO: this slug my not go in this spot
        { id: "sop20", unlockable_if: { puzzles_solved: 10 }, unlock_cost: 1, slug: "magic_i" }, // TODO: this slug my not go in this spot
        { id: "sop21", unlockable_if: { puzzles_solved: 11 }, unlock_cost: 1, slug: "mystery_os" }, // TODO: this slug my not go in this spot
        { id: "sop22", unlockable_if: { puzzles_solved: 11 }, unlock_cost: 1, slug: "a_walk_in_the_park" }, // TODO: this slug my not go in this spot
        { id: "sop23", unlockable_if: { puzzles_solved: 12 }, unlock_cost: 1, slug: "mens_at_my_nose" }, // TODO: this slug my not go in this spot
        { id: "sop24", unlockable_if: { puzzles_solved: 13 }, unlock_cost: 1, slug: "mellow_planet" }, // TODO: this slug my not go in this spot
        { id: "sop25", unlockable_if: { puzzles_solved: 13 }, unlock_cost: 1, slug: "relief_printing" }, // TODO: this slug my not go in this spot
        { id: "sop26", unlockable_if: { puzzles_solved: 14 }, unlock_cost: 1, slug: "borderline_personality" }, // TODO: this slug my not go in this spot
        { id: "sop27", unlockable_if: { puzzles_solved: 15 }, unlock_cost: 1, slug: "why_kant_we_be_friends_too" }, // TODO: this slug my not go in this spot
        { id: "sop28", unlockable_if: { puzzles_solved: 15 }, unlock_cost: 1, slug: "a_badly_broken_quote" }, // TODO: this slug my not go in this spot
        { id: "sop29", unlockable_if: { puzzles_solved: 16 }, unlock_cost: 1, slug: "whose_song_is_it_anyway" }, // TODO: this slug my not go in this spot
        { id: "sop30", unlockable_if: { puzzles_solved: 17 }, unlock_cost: 1, slug: "a_recipe_for_success"} , // TODO: this slug my not go in this spot
        { id: "sop31", unlockable_if: { puzzles_solved: 17 }, unlock_cost: 1 },
        { id: "sop32", unlockable_if: { puzzles_solved: 18 }, unlock_cost: 1 },
        { id: "sop33", unlockable_if: { puzzles_solved: 19 }, unlock_cost: 1 },
        { id: "sop34", unlockable_if: { puzzles_solved: 19 }, unlock_cost: 1 },
        { id: "sop35", unlockable_if: { puzzles_solved: 20 }, unlock_cost: 1 },
        { id: "sop36", unlockable_if: { puzzles_solved: 21 }, unlock_cost: 1 },
        { id: "sop37", unlockable_if: { puzzles_solved: 21 }, unlock_cost: 1 },
        { id: "sop38", unlockable_if: { puzzles_solved: 22 }, unlock_cost: 1 },
        { id: "sop39", unlockable_if: { puzzles_solved: 23 }, unlock_cost: 1 },
        { id: "sop40", unlockable_if: { puzzles_solved: 23 }, unlock_cost: 1 },
        { id: "sop41", unlockable_if: { puzzles_solved: 24 }, unlock_cost: 1 },
        { id: "sop42", unlockable_if: { puzzles_solved: 25 }, unlock_cost: 1 },
        { id: "som01", is_meta: true, unlocked_if: { puzzles_solved: 34 } }, // (meta)
      ],
      gates: [
        { id: "sog01" }, // Picked up Mystery O's from Gala
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "meet_katrina",
          unlock_if: [
            { slot_solved: "som01" }, // stakeout meta
          ],
        },
      ],
      unlock_if: [
        { slot_solved: "mdm01" },
        { interaction_completed: "interview_at_the_boardwalk" },
      ],
    },
    {
      slug: "paper_trail",
      title: "Paper Trail",
      puzzles: [
        // 17 feeders, 8 metas, 1 super
        // Start with 5 unlockable, and make 1.5 (rounding up) more unlockable after each solve
        { id: "ptp01", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1, slug: "follow_the_rules" },
        { id: "ptp02", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1, slug: "youre_playing_it_wrong" },
        { id: "ptp03", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1, slug: "chemicals_are_sexy" },
        { id: "ptp04", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1, slug: "the_eras_puzzle" },
        { id: "ptp05", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1, slug: "a_weathered_note" },
        { id: "ptp06", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1 },
        { id: "ptp07", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1 },
        { id: "ptp08", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1 },
        { id: "ptp09", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1 },
        { id: "ptp10", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1 },
        { id: "ptp11", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1 },
        { id: "ptp12", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1 },
        { id: "ptp13", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1 },
        { id: "ptp14", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1 },
        { id: "ptp15", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1 },
        { id: "ptp16", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1 },
        { id: "ptp17", unlockable_if: { puzzles_solved: 8 }, unlock_cost: 1 },
        // Drop all 8 metas together once ~70% of the feeders are solved.
        { id: "ptm01", is_meta: true, unlocked_if: { puzzles_solved: 13 }, slug: "shell_corporation_1" }, // meta 1
        { id: "ptm02", is_meta: true, unlocked_if: { puzzles_solved: 13 }, slug: "shell_corporation_2" }, // meta 2
        { id: "ptm03", is_meta: true, unlocked_if: { puzzles_solved: 13 }, slug: "shell_corporation_3" }, // meta 3
        { id: "ptm04", is_meta: true, unlocked_if: { puzzles_solved: 13 }, slug: "shell_corporation_4" }, // meta 4
        { id: "ptm05", is_meta: true, unlocked_if: { puzzles_solved: 13 }, slug: "shell_corporation_5" }, // meta 5
        { id: "ptm06", is_meta: true, unlocked_if: { puzzles_solved: 13 }, slug: "shell_corporation_6" }, // meta 6
        { id: "ptm07", is_meta: true, unlocked_if: { puzzles_solved: 13 }, slug: "shell_corporation_7" }, // meta 7
        { id: "ptm08", is_meta: true, unlocked_if: { puzzles_solved: 13 }, slug: "shell_corporation_8" }, // meta 8
        {
          id: "ptm09", // supermeta
          is_meta: true,
          unlocked_if: {
            // Unlock only once all 8 shell corporation metas are solved.
            puzzles_solved: 8,
            slots: [
              "ptm01",
              "ptm02",
              "ptm03",
              "ptm04",
              "ptm05",
              "ptm06",
              "ptm07",
              "ptm08",
            ],
          },
          slug: "the_shell_game",
        },
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "meet_gladys",
          unlock_if: [
            { slot_solved: "ptm09" }, // papertrail super
          ],
        },
      ],
      unlock_if: [
        { slot_solved: "mdm02" },
        { interaction_completed: "interview_at_the_jewelry_store" },
      ],
    },
    {
      slug: "background_check",
      title: "Background Check",
      puzzles: [
        // 14 feeders, 3 metas, 1 super
        // Start with 5 unlockable.  Add 1.5 (rounding up) for each solve.
        { id: "bgp01", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1, slug: "the_10000_sheet_excel_file" },
        { id: "bgp02", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1, slug: "where_am_i" },
        { id: "bgp03", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1, slug: "knights_of_the_square_table" },
        { id: "bgp04", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1, slug: "deepfrost" },
        { id: "bgp05", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1 },
        { id: "bgp06", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1 },
        { id: "bgp07", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1 },
        { id: "bgp08", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1 },
        { id: "bgp09", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1 },
        { id: "bgp10", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1 },
        { id: "bgp11", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1 },
        { id: "bgp12", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1 },
        { id: "bgp13", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1 },
        { id: "bgp14", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1 },
        // Metas become unlocked when both of the following conditions are met:
        // * At least 7 feeders in the round are solved
        // * At least 2 feeders associated with each meta are solved.
        { id: "bgm01", is_meta: true, unlocked_if: BGCHECK_META_UNLOCK_CONDITION, slug: "the_mark" }, // meta 1
        { id: "bgm02", is_meta: true, unlocked_if: BGCHECK_META_UNLOCK_CONDITION, slug: "the_grand_illusion" }, // meta 2
        { id: "bgm03", is_meta: true, unlocked_if: BGCHECK_META_UNLOCK_CONDITION, slug: "the_oversight" }, // meta 3
        // Super unlocks once two metas are solved.
        { id: "bgm04", is_meta: true, unlocked_if: { puzzles_solved: 1, slots: ["bgm01", "bgm02", "bgm03"] } }, // supermeta
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "meet_carter",
          unlock_if: [
            { slot_solved: "bgm04" }, // background check super
          ],
        },
      ],
      unlock_if: [
        { slot_solved: "mdm03" },
        { interaction_completed: "interview_at_the_casino" },
      ],
    },
    {
      slug: "illegal_search",
      title: "Illegal Search",
      puzzles: [
        // The first 5 puzzles are unlockable once they are discovered in the UI.
        { id: "isp01", unlockable_if: { gate_satisfied: "isg01" }, unlock_cost: 1, slug: "kotei_no_ango" },
        { id: "isp02", unlockable_if: { gate_satisfied: "isg02" }, unlock_cost: 1, slug: "cross_spread" },
        { id: "isp03", unlockable_if: { gate_satisfied: "isg03" }, unlock_cost: 1 },
        { id: "isp04", unlockable_if: { gate_satisfied: "isg04" }, unlock_cost: 1, slug: "this_is_just_a_test" },
        { id: "isp05", unlockable_if: { gate_satisfied: "isg05" }, unlock_cost: 1, slug: "networking_event" },
        // The next 5 puzzles are unlockable once they are discovered in the
        // UI, but will not be discoverable until the corresponding lock is
        // satisfied.
        { id: "isp06", unlockable_if: { gate_satisfied: "isg11" }, unlock_cost: 1, slug: "bermuda_triangle" },
        { id: "isp07", unlockable_if: { gate_satisfied: "isg12" }, unlock_cost: 1, slug: "fechtbuch" },
        { id: "isp08", unlockable_if: { gate_satisfied: "isg13" }, unlock_cost: 1, slug: "a_heap_of_clards" },
        { id: "isp09", unlockable_if: { gate_satisfied: "isg14" }, unlock_cost: 1, slug: "the_center_is_in_plain_sight" },
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
        { id: "ism02", is_meta: true, unlocked_if: [{ slot_solved: "ism01" }, { gate_satisfied: "isg16" }] },
        { id: "ism03", is_meta: true, unlocked_if: [{ slot_solved: "ism02" }, { gate_satisfied: "isg26" }] },
      ],
      gates: [
        // Prototype; these particular gate assignments may not be final
        { id: "isg00", title: "Examined the bookcase" }, // examine the bookcase (meta)
        { id: "isg01" }, // find the first object in the first room (great wave painting)
        { id: "isg02" }, // find the second object in the first room (globe)
        { id: "isg03" }, // find the third object in the first room (family portrait)
        { id: "isg04" }, // find the fourth object in the first room (typewriter)
        { id: "isg05" }, // find the last object in the first room (desk lamp)
        { id: "isg06", title: "Unlocked the desk drawer" }, // complete the directional lock (desk drawer)
        { id: "isg07", title: "Unlocked the breaker box" }, // complete the binary switches (fuse box)
        { id: "isg08", title: "Unlocked the safe" }, // complete the combination lock (safe)
        { id: "isg09", title: "Unlocked the numeric lock" }, // complete the numeric lock (rug)
        { id: "isg10", title: "Unlocked the cryptex" }, // complete the word lock (cryptex)
        { id: "isg11" }, // find the object behind the directional lock
        { id: "isg12" }, // find the object behind the binary switch lock
        { id: "isg13" }, // find the object behind the combination lock
        { id: "isg14" }, // find the object behind the numeric lock
        { id: "isg15" }, // find the object behind the word lock
        { id: "isg16", title: "Unlocked the secret room via Papa’s bookcase" }, // complete the bookcase/unlock door in wall
        { id: "isg17" }, // find the star pattern in the second room (meta)
        { id: "isg18" }, // find the first object in the second room (birth certificate)
        { id: "isg19" }, // find the second object in the second room (newspaper clipping)
        { id: "isg20" }, // find the third object in the second room (letter from prison warden)
        { id: "isg21" }, // find the fourth object in the second room (photo of the Candys and Baby)
        { id: "isg22" }, // find the fifth object in the second room (photo of Papa, wife, and Gladys)
        { id: "isg23" }, // find the sixth object in the second room (rare stamp)
        { id: "isg24" }, // find the seventh object in the second room (Gladys' teddy bear)
        { id: "isg25" }, // find the eighth object in the second room (radio drama poster)
        { id: "isg26", title: "Obtained the blacklight" }, // obtain the blacklight
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "meet_papa",
          unlock_if: [
            { slot_solved: "ism03" },
          ],
        },
      ],
      unlock_if: [
        { slot_solved: "mdm04" },
        { interaction_completed: "interview_at_the_art_gallery" },
      ],
    },
    {
      slug: "murder_in_mitropolis",
      title: "Murder in MITropolis",
      puzzles: [
        // 24 feeders + 1 meta
        { id: "tmp01", unlockable_if: { round_unlocked: "murder_in_mitropolis" }, unlock_cost: 1, slug: "do_the_packing" },
        { id: "tmp02", unlockable_if: { round_unlocked: "murder_in_mitropolis" }, unlock_cost: 1 },
        { id: "tmp03", unlockable_if: { round_unlocked: "murder_in_mitropolis" }, unlock_cost: 1 },
        { id: "tmp04", unlockable_if: { round_unlocked: "murder_in_mitropolis" }, unlock_cost: 1, slug: "what_do_they_call_you" },
        { id: "tmp05", unlockable_if: { round_unlocked: "murder_in_mitropolis" }, unlock_cost: 1 },
        { id: "tmp06", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1 },
        { id: "tmp07", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1 },
        { id: "tmp08", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1 },
        { id: "tmp09", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1 },
        { id: "tmp10", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1 },
        { id: "tmp11", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1 },
        { id: "tmp12", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1 },
        { id: "tmp13", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1 },
        { id: "tmp14", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1 },
        { id: "tmp15", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1 },
        { id: "tmp16", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1 },
        { id: "tmp17", unlockable_if: { puzzles_solved: 8 }, unlock_cost: 1 },
        { id: "tmp18", unlockable_if: { puzzles_solved: 9 }, unlock_cost: 1 },
        { id: "tmp19", unlockable_if: { puzzles_solved: 9 }, unlock_cost: 1 },
        { id: "tmp20", unlockable_if: { puzzles_solved: 10 }, unlock_cost: 1 },
        { id: "tmp21", unlockable_if: { puzzles_solved: 11 }, unlock_cost: 1 },
        { id: "tmp22", unlockable_if: { puzzles_solved: 11 }, unlock_cost: 1 },
        { id: "tmp23", unlockable_if: { puzzles_solved: 12 }, unlock_cost: 1 },
        { id: "tmp24", unlockable_if: { puzzles_solved: 13 }, unlock_cost: 1 },
        { id: "tmm01", is_meta: true, unlocked_if: { puzzles_solved: 16 } },
      ],
      interactions: [
        {
          id: "unmask_the_killer",
          unlock_if: [
            { slot_solved: "tmm01" }, // The Murder supermeta
          ],
        },
      ],
      unlock_if: [
        { interaction_completed: "meet_billie" },
        { interaction_completed: "catch_the_thief" },
      ],
    },
    {
      slug: "the_vault",
      title: "The Vault",
      puzzles: [
        // TODO: single piece of endgame?
      ],
      interactions: [
        {
          id: "the_vault",
          unlock_if: [
            { interaction_completed: "meet_katrina" },
            { interaction_completed: "meet_gladys" },
            { interaction_completed: "meet_carter" },
            { interaction_completed: "meet_papa" },
            { interaction_completed: "unmask_the_killer" },
          ],
        },
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
};

export type SlotLookup = {
  roundSlug: string;
  slot: PuzzleSlot;
};

// For quickly looking up where a particular slug is used in HUNT.
export function generateSlugToSlotMap(hunt: Hunt): Map<string, SlotLookup> {
  const slugToSlot = new Map<string, SlotLookup>();
  hunt.rounds.forEach((round) => {
    round.puzzles.forEach((slot) => {
      const slug = slot.slug ?? slot.id;
      const existing = slugToSlot.get(slug);
      if (existing) {
        throw new Error(
          `puzzle slug ${slug} used in both slot ${existing.slot.id} and ${slot.id}`,
        );
      }
      slugToSlot.set(slug, { roundSlug: round.slug, slot });
    });
  });
  return slugToSlot;
}

export default HUNT;
