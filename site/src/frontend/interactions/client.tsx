import React from "react";
import {
  Background,
  Billie,
  Content,
  Interviewee,
  proportionify,
  Scrollback,
  UIWrapper,
  Wrapper,
} from "./Layout";
import DefaultBillieAvi from "./assets/billie.png";

type Interviewee = {
  name: string;
  imgSrc: string;
  alt: string;
  pos: { x: number; y: number };
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
              <span>{currentNode.line}</span>
            </p>
          </Scrollback>
        </Content>
      </UIWrapper>
    </Wrapper>
  );
};

export default Interaction;
