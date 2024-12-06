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
  tooltip_anchor?: {
    // if not left: 0; top: 0;, where should the label appear on hover?
    left?: string;
    top?: string;
    right?: string;
  };
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
  groups: PaperTrailGroup[];
  imagery: PaperTrailObject[];
};
