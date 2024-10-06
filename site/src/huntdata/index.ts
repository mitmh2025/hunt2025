// This is the canonical description of the structure of our hunt, with a full
// enumeration of rounds, puzzles, interactions, and the dependency structure.
import { type Hunt, type PuzzleSlot } from "./types";

// prettier-ignore
const HUNT: Hunt = {
  rounds: [
    {
      slug: "the_missing_diamond", // mounted at root
      title: "The Missing Diamond",
      puzzles: [
        // slots (28 feeders, 4 metas, 1 super)
        // TODO: determine if we should start with 8-10 puzzles unlocked & no
        // unlock currency, or with nothing unlocked, a few puzzles
        // unlockable, and some amount of starting currency (to teach people
        // how to use the mechanism from the get-go).
        { id: "sdp01", unlocked_if: [] }, // unlocked by default
        { id: "sdp02", unlocked_if: [] },
        { id: "sdp03", unlocked_if: [] },
        { id: "sdp04", unlocked_if: [] },
        { id: "sdp05", unlocked_if: [] },
        { id: "sdp06", unlocked_if: [] },
        { id: "sdp07", unlocked_if: [] },
        { id: "sdp08", unlocked_if: [] },
        { id: "sdp09", unlockable_if: { puzzles_unlocked: 8 }, unlock_cost: 1 }, // initially visible
        { id: "sdp10", unlockable_if: { puzzles_unlocked: 8 }, unlock_cost: 1 }, // initially visible
        { id: "sdp11", unlockable_if: { puzzles_unlocked: 8 }, unlock_cost: 1 }, // initially visible
        { id: "sdp12", unlockable_if: { puzzles_unlocked: 9 }, unlock_cost: 1 },
        { id: "sdp13", unlockable_if: { puzzles_unlocked: 10 }, unlock_cost: 1 },
        { id: "sdp14", unlockable_if: { puzzles_unlocked: 11 }, unlock_cost: 1 },
        { id: "sdp15", unlockable_if: { puzzles_unlocked: 12 }, unlock_cost: 1 },
        { id: "sdp16", unlockable_if: { puzzles_unlocked: 13 }, unlock_cost: 1 },
        { id: "sdp17", unlockable_if: { puzzles_unlocked: 14 }, unlock_cost: 1 },
        { id: "sdp18", unlockable_if: { puzzles_unlocked: 15 }, unlock_cost: 1 },
        { id: "sdp19", unlockable_if: { puzzles_unlocked: 16 }, unlock_cost: 1 },
        { id: "sdp20", unlockable_if: { puzzles_unlocked: 17 }, unlock_cost: 1 },
        { id: "sdp21", unlockable_if: { puzzles_unlocked: 18 }, unlock_cost: 1 },
        { id: "sdp22", unlockable_if: { puzzles_unlocked: 19 }, unlock_cost: 1 },
        { id: "sdp23", unlockable_if: { puzzles_unlocked: 20 }, unlock_cost: 1 },
        { id: "sdp24", unlockable_if: { puzzles_unlocked: 21 }, unlock_cost: 1 },
        { id: "sdp25", unlockable_if: { puzzles_unlocked: 22 }, unlock_cost: 1 },
        { id: "sdp26", unlockable_if: { puzzles_unlocked: 23 }, unlock_cost: 1 },
        { id: "sdp27", unlockable_if: { puzzles_unlocked: 24 }, unlock_cost: 1 },
        { id: "sdp28", unlockable_if: { puzzles_unlocked: 25 }, unlock_cost: 1 },
        {
          // Boardwalk (meta)
          id: "sdm01",
          slug: "the_boardwalk",
          is_meta: true,
          unlocked_if: {
            puzzles_unlocked: 5,
            slots: [
              "sdp01",
              "sdp05",
              "sdp09",
              "sdp13",
              "sdp17",
              "sdp21",
              "sdp25",
            ],
          },
        },
        {
          // Jewelry Store (meta)
          id: "sdm02",
          slug: "the_jewelry_store",
          is_meta: true,
          unlocked_if: {
            puzzles_unlocked: 5,
            slots: [
              "sdp02",
              "sdp06",
              "sdp10",
              "sdp14",
              "sdp18",
              "sdp22",
              "sdp26",
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
              "sdp03",
              "sdp07",
              "sdp11",
              "sdp15",
              "sdp19",
              "sdp23",
              "sdp27",
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
              "sdp04",
              "sdp08",
              "sdp12",
              "sdp16",
              "sdp20",
              "sdp24",
              "sdp28",
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
          id: "sdm05",
          is_meta: true,
          unlocked_if: [
            { interaction_completed: "interview_at_the_boardwalk" },
            { interaction_completed: "interview_at_the_jewelry_store" },
            { interaction_completed: "interview_at_the_casino" },
            { interaction_completed: "interview_at_the_art_gallery" },
          ],
        }, // Where is the Diamond? (super)
      ],
      interactions: [
        // These four interviews are the MATE-style in-site interactions which
        // become available after each of the four metas which open a side
        // investigation.  Each should become immediately available to teams upon
        // solving the corresponding metapuzzle.
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
          // This is a brief in-person interaction which is expected to happen
          // after teams solve the Missing Diamond super but before they go on the
          // funaround.
          id: "meet_billie",
          unlock_if: [{ slot_solved: "sdm05" }],
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
        { id: "sop01", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1, slug: "an_exchange_of_vows" }, // TODO: this slug may not go in this spot
        { id: "sop02", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1 },
        { id: "sop03", unlockable_if: { round_unlocked: "stakeout" }, unlock_cost: 1 },
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
        { slot_solved: "sdm01" },
        { interaction_completed: "interview_at_the_boardwalk" },
      ],
    },
    {
      slug: "paper_trail",
      title: "Paper Trail",
      puzzles: [
        // 17 feeders, 8 metas, 1 super
        { id: "ptp01", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1 },
        { id: "ptp02", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1 },
        { id: "ptp03", unlockable_if: { round_unlocked: "paper_trail" }, unlock_cost: 1 },
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
        { id: "ptp17", unlockable_if: { puzzles_unlocked: 14 }, unlock_cost: 1 },
        { id: "ptm01", is_meta: true, unlocked_if: { round_unlocked: "paper_trail" }, slug: "shell_corporation_1" }, // meta 1
        { id: "ptm02", is_meta: true, unlocked_if: { round_unlocked: "paper_trail" }, slug: "shell_corporation_2" }, // meta 2
        { id: "ptm03", is_meta: true, unlocked_if: { round_unlocked: "paper_trail" }, slug: "shell_corporation_3" }, // meta 3
        { id: "ptm04", is_meta: true, unlocked_if: { round_unlocked: "paper_trail" }, slug: "shell_corporation_4" }, // meta 4
        { id: "ptm05", is_meta: true, unlocked_if: { round_unlocked: "paper_trail" }, slug: "shell_corporation_5" }, // meta 5
        { id: "ptm06", is_meta: true, unlocked_if: { round_unlocked: "paper_trail" }, slug: "shell_corporation_6" }, // meta 6
        { id: "ptm07", is_meta: true, unlocked_if: { round_unlocked: "paper_trail" }, slug: "shell_corporation_7" }, // meta 7
        { id: "ptm08", is_meta: true, unlocked_if: { round_unlocked: "paper_trail" }, slug: "shell_corporation_8" }, // meta 8
        {
          id: "ptm09", // supermeta
          is_meta: true,
          unlocked_if: {
            // As written, this unlocks when all 8 metas are solved.
            // TODO: determine if we want to release the super on some other condition?
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
        { slot_solved: "sdm02" },
        { interaction_completed: "interview_at_the_jewelry_store" },
      ],
    },
    {
      slug: "background_check",
      title: "Background Check",
      puzzles: [
        // 14 feeders, 3 metas, 1 super
        // TODO: figure out exactly when the metas/super should actually be
        // released, since dropping the metas immediately would reveal story
        // that the puzzle solves are supposed to reward solvers with
        { id: "bgp01", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1 },
        { id: "bgp02", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1 },
        { id: "bgp03", unlockable_if: { round_unlocked: "background_check" }, unlock_cost: 1 },
        { id: "bgp04", unlockable_if: { puzzles_unlocked: 1 }, unlock_cost: 1 },
        { id: "bgp05", unlockable_if: { puzzles_unlocked: 2 }, unlock_cost: 1 },
        { id: "bgp06", unlockable_if: { puzzles_unlocked: 3 }, unlock_cost: 1 },
        { id: "bgp07", unlockable_if: { puzzles_unlocked: 4 }, unlock_cost: 1 },
        { id: "bgp08", unlockable_if: { puzzles_unlocked: 5 }, unlock_cost: 1 },
        { id: "bgp09", unlockable_if: { puzzles_unlocked: 6 }, unlock_cost: 1 },
        { id: "bgp10", unlockable_if: { puzzles_unlocked: 7 }, unlock_cost: 1 },
        { id: "bgp11", unlockable_if: { puzzles_unlocked: 8 }, unlock_cost: 1 },
        { id: "bgp12", unlockable_if: { puzzles_unlocked: 9 }, unlock_cost: 1 },
        { id: "bgp13", unlockable_if: { puzzles_unlocked: 10 }, unlock_cost: 1 },
        { id: "bgp14", unlockable_if: { puzzles_unlocked: 11 }, unlock_cost: 1 },
        { id: "bgm01", is_meta: true, unlocked_if: { round_unlocked: "background_check" } }, // meta 1
        { id: "bgm02", is_meta: true, unlocked_if: { round_unlocked: "background_check" } }, // meta 2
        { id: "bgm03", is_meta: true, unlocked_if: { round_unlocked: "background_check" } }, // meta 3
        { id: "bgm04", is_meta: true, unlocked_if: { round_unlocked: "background_check" } }, // supermeta
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
        { slot_solved: "sdm04" },
        { interaction_completed: "interview_at_the_art_gallery" },
      ],
    },
    {
      slug: "the_murder",
      title: "The Murder",
      puzzles: [
        // 24 feeders + 1 meta
        { id: "dtp01", unlockable_if: { round_unlocked: "the_murder" }, unlock_cost: 1 },
        { id: "dtp02", unlockable_if: { round_unlocked: "the_murder" }, unlock_cost: 1 },
        { id: "dtp03", unlockable_if: { round_unlocked: "the_murder" }, unlock_cost: 1 },
        { id: "dtp04", unlockable_if: { puzzles_unlocked: 1 }, unlock_cost: 1 },
        { id: "dtp05", unlockable_if: { puzzles_unlocked: 2 }, unlock_cost: 1 },
        { id: "dtp06", unlockable_if: { puzzles_unlocked: 3 }, unlock_cost: 1 },
        { id: "dtp07", unlockable_if: { puzzles_unlocked: 4 }, unlock_cost: 1 },
        { id: "dtp08", unlockable_if: { puzzles_unlocked: 5 }, unlock_cost: 1 },
        { id: "dtp09", unlockable_if: { puzzles_unlocked: 6 }, unlock_cost: 1 },
        { id: "dtp10", unlockable_if: { puzzles_unlocked: 7 }, unlock_cost: 1 },
        { id: "dtp11", unlockable_if: { puzzles_unlocked: 8 }, unlock_cost: 1 },
        { id: "dtp12", unlockable_if: { puzzles_unlocked: 9 }, unlock_cost: 1 },
        { id: "dtp13", unlockable_if: { puzzles_unlocked: 10 }, unlock_cost: 1 },
        { id: "dtp14", unlockable_if: { puzzles_unlocked: 11 }, unlock_cost: 1 },
        { id: "dtp15", unlockable_if: { puzzles_unlocked: 12 }, unlock_cost: 1 },
        { id: "dtp16", unlockable_if: { puzzles_unlocked: 13 }, unlock_cost: 1 },
        { id: "dtp17", unlockable_if: { puzzles_unlocked: 14 }, unlock_cost: 1 },
        { id: "dtp18", unlockable_if: { puzzles_unlocked: 15 }, unlock_cost: 1 },
        { id: "dtp19", unlockable_if: { puzzles_unlocked: 16 }, unlock_cost: 1 },
        { id: "dtp20", unlockable_if: { puzzles_unlocked: 17 }, unlock_cost: 1 },
        { id: "dtp21", unlockable_if: { puzzles_unlocked: 18 }, unlock_cost: 1 },
        { id: "dtp22", unlockable_if: { puzzles_unlocked: 19 }, unlock_cost: 1 },
        { id: "dtp23", unlockable_if: { puzzles_unlocked: 20 }, unlock_cost: 1 },
        { id: "dtp24", unlockable_if: { puzzles_unlocked: 21 }, unlock_cost: 1 },
        { id: "dtm01", unlocked_if: { puzzles_unlocked: 16 } }, // TODO: figure out when this should actually release
      ],
      interactions: [
        {
          id: "unmask_the_killer",
          unlock_if: [
            { slot_solved: "dtm01" }, // Dead Thief supermeta
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

type SlotLookup = {
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
