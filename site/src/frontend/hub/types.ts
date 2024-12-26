export type HubRound = {
  slug: string;
  title: string;
};

export type HubState = {
  epoch: number;
  rounds: HubRound[];
};
