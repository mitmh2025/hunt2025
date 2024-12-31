import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import { defaultShadow, getRelativeSizeCss } from "../constants";

type Status = {
  text: string;
  color?: string;
  crossedOff?: boolean;
  rotation?: number;
};

type SuspectProps = {
  name: string;
  title: string;
  photoUrl: string;
  photoAlt: string;
  x: number;
  y: number;
  rotation?: number;
  status: Status;
  status2?: Status;
  status3?: Status;
  secret?: ReactNode;
};

const Card = styled.div`
  position: absolute;
  background-color: var(--white);
  width: ${getRelativeSizeCss(383)};
  height: ${getRelativeSizeCss(460)};
  color: var(--black);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: ${defaultShadow};

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
    top: ${getRelativeSizeCss(140)};
    left: 0;
  }

  .third-status {
    font-size: ${getRelativeSizeCss(60)};
    top: ${getRelativeSizeCss(80)};
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
  status2,
  status3,
  photoUrl,
  photoAlt,
  secret,
}: SuspectProps) => {
  return (
    <Card
      style={{
        top: getRelativeSizeCss(y),
        left: getRelativeSizeCss(x),
        transform: `rotate(${rotation ?? 0}deg)`,
      }}
    >
      <img src={photoUrl} alt={photoAlt} />
      <div className="label">
        <h4>{name}</h4>
        <h5>{title}</h5>
      </div>
      <span
        className={`status main-status ${status.crossedOff ? "crossed-out" : ""}`}
        style={{ color: status.color ?? "var(--black)" }}
      >
        {"\u00A0"}
        {status.text}
        {"\u00A0"}
      </span>
      {status2 && (
        <span
          className={`status second-status ${status2.crossedOff ? "crossed-out" : ""}`}
          style={{
            color: status2.color ?? "var(--black)",
            transform: `rotate(${status2.rotation ?? 0}deg)`,
          }}
        >
          {"\u00A0"}
          {status2.text}
          {"\u00A0"}
        </span>
      )}
      {status3 && (
        <span
          className={`status third-status ${status3.crossedOff ? "crossed-out" : ""}`}
          style={{
            color: status3.color ?? "var(--black)",
            transform: `rotate(${status3.rotation ?? 0}deg)`,
          }}
        >
          {"\u00A0"}
          {status3.text}
          {"\u00A0"}
        </span>
      )}
      {secret}
    </Card>
  );
};

export default SuspectCard;
