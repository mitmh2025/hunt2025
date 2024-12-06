export type BackgroundCheckItem = {
  title: string;
  slug: string;
};

export type BackgroundCheckObject = {
  asset: string;
  alt: string;
  width: number;
  pos: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  magnet: string;
  magnetFilter: string;
  title: string;
  slug: string;
  state: "unlockable" | "unlocked" | "solved";
  answer?: string;
  desc?: string;
};

export type BackgroundCheckState = {
  epoch: number;
  items: BackgroundCheckItem[];
  imagery: {
    objects: BackgroundCheckObject[];
    height: number;
  };
};
