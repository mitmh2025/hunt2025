import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import billie from "../../assets/billie.png";
import { defaultShadow, getRelativeSizeCss } from "../constants";
import { type HubSuspect } from "../types";

const ModalBackdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  // Dim other things currently visible, maybe animate this later?
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BillieSpeechContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const SpeechBubble = styled.div`
  width: 30%;
  padding: ${getRelativeSizeCss(40)};
  margin-right: ${getRelativeSizeCss(100)};
  margin-bottom: ${getRelativeSizeCss(200)};
  position: relative;
  border: ${getRelativeSizeCss(6)} solid #7f7f7f;
  border-radius: ${getRelativeSizeCss(86)};
  background: rgba(255, 255, 255, 0.86);
  outline: ${getRelativeSizeCss(8)} solid rgba(255, 255, 255, 0.86);
  box-shadow: ${getRelativeSizeCss(40)} -${getRelativeSizeCss(40)} ${getRelativeSizeCss(
      30,
    )} rgb(20 34 35 / 20%);
  z-index: 1;

  display: flex;
  align-items: center;
  color: black;
  font-family: "EB Garamond", serif;
  white-space: pre-wrap;
  font-size: ${getRelativeSizeCss(44)};

  &::before {
    content: "";
    position: absolute;
    background: rgba(255, 255, 255, 0.86);
    width: 10%;
    height: ${getRelativeSizeCss(100)};
    left: calc(100% + ${getRelativeSizeCss(14)});

    bottom: ${getRelativeSizeCss(90)};
    clip-path: polygon(0 0, 100% 100%, 0 75%);
  }
`;

const Billie = styled.img`
  width: 15%;
`;

const BillieSpeechOverlay = ({
  children,
  onDismiss,
}: {
  children: React.ReactNode;
  onDismiss: () => void;
}) => {
  return (
    <ModalBackdrop onClick={onDismiss}>
      <BillieSpeechContainer>
        <SpeechBubble>{children}</SpeechBubble>
        <Billie src={billie} alt="Billie" />
      </BillieSpeechContainer>
    </ModalBackdrop>
  );
};

type SuspectProps = {
  name: string;
  title: string;
  photoUrl: string;
  photoAlt: string;
  x: number;
  y: number;
  rotation?: number;
  statusUpdateRotation: number;
  statusUpdateYAdjust?: number;
  status: HubSuspect["status"];
  children: React.ReactNode;
};

const Card = styled.div<{ $statusUpdateYAdjust?: number }>`
  position: absolute;
  background-color: var(--white);
  width: ${getRelativeSizeCss(383)};
  height: ${getRelativeSizeCss(460)};
  color: var(--black);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: ${defaultShadow};
  cursor: pointer;

  img {
    margin: ${getRelativeSizeCss(20)} ${getRelativeSizeCss(20)} 0
      ${getRelativeSizeCss(20)};
    background-color: var(--gray-400);
    opacity: 0.9;
  }

  .crossed-out {
    text-decoration-line: line-through;
    text-decoration-thickness: ${getRelativeSizeCss(8)};
  }

  .status {
    position: absolute;
    font-family: "Rock Salt";
    font-size: ${getRelativeSizeCss(36)};
  }

  .main-status {
    top: ${getRelativeSizeCss(4)};
    left: ${getRelativeSizeCss(6)};
    transform: rotate(-12deg);
  }

  .second-status,
  .third-status {
    width: 100%;
    display: block;
    text-align: center;
  }

  .second-status {
    font-size: ${getRelativeSizeCss(52)};
    top: ${({ $statusUpdateYAdjust }) =>
      getRelativeSizeCss(140 + ($statusUpdateYAdjust ?? 0))};
    left: 0;
  }

  .third-status {
    font-size: ${getRelativeSizeCss(60)};
    top: ${({ $statusUpdateYAdjust }) =>
      getRelativeSizeCss(80 + ($statusUpdateYAdjust ?? 0))};
    left: ${getRelativeSizeCss(6)};
  }

  .label {
    margin-top: ${getRelativeSizeCss(12)};
  }

  h4,
  h5 {
    padding: 0;
    margin: 0;
    text-align: center;
    line-height: 1.1;
    font-family: "Permanent Marker";
    font-size: ${getRelativeSizeCss(34)};
    font-weight: 400;
  }
`;

const SuspectCard = ({
  name,
  title,
  x,
  y,
  rotation,
  status,
  statusUpdateRotation,
  statusUpdateYAdjust,
  photoUrl,
  photoAlt,
  children,
}: SuspectProps) => {
  const [modalShown, setModalShown] = useState(false);
  const showModal = useCallback(() => {
    setModalShown(true);
  }, []);
  const hideModal = useCallback(() => {
    setModalShown(false);
  }, []);

  return (
    <>
      <Card
        style={{
          top: getRelativeSizeCss(y),
          left: getRelativeSizeCss(x),
          transform: `rotate(${rotation ?? 0}deg)`,
        }}
        onClick={showModal}
        $statusUpdateYAdjust={statusUpdateYAdjust}
      >
        <img src={photoUrl} alt={photoAlt} />
        <div className="label">
          <h4>{name}</h4>
          <h5>{title}</h5>
        </div>
        <span
          className={`status main-status ${status.length > 1 ? "crossed-out" : ""}`}
          style={{ color: status[0].color ?? "var(--black)" }}
        >
          {"\u00A0"}
          {status[0].text}
          {"\u00A0"}
        </span>
        {status[1] && (
          <span
            className={`status second-status ${status.length > 2 ? "crossed-out" : ""}`}
            style={{
              color: status[1].color ?? "var(--black)",
              transform: `rotate(${statusUpdateRotation}deg)`,
            }}
          >
            {"\u00A0"}
            {status[1].text}
            {"\u00A0"}
          </span>
        )}
        {status[2] && (
          <span
            className={`status third-status`}
            style={{
              color: status[2].color ?? "var(--black)",
              transform: `rotate(${statusUpdateRotation}deg)`,
            }}
          >
            {"\u00A0"}
            {status[2].text}
            {"\u00A0"}
          </span>
        )}
      </Card>
      {modalShown && (
        <BillieSpeechOverlay onDismiss={hideModal}>
          {children}
        </BillieSpeechOverlay>
      )}
    </>
  );
};

export default SuspectCard;
