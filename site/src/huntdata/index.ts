// This is the canonical description of the structure of our hunt, with a full
// enumeration of rounds, puzzles, interactions, and the dependency structure.
import archiveMode from "../frontend/utils/archiveMode";
import { type Gate, type Hunt, type PuzzleSlot, type Round } from "./types";

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
      slug: "missing_diamond", // mounted at root
      title: "The Missing Diamond",
      final_puzzle_slot: "mdm05",
      puzzles: [
        // slots (28 feeders, 4 metas, 1 super)
        // Start with 11 puzzles unlockable and 9 unlock currency.
        // Make 2 more puzzles unlockable after each solve.
        // The slot order is availability order.
        // The round's presentation layer handles mapping slots to witnesses.
        {
          id: "mdp01",
          unlockable_if: { round_unlocked: "missing_diamond" },
          unlock_cost: 1,
          slug: "unreal_islands",
        }, // unlockable by default
        {
          id: "mdp02",
          unlockable_if: { round_unlocked: "missing_diamond" },
          unlock_cost: 1,
          slug: "educational_rite_of_passage",
        },
        {
          id: "mdp03",
          unlockable_if: { round_unlocked: "missing_diamond" },
          unlock_cost: 1,
          slug: "songs_on_the_radio",
        },
        {
          id: "mdp04",
          unlockable_if: { round_unlocked: "missing_diamond" },
          unlock_cost: 1,
          slug: "downright_backwards",
        },
        {
          id: "mdp05",
          unlockable_if: { round_unlocked: "missing_diamond" },
          unlock_cost: 1,
          slug: "chatgpt",
        },
        {
          id: "mdp06",
          unlockable_if: { round_unlocked: "missing_diamond" },
          unlock_cost: 1,
          slug: "zulu_lima",
        },
        {
          id: "mdp07",
          unlockable_if: { round_unlocked: "missing_diamond" },
          unlock_cost: 1,
          slug: "press_play",
        },
        {
          id: "mdp08",
          unlockable_if: { round_unlocked: "missing_diamond" },
          unlock_cost: 1,
          slug: "shrinkage",
        },
        {
          id: "mdp09",
          unlockable_if: { round_unlocked: "missing_diamond" },
          unlock_cost: 1,
          slug: "missing_connections",
        },
        {
          id: "mdp10",
          unlockable_if: { round_unlocked: "missing_diamond" },
          unlock_cost: 1,
          slug: "xoxo",
        },
        {
          id: "mdp11",
          unlockable_if: { round_unlocked: "missing_diamond" },
          unlock_cost: 1,
          slug: "an_argument",
        },
        {
          id: "mdp12",
          unlockable_if: { puzzles_solved: 1 },
          unlock_cost: 1,
          slug: "📑🍝",
        },
        {
          id: "mdp13",
          unlockable_if: { puzzles_solved: 1 },
          unlock_cost: 1,
          slug: "mitropolitan_house_of_fashion",
        },
        {
          id: "mdp14",
          unlockable_if: { puzzles_solved: 2 },
          unlock_cost: 1,
          slug: "on_the_corner",
        },
        {
          id: "mdp15",
          unlockable_if: { puzzles_solved: 2 },
          unlock_cost: 1,
          slug: "drunkens_and_flagons",
        },
        {
          id: "mdp16",
          unlockable_if: { puzzles_solved: 3 },
          unlock_cost: 1,
          slug: "battle_factory",
        },
        {
          id: "mdp17",
          unlockable_if: { puzzles_solved: 3 },
          unlock_cost: 1,
          slug: "synthetic_tagsonomy",
        },
        {
          id: "mdp18",
          unlockable_if: { puzzles_solved: 4 },
          unlock_cost: 1,
          slug: "no_notes",
        },
        {
          id: "mdp19",
          unlockable_if: { puzzles_solved: 4 },
          unlock_cost: 1,
          slug: "🔎🧊",
        },
        {
          id: "mdp20",
          unlockable_if: { puzzles_solved: 5 },
          unlock_cost: 1,
          slug: "introduction_to_decryption",
        },
        {
          id: "mdp21",
          unlockable_if: { puzzles_solved: 5 },
          unlock_cost: 1,
          slug: "neatly_drawn",
        },
        {
          id: "mdp22",
          unlockable_if: { puzzles_solved: 6 },
          unlock_cost: 1,
          slug: "dropping_the_ball",
        },
        {
          id: "mdp23",
          unlockable_if: { puzzles_solved: 6 },
          unlock_cost: 1,
          slug: "mastering_the_art_of_conch_frocking",
        },
        {
          id: "mdp24",
          unlockable_if: { puzzles_solved: 7 },
          unlock_cost: 1,
          slug: "in_a_different_direction",
        },
        {
          id: "mdp25",
          unlockable_if: { puzzles_solved: 7 },
          unlock_cost: 1,
          slug: "check_a_deez_words_out",
        },
        {
          id: "mdp26",
          unlockable_if: { puzzles_solved: 8 },
          unlock_cost: 1,
          slug: "be_kind_rewind",
        },
        {
          id: "mdp27",
          unlockable_if: { puzzles_solved: 8 },
          unlock_cost: 1,
          slug: "they_might_be_grad_students_but_theyve_got_your_number",
        },
        {
          id: "mdp28",
          unlockable_if: { puzzles_solved: 9 },
          unlock_cost: 1,
          slug: "zing_it_again",
        },
        {
          // Boardwalk (meta)
          id: "mdm01",
          slug: "the_boardwalk",
          is_meta: true,
          unlocked_if: {
            // Unlocks when 5 of 6 feeders solved
            // TODO: correct specific slots
            puzzles_solved: 5,
            slots: ["mdp08", "mdp09", "mdp10", "mdp20", "mdp22", "mdp28"],
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
              "mdp05",
              "mdp11",
              "mdp12",
              "mdp13",
              "mdp19",
              "mdp23",
              "mdp27",
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
              "mdp06",
              "mdp07",
              "mdp15",
              "mdp16",
              "mdp17",
              "mdp18",
              "mdp26",
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
              "mdp01",
              "mdp02",
              "mdp03",
              "mdp04",
              "mdp14",
              "mdp21",
              "mdp24",
              "mdp25",
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
          is_supermeta: true,
          unlocked_if: [
            { interaction_completed: "interview_at_the_boardwalk" },
            { interaction_completed: "interview_at_the_jewelry_store" },
            { interaction_completed: "interview_at_the_casino" },
            { interaction_completed: "interview_at_the_art_gallery" },
          ],
          slug: "the_thief",
        }, // Where is the Diamond? (super)
      ],
      gates: [
        { id: "hunt_started", internal_description: "Hunt Started" }, // Nothing is unlocked until this gate is satisfied.
        {
          id: "hunt_closed",
          internal_description:
            "Hunt has ended, and we are shutting down the radio streams",
        },
        {
          id: "solutions_released",
          internal_description: "Release all solutions.",
        },
        {
          id: "mdg01",
          internal_description:
            "Picked up Educational Rite of Passage from Gala",
        },
        {
          id: "mdg02",
          internal_description: "Picked up Synthetic Tagsonomy from Gala",
        },
        {
          id: "mdg03",
          internal_description: "📑🍝: Assigned Rickroll copypasta",
        },
        {
          id: "mdg04",
          internal_description: "📑🍝: Assigned Eat Hot Chip and Lie copypasta",
        },
        {
          id: "mdg05",
          internal_description: "📑🍝: Assigned The Bee Movie copypasta",
        },
        {
          id: "mdg06",
          internal_description: "📑🍝: Assigned IQ Rick and Morty copypasta",
        },
        {
          id: "mdg07",
          internal_description: "📑🍝: Assigned Nick Castellanos copypasta",
        },
        {
          id: "mdg08",
          internal_description: "📑🍝: Assigned Mesothelioma copypasta",
        },
        {
          id: "mdg09",
          internal_description: "📑🍝: Assigned Navy SEAL copypasta",
        },
        { id: "mdg10", internal_description: "📑🍝: Assigned Spork copypasta" },
        {
          id: "mdg11",
          internal_description: "📑🍝: Assigned But Who Was Phone copypasta",
        },
        {
          id: "mdg12",
          internal_description: "The Thief: Manually release funaround video",
        },
        {
          id: "mdg13",
          internal_description:
            "The Thief: Completed funaround kickoff with bartender",
        },
      ],
      interactions: [
        // These four interviews are the MATE-style in-site interactions which
        // become available after each of the four metas which open a side
        // investigation.  Each should become immediately available to teams upon
        // solving the corresponding metapuzzle.
        {
          id: "interview_at_the_boardwalk",
          title: "Interview at the Boardwalk",
          unlock_if: [{ slot_solved: "mdm01" }],
          virtual: true,
        },
        {
          id: "interview_at_the_jewelry_store",
          title: "Interview at the Jewelry Store",
          unlock_if: [{ slot_solved: "mdm02" }],
          virtual: true,
        },
        {
          id: "interview_at_the_casino",
          title: "Interview at the Casino",
          unlock_if: [{ slot_solved: "mdm03" }],
          virtual: true,
        },
        {
          id: "interview_at_the_art_gallery",
          title: "Interview at the Art Gallery",
          unlock_if: [{ slot_solved: "mdm04" }],
          virtual: true,
        },

        {
          // This is a longer in-person interaction which is expected to happen
          // after teams complete the funaround and solve the super.
          id: "the_crime_scene",
          title: "The Crime Scene",
          unlock_if: [{ slot_solved: "mdm05" }],
          virtual: false,
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
      title: "The Stakeout",
      final_puzzle_slot: "som01",
      puzzles: [
        // 42 feeders, 1 meta
        // Start with 5 unlockable, make 1.5 (rounding up) more unlockable after each solve.
        {
          id: "sop01",
          unlockable_if: { round_unlocked: "stakeout" },
          unlock_cost: 1,
          slug: "anything_is_popsicle",
        },
        {
          id: "sop02",
          unlockable_if: { round_unlocked: "stakeout" },
          unlock_cost: 1,
          slug: "the_ultimate_insult",
        },
        {
          id: "sop03",
          unlockable_if: { round_unlocked: "stakeout" },
          unlock_cost: 1,
          slug: "broken_record",
        },
        {
          id: "sop04",
          unlockable_if: { round_unlocked: "stakeout" },
          unlock_cost: 1,
          slug: "relief_printing",
        },
        {
          id: "sop05",
          unlockable_if: { round_unlocked: "stakeout" },
          unlock_cost: 1,
          slug: "mellow_planet",
        },
        {
          id: "sop06",
          unlockable_if: { puzzles_solved: 1 },
          unlock_cost: 1,
          slug: "just_plane_wrong",
        },
        {
          id: "sop07",
          unlockable_if: { puzzles_solved: 1 },
          unlock_cost: 1,
          slug: "recipe_substitutions",
        },
        {
          id: "sop08",
          unlockable_if: { puzzles_solved: 2 },
          unlock_cost: 1,
          slug: "superlatives",
        },
        {
          id: "sop09",
          unlockable_if: { puzzles_solved: 3 },
          unlock_cost: 1,
          slug: "an_exchange_of_vows",
        },
        {
          id: "sop10",
          unlockable_if: { puzzles_solved: 3 },
          unlock_cost: 1,
          slug: "word_yore",
        },
        {
          id: "sop11",
          unlockable_if: { puzzles_solved: 4 },
          unlock_cost: 1,
          slug: "temporal_investigations",
        },
        {
          id: "sop12",
          unlockable_if: { puzzles_solved: 5 },
          unlock_cost: 1,
          slug: "a_recipe_for_success",
        },
        {
          id: "sop13",
          unlockable_if: { puzzles_solved: 5 },
          unlock_cost: 1,
          slug: "a_math_quiz",
        },
        {
          id: "sop14",
          unlockable_if: { puzzles_solved: 6 },
          unlock_cost: 1,
          slug: "sing_like_a_canary",
        },
        {
          id: "sop15",
          unlockable_if: { puzzles_solved: 7 },
          unlock_cost: 1,
          slug: "mystery_os",
        },
        {
          id: "sop16",
          unlockable_if: { puzzles_solved: 7 },
          unlock_cost: 1,
          slug: "a_walk_in_the_park",
        },
        {
          id: "sop17",
          unlockable_if: { puzzles_solved: 8 },
          unlock_cost: 1,
          slug: "borderline_personality",
        },
        {
          id: "sop18",
          unlockable_if: { puzzles_solved: 9 },
          unlock_cost: 1,
          slug: "a_sudoku",
        },
        {
          id: "sop19",
          unlockable_if: { puzzles_solved: 9 },
          unlock_cost: 1,
          slug: "be_mine",
        },
        {
          id: "sop20",
          unlockable_if: { puzzles_solved: 10 },
          unlock_cost: 1,
          slug: "lab_scrabble",
        },
        {
          id: "sop21",
          unlockable_if: { puzzles_solved: 11 },
          unlock_cost: 1,
          slug: "cruciverbal",
        },
        {
          id: "sop22",
          unlockable_if: { puzzles_solved: 11 },
          unlock_cost: 1,
          slug: "why_kant_we_be_friends_too",
        },
        {
          id: "sop23",
          unlockable_if: { puzzles_solved: 12 },
          unlock_cost: 1,
          slug: "whose_song_is_it_anyway",
        },
        {
          id: "sop24",
          unlockable_if: { puzzles_solved: 13 },
          unlock_cost: 1,
          slug: "some_assembly_required",
        },
        {
          id: "sop25",
          unlockable_if: { puzzles_solved: 13 },
          unlock_cost: 1,
          slug: "fight_night_at_mos",
        },
        {
          id: "sop26",
          unlockable_if: { puzzles_solved: 14 },
          unlock_cost: 1,
          slug: "how_i_earned_my_gold_star",
        },
        {
          id: "sop27",
          unlockable_if: { puzzles_solved: 15 },
          unlock_cost: 1,
          slug: "big_names",
        },
        {
          id: "sop28",
          unlockable_if: { puzzles_solved: 15 },
          unlock_cost: 1,
          slug: "doable_double",
        },
        {
          id: "sop29",
          unlockable_if: { puzzles_solved: 16 },
          unlock_cost: 1,
          slug: "taste_explosion",
        },
        {
          id: "sop30",
          unlocked_if: { oneOf: [] }, // Only manual release
          prize: 0,
          slug: "art_history",
        },
        {
          id: "sop31",
          unlockable_if: { puzzles_solved: 17 },
          unlock_cost: 1,
          slug: "magic_i",
        },
        {
          id: "sop32",
          unlockable_if: { puzzles_solved: 18 },
          unlock_cost: 1,
          slug: "a_badly_broken_quote",
        },
        {
          id: "sop33",
          unlockable_if: { puzzles_solved: 19 },
          unlock_cost: 1,
          slug: "charged",
        },
        {
          id: "sop34",
          unlockable_if: { puzzles_solved: 19 },
          unlock_cost: 1,
          slug: "commentary",
        },
        {
          id: "sop35",
          unlockable_if: { puzzles_solved: 20 },
          unlock_cost: 1,
          slug: "seating_arrangements",
        },
        {
          id: "sop36",
          unlockable_if: { puzzles_solved: 21 },
          unlock_cost: 1,
          slug: "editors_solemnity",
        },
        {
          id: "sop37",
          unlocked_if: { oneOf: [] }, // Only manual unlocks by operators
          prize: 0,
          slug: "control_room",
        },
        {
          id: "sop38",
          unlockable_if: { puzzles_solved: 22 },
          unlock_cost: 1,
          slug: "read_between_the_lines",
        },
        {
          id: "sop39",
          unlockable_if: { puzzles_solved: 23 },
          unlock_cost: 1,
          slug: "just_fing_behave",
        },
        {
          id: "sop40",
          unlockable_if: { puzzles_solved: 23 },
          unlock_cost: 1,
          slug: "its_not_clear",
        },
        {
          id: "sop41",
          unlockable_if: { puzzles_solved: 24 },
          unlock_cost: 1,
          slug: "mens_at_my_nose",
        },
        {
          id: "sop42",
          unlockable_if: { puzzles_solved: 25 },
          unlock_cost: 1,
          slug: "dear_diary",
        },
        {
          id: "som01",
          is_meta: true,
          is_supermeta: true,
          unlocked_if: { puzzles_solved: 34 },
          slug: "chinatown",
        },
      ],
      gates: [
        {
          id: "sog01",
          internal_description: "Picked up Mystery O’s from Gala",
        },
        {
          id: "sog02",
          internal_description: "Picked up It's Not Clear from Gala",
        },
        {
          id: "sog03",
          internal_description: "Picked up Anything Is Popsicle from Gala",
        },
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "confront_katrina",
          title: "Confront Katrina",
          unlock_if: [
            { slot_solved: "som01" }, // stakeout meta
          ],
          virtual: false,
        },
      ],
      unlock_if: [
        { slot_solved: "mdm01" },
        { interaction_completed: "interview_at_the_boardwalk" },
      ],
    },
    {
      slug: "paper_trail",
      title: "The Paper Trail",
      final_puzzle_slot: "ptm09",
      puzzles: [
        // 17 feeders, 8 metas, 1 super
        // Start with 5 unlockable, and make 1.5 (rounding up) more unlockable after each solve
        {
          id: "ptp01",
          unlockable_if: { round_unlocked: "paper_trail" },
          unlock_cost: 1,
          slug: "eponymous_forensic_accountant",
        },
        {
          id: "ptp02",
          unlockable_if: { round_unlocked: "paper_trail" },
          unlock_cost: 1,
          slug: "incognito",
        },
        {
          id: "ptp03",
          unlocked_if: {
            oneOf: [
              { gate_satisfied: "ptg09" },
              { gate_satisfied: "ptg10" },
              { gate_satisfied: "ptg11" },
              { gate_satisfied: "ptg12" },
              { gate_satisfied: "ptg13" },
              // As a special case for the archives, if the solve is for Songs on the
              // Radio, unlock And Now a Puzzling Word (since we don't have the radio
              // stream)
              ...(archiveMode ? [{ slot_solved: "mdp03" }] : []),
            ],
          },
          prize: 0,
          slug: "and_now_a_puzzling_word_from_our_sponsors",
        },
        {
          id: "ptp04",
          unlockable_if: { round_unlocked: "paper_trail" },
          unlock_cost: 1,
          slug: "chemicals_are_sexy",
        },
        {
          id: "ptp05",
          unlockable_if: { round_unlocked: "paper_trail" },
          unlock_cost: 1,
          slug: "do_the_manual_calculations_dont_try_monte_carlo",
        },
        {
          id: "ptp06",
          unlockable_if: { puzzles_solved: 1 },
          unlock_cost: 1,
          slug: "worlds_largest_crossword_puzzle",
        },
        {
          id: "ptp07",
          unlockable_if: { puzzles_solved: 1 },
          unlock_cost: 1,
          slug: "maze_of_lies",
        },
        {
          id: "ptp08",
          unlockable_if: { puzzles_solved: 2 },
          unlock_cost: 1,
          slug: "any_coat_will_do",
        },
        {
          id: "ptp09",
          unlockable_if: { puzzles_solved: 3 },
          unlock_cost: 1,
          slug: "the_eras_puzzle",
        },
        {
          id: "ptp10",
          unlockable_if: { puzzles_solved: 3 },
          unlock_cost: 1,
          slug: "a_weathered_note",
        },
        {
          id: "ptp11",
          unlockable_if: { puzzles_solved: 4 },
          unlock_cost: 1,
          slug: "follow_the_rules",
        },
        {
          id: "ptp12",
          unlockable_if: { puzzles_solved: 5 },
          unlock_cost: 1,
          slug: "star_crossed",
        },
        {
          id: "ptp13",
          unlockable_if: { puzzles_solved: 5 },
          unlock_cost: 1,
          slug: "ಕಾಬವದೋೀ್",
        },
        {
          id: "ptp14",
          unlockable_if: { puzzles_solved: 6 },
          unlock_cost: 1,
          slug: "youre_playing_it_wrong",
        },
        {
          id: "ptp15",
          unlockable_if: { puzzles_solved: 7 },
          unlock_cost: 1,
          slug: "bar_talk",
        },
        {
          id: "ptp16",
          unlockable_if: { puzzles_solved: 7 },
          unlock_cost: 1,
          slug: "his_life_story",
        },
        {
          id: "ptp17",
          unlockable_if: { puzzles_solved: 8 },
          unlock_cost: 1,
          slug: "the_inspectre",
        },
        // Drop all 8 metas together once ~70% of the feeders are solved.
        {
          id: "ptm01",
          is_meta: true,
          unlocked_if: { puzzles_solved: 13 },
          slug: "shell_corporation_1",
        }, // meta 1
        {
          id: "ptm02",
          is_meta: true,
          unlocked_if: { puzzles_solved: 13 },
          slug: "shell_corporation_2",
        }, // meta 2
        {
          id: "ptm03",
          is_meta: true,
          unlocked_if: { puzzles_solved: 13 },
          slug: "shell_corporation_3",
        }, // meta 3
        {
          id: "ptm04",
          is_meta: true,
          unlocked_if: { puzzles_solved: 13 },
          slug: "shell_corporation_4",
        }, // meta 4
        {
          id: "ptm05",
          is_meta: true,
          unlocked_if: { puzzles_solved: 13 },
          slug: "shell_corporation_5",
        }, // meta 5
        {
          id: "ptm06",
          is_meta: true,
          unlocked_if: { puzzles_solved: 13 },
          slug: "shell_corporation_6",
        }, // meta 6
        {
          id: "ptm07",
          is_meta: true,
          unlocked_if: { puzzles_solved: 13 },
          slug: "shell_corporation_7",
        }, // meta 7
        {
          id: "ptm08",
          is_meta: true,
          unlocked_if: { puzzles_solved: 13 },
          slug: "shell_corporation_8",
        }, // meta 8
        {
          id: "ptm09", // supermeta
          is_meta: true,
          is_supermeta: true,
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
      gates: [
        {
          id: "ptg01",
          internal_description:
            "Picked up Eponymous Forensic Accountant from Gala",
        },
        {
          id: "ptg02",
          internal_description: "Picked up The Inspectre from Gala",
        },
        {
          id: "ptg03",
          internal_description: "Ads enabled for quixotic-shoe",
          satisfied_if: {
            oneOf: [
              { slot_solved: "mdp03" }, // songs_on_the_radio
              { round_unlocked: "paper_trail" },
            ],
          },
        },
        {
          id: "ptg04",
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Accessed HellFresh",
        },
        {
          id: "ptg05",
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Accessed BetterOprah",
        },
        {
          id: "ptg06",
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Accessed HardlySafe",
        },
        {
          id: "ptg07",
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Accessed DraughtQueens",
        },
        {
          id: "ptg08",
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Accessed TownSquareSpace",
        },
        {
          id: "ptg09",
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Solved HellFresh",
        },
        {
          id: "ptg10",
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Solved BetterOprah",
        },
        {
          id: "ptg11",
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Solved HardlySafe",
        },
        {
          id: "ptg12",
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Solved DraughtQueens",
        },
        {
          id: "ptg13",
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Solved TownSquareSpace",
        },
        {
          id: "ptg14",
          satisfied_if: [
            { gate_satisfied: "ptg09" },
            { gate_satisfied: "ptg10" },
            { gate_satisfied: "ptg11" },
            { gate_satisfied: "ptg12" },
            { gate_satisfied: "ptg13" },
          ],
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Solved all minipuzzles - unlocks automatically",
        },
        {
          id: "ptg15",
          internal_description:
            "And Now, A Puzzling Word From Our Sponsors: Picked up martini from bar",
        },
        {
          id: "ptg16",
          internal_description: "Weather enabled for icy-box",
          satisfied_if: {
            oneOf: [
              { slot_unlocked: "ptp10" },
              { round_unlocked: "paper_trail" },
            ],
          },
        },
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "confront_gladys",
          title: "Confront Gladys",
          unlock_if: [
            { slot_solved: "ptm09" }, // papertrail super
          ],
          virtual: false,
        },
      ],
      unlock_if: [
        { slot_solved: "mdm02" },
        { interaction_completed: "interview_at_the_jewelry_store" },
      ],
    },
    {
      slug: "background_check",
      title: "The Background Check",
      final_puzzle_slot: "bgm04",
      puzzles: [
        // 14 feeders, 3 metas, 1 super
        // Start with 5 unlockable.  Add 1.5 (rounding up) for each solve.
        {
          id: "bgp01",
          unlockable_if: { round_unlocked: "background_check" },
          unlock_cost: 1,
          slug: "knights_of_the_square_table",
        },
        {
          id: "bgp02",
          unlockable_if: { round_unlocked: "background_check" },
          unlock_cost: 1,
          slug: "he_shouldnt_have_eaten_the_apple",
        },
        {
          id: "bgp03",
          unlockable_if: { puzzles_solved: 1 },
          unlock_cost: 1,
          slug: "the_tunnels_beneath_the_institute",
        },
        {
          id: "bgp04",
          unlockable_if: { puzzles_solved: 4 },
          unlock_cost: 1,
          slug: "t____ott___p__y",
        },
        {
          id: "bgp05",
          unlockable_if: { puzzles_solved: 5 },
          unlock_cost: 1,
          slug: "the_10000_sheet_excel_file",
        },
        {
          id: "bgp06",
          unlockable_if: { round_unlocked: "background_check" },
          unlock_cost: 1,
          slug: "story_vision_contest",
        },
        {
          id: "bgp07",
          unlockable_if: { puzzles_solved: 3 },
          unlock_cost: 1,
          slug: "kindred_spirits",
        },
        {
          id: "bgp08",
          unlockable_if: { puzzles_solved: 2 },
          unlock_cost: 1,
          slug: "deepfrost",
        },
        {
          id: "bgp09",
          unlockable_if: { round_unlocked: "background_check" },
          unlock_cost: 1,
          slug: "reuse_and_recyclability",
        },
        {
          id: "bgp10",
          unlockable_if: { round_unlocked: "background_check" },
          unlock_cost: 1,
          slug: "formula_won",
        },
        {
          id: "bgp11",
          unlockable_if: { puzzles_solved: 5 },
          unlock_cost: 1,
          slug: "_land",
        },
        {
          id: "bgp12",
          unlockable_if: { puzzles_solved: 1 },
          unlock_cost: 1,
          slug: "where_am_i",
        },
        {
          id: "bgp13",
          unlockable_if: { puzzles_solved: 6 },
          unlock_cost: 1,
          slug: "celestial_rope",
        },
        {
          id: "bgp14",
          unlockable_if: { puzzles_solved: 3 },
          unlock_cost: 1,
          slug: "o_woe_is_me",
        },
        // Metas become unlocked when both of the following conditions are met:
        // * At least 7 feeders in the round are solved
        // * At least 2 feeders associated with each meta are solved.
        {
          id: "bgm01",
          is_meta: true,
          unlocked_if: BGCHECK_META_UNLOCK_CONDITION,
          slug: "the_mark",
        }, // meta 1
        {
          id: "bgm02",
          is_meta: true,
          unlocked_if: BGCHECK_META_UNLOCK_CONDITION,
          slug: "the_grand_illusion",
        }, // meta 2
        {
          id: "bgm03",
          is_meta: true,
          unlocked_if: BGCHECK_META_UNLOCK_CONDITION,
          slug: "the_oversight",
        }, // meta 3
        // Super unlocks once any one meta is solved.
        {
          id: "bgm04",
          is_meta: true,
          is_supermeta: true,
          unlocked_if: {
            puzzles_solved: 1,
            slots: ["bgm01", "bgm02", "bgm03"],
          },
          slug: "alias",
        }, // supermeta
      ],
      gates: [
        {
          id: "bgg01",
          internal_description: "Picked up Celestial Rope from Gala",
        },
        {
          id: "bgg02",
          internal_description:
            "Release answer audio recording for He Shouldn’t Have Eaten The Apple",
        },
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "confront_carter",
          title: "Confront Carter",
          unlock_if: [
            { slot_solved: "bgm04" }, // background check super
          ],
          virtual: false,
        },
      ],
      unlock_if: [
        { slot_solved: "mdm03" },
        { interaction_completed: "interview_at_the_casino" },
      ],
    },
    {
      slug: "illegal_search",
      title: "The Illegal Search",
      final_puzzle_slot: "ism03",
      puzzles: [
        // The first 5 puzzles are unlockable once they are discovered in the UI.
        // Slugs from these 5 slots can be swapped freely to match the desired object.
        {
          id: "isp01",
          unlockable_if: { gate_satisfied: "isg01" },
          unlock_cost: 1,
          slug: "皇帝の暗号",
        }, // great wave painting
        {
          id: "isp02",
          unlockable_if: { gate_satisfied: "isg02" },
          unlock_cost: 1,
          slug: "this_is_just_a_test",
        }, // globe
        {
          id: "isp03",
          unlockable_if: { gate_satisfied: "isg03" },
          unlock_cost: 1,
          slug: "paw_print_detective",
        }, // family portrait
        {
          id: "isp04",
          unlockable_if: { gate_satisfied: "isg04" },
          unlock_cost: 1,
          slug: "a_puzzle_of_the_dead",
        }, // typewriter
        {
          id: "isp05",
          unlockable_if: { gate_satisfied: "isg05" },
          unlock_cost: 1,
          slug: "cross_spread",
        }, // desk lamp,
        // The next 5 puzzles are unlockable once they are discovered in the
        // UI, but will not be discoverable until the corresponding lock is
        // satisfied.
        // Slugs from these 5 slots must match the appropriate object for the
        // blacklight version of the asset to give the right set of
        // instructions for that puzzle.
        {
          id: "isp06",
          unlockable_if: { gate_satisfied: "isg11" },
          unlock_cost: 1,
          slug: "cahfee_regulah",
        }, // candy, in desk drawer/behind directional lock
        {
          id: "isp07",
          unlockable_if: { gate_satisfied: "isg12" },
          unlock_cost: 1,
          slug: "the_center_is_in_plain_sight",
        }, // rings, behind binary switches
        {
          id: "isp08",
          unlockable_if: { gate_satisfied: "isg13" },
          unlock_cost: 1,
          slug: "jargon",
        }, // money, inside safe/combination lock
        {
          id: "isp09",
          unlockable_if: { gate_satisfied: "isg14" },
          unlock_cost: 1,
          slug: "given_up",
        }, // ledger, behind numeric lock/rug
        {
          id: "isp10",
          unlockable_if: { gate_satisfied: "isg15" },
          unlock_cost: 1,
          slug: "smoke_em_if_youve_got_em",
        }, // note, inside cryptex

        // The next 8 puzzles are only discoverable once the first meta is
        // solved and they are discovered in the UI.
        {
          id: "isp11",
          unlockable_if: [
            { gate_satisfied: "isg18" },
            { slot_solved: "ism01" },
          ],
          unlock_cost: 1,
          slug: "passage_of_time",
        }, // birth certificate
        {
          id: "isp12",
          unlockable_if: [
            { gate_satisfied: "isg19" },
            { slot_solved: "ism01" },
          ],
          unlock_cost: 1,
          slug: "corn_maize",
        }, // newspaper clipping
        {
          id: "isp13",
          unlockable_if: [
            { gate_satisfied: "isg20" },
            { slot_solved: "ism01" },
          ],
          unlock_cost: 1,
          slug: "the_annual_massachusetts_spelling_bee",
        }, // letter from prison warden
        {
          id: "isp14",
          unlockable_if: [
            { gate_satisfied: "isg21" },
            { slot_solved: "ism01" },
          ],
          unlock_cost: 1,
          slug: "a_heap_of_clards",
        }, // photo of the Candys and Baby
        {
          id: "isp15",
          unlockable_if: [
            { gate_satisfied: "isg22" },
            { slot_solved: "ism01" },
          ],
          unlock_cost: 1,
          slug: "fechtbuch",
        }, // photo of Papa, wife, and Gladys
        {
          id: "isp16",
          unlockable_if: [
            { gate_satisfied: "isg23" },
            { slot_solved: "ism01" },
          ],
          unlock_cost: 1,
          slug: "bermuda_triangle",
        }, // rare stamp
        {
          id: "isp17",
          unlockable_if: [
            { gate_satisfied: "isg24" },
            { slot_solved: "ism01" },
          ],
          unlock_cost: 1,
          slug: "half_baked",
        }, // teddy bear
        {
          id: "isp18",
          unlockable_if: [
            { gate_satisfied: "isg25" },
            { slot_solved: "ism01" },
          ],
          unlock_cost: 1,
          slug: "networking_event",
        }, // radio drama poster

        // The next 5 puzzles are the blacklight versions of 6-10.
        // Slugs must correspond to the _blacklight version of the slug of the corresponding slot isp06-isp10
        {
          id: "isp19",
          unlocked_if: { gate_satisfied: "isg27" },
          prize: 0,
          slug: "cahfee_regulah_blacklight",
        }, // blacklight version of isp06, behind directional lock
        {
          id: "isp20",
          unlocked_if: { gate_satisfied: "isg28" },
          prize: 0,
          slug: "the_center_is_in_plain_sight_blacklight",
        }, // blacklight version of isp07, behind binary switch lock
        {
          id: "isp21",
          unlocked_if: { gate_satisfied: "isg29" },
          prize: 0,
          slug: "jargon_blacklight",
        }, // blacklight version of isp08, behind combination lock
        {
          id: "isp22",
          unlocked_if: { gate_satisfied: "isg30" },
          prize: 0,
          slug: "given_up_blacklight",
        }, // blacklight version of isp09, behind numeric lock
        {
          id: "isp23",
          unlocked_if: { gate_satisfied: "isg31" },
          prize: 0,
          slug: "smoke_em_if_youve_got_em_blacklight",
        }, // blacklight version of isp10, behind word lock

        // Metas.
        {
          id: "ism01",
          is_meta: true,
          unlocked_if: [{ gate_satisfied: "isg00" }],
          slug: "papas_bookcase",
        }, // Bookcase
        {
          id: "ism02",
          is_meta: true,
          unlocked_if: [{ slot_solved: "ism01" }, { gate_satisfied: "isg17" }],
          slug: "papas_stash",
        },
        {
          id: "ism03",
          is_meta: true,
          is_supermeta: true,
          unlocked_if: [{ slot_solved: "ism02" }, { gate_satisfied: "isg32" }],
          slug: "papas_bookcase_blacklight",
        },
      ],
      gates: [
        // Prototype; these particular gate assignments may not be final
        { id: "isg00", title: "Examined the bookcase in The Illegal Search" }, // examine the bookcase (meta)
        {
          id: "isg01",
          internal_description:
            "find the first object in the first room (great wave painting)",
        },
        {
          id: "isg02",
          internal_description:
            "find the second object in the first room (globe)",
        },
        {
          id: "isg03",
          internal_description:
            "find the third object in the first room (family portrait)",
        },
        {
          id: "isg04",
          internal_description:
            "find the fourth object in the first room (typewriter)",
        },
        {
          id: "isg05",
          internal_description:
            "find the last object in the first room (desk lamp)",
        },
        {
          id: "isg06",
          title: "Unlocked the desk drawer in The Illegal Search",
          show_notification: true,
        },
        {
          id: "isg07",
          title: "Unlocked the breaker box in The Illegal Search",
          show_notification: true,
        },
        {
          id: "isg08",
          title: "Unlocked the safe in The Illegal Search",
          show_notification: true,
        },
        {
          id: "isg09",
          title: "Unlocked the numeric lock in The Illegal Search",
          show_notification: true,
        },
        {
          id: "isg10",
          title: "Unlocked the cryptex in The Illegal Search",
          show_notification: true,
        },
        {
          id: "isg11",
          internal_description: "find the object behind the directional lock",
        },
        {
          id: "isg12",
          internal_description: "find the object behind the binary switch lock",
        },
        {
          id: "isg13",
          internal_description: "find the object behind the combination lock",
        },
        {
          id: "isg14",
          internal_description: "find the object behind the numeric lock",
        },
        {
          id: "isg15",
          internal_description: "find the object behind the word lock",
        },
        {
          id: "isg16",
          title:
            "Unlocked the secret room via Papa’s bookcase in The Illegal Search",
          show_notification: true,
        }, // complete the bookcase/unlock door in wall
        {
          id: "isg17",
          internal_description: "find the magazines the second room (meta)",
        },
        {
          id: "isg18",
          internal_description:
            "find the first object in the second room (birth certificate)",
        },
        {
          id: "isg19",
          internal_description:
            "find the second object in the second room (newspaper clipping)",
        },
        {
          id: "isg20",
          internal_description:
            "find the third object in the second room (letter from prison warden)",
        },
        {
          id: "isg21",
          internal_description:
            "find the fourth object in the second room (photo of the Candys and Baby)",
        },
        {
          id: "isg22",
          internal_description:
            "find the fifth object in the second room (photo of Papa, wife, and Gladys)",
        },
        {
          id: "isg23",
          internal_description:
            "find the sixth object in the second room (rare stamp)",
        },
        {
          id: "isg24",
          internal_description:
            "find the seventh object in the second room (Gladys' teddy bear)",
        },
        {
          id: "isg25",
          internal_description:
            "find the eighth object in the second room (radio drama poster)",
        },
        {
          id: "isg26",
          title: "Obtained the blacklight in The Illegal Search",
          show_notification: true,
          satisfied_if: { slot_solved: "ism02" },
        }, // obtain the blacklight
        {
          id: "isg27",
          internal_description:
            "find the blacklight object behind the directional lock",
        },
        {
          id: "isg28",
          internal_description:
            "find the blacklight object behind the binary switch lock",
        },
        {
          id: "isg29",
          internal_description:
            "find the blacklight object behind the combination lock",
        },
        {
          id: "isg30",
          internal_description:
            "find the blacklight object behind the numeric lock",
        },
        {
          id: "isg31",
          internal_description:
            "find the blacklight object behind the word lock",
        },
        {
          id: "isg32",
          internal_description:
            "find the blacklight version of the bookshelf note (meta)",
        },
        {
          id: "isg33",
          internal_description:
            "Picked up Smoke ’Em If You’ve Got ’Em from the Gala",
        },
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "confront_papa",
          title: "Confront Papa",
          unlock_if: [{ slot_solved: "ism03" }],
          virtual: false,
        },
      ],
      unlock_if: [
        { slot_solved: "mdm04" },
        { interaction_completed: "interview_at_the_art_gallery" },
      ],
    },
    {
      slug: "murder_in_mitropolis",
      title: "The Murder in MITropolis",
      final_puzzle_slot: "tmm01",
      puzzles: [
        // 24 feeders + 1 meta
        {
          id: "tmp01",
          unlockable_if: { round_unlocked: "murder_in_mitropolis" },
          unlock_cost: 1,
          slug: "engagements_and_other_crimes",
        },
        {
          id: "tmp02",
          unlockable_if: { round_unlocked: "murder_in_mitropolis" },
          unlock_cost: 1,
          slug: "what_do_they_call_you",
        },
        {
          id: "tmp03",
          unlockable_if: { round_unlocked: "murder_in_mitropolis" },
          unlock_cost: 1,
          slug: "give_this_grid_a_shake",
        },
        {
          id: "tmp04",
          unlockable_if: { round_unlocked: "murder_in_mitropolis" },
          unlock_cost: 1,
          slug: "garden_anecdotes",
        },
        {
          id: "tmp05",
          unlockable_if: { round_unlocked: "murder_in_mitropolis" },
          unlock_cost: 1,
          slug: "good_fences_make_good_otherwise_incompatible_neighbors",
        },
        {
          id: "tmp06",
          unlockable_if: { puzzles_solved: 1 },
          unlock_cost: 1,
          slug: "cross_dash_word",
        },
        {
          id: "tmp07",
          unlockable_if: { puzzles_solved: 1 },
          unlock_cost: 1,
          slug: "a_map_and_a_shade_or_four",
        },
        {
          id: "tmp08",
          unlockable_if: { puzzles_solved: 2 },
          unlock_cost: 1,
          slug: "beyond_a_shadow_of_a_doubt",
        },
        {
          id: "tmp09",
          unlockable_if: { puzzles_solved: 3 },
          unlock_cost: 1,
          slug: "to_do_tile_that_rectangle",
        },
        {
          id: "tmp10",
          unlockable_if: { puzzles_solved: 3 },
          unlock_cost: 1,
          slug: "absolutely_not_balderdash",
        },
        {
          id: "tmp11",
          unlockable_if: { puzzles_solved: 4 },
          unlock_cost: 1,
          slug: "a_dash_of_color",
        },
        {
          id: "tmp12",
          unlockable_if: { puzzles_solved: 5 },
          unlock_cost: 1,
          slug: "weirdo_threaded_doodads",
        },
        {
          id: "tmp13",
          unlockable_if: { puzzles_solved: 5 },
          unlock_cost: 1,
          slug: "find_other_ways_of_seeing",
        },
        {
          id: "tmp14",
          unlockable_if: { puzzles_solved: 6 },
          unlock_cost: 1,
          slug: "sounds_like_a_dodo_to_me",
        },
        {
          id: "tmp15",
          unlockable_if: { puzzles_solved: 7 },
          unlock_cost: 1,
          slug: "can_do_transmissions",
        },
        {
          id: "tmp16",
          unlockable_if: { puzzles_solved: 7 },
          unlock_cost: 1,
          slug: "we_can_do_this_all_day",
        },
        {
          id: "tmp17",
          unlockable_if: { puzzles_solved: 8 },
          unlock_cost: 1,
          slug: "do_the_packing",
        },
        {
          id: "tmp18",
          unlockable_if: { puzzles_solved: 9 },
          unlock_cost: 1,
          slug: "cacciando_trio_misterioso",
        },
        {
          id: "tmp19",
          unlockable_if: { puzzles_solved: 9 },
          unlock_cost: 1,
          slug: "abstract_art_and_poems_concerning_a_pale_blue_dot_and_many_more_friends",
        },
        {
          id: "tmp20",
          unlockable_if: { puzzles_solved: 10 },
          unlock_cost: 1,
          slug: "its_all_cheep_and_a_sheep_to_me",
        },
        {
          id: "tmp21",
          unlockable_if: { puzzles_solved: 11 },
          unlock_cost: 1,
          slug: "as_the_world_turandot",
        },
        {
          id: "tmp22",
          unlockable_if: { puzzles_solved: 11 },
          unlock_cost: 1,
          slug: "splits_used_as_history",
        },
        {
          id: "tmp23",
          unlocked_if: { oneOf: [] }, // Manual release only
          prize: 0,
          slug: "in_communicado_tonight",
        },
        {
          id: "tmp24",
          unlocked_if: { oneOf: [] }, // Manual release only
          prize: 0,
          slug: "estimation_dot_jpg",
        },
        {
          id: "tmm01",
          is_meta: true,
          is_supermeta: true,
          unlocked_if: { puzzles_solved: 16 },
          slug: "the_killer",
        },
      ],
      gates: [
        {
          id: "tmg01",
          internal_description:
            "Opened I Kid Ewe Knot (Weirdo Threaded Doodads)",
        },
        {
          id: "tmg02",
          internal_description:
            "Opened Stitchy Situation (Weirdo Threaded Doodads)",
        },
        { id: "tmg03", internal_description: "Picked up Cross Dash Word" },
        {
          id: "tmg04",
          internal_description:
            "Picked up abstract art and poems / concerning a pale blue dot / and many more friends",
        },
      ],
      interactions: [
        {
          id: "the_safehouse",
          title: "The Safehouse",
          unlock_if: [
            { slot_solved: "tmm01" }, // The Murder supermeta
          ],
          virtual: false,
        },
      ],
      unlock_if: { interaction_completed: "the_crime_scene" },
    },
    {
      slug: "events",
      title: "Events",
      final_puzzle_slot: null,
      puzzles: [
        {
          id: "evt1",
          slug: "making_contact_with_an_informant",
          prize: 0,
          strong_currency_prize: 1,
        },
        {
          id: "evt2",
          slug: "tailing_a_lead",
          prize: 0,
          strong_currency_prize: 1,
        },
        {
          id: "evt3",
          slug: "navigating_high_society",
          prize: 0,
          strong_currency_prize: 1,
        },
        {
          id: "evt4",
          slug: "seeing_the_big_picture",
          prize: 0,
          strong_currency_prize: 2,
        },
      ],
      unlock_if: [{ gate_satisfied: "hunt_started" }],
      gates: [
        { id: "evg01", internal_description: "Tailing a Lead concluded" },
        {
          id: "evg02",
          internal_description: "Making Contact With An Informant concluded",
        },
      ],
    },
    {
      // We don't actually want an "endgame" (or "The Vault") round to appear;
      // we just want a page for the final interaction, but it seemed like a lot
      // of work to promote The Vault to top-level. On the other hand, it
      // doesn't seem like much of a giveaway if client-side code hard-codes the
      // string "endgame" and special-cases it.
      slug: "endgame",
      title: "The Vault",
      final_puzzle_slot: null,
      puzzles: [],
      interactions: [
        {
          id: "the_vault",
          title: "The Vault",
          unlock_if: [
            { interaction_completed: "confront_katrina" },
            { interaction_completed: "confront_gladys" },
            { interaction_completed: "confront_carter" },
            { interaction_completed: "confront_papa" },
            { interaction_completed: "the_safehouse" },
          ],
          virtual: false,
        },
      ],
      unlock_if: [
        { interaction_completed: "confront_katrina" },
        { interaction_completed: "confront_gladys" },
        { interaction_completed: "confront_carter" },
        { interaction_completed: "confront_papa" },
        { interaction_completed: "the_safehouse" },
      ],
    },
    {
      slug: "floaters",
      title: "Floaters",
      final_puzzle_slot: "",
      puzzles: [
        { id: "flp01", unlock_cost: 1, slug: "a_b_c_easy_as_1_2_3", prize: 0 },
        { id: "flp02", unlock_cost: 1, slug: "wouthit_porbelm", prize: 0 },
        {
          id: "flp03",
          unlock_cost: 1,
          slug: "hello_darkness_my_old_friend",
          prize: 0,
        },
        {
          id: "flp04",
          unlock_cost: 1,
          slug: "infiltrating_the_criminal_underworld",
          prize: 0,
          strong_currency_prize: 1,
        },
        {
          id: "flp05",
          unlock_cost: 1,
          slug: "re_infiltrating_the_criminal_underworld",
          prize: 0,
          strong_currency_prize: 1,
        },
        { id: "flp06", unlock_cost: 1, slug: "trainees_first_recital" },
        { id: "flp07", unlock_cost: 1, slug: "the_comeback_it_takes_two" },
      ],
      unlock_if: { oneOf: [] },
    },
  ],
};

// In archiveMode, modify puzzles which were manually released to have an unlock
// rule. Thresholds are chosen mostly based on vibes from looking at the
// rough experience of the top 20 teams
if (archiveMode) {
  const allRegularSlots = HUNT.rounds.flatMap((round) =>
    round.puzzles.filter((p) => !p.is_meta && !p.is_supermeta).map((p) => p.id),
  );
  const allSupermetaSlots = HUNT.rounds.flatMap((round) =>
    round.puzzles.filter((p) => p.is_supermeta).map((p) => p.id),
  );
  HUNT.rounds.forEach((round) => {
    round.puzzles.forEach((puzzle) => {
      switch (puzzle.slug) {
        case "estimation_dot_jpg":
          puzzle.unlocked_if = {
            puzzles_solved: 15,
            slots: allRegularSlots,
          };
          break;
        case "art_history":
          puzzle.unlocked_if = {
            puzzles_solved: 25,
            slots: allRegularSlots,
          };
          break;
        case "control_room":
          puzzle.unlocked_if = {
            puzzles_solved: 30,
            slots: allRegularSlots,
          };
          break;
        case "in_communicado_tonight":
          puzzle.unlocked_if = {
            puzzles_solved: 35,
            slots: allRegularSlots,
          };
          break;

        case "trainees_first_recital":
          puzzle.unlocked_if = [
            {
              puzzles_solved: 1,
              slots: allSupermetaSlots,
            },
            { slot_solved: "mdp03" },
          ];
          break;
        case "the_comeback_it_takes_two":
          puzzle.unlocked_if = [
            {
              puzzles_solved: 2,
              slots: allSupermetaSlots,
            },
            { slot_solved: "mdp03" },
          ];
          break;
      }
    });
  });
}

HUNT.rounds.forEach((round: Round) => {
  if (round.slug !== "background_check") {
    const metas = round.puzzles.filter(({ is_meta }) => {
      return !!is_meta;
    });
    const nonmetas = round.puzzles
      .filter(({ is_meta }) => {
        return !is_meta;
      })
      .toSorted((p1, p2) => (p1.slug ?? "").localeCompare(p2.slug ?? ""));

    round.puzzles = [...nonmetas, ...metas];
  }
});

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

export type GateLookup = {
  roundSlug: string;
  gate: Gate;
};

// For quickly looking up where a particular gate is used in HUNT.
export function generateGateToSlotMap(hunt: Hunt): Map<string, GateLookup> {
  const gateToRound = new Map<string, GateLookup>();
  hunt.rounds.forEach((round) => {
    (round.gates ?? []).forEach((gate) => {
      const existing = gateToRound.get(gate.id);
      if (existing) {
        throw new Error(
          `gate id ${gate.id} used in both round ${existing.roundSlug} and ${round.slug}`,
        );
      }
      gateToRound.set(gate.id, {
        roundSlug: round.slug,
        gate,
      });
    });
  });
  return gateToRound;
}

export const GATE_LOOKUP = generateGateToSlotMap(HUNT);

export default HUNT;
