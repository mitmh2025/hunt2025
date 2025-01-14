import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import { type LockState, PuzzleIcon } from "./PuzzleLink";

type TooltipProps = {
  title: string;
  answer?: string;
  desc?: string;
  lockState: LockState;
  children?: React.ReactNode;
  innerRef?: (node: HTMLElement | null) => void;
  style?: CSSProperties;
};

export const Tooltip = styled.div`
  position: absolute;
  left: 0.25rem;
  top: -2.25rem;
  font-size: 1rem;
  text-align: center;
  line-height: 1.25;
  color: var(--black);
  background-color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  visibility: hidden;
  width: max-content;
  max-width: 80vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const PuzzleTooltip = styled(Tooltip)`
  .name {
    display: flex;
    align-items: flex-start;
    gap: 0.25rem;
    text-align: left;

    .puzzle-link-status-icon {
      margin-top: 2px;
    }
  }

  .answer {
    font-weight: bold;
    font-family: "Roboto Mono", monospace;
  }

  .desc {
    color: var(--gray-700);
    font-style: italic;
    font-weight: 300;
  }
`;

export const PuzzleTooltipComponent = ({
  lockState,
  title,
  answer,
  desc,
  children,
  style = {},
  innerRef,
}: TooltipProps) => {
  return (
    <PuzzleTooltip className="tooltip" ref={innerRef} style={style}>
      {children}
      <span className="name">
        <PuzzleIcon lockState={lockState} answer={answer} size={16} />
        <span>{title}</span>
      </span>
      {!answer && desc && <span className="desc">{desc}</span>}
      {answer ? <span className="answer">{answer}</span> : undefined}
    </PuzzleTooltip>
  );
};
