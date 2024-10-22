import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import BackgroundCheckBody from "./BackgroundCheckBody";
import { Background } from "./Layout";
import clipping_01_locked from "./assets/clippings/Y01_locked.png";
import clipping_01_solved from "./assets/clippings/Y01_solved.png";
import clipping_01_unlocked from "./assets/clippings/Y01_unlocked.png";
import clipping_02_locked from "./assets/clippings/Y02_locked.png";
import clipping_02_solved from "./assets/clippings/Y02_solved.png";
import clipping_02_unlocked from "./assets/clippings/Y02_unlocked.png";
import clipping_03_locked from "./assets/clippings/Y03_locked.png";
import clipping_03_solved from "./assets/clippings/Y03_solved.png";
import clipping_03_unlocked from "./assets/clippings/Y03_unlocked.png";
import clipping_04_locked from "./assets/clippings/Y04_locked.png";
import clipping_04_solved from "./assets/clippings/Y04_solved.png";
import clipping_04_unlocked from "./assets/clippings/Y04_unlocked.png";
import clipping_05_locked from "./assets/clippings/Y05_locked.png";
import clipping_05_solved from "./assets/clippings/Y05_solved.png";
import clipping_05_unlocked from "./assets/clippings/Y05_unlocked.png";
import clipping_06_locked from "./assets/clippings/Y06_locked.png";
import clipping_06_solved from "./assets/clippings/Y06_solved.png";
import clipping_06_unlocked from "./assets/clippings/Y06_unlocked.png";
import clipping_07_locked from "./assets/clippings/Y07_locked.png";
import clipping_07_solved from "./assets/clippings/Y07_solved.png";
import clipping_07_unlocked from "./assets/clippings/Y07_unlocked.png";
import clipping_08_locked from "./assets/clippings/Y08_locked.png";
import clipping_08_solved from "./assets/clippings/Y08_solved.png";
import clipping_08_unlocked from "./assets/clippings/Y08_unlocked.png";
import clipping_09_locked from "./assets/clippings/Y09_locked.png";
import clipping_09_solved from "./assets/clippings/Y09_solved.png";
import clipping_09_unlocked from "./assets/clippings/Y09_unlocked.png";
import clipping_10_locked from "./assets/clippings/Y10_locked.png";
import clipping_10_solved from "./assets/clippings/Y10_solved.png";
import clipping_10_unlocked from "./assets/clippings/Y10_unlocked.png";
import clipping_11_locked from "./assets/clippings/Y11_locked.png";
import clipping_11_solved from "./assets/clippings/Y11_solved.png";
import clipping_11_unlocked from "./assets/clippings/Y11_unlocked.png";
import clipping_12_locked from "./assets/clippings/Y12_locked.png";
import clipping_12_solved from "./assets/clippings/Y12_solved.png";
import clipping_12_unlocked from "./assets/clippings/Y12_unlocked.png";
import clipping_13_locked from "./assets/clippings/Y13_locked.png";
import clipping_13_solved from "./assets/clippings/Y13_solved.png";
import clipping_13_unlocked from "./assets/clippings/Y13_unlocked.png";
import clipping_14_locked from "./assets/clippings/Y14_locked.png";
import clipping_14_solved from "./assets/clippings/Y14_solved.png";
import clipping_14_unlocked from "./assets/clippings/Y14_unlocked.png";
import magnet_puzzle from "./assets/magnet_puzzle.png";
import magnet_submeta from "./assets/magnet_submeta.png";
import magnet_supermeta from "./assets/magnet_supermeta.png";
import postcard_02_solved from "./assets/metas/submeta_grand_illusion_solved.png";
import postcard_02_unlocked from "./assets/metas/submeta_grand_illusion_unlocked.png";
import postcard_01_solved from "./assets/metas/submeta_mark_solved.png";
import postcard_01_unlocked from "./assets/metas/submeta_mark_unlocked.png";
import postcard_03_solved from "./assets/metas/submeta_oversight_solved.png";
import postcard_03_unlocked from "./assets/metas/submeta_oversight_unlocked.png";
import postcard_04_solved from "./assets/metas/supermeta_alias_solved.png";
import postcard_04_unlocked from "./assets/metas/supermeta_alias_unlocked.png";
import {
  type BackgroundCheckObject,
  type BackgroundCheckItem,
  type BackgroundCheckState,
} from "./types";

const SLOTS = [
  "bgp01",
  "bgp02",
  "bgp03",
  "bgp04",
  "bgp05",
  "bgp06",
  "bgp07",
  "bgp08",
  "bgp09",
  "bgp10",
  "bgp11",
  "bgp12",
  "bgp13",
  "bgp14",
  "bgm01",
  "bgm02",
  "bgm03",
  "bgm04",
] as const;

function lookupSlug(
  slot: string,
  teamState: TeamHuntState,
): string | undefined {
  const round = teamState.rounds.background_check;
  const slotObj = round ? round.slots[slot] : undefined;
  return slotObj?.slug;
}

function itemForSlot(
  slot: string,
  teamState: TeamHuntState,
): BackgroundCheckItem | [] {
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
  magnet: string;
  magnetFilter?: string;
  width: number | { locked?: number; unlocked: number; solved: number };
  requiredHeight: number; // how many tiles of fridge are required if this object will be displayed?
};
type BackgroundCheckSlot = (typeof SLOTS)[number];

const objectProperties: Record<BackgroundCheckSlot, ObjectDescriptor> = {
  bgp01: {
    asset: {
      locked: clipping_01_locked,
      unlocked: clipping_01_unlocked,
      solved: clipping_01_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from The Rio Times, headline: Facing Flagging Ticket Sales, Historic Opera House May be Forced to Close",
    },
    pos: {
      left: 300,
      top: 540,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 1,
  },
  bgp02: {
    asset: {
      locked: clipping_02_locked,
      unlocked: clipping_02_unlocked,
      solved: clipping_02_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from The Egyptian Gazette, headline: Tomb Of Psusennes I Unsealed",
    },
    pos: {
      right: 270,
      top: 689,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 1,
  },
  bgp03: {
    asset: {
      locked: clipping_03_locked,
      unlocked: clipping_03_unlocked,
      solved: clipping_03_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from Le Monde, headline: Exiled Russian Aristocrat to Publicly Display Fine Art Collection",
    },
    pos: {
      left: 320,
      top: 1340,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 1,
  },
  bgp04: {
    asset: {
      locked: clipping_04_locked,
      unlocked: clipping_04_unlocked,
      solved: clipping_04_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from The Rio Times, headline: Verdi Opera, Long Thought Lost, Discovered by Local Historian",
    },
    pos: {
      right: 250,
      top: 1492,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 1,
  },
  bgp05: {
    asset: {
      locked: clipping_05_locked,
      unlocked: clipping_05_unlocked,
      solved: clipping_05_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from The Rio Times, headline: Historian Cupim Marco to Debut Lost Verdi",
    },
    pos: {
      left: 340,
      top: 2150,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 2,
  },
  bgp06: {
    asset: {
      locked: clipping_06_locked,
      unlocked: clipping_06_unlocked,
      solved: clipping_06_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from Le Monde, headline: Natalia Petrova Attends Family Collection Opening With New Beau Camargue Renoir",
    },
    pos: {
      right: 260,
      top: 2236,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 2,
  },
  bgp07: {
    asset: {
      locked: clipping_07_locked,
      unlocked: clipping_07_unlocked,
      solved: clipping_07_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from The Rio Times, headline: As Investments Pour In, Lost Verdi Set to be Biggest Production of All Time",
    },
    pos: {
      left: 320,
      top: 2880,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 3,
  },
  bgp08: {
    asset: {
      locked: clipping_08_locked,
      unlocked: clipping_08_unlocked,
      solved: clipping_08_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from The Egyptian Gazette, headline: Apis the Seer Converses With the Ancients",
    },
    pos: {
      right: 260,
      top: 3000,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 3,
  },
  bgp09: {
    asset: {
      locked: clipping_09_locked,
      unlocked: clipping_09_unlocked,
      solved: clipping_09_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from Le Monde, headline: Petrov Egg Stolen!",
    },
    pos: {
      left: 300,
      top: 3520,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 3,
  },
  bgp10: {
    asset: {
      locked: clipping_10_locked,
      unlocked: clipping_10_unlocked,
      solved: clipping_10_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from The Egyptian Gazette, headline: World’s Wealthy Flock to Cairo for Seances with Master Spiritualist",
    },
    pos: {
      right: 280,
      top: 3700,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 3,
  },
  bgp11: {
    asset: {
      locked: clipping_11_locked,
      unlocked: clipping_11_unlocked,
      solved: clipping_11_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from Le Monde, headline: Natalia Petrova Moves On from High Profile Theft as Former Suitor Camargue Renoir Steps Out of Limelight",
    },
    pos: {
      left: 320,
      top: 4340,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 3,
  },
  bgp12: {
    asset: {
      locked: clipping_12_locked,
      unlocked: clipping_12_unlocked,
      solved: clipping_12_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from The Egyptian Gazette, headline: Apis the Seer Goes Missing",
    },
    pos: {
      right: 300,
      top: 4460,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 3,
  },
  bgp13: {
    asset: {
      locked: clipping_13_locked,
      unlocked: clipping_13_unlocked,
      solved: clipping_13_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from The Egyptian Gazette, headline: Victims of Charlatan Channeller Come Forward",
    },
    pos: {
      left: 320,
      top: 5000,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 4,
  },
  bgp14: {
    asset: {
      locked: clipping_14_locked,
      unlocked: clipping_14_unlocked,
      solved: clipping_14_solved,
    },
    alt: {
      locked: "A newspaper clipping",
      unlocked: "A newspaper clipping",
      solved:
        "A newspaper clipping from The Rio Times, headline: Lost Verdi a Fraud – Cupim Marco Missing",
    },
    pos: {
      right: 280,
      top: 5250,
    },
    magnet: magnet_puzzle,
    width: 600,
    requiredHeight: 4,
  },
  bgm01: {
    asset: {
      unlocked: postcard_01_unlocked,
      solved: postcard_01_solved,
    },
    alt: "A postcard reading “The Mark”",
    pos: {
      left: 320,
      top: 5700,
    },
    magnet: magnet_submeta,
    width: 550,
    requiredHeight: 4,
  },
  bgm02: {
    asset: {
      unlocked: postcard_02_unlocked,
      solved: postcard_02_solved,
    },
    alt: "A postcard reading “The Grand Illusion”",
    pos: {
      right: 400,
      top: 6200,
    },
    magnet: magnet_submeta,
    width: 550,
    requiredHeight: 5,
  },
  bgm03: {
    asset: {
      unlocked: postcard_03_unlocked,
      solved: postcard_03_solved,
    },
    alt: "A postcard reading “The Oversight”",
    pos: {
      left: 332,
      top: 6500,
    },
    magnet: magnet_submeta,
    width: 550,
    requiredHeight: 5,
  },
  bgm04: {
    asset: {
      unlocked: postcard_04_unlocked,
      solved: postcard_04_solved,
    },
    alt: "A postcard reading “Alias”",
    pos: {
      right: 290,
      top: 6800,
    },
    magnet: magnet_supermeta,
    magnetFilter: "drop-shadow(var(--gray-800) 0.125rem 0.125rem 0.125rem)",
    width: 650,
    requiredHeight: 5,
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

function genObjects(teamState: TeamHuntState): BackgroundCheckState["imagery"] {
  const round = teamState.rounds.background_check;
  if (!round) return { height: 1, objects: [] };

  let requiredHeight = 1;
  const objects = SLOTS.flatMap((slotId: BackgroundCheckSlot) => {
    const slot = round.slots[slotId];
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
    const pos = lookupValue(properties.pos, state);
    const width = lookupValue(properties.width, state);
    const magnet = properties.magnet;
    const magnetFilter =
      properties.magnetFilter ??
      "drop-shadow(var(--gray-500) 0.125rem 0.125rem 0.125rem)";
    const title = puzzleDefinition?.title ?? `Stub puzzle for slot ${slotId}`;
    const desc = puzzleDefinition?.initial_description ?? "";
    const obj: BackgroundCheckObject = {
      asset,
      alt,
      width,
      pos,
      magnet,
      magnetFilter,
      title,
      desc,
      slug,
      state: state === "locked" ? ("unlockable" as const) : state,
    };
    if (puzzleState.answer) {
      obj.answer = puzzleState.answer;
    }

    if (requiredHeight < properties.requiredHeight) {
      requiredHeight = properties.requiredHeight;
    }
    return [obj];
  });
  return { height: requiredHeight, objects };
}

export function backgroundCheckState(
  teamState: TeamHuntState,
): BackgroundCheckState {
  const items = SLOTS.flatMap((slot: string) => itemForSlot(slot, teamState));
  const imagery = genObjects(teamState);
  return { items, imagery };
}

const BackgroundCheckRoundPage = ({
  teamState,
}: {
  teamState: TeamHuntState;
}) => {
  const state = backgroundCheckState(teamState);
  const inlineScript = `window.initialBackgroundCheckState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)}`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <Background id="background-check-root">
        <BackgroundCheckBody state={state} teamState={teamState} />
      </Background>
    </>
  );
};

export default BackgroundCheckRoundPage;
