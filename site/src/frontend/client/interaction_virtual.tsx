import React, { useCallback, useEffect, useRef } from "react";
import { createRoot /*, hydrateRoot */ } from "react-dom/client";
import VirtualInteraction from "../components/VirtualInteraction";
import { type ExternalInteractionNode } from "../interactions/client-types";
import useAppendDataset from "./useAppendDataset";

const InteractionStateLogView = ({
  slug,
  log,
}: {
  slug: string;
  log: ExternalInteractionNode[];
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentNode = log.length > 0 ? log.at(-1) : undefined;
  const currentNodeId = currentNode?.node;

  // This won't actually be here in production, just for testing
  const hackAdvanceInteraction = useCallback(() => {
    fetch(`/interactions/${slug}/advance/${currentNodeId}`, {
      method: "POST",
    }).then(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.error(err);
      },
    );
  }, [slug, currentNodeId]);

  useEffect(() => {
    if (audioRef.current) {
      void audioRef.current.play();
    }
  }, [currentNode?.sound]);

  const advanceInteractionButton =
    currentNode && !("finalState" in currentNode) ? (
      <button onClick={hackAdvanceInteraction}>Step interaction</button>
    ) : undefined;

  return (
    <>
      <VirtualInteraction nodes={log} slug={slug} />
      <div>{advanceInteractionButton}</div>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- text will be shown elsewhere */}
      <audio ref={audioRef} src={currentNode?.sound} autoPlay controls />
    </>
  );
};

const InteractionStateManager = ({
  slug,
  initialState,
}: {
  slug: string;
  initialState: ExternalInteractionNode[];
}) => {
  const log = useAppendDataset("interaction_state_log", { slug }, initialState);
  return <InteractionStateLogView slug={slug} log={log} />;
};

const elem = document.getElementById("interaction-root");
if (elem) {
  const initialState = (
    window as unknown as { initialInteractionState: ExternalInteractionNode[] }
  ).initialInteractionState;
  const match = window.location.pathname.match(/\/interactions\/([A-Za-z_]*)/);
  const slug = match?.[1];
  if (slug) {
    const root = createRoot(elem);
    root.render(
      <InteractionStateManager slug={slug} initialState={initialState} />,
    );
  } else {
    console.error("Could not infer interaction slug from URL");
  }
} else {
  console.error(
    "Could not mount InteractionStateLogView because #interaction-root was nowhere to be found",
  );
}
