import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import { type TeamInteractionStateLogEntry } from "../../../lib/api/frontend_contract";
import { type ExternalInteractionNode } from "../interactions/client-types";
import ArtGalleryInteractionGraph, {
  artGalleryRewards,
} from "../interactions/interview_at_the_art_gallery/graph";
import BoardwalkInteractionGraph, {
  boardwalkRewards,
} from "../interactions/interview_at_the_boardwalk/graph";
import CasinoInteractionGraph, {
  casinoRewards,
} from "../interactions/interview_at_the_casino/graph";
import JewelryStoreInteractionGraph, {
  jewelryStoreRewards,
} from "../interactions/interview_at_the_jewelry_store/graph";
import { type InteractionGraph } from "../interactions/types";
import {
  type StartState,
  VirtualInteractionHandler,
} from "../interactions/virtual_interaction_handler";
import { AuthorsNoteBlock } from "./PuzzleLayout";
import SpinnerTimer from "./SpinnerTimer";
import { DarkStyledDialog } from "./StyledDialog";
import { Button } from "./StyledUI";
import BalloonPop from "./minigames/BalloonPop";
import LuckyDuck from "./minigames/LuckyDuck";
import Skeeball from "./minigames/Skeeball";

type Rewards = Record<string, { asset: string; description: string }>;

type AnyInteractionGraph = InteractionGraph<
  object,
  unknown,
  string,
  string,
  unknown
>;

const interactions: Record<
  string,
  {
    graph: AnyInteractionGraph;
    rewards: Rewards;
  }
> = {
  interview_at_the_boardwalk: {
    graph: BoardwalkInteractionGraph as AnyInteractionGraph,
    rewards: boardwalkRewards,
  },
  interview_at_the_art_gallery: {
    graph: ArtGalleryInteractionGraph as AnyInteractionGraph,
    rewards: artGalleryRewards,
  },
  interview_at_the_casino: {
    graph: CasinoInteractionGraph as AnyInteractionGraph,
    rewards: casinoRewards,
  },
  interview_at_the_jewelry_store: {
    graph: JewelryStoreInteractionGraph as AnyInteractionGraph,
    rewards: jewelryStoreRewards,
  },
};

const WIDTH = 1920;
const HEIGHT = 648 * 2;

type Plugin = {
  helpText: string;
  Component: React.ComponentType<{
    onWin: () => void;
    onFirstInteraction: () => void;
  }>;
};

const plugins: Record<string, Plugin> = {
  "skee-ball": {
    helpText:
      "Click to throw. Aim for the center of the velocity target! Score 100 to win.",
    Component: Skeeball,
  },
  ducks: {
    helpText: "Click the duck before time’s up!",
    Component: LuckyDuck,
  },
  balloons: {
    helpText: "Hover to pop balloons before time’s up!",
    Component: BalloonPop,
  },
};

function proportionify(size: number) {
  return `calc(${size} * min(calc(min(100vw, ${WIDTH}px) / ${WIDTH}), calc(min(calc(100vh - 3rem), ${HEIGHT}px) / ${HEIGHT})))`;
}

const IconSvg = styled.svg`
  fill: var(--black);
  stroke: var(--black);
  width: 20px;
  height: 20px;
`;

function MutedIcon() {
  // Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.
  return (
    <IconSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      style={{ stroke: "white" }}
    >
      <path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
    </IconSvg>
  );
}

function UnmutedIcon() {
  // Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.
  return (
    <IconSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
      <path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
    </IconSvg>
  );
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
      gap: 1rem;

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
  node,
  onAdvance,
}: {
  node: ExternalInteractionNode;
  onAdvance: (vote: string | undefined) => void;
}) => {
  useEffect(() => {
    const autoadvanceTime = node.ts + node.timeout_msec;
    const autoadvanceDelay = autoadvanceTime - Date.now();

    const handle = setTimeout(() => {
      onAdvance(undefined);
    }, autoadvanceDelay);
    return () => {
      clearTimeout(handle);
    };
  }, [node.ts, node.timeout_msec, onAdvance]);

  return (
    <ButtonAndCountdownWrapper>
      <ChoiceButtons>
        {(node.choices ?? []).map((choice) => (
          <DialogueChoice key={`choice-${choice.key}`}>
            <input
              type="radio"
              name="current-vote"
              value={choice.key}
              id={choice.key}
              onChange={(e) => {
                onAdvance(e.target.value);
              }}
            />
            <label htmlFor={choice.key}>
              <span className="text">{choice.text}</span>
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
        />
      </CountdownWrapper>
    </ButtonAndCountdownWrapper>
  );
};

const InteractionWrapper = styled.main`
  width: 100%;
  margin: 0 auto;

  .help-text {
    text-align: center;
    margin: 1rem;
    font-size: 1rem;
  }
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
`;

const InteractionPlugin = ({
  name,
  node,
  onAdvance,
}: {
  name: string;
  slug: string;
  node: ExternalInteractionNode;
  onAdvance: (vote: string | undefined) => void;
}) => {
  const lastVoteRef = useRef<string | undefined>(undefined);
  const handleFirstInteraction = useCallback(() => {
    lastVoteRef.current = "lose";
  }, []);

  const handleWin = useCallback(() => {
    lastVoteRef.current = "win";
  }, []);

  useEffect(() => {
    const autoadvanceTime = node.ts + node.timeout_msec;
    const autoadvanceDelay = autoadvanceTime - Date.now();

    const handle = setTimeout(() => {
      onAdvance(lastVoteRef.current);
    }, autoadvanceDelay);
    return () => {
      clearTimeout(handle);
    };
  }, [node.ts, node.timeout_msec, onAdvance]);

  const plugin = plugins[name];
  if (!plugin) {
    return null;
  }

  const { helpText, Component } = plugin;

  return (
    <InteractionWrapper>
      <DarkStyledDialog
        open={true}
        onClose={() => {
          // noop
        }}
      >
        <div
          style={{
            margin: "auto",
            width: "800px",
            maxWidth: "72vw",
            textWrap: "wrap",
          }}
        >
          <Component
            onWin={handleWin}
            onFirstInteraction={handleFirstInteraction}
          />
          <p className="help-text">{helpText}</p>
          <CountdownContainer>
            <SpinnerTimer
              width={80}
              height={80}
              startTime={node.ts}
              endTime={node.ts + node.timeout_msec}
              color="#f8f8f6"
            />
          </CountdownContainer>
        </div>
      </DarkStyledDialog>
    </InteractionWrapper>
  );
};

const RewardAsset = styled.img`
  display: block;
  max-width: 300px;
  max-height: 300px;
  margin: 2rem auto;
`;

const MuteControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function VirtualInteractionPlayer({
  nodes,
  slug,
  rewardDescription,
  rewardImage,
  audioOn,
  setAudioOn,
  onAdvance,
}: {
  nodes: ExternalInteractionNode[];
  slug: string;
  rewardImage?: string;
  rewardDescription?: string;
  audioOn: boolean;
  setAudioOn: (audioOn: boolean) => void;
  onAdvance: (vote: string | undefined) => void;
}) {
  const currentNode = nodes[nodes.length - 1];
  const playingAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!currentNode?.sound) {
      if (playingAudio.current) {
        playingAudio.current.pause();
        playingAudio.current.src = "";
      }
      return;
    }

    let endedListener: () => void;
    if (
      !playingAudio.current ||
      playingAudio.current.src !== currentNode.sound
    ) {
      if (!playingAudio.current) {
        playingAudio.current = new Audio();
      }

      playingAudio.current.src = currentNode.sound;
      playingAudio.current.play().catch((err: unknown) => {
        console.error(err);
      });

      endedListener = () => {
        if (!currentNode.choices && !currentNode.plugin) {
          onAdvance(undefined);
        }
      };
      playingAudio.current.addEventListener("ended", endedListener);
    }

    return () => {
      if (playingAudio.current) {
        playingAudio.current.removeEventListener("ended", endedListener);
        playingAudio.current.pause();
        playingAudio.current.src = "";
      }
    };
  }, [
    currentNode?.sound,
    currentNode?.choices,
    currentNode?.plugin,
    onAdvance,
  ]);

  useEffect(() => {
    if (playingAudio.current) {
      playingAudio.current.volume = audioOn ? 1 : 0;
    }
  }, [audioOn]);

  const scrollbackRef = useRef<HTMLDivElement | null>(null);
  const scrollbackLastLength = useRef<number>(0);
  useEffect(() => {
    if (scrollbackRef.current && nodes.length > scrollbackLastLength.current) {
      scrollbackRef.current.scrollTo(0, 0);
    }

    scrollbackLastLength.current = nodes.length;
  }, [nodes]);

  if (!currentNode) {
    return null;
  }

  return (
    <Wrapper>
      {currentNode.plugin ? (
        <InteractionPlugin
          name={currentNode.plugin}
          slug={slug}
          node={currentNode}
          onAdvance={onAdvance}
        />
      ) : (
        <>
          <Background
            style={{ backgroundImage: `url(${currentNode.background})` }}
          >
            {currentNode.backgroundOverlay && (
              <BackgroundOverlay
                style={{
                  backgroundImage: `url(${currentNode.backgroundOverlay})`,
                }}
              />
            )}
            <MuteControls>
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
            </MuteControls>
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
              <Scrollback ref={scrollbackRef}>
                {rewardImage && (
                  <a href="/">
                    <RewardAsset src={rewardImage} alt={rewardDescription} />
                  </a>
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
                    <VotesView node={currentNode} onAdvance={onAdvance} />
                  </>
                )}
              </Choices>
            </Content>
          </UIWrapper>
        </>
      )}
    </Wrapper>
  );
}

let nextId = 1;
function logEntryForState<T extends object>(
  node: string,
  state: T,
  slug: string,
): TeamInteractionStateLogEntry {
  return {
    id: nextId++,
    team_id: 1,
    slug,
    node,
    timestamp: new Date(),
    graph_state: state as unknown as Record<string, unknown>,
  };
}

function VirtualInteractionStateManager<
  T extends object,
  R,
  S extends string,
  BG extends string,
  P,
>({
  handler,
  rewards,
  slug,
  audioOn,
  setAudioOn,
}: {
  handler: VirtualInteractionHandler<T, R, S, BG, P>;
  rewards: Rewards;
  slug: string;
  audioOn: boolean;
  setAudioOn: (newAudioOn: boolean) => void;
}) {
  const [graphState, setGraphState] = useState<StartState<T>>(() => {
    return handler.startState();
  });

  const [nodes, setNodes] = useState<ExternalInteractionNode[]>(() => {
    const node = handler.format(
      logEntryForState(graphState.node, graphState.state, slug),
    );
    return node ? [node] : [];
  });

  const advance = useCallback(
    (vote: string | undefined) => {
      const currentNode = handler.lookupNode(graphState.node);
      if (!currentNode) {
        console.warn("No current node found for", graphState.node);
        return;
      }

      handler
        .computeNext({
          teamId: 1,
          currentNode,
          state: graphState.state,
          maybeVoteCounts: vote ? { [vote]: 1 } : {},

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- we don't need redis here because we're passing in the vote counts
          redisClient: null as any,
        })
        .then((next) => {
          if (!next) {
            console.warn("Could not advance graph", {
              currentNode,
              state: graphState.state,
              vote,
            });
            return;
          }

          setGraphState({
            node: next.nextNode.id,
            state: next.nextState,
          });

          const nextExternalNode = handler.format(
            logEntryForState(next.nextNode.id, next.nextState, slug),
          );
          if (nextExternalNode) {
            setNodes((prev) => [...prev, nextExternalNode]);
          }
        })
        .catch((e: unknown) => {
          console.error(e);
        });
    },
    [graphState.node, graphState.state, handler, slug],
  );

  let rewardImage: string | undefined;
  let rewardDescription: string | undefined;
  const currentNode = nodes[nodes.length - 1];
  if (currentNode?.result) {
    const reward = rewards[currentNode.result];
    if (reward) {
      rewardImage = reward.asset;
      rewardDescription = reward.description;
    }
  }
  return (
    <VirtualInteractionPlayer
      audioOn={audioOn}
      setAudioOn={setAudioOn}
      nodes={nodes}
      slug={slug}
      rewardImage={rewardImage}
      rewardDescription={rewardDescription}
      onAdvance={advance}
    />
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

  border: 2px solid var(--gold-700);
  box-shadow:
    0 0 0 4px var(--gray-100),
    0 0 0 6px var(--gold-700),
    0 0 2.5rem var(--purple-500);
  border-radius: 2px;
  background: var(--gray-200);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

function VirtualInteractionNotStarted({
  onStart,
}: {
  onStart: (audioOn: boolean) => void;
}) {
  return (
    <StartContainer>
      <AuthorsNoteBlock>
        <p>
          During the hunt, this was a team-wide experience. Every team member
          was encouraged to join in their browser, and vote on each dialog tree
          interaction. In this archival version, you’ll be able to have the same
          experience but without the team-wide voting.
        </p>
        <p>
          There is voice acting for each line, so we recommend enabling audio
          for this interaction. During the hunt, the audio was streamed to each
          team’s radio.
        </p>
      </AuthorsNoteBlock>
      <ButtonContainer>
        <Button
          type="button"
          onClick={() => {
            onStart(true);
          }}
        >
          Start (With Audio)
        </Button>
        <Button
          type="button"
          onClick={() => {
            onStart(false);
          }}
          style={{
            backgroundColor: "var(--gray-300)",
          }}
        >
          Start (Muted)
        </Button>
      </ButtonContainer>
    </StartContainer>
  );
}

export default function VirtualInteraction({ slug }: { slug: string }) {
  const interaction = interactions[slug];
  if (!interaction) {
    throw new Error(`Unknown interaction slug: ${slug}`);
  }

  const [started, setStarted] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  const { graph, rewards } = interaction;

  const handler = useMemo(
    () =>
      new VirtualInteractionHandler<object, unknown, string, string, unknown>(
        slug,
        graph,
      ),
    [slug, graph],
  );

  if (!started) {
    return (
      <VirtualInteractionNotStarted
        onStart={(audioOn) => {
          setAudioOn(audioOn);
          setStarted(true);
        }}
      />
    );
  }

  return (
    <VirtualInteractionStateManager
      handler={handler}
      rewards={rewards}
      slug={slug}
      audioOn={audioOn}
      setAudioOn={setAudioOn}
    />
  );
}
