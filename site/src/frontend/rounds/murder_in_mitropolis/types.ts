export type MurderItem = {
  title: string;
  slug: string;
  desc?: string;
};

export type MurderState = {
  epoch: number;
  items: MurderItem[];
};
