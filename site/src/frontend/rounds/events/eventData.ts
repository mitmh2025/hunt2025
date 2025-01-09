import {
  type EventDataWithTime,
  type EventData,
  type EventSlug,
} from "./types";

const EVENT_DATA: EventData[] = [
  {
    slug: "making_contact_with_an_informant",
    name: "Making Contact With an Informant",
    location: "La Sala",
  },
  {
    slug: "tailing_a_lead",
    name: "Tailing a Lead",
    location: "Lobby 7",
  },
  {
    slug: "navigating_high_society",
    name: "Navigating High Society",
    location: "Lobdell",
  },
  {
    slug: "seeing_the_big_picture",
    name: "Seeing the Big Picture",
    location: "Lobdell",
  },
];

type EventTimeGroup = {
  maxUsername: string;
  times: { [slug in EventSlug]: string };
};
const EVENT_TIME_GROUPS: EventTimeGroup[] = [
  {
    maxUsername: "ua",
    times: {
      making_contact_with_an_informant: "1/17 7:00 PM",
      tailing_a_lead: "1/18 10:00 AM",
      navigating_high_society: "1/18 3:00 PM",
      seeing_the_big_picture: "1/18 8:00 PM",
    },
  },
  {
    maxUsername: "zzz",
    times: {
      making_contact_with_an_informant: "1/17 8:00 PM",
      tailing_a_lead: "1/18 11:00 AM",
      navigating_high_society: "1/18 4:00 PM",
      seeing_the_big_picture: "1/18 9:00 PM",
    },
  },
];

export function eventDataForTeam(username: string): EventDataWithTime[] {
  const group = EVENT_TIME_GROUPS.find(
    (group) =>
      username.localeCompare(group.maxUsername.toLocaleLowerCase()) <= 0,
  );

  return EVENT_DATA.map((event) => ({
    ...event,
    time: group?.times[event.slug] ?? "TBD",
  }));
}
