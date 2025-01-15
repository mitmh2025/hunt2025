import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { newClient } from "../../../lib/api/client";
import { type ExternalInteractionNode } from "../interactions/client-types";
import { type TeamVirtualInteractionsState } from "../interactions/types";
import playSound from "../rounds/illegal_search/client/playSound";
import apiUrl from "../utils/apiUrl";
import SpinnerTimer from "./SpinnerTimer";
import { Button } from "./StyledUI";

const WIDTH = 1920;
const HEIGHT = 648 * 2;

export const ROLL_CALL_POLL_ID = "roll_call";
const ROLL_CALL_POLL_OPTION = "present";

function proportionify(size: number) {
  return `calc(${size} * min(calc(min(100vw, ${WIDTH}px) / ${WIDTH}), calc(min(calc(100vh - 3rem), ${HEIGHT}px) / ${HEIGHT})))`;
}

const Wrapper = styled.main`
  width: ${proportionify(WIDTH)};
  height: ${proportionify(HEIGHT)};
  margin: 0 auto;
  background-color: var(--true-black);
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Background = styled.div`
  flex: 1;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

const BackgroundOverlay = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const UIWrapper = styled.div`
  flex: 0;
  display: flex;
  align-items: stretch;
  gap: ${proportionify(6)};
  min-height: ${proportionify(HEIGHT / 2)};
  border: ${proportionify(2)} solid var(--gold-700);
`;

const Headshot = styled.div`
  flex: 0;
  display: flex;
  flex-direction: column;
  gap: ${proportionify(16)};
  text-align: center;
  min-width: ${proportionify(360)};
  padding: ${proportionify(16)};
  background-color: var(--nav-bar-bg);
  color: var(--gold-500);
  border-right: ${proportionify(2)} solid var(--gold-700);
  .avi {
    flex: 1;
    background-color: var(--gray-500);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: ${proportionify(4)} solid var(--black);
    box-shadow:
      0 0 0 ${proportionify(4)} var(--gold-700),
      0px ${proportionify(4)} ${proportionify(8)} var(--black);
  }
  h3 {
    flex: 0;
    padding: ${proportionify(16)} 0;
    font-size: max(${proportionify(48)}, 1rem);
    text-transform: uppercase;
    font-weight: normal;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: ${proportionify(12)};
  display: flex;
  flex-direction: column;
  border-left: ${proportionify(2)} solid var(--gold-700);
`;

const Scrollback = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: ${proportionify(8)} ${proportionify(16)};
  background-color: var(--gray-900);
  color: var(--gray-200);
  display: flex;
  flex-direction: column-reverse;

  .current-line {
    color: var(--white);
    font-family: var(--body-font);
    font-weight: 300;
  }

  .bubble-type-thought {
    font-style: italic;
  }

  .speaker {
    font-weight: bold;
  }
`;

const Choices = styled.div`
  flex: 0;
  padding-right: 1rem;
  margin: 0;
  h4 {
    margin: ${proportionify(8)} ${proportionify(16)};
    font-family: var(--body-font);
  }
  .choice-buttons {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${proportionify(6)};
    margin: 0;
  }
`;

const ButtonAndCountdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ChoiceButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${proportionify(6)};
  margin: 0;
  flex: 1;
`;

const CountdownWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin-left: 20px;
`;

const DialogueChoice = styled.div`
  position: relative;
  input {
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    + label {
      display: flex;
      padding: ${proportionify(16)};
      border: ${proportionify(1)} solid var(--gold-500);
      border-radius: ${proportionify(8)};
      cursor: pointer;
      .text {
        flex: 1;
      }
      .percentage {
        font-weight: bold;
      }
    }
    &:checked + label {
      background-color: var(--gold-600);
      color: var(--black);
    }
    &:not(:disabled) + label:hover {
      background-color: var(--nav-bar-bg);
      margin-top: ${proportionify(-4)};
      margin-left: ${proportionify(-2)};
      border-bottom-width: ${proportionify(5)};
      border-right-width: ${proportionify(2)};
    }
    &:checked:not(:disabled) + label:hover {
      background-color: var(--gold-400);
      color: var(--black);
      border-color: var(--gold-700);
    }
    &:disabled + label {
      cursor: default;
    }
  }
`;

const Line = styled.p`
  margin-top: 1em;
`;

const VotesView = ({
  slug,
  node,
  pollState,
  syncedTime,
}: {
  slug: string;
  node: ExternalInteractionNode;
  pollState: Record<string, number>;
  syncedTime: { getCurrentTime: () => number };
}) => {
  const [vote, setVote] = useState<string | undefined>(undefined);
  const onChoiceSelected = useCallback(
    (key: string) => {
      setVote(key);

      const apiClient = newClient(apiUrl(), undefined);
      apiClient
        .castVote({
          body: { choice: key },
          params: { slug, pollId: node.node },
        })
        .catch((err: unknown) => {
          // Well your vote was rejected.  That's too bad.  Nothing really to do.
          console.error(err);
        });
    },
    [slug, node.node],
  );

  console.log("votes now", pollState);

  const totalVotes = Object.values(pollState).reduce(
    (acc, val) => acc + val,
    0,
  );

  const choices = (node.choices ?? []).map((choice) => {
    const votes = pollState[choice.key] ?? 0;
    return {
      key: choice.key,
      text: choice.text,
      percentage: totalVotes ? votes / totalVotes : 0,
      votes,
    };
  });

  return (
    <ButtonAndCountdownWrapper>
      <ChoiceButtons>
        {choices.map((choice) => (
          <DialogueChoice
            key={`choice-${choice.key}`}
            style={{
              background: `linear-gradient(90deg, var(--gray-900) ${choice.percentage * 100}%, transparent ${choice.percentage * 100}%)`,
            }}
          >
            <input
              type="radio"
              name="current-vote"
              value={choice.key}
              id={choice.key}
              checked={choice.key === vote}
              onChange={(e) => {
                onChoiceSelected(e.target.value);
              }}
            />
            <label htmlFor={choice.key}>
              <span className="text">{choice.text}</span>
              {choice.votes && (
                <span className="percentage">{choice.votes}</span>
              )}
            </label>
          </DialogueChoice>
        ))}
      </ChoiceButtons>
      <CountdownWrapper>
        <SpinnerTimer
          width={80}
          height={80}
          startTime={node.ts}
          endTime={node.ts + node.timeout_msec}
          color="#f8f8f6"
          syncedTime={syncedTime}
        />
      </CountdownWrapper>
    </ButtonAndCountdownWrapper>
  );
};

const RewardAsset = styled.img`
  display: block;
  max-width: 300px;
  max-height: 300px;
  margin: 2rem auto;
`;

function VirtualInteractionPlayer({
  nodes,
  slug,
  rewardDescription,
  rewardImage,
  pollState,
  syncedTime,
  audioOn,
  setAudioOn,
}: {
  nodes: ExternalInteractionNode[];
  slug: string;
  rewardImage?: string;
  rewardDescription?: string;
  pollState: Record<string, number>;
  syncedTime: { getCurrentTime: () => number };
  audioOn: boolean;
  setAudioOn: (audioOn: boolean) => void;
}) {
  const currentNode = nodes[nodes.length - 1];
  const lastPlayedSound = useRef<string | null>(null);

  useEffect(() => {
    if (!audioOn || rewardImage) {
      // muted or already solved
      return;
    }

    if (currentNode?.sound && currentNode.sound !== lastPlayedSound.current) {
      playSound(currentNode.sound);
      lastPlayedSound.current = currentNode.sound;
    }
  }, [currentNode?.sound, audioOn, rewardImage]);

  if (!currentNode) {
    return null;
  }

  return (
    <Wrapper>
      <Background style={{ backgroundImage: `url(${currentNode.background})` }}>
        {currentNode.backgroundOverlay && (
          <BackgroundOverlay
            style={{ backgroundImage: `url(${currentNode.backgroundOverlay})` }}
          />
        )}
        <PlayPauseControls>
          {audioOn ? (
            <Button
              onClick={() => {
                setAudioOn(false);
              }}
            >
              <UnmutedIcon />
            </Button>
          ) : (
            <Button
              onClick={() => {
                setAudioOn(true);
              }}
            >
              <MutedIcon />
            </Button>
          )}
        </PlayPauseControls>
      </Background>
      <UIWrapper>
        <Headshot>
          <div
            className="avi"
            style={{
              backgroundImage: `url(${currentNode.speakerImage})`,
            }}
            title={currentNode.speaker}
          ></div>
          <h3>{currentNode.speaker}</h3>
        </Headshot>
        <Content>
          <Scrollback>
            {rewardImage && (
              <RewardAsset src={rewardImage} alt={rewardDescription} />
            )}
            {nodes
              .slice()
              .reverse()
              .map((l, i) => {
                // We reverse these nodes because we display them with flex
                // direction column-reverse (so we scroll to the bottom by
                // default).
                const classNames = [];
                if (i === 0) {
                  classNames.push("current-line");
                }

                if (l.textBubbleType) {
                  classNames.push(`bubble-type-${l.textBubbleType}`);
                }

                if (l.textEffect) {
                  classNames.push(`text-effect-${l.textEffect}`);
                }

                return (
                  <Line key={l.id} className={classNames.join(" ")}>
                    {l.speaker && (
                      <span className="speaker">{l.speaker}: </span>
                    )}
                    <span className="speaker-line">{l.text}</span>
                  </Line>
                );
              })}
          </Scrollback>
          <Choices>
            {currentNode.choices && (
              <>
                <h4>Select a response:</h4>
                <VotesView
                  slug={slug}
                  node={currentNode}
                  pollState={pollState}
                  syncedTime={syncedTime}
                />
              </>
            )}
          </Choices>
        </Content>
      </UIWrapper>
    </Wrapper>
  );
}

const StartContainer = styled.div`
  margin: 5rem auto;
  padding: 1rem;
  max-width: 400px;

  color: var(--black);
  padding: 1rem;
  text-align: center;
  border-radius: 2px;

  border: 2px solid #856114;
  box-shadow:
    0 0 0 4px var(--gray-100),
    0 0 0 6px #856114,
    0 0 2.5rem #6f4b80;
  border-radius: 2px;
  background: #c29f3a;
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

function VirtualInteractionNotStarted({
  slug,
  enqueuedAt,
  autostartAt,
  syncedTime,
  pollState,
  setAudioOn,
}: {
  slug: string;
  enqueuedAt: Date;
  autostartAt: Date;
  syncedTime: { getCurrentTime: () => number };
  pollState: Record<string, number>;
  setAudioOn: (audioOn: boolean) => void;
}) {
  const [markedPresent, setMarkedPresent] = useState(false);
  const [loading, setLoading] = useState(false);

  const presentCount = pollState[ROLL_CALL_POLL_OPTION] ?? 0;

  function handleMarkPresent(withAudio: boolean) {
    setLoading(true);

    const apiClient = newClient(apiUrl(), undefined);
    apiClient
      .castVote({
        body: { choice: ROLL_CALL_POLL_OPTION },
        params: { slug, pollId: ROLL_CALL_POLL_ID },
      })
      .then((resp) => {
        if (resp.status !== 200) {
          throw new Error(`Unexpected status code: ${resp.status}`);
        }

        setAudioOn(withAudio);
        setMarkedPresent(true);
      })
      .catch((err: unknown) => {
        console.error(err);
        setLoading(false);
      });
  }

  function handleStartEarly() {
    setLoading(true);
    const apiClient = newClient(apiUrl(), undefined);
    apiClient
      .startVirtualInteractionEarly({ params: { interactionId: slug } })
      .then((resp) => {
        if (resp.status !== 200) {
          throw new Error(`Unexpected status code: ${resp.status}`);
        }

        // noop, wait for the websocket to push out the new state
      })
      .catch((err: unknown) => {
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <StartContainer>
      <CountdownContainer>
        <SpinnerTimer
          width={200}
          height={200}
          startTime={enqueuedAt.getTime()}
          endTime={autostartAt.getTime()}
          syncedTime={syncedTime}
          color="#1b1a18"
        />
      </CountdownContainer>
      {markedPresent ? (
        <>
          <p>
            The interaction will start automatically. If your whole team is
            ready, you can also click the button below to start now.
          </p>
          <Button type="button" disabled={loading} onClick={handleStartEarly}>
            {loading ? "Starting..." : "Start The Interview"}
          </Button>
          <p>{presentCount} trainees online</p>
        </>
      ) : (
        <>
          <p>
            It’s time to interview a key witness! Have every person on your team
            log on and join us here to conduct an interview.
          </p>
          <p>
            This interaction has audio that can be played via your physical
            radio, or in your browser. If you are not within earshot of your
            physical radio, select “Listen In Browser.”
          </p>
          <ButtonContainer>
            <Button
              type="button"
              onClick={() => {
                handleMarkPresent(false);
              }}
              disabled={loading}
            >
              Listen On Radio
            </Button>
            <Button
              type="button"
              onClick={() => {
                handleMarkPresent(true);
              }}
              disabled={loading}
            >
              Listen In Browser
            </Button>
          </ButtonContainer>
        </>
      )}
    </StartContainer>
  );
}

function VirtualInteractionQueued({
  otherSlug,
  otherTitle,
}: {
  otherSlug?: string;
  otherTitle?: string;
}) {
  return (
    <StartContainer>
      <p>You are currently interviewing a different witness.</p>
      {otherSlug && otherTitle ? (
        <p>
          Join Billie and the rest of your team to{" "}
          <a href={`/interactions/${otherSlug}`}>conduct an {otherTitle}</a>.
          You can come back here after.
        </p>
      ) : null}
    </StartContainer>
  );
}

export default function VirtualInteraction({
  slug,
  nodes,
  state,
  pollState,
  syncedTime,
  audioOn,
  setAudioOn,
}: {
  slug: string;
  nodes: ExternalInteractionNode[];
  state: TeamVirtualInteractionsState;
  pollState?: Record<string, number>;
  syncedTime: { getCurrentTime: () => number };
  audioOn: boolean;
  setAudioOn: (audioOn: boolean) => void;
}) {
  const interactionState = state.interactions.find((i) => i.slug === slug);
  if (!interactionState) {
    return null;
  }

  if (interactionState.state === "queued") {
    const activeInteraction = state.interactions.find(
      (i) => i.state === "running" || i.state === "unstarted",
    );
    return (
      <VirtualInteractionQueued
        otherSlug={activeInteraction?.slug}
        otherTitle={activeInteraction?.title}
      />
    );
  }

  if (interactionState.state === "unstarted") {
    return (
      <VirtualInteractionNotStarted
        slug={slug}
        autostartAt={new Date(interactionState.autostartAt)}
        enqueuedAt={new Date(interactionState.enqueuedAt)}
        syncedTime={syncedTime}
        pollState={pollState ?? {}}
        setAudioOn={setAudioOn}
      />
    );
  }

  if (interactionState.state === "completed") {
    return (
      <VirtualInteractionPlayer
        nodes={nodes}
        slug={slug}
        rewardDescription={interactionState.rewardDescription}
        rewardImage={interactionState.rewardImage}
        pollState={{}}
        syncedTime={syncedTime}
        audioOn={audioOn}
        setAudioOn={setAudioOn}
      />
    );
  }

  return (
    <VirtualInteractionPlayer
      nodes={nodes}
      slug={slug}
      pollState={pollState ?? {}}
      syncedTime={syncedTime}
      audioOn={audioOn}
      setAudioOn={setAudioOn}
    />
  );
}
