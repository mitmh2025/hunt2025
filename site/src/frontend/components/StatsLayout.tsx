import { DateTime, Duration } from "luxon";
import React, { ForwardedRef, forwardRef } from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "./StyledUI";

export const StyledPuzzleStatsTable = styled.table`
  border-collapse: collapse;
  position: relative;

  thead {
    position: sticky;
    top: 0;
    background-color: var(--black);
  }

  th {
    box-shadow: inset 0 -3px var(--gray-500);
    margin-bottom: 0.5rem;
  }

  th,
  td {
    padding: 0.5rem 1rem;
    text-align: left;
  }

  tr:nth-child(even) td {
    background-color: var(--gray-800);
  }

  & tr:has(td:hover) td {
    background-color: var(--gold-800);
  }
`;

export const NoWrapCell = styled.td`
  white-space: nowrap;
`;

export const PuzzleTeamStatsTable = forwardRef(function PuzzleTeamStatsTable(
  {
    purchasable,
    teamStats,
  }: {
    purchasable: boolean;
    teamStats: {
      teamName: string;
      guessCount: number;
      unlockTime: DateTime;
      solveTime: DateTime;
      timeToSolve: Duration;
      purchased?: boolean;
    }[];
  },
  ref: ForwardedRef<HTMLTableElement>,
) {
  return (
    <StyledPuzzleStatsTable className="sortable" ref={ref}>
      <thead>
        <tr>
          <th>Team</th>
          <th>Total Guesses</th>
          <th>Unlock Time</th>
          <th>Time to Solve</th>
          <th>Solve Time</th>
          {purchasable && <th>Purchased?</th>}
        </tr>
      </thead>
      <tbody>
        {teamStats.map((team) => {
          return (
            <tr key={team.teamName}>
              <td>{team.teamName}</td>
              <td>{team.guessCount}</td>
              <NoWrapCell sorttable_customkey={team.unlockTime.toMillis()}>
                {team.unlockTime.toFormat("EEE, MMM d, TTT")}
              </NoWrapCell>
              <NoWrapCell sorttable_customkey={team.timeToSolve.toMillis()}>
                {team.timeToSolve
                  .set({ milliseconds: 0 })
                  .rescale()
                  .toHuman({ unitDisplay: "short" })}
              </NoWrapCell>
              <NoWrapCell sorttable_customkey={team.solveTime.toMillis()}>
                {team.solveTime.toFormat("EEE, MMM d, TTT")}
              </NoWrapCell>
              {purchasable && <td>{team.purchased ? "✅" : "❌"}</td>}
            </tr>
          );
        })}
      </tbody>
    </StyledPuzzleStatsTable>
  );
});

export const PuzzleAnswerStatsTable = forwardRef(
  function PuzzleAnswerStatsTable(
    {
      answerStats,
      answerResults,
    }: {
      answerStats: { answer: string; count: number }[];
      answerResults: Map<string, "correct" | "incorrect" | "other">;
    },
    ref: ForwardedRef<HTMLTableElement>,
  ) {
    return (
      <StyledPuzzleStatsTable className="sortable" ref={ref}>
        <thead>
          <tr>
            <th>Answer</th>
            <th>Submission Count</th>
          </tr>
        </thead>
        <tbody>
          {answerStats.map((answer) => {
            const answerResult = answerResults.get(answer.answer);
            let answerEmoji;
            switch (answerResult) {
              case "correct":
                answerEmoji = "✅";
                break;
              case "incorrect":
                answerEmoji = "❌";
                break;
              case "other":
                answerEmoji = "⚠️";
                break;
              default:
                answerEmoji = "❓";
                break;
            }
            const AnswerComponent =
              answerResult === "correct" ? PuzzleAnswer : Mono;

            return (
              <tr key={answer.answer}>
                <td>
                  {answerEmoji}{" "}
                  <AnswerComponent style={{ wordBreak: "break-all" }}>
                    {answer.answer}
                  </AnswerComponent>
                </td>
                <td>{answer.count}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledPuzzleStatsTable>
    );
  },
);
