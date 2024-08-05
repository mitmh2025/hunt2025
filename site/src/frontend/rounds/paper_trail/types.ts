export type PaperTrailItem = {
  title: string;
  slug: string;
};

export type PaperTrailGroup = {
  label: string;
  items: PaperTrailItem[];
};

export type PaperTrailState = {
  groups: PaperTrailGroup[];
};
