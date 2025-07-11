import { type CSSProperties } from "react";
import { type EventDataWithTime } from "../rounds/events/types";

export type HubRound = {
  slug: string;
  title: string;
};

/*
// maybe implement text overlays separately if we have time for better accessibility?
// for now, I guess we'll just throw everything in the alt text :/
export type HubText = {
  text: string;
  size: number; // font size, in px
  top?: number;
  left?: number;
  usage: "header" | "content"; // headers are centered, content is left-aligned
}
*/

export type HubObject = {
  asset: string;
  alt: string;
  x: number;
  y: number;
  width: number;
  rot: number;
  rotOrigin?: CSSProperties["transformOrigin"];
  shadow: boolean;
  href?: string; // If present, will be rendered as an <a> containing an <img>.  Otherwise, will render as an <img>
  inert?: boolean; // If true, sets pointer-events: none on the object
  pin?: {
    asset: string;
    x: number;
    y: number;
  };
};

export type HubSuspectStatus = {
  text: string;
  color?: string;
};

// Suspect allowed to have up to 3 statuses
export type HubSuspect = {
  status:
    | [HubSuspectStatus]
    | [HubSuspectStatus, HubSuspectStatus]
    | [HubSuspectStatus, HubSuspectStatus, HubSuspectStatus];
};

export type HubState = {
  epoch: number;
  rounds: HubRound[];
  objects: HubObject[];
  suspects: Record<string, HubSuspect>;
  events: EventDataWithTime[];
};
