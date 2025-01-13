export type MissingDiamondSpeechBubble = {
  slug: string;
  text: string;
  color: string;
  glow?: boolean;
  extraBorder?: boolean;
};

export type MissingDiamondEntity = {
  asset: string;
  alt: string;
  // positions are relative to the native map size and may need client-side scaling
  pos: {
    top: number;
    left: number;
    width: number;
  };
  puzzle?: {
    title: string;
    slug: string;
    desc?: string;
    state: "unlockable" | "unlocked" | "solved";
    answer?: string;
  };
};

export type MissingDiamondWitness = MissingDiamondEntity & {
  puzzle: NonNullable<MissingDiamondEntity["puzzle"]>;
  statement?: string;
};

export type MissingDiamondInteractionEntity = {
  asset: string;
  alt: string;
  pos: {
    top: number;
    left: number;
    width: number;
  };
  slug: string;
};

export type MissingDiamondState = {
  epoch: number;
  speechBubbles: MissingDiamondSpeechBubble[];
  locations: MissingDiamondEntity[];
  witnesses: MissingDiamondWitness[];
  interactions?: MissingDiamondInteractionEntity[];
};
