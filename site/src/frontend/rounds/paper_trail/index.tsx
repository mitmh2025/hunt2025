import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import { Root } from "./Layout";
import PaperTrailBody from "./PaperTrailBody";
import object_01_locked from "./assets/01/1-locked.png";
import object_01_solved from "./assets/01/1-solved.png";
import object_01_unlocked from "./assets/01/1-unlocked.png";
import object_02_locked from "./assets/02/2-locked.png";
import object_02_solved from "./assets/02/2-solved.png";
import object_02_unlocked from "./assets/02/2-unlocked.png";
import object_03_locked from "./assets/03/3-locked.png";
import object_03_solved from "./assets/03/3-solved.png";
import object_03_unlocked from "./assets/03/3-unlocked.png";
import object_04_locked from "./assets/04/4-locked.png";
import object_04_solved from "./assets/04/4-solved.png";
import object_04_unlocked from "./assets/04/4-unlocked.png";
import object_05_locked from "./assets/05/5-locked.png";
import object_05_solved from "./assets/05/5-solved.png";
import object_05_unlocked from "./assets/05/5-unlocked.png";
import object_06_locked from "./assets/06/6-locked.png";
import object_06_solved from "./assets/06/6-solved.png";
import object_06_unlocked from "./assets/06/6-unlocked.png";
import object_07_locked from "./assets/07/7-locked.png";
import object_07_solved from "./assets/07/7-solved.png";
import object_07_unlocked from "./assets/07/7-unlocked.png";
import object_08_locked from "./assets/08/8-locked.png";
import object_08_solved_12_solved_too from "./assets/08/8-solved-spill.png";
import object_08_solved from "./assets/08/8-solved.png";
import object_08_unlocked from "./assets/08/8-unlocked.png";
import object_09_locked from "./assets/09/9-locked.png";
import object_09_solved from "./assets/09/9-solved.png";
import object_09_unlocked from "./assets/09/9-unlocked.png";
import object_10_locked from "./assets/10/10-locked.png";
import object_10_solved from "./assets/10/10-solved.png";
import object_10_unlocked from "./assets/10/10-unlocked.png";
import object_11_locked from "./assets/11/11-locked.png";
import object_11_solved from "./assets/11/11-solved.png";
import object_11_unlocked from "./assets/11/11-unlocked.png";
import object_12_locked from "./assets/12/12-locked.png";
import object_12_solved from "./assets/12/12-solved.png";
import object_12_unlocked from "./assets/12/12-unlocked.png";
import object_13_locked from "./assets/13/13-locked.png";
import object_13_solved from "./assets/13/13-solved.png";
import object_13_unlocked from "./assets/13/13-unlocked.png";
import object_14_locked from "./assets/14/14-locked.png";
import object_14_solved from "./assets/14/14-solved.png";
import object_14_unlocked from "./assets/14/14-unlocked.png";
import object_15_locked from "./assets/15/15-locked.png";
import object_15_solved from "./assets/15/15-solved.png";
import object_15_unlocked from "./assets/15/15-unlocked.png";
import object_16_locked from "./assets/16/16-locked.png";
import object_16_solved from "./assets/16/16-solved.png";
import object_16_unlocked from "./assets/16/16-unlocked.png";
import object_17_locked from "./assets/17/17-locked.png";
import object_17_solved from "./assets/17/17-solved.png";
import object_17_unlocked from "./assets/17/17-unlocked.png";
import book_0 from "./assets/book/book-0.png";
import book_1 from "./assets/book/book-1.png";
import book_2 from "./assets/book/book-2.png";
import book_3 from "./assets/book/book-3.png";
import book_4 from "./assets/book/book-4.png";
import book_5 from "./assets/book/book-5.png";
import book_6 from "./assets/book/book-6.png";
import book_7 from "./assets/book/book-7.png";
import book_8 from "./assets/book/book-8.png";
import super_solved from "./assets/metas/loupe-solved.png";
import super_unlocked from "./assets/metas/loupe-unlocked.png";
import meta_1_solved from "./assets/metas/meta-1-solved.png";
import meta_1_unlocked from "./assets/metas/meta-1-unlocked.png";
import meta_2_solved from "./assets/metas/meta-2-solved.png";
import meta_2_unlocked from "./assets/metas/meta-2-unlocked.png";
import meta_3_solved from "./assets/metas/meta-3-solved.png";
import meta_3_unlocked from "./assets/metas/meta-3-unlocked.png";
import meta_4_solved from "./assets/metas/meta-4-solved.png";
import meta_4_unlocked from "./assets/metas/meta-4-unlocked.png";
import meta_5_solved from "./assets/metas/meta-5-solved.png";
import meta_5_unlocked from "./assets/metas/meta-5-unlocked.png";
import meta_6_solved from "./assets/metas/meta-6-solved.png";
import meta_6_unlocked from "./assets/metas/meta-6-unlocked.png";
import meta_7_solved from "./assets/metas/meta-7-solved.png";
import meta_7_unlocked from "./assets/metas/meta-7-unlocked.png";
import meta_8_solved from "./assets/metas/meta-8-solved.png";
import meta_8_unlocked from "./assets/metas/meta-8-unlocked.png";
import {
  type PaperTrailState,
  type PaperTrailItem,
  type PaperTrailObject,
  type PaperTrailPuzzleObject,
} from "./types";

const SUBSIDIARY_SLOTS = [
  "ptp01",
  "ptp02",
  "ptp03",
  "ptp04",
  "ptp05",
  "ptp06",
  "ptp07",
  "ptp08",
  "ptp09",
  "ptp10",
  "ptp11",
  "ptp12",
  "ptp13",
  "ptp14",
  "ptp15",
  "ptp16",
  "ptp17",
];

const SHELL_SLOTS = [
  "ptm01",
  "ptm02",
  "ptm03",
  "ptm04",
  "ptm05",
  "ptm06",
  "ptm07",
  "ptm08",
];

function lookupSlug(slot: string, teamState: TeamState): string | undefined {
  const round = teamState.rounds.paper_trail;
  const slotObj = round ? round.slots[slot] : undefined;
  return slotObj?.slug;
}

function oldItemForSlot(
  slot: string,
  teamState: TeamState,
): PaperTrailItem | [] {
  const slug = lookupSlug(slot, teamState);
  if (!slug) return [];

  const puzzleDefinition = PUZZLES[slug];
  const puzzleState = teamState.puzzles[slug];
  const title = puzzleDefinition?.title ?? `Stub puzzle for slot ${slot}`;
  if (!puzzleState) {
    // This should not happen, but hard to prove to the typechecker.
    return [];
  }

  return {
    title,
    slug,
  };
}

function lookupValue<T>(
  descriptor: { locked?: T; unlocked: T; solved: T } | T,
  state: "locked" | "unlocked" | "solved",
): T {
  if (
    descriptor &&
    typeof descriptor === "object" &&
    "unlocked" in descriptor
  ) {
    return descriptor[state] ?? descriptor.unlocked;
  } else {
    return descriptor;
  }
}

type ObjectPosition =
  | {
      left: number;
      top: number;
    }
  | {
      left: number;
      bottom: number;
    }
  | {
      right: number;
      top: number;
    }
  | {
      right: number;
      bottom: number;
    };

type ObjectDescriptor = {
  asset: {
    locked?: string; // not present for metas
    unlocked: string;
    solved: string;
  };
  alt: string | { locked?: string; unlocked: string; solved: string };
  pos:
    | ObjectPosition
    | {
        locked?: ObjectPosition;
        unlocked: ObjectPosition;
        solved: ObjectPosition;
      };
  width: number | { locked?: number; unlocked: number; solved: number };
  filter?: string;
};

// Unlock order:
// 1: receipts
// 2: pencil cup
// 3: tea cup
// 4: cabinet
// 5: phone
// 6: pen
// 7: eraser
// 8: glasses
// 9: clock
// 10: crumpled
// 11: sandwich
// 12: coffee
// 13: chips
// 14: fly
// 15: old fashioned
// 16: tie
// 17: bottle
// Metas: 8 drop at once
// Super: once 8 metas are completed

type PaperTrailSlot = (typeof STACK_ORDER)[number];
const objectProperties: Record<
  Exclude<PaperTrailSlot, "notes">,
  ObjectDescriptor
> = {
  ptp01: {
    // 1: receipts
    asset: {
      locked: object_01_locked,
      unlocked: object_01_unlocked,
      solved: object_01_solved,
    },
    alt: "Brass receipt holder with pile of receipts",
    pos: {
      top: 600,
      left: 0,
    },
    width: 378,
  },
  ptp02: {
    // 2: pencil cup
    asset: {
      locked: object_02_locked,
      unlocked: object_02_unlocked,
      solved: object_02_solved,
    },
    alt: "Ceramic pencil cup with several #2 pencils",
    pos: {
      top: 482,
      right: 230,
    },
    width: 180,
  },
  ptp03: {
    // 3: tea cup
    asset: {
      locked: object_03_locked,
      unlocked: object_03_unlocked,
      solved: object_03_solved,
    },
    alt: "Tea cup with teabag string and tag on the side",
    pos: {
      bottom: 10,
      left: 280,
    },
    width: 246,
  },
  ptp04: {
    // 4: cabinet
    asset: {
      locked: object_04_locked,
      unlocked: object_04_unlocked,
      solved: object_04_solved,
    },
    alt: "File cabinet",
    pos: {
      top: 24,
      right: 0,
    },
    width: 355.5,
  },
  ptp05: {
    // 5: phone
    asset: {
      locked: object_05_locked,
      unlocked: object_05_unlocked,
      solved: object_05_solved,
    },
    alt: "Black rotary telephone",
    pos: {
      bottom: 0,
      right: 0,
    },
    width: 329,
  },
  ptp06: {
    // 6: pen
    asset: {
      locked: object_06_locked,
      unlocked: object_06_unlocked,
      solved: object_06_solved,
    },
    alt: "Fountain pen",
    pos: {
      left: 702,
      top: 600,
    },
    width: 308,
  },
  ptp07: {
    // TODO: update for different widths
    // 7: eraser
    asset: {
      locked: object_07_locked,
      unlocked: object_07_unlocked,
      solved: object_07_solved,
    },
    alt: "Pink rubber eraser",
    pos: {
      left: 140,
      bottom: 2,
    },
    width: 145,
  },
  ptp08: {
    // 8: glasses
    asset: {
      locked: object_08_locked,
      unlocked: object_08_unlocked,
      solved: object_08_solved,
    },
    alt: "Pair of spectacles",
    pos: {
      left: 682,
      top: 690,
    },
    width: 320,
  },
  ptp09: {
    // 9: clock
    asset: {
      locked: object_09_locked,
      unlocked: object_09_unlocked,
      solved: object_09_solved,
    },
    alt: "Wall clock",
    pos: {
      left: 1180,
      top: 75,
    },
    width: 259,
  },
  ptp10: {
    // 10: crumpled
    asset: {
      locked: object_10_locked,
      unlocked: object_10_unlocked,
      solved: object_10_solved,
    },
    alt: "Crumpled ball of paper",
    pos: {
      left: 520,
      top: 530,
    },
    width: 150,
  },
  ptp11: {
    // TODO: update substantially for width change esp on solved
    // 11: sandwich
    asset: {
      locked: object_11_locked,
      unlocked: object_11_unlocked,
      solved: object_11_solved,
    },
    alt: "Half eaten sandwich with wax paper",
    pos: {
      right: 0,
      top: 480,
    },
    width: 280,
  },
  ptp12: {
    // TODO: update substantially for width change esp on solved
    // 12: coffee
    asset: {
      locked: object_12_locked,
      unlocked: object_12_unlocked,
      solved: object_12_solved,
    },
    alt: {
      locked: "Full coffee mug",
      unlocked: "Full coffee mug",
      solved: "Knocked-over coffee mug with coffee spilled onto the desk",
    },
    pos: {
      top: 584,
      right: 640,
    },
    width: {
      locked: 200,
      unlocked: 200,
      solved: 930,
    },
  },
  ptp13: {
    // TODO: update substantially for width change esp on solved
    // 13: chips
    asset: {
      locked: object_13_locked,
      unlocked: object_13_unlocked,
      solved: object_13_solved,
    },
    alt: {
      locked: "Bag of potato chips",
      unlocked: "Bag of potato chips",
      solved: "Empty bag of potato chips with crumbs",
    },
    pos: {
      right: 400,
      top: 410,
    },
    width: 291,
  },
  ptp14: {
    // 14: fly
    asset: {
      locked: object_14_locked,
      unlocked: object_14_unlocked,
      solved: object_14_solved,
    },
    alt: "Flying housefly",
    pos: {
      right: 420,
      top: 300,
    },
    width: 333,
    filter: "drop-shadow(0px 0px 9px #ffffefaa)", // TODO: only apply on hover?
  },
  ptp15: {
    // 15: old fashioned
    asset: {
      locked: object_15_locked,
      unlocked: object_15_unlocked,
      solved: object_15_solved,
    },
    alt: "Old-fashioned-style glass, empty except for a melting ice cube",
    pos: {
      bottom: 20,
      right: 380,
    },
    width: 180,
  },
  ptp16: {
    // 16: tie
    asset: {
      locked: object_16_locked,
      unlocked: object_16_unlocked,
      solved: object_16_solved,
    },
    alt: "Green silk necktie, loosened but still tied",
    pos: {
      right: 345,
      bottom: 0,
    },
    width: 500,
  },
  ptp17: {
    // 17: bottle
    asset: {
      locked: object_17_locked,
      unlocked: object_17_unlocked,
      solved: object_17_solved,
    },
    alt: "Mostly-empty tall brown glass bottle",
    pos: {
      left: 0,
      top: 124,
    },
    width: 152,
  },
  ptm01: {
    asset: {
      unlocked: meta_1_unlocked,
      solved: meta_1_solved,
    },
    alt: "Ledger: Tasty Food Processors",
    pos: {
      left: 160,
      top: 70,
    },
    width: 168,
  },
  ptm02: {
    asset: {
      unlocked: meta_2_unlocked,
      solved: meta_2_solved,
    },
    alt: "Ledger: Triple A Accounting, LLC",
    pos: {
      left: 285,
      top: 165,
    },
    width: 142,
  },
  ptm03: {
    asset: {
      unlocked: meta_3_unlocked,
      solved: meta_3_solved,
    },
    alt: "Ledger: Superior Stonework",
    pos: {
      left: 390,
      top: 35,
    },
    width: 151,
  },
  ptm04: {
    asset: {
      unlocked: meta_4_unlocked,
      solved: meta_4_solved,
    },
    alt: "Ledger: Crystal-Clear Refinery",
    pos: {
      left: 504,
      top: 55,
    },
    width: 169,
  },
  ptm05: {
    asset: {
      unlocked: meta_5_unlocked,
      solved: meta_5_solved,
    },
    alt: "Ledger: Stellar Public Relations",
    pos: {
      left: 588,
      top: 80,
    },
    width: 184,
  },
  ptm06: {
    asset: {
      unlocked: meta_6_unlocked,
      solved: meta_6_solved,
    },
    alt: "Ledger: The MITropolis Times",
    pos: {
      left: 670,
      top: 94,
    },
    width: 212,
  },
  ptm07: {
    asset: {
      unlocked: meta_7_unlocked,
      solved: meta_7_solved,
    },
    alt: "Ledger: Shingles, Ltd",
    pos: {
      left: 744,
      top: 122,
    },
    width: 252,
  },
  ptm08: {
    asset: {
      unlocked: meta_8_unlocked,
      solved: meta_8_solved,
    },
    alt: "Ledger: Zoological Garden",
    pos: {
      left: 820,
      top: 164,
    },
    width: 325,
  },
  ptm09: {
    asset: {
      unlocked: super_unlocked,
      solved: super_solved,
    },
    alt: "Loupe with three lenses",
    pos: {
      left: 230,
      top: 558,
    },
    width: 280,
  },
};

// What is the expected z stacking order of all these objects? (first on bottom, last on top)
// TODO: actually determine what this should be
const STACK_ORDER = [
  "ptp17", // 17: bottle
  "ptp04", // 4: cabinet
  "ptm01", // Meta 1
  "ptm02", // Meta 2
  "ptm03", // Meta 3
  "ptm04", // Meta 4
  "ptm05", // Meta 5
  "ptm06", // Meta 6
  "ptm07", // Meta 7
  "ptm08", // Meta 8
  "ptp12", // 12: coffee
  "ptp06", // 6: pen
  "ptm09", // Super: loupe
  "ptp01", // 1: receipts
  "notes", // Not a puzzle, but the notes book
  "ptp07", // 7: eraser
  "ptp09", // 9: clock
  "ptp11", // 11: sandwich
  "ptp03", // 3: tea cup
  "ptp08", // 8: glasses
  "ptp13", // 13: chips
  "ptp14", // 14: fly
  "ptp16", // 16: tie
  "ptp02", // 2: pencil cup
  "ptp05", // 5: phone
  "ptp10", // 10: crumpled
  "ptp15", // 15: old fashioned
] as const;

function genNotes(teamState: TeamState): PaperTrailObject {
  const round = teamState.rounds.paper_trail;
  let progress = 0;
  if (round) {
    const solves = Object.entries(round.slots)
      .filter(([_slotId, slot]) => {
        return !slot.is_meta;
      })
      .map(([_slotId, slot]) => {
        const slug = slot.slug;
        const puzzleState = teamState.puzzles[slug];
        if (puzzleState?.answer !== undefined) {
          return 1;
        }
        return 0;
      });
    const solveCount = solves.reduce((acc: number, next) => {
      return acc + next;
    }, 0);
    progress = Math.min(Math.floor(solveCount / 2), 8);
  }
  const BOOK_IMAGE = [
    book_0,
    book_1,
    book_2,
    book_3,
    book_4,
    book_5,
    book_6,
    book_7,
    book_8,
  ];
  return {
    asset: BOOK_IMAGE[progress] ?? book_0,
    alt: "The Paper Trail book of notes",
    width: 645,
    pos: {
      bottom: 16,
      left: 540,
    },
    title: "Notes",
    href: "", // TODO: what does this do?
  };
}

function genImagery(teamState: TeamState): PaperTrailObject[] {
  const round = teamState.rounds.paper_trail;
  if (!round) return [];

  const imagery = STACK_ORDER.flatMap((slotId: PaperTrailSlot) => {
    if (slotId === "notes") {
      return [genNotes(teamState)];
    }

    // Look up the slot in the teamstate.
    const slot = round.slots[slotId];
    // If it's not there, this slot isn't unlocked yet
    if (!slot) return [];
    const slug = slot.slug;
    const puzzleDefinition = PUZZLES[slug];
    const properties = objectProperties[slotId];
    const puzzleState = teamState.puzzles[slug];
    if (!puzzleState) return [];
    const unlockState = puzzleState.locked;
    if (unlockState === "locked") return [];
    const state =
      puzzleState.answer !== undefined
        ? ("solved" as const)
        : unlockState === "unlockable"
          ? ("locked" as const)
          : ("unlocked" as const);
    let asset = lookupValue(properties.asset, state);
    if (slotId === "ptp08") {
      // If the glasses slot and the coffee slot are both solved, use a custom (splashed) image for the glasses
      const coffeeSlotId = "ptp12";
      const coffeeSlot = round.slots[coffeeSlotId];
      if (coffeeSlot) {
        const coffeeSlug = coffeeSlot.slug;
        const coffeePuzzleState = teamState.puzzles[coffeeSlug];
        if (
          coffeePuzzleState &&
          coffeePuzzleState.locked === "unlocked" &&
          coffeePuzzleState.answer
        ) {
          asset = object_08_solved_12_solved_too;
        }
      }
    }
    const alt = lookupValue(properties.alt, state);
    const width = lookupValue(properties.width, state);
    const pos = lookupValue(properties.pos, state);
    const filter = properties.filter;
    // TODO: label_offset
    const title = puzzleDefinition?.title ?? `Stub puzzle for slot ${slotId}`;

    const obj: PaperTrailPuzzleObject = {
      asset,
      alt,
      width,
      pos,
      title,
      slug,
      filter,
      state: state === "locked" ? ("unlockable" as const) : state,
    };
    if (puzzleState.answer) {
      obj.answer = puzzleState.answer;
    }

    return [obj];
  });

  return imagery;
}

export function paperTrailState(teamState: TeamState): PaperTrailState {
  const subsidiaryItems = SUBSIDIARY_SLOTS.flatMap((slot: string) =>
    oldItemForSlot(slot, teamState),
  );
  const groups = [
    {
      label: "Subsidiary corporations",
      items: subsidiaryItems,
    },
  ];

  const shellItems = SHELL_SLOTS.flatMap((slot: string) =>
    oldItemForSlot(slot, teamState),
  );
  if (shellItems.length > 0) {
    groups.push({
      label: "Shell corporations",
      items: shellItems,
    });
  }

  const superItem = ["ptm09"].flatMap((slot: string) =>
    oldItemForSlot(slot, teamState),
  );
  if (superItem.length > 0) {
    groups.push({
      label: "The Shell Game",
      items: superItem,
    });
  }

  const imagery: PaperTrailObject[] = genImagery(teamState);
  return {
    groups,
    imagery,
  };
}

const PapertrailRoundPage = ({ teamState }: { teamState: TeamState }) => {
  const state = paperTrailState(teamState);
  const inlineScript = `window.initialPaperTrailState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)};`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <Root id="paper-trail-root">
        <PaperTrailBody state={state} teamState={teamState} />
      </Root>
    </>
  );
};

export default PapertrailRoundPage;
