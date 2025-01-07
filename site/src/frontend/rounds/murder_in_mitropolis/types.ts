import { type Placement } from "@floating-ui/react";

export type MurderItem = {
  title: string;
  slug: string;
  desc?: string;
};

export type MurderPuzzleObject = {
  asset: string; // url of asset
  alt: string; // accessible description of the image at `asset`
  width: number;
  pos: {
    left: number;
    top: number;
    transform?: string;
  };
  tooltip_placement?: Placement;
  title: string;
  slug: string;
  state: "unlockable" | "unlocked" | "solved";
  answer?: string;
  desc?: string;
};

export type MurderPDFObject = {
  asset: string; // url of asset
  alt: string; // accessible description of the image at `asset`
  width: number;
  pos: {
    left: number;
    top: number;
  };
  solved: boolean;
};

export type MurderState = {
  epoch: number;
  items: MurderItem[];
  imagery: MurderPuzzleObject[];
  pdfImagery: MurderPDFObject[];
};
