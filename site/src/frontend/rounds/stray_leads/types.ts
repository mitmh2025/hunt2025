export type StrayLead = {
  title: string;
  slug: string;
  desc?: string;
};

export type StrayLeadsState = {
  epoch: number;
  leads: StrayLead[];
};
