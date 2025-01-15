import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import { newClient } from "../../../lib/api/client";
import useDataset from "../client/useDataset";
import { type ExternalInteractionNode } from "../interactions/client-types";
import apiUrl from "../utils/apiUrl";

const WIDTH = 1920;
const HEIGHT = 648 * 2;

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

export const Content = styled.div`
  flex: 1;
  padding: ${proportionify(12)};
  display: flex;
  flex-direction: column;
  border-left: ${proportionify(2)} solid var(--gold-700);
`;

export const Scrollback = styled.div`
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

export const Choices = styled.div`
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

export const DialogueChoice = styled.div`
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
}: {
  slug: string;
  node: ExternalInteractionNode;
}) => {
  const state = useDataset(
    "poll_responses",
    { slug, pollId: node.node },
    { epoch: -1, pollState: {} as Record<string, number> },
  );

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

  console.log("votes now", state);

  const totalVotes = Object.values(state.pollState).reduce(
    (acc, val) => acc + val,
    0,
  );

  const choices = (node.choices ?? []).map((choice) => {
    const votes = state.pollState[choice.key] ?? 0;
    return {
      key: choice.key,
      text: choice.text,
      percentage: totalVotes ? votes / totalVotes : 0,
      votes,
    };
  });

  return (
    <div className="choice-buttons">
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
            {choice.votes && <span className="percentage">{choice.votes}</span>}
          </label>
        </DialogueChoice>
      ))}
    </div>
  );
};

export default function VirtualInteraction({
  nodes,
  slug,
}: {
  nodes: ExternalInteractionNode[];
  slug: string;
}) {
  const currentNode = nodes[nodes.length - 1];
  if (!currentNode) {
    return null;
  }
  return (
    <Wrapper>
      <Background style={{ backgroundImage: `url(${currentNode.background})` }}>
        <BackgroundOverlay
          style={{ backgroundImage: `url(${currentNode.backgroundOverlay})` }}
        />
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
                <VotesView slug={slug} node={currentNode} />
              </>
            )}
          </Choices>
        </Content>
      </UIWrapper>
    </Wrapper>
  );
}
