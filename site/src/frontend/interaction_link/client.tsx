import React from "react";
import renderRoot from "../../utils/renderRoot";
import useDataset from "../client/useDataset";
import InteractionLink from "./InteractionLink";
import { type InteractionLinkState } from "./types";

const InteractionLinkManager = ({
  slug,
  initialInteractionLinkState,
}: {
  slug: string;
  initialInteractionLinkState: InteractionLinkState;
}) => {
  const interactionLinkState = useDataset(
    "interaction_link_state",
    undefined,
    initialInteractionLinkState,
  );
  return (
    <InteractionLink slug={slug} interactionLinkState={interactionLinkState} />
  );
};

const elem = document.getElementById("interaction-link-root");
if (elem) {
  const interactionLinkState = (
    window as unknown as { initialInteractionLinkState: InteractionLinkState }
  ).initialInteractionLinkState;
  const slug = (window as unknown as { puzzleSlug: string }).puzzleSlug;
  renderRoot(
    elem,
    <InteractionLinkManager
      slug={slug}
      initialInteractionLinkState={interactionLinkState}
    />,
  );
} else {
  console.log(
    "Could not mount InteractionLinkManager because #interaction-link-root was nowhere to be found",
  );
}
