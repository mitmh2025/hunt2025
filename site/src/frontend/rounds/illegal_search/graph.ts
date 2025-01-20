import jsManifest from "../../../../dist/js-manifest-with-chunks.json";
import type { TeamHuntState } from "../../../../lib/api/client";
import { omit } from "../../../utils/omit";
import { PUZZLES } from "../../puzzles";
import bookcase from "./assets/bookcase/bookcase.png";
import bookcase_blacklight from "./assets/bookcase/bookcase_blacklight.svg";
import bookcase_paneling from "./assets/bookcase/bookcase_paneling.svg";
import bookcase_note from "./assets/bookcase/note.svg";
import bookcase_note_blacklight from "./assets/bookcase/note_blacklight.svg";
import bookcase_note_blacklight_modal from "./assets/bookcase/note_blacklight_modal.svg";
import bookcase_note_modal from "./assets/bookcase/note_modal.svg";
import cryptex_bg from "./assets/cryptex/cryptex_bg.png";
import cryptex_note from "./assets/cryptex/cryptex_note.png";
import cryptex_note_blacklight from "./assets/cryptex/cryptex_note_blacklight.png";
import cryptex_open from "./assets/cryptex/cryptex_open.svg";
import cryptex_open_blacklight from "./assets/cryptex/cryptex_open_blacklight.svg";
import drawer_bg from "./assets/desk_drawer/bg.png";
import candy from "./assets/desk_drawer/candy.svg";
import candy_blacklight from "./assets/desk_drawer/candy_modal_blacklight.png";
import drawer_with_candy from "./assets/desk_drawer/drawer.png";
import drawer_with_candy_blacklight from "./assets/desk_drawer/drawer_blacklight.png";
import rings_closeup from "./assets/fuse_box/fusebox_draft6_rings_asset_closeup.svg";
import rings from "./assets/fuse_box/rings.svg";
import rings_blacklight from "./assets/fuse_box/rings_blacklight.svg";
import rings_modal_blacklight from "./assets/fuse_box/rings_modal_blacklight.png";
import main_east_bg from "./assets/main_east.jpg";
import main_north_bg from "./assets/main_north.png";
import main_west_bg from "./assets/main_west.jpg";
import ledger from "./assets/rug/ledger.svg";
import ledger_blacklight from "./assets/rug/ledger_modal_blacklight.png";
import numberlock_box_ledger from "./assets/rug/numberlock_box_ledger.svg";
import numberlock_box_ledger_blacklight from "./assets/rug/numberlock_box_ledger_blacklight.png";
import rug_bg from "./assets/rug/rug_bg.svg";
import money from "./assets/safe/money.svg";
import money_blacklight from "./assets/safe/money_blacklight.png";
import money_modal from "./assets/safe/money_modal.svg";
import money_modal_blacklight from "./assets/safe/money_modal_blacklight.png";
import birth_certificate from "./assets/secret/birth_certificate.svg";
import birth_certificate_modal_solved from "./assets/secret/birth_certificate_modal_solved.png";
import birth_certificate_modal_unsolved from "./assets/secret/birth_certificate_modal_unsolved.png";
import candys_frame_modal_solved from "./assets/secret/candys_frame_modal_solved.png";
import candys_frame_modal_unsolved from "./assets/secret/candys_frame_modal_unsolved.png";
import candys_frame_solved from "./assets/secret/candys_frame_solved.png";
import candys_frame_unsolved from "./assets/secret/candys_frame_unsolved.png";
import secret_drawing_in_situ from "./assets/secret/drawing_in_situ.png";
import finsters_frame_modal_solved from "./assets/secret/finsters_frame_modal_solved.png";
import finsters_frame_modal_unsolved from "./assets/secret/finsters_frame_modal_unsolved.png";
import finsters_frame_solved from "./assets/secret/finsters_frame_solved.png";
import finsters_frame_unsolved from "./assets/secret/finsters_frame_unsolved.png";
import letter from "./assets/secret/letter.svg";
import letter_modal_solved from "./assets/secret/letter_modal_solved.png";
import letter_modal_unsolved from "./assets/secret/letter_modal_unsolved.png";
import magazine_solved from "./assets/secret/magazine_solved.png";
import magazine_solved_modal from "./assets/secret/magazine_solved_modal.png";
import magazine_unsolved from "./assets/secret/magazine_unsolved.png";
import newspaper from "./assets/secret/newspaper.svg";
import newspaper_modal_solved from "./assets/secret/newspaper_modal_solved.png";
import newspaper_modal_unsolved from "./assets/secret/newspaper_modal_unsolved.png";
import poster from "./assets/secret/poster.png";
import poster_modal from "./assets/secret/poster_modal.svg";
import round_title_secret_room from "./assets/secret/round_title_secret_room.svg";
import stamp from "./assets/secret/stamp.svg";
import stamp_modal from "./assets/secret/stamp_modal.svg";
import teddybear from "./assets/secret/teddybear.svg";
import secret_bg from "./assets/secret.jpg";
import blacklight_books from "./assets/study/blacklight_books.svg";
import cryptex_on_desk from "./assets/study/cryptex.svg";
import family_frame_east from "./assets/study/family_frame_east.png";
import family_frame_north from "./assets/study/family_frame_north.png";
import fusebox_frame from "./assets/study/fusebox_frame.svg";
import fusebox_frame_west from "./assets/study/fusebox_frame_west.svg";
import globe from "./assets/study/globe.svg";
import greatwave_frame from "./assets/study/greatwave_frame.png";
import lamp from "./assets/study/lamp.svg";
import open_door from "./assets/study/open_door.png";
import round_title from "./assets/study/round_title.svg";
import rug_east from "./assets/study/rug_east.svg";
import rug_north from "./assets/study/rug_north.svg";
import safe_frame from "./assets/study/safe_frame.png";
import safe_frame_border from "./assets/study/safe_frame_border.svg";
import typewriter from "./assets/study/typewriter.svg";
import telephone from "./assets/telephone/telephone.svg";
import telephone_blacklight from "./assets/telephone/telephone_unpushed_blacklight.svg";
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
  ModalInternalExtra,
  Node,
  NodeInternal,
  PluginName,
} from "./types";

export const BlacklightData = {
  candy: {
    asset: candy_blacklight,
    altText:
      "Rule ROTARY: You haven’t lived here long, have you? No one calls them “traffic circles” or “roundabouts.” In any case, add a donut to your purchase for each one you drove on. Rule TUMMYACHE: If you do not have enough donuts to fulfill your team’s request, do not extract any letters. Instead, feel shame.",
    slotId: "isp19",
    gateId: "isg27",
    postCode: "yPVAOzrL1cwh/baI4hgeyw==",
  },
  cryptex: {
    asset: cryptex_note_blacklight,
    altText:
      "What good is a cigarette without a light? Use a physical blacklight on the filters.",
    gateId: "isg31",
    postCode: "+TGXj5wKyr+u9CsD4Xrs5w==",
    slotId: "isp23",
  },
  ledger: {
    asset: ledger_blacklight,
    altText: "Same locations tuned to PM 23pi/20",
    gateId: "isg30",
    postCode: "7V7KoGrLaYKd3c1JHZGFiw==",
    slotId: "isp22",
  },
  money: {
    asset: money_modal_blacklight,
    altText: "Shift by difference from 8V",
    gateId: "isg29",
    postCode: "eHSQ6CPL9HB7ar5WzTxngA==",
    slotId: "isp21",
  },
  rings: {
    asset: rings_modal_blacklight,
    altText: "The third quartile was also always in plain sight.",
    gateId: "isg28",
    postCode: "iBRwyAWgSpy2zO+QnZzPKg==",
    slotId: "isp20",
  },
} satisfies Record<string, ModalInternalExtra>;

const scriptSrcs: Record<PluginName, { scriptSrc: string[] }> = {
  bookcase: {
    scriptSrc: jsManifest.illegal_search_bookcase,
  },
  cryptex: {
    scriptSrc: jsManifest.illegal_search_cryptex,
  },
  deskdrawer: {
    scriptSrc: jsManifest.illegal_search_deskdrawer,
  },
  extra: {
    scriptSrc: jsManifest.illegal_search_extra,
  },
  painting1: {
    scriptSrc: jsManifest.illegal_search_painting1,
  },
  painting2: {
    scriptSrc: jsManifest.illegal_search_painting2,
  },
  rug: {
    scriptSrc: jsManifest.illegal_search_rug,
  },
  safe: {
    scriptSrc: jsManifest.illegal_search_safe,
  },
  telephone: {
    scriptSrc: jsManifest.illegal_search_telephone,
  },
};

// The locks themselves correspond to gates.
type LockDatum = {
  answer: unknown; // The types of these vary by check
  // TODO: rate limit?
  gateId: string; // The gate which we will unlock when you submit the correct lock answer
};
// Map from which plugin does the check to the data relevant to that check
const LOCK_DATA: Record<
  Exclude<PluginName, "extra" | "telephone" | "safe">,
  LockDatum
> = {
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
    // For the benefit of manual testers: by rows:
    // 111010111101
    // 110101011010
    // 001010000000
    // 1101011011
    // 0011100101
    // 0010001010
    answer:
      "111010111101110101011010001010000000110101101100111001010010001010",
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
    title: round_title,
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
          left: -0.29,
          right: -0.167,
          top: 0.0705,
          bottom: -0.12,
        },
        asset: cryptex_on_desk,
      },
      {
        // Fuse box painting
        area: {
          left: -0.982,
          right: -0.645,
          top: 0.898,
          bottom: 0.033,
        },
        asset: fusebox_frame,
      },
      {
        // Safe painting
        area: {
          left: 0.275,
          right: 0.517,
          top: 0.837,
          bottom: 0.319,
        },
        asset: safe_frame,
      },
      {
        // Safe painting
        area: {
          left: 0.275,
          right: 0.517,
          top: 0.837,
          bottom: 0.319,
        },
        asset: safe_frame_border,
      },
      {
        // overlays: open door (if bookcase is open) + blacklight books
        area: {
          left: -1,
          right: 1,
          top: 1,
          bottom: -1,
        },
        asset: open_door,
        extraAsset: blacklight_books,
        includeIf: (teamState: TeamHuntState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes(
              LOCK_DATA.bookcase.gateId,
            ) ?? false
          );
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
        includeIf: (teamState: TeamHuntState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes(
              LOCK_DATA.bookcase.gateId,
            ) ?? false
          );
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
          left: 0.275,
          right: 0.517,
          top: 0.837,
          bottom: 0.319,
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
          top: 0.98,
        },
        cursor: zoom_cursor,
        destId: "bookcase",
      },
      {
        // desk drawer: "desk_drawer"
        area: {
          left: 0.201,
          right: 0.403,
          top: -0.18,
          bottom: -0.272,
        },
        cursor: zoom_cursor,
        destId: "desk_drawer",
      },
      {
        // cryptex
        area: {
          left: -0.29,
          right: -0.167,
          top: 0.0705,
          bottom: -0.12,
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
          left: 0.681,
          right: 0.991,
          top: 0.915,
          bottom: 0.006,
        },
        asset: family_frame_east,
        altText: "A family portrait of Papa, Gladys, and Baby",
        slotId: "isp03",
        gateId: "isg03",
        postCode: "PXz9UrF1GfwL9IAMFukA5Q==",
        placedAsset: {
          area: {
            left: 0.67,
            right: 0.991,
            top: 0.915,
            bottom: -0.01,
          },
          asset: family_frame_north,
        },
      },
      {
        // typewriter
        area: {
          left: -0.115,
          right: 0.118,
          top: 0.212,
          bottom: -0.095,
        },
        zIndex: 1,
        asset: typewriter,
        altText: "A typewriter",
        slotId: "isp04",
        gateId: "isg04",
        postCode: "IQN/w3pMLLmF/B4xpqomvA==",
      },
      {
        // desk lamp
        area: {
          left: 0.19585849870578093,
          right: 0.34253666954270917,
          top: 0.3097497842968076,
          bottom: -0.08599367270635601,
        },
        asset: lamp,
        altText: "A desk lamp",
        slotId: "isp05",
        gateId: "isg05",
        postCode: "9xkLSNSDtS8+0Aee26ApAg==",
      },
    ],
  },

  {
    id: "main_east",
    background: main_east_bg,
    title: round_title,
    placedAssets: [
      {
        area: {
          left: -0.14,
          right: 0.05,
          top: 0.37,
          bottom: -0.33,
        },
        asset: telephone,
        extraAsset: telephone_blacklight,
      },
      {
        area: {
          left: -0.8208333333,
          top: -0.8111111111,
          right: -0.09583333333,
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
          left: -0.8208333333,
          top: -0.8092592593,
          right: -0.09583333333,
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
    escapes: [
      {
        area: {
          left: 0.09,
          right: 0.49,
          top: 0.76,
          bottom: -0.83,
        },
        cursor: move_up_cursor,
        href: "/",
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
          left: -0.68,
          right: -0.197,
          top: 0.693,
          bottom: -0.23,
        },
        asset: family_frame_east,
        altText: "A family portrait of Papa, Gladys, and Baby",
        slotId: "isp03",
        gateId: "isg03",
        postCode: "PXz9UrF1GfwL9IAMFukA5Q==",
      },
    ],
  },

  {
    id: "main_west",
    background: main_west_bg,
    title: round_title,
    placedAssets: [
      {
        area: {
          left: 0.249,
          right: 0.706,
          top: 0.763,
          bottom: -0.213,
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
          left: 0.249,
          right: 0.706,
          top: 0.902,
          bottom: -0.213,
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
        altText: "A painting hanging on the wall",
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
        altText: "A globe",
        slotId: "isp02", // TODO: confirm puzzle-item mapping
        gateId: "isg02",
        postCode: "fWTr5MCGd9lNSy1WuJzjXA==",
      },
    ],
  },

  {
    id: "rug",
    background: rug_bg,
    title: round_title,
    placedAssets: [],
    navigations: [
      // top and right edge: pan to main_east
      {
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
        area: {
          left: -1,
          right: 1,
          top: 1,
          bottom: 0.8,
        },
        cursor: move_up_cursor,
        destId: "main_east",
      },
      // all other edges go to main_north
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
          left: -1,
          right: 1,
          top: -0.87,
          bottom: -1,
        },
        cursor: move_down_cursor,
        destId: "main_north",
      },
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
        altText: "A ledger labelled “Accounts”",
        placedAsset: {
          area: {
            left: -1,
            right: 1,
            top: 1,
            bottom: -1,
          },
          asset: numberlock_box_ledger,
          extraAsset: numberlock_box_ledger_blacklight,
        },
        extra: BlacklightData.ledger,
        slotId: "isp09",
        gateId: "isg14",
        postCode: "1K4T5XyjlogRERACrMXXbg==",
      },
    ],
  },

  {
    id: "desk_drawer",
    background: drawer_bg,
    title: round_title,
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
          left: -1,
          right: 1,
          top: -0.8,
          bottom: -1,
        },
        cursor: move_down_cursor,
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
          extraAsset: drawer_with_candy_blacklight,
        },
        asset: candy,
        altText: "A bowl of hard candies",
        slotId: "isp06",
        gateId: "isg11",
        postCode: "lxRFwDNndXOrzDkGdBQukA==",
        extra: BlacklightData.candy,
      },
    ],
  },
  {
    id: "bookcase",
    background: "__wallpaper__",
    title: round_title,
    placedAssets: [
      {
        area: {
          left: -1,
          right: 1,
          top: 1,
          bottom: -1,
        },
        asset: bookcase_paneling,
      },
      {
        area: {
          left: -0.37360594795539037,
          right: 0.5,
          top: 0.9140850888062784,
          bottom: -0.9991738950846757,
        },
        asset: bookcase,
        includeIf: (teamState: TeamHuntState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes("isg26") ?? false
          );
        },
      },
      {
        area: {
          left: -1,
          right: 1,
          top: 1,
          bottom: -1,
        },
        asset: null,
        extraAsset: bookcase_blacklight,
      },
    ],
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
    interactions: [
      {
        plugin: "bookcase",
        includeIf: (teamState: TeamHuntState) => {
          return !(
            teamState.rounds.illegal_search?.gates?.includes("isg26") ?? false
          );
        },
      },
    ],
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
        placedAsset: {
          area: {
            left: -0.834,
            right: -0.455,
            top: 0.572,
            bottom: 0.222,
          },
          asset: bookcase_note,
          extraAsset: bookcase_note_blacklight,
        },
        asset: bookcase_note_modal,
        altText:
          "A todo list with two items: Deadbeat Debt Collection and Mark Dirty Stacks.  The first item is crossed out.",
        extra: {
          asset: bookcase_note_blacklight_modal,
          altText:
            "A todo list with two items: Deadbeat Debt Collection and Mark Dirty Stacks. The first item is crossed out, and the second is crossed out in blacklight ink.",
          gateId: "isg32",
          postCode: "SHqjcRam7FKcuKgOkwziig==",
          slotId: "ism03",
        },
        slotId: "ism01",
        gateId: "isg00",
        postCode: "pswcZO3Z7JF9z1JzQfoIDQ==",
      },
    ],
  },

  {
    id: "cryptex",
    background: cryptex_bg,
    title: round_title,
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
          left: -1,
          right: 1,
          top: -0.8,
          bottom: -1,
        },
        cursor: move_down_cursor,
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
          left: 0.399,
          right: 0.738,
          top: 0.478,
          bottom: -0.019,
        },
        placedAsset: {
          area: {
            left: -1,
            right: 1,
            top: 1,
            bottom: -1,
          },
          asset: cryptex_open,
          extraAsset: cryptex_open_blacklight,
        },
        asset: cryptex_note,
        altText:
          "A handwritten note labelled “Ideas for Gladys Wedding Gift” with entries “Car? Ask Rover re new models,” “Necklace,” ”Mother’s ring” (crossed off), “See if Hendersons in market to sell manor,” and “Put Hendersons in market to sell manor”",
        extra: BlacklightData.cryptex,
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
    title: round_title,
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
    modals: [],
  },

  {
    // zoomed in on the safe behind painting 1
    id: "safe",
    background: "__wallpaper_lg__",
    title: round_title,
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
        destId: "painting1",
      },
      {
        area: {
          left: 0.6,
          right: 1,
          top: 1,
          bottom: -1,
        },
        cursor: move_right_cursor,
        destId: "painting1",
      },
    ],
    interactions: [{ plugin: "safe" }],
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
          left: -0.289,
          right: 0.266,
          top: -0.069,
          bottom: -0.738,
        },
        asset: money_modal,
        altText: "A stack of bills",
        placedAsset: {
          area: {
            left: -0.289,
            right: 0.266,
            top: -0.069,
            bottom: -0.738,
          },
          asset: money,
          extraAsset: money_blacklight,
        },
        slotId: "isp08",
        gateId: "isg13",
        postCode: "Ba+T1nVoh2GFJTIXnh7H8A==",
        extra: BlacklightData.money,
      },
    ],
  },

  {
    // This is the one on the west wall, obscuring the fuse box
    id: "painting2",
    background: "__wallpaper__",
    title: round_title,
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
        altText: "Two plain gold rings",
        extra: BlacklightData.rings,
        placedAsset: {
          area: {
            left: -0.06,
            right: 0.06,
            top: -0.724,
            bottom: -0.846,
          },
          asset: rings,
          extraAsset: rings_blacklight,
        },
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
    title: round_title,
    placedAssets: [
      {
        area: {
          left: -0.6,
          right: 0.6,
          top: 0.8,
          bottom: -0.8,
        },
        asset: telephone,
        includeIf: (teamState: TeamHuntState) => {
          return !(
            teamState.rounds.illegal_search?.gates?.includes("isg26") ?? false
          );
        },
      },
    ],
    navigations: [
      {
        area: {
          left: -1,
          right: -0.6,
          top: 1,
          bottom: -1,
        },
        cursor: move_left_cursor,
        destId: "main_east",
      },
      {
        area: {
          left: 0.6,
          right: 1,
          top: 1,
          bottom: -1,
        },
        cursor: move_right_cursor,
        destId: "main_east",
      },
    ],
    interactions: [
      {
        plugin: "telephone",
        includeIf: (teamState: TeamHuntState) => {
          return (
            teamState.rounds.illegal_search?.gates?.includes("isg26") ?? false
          );
        },
      },
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
    title: round_title_secret_room,
    placedAssets: [
      {
        area: {
          left: -0.93,
          right: -0.61,
          top: 0.85,
          bottom: -0.33,
        },
        asset: secret_drawing_in_situ,
      },
    ],
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
    ],
    interactions: [],
    sounds: [],
    modals: [
      // there's like 8 or something in here?  wow
      {
        // Birth certificate
        area: {
          left: -0.33,
          right: -0.22,
          top: -0.13,
          bottom: -0.29,
        },
        asset: birth_certificate_modal_unsolved,
        altText: "Some sort of certificate. It is blurred and illegible",
        placedAsset: {
          area: {
            left: -0.33,
            right: -0.22,
            top: -0.13,
            bottom: -0.29,
          },
          asset: birth_certificate,
        },
        solvedAssets: {
          modalAsset: birth_certificate_modal_solved,
          modalAltText:
            "A birth certificate for Teresa Nina Candy, daughter of Benjamin and Nadine Candy",
        },
        slotId: "isp11",
        gateId: "isg18",
        postCode: "AWmzimAkS8G0wLH7WatJlw==",
      },
      {
        // Newspaper clipping
        area: {
          left: -0.45,
          right: -0.33,
          top: 0.23,
          bottom: 0.02,
        },
        asset: newspaper_modal_unsolved,
        altText: "A newspaper clipping. It is blurred and illegible",
        placedAsset: {
          area: {
            left: -0.45,
            right: -0.33,
            top: 0.23,
            bottom: 0.02,
          },
          asset: newspaper,
        },
        solvedAssets: {
          modalAsset: newspaper_modal_solved,
          modalAltText:
            "A newspaper clipping of an article regarding the arrest of Benjamin and Nadine Candy after a failed bank robbery",
        },
        slotId: "isp12",
        gateId: "isg19",
        postCode: "3LdOYbqNPGHYrvH7KKaMaA==",
      },
      {
        // Letter
        area: {
          left: -0.5,
          right: -0.37,
          top: -0.16,
          bottom: -0.29,
        },
        asset: letter_modal_unsolved,
        altText: "A tri-folded letter. It is blurred and illegible",
        placedAsset: {
          area: {
            left: -0.5,
            right: -0.37,
            top: -0.16,
            bottom: -0.29,
          },
          asset: letter,
        },
        solvedAssets: {
          modalAsset: letter_modal_solved,
          modalAltText:
            "A letter from Warden Rutherford Pepper of the MITropolis Penitentiary to Papa implying that Papa provided information to ensure that two criminals would be denied parole",
        },
        slotId: "isp13",
        gateId: "isg20",
        postCode: "lopyihUSAPmlZa5dOEBH/w==",
      },
      {
        // Photo of the Candys and Baby
        area: {
          left: -0.11,
          right: 0.02,
          top: 0.38,
          bottom: 0.16,
        },
        asset: candys_frame_modal_unsolved,
        altText: "A photo. It is blurred and the subjects are unrecognizable",
        placedAsset: {
          area: {
            left: -0.11,
            right: 0.02,
            top: 0.38,
            bottom: 0.16,
          },
          asset: candys_frame_unsolved,
        },
        solvedAssets: {
          modalAsset: candys_frame_modal_solved,
          placedAsset: candys_frame_solved,
          modalAltText:
            "A photo of a man and a woman holding a baby, labelled “The Candys and their baby”",
        },
        slotId: "isp14",
        gateId: "isg21",
        postCode: "ThjWDlBYS112vfoCFdYqxQ==",
      },
      {
        // Photo of Papa with his wife and Gladys
        area: {
          left: -0.24,
          right: -0.14,
          top: 0.21,
          bottom: 0.03,
        },
        asset: finsters_frame_modal_unsolved,
        altText: "A photo. It is blurred and the subjects are unrecognizable",
        placedAsset: {
          area: {
            left: -0.24,
            right: -0.14,
            top: 0.21,
            bottom: 0.03,
          },
          asset: finsters_frame_unsolved,
        },
        solvedAssets: {
          modalAsset: finsters_frame_modal_solved,
          placedAsset: finsters_frame_solved,
          modalAltText:
            "A photo of Papa, Mama, and Gladys, who is holding a teddy bear",
        },
        slotId: "isp15",
        gateId: "isg22",
        postCode: "XUu27ZhwbTcOJg2l4Yohsw==",
      },
      {
        // Rare stamp
        area: {
          left: 0.19446536144578322,
          right: 0.3283132530120483,
          top: 0.29518072289156627,
          bottom: 0.05120481927710835,
        },
        asset: stamp_modal,
        altText:
          "A MITropolis Postage stamp with an upside down Duesenberg Model J",
        placedAsset: {
          area: {
            left: 0.18,
            right: 0.348,
            top: 0.26,
            bottom: 0.078,
          },
          asset: stamp,
        },
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
        asset: teddybear,
        altText: "A teddy bear",
        slotId: "isp17",
        gateId: "isg24",
        postCode: "liZx1HnT5Bxo/tIbUfRlWg==",
      },
      {
        // Radio drama poster
        area: {
          left: 0.6904326630103594,
          right: 0.9463741620962826,
          top: 0.6771616223170154,
          bottom: -0.2783533076037646,
        },
        asset: poster_modal,
        altText:
          "A poster of a man in a fedora and a trenchcoat holding a gun. The text says “The Tantalizing Adventures of Dr. Ulysses V. Wurlitzer, Bounty Hunter. Who knows what heart lurks in the chests of men. Action! Drama! Soap advertisements!",
        placedAsset: {
          area: {
            left: 0.69,
            right: 0.95,
            top: 0.8,
            bottom: -0.38,
          },
          asset: poster,
        },
        slotId: "isp18",
        gateId: "isg25",
        postCode: "fv6Vuq1GktlO5DdXGVuBNQ==",
      },
      {
        // Magazines
        area: {
          left: -0.2,
          right: 0.05,
          top: -0.05,
          bottom: -0.35,
        },
        asset: magazine_unsolved,
        altText: "A stack of magazines. They are blurred and illegible",
        slotId: "ism02",
        gateId: "isg17",
        postCode: "9eUWKfZBfQZgWQ0wn5RPHA==",
        solvedAssets: {
          modalAsset: magazine_solved_modal,
          placedAsset: magazine_solved,
          modalAltText:
            "A comic book titled “[What will our heroes find] In the Blacklight”",
        },
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

const MODALS_BY_EXTRA_POSTCODE = new Map<string, ModalInternal>();
ALL_NODES.forEach((node) => {
  node.modals.forEach((modal) => {
    if (modal.extra?.postCode) {
      MODALS_BY_EXTRA_POSTCODE.set(modal.extra.postCode, modal);
    }
  });
});

const NODE_IDS_BY_PUZZLE_SLUG: Record<string, string> = {
  皇帝の暗号: "main_west",
  this_is_just_a_test: "main_west",
  paw_print_detective: "main_east",
  a_puzzle_of_the_dead: "main_north",
  cross_spread: "main_north",
  cahfee_regulah: "desk_drawer",
  the_center_is_in_plain_sight: "painting2",
  jargon: "safe",
  given_up: "rug",
  smoke_em_if_youve_got_em: "cryptex",
  passage_of_time: "secret",
  corn_maize: "secret",
  the_annual_massachusetts_spelling_bee: "secret",
  a_heap_of_clards: "secret",
  fechtbuch: "secret",
  bermuda_triangle: "secret",
  half_baked: "secret",
  networking_event: "secret",
  cahfee_regulah_blacklight: "desk_drawer",
  the_center_is_in_plain_sight_blacklight: "painting2",
  jargon_blacklight: "safe",
  given_up_blacklight: "rug",
  smoke_em_if_youve_got_em_blacklight: "cryptex",
  papas_bookcase: "bookcase",
  papas_stash: "secret",
  papas_bookcase_blacklight: "bookcase",
};

function modalFromModalInternal(
  modalInternal: ModalInternal,
  teamState: TeamHuntState,
  { immutable }: { immutable: boolean },
): [Modal, boolean] | undefined {
  const {
    includeIf,
    ownedByInteraction,
    slotId,
    postCode,
    gateId: _gateId,
    solvedAssets,
    extra,
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
  const obj: Modal = { ...rest, ...mixin };

  if (solvedAssets && slug) {
    const isSolved = !!teamState.puzzles[slug]?.answer || immutable;
    if (isSolved) {
      if (solvedAssets.modalAsset) {
        obj.asset = solvedAssets.modalAsset;
      }
      if (solvedAssets.modalAltText) {
        obj.altText = solvedAssets.modalAltText;
      }

      if (solvedAssets.placedAsset) {
        if (obj.placedAsset) {
          obj.placedAsset = {
            ...obj.placedAsset,
            asset: solvedAssets.placedAsset,
          };
        } else {
          obj.placedAsset = { asset: solvedAssets.placedAsset, area: obj.area };
        }
      }
    }
  }

  if (teamState.rounds.illegal_search?.gates?.includes("isg26") && extra) {
    const extraSlotObj = teamState.rounds.illegal_search.slots[extra.slotId];
    const extraSlug = extraSlotObj?.slug;
    // If slug is undefined, then lookup the random slot id => POST code mapping and include that
    // otherwise, lookup (or stub) puzzle title & URL based on the slug from the puzzle data map
    if (extraSlug) {
      const extraPuzzle = PUZZLES[extraSlug];
      const extraTitle =
        extraPuzzle?.title ?? `Stub puzzle for slot ${extra.slotId}`;
      const extraDesc = extraPuzzle?.initial_description;
      obj.extra = {
        asset: extra.asset,
        altText: extra.altText,
        title: extraTitle,
        slug: extraSlug,
        desc: extraDesc,
      };
    } else {
      obj.extra = {
        asset: extra.asset,
        altText: extra.altText,
        postCode: extra.postCode,
      };
    }
  } else if (obj.placedAsset) {
    obj.placedAsset = omit(obj.placedAsset, "extraAsset");
  }

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
  { immutable }: { immutable: boolean },
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

    if (!teamState.rounds.illegal_search?.gates?.includes("isg26")) {
      delete rest.extraAsset;

      if (rest.asset === null) {
        // blacklight-only asset
        return [];
      }
    }

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
    const result = modalFromModalInternal(modal, teamState, { immutable });
    if (result) {
      const [objForFrontend, ownedByInteraction] = result;
      if (ownedByInteraction) {
        interactionModals.push(objForFrontend);
      } else {
        modals.push(objForFrontend);
      }
    }
  });

  const keptInteractions = node.interactions.flatMap((interaction) => {
    const { includeIf, ...rest } = interaction;
    const publicInteraction = { ...rest, ...scriptSrcs[rest.plugin] };

    if (includeIf === undefined) {
      // No condition means always include
      return [publicInteraction];
    } else {
      const keep = includeIf(teamState);
      if (keep) {
        return [publicInteraction];
      } else {
        return [];
      }
    }
  });

  if (teamState.rounds.illegal_search?.gates?.includes("isg26")) {
    keptInteractions.push({
      plugin: "extra",
      overlay: true,
      ...scriptSrcs.extra,
    });
  }

  return {
    id: node.id,
    background: node.background,
    title: node.title,
    placedAssets: keptPlacedAssets,
    navigations: keptNavigations,
    escapes: node.escapes,
    interactions: keptInteractions,
    sounds: node.sounds,
    modals,
    interactionModals:
      interactionModals.length > 0 ? interactionModals : undefined,
  };
}

export {
  NODES_BY_ID,
  NODE_IDS_BY_PUZZLE_SLUG,
  MODALS_BY_EXTRA_POSTCODE,
  MODALS_BY_POSTCODE,
  LOCK_DATA,
  filteredForFrontend,
};

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
