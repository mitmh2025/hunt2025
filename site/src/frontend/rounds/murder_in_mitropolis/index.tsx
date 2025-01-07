import { type Placement } from "@floating-ui/react";
import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import MurderBody from "./MurderBody";
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
import { type PuzzleDefinition } from "src/frontend/puzzles/types";

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

type PDFDescriptor = {
  asset: {
    unlocked: string;
    solved: string;
  };
  alt: { unlocked: string; solved: string };
  pos: ObjectPosition;
  width: number;
};

function getPDFRow(top: number): PDFDescriptor[] {
  const leftEdge = 678;
  const spacing = 34;

  return [
    {
      asset: {
        unlocked: off_1,
        solved: on_1,
      },
      alt: {
        unlocked: "Dark window",
        solved: "Lighted window",
      },
      pos: { top, left: leftEdge },
      width: 25.5,
    },
    {
      asset: {
        unlocked: off_2,
        solved: on_2,
      },
      alt: {
        unlocked: "Dark window",
        solved: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing },
      width: 25.5,
    },
    {
      asset: {
        unlocked: off_3,
        solved: on_3,
      },
      alt: {
        unlocked: "Dark window",
        solved: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 2 },
      width: 25.5,
    },
    {
      asset: {
        unlocked: off_4,
        solved: on_4,
      },
      alt: {
        unlocked: "Dark window",
        solved: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 3 },
      width: 25.5,
    },
    {
      asset: {
        unlocked: off_5,
        solved: on_5,
      },
      alt: {
        unlocked: "Dark window",
        solved: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 4 },
      width: 25.5,
    },
    {
      asset: {
        unlocked: off_6,
        solved: on_6,
      },
      alt: {
        unlocked: "Dark window",
        solved: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 5 },
      width: 25.5,
    },
    {
      asset: {
        unlocked: off_7,
        solved: on_7,
      },
      alt: {
        unlocked: "Dark window",
        solved: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 6 },
      width: 25.5,
    },
    {
      asset: {
        unlocked: off_8,
        solved: on_8,
      },
      alt: {
        unlocked: "Dark window",
        solved: "Lighted window",
      },
      pos: { top, left: leftEdge + spacing * 7 },
      width: 25.5,
    },
    {
      asset: {
        unlocked: off_9,
        solved: on_9,
      },
      alt: {
        unlocked: "Dark window",
        solved: "Lighted window",
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
  console.log("generating windows for pdfs");
  const round = teamState.rounds.murder_in_mitropolis;
  if (!round) return [];

  const puzzles: (PuzzleDefinition | undefined)[] = Object.values(round.slots)
    .filter((slot) => !slot.is_meta)
    .map((slot) => PUZZLES[slot.slug]);

  const solvedCount = puzzles.filter((puzzle) => !!puzzle?.answer).length;

  const imagery = PDFWindows.map((window, i) => {
    const isSolved = !!(i < solvedCount * 3);

    return {
      ...window,
      asset: isSolved ? window.asset.solved : window.asset.unlocked,
      alt: isSolved ? window.alt.solved : window.alt.unlocked, // accessible description of the image at `asset`
      solved: isSolved,
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
