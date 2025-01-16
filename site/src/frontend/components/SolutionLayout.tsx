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
  }
  tbody tr td:nth-child(3) {
    text-align: right;
  }
`;

const SolutionHintTableRow = ({ hint }: { hint: Hint }) => {
  // Post-hunt: change back to true
  const [revealed, setReveal] = useState<boolean>(true);
  const onClick = useCallback(() => {
    setReveal(true);
  }, []);

  function handleCopy(evt: React.MouseEvent) {
    evt.preventDefault();

    navigator.clipboard.writeText(hint.nudge).catch((e: unknown) => {
      console.error(e);
      alert("Failed to copy hint to clipboard");
    });
  }

  return (
    <SpoileredRow $revealed={revealed} onClick={onClick}>
      <td>{hint.order}</td>
      <td>{hint.description}</td>
      <td>{hint.nudge}</td>
      <td>
        <button type="button" onClick={handleCopy}>
          📋
        </button>
      </td>
    </SpoileredRow>
  );
};

const SolutionHintTableElem = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid black;
  }
`;

const SolutionHintTable = ({ hints }: { hints: Hint[] }) => {
  if (hints.length > 0) {
    // Post hunt: default to closed
    return (
      <SpacedDetails open>
        <summary>Hints</summary>
        <SolutionHintTableElem>
          <thead>
            <tr>
              <th>Order</th>
              <th>Description</th>
              <th>Nudge</th>
              <th>Copy</th>
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
  reply: string;
  providesSolveReward?: boolean;
}) => {
  // Post-hunt: change back to false
  const [revealed, setRevealed] = useState<boolean>(true);
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
    // Post hunt: default to closed
    return (
      <SpacedDetails open>
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
              return (
                <Fragment key={cannedResponse.guess.join(",")}>
                  {cannedResponse.guess.map((guess) => {
                    return (
                      <SolutionCannedResponseRow
                        key={guess}
                        guess={guess}
                        reply={cannedResponse.reply}
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
