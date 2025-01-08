import React from "react";
import {
  Background,
  Billie,
  Choices,
  Content,
  DialogueChoice,
  Interviewee,
  proportionify,
  Scrollback,
  UIWrapper,
  Wrapper,
} from "./Layout";
import DefaultBillieAvi from "../hub/assets/billie.png";

type Interviewee = {
  name: string;
  imgSrc: string;
  alt: string;
  pos: { x: number; y: number };
};

type Choice = {
  text: string;
  id: string;
  selected?: boolean;
  winner?: boolean;
  percentage?: number;
};

type UINode = {
  id: string;
  speaker: string;
  bgImgSrc: string;
  bgImgAlt: string;
  interviewee: Interviewee;
  interviewee2?: Interviewee;
  billieImgSrc?: string;
  billieImgAlt?: string;
  line: string;
  choices?: Choice[];
  votingActive?: boolean;
};

type Props = {
  currentNode: UINode;
  history: UINode[];
};

const Interaction = ({ currentNode, history }: Props) => {
  return (
    <Wrapper>
      <Background
        title={currentNode.bgImgAlt}
        style={{ backgroundImage: `url(${currentNode.bgImgSrc})` }}
      >
        <Interviewee
          title={currentNode.interviewee.alt}
          src={currentNode.interviewee.imgSrc}
          style={{
            top: `${proportionify(currentNode.interviewee.pos.y)}`,
            left: `${proportionify(currentNode.interviewee.pos.x)}`,
          }}
        />
        {currentNode.interviewee2 && (
          <Interviewee
            alt={currentNode.interviewee2.alt}
            src={currentNode.interviewee2.imgSrc}
            style={{
              top: `${proportionify(currentNode.interviewee2.pos.y)}`,
              left: `${proportionify(currentNode.interviewee2.pos.x)}`,
            }}
          />
        )}
      </Background>
      <UIWrapper>
        <Billie>
          <div
            className="avi"
            style={{
              backgroundImage: `url(${currentNode.billieImgSrc || DefaultBillieAvi})`,
            }}
            title={
              currentNode.billieImgAlt ||
              "Silhouette wearing a fedora and trenchcoat"
            }
          ></div>
          <h3>Billie</h3>
        </Billie>
        <Content>
          <Scrollback>
            {history.map((l) => (
              <p>
                {l.speaker && <span className="speaker">{l.speaker}: </span>}
                <span>{l.line}</span>
              </p>
            ))}
            <p className="current-line">
              {currentNode.speaker && (
                <span className="speaker">{currentNode.speaker}: </span>
              )}
              <span dangerouslySetInnerHTML={{ __html: currentNode.line }} />
            </p>
          </Scrollback>
          <Choices>
            {currentNode.choices && (
              <>
                <h4>
                  {currentNode.votingActive
                    ? "Select a response: (timer goes here)"
                    : "Result:"}
                </h4>
                <div className="choice-buttons">
                  {currentNode.choices.map((choice) => (
                    <DialogueChoice
                      key={`choice-${choice.id}`}
                      style={{
                        background: `linear-gradient(90deg, ${choice.winner ? "var(--teal-700)" : "var(--gray-900)"} ${(choice.percentage ?? 0) * 100}%, transparent ${(choice.percentage ?? 0) * 100}%)`,
                      }}
                    >
                      <input
                        type="radio"
                        name="current-vote"
                        value={choice.id}
                        id={choice.id}
                        disabled={!currentNode.votingActive}
                      ></input>
                      <label htmlFor={choice.id}>
                        <span
                          className="text"
                          dangerouslySetInnerHTML={{ __html: choice.text }}
                        />
                        {choice.percentage && (
                          <span className="percentage">
                            {choice.percentage * 100}%
                          </span>
                        )}
                      </label>
                    </DialogueChoice>
                  ))}
                </div>
              </>
            )}
          </Choices>
        </Content>
      </UIWrapper>
    </Wrapper>
  );
};

export default Interaction;
