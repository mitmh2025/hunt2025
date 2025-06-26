import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import developing from "../../rounds/stakeout/assets/polaroid_developing_photo_only.png";
import { deviceMax } from "../../utils/breakpoints";
import campusmap from "./assets/campusmap.svg";
import fakenote_beacon from "./assets/fakenotes/beacon.png";
import fakenote_far from "./assets/fakenotes/far.png";
import fakenote_fm from "./assets/fakenotes/fm.png";
import fakenote_gum from "./assets/fakenotes/gum.png";
import fakenote_nothing from "./assets/fakenotes/nothing.png";
import fakenote_unreachable from "./assets/fakenotes/unreachable.png";
import note_antpecker from "./assets/notes/antpecker.png";
import note_antthrush from "./assets/notes/antthrush.png";
import note_bittern from "./assets/notes/bittern.png";
import note_blackthroat from "./assets/notes/blackthroat.png";
import note_chickadee from "./assets/notes/chickadee.png";
import note_chough from "./assets/notes/chough.png";
import note_goose from "./assets/notes/goose.png";
import note_oriole from "./assets/notes/oriole.png";
import note_quail from "./assets/notes/quail.png";
import note_sheldgoose from "./assets/notes/sheldgoose.png";
import note_spinebill from "./assets/notes/spinebill.png";
import note_stint from "./assets/notes/stint.png";
import note_waterthrush from "./assets/notes/waterthrush.png";
import note_whydah from "./assets/notes/whydah.png";
import photo_0_1_E from "./assets/photos/0-1-E.jpg";
import photo_0_1_S from "./assets/photos/0-1-S.jpg";
import photo_0_10_N from "./assets/photos/0-10-N.jpg";
import photo_0_10_S from "./assets/photos/0-10-S.jpg";
import photo_0_11_E from "./assets/photos/0-11-E.jpg";
import photo_0_11_N from "./assets/photos/0-11-N.jpg";
import photo_0_11_S from "./assets/photos/0-11-S.jpg";
import photo_0_12_N from "./assets/photos/0-12-N.jpg";
import photo_0_12_S from "./assets/photos/0-12-S.jpg";
import photo_0_12_W from "./assets/photos/0-12-W.jpg";
import photo_0_14_E from "./assets/photos/0-14-E.jpg";
import photo_0_14_N from "./assets/photos/0-14-N.jpg";
import photo_0_15_N from "./assets/photos/0-15-N.jpg";
import photo_0_15_S from "./assets/photos/0-15-S.jpg";
import photo_0_16_N from "./assets/photos/0-16-N.jpg";
import photo_0_16_S from "./assets/photos/0-16-S.jpg";
import photo_0_17_E from "./assets/photos/0-17-E.jpg";
import photo_0_17_N from "./assets/photos/0-17-N.jpg";
import photo_0_18_N from "./assets/photos/0-18-N.jpg";
import photo_0_18_W from "./assets/photos/0-18-W.jpg";
import photo_0_19_E from "./assets/photos/0-19-E.jpg";
import photo_0_19_W from "./assets/photos/0-19-W.jpg";
import photo_0_2_S from "./assets/photos/0-2-S.jpg";
import photo_0_2_W from "./assets/photos/0-2-W.jpg";
import photo_0_20_E from "./assets/photos/0-20-E.jpg";
import photo_0_20_W from "./assets/photos/0-20-W.jpg";
import photo_0_3_E from "./assets/photos/0-3-E.jpg";
import photo_0_3_S from "./assets/photos/0-3-S.jpg";
import photo_0_3_W from "./assets/photos/0-3-W.jpg";
import photo_0_4_E from "./assets/photos/0-4-E.jpg";
import photo_0_4_S from "./assets/photos/0-4-S.jpg";
import photo_0_4_W from "./assets/photos/0-4-W.jpg";
import photo_0_5_E from "./assets/photos/0-5-E.jpg";
import photo_0_5_N from "./assets/photos/0-5-N.jpg";
import photo_0_5_W from "./assets/photos/0-5-W.jpg";
import photo_0_6_E from "./assets/photos/0-6-E.jpg";
import photo_0_6_N from "./assets/photos/0-6-N.jpg";
import photo_0_6_W from "./assets/photos/0-6-W.jpg";
import photo_0_8_N from "./assets/photos/0-8-N.jpg";
import photo_0_8_S from "./assets/photos/0-8-S.jpg";
import photo_1_1_E from "./assets/photos/1-1-E.jpg";
import photo_1_1_S from "./assets/photos/1-1-S.jpg";
import photo_1_10_N from "./assets/photos/1-10-N.jpg";
import photo_1_10_S from "./assets/photos/1-10-S.jpg";
import photo_1_10_W from "./assets/photos/1-10-W.jpg";
import photo_1_11_E from "./assets/photos/1-11-E.jpg";
import photo_1_11_N from "./assets/photos/1-11-N.jpg";
import photo_1_11_S from "./assets/photos/1-11-S.jpg";
import photo_1_12_N from "./assets/photos/1-12-N.jpg";
import photo_1_12_S from "./assets/photos/1-12-S.jpg";
import photo_1_12_W from "./assets/photos/1-12-W.jpg";
import photo_1_13_E from "./assets/photos/1-13-E.jpg";
import photo_1_13_N from "./assets/photos/1-13-N.jpg";
import photo_1_13_W from "./assets/photos/1-13-W.jpg";
import photo_1_14_E from "./assets/photos/1-14-E.jpg";
import photo_1_14_N from "./assets/photos/1-14-N.jpg";
import photo_1_14_W from "./assets/photos/1-14-W.jpg";
import photo_1_15_E from "./assets/photos/1-15-E.jpg";
import photo_1_15_N from "./assets/photos/1-15-N.jpg";
import photo_1_15_S from "./assets/photos/1-15-S.jpg";
import photo_1_16_N from "./assets/photos/1-16-N.jpg";
import photo_1_16_S from "./assets/photos/1-16-S.jpg";
import photo_1_16_W from "./assets/photos/1-16-W.jpg";
import photo_1_17_E from "./assets/photos/1-17-E.jpg";
import photo_1_17_N from "./assets/photos/1-17-N.jpg";
import photo_1_18_N from "./assets/photos/1-18-N.jpg";
import photo_1_18_W from "./assets/photos/1-18-W.jpg";
import photo_1_19_E from "./assets/photos/1-19-E.jpg";
import photo_1_19_W from "./assets/photos/1-19-W.jpg";
import photo_1_2_E from "./assets/photos/1-2-E.jpg";
import photo_1_2_S from "./assets/photos/1-2-S.jpg";
import photo_1_2_W from "./assets/photos/1-2-W.jpg";
import photo_1_20_E from "./assets/photos/1-20-E.jpg";
import photo_1_20_W from "./assets/photos/1-20-W.jpg";
import photo_1_3_E from "./assets/photos/1-3-E.jpg";
import photo_1_3_S from "./assets/photos/1-3-S.jpg";
import photo_1_3_W from "./assets/photos/1-3-W.jpg";
import photo_1_4_E from "./assets/photos/1-4-E.jpg";
import photo_1_4_S from "./assets/photos/1-4-S.jpg";
import photo_1_4_W from "./assets/photos/1-4-W.jpg";
import photo_1_5_E from "./assets/photos/1-5-E.jpg";
import photo_1_5_W from "./assets/photos/1-5-W.jpg";
import photo_1_6_E from "./assets/photos/1-6-E.jpg";
import photo_1_6_W from "./assets/photos/1-6-W.jpg";
import photo_1_7_N from "./assets/photos/1-7-N.jpg";
import photo_1_7_S from "./assets/photos/1-7-S.jpg";
import photo_1_7_W from "./assets/photos/1-7-W.jpg";
import photo_1_8_E from "./assets/photos/1-8-E.jpg";
import photo_1_8_N from "./assets/photos/1-8-N.jpg";
import photo_1_8_S from "./assets/photos/1-8-S.jpg";
import photo_1_8_W from "./assets/photos/1-8-W.jpg";
import photo_1_9_E from "./assets/photos/1-9-E.jpg";
import photo_1_9_N from "./assets/photos/1-9-N.jpg";
import photo_1_9_S from "./assets/photos/1-9-S.jpg";
import photo_2_1_E from "./assets/photos/2-1-E.jpg";
import photo_2_1_S from "./assets/photos/2-1-S.jpg";
import photo_2_10_N from "./assets/photos/2-10-N.jpg";
import photo_2_10_S from "./assets/photos/2-10-S.jpg";
import photo_2_11_E from "./assets/photos/2-11-E.jpg";
import photo_2_11_N from "./assets/photos/2-11-N.jpg";
import photo_2_11_S from "./assets/photos/2-11-S.jpg";
import photo_2_12_N from "./assets/photos/2-12-N.jpg";
import photo_2_12_S from "./assets/photos/2-12-S.jpg";
import photo_2_12_W from "./assets/photos/2-12-W.jpg";
import photo_2_13_N from "./assets/photos/2-13-N.jpg";
import photo_2_13_W from "./assets/photos/2-13-W.jpg";
import photo_2_14_E from "./assets/photos/2-14-E.jpg";
import photo_2_14_N from "./assets/photos/2-14-N.jpg";
import photo_2_15_N from "./assets/photos/2-15-N.jpg";
import photo_2_15_S from "./assets/photos/2-15-S.jpg";
import photo_2_16_N from "./assets/photos/2-16-N.jpg";
import photo_2_16_S from "./assets/photos/2-16-S.jpg";
import photo_2_17_E from "./assets/photos/2-17-E.jpg";
import photo_2_17_N from "./assets/photos/2-17-N.jpg";
import photo_2_18_N from "./assets/photos/2-18-N.jpg";
import photo_2_18_W from "./assets/photos/2-18-W.jpg";
import photo_2_19_E from "./assets/photos/2-19-E.jpg";
import photo_2_19_W from "./assets/photos/2-19-W.jpg";
import photo_2_2_S from "./assets/photos/2-2-S.jpg";
import photo_2_2_W from "./assets/photos/2-2-W.jpg";
import photo_2_20_E from "./assets/photos/2-20-E.jpg";
import photo_2_20_W from "./assets/photos/2-20-W.jpg";
import photo_2_3_E from "./assets/photos/2-3-E.jpg";
import photo_2_3_S from "./assets/photos/2-3-S.jpg";
import photo_2_3_W from "./assets/photos/2-3-W.jpg";
import photo_2_4_E from "./assets/photos/2-4-E.jpg";
import photo_2_4_S from "./assets/photos/2-4-S.jpg";
import photo_2_4_W from "./assets/photos/2-4-W.jpg";
import photo_2_5_E from "./assets/photos/2-5-E.jpg";
import photo_2_5_W from "./assets/photos/2-5-W.jpg";
import photo_2_6_E from "./assets/photos/2-6-E.jpg";
import photo_2_6_W from "./assets/photos/2-6-W.jpg";
import photo_2_7_N from "./assets/photos/2-7-N.jpg";
import photo_2_7_S from "./assets/photos/2-7-S.jpg";
import photo_2_8_N from "./assets/photos/2-8-N.jpg";
import photo_2_8_S from "./assets/photos/2-8-S.jpg";
import photo_2_9_N from "./assets/photos/2-9-N.jpg";
import photo_2_9_S from "./assets/photos/2-9-S.jpg";
import photo_3_1_E from "./assets/photos/3-1-E.jpg";
import photo_3_1_S from "./assets/photos/3-1-S.jpg";
import photo_3_10_N from "./assets/photos/3-10-N.jpg";
import photo_3_10_S from "./assets/photos/3-10-S.jpg";
import photo_3_11_E from "./assets/photos/3-11-E.jpg";
import photo_3_11_N from "./assets/photos/3-11-N.jpg";
import photo_3_11_S from "./assets/photos/3-11-S.jpg";
import photo_3_12_N from "./assets/photos/3-12-N.jpg";
import photo_3_12_S from "./assets/photos/3-12-S.jpg";
import photo_3_12_W from "./assets/photos/3-12-W.jpg";
import photo_3_13_N from "./assets/photos/3-13-N.jpg";
import photo_3_13_W from "./assets/photos/3-13-W.jpg";
import photo_3_14_E from "./assets/photos/3-14-E.jpg";
import photo_3_14_N from "./assets/photos/3-14-N.jpg";
import photo_3_15_N from "./assets/photos/3-15-N.jpg";
import photo_3_15_S from "./assets/photos/3-15-S.jpg";
import photo_3_16_N from "./assets/photos/3-16-N.jpg";
import photo_3_16_S from "./assets/photos/3-16-S.jpg";
import photo_3_17_E from "./assets/photos/3-17-E.jpg";
import photo_3_17_N from "./assets/photos/3-17-N.jpg";
import photo_3_18_N from "./assets/photos/3-18-N.jpg";
import photo_3_18_W from "./assets/photos/3-18-W.jpg";
import photo_3_19_E from "./assets/photos/3-19-E.jpg";
import photo_3_19_W from "./assets/photos/3-19-W.jpg";
import photo_3_2_S from "./assets/photos/3-2-S.jpg";
import photo_3_2_W from "./assets/photos/3-2-W.jpg";
import photo_3_20_E from "./assets/photos/3-20-E.jpg";
import photo_3_20_W from "./assets/photos/3-20-W.jpg";
import photo_3_3_E from "./assets/photos/3-3-E.jpg";
import photo_3_3_S from "./assets/photos/3-3-S.jpg";
import photo_3_3_W from "./assets/photos/3-3-W.jpg";
import photo_3_4_E from "./assets/photos/3-4-E.jpg";
import photo_3_4_S from "./assets/photos/3-4-S.jpg";
import photo_3_4_W from "./assets/photos/3-4-W.jpg";
import photo_3_5_E from "./assets/photos/3-5-E.jpg";
import photo_3_5_W from "./assets/photos/3-5-W.jpg";
import photo_3_6_E from "./assets/photos/3-6-E.jpg";
import photo_3_6_W from "./assets/photos/3-6-W.jpg";
import photo_3_7_N from "./assets/photos/3-7-N.jpg";
import photo_3_7_S from "./assets/photos/3-7-S.jpg";
import photo_3_8_N from "./assets/photos/3-8-N.jpg";
import photo_3_8_S from "./assets/photos/3-8-S.jpg";
import photo_3_9_N from "./assets/photos/3-9-N.jpg";
import photo_3_9_S from "./assets/photos/3-9-S.jpg";
import photo_4_1_E from "./assets/photos/4-1-E.jpg";
import photo_4_1_S from "./assets/photos/4-1-S.jpg";
import photo_4_12_N from "./assets/photos/4-12-N.jpg";
import photo_4_12_S from "./assets/photos/4-12-S.jpg";
import photo_4_12_W from "./assets/photos/4-12-W.jpg";
import photo_4_16_N from "./assets/photos/4-16-N.jpg";
import photo_4_16_S from "./assets/photos/4-16-S.jpg";
import photo_4_18_N from "./assets/photos/4-18-N.jpg";
import photo_4_18_W from "./assets/photos/4-18-W.jpg";
import photo_4_2_S from "./assets/photos/4-2-S.jpg";
import photo_4_2_W from "./assets/photos/4-2-W.jpg";
import photo_4_20_E from "./assets/photos/4-20-E.jpg";
import photo_4_20_W from "./assets/photos/4-20-W.jpg";
import photo_4_3_E from "./assets/photos/4-3-E.jpg";
import photo_4_3_S from "./assets/photos/4-3-S.jpg";
import photo_4_3_W from "./assets/photos/4-3-W.jpg";
import photo_4_4_E from "./assets/photos/4-4-E.jpg";
import photo_4_4_S from "./assets/photos/4-4-S.jpg";
import photo_4_4_W from "./assets/photos/4-4-W.jpg";
import photo_4_5_E from "./assets/photos/4-5-E.jpg";
import photo_4_5_W from "./assets/photos/4-5-W.jpg";
import photo_4_6_E from "./assets/photos/4-6-E.jpg";
import photo_4_6_W from "./assets/photos/4-6-W.jpg";
import photo_4_7_N from "./assets/photos/4-7-N.jpg";
import photo_4_7_S from "./assets/photos/4-7-S.jpg";
import photo_4_9_N from "./assets/photos/4-9-N.jpg";
import photo_4_9_S from "./assets/photos/4-9-S.jpg";

const Floors = [0, 1, 2, 3, 4] as const;
type Floor = (typeof Floors)[number];
const Directions = ["n", "e", "s", "w"] as const;
type Direction = (typeof Directions)[number];
type Bench = {
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  target: {
    src: string;
    alt: string;
  };
};
type Bubble = {
  floor: Floor;
  x: number;
  y: number;
  images: Partial<
    Record<
      Direction,
      {
        src: string;
        width: number;
        height: number;
        benches?: Bench[];
      }
    >
  >;
};

const MapWidth = 200;
const MapHeight = 150;
const BubbleDiameter = 12;

const BubbleActive = (
  <svg
    width="50mm"
    height="70mm"
    version="1.1"
    viewBox="0 0 50 70"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter
        id="a"
        x="-.18992"
        y="-.18992"
        width="1.3798"
        height="1.3798"
        colorInterpolationFilters="sRGB"
      >
        <feFlood
          floodColor="var(--teal-400)"
          floodOpacity=".49804"
          in="SourceGraphic"
          result="flood"
        />
        <feGaussianBlur
          in="SourceGraphic"
          result="blur"
          stdDeviation="1.500000"
        />
        <feOffset dx="0.000000" dy="0.000000" in="blur" result="offset" />
        <feComposite in="flood" in2="offset" operator="in" result="comp1" />
        <feComposite in="SourceGraphic" in2="comp1" result="fbSourceGraphic" />
        <feColorMatrix
          in="fbSourceGraphic"
          result="fbSourceGraphicAlpha"
          values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
        />
        <feFlood
          floodColor="var(--teal-400)"
          floodOpacity=".49804"
          in="fbSourceGraphic"
          result="flood"
        />
        <feGaussianBlur
          in="fbSourceGraphic"
          result="blur"
          stdDeviation="1.500000"
        />
        <feOffset dx="0.000000" dy="0.000000" in="blur" result="offset" />
        <feComposite in="flood" in2="offset" operator="in" result="comp1" />
        <feComposite in="fbSourceGraphic" in2="comp1" result="comp2" />
      </filter>
    </defs>
    <path
      className="bubble-path"
      transform="rotate(-45 37.071 30)"
      d="m45 25c0 11.046-8.9543 20-20 20s-20-8.9543-20-20 8.9543-20 20-20h20z"
      fill="var(--gold-500)"
      filter="url(#a)"
      stroke="var(--teal-400)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const BubbleInactive = (
  <svg
    width="50mm"
    height="70mm"
    version="1.1"
    viewBox="0 0 50 70"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter
        id="a"
        x="-.18992"
        y="-.18992"
        width="1.3798"
        height="1.3798"
        colorInterpolationFilters="sRGB"
      >
        <feFlood
          floodColor="var(--teal-400)"
          floodOpacity=".49804"
          in="SourceGraphic"
          result="flood"
        />
        <feGaussianBlur
          in="SourceGraphic"
          result="blur"
          stdDeviation="1.500000"
        />
        <feOffset dx="0.000000" dy="0.000000" in="blur" result="offset" />
        <feComposite in="flood" in2="offset" operator="in" result="comp1" />
        <feComposite in="SourceGraphic" in2="comp1" result="fbSourceGraphic" />
        <feColorMatrix
          in="fbSourceGraphic"
          result="fbSourceGraphicAlpha"
          values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
        />
        <feFlood
          floodColor="var(--teal-400)"
          floodOpacity=".49804"
          in="fbSourceGraphic"
          result="flood"
        />
        <feGaussianBlur
          in="fbSourceGraphic"
          result="blur"
          stdDeviation="1.500000"
        />
        <feOffset dx="0.000000" dy="0.000000" in="blur" result="offset" />
        <feComposite in="flood" in2="offset" operator="in" result="comp1" />
        <feComposite in="fbSourceGraphic" in2="comp1" result="comp2" />
      </filter>
    </defs>
    <circle
      className="bubble-path"
      cx="25"
      cy="35"
      r="20"
      fill="var(--teal-100)"
      filter="url(#a)"
      stroke="var(--teal-400)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const Locations = {
  1: { x: 48.1, y: 29.85 },
  2: { x: 184.7, y: 29.85 },
  3: { x: 77.6, y: 29.85 },
  4: { x: 154.7, y: 29.85 },
  5: { x: 102.43, y: 29.48 },
  6: { x: 130.4, y: 29.48 },
  7: { x: 48.1, y: 63.62 },
  8: { x: 184.7, y: 63.62 },
  9: { x: 77.6, y: 63.62 },
  10: { x: 154.7, y: 63.62 },
  11: { x: 48.1, y: 95.9 },
  12: { x: 184.7, y: 95.9 },
  13: { x: 77.6, y: 95.9 },
  14: { x: 154.7, y: 95.9 },
  15: { x: 48.1, y: 114.74 },
  16: { x: 184.7, y: 114.74 },
  17: { x: 48.1, y: 132.65 },
  18: { x: 184.7, y: 132.65 },
  19: { x: 73.8, y: 132.65 },
  20: { x: 159.5, y: 132.65 },
};

const PhotoWidth = 2048;
const PhotoHeight = 1536;

// floor -> location -> direction -> photo (this was generated by a script)
const AllPhotos: [
  floor: Floor,
  location: keyof typeof Locations,
  direction: Direction,
  photo: string,
][] = [
  [0, 1, "e", photo_0_1_E],
  [0, 1, "s", photo_0_1_S],
  [0, 10, "n", photo_0_10_N],
  [0, 10, "s", photo_0_10_S],
  [0, 11, "e", photo_0_11_E],
  [0, 11, "n", photo_0_11_N],
  [0, 11, "s", photo_0_11_S],
  [0, 12, "n", photo_0_12_N],
  [0, 12, "s", photo_0_12_S],
  [0, 12, "w", photo_0_12_W],
  [0, 14, "e", photo_0_14_E],
  [0, 14, "n", photo_0_14_N],
  [0, 15, "n", photo_0_15_N],
  [0, 15, "s", photo_0_15_S],
  [0, 16, "n", photo_0_16_N],
  [0, 16, "s", photo_0_16_S],
  [0, 17, "e", photo_0_17_E],
  [0, 17, "n", photo_0_17_N],
  [0, 18, "n", photo_0_18_N],
  [0, 18, "w", photo_0_18_W],
  [0, 19, "e", photo_0_19_E],
  [0, 19, "w", photo_0_19_W],
  [0, 2, "s", photo_0_2_S],
  [0, 2, "w", photo_0_2_W],
  [0, 20, "e", photo_0_20_E],
  [0, 20, "w", photo_0_20_W],
  [0, 3, "e", photo_0_3_E],
  [0, 3, "s", photo_0_3_S],
  [0, 3, "w", photo_0_3_W],
  [0, 4, "e", photo_0_4_E],
  [0, 4, "s", photo_0_4_S],
  [0, 4, "w", photo_0_4_W],
  [0, 5, "e", photo_0_5_E],
  [0, 5, "n", photo_0_5_N],
  [0, 5, "w", photo_0_5_W],
  [0, 6, "e", photo_0_6_E],
  [0, 6, "n", photo_0_6_N],
  [0, 6, "w", photo_0_6_W],
  [0, 8, "n", photo_0_8_N],
  [0, 8, "s", photo_0_8_S],
  [1, 1, "e", photo_1_1_E],
  [1, 1, "s", photo_1_1_S],
  [1, 10, "n", photo_1_10_N],
  [1, 10, "s", photo_1_10_S],
  [1, 10, "w", photo_1_10_W],
  [1, 11, "e", photo_1_11_E],
  [1, 11, "n", photo_1_11_N],
  [1, 11, "s", photo_1_11_S],
  [1, 12, "n", photo_1_12_N],
  [1, 12, "s", photo_1_12_S],
  [1, 12, "w", photo_1_12_W],
  [1, 13, "e", photo_1_13_E],
  [1, 13, "n", photo_1_13_N],
  [1, 13, "w", photo_1_13_W],
  [1, 14, "e", photo_1_14_E],
  [1, 14, "n", photo_1_14_N],
  [1, 14, "w", photo_1_14_W],
  [1, 15, "e", photo_1_15_E],
  [1, 15, "n", photo_1_15_N],
  [1, 15, "s", photo_1_15_S],
  [1, 16, "n", photo_1_16_N],
  [1, 16, "s", photo_1_16_S],
  [1, 16, "w", photo_1_16_W],
  [1, 17, "e", photo_1_17_E],
  [1, 17, "n", photo_1_17_N],
  [1, 18, "n", photo_1_18_N],
  [1, 18, "w", photo_1_18_W],
  [1, 19, "e", photo_1_19_E],
  [1, 19, "w", photo_1_19_W],
  [1, 2, "e", photo_1_2_E],
  [1, 2, "s", photo_1_2_S],
  [1, 2, "w", photo_1_2_W],
  [1, 20, "e", photo_1_20_E],
  [1, 20, "w", photo_1_20_W],
  [1, 3, "e", photo_1_3_E],
  [1, 3, "s", photo_1_3_S],
  [1, 3, "w", photo_1_3_W],
  [1, 4, "e", photo_1_4_E],
  [1, 4, "s", photo_1_4_S],
  [1, 4, "w", photo_1_4_W],
  [1, 5, "e", photo_1_5_E],
  [1, 5, "w", photo_1_5_W],
  [1, 6, "e", photo_1_6_E],
  [1, 6, "w", photo_1_6_W],
  [1, 7, "n", photo_1_7_N],
  [1, 7, "s", photo_1_7_S],
  [1, 7, "w", photo_1_7_W],
  [1, 8, "e", photo_1_8_E],
  [1, 8, "n", photo_1_8_N],
  [1, 8, "s", photo_1_8_S],
  [1, 8, "w", photo_1_8_W],
  [1, 9, "e", photo_1_9_E],
  [1, 9, "n", photo_1_9_N],
  [1, 9, "s", photo_1_9_S],
  [2, 1, "e", photo_2_1_E],
  [2, 1, "s", photo_2_1_S],
  [2, 10, "n", photo_2_10_N],
  [2, 10, "s", photo_2_10_S],
  [2, 11, "e", photo_2_11_E],
  [2, 11, "n", photo_2_11_N],
  [2, 11, "s", photo_2_11_S],
  [2, 12, "n", photo_2_12_N],
  [2, 12, "s", photo_2_12_S],
  [2, 12, "w", photo_2_12_W],
  [2, 13, "n", photo_2_13_N],
  [2, 13, "w", photo_2_13_W],
  [2, 14, "e", photo_2_14_E],
  [2, 14, "n", photo_2_14_N],
  [2, 15, "n", photo_2_15_N],
  [2, 15, "s", photo_2_15_S],
  [2, 16, "n", photo_2_16_N],
  [2, 16, "s", photo_2_16_S],
  [2, 17, "e", photo_2_17_E],
  [2, 17, "n", photo_2_17_N],
  [2, 18, "n", photo_2_18_N],
  [2, 18, "w", photo_2_18_W],
  [2, 19, "e", photo_2_19_E],
  [2, 19, "w", photo_2_19_W],
  [2, 2, "s", photo_2_2_S],
  [2, 2, "w", photo_2_2_W],
  [2, 20, "e", photo_2_20_E],
  [2, 20, "w", photo_2_20_W],
  [2, 3, "e", photo_2_3_E],
  [2, 3, "s", photo_2_3_S],
  [2, 3, "w", photo_2_3_W],
  [2, 4, "e", photo_2_4_E],
  [2, 4, "s", photo_2_4_S],
  [2, 4, "w", photo_2_4_W],
  [2, 5, "e", photo_2_5_E],
  [2, 5, "w", photo_2_5_W],
  [2, 6, "e", photo_2_6_E],
  [2, 6, "w", photo_2_6_W],
  [2, 7, "n", photo_2_7_N],
  [2, 7, "s", photo_2_7_S],
  [2, 8, "n", photo_2_8_N],
  [2, 8, "s", photo_2_8_S],
  [2, 9, "n", photo_2_9_N],
  [2, 9, "s", photo_2_9_S],
  [3, 1, "e", photo_3_1_E],
  [3, 1, "s", photo_3_1_S],
  [3, 10, "n", photo_3_10_N],
  [3, 10, "s", photo_3_10_S],
  [3, 11, "e", photo_3_11_E],
  [3, 11, "n", photo_3_11_N],
  [3, 11, "s", photo_3_11_S],
  [3, 12, "n", photo_3_12_N],
  [3, 12, "s", photo_3_12_S],
  [3, 12, "w", photo_3_12_W],
  [3, 13, "n", photo_3_13_N],
  [3, 13, "w", photo_3_13_W],
  [3, 14, "e", photo_3_14_E],
  [3, 14, "n", photo_3_14_N],
  [3, 15, "n", photo_3_15_N],
  [3, 15, "s", photo_3_15_S],
  [3, 16, "n", photo_3_16_N],
  [3, 16, "s", photo_3_16_S],
  [3, 17, "e", photo_3_17_E],
  [3, 17, "n", photo_3_17_N],
  [3, 18, "n", photo_3_18_N],
  [3, 18, "w", photo_3_18_W],
  [3, 19, "e", photo_3_19_E],
  [3, 19, "w", photo_3_19_W],
  [3, 2, "s", photo_3_2_S],
  [3, 2, "w", photo_3_2_W],
  [3, 20, "e", photo_3_20_E],
  [3, 20, "w", photo_3_20_W],
  [3, 3, "e", photo_3_3_E],
  [3, 3, "s", photo_3_3_S],
  [3, 3, "w", photo_3_3_W],
  [3, 4, "e", photo_3_4_E],
  [3, 4, "s", photo_3_4_S],
  [3, 4, "w", photo_3_4_W],
  [3, 5, "e", photo_3_5_E],
  [3, 5, "w", photo_3_5_W],
  [3, 6, "e", photo_3_6_E],
  [3, 6, "w", photo_3_6_W],
  [3, 7, "n", photo_3_7_N],
  [3, 7, "s", photo_3_7_S],
  [3, 8, "n", photo_3_8_N],
  [3, 8, "s", photo_3_8_S],
  [3, 9, "n", photo_3_9_N],
  [3, 9, "s", photo_3_9_S],
  [4, 1, "e", photo_4_1_E],
  [4, 1, "s", photo_4_1_S],
  [4, 12, "n", photo_4_12_N],
  [4, 12, "s", photo_4_12_S],
  [4, 12, "w", photo_4_12_W],
  [4, 16, "n", photo_4_16_N],
  [4, 16, "s", photo_4_16_S],
  [4, 18, "n", photo_4_18_N],
  [4, 18, "w", photo_4_18_W],
  [4, 2, "s", photo_4_2_S],
  [4, 2, "w", photo_4_2_W],
  [4, 20, "e", photo_4_20_E],
  [4, 20, "w", photo_4_20_W],
  [4, 3, "e", photo_4_3_E],
  [4, 3, "s", photo_4_3_S],
  [4, 3, "w", photo_4_3_W],
  [4, 4, "e", photo_4_4_E],
  [4, 4, "s", photo_4_4_S],
  [4, 4, "w", photo_4_4_W],
  [4, 5, "e", photo_4_5_E],
  [4, 5, "w", photo_4_5_W],
  [4, 6, "e", photo_4_6_E],
  [4, 6, "w", photo_4_6_W],
  [4, 7, "n", photo_4_7_N],
  [4, 7, "s", photo_4_7_S],
  [4, 9, "n", photo_4_9_N],
  [4, 9, "s", photo_4_9_S],
];

const Bubbles: Bubble[] = [];
for (const [floor, location, direction, photo] of AllPhotos) {
  let bubble = Bubbles.find(
    (b) =>
      b.floor === floor &&
      b.x === Locations[location].x &&
      b.y === Locations[location].y,
  );
  if (!bubble) {
    bubble = {
      floor,
      ...Locations[location],
      images: {},
    };
    Bubbles.push(bubble);
  }
  bubble.images[direction] = {
    src: photo,
    width: PhotoWidth,
    height: PhotoHeight,
  };
}

const Notes = {
  antpecker: {
    src: note_antpecker,
    alt: "A note reading “ANTPECKER, Nix on the nicked knicknack.” It is signed with two squares on top of a wide rectangle",
  },
  antthrush: {
    src: note_antthrush,
    alt: "A note reading “ANTTHRUSH — Please stop asking. You know I can’t. They’ll kill me.” It is signed with two squares on top of a wide rectangle",
  },
  bittern: {
    src: note_bittern,
    alt: "A note reading “BITTERN, They’re watching the hockshop.” It is signed with a tall rectangle to the left of two squares stacked on top of each other",
  },
  blackthroat: {
    src: note_blackthroat,
    alt: "A note reading “BLACKTHROAT, Pfft. That’s birdcage liner. Everybody knows that. You need something more, savvy?” It is signed with a rectangle inside of the outline of an L shape, which is itself inside of the outline of an L shape",
  },
  chickadee: {
    src: note_chickadee,
    alt: "A note reading “CHICKADEE, That Jane was carrying groceries. Kale. Spinach. Sugar. You get the gist. I don’t know what she spent it on but it wasn’t tea.” It is signed with two squares on top of a wide rectangle",
  },
  chough: {
    src: note_chough,
    alt: "A note reading “CHOUGH, You think I’ll yap? No way. I saw how your last job went!!” It is signed with a tall rectangle to the left of two squares stacked on top of each other",
  },
  goose: {
    src: note_goose,
    alt: "A note reading “GOOSE, Nah, bumping’s not his style. Pure bunco.” It is signed with two squares stacked on top of each other to the left of a tall rectangle",
  },
  oriole: {
    src: note_oriole,
    alt: "A note reading “ORIOLE, People asking hard questions about you. Whaddaya want me to say?” It is signed with a tall rectangle to the left of two squares stacked on top of each other",
  },
  quail: {
    src: note_quail,
    alt: "A note reading “QUAIL, Charts and grafts, baby, I promise. Just bring the item.” It is signed with a tall rectangle to the left of two squares stacked on top of each other",
  },
  sheldgoose: {
    src: note_sheldgoose,
    alt: "A note reading “SHELDGOOSE, Yep, genuine gumshoe. Wiser head than you.” It is signed with a tall rectangle to the left of two squares stacked on top of each other",
  },
  spinebill: {
    src: note_spinebill,
    alt: "A note reading “SPINEBILL, If you want the name of that fence honey it’s gonna cost you a pretty penny!” It is signed with a tall rectangle to the left of two squares stacked on top of each other",
  },
  stint: {
    src: note_stint,
    alt: "A note reading “STINT, Newshawks are sniffing around. They get word of this, all us birdies goin’ to the ground.” It is signed with three tall rectangles next to each other",
  },
  waterthrush: {
    src: note_waterthrush,
    alt: "A note reading “WATERTHRUSH, Them bindlestiffs under the boardwalk — they might have seen it.” It is signed with a tall rectangle to the left of two squares stacked on top of each other",
  },
  whydah: {
    src: note_whydah,
    alt: "A note reading: “Whydah — Papa’s mad. REAL mad. Watch your back, lassie.” It is signed with three wide rectangles stacked vertically.",
  },
};

const Benches: {
  f: Floor;
  l: keyof typeof Locations;
  d: Direction;
  bench: Bench;
}[] = [
  {
    f: 0,
    l: 3,
    d: "s",
    bench: {
      position: { x: 1376, y: 688, w: 208, h: 206 },
      target: Notes.blackthroat,
    },
  },
  {
    f: 0,
    l: 5,
    d: "n",
    bench: {
      position: { x: 0, y: 734, w: 372, h: 276 },
      target: Notes.oriole,
    },
  },
  {
    f: 1,
    l: 7,
    d: "s",
    bench: {
      position: { x: 906, y: 790, w: 118, h: 166 },
      target: Notes.goose,
    },
  },
  {
    f: 1,
    l: 8,
    d: "s",
    bench: {
      position: { x: 748, y: 868, w: 232, h: 326 },
      target: Notes.spinebill,
    },
  },
  {
    f: 1,
    l: 8,
    d: "w",
    bench: {
      position: { x: 238, y: 836, w: 268, h: 184 },
      target: Notes.spinebill,
    },
  },
  {
    f: 1,
    l: 11,
    d: "s",
    bench: {
      position: { x: 988, y: 806, w: 170, h: 206 },
      target: Notes.waterthrush,
    },
  },
  {
    f: 1,
    l: 16,
    d: "w",
    bench: {
      position: { x: 0, y: 606, w: 804, h: 676 },
      target: Notes.chough,
    },
  },
  {
    f: 2,
    l: 11,
    d: "n",
    bench: {
      position: { x: 1410, y: 894, w: 576, h: 200 },
      target: Notes.whydah,
    },
  },
  {
    f: 2,
    l: 18,
    d: "w",
    bench: {
      position: { x: 126, y: 892, w: 622, h: 532 },
      target: Notes.bittern,
    },
  },
  {
    f: 3,
    l: 1,
    d: "e",
    bench: {
      position: { x: 1372, y: 878, w: 414, h: 370 },
      target: Notes.antthrush,
    },
  },
  {
    f: 3,
    l: 2,
    d: "w",
    bench: {
      position: { x: 840, y: 626, w: 64, h: 130 },
      target: Notes.antpecker,
    },
  },
  {
    f: 3,
    l: 12,
    d: "s",
    bench: {
      position: { x: 292, y: 780, w: 292, h: 282 },
      target: Notes.sheldgoose,
    },
  },
  {
    f: 3,
    l: 19,
    d: "w",
    bench: {
      position: { x: 1262, y: 916, w: 786, h: 544 },
      target: Notes.chickadee,
    },
  },
  {
    f: 3,
    l: 20,
    d: "w",
    bench: {
      position: { x: 878, y: 1022, w: 1102, h: 322 },
      target: Notes.stint,
    },
  },
  {
    f: 4,
    l: 6,
    d: "w",
    bench: {
      position: { x: 688, y: 796, w: 492, h: 166 },
      target: Notes.quail,
    },
  },
];

const FakeNotes = {
  beacon: {
    src: fakenote_beacon,
    alt: "You find a small, round, white plastic puck. Seems to be a Blue Tooth beacon or something. Must be for another puzzle. No dead drop, though",
  },
  far: {
    src: fakenote_far,
    alt: "I don’t think you can see anything from that far away",
  },
  fm: {
    src: fakenote_fm,
    alt: "You find a strange gray box. It seems to be some sort of FM transmitter. Must be for another puzzle. No dead drop, though",
  },
  gum: {
    src: fakenote_gum,
    alt: "You check under the bench but all you find is some old gum. Eww",
  },
  nothing: {
    src: fakenote_nothing,
    alt: "You feel around but there doesn’t seem to be anything there",
  },
  unreachable: {
    src: fakenote_unreachable,
    alt: "There's not really anywhere under the bench that you can reach",
  },
};

const FakeBenches: typeof Benches = [
  {
    f: 0,
    l: 6,
    d: "w",
    bench: {
      position: { x: 1350, y: 894, w: 696, h: 640 },
      target: FakeNotes.gum,
    },
  },
  {
    f: 1,
    l: 3,
    d: "s",
    bench: {
      position: { x: 958, y: 526, w: 108, h: 112 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 5,
    d: "e",
    bench: {
      position: { x: 822, y: 684, w: 184, h: 242 },
      target: FakeNotes.beacon,
    },
  },
  {
    f: 1,
    l: 6,
    d: "w",
    bench: {
      position: { x: 1076, y: 702, w: 112, h: 126 },
      target: FakeNotes.far,
    },
  },
  {
    f: 1,
    l: 6,
    d: "w",
    bench: {
      position: { x: 1166, y: 728, w: 424, h: 382 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 8,
    d: "e",
    bench: {
      position: { x: 0, y: 698, w: 318, h: 360 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 8,
    d: "e",
    bench: {
      position: { x: 1832, y: 718, w: 214, h: 330 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 8,
    d: "n",
    bench: {
      position: { x: 1454, y: 768, w: 592, h: 620 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 8,
    d: "s",
    bench: {
      position: { x: 338, y: 714, w: 342, h: 482 },
      target: FakeNotes.gum,
    },
  },
  {
    f: 1,
    l: 8,
    d: "w",
    bench: {
      position: { x: 0, y: 774, w: 300, h: 314 },
      target: FakeNotes.gum,
    },
  },
  {
    f: 1,
    l: 8,
    d: "w",
    bench: {
      position: { x: 1658, y: 746, w: 390, h: 344 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 11,
    d: "n",
    bench: {
      position: { x: 1102, y: 788, w: 238, h: 102 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 12,
    d: "w",
    bench: {
      position: { x: 1136, y: 590, w: 396, h: 402 },
      target: FakeNotes.fm,
    },
  },
  {
    f: 1,
    l: 13,
    d: "n",
    bench: {
      position: { x: 1250, y: 692, w: 524, h: 216 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 13,
    d: "w",
    bench: {
      position: { x: 1232, y: 604, w: 200, h: 170 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 14,
    d: "w",
    bench: {
      position: { x: 520, y: 678, w: 290, h: 186 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 16,
    d: "s",
    bench: {
      position: { x: 866, y: 522, w: 134, h: 58 },
      target: FakeNotes.far,
    },
  },
  {
    f: 1,
    l: 16,
    d: "w",
    bench: {
      position: { x: 1428, y: 620, w: 618, h: 452 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 17,
    d: "e",
    bench: {
      position: { x: 1116, y: 640, w: 236, h: 224 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 1,
    l: 19,
    d: "w",
    bench: {
      position: { x: 1232, y: 674, w: 182, h: 200 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 2,
    l: 9,
    d: "s",
    bench: {
      position: { x: 598, y: 712, w: 302, h: 376 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 2,
    l: 10,
    d: "n",
    bench: {
      position: { x: 1228, y: 738, w: 82, h: 146 },
      target: FakeNotes.unreachable,
    },
  },
  {
    f: 2,
    l: 13,
    d: "w",
    bench: {
      position: { x: 886, y: 726, w: 130, h: 112 },
      target: FakeNotes.gum,
    },
  },
  {
    f: 2,
    l: 16,
    d: "n",
    bench: {
      position: { x: 0, y: 726, w: 766, h: 598 },
      target: FakeNotes.gum,
    },
  },
  {
    f: 2,
    l: 16,
    d: "n",
    bench: {
      position: { x: 1492, y: 878, w: 554, h: 656 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 2,
    l: 16,
    d: "s",
    bench: {
      position: { x: 1788, y: 1124, w: 258, h: 366 },
      target: FakeNotes.gum,
    },
  },
  {
    f: 2,
    l: 16,
    d: "s",
    bench: {
      position: { x: 0, y: 866, w: 782, h: 668 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 3,
    l: 2,
    d: "w",
    bench: {
      position: { x: 903, y: 612, w: 21, h: 42 },
      target: FakeNotes.unreachable,
    },
  },
  {
    f: 3,
    l: 2,
    d: "w",
    bench: {
      position: { x: 928, y: 602, w: 11, h: 26 },
      target: FakeNotes.unreachable,
    },
  },
  {
    f: 3,
    l: 4,
    d: "e",
    bench: {
      position: { x: 1175, y: 717, w: 75, h: 140 },
      target: FakeNotes.far,
    },
  },
  {
    f: 3,
    l: 4,
    d: "e",
    bench: {
      position: { x: 1113, y: 695, w: 30, h: 55 },
      target: FakeNotes.far,
    },
  },
  {
    f: 3,
    l: 4,
    d: "e",
    bench: {
      position: { x: 1086, y: 672, w: 17, h: 38 },
      target: FakeNotes.far,
    },
  },
  {
    f: 3,
    l: 10,
    d: "n",
    bench: {
      position: { x: 0, y: 794, w: 686, h: 272 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 3,
    l: 10,
    d: "s",
    bench: {
      position: { x: 1250, y: 800, w: 296, h: 146 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 3,
    l: 10,
    d: "s",
    bench: {
      position: { x: 1496, y: 864, w: 318, h: 160 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 3,
    l: 10,
    d: "s",
    bench: {
      position: { x: 176, y: 938, w: 282, h: 174 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 3,
    l: 11,
    d: "s",
    bench: {
      position: { x: 992, y: 726, w: 284, h: 94 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 3,
    l: 13,
    d: "w",
    bench: {
      position: { x: 400, y: 818, w: 272, h: 248 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 3,
    l: 18,
    d: "w",
    bench: {
      position: { x: 1300, y: 576, w: 106, h: 48 },
      target: FakeNotes.far,
    },
  },
  {
    f: 3,
    l: 18,
    d: "w",
    bench: {
      position: { x: 0, y: 810, w: 432, h: 384 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 3,
    l: 19,
    d: "w",
    bench: {
      position: { x: 864, y: 924, w: 378, h: 390 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 3,
    l: 19,
    d: "e",
    bench: {
      position: { x: 0, y: 848, w: 478, h: 456 },
      target: FakeNotes.gum,
    },
  },
  {
    f: 4,
    l: 5,
    d: "e",
    bench: {
      position: { x: 692, y: 870, w: 596, h: 138 },
      target: FakeNotes.nothing,
    },
  },
  {
    f: 4,
    l: 9,
    d: "n",
    bench: {
      position: { x: 1128, y: 1238, w: 876, h: 296 },
      target: FakeNotes.unreachable,
    },
  },
  {
    f: 4,
    l: 9,
    d: "s",
    bench: {
      position: { x: 1030, y: 998, w: 1014, h: 478 },
      target: FakeNotes.unreachable,
    },
  },
];

// Do fake benches first so that they stack under real benches in case of conflict
for (const { f, l, d, bench } of [...FakeBenches, ...Benches]) {
  const bubble = Bubbles.find(
    (b) => b.floor === f && b.x === Locations[l].x && b.y === Locations[l].y,
  );
  if (!bubble) continue;
  const image = bubble.images[d];
  if (!image) continue;
  if (!image.benches) image.benches = [];
  image.benches.push(bench);
}

const Container = styled.div`
  display: flex;
  gap: 1em;
  align-items: stretch;

  @media ${deviceMax.md} {
    flex-direction: column;
  }

  & > * {
    flex: 1;
  }
`;

const MapContainer = styled.div`
  height: 100%;
  aspect-ratio: ${MapWidth} / ${MapHeight};
  background-color: white;
  perspective: 1000px;
  overflow: hidden;

  .floor-buttons {
    position: absolute;
    top: 2.5%;
    left: 2.5%;
    bottom: 2.5%;
    width: 13.5%;
    display: flex;
    flex-direction: column-reverse;
    z-index: 10;

    button {
      flex: 1;
      border: 0;
      cursor: pointer;

      background-color: var(--purple-100);
      opacity: 0.95;

      &.active {
        background-color: var(--purple-400);
        opacity: 1;
        color: var(--white);
      }

      &:hover {
        background-color: var(--purple-200);
        opacity: 1;
        color: var(--white);
      }
    }
  }

  .bubble {
    position: absolute;
    width: ${(100 * BubbleDiameter) / MapWidth}%;
    height: ${(100 * BubbleDiameter) / MapHeight}%;
    background: none;
    border: none;
    z-index: 1;
    padding: 0;
    opacity: 0.85;
    cursor: pointer;

    &.e {
      svg {
        transform: rotate(90deg);
      }
    }
    &.s {
      svg {
        transform: rotate(180deg);
      }
    }
    &.w {
      svg {
        transform: rotate(270deg);
      }
    }

    svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    transition:
      0.2s ease-in-out transform,
      0.2s ease-in-out opacity;

    &:hover svg .bubble-path {
      stroke-width: 4;
    }

    &.high {
      transform: translateZ(1000px);
    }

    &.low {
      transform: translateZ(-1000px);
      opacity: 0;
    }
  }
`;

const Photo = styled.div`
  position: relative;

  img {
    width: 100%;
    aspect-ratio: ${PhotoWidth} / ${PhotoHeight};
    object-fit: cover;
    object-position: bottom;
  }

  button {
    background-color: transparent;
    border: 0;
    cursor: zoom-in;
    position: absolute;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CampusMap = ({
  floor,
  selected,
  setFloor,
  setSelected,
}: {
  floor: Floor;
  selected: { index: number; direction: Direction } | undefined;
  setFloor: (f: Floor) => void;
  setSelected: (s: { index: number; direction: Direction } | undefined) => void;
}) => {
  const onClickOutside = useCallback(() => {
    setSelected(undefined);
  }, [setSelected]);
  const onClickFloor = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      const floor = target.dataset.floor;
      if (floor) {
        setFloor(Number(floor) as Floor);
        setSelected(undefined);
      }
    },
    [setFloor, setSelected],
  );
  const onClickBubble = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      const bubble = target.dataset.bubble;
      const direction = target.dataset.firstDirection as Direction | undefined;
      if (bubble && direction) {
        setSelected({ index: Number(bubble), direction });
      }
    },
    [setSelected],
  );

  return (
    <MapContainer>
      <button
        style={{
          width: "100%",
          border: 0,
          background: "none",
          padding: 0,
          margin: 0,
        }}
        onClick={onClickOutside}
      >
        <img
          style={{ width: "100%" }}
          src={campusmap}
          alt="Campus Map"
          draggable={false}
        />
      </button>
      <div className="floor-buttons">
        {Floors.map((f) => (
          <button
            key={f}
            data-floor={f}
            onClick={onClickFloor}
            className={f === floor ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </div>
      {Bubbles.map((bubble, i) => {
        const classNames = ["bubble"];
        if (i === selected?.index) classNames.push("active");
        if (floor > bubble.floor) classNames.push("low");
        if (floor < bubble.floor) classNames.push("high");
        if (i === selected?.index) classNames.push(selected.direction);
        return (
          <button
            key={i}
            data-bubble={i}
            data-first-direction={Directions.find((d) => bubble.images[d])}
            onClick={onClickBubble}
            className={classNames.join(" ")}
            tabIndex={bubble.floor === floor ? 0 : -1}
            style={{
              left: `${((bubble.x - BubbleDiameter / 2) / MapWidth) * 100}%`,
              top: `${((bubble.y - BubbleDiameter / 2) / MapHeight) * 100}%`,
            }}
          >
            {selected?.index === i ? BubbleActive : BubbleInactive}
          </button>
        );
      })}
    </MapContainer>
  );
};

const App = () => {
  const [floor, setFloor] = useState<Floor>(1);
  const [selected, setSelected] = useState<{
    index: number;
    direction: Direction;
  }>();
  const [bench, setBench] = useState<Bench>();

  const image =
    selected !== undefined
      ? Bubbles[selected.index]?.images[selected.direction]
      : undefined;
  useEffect(() => {
    if (!image?.benches) setBench(undefined);
  }, [image]);

  const rotate = (clockwise: boolean) => {
    setSelected((prev) => {
      if (!prev) return undefined;

      const { index, direction } = prev;
      let newDirectionIndex = Directions.indexOf(direction);
      for (;;) {
        if (clockwise) {
          newDirectionIndex = (newDirectionIndex + 1) % Directions.length;
        } else {
          newDirectionIndex =
            (Directions.length + newDirectionIndex - 1) % Directions.length;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know this is a valid index
        const newDirection = Directions[newDirectionIndex]!;
        if (Bubbles[index]?.images[newDirection]) {
          return { index, direction: newDirection };
        }
      }
    });
  };

  return (
    <AuthorsNoteBlock>
      <p>
        This puzzle required you to visit locations on campus. To attempt to
        recreate that experience, you can virtually visit many spots around
        campus using the map below.
      </p>

      <Container>
        <CampusMap
          floor={floor}
          selected={selected}
          setFloor={setFloor}
          setSelected={setSelected}
        />
        <Photo>
          <img
            src={image?.src ?? developing}
            alt={
              image ? "A photo from somewhere on MIT’s campus" : "A blank space"
            }
          />

          {/* Navigation under benches because there's always somewhere on the edge that's not a bench */}
          <button
            onClick={() => {
              rotate(false);
            }}
            style={{
              left: 0,
              top: 0,
              bottom: 0,
              right: "85%",
              cursor: "w-resize",
            }}
          />
          <button
            onClick={() => {
              rotate(true);
            }}
            style={{
              left: "85%",
              top: 0,
              bottom: 0,
              right: 0,
              cursor: "e-resize",
            }}
          />

          {image?.benches?.map((bench, i) => (
            <button
              key={i}
              onClick={() => {
                setBench(bench);
              }}
              style={{
                left: `${(bench.position.x / image.width) * 100}%`,
                top: `${(bench.position.y / image.height) * 100}%`,
                width: `${(bench.position.w / image.width) * 100}%`,
                height: `${(bench.position.h / image.height) * 100}%`,
              }}
            />
          ))}
        </Photo>
      </Container>

      {bench && (
        <ModalBackdrop
          onClick={() => {
            setBench(undefined);
          }}
        >
          <img
            src={bench.target.src}
            alt={bench.target.alt}
            style={{ width: "90%", maxWidth: "800px" }}
          />
        </ModalBackdrop>
      )}
    </AuthorsNoteBlock>
  );
};

const elem = document.getElementById("chinatown-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #chinatown-root was nowhere to be found",
  );
}
