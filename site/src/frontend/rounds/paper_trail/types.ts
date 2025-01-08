import { type Placement } from "@floating-ui/react";

export type PaperTrailItem = {
  title: string;
  slug: string;
  desc?: string;
};

export type PaperTrailGroup = {
  label: string;
  items: PaperTrailItem[];
};

export type PaperTrailObjectBase = {
  asset: string; // url of asset
  alt: string; // accessible description of the image at `asset`
  width: number;
  pos: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  filter?: string;
  tooltip_placement?: Placement;
};

export type PaperTrailPuzzleObject = PaperTrailObjectBase & {
  title: string;
  slug: string;
  state: "unlockable" | "unlocked" | "solved";
  answer?: string;
  desc?: string;
};

export type PaperTrailNotesObject = PaperTrailObjectBase & {
  title: string;
  href: string;
};

export type PaperTrailObject = PaperTrailPuzzleObject | PaperTrailNotesObject;

export type PaperTrailState = {
  epoch: number;
  groups: PaperTrailGroup[];
  imagery: PaperTrailObject[];
};
