import React from "react";
import { styled } from "styled-components";
import { type ActivityLogEntry } from "../../../lib/api/client";
import { PuzzleIcon } from "./PuzzleLink";
import logoIcon from "../../assets/logo-simple.svg";

const HuntIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  background-size: contain;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  flex: 0 0 auto;
`;

const ActivityLogItem = ({
  entry,
  resultingCurrencyBalance,
}: {
  entry: ActivityLogEntry;
  resultingCurrencyBalance: number;
}) => {
  const maybeCurrencyText =
    entry.currency_delta !== 0
      ? entry.currency_delta > 0
        ? `+${entry.currency_delta}`
        : `${entry.currency_delta}`
      : undefined;
  let description = <td />;
  switch (entry.type) {
    case "currency_adjusted":
      description = <td>{entry.currency_delta} currency was granted</td>;
      break;
    case "round_unlocked":
      description = (
        <>
          <td>
            <HuntIcon />
          </td>
          <td>
            Unlocked round <a href={`/rounds/${entry.slug}`}>{entry.title}</a>
          </td>
        </>
      );
      break;
    case "puzzle_unlockable":
      description = (
        <>
          <td>
            <PuzzleIcon lockState="unlockable" />
          </td>
          <td>Discovered puzzle {entry.title}</td>
        </>
      );
      break;
    case "puzzle_unlocked":
      description = (
        <>
          <td>
            <PuzzleIcon lockState="unlocked" />
          </td>
          <td>
            Unlocked puzzle <a href={`/puzzles/${entry.slug}`}>{entry.title}</a>
          </td>
        </>
      );
      break;
    case "puzzle_partially_solved":
      description = (
        <>
          <td></td>
          <td>
            Partially solved puzzle{" "}
            <a href={`/puzzles/${entry.slug}`}>{entry.title}</a> (partial answer{" "}
            <code>{entry.partial}</code>)
          </td>
        </>
      );
      break;
    case "puzzle_solved":
      description = (
        <>
          <td>
            <PuzzleIcon lockState="unlocked" answer={entry.answer} />
          </td>
          <td>
            Solved puzzle <a href={`/puzzles/${entry.slug}`}>{entry.title}</a>{" "}
            (answer <code>{entry.answer}</code>)
          </td>
        </>
      );
      break;
    case "interaction_unlocked":
      description = (
        <>
          <td>
            <HuntIcon />
          </td>
          <td>
            Unlocked interaction{" "}
            <a href={`/interactions/${entry.slug}`}>{entry.title}</a>
          </td>
        </>
      );
      break;
    case "interaction_started":
      description = (
        <>
          <td>
            <HuntIcon />
          </td>
          <td>
            Started interaction{" "}
            <a href={`/interactions/${entry.slug}`}>{entry.title}</a>
          </td>
        </>
      );
      break;
    case "interaction_completed":
      description = (
        <>
          <td>
            <HuntIcon />
          </td>
          <td>
            Completed interaction{" "}
            <a href={`/interactions/${entry.slug}`}>{entry.title}</a>
          </td>
        </>
      );
      break;
    case "gate_completed":
      // Only a subset of gates will assign a title.
      if (entry.title) {
        description = (
          <>
            <td />
            <td>{entry.title}</td>
          </>
        );
      } else {
        return undefined;
      }
      break;
    case "rate_limits_reset":
      description = (
        <>
          <td>⏰</td>
          <td>
            Rate limits reset for puzzle{" "}
            <a href={`/puzzles/${entry.slug}`}>{entry.title}</a>
          </td>
        </>
      );
      break;
  }

  const timestamp = new Date(entry.timestamp);
  const formattedTimestamp = timestamp.toLocaleString();

  return (
    <tr className={entry.type}>
      <td>{formattedTimestamp}</td>
      {description}
      <td>{maybeCurrencyText}</td>
      <td>{resultingCurrencyBalance}</td>
    </tr>
  );
};

const ActivityLogTable = styled.table`
  padding: 32px;
  border: 1px solid white;
  border-collapse: collapse;
  thead th {
    position: sticky;
    top: 0;
    background-color: var(--black);
  }
  th,
  td {
    padding: 8px;
    border: 1px solid white;
    border-collapse: collapse;
  }

  tbody tr:hover td {
    background-color: #333;
  }

  tbody tr td:nth-child(4),
  tbody tr td:nth-child(5) {
    text-align: right;
  }

  .round_unlocked {
    background-color: #03585f;
  }

  .puzzle_unlocked {
    background-color: #113135;
  }

  .puzzle_solved {
    background-color: var(--gold-700);
  }

  .puzzle_partially_solved {
    background-color: var(--gold-900);
  }
`;

const ActivityLog = ({ log }: { log: ActivityLogEntry[] }) => {
  let currencyAccumulator = 0;
  const rows = log.map((entry) => {
    currencyAccumulator += entry.currency_delta;
    return (
      <ActivityLogItem
        key={entry.id}
        entry={entry}
        resultingCurrencyBalance={currencyAccumulator}
      />
    );
  });

  return (
    <ActivityLogTable>
      <thead>
        <tr>
          <th>Time</th>
          <th colSpan={2}>Event</th>
          <th>🍗 change</th>
          <th>🍗 total</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </ActivityLogTable>
  );
};

export default ActivityLog;
