import React from "react";
import { hydrateRoot } from "react-dom/client";
import useDataset from "../../client/useDataset";
import EventsBody from "./EventsBody";
import { type EventsState } from "./types";

const EventsManager = ({ initialState }: { initialState: EventsState }) => {
  const state = useDataset("events", undefined, initialState);

  return <EventsBody state={state} />;
};

const elem = document.getElementById("events-root");
if (elem) {
  const state = (window as unknown as { initialEventsState: EventsState })
    .initialEventsState;

  hydrateRoot(elem, <EventsManager initialState={state} />);
} else {
  console.error(
    "Could not mount EventsManager because #events-root was nowhere to be found",
  );
}
