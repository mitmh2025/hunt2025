import React, { Fragment, useCallback, useState } from "react";
import { styled, css } from "styled-components";
import type { CannedResponse, Hint } from "../puzzles/types";

const SolutionAnswer = styled.h2`
  padding: 0;
  grid-column: 1 / 3;
`;

const SolutionAcknowledgementBlock = styled.div`
  grid-column: 1 / 3;
`;

const SolutionAcknowledgement = styled.h3`
  padding: 0;
`;

const SpacedDetails = styled.details`
  margin-bottom: 1em;
`;

const SpoileredRow = styled.tr<{ $revealed: boolean }>`
  ${({ $revealed }) =>
    $revealed
      ? css`
          color: inherit;
          background-color: transparent;
        `
      : css`
          color: var(--black);
          background-color: var(--black);
        `}
  &:hover {
    color: inherit;
    background-color: transparent;
  }

  td {
    padding: 0.25rem 0.5rem;
  }
`;

const CannedResponseTable = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  td,
  th {
    border: 1px solid black;
    padding: 0.25rem 0.5rem;
  }
  tbody tr td:nth-child(3) {
    text-align: right;
  }
`;

const SolutionHintTableRow = ({ hint }: { hint: Hint }) => {
  const [revealed, setReveal] = useState<boolean>(false);
  const onClick = useCallback(() => {
    setReveal(true);
  }, []);

  return (
    <SpoileredRow $revealed={revealed} onClick={onClick}>
      <td>{hint.order}</td>
      <td>{hint.description}</td>
      <td>{hint.nudge}</td>
    </SpoileredRow>
  );
};

const SolutionHintTableElem = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid black;
    padding: 0.25rem 0.5rem;
  }
`;

const SolutionHintTable = ({ hints }: { hints: Hint[] }) => {
  if (hints.length > 0) {
    return (
      <SpacedDetails>
        <summary>Hints</summary>
        <SolutionHintTableElem>
          <thead>
            <tr>
              <th>Order</th>
              <th>Description</th>
              <th>Nudge</th>
            </tr>
          </thead>
          <tbody>
            {hints.map((hint) => {
              return <SolutionHintTableRow key={hint.order} hint={hint} />;
            })}
          </tbody>
        </SolutionHintTableElem>
      </SpacedDetails>
    );
  } else {
    return undefined;
  }
};

const SolutionCannedResponseRow = ({
  guess,
  reply,
  providesSolveReward,
}: {
  guess: string;
  reply: JSX.Element;
  providesSolveReward?: boolean;
}) => {
  const [revealed, setRevealed] = useState<boolean>(false);
  const onClick = useCallback(() => {
    setRevealed(true);
  }, []);
  return (
    <SpoileredRow key={guess} $revealed={revealed} onClick={onClick}>
      <td>{guess}</td>
      <td>{reply}</td>
      <td>{providesSolveReward ? "yes" : "no"}</td>
    </SpoileredRow>
  );
};

const SolutionCannedResponseTable = ({
  cannedResponses,
}: {
  cannedResponses: CannedResponse[];
}) => {
  if (cannedResponses.length > 0) {
    return (
      <SpacedDetails>
        <summary>Canned responses</summary>
        <CannedResponseTable>
          <thead>
            <tr>
              <th>Guess</th>
              <th>Reply</th>
              <th>Provides solve reward?</th>
            </tr>
          </thead>
          <tbody>
            {cannedResponses.map((cannedResponse) => {
              const reply = (
                <>
                  {cannedResponse.reply}
                  {cannedResponse.link && (
                    <a href={cannedResponse.link.href}>
                      {cannedResponse.link.display}
                    </a>
                  )}
                </>
              );
              return (
                <Fragment key={cannedResponse.guess.join(",")}>
                  {cannedResponse.guess.map((guess) => {
                    return (
                      <SolutionCannedResponseRow
                        key={guess}
                        guess={guess}
                        reply={reply}
                        providesSolveReward={cannedResponse.providesSolveReward}
                      />
                    );
                  })}
                </Fragment>
              );
            })}
          </tbody>
        </CannedResponseTable>
      </SpacedDetails>
    );
  } else {
    return undefined;
  }
};

export {
  SolutionAnswer,
  SolutionAcknowledgementBlock,
  SolutionAcknowledgement,
  SolutionHintTable,
  SolutionCannedResponseTable,
};
