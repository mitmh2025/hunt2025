import type { TeamHuntState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import bookcase_note from "./assets/bookcase/note.svg";
import cryptex_note from "./assets/cryptex/cryptex_note.svg";
import cryptex_open from "./assets/cryptex/cryptex_open.png";
import drawer_bg from "./assets/desk_drawer/bg.png";
import candy from "./assets/desk_drawer/candy.svg";
import drawer_with_candy from "./assets/desk_drawer/drawer.png";
import rings_closeup from "./assets/fuse_box/fusebox_draft6_rings_asset_closeup.svg";
import main_east_bg from "./assets/main_east.jpg";
import main_north_bg from "./assets/main_north.jpg";
import main_west_bg from "./assets/main_west.jpg";
import ledger from "./assets/rug/ledger.svg";
import numberlock_box_ledger from "./assets/rug/numberlock_box_ledger.svg";
import rug_bg from "./assets/rug/rug_bg.svg";
import secret_bg from "./assets/secret.jpg";
import cryptex_on_desk from "./assets/study/cryptex.svg";
import cryptex_note_on_desk from "./assets/study/cryptex_note.svg";
import family_frame_east from "./assets/study/family_frame_east.png";
import family_frame_north from "./assets/study/family_frame_north.png";
import fusebox_frame from "./assets/study/fusebox_frame.svg";
import fusebox_frame_west from "./assets/study/fusebox_frame_west.svg";
import globe from "./assets/study/globe.svg";
import greatwave_frame from "./assets/study/greatwave_frame.svg";
import lamp from "./assets/study/lamp.svg";
import open_door from "./assets/study/open_door.png";
import rug_east from "./assets/study/rug_east.svg";
import rug_north from "./assets/study/rug_north.svg";
import safe_frame from "./assets/study/safe_frame.svg";
import telephone from "./assets/study/telephone.svg";
import typewriter from "./assets/study/typewriter.svg";
import {
  move_down_cursor,
  move_left_cursor,
  move_right_cursor,
  move_up_cursor,
  zoom_cursor,
} from "./client/cursors";
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
    answer: "dlrddrr",
    gateId: "isg06",
  },
  painting2: {
    // Fuse box/switches lock
    answer: "1010101110101101110111101100101011011110",
    gateId: "isg07",
  },
  painting1: {
    // combination lock (safe)
    // We accept multiple options for this answer, for reasons that are puzzle-specific.
    answer: [
      [4, 30, 19],
      [19, 4, 30],
      [30, 4, 19],
    ],
    gateId: "isg08",
  },
  rug: {
    // numeric (seven-segment display) lock
    answer: "37047734",
    gateId: "isg09",
  },
  cryptex: {
    answer: "REUNITED",
    gateId: "isg10",
  },
  bookcase: {
    answer:
      "111000000000000000000000000000000000000000000000000000000000000000", // TODO: set answer
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
      {
        // Rug
        area: {
          left: 0.398,
          right: 0.9,
          top: -0.096,
          bottom: -1.2,
        },
        asset: rug_north,
      },
      {
        // Cryptex
        area: {
          left: -0.28,
          right: -0.152,
          top: 0.013,
          bottom: -0.1,
        },
        asset: cryptex_on_desk,
      },
      {
        // Note (for opened cryptex)
        area: {
          left: -0.194,
          right: -0.161,
          top: -0.054,
          bottom: -0.113,
        },
        asset: cryptex_note_on_desk,
        includeIf: (teamState: TeamHuntState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes(
              LOCK_DATA.cryptex.gateId,
            ) ?? false
          );
        },
      },
      {
        // Fuse box painting
        area: {
          left: -0.95,
          right: -0.64,
          top: 0.84,
          bottom: 0.03,
        },
        asset: fusebox_frame,
      },
      {
        // Safe painting
        area: {
          left: 0.29,
          right: 0.51,
          top: 0.75,
          bottom: 0.21,
        },
        asset: safe_frame,
      },
      {
        // sliding door, if open
        area: {
          left: -1,
          right: 1,
          top: 1,
          bottom: -1,
        },
        asset: open_door,
        includeIf: (_teamState: TeamHuntState) => {
          // TODO: currently stubbed for easier testing; replace with comment when ready
          // return teamState.rounds.illegal_search?.gates?.includes(LOCK_DATA.bookcase.gateId) ?? false;
          return true;
        },
      },
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
        cursor: move_left_cursor,
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
        cursor: move_right_cursor,
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
        cursor: move_up_cursor,
        destId: "secret",
        includeIf: (_teamState: TeamHuntState) => {
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
        cursor: zoom_cursor,
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
        cursor: zoom_cursor,
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
        cursor: zoom_cursor,
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
        cursor: zoom_cursor,
        destId: "desk_drawer",
      },
      {
        // cryptex + mirror
        area: {
          left: -0.3,
          right: -0.14,
          top: 0.06,
          bottom: -0.16,
        },
        cursor: zoom_cursor,
        destId: "cryptex",
      },
      {
        // rug
        area: {
          left: 0.434375,
          right: 0.7979166666666667,
          top: -0.26296296296296295,
          bottom: -0.9907407407407407,
        },
        cursor: zoom_cursor,
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
        asset: family_frame_east,
        slotId: "isp03",
        gateId: "isg03",
        postCode: "PXz9UrF1GfwL9IAMFukA5Q==",
        placedAsset: {
          area: {
            left: 0.61,
            top: 0.82,
            right: 0.89,
            bottom: 0.06,
          },
          asset: family_frame_north,
        },
      },
      {
        // typewriter
        area: {
          left: -0.11,
          right: 0.12,
          top: 0.11,
          bottom: -0.15,
        },
        asset: typewriter,
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
        asset: lamp,
        slotId: "isp05",
        gateId: "isg05",
        postCode: "9xkLSNSDtS8+0Aee26ApAg==",
      },
    ],
  },

  {
    id: "main_east",
    background: main_east_bg,
    placedAssets: [
      {
        area: {
          left: -0.14,
          right: 0.05,
          top: 0.37,
          bottom: -0.33,
        },
        asset: telephone,
      },
      {
        area: {
          left: -0.51,
          top: -0.84,
          right: 0.51,
          bottom: -1,
        },
        asset: rug_east,
      },
    ],
    navigations: [
      {
        // left edge: pan back to "main_north",
        area: {
          left: -1,
          right: -0.8,
          top: 1,
          bottom: -1,
        },
        cursor: move_left_cursor,
        destId: "main_north",
      },
      {
        area: {
          left: -0.51,
          top: -0.84,
          right: 0.51,
          bottom: -1,
        },
        cursor: zoom_cursor,
        destId: "rug",
      },
      {
        area: {
          left: -0.14,
          right: 0.05,
          top: 0.37,
          bottom: -0.33,
        },
        cursor: zoom_cursor,
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
        asset: family_frame_east,
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
      {
        area: {
          left: 0.38,
          right: 0.79,
          top: 0.55,
          bottom: -0.28,
        },
        asset: fusebox_frame_west,
      },
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
        cursor: move_right_cursor,
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
        cursor: zoom_cursor,
        destId: "painting2",
      },
    ],
    interactions: [],
    sounds: [],
    modals: [
      {
        // great wave painting
        area: {
          left: -0.675,
          top: 0.842,
          right: 0,
          bottom: 0,
        },
        asset: greatwave_frame,
        slotId: "isp01", // TODO: confirm puzzle-item mapping
        gateId: "isg01",
        postCode: "TiEz0QxOHbM+Iy91lq8xLA==",
      },
      {
        // globe
        area: {
          left: -0.555,
          right: -0.123,
          top: -0.093,
          bottom: -1.1,
        },
        asset: globe,
        slotId: "isp02", // TODO: confirm puzzle-item mapping
        gateId: "isg02",
        postCode: "fWTr5MCGd9lNSy1WuJzjXA==",
      },
    ],
  },

  {
    id: "rug",
    background: rug_bg,
    placedAssets: [],
    navigations: [
      {
        area: {
          left: -1,
          right: 1,
          top: 1,
          bottom: 0.8,
        },
        cursor: move_up_cursor,
        destId: "main_east",
      },
      // back up to main_east
    ],
    interactions: [{ plugin: "rug" }],
    sounds: [],
    modals: [
      {
        includeIf: (teamState: TeamHuntState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes(
              LOCK_DATA.rug.gateId,
            ) ?? false
          );
        },
        ownedByInteraction: true,
        area: {
          left: -0.49,
          right: 0.52,
          top: 0,
          bottom: -0.81,
        },
        asset: ledger,
        placedAsset: {
          area: {
            left: -1,
            right: 1,
            top: 1,
            bottom: -1,
          },
          asset: numberlock_box_ledger,
        },
        slotId: "isp09",
        gateId: "isg14",
        postCode: "1K4T5XyjlogRERACrMXXbg==",
      },
    ],
  },

  {
    id: "desk_drawer",
    background: drawer_bg,
    placedAssets: [],
    navigations: [
      {
        area: {
          left: -1,
          right: 1,
          top: 1,
          bottom: 0.6,
        },
        cursor: move_up_cursor,
        destId: "main_north",
      },
    ],
    interactions: [{ plugin: "deskdrawer" }],
    sounds: [
      // directional lock slide
      // directional lock unlock
      // drawer slide
    ],
    modals: [
      {
        includeIf: (teamState: TeamHuntState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes(
              LOCK_DATA.deskdrawer.gateId,
            ) ?? false
          );
        },
        area: {
          left: -0.3,
          right: 0.31,
          top: 0.43,
          bottom: -0.09,
        },
        ownedByInteraction: true,
        placedAsset: {
          area: {
            // Note: this placement is ignored by the frontend;
            // the placement is pretty complicated to produce the
            // drawer-opening effect.
            left: -1,
            right: 1,
            top: 1,
            bottom: -1,
          },
          asset: drawer_with_candy,
        },
        asset: candy,
        slotId: "isp06",
        gateId: "isg11",
        postCode: "lxRFwDNndXOrzDkGdBQukA==",
      },
    ],
  },
  {
    id: "bookcase",
    background: "__wallpaper__",
    placedAssets: [],
    navigations: [
      {
        area: {
          left: -1,
          right: -0.8,
          top: 1,
          bottom: -1,
        },
        cursor: move_left_cursor,
        destId: "main_north",
      },
      {
        area: {
          left: 0.8,
          right: 1,
          top: 1,
          bottom: -1,
        },
        cursor: move_right_cursor,
        destId: "main_north",
      },
    ],
    interactions: [{ plugin: "bookcase" }],
    sounds: [
      // book slides out or back
    ],
    modals: [
      {
        area: {
          left: -0.784,
          right: -0.505,
          top: 0.522,
          bottom: 0.272,
        },
        asset: bookcase_note,
        slotId: "ism01",
        gateId: "isg00",
        postCode: "pswcZO3Z7JF9z1JzQfoIDQ==",
      },
    ],
  },

  {
    id: "cryptex",
    background: "", // TODO: background
    placedAssets: [],
    navigations: [
      {
        area: {
          left: -1,
          right: 1,
          top: 1,
          bottom: 0.8,
        },
        cursor: move_up_cursor,
        destId: "main_north",
      },
    ],
    interactions: [{ plugin: "cryptex" }],
    sounds: [
      // cryptex wheel tick
    ],
    modals: [
      {
        includeIf: (teamState: TeamHuntState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes(
              LOCK_DATA.cryptex.gateId,
            ) ?? false
          );
        },
        ownedByInteraction: true,
        area: {
          // adjust area once assets exist
          left: -0.15,
          right: 0.73,
          top: 0.48,
          bottom: -0.79,
        },
        placedAsset: {
          area: {
            left: -1,
            right: 1,
            top: 1,
            bottom: -1,
          },
          asset: cryptex_open,
        },
        asset: cryptex_note,
        slotId: "isp10",
        gateId: "isg15",
        postCode: "YXEwRKy4tAGrLZaycOe85Q==",
      },
    ],
  },

  {
    // This is the one to the right of the bookcase, obscuring the safe
    id: "painting1",
    background: "__wallpaper__",
    placedAssets: [],
    navigations: [
      {
        area: {
          left: -1,
          right: -0.6,
          top: 1,
          bottom: -1,
        },
        cursor: move_left_cursor,
        destId: "main_north",
      },
      {
        area: {
          left: 0.6,
          right: 1,
          top: 1,
          bottom: -1,
        },
        cursor: move_right_cursor,
        destId: "main_north",
      },
    ],
    interactions: [{ plugin: "painting1" }],
    sounds: [],
    modals: [
      {
        includeIf: (teamState: TeamHuntState) => {
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
    background: "__wallpaper__",
    placedAssets: [],
    navigations: [
      {
        area: {
          left: -1,
          right: -0.6,
          top: 1,
          bottom: -1,
        },
        cursor: move_left_cursor,
        destId: "main_west",
      },
      {
        area: {
          left: 0.6,
          right: 1,
          top: 1,
          bottom: -1,
        },
        cursor: move_right_cursor,
        destId: "main_north",
      },
    ],
    interactions: [{ plugin: "painting2" }],
    sounds: [
      // breaker off
      // breaker on
    ],
    modals: [
      {
        includeIf: (teamState: TeamHuntState) => {
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
    background: "__wallpaper__",
    placedAssets: [],
    navigations: [
      {
        area: {
          left: -1,
          right: 1,
          top: -0.7,
          bottom: -1,
        },
        cursor: move_down_cursor,
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
        cursor: move_down_cursor,
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
  teamState: TeamHuntState,
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
    const desc = puzzle?.initial_description;
    mixin = { title, slug, desc };
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

function filteredForFrontend(
  node: NodeInternal,
  teamState: TeamHuntState,
): Node {
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

  const keptPlacedAssets = node.placedAssets.flatMap((asset) => {
    const { includeIf, ...rest } = asset;
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
    placedAssets: keptPlacedAssets,
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
//   modals:
//     candies
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
