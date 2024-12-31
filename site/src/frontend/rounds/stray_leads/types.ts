export type StrayLead = {
  title: string;
  slug: string;
  round?: string;
};

export type StrayLeadsState = {
  epoch: number;
  leads: StrayLead[];
};
