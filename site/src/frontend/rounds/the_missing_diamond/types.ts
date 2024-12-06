export type MissingDiamondItem = {
  title: string;
  slug: string;
  desc?: string;
};

export type MissingDiamondState = {
  epoch: number;
  items: MissingDiamondItem[];
};
