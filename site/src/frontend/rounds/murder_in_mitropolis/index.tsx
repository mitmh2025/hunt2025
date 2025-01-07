import { type Placement } from "@floating-ui/react";
import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import MurderBody from "./MurderBody";
// pages for meta
import page01 from "./assets/pages/01.pdf";
import page02 from "./assets/pages/02.pdf";
import page03 from "./assets/pages/03.pdf";
import page04 from "./assets/pages/04.pdf";
import page05 from "./assets/pages/05.pdf";
import page06 from "./assets/pages/06.pdf";
import page07 from "./assets/pages/07.pdf";
import page08 from "./assets/pages/08.pdf";
import page09 from "./assets/pages/09.pdf";
import page10 from "./assets/pages/10.pdf";
import page11 from "./assets/pages/11.pdf";
import page12 from "./assets/pages/12.pdf";
import page13 from "./assets/pages/13.pdf";
import page14 from "./assets/pages/14.pdf";
import page15 from "./assets/pages/15.pdf";
import page16 from "./assets/pages/16.pdf";
import page17 from "./assets/pages/17.pdf";
import page18 from "./assets/pages/18.pdf";
import page19 from "./assets/pages/19.pdf";
import page20 from "./assets/pages/20.pdf";
import page21 from "./assets/pages/21.pdf";
import page22 from "./assets/pages/22.pdf";
import page23 from "./assets/pages/23.pdf";
import page24 from "./assets/pages/24.pdf";
import page25 from "./assets/pages/25.pdf";
import page26 from "./assets/pages/26.pdf";
import page27 from "./assets/pages/27.pdf";
import page28 from "./assets/pages/28.pdf";
import page29 from "./assets/pages/29.pdf";
import page30 from "./assets/pages/30.pdf";
import page31 from "./assets/pages/31.pdf";
import page32 from "./assets/pages/32.pdf";
import page33 from "./assets/pages/33.pdf";
import page34 from "./assets/pages/34.pdf";
import page35 from "./assets/pages/35.pdf";
import page36 from "./assets/pages/36.pdf";
import page37 from "./assets/pages/37.pdf";
import page38 from "./assets/pages/38.pdf";
import page39 from "./assets/pages/39.pdf";
import page40 from "./assets/pages/40.pdf";
import page41 from "./assets/pages/41.pdf";
import page42 from "./assets/pages/42.pdf";
import page43 from "./assets/pages/43.pdf";
import page44 from "./assets/pages/44.pdf";
import page45 from "./assets/pages/45.pdf";
import page46 from "./assets/pages/46.pdf";
import page47 from "./assets/pages/47.pdf";
import page48 from "./assets/pages/48.pdf";
import page49 from "./assets/pages/49.pdf";
import page50 from "./assets/pages/50.pdf";
import page51 from "./assets/pages/51.pdf";
import page52 from "./assets/pages/52.pdf";
import page53 from "./assets/pages/53.pdf";
import page54 from "./assets/pages/54.pdf";
// dorm
import dorm_solved_lofibeats from "./assets/windows/dorm/dorm-solved-lofibeats.png";
import dorm_solved_plant from "./assets/windows/dorm/dorm-solved-plant.png";
import dorm_solved from "./assets/windows/dorm/dorm-solved.png";
import dorm_locked from "./assets/windows/dorm/dorm-unlockable.png";
import dorm_unlocked from "./assets/windows/dorm/dorm-unlocked.png";
// meta: door to green building, light-up windows
import off_1 from "./assets/windows/green/1-off.png";
import on_1 from "./assets/windows/green/1-on.png";
import off_2 from "./assets/windows/green/2-off.png";
import on_2 from "./assets/windows/green/2-on.png";
import off_3 from "./assets/windows/green/3-off.png";
import on_3 from "./assets/windows/green/3-on.png";
import off_4 from "./assets/windows/green/4-off.png";
import on_4 from "./assets/windows/green/4-on.png";
import off_5 from "./assets/windows/green/5-off.png";
import on_5 from "./assets/windows/green/5-on.png";
import off_6 from "./assets/windows/green/6-off.png";
import on_6 from "./assets/windows/green/6-on.png";
import off_7 from "./assets/windows/green/7-off.png";
import on_7 from "./assets/windows/green/7-on.png";
import off_8 from "./assets/windows/green/8-off.png";
import on_8 from "./assets/windows/green/8-on.png";
import off_9 from "./assets/windows/green/9-off.png";
import on_9 from "./assets/windows/green/9-on.png";
import door_solved from "./assets/windows/green/green-door-solved.png";
import door_unlocked from "./assets/windows/green/green-door-unlocked.png";
// main face of stata; some solve states are bespoke
import stata_1_solved_blinds from "./assets/windows/stata/stata-1-solved-blinds.png";
import stata_1_solved_drinker from "./assets/windows/stata/stata-1-solved-drinker.png";
import stata_1_solved_hat_guy from "./assets/windows/stata/stata-1-solved-hat-guy.png";
import stata_1_solved_kissing from "./assets/windows/stata/stata-1-solved-kissing.png";
import stata_1_solved_short_woman from "./assets/windows/stata/stata-1-solved-short-woman.png";
import stata_1_solved from "./assets/windows/stata/stata-1-solved.png";
import stata_1_locked from "./assets/windows/stata/stata-1-unlockable.png";
import stata_1_unlocked from "./assets/windows/stata/stata-1-unlocked.png";
// tilted side of stata; each asset is bespoke except the fourth
import stata_2_1_solved from "./assets/windows/stata/stata-2-1-solved.png";
import stata_2_1_locked from "./assets/windows/stata/stata-2-1-unlockable.png";
import stata_2_1_unlocked from "./assets/windows/stata/stata-2-1-unlocked.png";
import stata_2_2_solved from "./assets/windows/stata/stata-2-2-solved.png";
import stata_2_2_locked from "./assets/windows/stata/stata-2-2-unlockable.png";
import stata_2_2_unlocked from "./assets/windows/stata/stata-2-2-unlocked.png";
import stata_2_3_solved from "./assets/windows/stata/stata-2-3-solved.png";
import stata_2_3_locked from "./assets/windows/stata/stata-2-3-unlockable.png";
import stata_2_3_unlocked from "./assets/windows/stata/stata-2-3-unlocked.png";
// tower
import tower_penthouse_solved from "./assets/windows/tower/tower-penthouse-solved.png";
import tower_penthouse_locked from "./assets/windows/tower/tower-penthouse-unlockable.png";
import tower_penthouse_unlocked from "./assets/windows/tower/tower-penthouse-unlocked.png";
import tower_solved_cats from "./assets/windows/tower/tower-solved-cats.png";
import tower_solved_men from "./assets/windows/tower/tower-solved-men.png";
import tower_solved_woman from "./assets/windows/tower/tower-solved-woman.png";
import tower_solved from "./assets/windows/tower/tower-solved.png";
import tower_locked from "./assets/windows/tower/tower-unlockable.png";
import tower_unlocked from "./assets/windows/tower/tower-unlocked.png";
import {
  type MurderPuzzleObject,
  type MurderPDFObject,
  type MurderState,
} from "./types";

const MURDER_SLOTS = [
  "tmp01",
  "tmp02",
  "tmp03",
  "tmp04",
  "tmp05",
  "tmp06",
  "tmp07",
  "tmp08",
  "tmp09",
  "tmp10",
  "tmp11",
  "tmp12",
  "tmp13",
  "tmp14",
  "tmp15",
  "tmp16",
  "tmp17",
  "tmp18",
  "tmp19",
  "tmp20",
  "tmp21",
  "tmp22",
  "tmp23",
  "tmp24",
  "tmm01",
] as const;

export type ObjectPosition = {
  top: number;
  left: number;
  transform?: string;
};

type ObjectDescriptor = {
  asset: {
    locked?: string;
    unlocked: string;
    solved: string;
  };
  alt: string | { locked?: string; unlocked: string; solved: string };
  pos: ObjectPosition;
  width: number;
  tooltip_placement?: Placement;
};

type MurderSlot = (typeof MURDER_SLOTS)[number];
const objectProperties: Record<MurderSlot, ObjectDescriptor> = {
  tmm01: {
    asset: {
      unlocked: door_unlocked,
      solved: door_solved,
    },
    alt: "Art deco frieze above door to MITropolis's version of the Green Building",
    pos: {
      top: 1072,
      left: 670,
    },
    width: 312,
  },
  tmp01: {
    asset: {
      locked: tower_penthouse_locked,
      unlocked: tower_penthouse_unlocked,
      solved: tower_penthouse_solved,
    },
    alt: {
      locked: "Semicircular penthouse set of windows",
      unlocked: "Semicircular penthouse set of windows",
      solved:
        "Semicircular penthouse set of windows with silhouette of two people toasting",
    },
    pos: { top: 680, left: 1132 },
    width: 147,
  },
  tmp02: {
    asset: {
      locked: tower_locked,
      unlocked: tower_unlocked,
      solved: tower_solved_men,
    },
    alt: {
      locked: "Row of windows",
      unlocked: "Row of windows",
      solved: "Row of windows with silhouette of two men",
    },
    pos: { top: 841, left: 1132 },
    width: 147,
  },
  tmp03: {
    asset: {
      locked: tower_locked,
      unlocked: tower_unlocked,
      solved: tower_solved_woman,
    },
    alt: {
      locked: "Row of windows",
      unlocked: "Row of windows",
      solved: "Row of windows with silhouette of a woman",
    },
    pos: { top: 942, left: 1132 },
    width: 147,
  },
  tmp04: {
    asset: {
      locked: tower_locked,
      unlocked: tower_unlocked,
      solved: tower_solved,
    },
    alt: "Row of windows",
    pos: { top: 1046, left: 1132 },
    width: 147,
  },
  tmp05: {
    asset: {
      locked: tower_locked,
      unlocked: tower_unlocked,
      solved: tower_solved_cats,
    },
    alt: {
      locked: "Row of windows",
      unlocked: "Row of windows",
      solved: "Row of windows with silhouette of four cats",
    },
    pos: { top: 1153, left: 1132 },
    width: 147,
  },
  tmp06: {
    asset: {
      locked: dorm_locked,
      unlocked: dorm_unlocked,
      solved: dorm_solved_plant,
    },
    alt: {
      locked: "Window",
      unlocked: "Window",
      solved: "Window with silhouette of a houseplant",
    },
    pos: { top: 918, left: 1767 },
    width: 49,
  },
  tmp07: {
    asset: {
      locked: dorm_locked,
      unlocked: dorm_unlocked,
      solved: dorm_solved,
    },
    alt: "Window",
    pos: { top: 1038, left: 1767 },
    width: 49,
  },
  tmp08: {
    asset: {
      locked: dorm_locked,
      unlocked: dorm_unlocked,
      solved: dorm_solved_lofibeats,
    },
    alt: {
      locked: "Window",
      unlocked: "Window",
      solved: "Window with silhouette of a girl sitting at a desk with a lamp",
    },
    pos: { top: 1162, left: 1767 },
    width: 49,
  },
  tmp09: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 1126, left: 272 },
    width: 64,
  },
  tmp10: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved_blinds,
    },
    alt: {
      locked: "Window",
      unlocked: "Window",
      solved: "Window with silhouette of someone peering through blinds",
    },
    pos: { top: 1126, left: 368 },
    width: 64,
  },
  tmp11: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved_drinker,
    },
    alt: {
      locked: "Window",
      unlocked: "Window",
      solved: "Window with silhouette of a woman taking a sip of a drink",
    },
    pos: { top: 1015, left: 272 },
    width: 64,
  },
  tmp12: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 1015, left: 368 },
    width: 64,
  },
  tmp13: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 889, left: 272 },
    width: 64,
  },
  tmp14: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 889, left: 368 },
    width: 64,
  },
  tmp15: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 764, left: 272 },
    width: 64,
  },
  tmp16: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved_short_woman,
    },
    alt: {
      locked: "Window",
      unlocked: "Window",
      solved: "Window with silhouette of an older woman",
    },
    pos: { top: 764, left: 368 },
    width: 64,
  },
  tmp17: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved_kissing,
    },
    alt: {
      locked: "Window",
      unlocked: "Window",
      solved: "Window with silhouette of two women kissing",
    },
    pos: { top: 644, left: 272 },
    width: 64,
  },
  tmp18: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 644, left: 368 },
    width: 64,
  },
  tmp19: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 1126, left: 466 },
    width: 64,
  },
  tmp20: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved_hat_guy,
    },
    alt: {
      locked: "Window",
      unlocked: "Window",
      solved:
        "Window with silhouette of a man with a hat holding a coupe glass",
    },
    pos: { top: 1015, left: 466 },
    width: 64,
  },
  tmp21: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 974, left: 104, transform: "rotate(-14deg)" },
    width: 64,
  },
  tmp22: {
    asset: {
      locked: stata_2_3_locked,
      unlocked: stata_2_3_unlocked,
      solved: stata_2_3_solved,
    },
    alt: {
      locked: "Window",
      unlocked: "Window",
      solved: "Window with silhouette of a heart taped to the window",
    },
    pos: { top: 911, left: 174, transform: "rotate(-14deg)" },
    width: 64,
  },
  tmp23: {
    asset: {
      locked: stata_2_2_locked,
      unlocked: stata_2_2_unlocked,
      solved: stata_2_2_solved,
    },
    alt: {
      locked: "Window",
      unlocked: "Window",
      solved: "Window with silhouette of someone wearing a fedora and coat",
    },
    pos: { top: 801, left: 70, transform: "rotate(-14deg)" },
    width: 64,
  },
  tmp24: {
    asset: {
      locked: stata_2_1_locked,
      unlocked: stata_2_1_unlocked,
      solved: stata_2_1_solved,
    },
    alt: "Window",
    pos: { top: 740, left: 148, transform: "rotate(-12deg)" },
    width: 64,
  },
};

// These PDFs are to be released in this order, three pages per feeder solved, doesn't matter which feeders were solved.
const PAGES_RELEASE_ORDER = [
  page01,
  page02,
  page03,
  page04,
  page05,
  page06,
  page07,
  page08,
  page09,
  page10,
  page11,
  page12,
  page13,
  page14,
  page15,
  page16,
  page17,
  page18,
  page19,
  page20,
  page21,
  page22,
  page23,
  page24,
  page25,
  page26,
  page27,
  page28,
  page29,
  page30,
  page31,
  page32,
  page33,
  page34,
  page35,
  page36,
  page37,
  page38,
  page39,
  page40,
  page41,
  page42,
  page43,
  page44,
  page45,
  page46,
  page47,
  page48,
  page49,
  page50,
  page51,
  page52,
  page53,
  page54,
];

type PDFDescriptor = {
  asset: {
    locked: string;
    released: string;
  };
  alt: { locked: string; released: string };
  pos: ObjectPosition;
  width: number;
};

function getPDFRow(top: number): PDFDescriptor[] {
  const leftEdge = 678;
  const spacing = 34;

  return [
    {
      asset: {
        locked: off_1,
        released: on_1,
      },
      alt: {
        locked: "Dark window",
        released: "Lighted window",
      },
      pos: { top, left: leftEdge },
      width: 25.5,
    },
    {
      asset: {
        locked: off_2,
        released: on_2,
      },
      alt: {
        locked: "Dark window",
        released: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing },
      width: 25.5,
    },
    {
      asset: {
        locked: off_3,
        released: on_3,
      },
      alt: {
        locked: "Dark window",
        released: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 2 },
      width: 25.5,
    },
    {
      asset: {
        locked: off_4,
        released: on_4,
      },
      alt: {
        locked: "Dark window",
        released: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 3 },
      width: 25.5,
    },
    {
      asset: {
        locked: off_5,
        released: on_5,
      },
      alt: {
        locked: "Dark window",
        released: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 4 },
      width: 25.5,
    },
    {
      asset: {
        locked: off_6,
        released: on_6,
      },
      alt: {
        locked: "Dark window",
        released: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 5 },
      width: 25.5,
    },
    {
      asset: {
        locked: off_7,
        released: on_7,
      },
      alt: {
        locked: "Dark window",
        released: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 6 },
      width: 25.5,
    },
    {
      asset: {
        locked: off_8,
        released: on_8,
      },
      alt: {
        locked: "Dark window",
        released: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 7 },
      width: 25.5,
    },
    {
      asset: {
        locked: off_9,
        released: on_9,
      },
      alt: {
        locked: "Dark window",
        released: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 8 },
      width: 25.5,
    },
  ];
}

const PDFWindows: PDFDescriptor[] = ([] as PDFDescriptor[]).concat(
  getPDFRow(334),
  getPDFRow(334 + 138),
  getPDFRow(334 + 138 * 2 - 3),
  getPDFRow(334 + 138 * 3 - 8),
  getPDFRow(334 + 138 * 4 - 12),
  getPDFRow(334 + 138 * 5 - 18),
);

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

function genPDFWindows(teamState: TeamHuntState): MurderPDFObject[] {
  const round = teamState.rounds.murder_in_mitropolis;
  if (!round) return [];

  const puzzles = Object.values(round.slots)
    .filter((slot) => !slot.is_meta)
    .map((slot) => teamState.puzzles[slot.slug]);

  const solvedCount = puzzles.filter((puzzle) => !!puzzle?.answer).length;
  const imagery = PDFWindows.map((window, i) => {
    const isReleased = !!(i < solvedCount * 3);

    return {
      ...window,
      asset: isReleased ? window.asset.released : window.asset.locked,
      alt: isReleased ? window.alt.released : window.alt.locked, // accessible description of the image at `asset`
      page: isReleased ? PAGES_RELEASE_ORDER[i] : undefined,
    };
  });

  return imagery;
}

function genImagery(teamState: TeamHuntState): MurderPuzzleObject[] {
  const round = teamState.rounds.murder_in_mitropolis;
  if (!round) return [];

  const imagery = MURDER_SLOTS.flatMap((slotId: MurderSlot) => {
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
    const asset = lookupValue(properties.asset, state);
    const alt = lookupValue(properties.alt, state);
    const width = lookupValue(properties.width, state);
    const pos = lookupValue(properties.pos, state);
    const tooltip_placement = lookupValue(properties.tooltip_placement, state);
    // TODO: label_offset
    const title = puzzleDefinition?.title ?? `Stub puzzle for slot ${slotId}`;
    const desc = puzzleDefinition?.initial_description;

    const obj: MurderPuzzleObject = {
      asset,
      alt,
      width,
      pos,
      title,
      desc,
      slug,
      state: state === "locked" ? ("unlockable" as const) : state,
      tooltip_placement,
    };
    if (puzzleState.answer) {
      obj.answer = puzzleState.answer;
    }

    return [obj];
  });

  return imagery;
}

export function murderState(teamState: TeamHuntState): MurderState {
  const epoch = teamState.epoch;
  const round = teamState.rounds.murder_in_mitropolis;
  if (!round) return { epoch, items: [], imagery: [], pdfImagery: [] };

  const items = MURDER_SLOTS.flatMap((slotId) => {
    const slot = round.slots[slotId];
    if (!slot) return [];
    const slug = slot.slug;
    const puzzleDefinition = PUZZLES[slug];
    return {
      title: puzzleDefinition?.title ?? `Stub puzzle for slot ${slotId}`,
      slug,
      desc: puzzleDefinition?.initial_description,
    };
  });

  const imagery: MurderPuzzleObject[] = genImagery(teamState);
  const pdfImagery = genPDFWindows(teamState);

  return { epoch, items, imagery, pdfImagery };
}

const MurderRoundPage = ({ teamState }: { teamState: TeamHuntState }) => {
  const state = murderState(teamState);
  const inlineScript = `window.initialMurderState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)};`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="murder-in-mitropolis-root">
        <MurderBody state={state} teamState={teamState} />
      </div>
    </>
  );
};

export default MurderRoundPage;
