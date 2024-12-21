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
      final_puzzle_slot: '',
      puzzles: [],
      gates: [
        { id: "hunt_started" }, // Hunt started.  Nothing is unlocked until this gate is satisfied.
        { id: "mdg01" }, // Picked up Educational Rite of Passage from Gala
      ],
      interactions: [
      ],
      unlock_if: [
        // These are the conditions for the /round/ page being visible.
        // The initial round should be open only once we mark the "hunt
        // started" gate as satisfied.
        { gate_satisfied: "hunt_started" },
      ],
    },
    {
      slug: "illegal_search",
      title: "The Illegal Search",
      final_puzzle_slot: 'ism03',
      puzzles: [
        // The first 5 puzzles are unlockable once they are discovered in the UI.
        { id: "isp01", unlockable_if: { gate_satisfied: "isg01" }, unlock_cost: 1, slug: "kotei_no_ango" },
        { id: "isp02", unlockable_if: { gate_satisfied: "isg02" }, unlock_cost: 1, slug: "cross_spread" },
        { id: "isp03", unlockable_if: { gate_satisfied: "isg03" }, unlock_cost: 1, slug: "isp03" },
        { id: "isp04", unlockable_if: { gate_satisfied: "isg04" }, unlock_cost: 1, slug: "this_is_just_a_test" },
        { id: "isp05", unlockable_if: { gate_satisfied: "isg05" }, unlock_cost: 1, slug: "isp05" },
        // The next 5 puzzles are unlockable once they are discovered in the
        // UI, but will not be discoverable until the corresponding lock is
        // satisfied.
        { id: "isp06", unlockable_if: { gate_satisfied: "isg11" }, unlock_cost: 1, slug: "jargon" },
        { id: "isp07", unlockable_if: { gate_satisfied: "isg12" }, unlock_cost: 1, slug: "cahfee_regular" },
        { id: "isp08", unlockable_if: { gate_satisfied: "isg13" }, unlock_cost: 1, slug: "the_center_is_in_plain_sight" },
        { id: "isp09", unlockable_if: { gate_satisfied: "isg14" }, unlock_cost: 1, slug: "no_accounting_for_taste" },
        { id: "isp10", unlockable_if: { gate_satisfied: "isg15" }, unlock_cost: 1, slug: "south_americant" },

        // The next 8 puzzles are only discoverable once the first meta is
        // solved and they are discovered in the UI.
        { id: "isp11", unlockable_if: [{ gate_satisfied: "isg18" }], unlock_cost: 1, slug: "isp11" },
        { id: "isp12", unlockable_if: [{ gate_satisfied: "isg19" }], unlock_cost: 1, slug: "isp12" },
        { id: "isp13", unlockable_if: [{ gate_satisfied: "isg20" }], unlock_cost: 1, slug: "isp13" },
        { id: "isp14", unlockable_if: [{ gate_satisfied: "isg21" }], unlock_cost: 1, slug: "isp14" },
        { id: "isp15", unlockable_if: [{ gate_satisfied: "isg22" }], unlock_cost: 1, slug: "isp15" },
        { id: "isp16", unlockable_if: [{ gate_satisfied: "isg23" }], unlock_cost: 1, slug: "isp16" },
        { id: "isp17", unlockable_if: [{ gate_satisfied: "isg24" }], unlock_cost: 1, slug: "isp17" },
        { id: "isp18", unlockable_if: [{ gate_satisfied: "isg25" }], unlock_cost: 1, slug: "isp18" },

        { id: "ism01", is_meta: true, unlocked_if: [{ gate_satisfied: "isg00" }], slug: "papas_bookcase" }, // Bookcase
        { id: "ism02", is_meta: true, unlocked_if: [{ slot_solved: "ism01" }, { gate_satisfied: "isg17" }], slug: "papas_stash" },
        //{ id: "ism03", is_meta: true, unlocked_if: [{ slot_solved: "ism02" }, { gate_satisfied: "isg26" }] },
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
      ],
      interactions: [],
      unlock_if: [],
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
