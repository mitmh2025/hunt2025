export type StrayLead = {
  title: string;
  slug: string;
  round?: string;
  roundTitle?: string;
};

export type StrayLeadsState = {
  epoch: number;
  leads: StrayLead[];
  reserveNote?: boolean;
};
