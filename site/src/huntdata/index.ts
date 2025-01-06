// This is the canonical description of the structure of our hunt, with a full
// enumeration of rounds, puzzles, interactions, and the dependency structure.
import { type Hunt, type PuzzleSlot, type Round } from "./types";

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
      final_puzzle_slot: 'mdm05',
      puzzles: [
        // slots (28 feeders, 4 metas, 1 super)
        // Start with 11 puzzles unlockable and 9 unlock currency.
        // Make 2 more puzzles unlockable after each solve.
        // The slot order is availability order.
        // The round's presentation layer handles mapping slots to witnesses.
        { id: "mdp01", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "unreal_islands" }, // unlockable by default
        { id: "mdp02", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "educational_rite_of_passage" },
        { id: "mdp03", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "songs_on_the_radio" },
        { id: "mdp04", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "downright_backwards" },
        { id: "mdp05", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "chatgpt" },
        { id: "mdp06", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "zulu_lima" },
        { id: "mdp07", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "press_play" },
        { id: "mdp08", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "shrinkage" },
        { id: "mdp09", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "missing_connections" },
        { id: "mdp10", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "xoxo" },
        { id: "mdp11", unlockable_if: { round_unlocked: "the_missing_diamond" }, unlock_cost: 1, slug: "an_argument" },
        { id: "mdp12", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1 }, // 📑🍝
        { id: "mdp13", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1, slug: "mitropolitan_house_of_fashion" },
        { id: "mdp14", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1, slug: "on_the_corner" },
        { id: "mdp15", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1, slug: "drunkens_and_flagons" },
        { id: "mdp16", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1, slug: "battle_factory" },
        { id: "mdp17", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1, slug: "synthetic_tagsonomy" },
        { id: "mdp18", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1, slug: "no_notes" },
        { id: "mdp19", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1, slug: "🔎🧊" },
        { id: "mdp20", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "introduction_to_decryption" },
        { id: "mdp21", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "neatly_drawn" },
        { id: "mdp22", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1, slug: "dropping_the_ball" },
        { id: "mdp23", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1, slug: "mastering_the_art_of_conch_frocking" },
        { id: "mdp24", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1, slug: "in_a_different_direction" },
        { id: "mdp25", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1, slug: "check_a_deez_words_out" },
        { id: "mdp26", unlockable_if: { puzzles_solved: 8 }, unlock_cost: 1, slug: "be_kind_rewind" },
        { id: "mdp27", unlockable_if: { puzzles_solved: 8 }, unlock_cost: 1, slug: "they_might_be_grad_students_but_theyve_got_your_number" },
        { id: "mdp28", unlockable_if: { puzzles_solved: 9 }, unlock_cost: 1, slug: "zing_it_again" },
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
              "mdp08",
              "mdp09",
              "mdp10",
              "mdp20",
              "mdp22",
              "mdp28",
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
        { id: "hunt_started" }, // Hunt started.  Nothing is unlocked until this gate is satisfied.
        { id: "mdg01" }, // Picked up Educational Rite of Passage from Gala
        { id: "mdg02" }, // Picked up Synthetic Tagsonomy from Gala
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
        },
        {
          id: "interview_at_the_jewelry_store",
          title: "Interview at the Jewelry Store",
          unlock_if: [{ slot_solved: "mdm02" }],
        },
        {
          id: "interview_at_the_casino",
          title: "Interview at the Casino",
          unlock_if: [{ slot_solved: "mdm03" }],
        },
        {
          id: "interview_at_the_art_gallery",
          title: "Interview at the Art Gallery",
          unlock_if: [{ slot_solved: "mdm04" }],
        },

        {
          // This is a brief in-person interaction which is expected to happen
          // after teams solve the Missing Diamond super but before they go on the
          // funaround.
          id: "meet_billie",
          title: "Meet Billie",
          unlock_if: [{ slot_solved: "mdm05" }],
        },
        {
          // This is a longer in-person interaction which is expected to happen
          // after teams complete the funaround.
          id: "catch_the_thief",
          title: "Catch the Thief",
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
      title: "The Stakeout",
      final_puzzle_slot: 'som01',
      puzzles: [
        // 42 feeders, 1 meta
        // Start with 5 unlockable, make 1.5 (rounding up) more unlockable after each solve.
        { id: "sop01", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1, slug: "anything_is_popsicle" },
        { id: "sop02", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1, slug: "the_ultimate_insult" },
        { id: "sop03", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1, slug: "broken_record" },
        { id: "sop04", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1, slug: "relief_printing" },
        { id: "sop05", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1, slug: "mellow_planet" },
        { id: "sop06", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1, slug: "just_plane_wrong" },
        { id: "sop07", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1, slug: "recipe_substitutions" },
        { id: "sop08", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1, slug: "superlatives" },
        { id: "sop09", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1, slug: "an_exchange_of_vows" },
        { id: "sop10", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1 }, // Word Yore
        { id: "sop11", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1, slug: "temporal_investigations" },
        { id: "sop12", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "a_recipe_for_success" },
        { id: "sop13", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "a_math_quiz" },
        { id: "sop14", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1, slug: "sing_like_a_canary" },
        { id: "sop15", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1, slug: "mystery_os" },
        { id: "sop16", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1, slug: "a_walk_in_the_park" },
        { id: "sop17", unlockable_if: { puzzles_solved: 8 }, unlock_cost: 1, slug: "borderline_personality" },
        { id: "sop18", unlockable_if: { puzzles_solved: 9 }, unlock_cost: 1, slug: "a_sudoku" },
        { id: "sop19", unlockable_if: { puzzles_solved: 9 }, unlock_cost: 1, slug: "be_mine" },
        { id: "sop20", unlockable_if: { puzzles_solved: 10 }, unlock_cost: 1, slug: "lab_scrabble" },
        { id: "sop21", unlockable_if: { puzzles_solved: 11 }, unlock_cost: 1, slug: "cruciverbal" },
        { id: "sop22", unlockable_if: { puzzles_solved: 11 }, unlock_cost: 1, slug: "why_kant_we_be_friends_too" },
        { id: "sop23", unlockable_if: { puzzles_solved: 12 }, unlock_cost: 1, slug: "whose_song_is_it_anyway" },
        { id: "sop24", unlockable_if: { puzzles_solved: 13 }, unlock_cost: 1, slug: "some_assembly_required" },
        { id: "sop25", unlockable_if: { puzzles_solved: 13 }, unlock_cost: 1, slug: "fight_night_at_mos" },
        { id: "sop26", unlockable_if: { puzzles_solved: 14 }, unlock_cost: 1 }, // either brilliant-row or elaborate-mammoth
        { id: "sop27", unlockable_if: { puzzles_solved: 15 }, unlock_cost: 1, slug: "big_names" },
        { id: "sop28", unlockable_if: { puzzles_solved: 15 }, unlock_cost: 1, slug: "doable_double" },
        { id: "sop29", unlockable_if: { puzzles_solved: 16 }, unlock_cost: 1, slug: "taste_explosion" },
        { id: "sop30", unlockable_if: { puzzles_solved: 17 }, unlock_cost: 1, slug: "art_history" } ,
        { id: "sop31", unlockable_if: { puzzles_solved: 17 }, unlock_cost: 1, slug: "magic_i" },
        { id: "sop32", unlockable_if: { puzzles_solved: 18 }, unlock_cost: 1, slug: "a_badly_broken_quote" },
        { id: "sop33", unlockable_if: { puzzles_solved: 19 }, unlock_cost: 1 }, // Charged
        { id: "sop34", unlockable_if: { puzzles_solved: 19 }, unlock_cost: 1, slug: "commentary" },
        { id: "sop35", unlockable_if: { puzzles_solved: 20 }, unlock_cost: 1, slug: "seating_arrangements" },
        { id: "sop36", unlockable_if: { puzzles_solved: 21 }, unlock_cost: 1, slug: "editors_solemnity" },
        { id: "sop37", unlockable_if: { puzzles_solved: 21 }, unlock_cost: 1 }, // Control Room
        { id: "sop38", unlockable_if: { puzzles_solved: 22 }, unlock_cost: 1, slug: "read_between_the_lines" },
        { id: "sop39", unlockable_if: { puzzles_solved: 23 }, unlock_cost: 1, slug: "just_fing_behave" },
        { id: "sop40", unlockable_if: { puzzles_solved: 23 }, unlock_cost: 1, slug: "its_not_clear" },
        { id: "sop41", unlockable_if: { puzzles_solved: 24 }, unlock_cost: 1, slug: "mens_at_my_nose" },
        { id: "sop42", unlockable_if: { puzzles_solved: 25 }, unlock_cost: 1, slug: "dear_diary" },
        { id: "som01", is_meta: true, unlocked_if: { puzzles_solved: 34 }, slug: "chinatown"},
      ],
      gates: [
        { id: "sog01" }, // Picked up Mystery O's from Gala
        { id: "sog02" }, // Picked up It's Not Clear from Gala
        { id: "sog03" }, // Picked up Anything Is Popsicle from Gala
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "meet_katrina",
          title: "Meet Katrina",
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
      title: "The Paper Trail",
      final_puzzle_slot: 'ptm09',
      puzzles: [
        // 17 feeders, 8 metas, 1 super
        // Start with 5 unlockable, and make 1.5 (rounding up) more unlockable after each solve
        { id: "ptp01", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1, slug: "eponymous_forensic_accountant" },
        { id: "ptp02", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1, slug: "incognito" },
        { id: "ptp03", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1 }, // And Now, A Puzzling Word From Our Sponsors
        { id: "ptp04", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1, slug: "chemicals_are_sexy" },
        { id: "ptp05", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1, slug: "do_the_manual_calculations_dont_try_monte_carlo" },
        { id: "ptp06", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1 }, // World's Largest Crossword Puzzle (pending testing)
        { id: "ptp07", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1, slug: "maze_of_lies" },
        { id: "ptp08", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1, slug: "any_coat_will_do" },
        { id: "ptp09", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1, slug: "the_eras_puzzle" },
        { id: "ptp10", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1, slug: "a_weathered_note" },
        { id: "ptp11", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1, slug: "follow_the_rules" },
        { id: "ptp12", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "star_crossed" },
        { id: "ptp13", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "ಕಾಬವದೋೀ್" },
        { id: "ptp14", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1, slug: "youre_playing_it_wrong" },
        { id: "ptp15", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1, slug: "bar_talk" },
        { id: "ptp16", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1, slug: "his_life_story" },
        { id: "ptp17", unlockable_if: { puzzles_solved: 8 }, unlock_cost: 1, slug: "the_inspectre" },
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
        { id: "ptg01" }, // Picked up Eponymous Forensic Accountant from Gala
        { id: "ptg02" }, // Picked up The Inspectre from Gala
        { id: "ptg03", satisfied_if: { // Ads enabled for quixotic-shoe
          oneOf: [
            { slot_solved: "songs_on_the_radio" },
            { round_unlocked: "paper_trail" },
          ]},
        },
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "meet_gladys",
          title: "Meet Gladys",
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
      title: "The Background Check",
      final_puzzle_slot: 'bgm04',
      puzzles: [
        // 14 feeders, 3 metas, 1 super
        // Start with 5 unlockable.  Add 1.5 (rounding up) for each solve.
        { id: "bgp01", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1, slug: "knights_of_the_square_table" },
        { id: "bgp02", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1, slug: "he_shouldnt_have_eaten_the_apple" },
        { id: "bgp03", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1, slug: "the_tunnels_beneath_the_institute" },
        { id: "bgp04", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1, slug: "t____ott___p__y" },
        { id: "bgp05", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "the_10000_sheet_excel_file" },
        { id: "bgp06", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1, slug: "story_vision_contest" },
        { id: "bgp07", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1, slug: "kindred_spirits" },
        { id: "bgp08", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1, slug: "deepfrost" },
        { id: "bgp09", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1, slug: "reuse_and_recyclability" },
        { id: "bgp10", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1, slug: "formula_won" },
        { id: "bgp11", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "_land" },
        { id: "bgp12", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1, slug: "where_am_i" },
        { id: "bgp13", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1, slug: "celestial_rope" },
        { id: "bgp14", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1, slug: "o_woe_is_me" },
        // Metas become unlocked when both of the following conditions are met:
        // * At least 7 feeders in the round are solved
        // * At least 2 feeders associated with each meta are solved.
        { id: "bgm01", is_meta: true, unlocked_if: BGCHECK_META_UNLOCK_CONDITION, slug: "the_mark" }, // meta 1
        { id: "bgm02", is_meta: true, unlocked_if: BGCHECK_META_UNLOCK_CONDITION, slug: "the_grand_illusion" }, // meta 2
        { id: "bgm03", is_meta: true, unlocked_if: BGCHECK_META_UNLOCK_CONDITION, slug: "the_oversight" }, // meta 3
        // Super unlocks once any one meta is solved.
        { id: "bgm04", is_meta: true, is_supermeta: true, unlocked_if: { puzzles_solved: 1, slots: ["bgm01", "bgm02", "bgm03"] }, slug: "alias" }, // supermeta
      ],
      gates: [
        { id: "bgg01" }, // Picked up Celestial Rope from Gala
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "meet_carter",
          title: "Meet Carter",
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
      title: "The Illegal Search",
      final_puzzle_slot: 'ism03',
      puzzles: [
        // The first 5 puzzles are unlockable once they are discovered in the UI.
        // Slugs from these 5 slots can be swapped freely to match the desired object.
        { id: "isp01", unlockable_if: { gate_satisfied: "isg01" }, unlock_cost: 1, slug: "皇帝の暗号" }, // great wave painting
        { id: "isp02", unlockable_if: { gate_satisfied: "isg02" }, unlock_cost: 1, slug: "this_is_just_a_test" }, // globe
        { id: "isp03", unlockable_if: { gate_satisfied: "isg03" }, unlock_cost: 1, slug: "paw_print_detective" }, // family portrait
        { id: "isp04", unlockable_if: { gate_satisfied: "isg04" }, unlock_cost: 1 }, // typewriter, a_puzzle_of_the_dead goes here
        { id: "isp05", unlockable_if: { gate_satisfied: "isg05" }, unlock_cost: 1, slug: "cross_spread" }, // desk lamp, 
        // The next 5 puzzles are unlockable once they are discovered in the
        // UI, but will not be discoverable until the corresponding lock is
        // satisfied.
        // Slugs from these 5 slots must match the appropriate object for the
        // blacklight version of the asset to give the right set of
        // instructions for that puzzle.
        { id: "isp06", unlockable_if: { gate_satisfied: "isg11" }, unlock_cost: 1, slug: "cahfee_regulah" }, // candy, in desk drawer/behind directional lock
        { id: "isp07", unlockable_if: { gate_satisfied: "isg12" }, unlock_cost: 1, slug: "the_center_is_in_plain_sight" }, // rings, behind binary switches
        { id: "isp08", unlockable_if: { gate_satisfied: "isg13" }, unlock_cost: 1, slug: "jargon" }, // money, inside safe/combination lock
        { id: "isp09", unlockable_if: { gate_satisfied: "isg14" }, unlock_cost: 1, slug: "placeholder_isp09" }, // ledger, behind numeric lock/rug, should be given_up
        { id: "isp10", unlockable_if: { gate_satisfied: "isg15" }, unlock_cost: 1, slug: "placeholder_isp10" }, // note, inside cryptex, should be smoke_em_if_youve_got_em

        // The next 8 puzzles are only discoverable once the first meta is
        // solved and they are discovered in the UI.
        { id: "isp11", unlockable_if: [{ gate_satisfied: "isg18" }, { slot_solved: "ism01" }], unlock_cost: 1, slug: "passage_of_time" }, // birth certificate
        { id: "isp12", unlockable_if: [{ gate_satisfied: "isg19" }, { slot_solved: "ism01" }], unlock_cost: 1, slug: "corn_maize" }, // newspaper clipping
        { id: "isp13", unlockable_if: [{ gate_satisfied: "isg20" }, { slot_solved: "ism01" }], unlock_cost: 1, slug: "the_annual_massachusetts_spelling_bee" }, // letter from prison warden
        { id: "isp14", unlockable_if: [{ gate_satisfied: "isg21" }, { slot_solved: "ism01" }], unlock_cost: 1, slug: "a_heap_of_clards" }, // photo of the Candys and Baby
        { id: "isp15", unlockable_if: [{ gate_satisfied: "isg22" }, { slot_solved: "ism01" }], unlock_cost: 1, slug: "fechtbuch" }, // photo of Papa, wife, and Gladys
        { id: "isp16", unlockable_if: [{ gate_satisfied: "isg23" }, { slot_solved: "ism01" }], unlock_cost: 1, slug: "bermuda_triangle" }, // rare stamp
        { id: "isp17", unlockable_if: [{ gate_satisfied: "isg24" }, { slot_solved: "ism01" }], unlock_cost: 1, slug: "half_baked" }, // teddy bear
        { id: "isp18", unlockable_if: [{ gate_satisfied: "isg25" }, { slot_solved: "ism01" }], unlock_cost: 1, slug: "networking_event" }, // radio drama poster

        // The next 5 puzzles are the blacklight versions of 6-10.
        // Slugs must correspond to the _blacklight version of the slug of the corresponding slot isp06-isp10
        { id: "isp19", unlocked_if: { gate_satisfied: "isg27" }, prize: 0, slug: "cahfee_regulah_blacklight" }, // blacklight version of isp06, behind directional lock
        { id: "isp20", unlocked_if: { gate_satisfied: "isg28" }, prize: 0, slug: "the_center_is_in_plain_sight_blacklight" }, // blacklight version of isp07, behind binary switch lock
        { id: "isp21", unlocked_if: { gate_satisfied: "isg29" }, prize: 0, slug: "jargon_blacklight" }, // blacklight version of isp08, behind combination lock
        { id: "isp22", unlocked_if: { gate_satisfied: "isg30" }, prize: 0, slug: "placeholder_isp09_blacklight" }, // blacklight version of isp09, behind numeric lock
        { id: "isp23", unlocked_if: { gate_satisfied: "isg31" }, prize: 0, slug: "placeholder_isp10_blacklight" }, // blacklight version of isp10, behind word lock

        // Metas.
        { id: "ism01", is_meta: true, unlocked_if: [{ gate_satisfied: "isg00" }], slug: "papas_bookcase" }, // Bookcase
        { id: "ism02", is_meta: true, unlocked_if: [{ slot_solved: "ism01" }, { gate_satisfied: "isg17" }], slug: "papas_stash" },
        { id: "ism03", is_meta: true, unlocked_if: [{ slot_solved: "ism02" }, { gate_satisfied: "isg32" }], slug: "papas_bookcase_blacklight" },
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
        { id: "isg17" }, // find the magazines the second room (meta)
        { id: "isg18" }, // find the first object in the second room (birth certificate)
        { id: "isg19" }, // find the second object in the second room (newspaper clipping)
        { id: "isg20" }, // find the third object in the second room (letter from prison warden)
        { id: "isg21" }, // find the fourth object in the second room (photo of the Candys and Baby)
        { id: "isg22" }, // find the fifth object in the second room (photo of Papa, wife, and Gladys)
        { id: "isg23" }, // find the sixth object in the second room (rare stamp)
        { id: "isg24" }, // find the seventh object in the second room (Gladys' teddy bear)
        { id: "isg25" }, // find the eighth object in the second room (radio drama poster)
        { id: "isg26", title: "Obtained the blacklight", satisfied_if: { slot_solved: "ism02" } }, // obtain the blacklight
        { id: "isg27" }, // find the blacklight object behind the directional lock
        { id: "isg28" }, // find the blacklight object behind the binary switch lock
        { id: "isg29" }, // find the blacklight object behind the combination lock
        { id: "isg30" }, // find the blacklight object behind the numeric lock
        { id: "isg31" }, // find the blacklight object behind the word lock
        { id: "isg32" }, // find the blacklight version of the bookshelf note (meta)
      ],
      interactions: [
        {
          // This is a live interaction, not an in-site interaction, but we might
          // have prerecorded video for remote solvers/folks missing at the time,
          // so it might need a URL anyway.
          id: "meet_papa",
          title: "Meet Papa",
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
      title: "The Murder in MITropolis",
      final_puzzle_slot: 'tmm01',
      puzzles: [
        // 24 feeders + 1 meta
        // TODO: enforce ordering
        { id: "tmp01", unlockable_if: { round_unlocked: "murder_in_mitropolis" }, unlock_cost: 1, slug: "do_the_packing" },
        { id: "tmp02", unlockable_if: { round_unlocked: "murder_in_mitropolis" }, unlock_cost: 1, slug: "cacciando_trio_misterioso" },
        { id: "tmp03", unlockable_if: { round_unlocked: "murder_in_mitropolis" }, unlock_cost: 1, slug: "garden_anecdotes" },
        { id: "tmp04", unlockable_if: { round_unlocked: "murder_in_mitropolis" }, unlock_cost: 1, slug: "what_do_they_call_you" },
        { id: "tmp05", unlockable_if: { round_unlocked: "murder_in_mitropolis" }, unlock_cost: 1, slug: "engagements_and_other_crimes" },
        { id: "tmp06", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1, slug: "good_fences_make_good_otherwise_incompatible_neighbors" },
        { id: "tmp07", unlockable_if: { puzzles_solved: 1 }, unlock_cost: 1, slug: "find_other_ways_of_seeing" },
        { id: "tmp08", unlockable_if: { puzzles_solved: 2 }, unlock_cost: 1, slug: "absolutely_not_balderdash" },
        { id: "tmp09", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1, slug: "beyond_a_shadow_of_a_doubt" },
        { id: "tmp10", unlockable_if: { puzzles_solved: 3 }, unlock_cost: 1, slug: "weirdo_threaded_doodads"},
        { id: "tmp11", unlockable_if: { puzzles_solved: 4 }, unlock_cost: 1, slug: "can_do_transmissions" },
        { id: "tmp12", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "cross_dash_word" },
        { id: "tmp13", unlockable_if: { puzzles_solved: 5 }, unlock_cost: 1, slug: "give_this_grid_a_shake" },
        { id: "tmp14", unlockable_if: { puzzles_solved: 6 }, unlock_cost: 1, slug: "in_communicado_tonight" },
        { id: "tmp15", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1, slug: "a_dash_of_color" },
        { id: "tmp16", unlockable_if: { puzzles_solved: 7 }, unlock_cost: 1, slug: "as_the_world_turandot" },
        { id: "tmp17", unlockable_if: { puzzles_solved: 8 }, unlock_cost: 1 },
        { id: "tmp18", unlockable_if: { puzzles_solved: 9 }, unlock_cost: 1 },
        { id: "tmp19", unlockable_if: { puzzles_solved: 9 }, unlock_cost: 1 },
        { id: "tmp20", unlockable_if: { puzzles_solved: 10 }, unlock_cost: 1 },
        { id: "tmp21", unlockable_if: { puzzles_solved: 11 }, unlock_cost: 1 },
        { id: "tmp22", unlockable_if: { puzzles_solved: 11 }, unlock_cost: 1 },
        { id: "tmp23", unlockable_if: { puzzles_solved: 12 }, unlock_cost: 1 },
        { id: "tmp24", unlockable_if: { puzzles_solved: 13 }, unlock_cost: 1 },
        { id: "tmm01", is_meta: true, is_supermeta: true, unlocked_if: { puzzles_solved: 16 } },
      ],
      gates: [
        { id: "tmg01" }, // Opened I Kid Ewe Knot (Weirdo Threaded Doodads)
        { id: "tmg02" }, // Opened Stitchy Situation (Weirdo Threaded Doodads)
        { id: "tmg03" }, // Picked up Cross Dash Word
      ],
      interactions: [
        {
          id: "unmask_the_killer",
          title: "Unmask the Killer",
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
      final_puzzle_slot: '',
      puzzles: [
        // TODO: single piece of endgame?
      ],
      interactions: [
        {
          id: "the_vault",
          title: "The Vault",
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

export default HUNT;
