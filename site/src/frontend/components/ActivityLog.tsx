import React, { useEffect } from "react";
import { styled } from "styled-components";
import { type ActivityLogEntry } from "../../../lib/api/client";
import logoIcon from "../../assets/logo-simple.svg";
import { PuzzleIcon } from "./PuzzleLink";
import { darkBgLinkStyles } from "./StyledUI";

export const HuntIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  background-size: contain;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  flex: 0 0 auto;
`;

type ActivityLogEntryDisplay = {
  icon: React.ReactNode;
  description: React.ReactNode;
  showNotification: boolean;
};

function puzzleIsEvent(slug: string): boolean {
  return [
    "making_contact_with_an_informant",
    "tailing_a_lead",
    "navigating_high_society",
    "seeing_the_big_picture",
  ].includes(slug);
}

export function formatActivityLogEntry(
  entry: ActivityLogEntry,
): ActivityLogEntryDisplay | null {
  switch (entry.type) {
    case "currency_adjusted":
      return {
        icon: "🗝️",
        description: (
          <>
            {entry.currency_delta} key
            {entry.currency_delta === 1 ? " was" : "s were"} granted
          </>
        ),
        showNotification: true,
      };
    case "round_unlocked":
      if (
        entry.slug === "endgame" ||
        entry.slug === "events" ||
        entry.slug === "floaters"
      ) {
        return null;
      }

      return {
        icon: <HuntIcon />,
        description: (
          <>
            Unlocked round <a href={`/rounds/${entry.slug}`}>{entry.title}</a>
          </>
        ),
        showNotification: true,
      };
    case "puzzle_unlockable":
      if (puzzleIsEvent(entry.slug)) {
        return null;
      }

      return {
        icon: <PuzzleIcon lockState="unlockable" />,
        description: <>Discovered puzzle {entry.title}</>,
        showNotification: true,
      };
    case "puzzle_unlocked":
      if (puzzleIsEvent(entry.slug)) {
        return {
          icon: "🔎",
          description: (
            <>
              Event <a href={`/puzzles/${entry.slug}`}>{entry.title}</a> is now
              accepting solutions
            </>
          ),
          showNotification: true,
        };
      } else {
        return {
          icon: <PuzzleIcon lockState="unlocked" />,
          description: (
            <>
              Unlocked puzzle{" "}
              <a href={`/puzzles/${entry.slug}`}>{entry.title}</a>
            </>
          ),
          showNotification: true,
        };
      }
    case "puzzle_partially_solved":
      return {
        icon: "🗝️",
        description: (
          <>
            Partially solved puzzle{" "}
            <a href={`/puzzles/${entry.slug}`}>{entry.title}</a> (partial answer{" "}
            <code>{entry.partial}</code>)
          </>
        ),
        showNotification: true,
      };
    case "puzzle_solved":
      if (puzzleIsEvent(entry.slug)) {
        return {
          icon: "🔎",
          description: (
            <>
              Completed event <a href="/rounds/events">{entry.title}</a> (answer{" "}
              <code>{entry.answer}</code>) and earned{" "}
              {entry.strong_currency_delta}{" "}
              {entry.strong_currency_delta === 1 ? "clue" : "clues"}
            </>
          ),
          showNotification: true,
        };
      } else {
        return {
          icon: <PuzzleIcon lockState="unlocked" answer={entry.answer} />,
          description: (
            <>
              Solved puzzle <a href={`/puzzles/${entry.slug}`}>{entry.title}</a>{" "}
              (answer <code>{entry.answer}</code>)
            </>
          ),
          showNotification: true,
        };
      }
    case "interaction_unlocked":
      return {
        icon: <HuntIcon />,
        description: (
          <>
            Unlocked interaction{" "}
            <a href={`/interactions/${entry.slug}`}>{entry.title}</a>
          </>
        ),
        showNotification: !entry.virtual,
      };
    case "interaction_started":
      return {
        icon: <HuntIcon />,
        description: (
          <>
            Started interaction{" "}
            <a href={`/interactions/${entry.slug}`}>{entry.title}</a>
          </>
        ),
        showNotification: false,
      };
    case "interaction_completed":
      return {
        icon: <HuntIcon />,
        description: (
          <>
            Completed interaction{" "}
            <a href={`/interactions/${entry.slug}`}>{entry.title}</a>
          </>
        ),
        showNotification: false,
      };
    case "gate_completed":
      if (!entry.title) {
        return null;
      }

      return {
        icon: "✔️",
        description: entry.title,
        showNotification: entry.show_notification,
      };
    case "rate_limits_reset":
      return {
        icon: "⏰",
        description: (
          <>
            Rate limits reset for puzzle{" "}
            <a href={`/puzzles/${entry.slug}`}>{entry.title}</a>
          </>
        ),
        showNotification: false,
      };
    case "strong_currency_adjusted":
      return {
        icon: "🔎",
        description: (
          <>
            {entry.strong_currency_delta} clue
            {entry.strong_currency_delta === 1 ? " was" : "s were"} granted
          </>
        ),
        showNotification: true,
      };
    case "strong_currency_exchanged":
      return {
        icon: "🔎",
        description: <>Exchanged 1 clue for {entry.currency_delta} keys</>,
        showNotification: true,
      };
    case "puzzle_answer_bought":
      return {
        icon: "🔎",
        description: (
          <>
            Exchanged 1 clue for the answer to puzzle{" "}
            <a href={`/puzzles/${entry.slug}`}>{entry.title}</a>:{" "}
            <code>{entry.answer}</code>
          </>
        ),
        showNotification: true,
      };
    case "erratum_issued":
      return {
        icon: <PuzzleIcon lockState="unlocked" />,
        description: (
          <>
            Erratum issued for puzzle{" "}
            <a href={`/puzzles/${entry.slug}`}>{entry.title}</a>
          </>
        ),
        showNotification: true,
      };
    case "team_hints_unlocked": {
      const availableAt = new Date(entry.hints_available_at);
      const isPast = availableAt.getTime() < Date.now();

      return {
        icon: "💡",
        description: isPast ? (
          <>
            Hints are now available for puzzle{" "}
            <a href={`/puzzles/${entry.slug}`}>{entry.title}</a>.
          </>
        ) : (
          <>
            Hints will become available for puzzle{" "}
            <a href={`/puzzles/${entry.slug}`}>{entry.title}</a> at{" "}
            {new Date(entry.hints_available_at).toLocaleString("en-US", {
              timeZone: "America/New_York",
            })}
          </>
        ),
        showNotification: true,
      };
    }
    case "puzzle_hint_requested":
      return {
        icon: "🛟",
        description: (
          <>
            Requested a hint for puzzle{" "}
            <a href={`/puzzles/${entry.slug}/hints`}>{entry.title}</a>
          </>
        ),
        showNotification: false,
      };
    case "puzzle_hint_responded":
      return {
        icon: "🛟",
        description: (
          <>
            Hint provided for{" "}
            <a href={`/puzzles/${entry.slug}/hints`}>{entry.title}</a>
          </>
        ),
        showNotification: true,
      };
    case "teams_notified":
      return {
        icon: "❗",
        description: <>{entry.message}</>,
        showNotification: true,
      };
  }
}

const ActivityLogItem = ({
  entry,
  resultingCurrencyBalance,
}: {
  entry: ActivityLogEntry;
  resultingCurrencyBalance: number;
}) => {
  const formatted = formatActivityLogEntry(entry);
  if (!formatted) {
    return null;
  }

  const maybeCurrencyText =
    entry.currency_delta !== 0
      ? entry.currency_delta > 0
        ? `+${entry.currency_delta}`
        : `${entry.currency_delta}`
      : undefined;

  const timestamp = new Date(entry.timestamp);
  const formattedTimestamp = timestamp.toLocaleString();

  return (
    <tr className={entry.type}>
      <td>{formattedTimestamp}</td>
      <td>{formatted.icon}</td>
      <td>{formatted.description}</td>
      <td>{maybeCurrencyText}</td>
      <td>{resultingCurrencyBalance}</td>
    </tr>
  );
};

const ActivityLogTable = styled.table`
  padding: 32px;
  border: 1px solid white;
  border-collapse: collapse;
  table-layout: fixed;

  a {
    ${darkBgLinkStyles}
  }

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

  th:first-child {
    width: 200px;
  }

  th:nth-child(3),
  th:nth-child(4) {
    width: 100px;
  }

  tbody tr td:nth-child(4),
  tbody tr td:nth-child(5) {
    text-align: right;
  }

  .round_unlocked {
    background-color: var(--teal-800);
  }

  /* .puzzle_unlocked {
    background-color: #2d2405;
  } */

  .puzzle_solved {
    background-color: var(--teal-500);
  }

  .puzzle_partially_solved {
    background-color: var(--teal-700);
  }

  .gate_completed {
    background-color: var(--purple-900);
  }
`;

const ActivityLog = ({ log }: { log: ActivityLogEntry[] }) => {
  const [sortDesc, setSortDesc] = React.useState(true);

  useEffect(() => {
    if (window.localStorage.getItem("activityLogSortDesc") === "false") {
      setSortDesc(false);
    }
  }, []);

  const lastLogLength = React.useRef(log.length);
  useEffect(() => {
    if (
      !sortDesc &&
      log.length > lastLogLength.current &&
      window.scrollY + window.innerHeight > document.body.scrollHeight - 250
    ) {
      // Scroll top bottom automatically if we're near the bottom, sorting ascending,
      // and new logs are added.
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
    lastLogLength.current = log.length;
  }, [log, sortDesc]);

  function toggleSort() {
    setSortDesc(!sortDesc);
    window.localStorage.setItem("activityLogSortDesc", String(!sortDesc));
  }

  if (log.length === 0) {
    return <div>No activity yet.</div>;
  }

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

  if (sortDesc) {
    rows.reverse();
  }

  return (
    <ActivityLogTable>
      <thead>
        <tr>
          <th onClick={toggleSort} role="button" style={{ cursor: "pointer" }}>
            Time
            {sortDesc ? " ⬇️" : " ⬆️"}
          </th>
          <th colSpan={2}>Event</th>
          <th>🗝️ change</th>
          <th>🗝️ total</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </ActivityLogTable>
  );
};

export default ActivityLog;
