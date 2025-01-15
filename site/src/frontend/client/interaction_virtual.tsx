import React from "react";
import { hydrateRoot } from "react-dom/client";
import VirtualInteraction from "../components/VirtualInteraction";
import { type ExternalInteractionNode } from "../interactions/client-types";
import { type TeamVirtualInteractionsState } from "../interactions/types";
import useSyncedTime from "../utils/useSyncedTime";
import useAppendDataset from "./useAppendDataset";
import useDataset from "./useDataset";

const InteractionStateManagerWithVotes = ({
  slug,
  nodes,
  state,
  pollId,
  syncedTime,
}: {
  slug: string;
  nodes: ExternalInteractionNode[];
  state: TeamVirtualInteractionsState;
  pollId: string;
  syncedTime: { getCurrentTime: () => number };
}) => {
  const votes = useDataset(
    "poll_responses",
    { slug, pollId },
    { epoch: -1, pollState: {} as Record<string, number> },
  );
  return (
    <VirtualInteraction
      slug={slug}
      nodes={nodes}
      state={state}
      pollState={votes.pollState}
      syncedTime={syncedTime}
    />
  );
};

const InteractionStateManager = ({
  slug,
  initialState,
  initialVirtualInteractionState,
}: {
  slug: string;
  initialState: ExternalInteractionNode[];
  initialVirtualInteractionState: TeamVirtualInteractionsState;
}) => {
  const log = useAppendDataset("interaction_state_log", { slug }, initialState);
  const state = useDataset(
    "virtual_interaction_state",
    undefined,
    initialVirtualInteractionState,
  );

  const syncedTime = useSyncedTime();

  const interactionState = state.interactions.find((i) => i.slug === slug);
  if (interactionState?.state === "running") {
    const currentNode = log[log.length - 1];
    if (currentNode?.choices) {
      return (
        <InteractionStateManagerWithVotes
          slug={slug}
          nodes={log}
          state={state}
          pollId={currentNode.node}
          syncedTime={syncedTime}
        />
      );
    }
  }

  return (
    <VirtualInteraction
      slug={slug}
      nodes={log}
      state={state}
      syncedTime={syncedTime}
    />
  );
};

const elem = document.getElementById("interaction-root");
if (elem) {
  const initialState = (
    window as unknown as { initialInteractionState: ExternalInteractionNode[] }
  ).initialInteractionState;

  const initialVirtualInteractionState = (
    window as unknown as {
      initialVirtualInteractionState: TeamVirtualInteractionsState;
    }
  ).initialVirtualInteractionState;

  const match = window.location.pathname.match(/\/interactions\/([A-Za-z_]*)/);
  const slug = match?.[1];
  if (slug) {
    hydrateRoot(
      elem,
      <InteractionStateManager
        slug={slug}
        initialState={initialState}
        initialVirtualInteractionState={initialVirtualInteractionState}
      />,
    );
  } else {
    console.error("Could not infer interaction slug from URL");
  }
} else {
  console.error(
    "Could not mount InteractionStateLogView because #interaction-root was nowhere to be found",
  );
}
