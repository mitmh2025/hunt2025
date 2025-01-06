import { type Placement } from "@floating-ui/react";
import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import MurderBody from "./MurderBody";
// meta: door to green building
import door_solved from "./assets/green-door-solved.png";
import door_unlocked from "./assets/green-door-unlocked.png";
// dorm
import dorm_solved_lofibeats from "./assets/windows/dorm/dorm-solved-lofibeats.png";
import dorm_solved_plant from "./assets/windows/dorm/dorm-solved-plant.png";
import dorm_solved from "./assets/windows/dorm/dorm-solved.png";
import dorm_locked from "./assets/windows/dorm/dorm-unlockable.png";
import dorm_unlocked from "./assets/windows/dorm/dorm-unlocked.png";
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
import { type MurderPuzzleObject, type MurderState } from "./types";

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
  rotation?: number;
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
      top: 1070,
      left: 640,
    },
    width: 300,
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
    pos: { top: 676, left: 1077 },
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
    pos: { top: 841, left: 1077 },
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
    pos: { top: 942, left: 1077 },
    width: 147,
  },
  tmp04: {
    asset: {
      locked: tower_locked,
      unlocked: tower_unlocked,
      solved: tower_solved,
    },
    alt: "Row of windows",
    pos: { top: 1046, left: 1077 },
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
    pos: { top: 1153, left: 1077 },
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
    pos: { top: 913, left: 1687 },
    width: 49,
  },
  tmp07: {
    asset: {
      locked: dorm_locked,
      unlocked: dorm_unlocked,
      solved: dorm_solved,
    },
    alt: "Window",
    pos: { top: 1034, left: 1687 },
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
    pos: { top: 1156, left: 1687 },
    width: 49,
  },
  tmp09: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 1136, left: 274 },
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
    pos: { top: 1136, left: 355 },
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
    pos: { top: 1021, left: 274 },
    width: 64,
  },
  tmp12: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 1021, left: 355 },
    width: 64,
  },
  tmp13: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 899, left: 274 },
    width: 64,
  },
  tmp14: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 889, left: 355 },
    width: 64,
  },
  tmp15: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 774, left: 274 },
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
    pos: { top: 774, left: 355 },
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
    pos: { top: 654, left: 274 },
    width: 64,
  },
  tmp18: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 654, left: 355 },
    width: 64,
  },
  tmp19: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 1136, left: 446 },
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
    pos: { top: 1021, left: 446 },
    width: 64,
  },
  tmp21: {
    asset: {
      locked: stata_1_locked,
      unlocked: stata_1_unlocked,
      solved: stata_1_solved,
    },
    alt: "Window",
    pos: { top: 981.5, left: 103 },
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
    pos: { top: 911, left: 158 },
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
    pos: { top: 841, left: 70 },
    width: 64,
  },
  tmp24: {
    asset: {
      locked: stata_2_1_locked,
      unlocked: stata_2_1_unlocked,
      solved: stata_2_1_solved,
    },
    alt: "Window",
    pos: { top: 745, left: 138 },
    width: 64,
  },
};

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
  if (!round) return { epoch, items: [], imagery: [] };

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

  return { epoch, items, imagery };
}

const MurderRoundPage = ({ teamState }: { teamState: TeamHuntState }) => {
  const state = murderState(teamState);
  const inlineScript = `window.initialMurderState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)};`;
  console.log("wtf");
  console.log("hi", state);
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
