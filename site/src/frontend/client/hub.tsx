import React from "react";
import { hydrateRoot } from "react-dom/client";
import HubBody from "../hub/HubBody";
import { type HubState } from "../hub/types";
import useDataset from "./useDataset";

const HubManager = ({ initialState }: { initialState: HubState }) => {
  const hubData = useDataset("hub", undefined, initialState);
  return <HubBody state={hubData} />;
};

const hubElem = document.getElementById("hub-root");
if (hubElem) {
  const initialState = (window as unknown as { initialHubState: HubState })
    .initialHubState;
  hydrateRoot(hubElem, <HubManager initialState={initialState} />);
} else {
  console.error("Couldn't mount Hub because #hub-root was nowhere to be found");
}
