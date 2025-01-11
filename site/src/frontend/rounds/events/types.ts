export type EventSlug =
  | "making_contact_with_an_informant"
  | "tailing_a_lead"
  | "navigating_high_society"
  | "seeing_the_big_picture";

export type EventData = {
  slug: EventSlug;
  name: string;
  location: string;
};

export type EventDataWithTime = EventData & {
  time: string;
};

export type EventDataWithTimeAndState = EventDataWithTime & {
  locked: "locked" | "unlocked";
  answer?: string;
};

export type EventsState = {
  epoch: number;
  events: EventDataWithTimeAndState[];
  strongCurrency: number;
  puzzlesCanBuyAnswerTo: {
    title: string;
    slug: string;
  }[];
};
