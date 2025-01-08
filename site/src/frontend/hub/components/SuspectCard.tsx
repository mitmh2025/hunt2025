import React from "react";
import { styled } from "styled-components";
import { defaultShadow, getRelativeSizeCss } from "../constants";
import { type HubSuspect } from "../types";

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

  img {
    margin: ${getRelativeSizeCss(20)} ${getRelativeSizeCss(20)} 0
      ${getRelativeSizeCss(20)};
    width: ${getRelativeSizeCss(343)};
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
}: SuspectProps) => {
  return (
    <Card
      style={{
        top: getRelativeSizeCss(y),
        left: getRelativeSizeCss(x),
        transform: `rotate(${rotation ?? 0}deg)`,
      }}
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
  );
};

export default SuspectCard;
