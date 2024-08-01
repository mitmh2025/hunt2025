import type { TeamState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import rings_closeup from "./assets/fuse_box/fusebox_draft6_rings_asset_closeup.svg";
import main_east_bg from "./assets/main_east.png";
import main_north_bg from "./assets/main_north.jpg";
import main_west_bg from "./assets/main_west.png";
import secret_bg from "./assets/secret.jpg";
import type {
  Modal,
  ModalInternal,
  Node,
  NodeInternal,
  PluginName,
} from "./types";

// The locks themselves correspond to gates.
type LockDatum = {
  answer: unknown; // The types of these vary by check
  // TODO: rate limit?
  gateId: string; // The gate which we will unlock when you submit the correct lock answer
};
// Map from which plugin does the check to the data relevant to that check
const LOCK_DATA: Record<PluginName, LockDatum> = {
  deskdrawer: {
    // directional lock
    answer: "", // TODO: set answer
    gateId: "isg06",
  },
  painting2: {
    // Fuse box/switches lock
    // TODO: replace with actual answer, not this stub that is just switch 13 for testing purposes
    answer: "0000000000001000000000000000000000000000",
    gateId: "isg07",
  },
  painting1: {
    // combination lock (safe)
    answer: "", // TODO: set answer
    gateId: "isg08",
  },
  rug: {
    // numeric (seven-segment display) lock
    answer: "", // TODO: set answer
    gateId: "isg09",
  },
  cryptex: {
    answer: "", // TODO: set answer
    gateId: "isg10",
  },
  bookcase: {
    answer: [], // TODO: set answer
    gateId: "isg16",
  },
};

// Inventory of the various nodes and their contents

// We probably need some sort of data structure
// We probably want to do something about cursor states/cursor images
// Navigation can probably (ab)use the various `{nesw}-resize` cursors for directions
// Interaction can use `pointer`/`grab`/`grabbing`
// Modals might use `zoom-in`?

// Each node has:
// * a human-readable name
// * a background image
// * a list of image assets overlaid (or potentially overlaid)
// * a list of navigation areas, where clicking inside the area will navigate you to a different node
// * a list of interactive areas, which will change the presentation of/state
//   local to this node, but not navigate
// * a list of modal areas, where clicking inside the area will overlay the modal
// * a list of sounds that may be played when performing one of the navigations, manipulating one of the interactions, or interacting with a modal from this node

const ALL_NODES: NodeInternal[] = [
  {
    id: "main_north",
    background: main_north_bg,
    placedAssets: [
      // desk
      // fuse box painting (skewed)
      // bookshelf
      // safe painting (mostly head-on)
      // family portrait (skewed)
      // rug (lengthwise)
      // sliding door (open or closed?)
    ],
    navigations: [
      {
        // left edge: "main_west",
        area: {
          left: -1,
          right: -0.8,
          top: 1,
          bottom: -1,
        },
        cursor: "w-resize",
        destId: "main_west",
      },
      {
        // right edge: "main_east",
        area: {
          left: 0.8,
          right: 1,
          top: 1,
          bottom: -1,
        },
        cursor: "e-resize",
        destId: "main_east",
      },
      {
        // sliding door, if open
        area: {
          left: -0.56,
          right: -0.25,
          top: 0.9,
          bottom: -0.19,
        },
        cursor: "n-resize",
        destId: "secret",
        includeIf: (_teamState: TeamState) => {
          // TODO: currently stubbed for easier testing; replace with comment when ready
          // return teamState.rounds.illegal_search?.gates?.includes(LOCK_DATA.bookcase.gateId) ?? false;
          return true;
        },
      },
      {
        // fuse box painting (skewed): "painting2"
        area: {
          left: -0.95,
          right: -0.64,
          top: 0.84,
          bottom: 0.03,
        },
        cursor: "zoom-in",
        destId: "painting2",
      },
      {
        // safe painting: "painting1"
        area: {
          left: 0.29,
          right: 0.51,
          top: 0.75,
          bottom: 0.21,
        },
        cursor: "zoom-in",
        destId: "painting1",
      },
      {
        // bookcase
        area: {
          left: -0.22,
          right: 0.23,
          bottom: 0.03,
          top: 0.78,
        },
        cursor: "n-resize",
        destId: "bookcase",
      },
      {
        // desk drawer: "desk_drawer"
        area: {
          left: 0.21,
          right: 0.37,
          bottom: -0.46,
          top: -0.33,
        },
        cursor: "zoom-in",
        destId: "desk_drawer", // TODO: Or desk_drawer_open if directional lock completed
      },
      {
        // cryptex + mirror
        area: {
          left: -0.3,
          right: -0.14,
          top: 0.06,
          bottom: -0.16,
        },
        cursor: "zoom-in",
        destId: "cryptex",
      },
      {
        // rug
        area: {
          left: 0.43,
          right: 0.69,
          top: -0.2,
          bottom: -0.81,
        },
        cursor: "zoom-in",
        destId: "rug",
      },
    ],
    interactions: [
      // sliding door toggle, if first meta solved
    ],
    sounds: [
      // sliding door slide open
      // sliding door slide shut
      // desk drawer slide open
    ],
    modals: [
      {
        // family portrait (skewed)
        area: {
          left: 0.61,
          top: 0.82,
          right: 0.89,
          bottom: 0.06,
        },
        asset: "", // TODO: big family portrait
        slotId: "isp03",
        gateId: "isg03",
        postCode: "PXz9UrF1GfwL9IAMFukA5Q==",
      },
      {
        // typewriter
        area: {
          left: -0.11,
          right: 0.12,
          top: 0.11,
          bottom: -0.15,
        },
        asset: "", // TODO: big typewriter
        slotId: "isp04",
        gateId: "isg04",
        postCode: "IQN/w3pMLLmF/B4xpqomvA==",
      },
      {
        // desk lamp
        area: {
          left: 0.21,
          right: 0.36,
          top: 0.21,
          bottom: -0.13,
        },
        asset: "", // TODO: big desk lamp
        slotId: "isp05",
        gateId: "isg05",
        postCode: "9xkLSNSDtS8+0Aee26ApAg==",
      },
    ],
  },

  {
    id: "main_east",
    background: main_east_bg,
    placedAssets: [],
    navigations: [
      {
        // left edge: pan back to "main_north",
        area: {
          left: -1,
          right: -0.8,
          top: 1,
          bottom: -1,
        },
        cursor: "w-resize",
        destId: "main_north",
      },
      {
        area: {
          left: -0.51,
          top: -0.84,
          right: 0.51,
          bottom: -1,
        },
        cursor: "zoom-in",
        destId: "rug",
      },
      {
        area: {
          left: -0.14,
          right: 0.05,
          top: 0.37,
          bottom: -0.33,
        },
        cursor: "zoom-in",
        destId: "telephone",
      },
    ],
    interactions: [
      // rug widthwise
      // maybe digital number lock?  might move to fullscreen frame in separate node for it?
    ],
    sounds: [
      // move rug away/back
    ],
    modals: [
      {
        // family portrait (non-skewed)
        area: {
          left: -0.85,
          top: 0.57,
          right: -0.43,
          bottom: -0.24,
        },
        asset: "", // TODO: big family portrait
        slotId: "isp03",
        gateId: "isg03",
        postCode: "PXz9UrF1GfwL9IAMFukA5Q==",
      },
    ],
  },

  {
    id: "main_west",
    background: main_west_bg,
    placedAssets: [
      // if not flattened into the background image:
      // - globe
      // - great wave painting
    ],
    navigations: [
      {
        // right edge: pan back to "main_north",
        area: {
          left: 0.8,
          right: 1,
          top: 1,
          bottom: -1,
        },
        cursor: "e-resize",
        destId: "main_north",
      },
      {
        // fuse box: painting2
        area: {
          left: 0.38,
          right: 0.79,
          top: 0.55,
          bottom: -0.28,
        },
        cursor: "zoom-in",
        destId: "painting2",
      },
    ],
    interactions: [],
    sounds: [],
    modals: [
      {
        // great wave painting
        area: {
          left: -0.52,
          top: 0.52,
          right: -0.18,
          bottom: 0.07,
        },
        asset: "", // TODO: add asset of big great wave painting
        slotId: "isp01", // TODO: confirm puzzle-item mapping
        gateId: "isg01",
        postCode: "TiEz0QxOHbM+Iy91lq8xLA==",
      },
      {
        // globe
        area: {
          left: -0.46,
          right: -0.25,
          top: -0.03,
          bottom: -0.37,
        },
        asset: "", // TODO: add asset of big globe
        slotId: "isp02", // TODO: confirm puzzle-item mapping
        gateId: "isg02",
        postCode: "fWTr5MCGd9lNSy1WuJzjXA==",
      },
    ],
  },

  {
    id: "rug",
    background: "", // TODO: background
    placedAssets: [],
    navigations: [
      {
        area: {
          left: -1,
          right: 1,
          top: 1,
          bottom: 0.1,
        },
        cursor: "n-resize",
        destId: "main_east",
      },
      // back up to main_east
    ],
    interactions: [
      // rug
    ],
    sounds: [
      // pulling rug back
    ],
    modals: [
      {
        includeIf: (teamState: TeamState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes(
              LOCK_DATA.rug.gateId,
            ) ?? false
          );
        },
        ownedByInteraction: true,
        area: {
          // adjust area once assets exist
          left: -1,
          right: 1,
          top: -1,
          bottom: 1,
        },
        asset: "", // TODO: whatever's in the number lock
        slotId: "isp09",
        gateId: "isg14",
        postCode: "1K4T5XyjlogRERACrMXXbg==",
      },
    ],
  },

  {
    id: "desk_drawer",
    background: "", // TODO: background
    placedAssets: [],
    navigations: [
      // back up to main_north
    ],
    interactions: [
      // directional lock
    ],
    sounds: [
      // directional lock slide
      // directional lock unlock
      // drawer slide
    ],
    modals: [],
  },

  {
    id: "desk_drawer_open",
    background: "", // TODO: background
    placedAssets: [],
    navigations: [
      // zoom out back to main_north
    ],
    interactions: [],
    sounds: [
      // desk drawer shut
    ],
    modals: [
      // candies
      {
        includeIf: (teamState: TeamState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes(
              LOCK_DATA.deskdrawer.gateId,
            ) ?? false
          );
        },
        area: {
          // adjust area once assets exist
          left: -1,
          right: 1,
          top: -1,
          bottom: 1,
        },
        asset: "", // TODO: candies
        slotId: "isp06",
        gateId: "isg11",
        postCode: "lxRFwDNndXOrzDkGdBQukA==",
      },
    ],
  },

  {
    id: "bookcase",
    background: "", // TODO: background
    placedAssets: [],
    navigations: [
      // zoom out back to main_north
    ],
    interactions: [
      // bookcase
    ],
    sounds: [
      // book slides out or back
    ],
    modals: [
      // note which links to metapuzzle
    ],
  },

  {
    id: "cryptex",
    background: "", // TODO: background
    placedAssets: [],
    navigations: [
      // zoom back out to main_north
    ],
    interactions: [
      // cryptex wheels
    ],
    sounds: [
      // cryptex wheel tick
    ],
    modals: [
      {
        includeIf: (teamState: TeamState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes(
              LOCK_DATA.cryptex.gateId,
            ) ?? false
          );
        },
        ownedByInteraction: true,
        area: {
          // adjust area once assets exist
          left: -1,
          right: 1,
          top: -1,
          bottom: 1,
        },
        asset: "", // TODO: note asset
        slotId: "isp10",
        gateId: "isg15",
        postCode: "YXEwRKy4tAGrLZaycOe85Q==",
      },
    ],
  },

  {
    // This is the one to the right of the bookcase, obscuring the safe
    id: "painting1",
    background: "", // TODO: background
    placedAssets: [],
    navigations: [],
    interactions: [{ plugin: "painting1" }],
    sounds: [],
    modals: [
      {
        includeIf: (teamState: TeamState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes(
              LOCK_DATA.painting1.gateId,
            ) ?? false
          );
        },
        ownedByInteraction: true,
        area: {
          // adjust area once assets exist
          left: -1,
          right: 1,
          top: -1,
          bottom: 1,
        },
        asset: "", // TODO: asset
        slotId: "isp08",
        gateId: "isg13",
        postCode: "Ba+T1nVoh2GFJTIXnh7H8A==",
      },
    ],
  },

  {
    // This is the one on the west wall, obscuring the fuse box
    id: "painting2",
    background: "", // TODO: background
    placedAssets: [],
    navigations: [
      {
        area: {
          left: -1,
          right: -0.6,
          top: 1,
          bottom: -1,
        },
        cursor: "zoom-out",
        destId: "main_west",
      },
      {
        area: {
          left: 0.6,
          right: 1,
          top: 1,
          bottom: -1,
        },
        cursor: "zoom-out",
        destId: "main_west",
      },
    ],
    interactions: [{ plugin: "painting2" }],
    sounds: [
      // breaker off
      // breaker on
    ],
    modals: [
      {
        includeIf: (teamState: TeamState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes(
              LOCK_DATA.painting2.gateId,
            ) ?? false
          );
        },
        ownedByInteraction: true,
        area: {
          left: -0.0416,
          right: 0.04,
          top: -0.744,
          bottom: -0.826,
        },
        asset: rings_closeup,
        slotId: "isp07",
        gateId: "isg12",
        postCode: "Q1ouYm0ptTarIZ9GPmqwjQ==",
      },
    ],
  },

  {
    // Close-up of telephone.  Interaction (after solving the second meta) should play the morse code audio.
    id: "telephone",
    background: "", // TODO: background
    placedAssets: [],
    navigations: [
      {
        area: {
          left: -1,
          right: 1,
          top: -0.7,
          bottom: -1,
        },
        cursor: "zoom-out",
        destId: "main_east",
      },
    ],
    interactions: [
      // telephone
    ],
    sounds: [
      // morse code mp3?
    ],
    modals: [],
  },

  {
    // Secret room
    id: "secret",
    background: secret_bg,
    placedAssets: [],
    navigations: [
      {
        area: {
          left: -1,
          right: 1,
          top: -0.76,
          bottom: -1,
        },
        cursor: "s-resize",
        destId: "main_north",
      },
    ],
    interactions: [],
    sounds: [],
    modals: [
      // there's like 8 or something in here?  wow
      {
        // Baby's birth certificate (on desk)
        area: {
          left: -0.5,
          right: -0.37,
          top: -0.16,
          bottom: -0.29,
        },
        asset: "", // TODO
        slotId: "isp11",
        gateId: "isg18",
        postCode: "lopyihUSAPmlZa5dOEBH/w==",
      },
      {
        // Newspaper clipping
        area: {
          left: -0.45,
          right: -0.33,
          top: 0.23,
          bottom: 0.02,
        },
        asset: "", // TODO
        slotId: "isp12",
        gateId: "isg19",
        postCode: "3LdOYbqNPGHYrvH7KKaMaA==",
      },
      {
        // Letter from prison warden
        area: {
          left: -0.33,
          right: -0.22,
          top: -0.13,
          bottom: -0.29,
        },
        asset: "", // TODO
        slotId: "isp13",
        gateId: "isg20",
        postCode: "AWmzimAkS8G0wLH7WatJlw==",
      },
      {
        // Photo of the Candys and Baby
        area: {
          left: -0.24,
          right: -0.14,
          top: 0.21,
          bottom: 0.03,
        },
        asset: "", // TODO
        slotId: "isp14",
        gateId: "isg21",
        postCode: "XUu27ZhwbTcOJg2l4Yohsw==",
      },
      {
        // Photo of Papa with his wife and Gladys
        area: {
          left: -0.11,
          right: 0.02,
          top: 0.38,
          bottom: 0.16,
        },
        asset: "", // TODO
        slotId: "isp15",
        gateId: "isg22",
        postCode: "ThjWDlBYS112vfoCFdYqxQ==",
      },
      {
        // Rare stamp
        area: {
          left: 0.18,
          right: 0.35,
          top: 0.34,
          bottom: 0.08,
        },
        asset: "", // TODO
        slotId: "isp16",
        gateId: "isg23",
        postCode: "bIUXEt8RlHayfrW/4qSQyw==",
      },
      {
        // Gladys's teddy bear
        area: {
          left: 0.4,
          right: 0.55,
          top: 0.76,
          bottom: 0.47,
        },
        asset: "", // TODO
        slotId: "isp17",
        gateId: "isg24",
        postCode: "liZx1HnT5Bxo/tIbUfRlWg==",
      },
      {
        // Radio drama poster
        area: {
          left: 0.69,
          right: 0.95,
          top: 0.8,
          bottom: -0.38,
        },
        asset: "", // TODO
        slotId: "isp18",
        gateId: "isg25",
        postCode: "fv6Vuq1GktlO5DdXGVuBNQ==",
      },
      {
        // Meta wall image
        area: {
          left: -0.93,
          right: -0.61,
          top: 0.85,
          bottom: -0.33,
        },
        asset: "", // TODO
        slotId: "ism02",
        gateId: "isg17",
        postCode: "9eUWKfZBfQZgWQ0wn5RPHA==",
      },
    ],
  },
];

// Index by node id
const NODES_BY_ID = new Map<string, NodeInternal>();
ALL_NODES.forEach((node) => {
  NODES_BY_ID.set(node.id, node);
});

const MODALS_BY_POSTCODE = new Map<string, ModalInternal>();
ALL_NODES.forEach((node) => {
  node.modals.forEach((modal) => {
    MODALS_BY_POSTCODE.set(modal.postCode, modal);
  });
});

function modalFromModalInternal(
  modalInternal: ModalInternal,
  teamState: TeamState,
): [Modal, boolean] | undefined {
  const {
    includeIf,
    ownedByInteraction,
    slotId,
    postCode,
    gateId: _gateId,
    ...rest
  } = modalInternal;
  // Look up the puzzle slug for the named slotId in this round.  We know
  // statically that the round will be "illegal_search".
  // If the slug is not present in teamState yet, then the solver team has
  // not yet discovered this puzzle, and so when they open this modal we
  // should submit a POST to notify the backend that they found it.
  const slotObj = teamState.rounds.illegal_search?.slots[slotId];
  const slug = slotObj?.slug;
  let mixin;
  // If slug is undefined, then lookup the random slot id => POST code mapping and include that
  // otherwise, lookup (or stub) puzzle title & URL based on the slug from the puzzle data map
  if (slug) {
    const puzzle = PUZZLES[slug];
    const title = puzzle?.title ?? `Stub puzzle for slot ${slotId}`;
    mixin = { title, slug };
  } else {
    mixin = { postCode };
  }
  const obj = { ...rest, ...mixin };
  const forInteraction = ownedByInteraction ?? false;
  if (includeIf === undefined) {
    // No condition means always include
    return [obj, forInteraction];
  } else {
    const keep = includeIf(teamState);
    if (keep) {
      return [obj, forInteraction];
    } else {
      return undefined;
    }
  }
}

function filteredForFrontend(node: NodeInternal, teamState: TeamState): Node {
  // Evaluates the predicates and fills out team state and puzzle information
  const keptNavigations = node.navigations.flatMap((nav) => {
    const { includeIf, ...rest } = nav;
    if (includeIf === undefined) {
      // No condition means always include
      return [rest];
    } else {
      const keep = includeIf(teamState);
      if (keep) {
        return [rest];
      } else {
        return [];
      }
    }
  });
  const modals: Modal[] = [];
  const interactionModals: Modal[] = [];
  node.modals.forEach((modal) => {
    const result = modalFromModalInternal(modal, teamState);
    if (result) {
      const [objForFrontend, ownedByInteraction] = result;
      if (ownedByInteraction) {
        interactionModals.push(objForFrontend);
      } else {
        modals.push(objForFrontend);
      }
    }
  });

  return {
    id: node.id,
    background: node.background,
    placedAssets: node.placedAssets,
    navigations: keptNavigations,
    interactions: node.interactions,
    sounds: node.sounds,
    modals,
    interactionModals:
      interactionModals.length > 0 ? interactionModals : undefined,
  };
}

export { NODES_BY_ID, MODALS_BY_POSTCODE, LOCK_DATA, filteredForFrontend };

// node: "desk_drawer"
//   assets:
//     directional lock
//   interactives:
//     directional lock
//   sounds:
//     directional lock slide
//     directional lock unlock
//     drawer slide
//
// node: "desk_drawer_open"
//   assets:
//     desk drawer open
//   modals:
//     candies
//   navigations:
//     "main_north"
//   sounds:
//     desk drawer shut
//
// node: "cryptex"
//   assets:
//     cryptex
//     mirror
//   interactives:
//     cryptex wheels
//   sounds:
//     cryptex rotation
//
// node: "main_west" // AKA west wall
//   fuse box painting (mostly head-on)
//
// node: "bookcase"
//   assets:
//     books
//     bookcase note
//   interactives:
//     bookcase (each book toggles)
//   modals:
//     note (links to meta)
//
// node: "painting1" // This is the one to the right of the bookcase, obscuring the safe
//   assets:
//     painting 1
//     safe door
//     safe wheel
//     safe handle
//   interactives:
//     painting 1 -- grab and lift to remove to reveal safe
//     safe knob -- grab and rotate to change dial positions
//     safe handle -- grab and rotate to attempt to open safe (submits dial positions to backend)
//   sounds:
//     dropping painting on the ground
//     safe dial tick
//     safe doesn't open
//     safe opens
//     safe door hinge swings
//
//
// node: "main_safe" // Once painting1 is removed, the safe is revealed
//
// node: "painting2" // This is the one on the west wall, obscuring the fuse box
//
// node: "main_fusebox" // Once painting2 is removed, the fusebox is revealed
//
// node: "secret"
//   modals:
//     teddy
//     stamp
//     poster
//     meta
//     stack of "magazines"?
//     other stuff on desk?
//  navigations:
//    bottom: (down arrow, or maybe if at edge downright or downleft) "main_north"
