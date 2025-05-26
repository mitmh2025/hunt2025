import React from "react";
import renderRoot from "../../utils/renderRoot";
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
  renderRoot(hubElem, <HubManager initialState={initialState} />);
} else {
  console.error("Couldn't mount Hub because #hub-root was nowhere to be found");
}
