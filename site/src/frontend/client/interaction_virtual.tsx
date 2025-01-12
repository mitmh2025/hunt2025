import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot /*, hydrateRoot */ } from "react-dom/client";
import { newClient } from "../../../lib/api/client";
import {
  type InteractionChoice,
  type ExternalInteractionNode,
} from "../interactions/client-types";
import apiUrl from "../utils/apiUrl";
import useAppendDataset from "./useAppendDataset";
import useDataset from "./useDataset";

const VotesView = ({
  slug,
  node,
}: {
  slug: string;
  node: ExternalInteractionNode;
}) => {
  const state = useDataset(
    "poll_responses",
    { slug, pollId: node.node },
    { epoch: -1 },
  );

  console.log("votes now", state);

  return (
    <>
      <div>
        Current votes for slug <code>{slug}</code> pollId{" "}
        <code>{node.node}</code>:
      </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};

const VoteButton = ({
  choice,
  onChoiceSelected,
  currentVote,
}: {
  choice: InteractionChoice;
  onChoiceSelected: (choice: string) => void;
  currentVote: string | undefined;
}) => {
  const onClick = useCallback(() => {
    onChoiceSelected(choice.key);
  }, [choice.key, onChoiceSelected]);

  // TODO implement choice.textEffect if present
  const style = {
    backgroundColor: currentVote === choice.key ? "#22ff22" : undefined,
  };
  return (
    <button style={style} onClick={onClick}>
      {choice.text}
    </button>
  );
};

const VotesButtons = ({
  slug,
  nodeId,
  choices,
}: {
  slug: string;
  nodeId: string;
  choices: InteractionChoice[];
}) => {
  const [vote, setVote] = useState<string | undefined>(undefined);
  const onChoiceSelected = useCallback(
    (key: string) => {
      const apiClient = newClient(apiUrl(), undefined);
      apiClient
        .castVote({ body: { choice: key }, params: { slug, pollId: nodeId } })
        .then(
          () => {
            setVote(key);
          },
          (err) => {
            // Well your vote was rejected.  That's too bad.  Nothing really to do.
            console.error(err);
          },
        );
    },
    [slug, nodeId],
  );
  return (
    <div>
      {choices.map((choice) => {
        return (
          <div key={`${slug}-${nodeId}-${choice.key}`}>
            <VoteButton
              choice={choice}
              currentVote={vote}
              onChoiceSelected={onChoiceSelected}
            />
          </div>
        );
      })}
    </div>
  );
};

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
    fetch(`/api/teams/4/interactions/${slug}/advance/${currentNodeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "applicaiton/json",
        Accept: "application/json",
        Authorization: "frontend-auth frontend",
      },
    }).then(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.error(err);
      },
    );
  }, [slug, currentNodeId]);

  let votesOptions = undefined;
  if (currentNode && "choices" in currentNode && currentNode.choices) {
    votesOptions = (
      <VotesButtons
        slug={slug}
        nodeId={currentNode.node}
        choices={currentNode.choices}
      />
    );
  }

  useEffect(() => {
    if (audioRef.current) {
      void audioRef.current.play();
    }
  }, [currentNode?.sound]);

  const votesView =
    currentNode && "choices" in currentNode ? (
      <VotesView slug={slug} node={currentNode} />
    ) : undefined;

  const advanceInteractionButton =
    currentNode && !("finalState" in currentNode) ? (
      <button onClick={hackAdvanceInteraction}>Step interaction</button>
    ) : undefined;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- text will be shown elsewhere */}
      <audio ref={audioRef} src={currentNode?.sound} autoPlay controls />
      <div>Interaction state log:</div>
      <pre>{JSON.stringify(log, null, 2)}</pre>
      <div>{advanceInteractionButton}</div>
      {votesOptions}
      {votesView}
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
