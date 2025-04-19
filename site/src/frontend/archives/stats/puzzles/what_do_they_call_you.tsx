import { ChartOptions, TooltipItem } from "chart.js";
import { type Options } from "csv-parse";
import { DateTime } from "luxon";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import canonicalizeInput from "../../../../../lib/canonicalizeInput";
import { PuzzleStatsTable } from "../../../components/StatsLayout";
import { ErrorText, Mono } from "../../../components/StyledUI";
import { FirstPerson, type Person } from "../../../puzzles/new-ketchup/data";
import Loading from "../Loading";
import { HuntEnd, HuntStart } from "../activityLog";
import whatDoTheyCallYouLogUrl from "../assets/what_do_they_call_you_log.csv";
import {
  Chart,
  TimeAxisOptions,
  ZoomConfig,
  generateTruncatedTick,
} from "../charts";
import useCSV from "../useCSV";

/*
  The SQL to generate what_do_they_call_you.csv was a bit of a doozy, because
  for speech events I wanted to capture both the current challenger and whether
  or not they were successful. Neither of those is materialized in
  puzzle_state_log (and even worse, the current challenger doesn't always speak
  before the first time you try to speak to them - e.g. with ELENA), so I had to
  join the log against itself to see near past and future events:

WITH team_names AS (
  SELECT team_id,
    data->>'name' AS team_name
  FROM team_registration_log l
  WHERE id = (
      SELECT id
      FROM team_registration_log
      WHERE team_id = l.team_id
        AND data->>'name' IS NOT NULL
        AND timestamp < timestamp with time zone '2025-01-17 12:00 America/New_York'
      ORDER BY timestamp DESC
      LIMIT 1
    )
), team_name_log AS (
  SELECT id,
    team_id,
    timestamp,
    'team_name_changed' AS type,
    data->>'name' AS current_team_name,
    NULL AS challenger,
    NULL::boolean AS success
  FROM team_registration_log l
  WHERE data->>'name' IS NOT NULL
),
filtered_puzzle_log AS (
  SELECT id,
    team_id,
    timestamp,
    (data->>'isYou')::boolean AS is_you,
    data->>'speaker' AS speaker,
    data->>'line' LIKE '%<hr />%' AS is_hr
  FROM puzzle_state_log
  WHERE slug = 'what_do_they_call_you'
),
puzzle_speech_log AS (
  SELECT l.id,
    l.team_id,
    l.timestamp,
    'spoke' AS type,
    l.speaker AS current_team_name,
    COALESCE(
      last_challenge_speech.speaker,
      next_challenge_speech.speaker,
      'IULIUS'
    ) AS challenger,
    next_success.id IS NOT NULL
    AND (
      next_speech.id IS NULL
      OR next_speech.id > next_success.id
    ) AS success
  FROM filtered_puzzle_log l
    LEFT JOIN filtered_puzzle_log last_success ON last_success.id = (
      SELECT id
      FROM filtered_puzzle_log c
      WHERE c.team_id = l.team_id
        AND c.id < l.id
        AND c.is_hr
      ORDER BY c.id DESC
      LIMIT 1
    )
    LEFT JOIN filtered_puzzle_log next_success ON next_success.id = (
      SELECT id
      FROM filtered_puzzle_log n
      WHERE n.team_id = l.team_id
        AND n.id > l.id
        AND n.is_hr
      ORDER BY n.id ASC
      LIMIT 1
    )
    LEFT JOIN filtered_puzzle_log last_challenge_speech ON last_challenge_speech.id = (
      SELECT id
      FROM filtered_puzzle_log c
      WHERE c.team_id = l.team_id
        AND c.id < l.id
        AND c.id > last_success.id
        AND c.speaker IS NOT NULL
        AND NOT c.is_you
      ORDER BY c.id DESC
      LIMIT 1
    )
    LEFT JOIN filtered_puzzle_log next_challenge_speech ON next_challenge_speech.id = (
      SELECT id
      FROM filtered_puzzle_log n
      WHERE n.team_id = l.team_id
        AND n.id > l.id
        AND n.speaker IS NOT NULL
        AND NOT n.is_you
      ORDER BY n.id ASC
      LIMIT 1
    )
    LEFT JOIN filtered_puzzle_log next_speech ON next_speech.id = (
      SELECT id
      FROM filtered_puzzle_log n
      WHERE n.team_id = l.team_id
        AND n.id > l.id
        AND n.is_you
      ORDER BY n.id ASC
      LIMIT 1
    )
  WHERE l.speaker IS NOT NULL
    AND l.is_you
)
SELECT type,
  timestamp AT TIME ZONE 'America/New_York' AS timestamp,
  team_name AS original_team_name,
  current_team_name,
  challenger,
  success
FROM (
    SELECT *
    FROM team_name_log
    UNION ALL
    SELECT *
    FROM puzzle_speech_log
  ) l
  JOIN team_names tn ON tn.team_id = l.team_id
  JOIN teams t on t.id = l.team_id
WHERE t.username NOT LIKE 'dnm-%'
  AND t.username NOT IN ('public', 'public_access')
  AND l.team_id != 69
  AND NOT t.deactivated
  AND timestamp >= TIMESTAMP WITH TIME ZONE '2025-01-17 12:00:00 America/New_York'
  AND timestamp < TIMESTAMP WITH TIME ZONE '2025-01-20 12:45:00 America/New_York'
ORDER BY timestamp,
  l.id

*/

type WhatDoTheyCallYouLogRow = {
  timestamp: DateTime;
  original_team_name: string;
  current_team_name: string;
} & (
  | { type: "team_name_changed" }
  | { type: "spoke"; challenger: string; success: boolean }
);

const WhatDoTheyCallYouParseOptions: Options = {
  columns: true,
  cast: (value, context) => {
    if (context.column === "timestamp") {
      return DateTime.fromSQL(value, { zone: "America/New_York" });
    }
    if (context.column === "success") {
      return value === "t" ? true : value === "f" ? false : value;
    }
    return value;
  },
};

const Spartacus = canonicalizeInput("Spartacus");

const SpartaciPerHourGraph = ({ log }: { log: WhatDoTheyCallYouLogRow[] }) => {
  const data = useMemo(() => {
    const start = HuntStart.startOf("hour");
    const end = HuntEnd.startOf("hour");
    const data: { x: DateTime; y: number }[] = [];
    for (let hour = start; hour <= end; hour = hour.plus({ hours: 1 })) {
      data.push({ x: hour, y: 0 });
    }

    log.forEach(({ type, timestamp, current_team_name }) => {
      if (type !== "team_name_changed") return;
      if (canonicalizeInput(current_team_name) !== Spartacus) return;
      const pt = data.findLast((pt) => pt.x <= timestamp);
      if (pt) pt.y++;
    });

    return { datasets: [{ data }] };
  }, [log]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    animation: {
      duration: 200,
    },
    scales: {
      x: TimeAxisOptions({ start: log[0]?.timestamp }),
      y: {
        title: {
          text: "Newly Minted Spartaci",
          display: true,
        },
        min: 0,
      },
    },
    datasets: {
      line: {
        cubicInterpolationMode: "monotone",
      },
    },
    plugins: {
      zoom: ZoomConfig,
    },
    transitions: {
      zoom: {
        animation: {
          duration: 0,
        },
      },
    },
  };

  return (
    <Chart>
      <Line options={options} data={data} />
    </Chart>
  );
};

const TimeToSpartacusGraph = ({ log }: { log: WhatDoTheyCallYouLogRow[] }) => {
  const data = useMemo(() => {
    const counts = log.reduce<Map<string, number>>((acc, row) => {
      if (row.type !== "spoke") return acc;
      const { original_team_name, challenger, success } = row;
      if (success) return acc;
      if (challenger !== "IULIUS") return acc;
      const count = acc.get(original_team_name) ?? 0;
      acc.set(original_team_name, count + 1);
      return acc;
    }, new Map());
    const data = [...counts.entries()]
      .toSorted(([, a], [, b]) => a - b)
      .map(([name, count]) => ({
        x: name,
        y: count,
      }));
    return { datasets: [{ data }] };
  }, [log]);

  const options: ChartOptions<"bar"> = {
    scales: {
      x: {
        type: "category",
        ticks: {
          callback: generateTruncatedTick,
        },
      },
    },
  };

  return (
    <>
      <Chart>
        <Bar options={options} data={data} />
      </Chart>
    </>
  );
};

const MostNameChangesGraph = ({ log }: { log: WhatDoTheyCallYouLogRow[] }) => {
  const data = useMemo(() => {
    const changeCounts = log.reduce<Map<string, number>>(
      (acc, { original_team_name, type }) => {
        if (type !== "team_name_changed") return acc;
        const count = acc.get(original_team_name) ?? 0;
        acc.set(original_team_name, count + 1);
        return acc;
      },
      new Map(),
    );
    const data = [...changeCounts.entries()]
      .toSorted(([, a], [, b]) => b - a)
      .map(([name, count]) => ({
        x: name,
        y: count,
      }))
      .slice(0, 10);

    return { datasets: [{ data }] };
  }, [log]);

  const options: ChartOptions<"bar"> = {
    scales: {
      x: {
        type: "category",
        ticks: {
          callback: generateTruncatedTick,
        },
      },
    },
  };

  return (
    <Chart>
      <Bar options={options} data={data} />
    </Chart>
  );
};

const HardestChallengesGraph = ({
  log,
}: {
  log: WhatDoTheyCallYouLogRow[];
}) => {
  const acceptableAnswers = useMemo(() => {
    const answers = new Map<string, string[]>();
    let person: Person | undefined = FirstPerson;
    while (person !== undefined) {
      answers.set(person.name, person.validAnswers);
      person = person.nextPerson;
    }
    return answers;
  }, []);

  const labelCallback = useCallback(
    (item: TooltipItem<"bar">) => {
      const { x, y } = item.raw as { x: string; y: number };
      const answers = acceptableAnswers.get(x);
      return [
        x,
        ...(answers ? [`Acceptable answers: ${answers.join(", ")}`] : []),
        `Total failed attempts: ${y}`,
      ];
    },
    [acceptableAnswers],
  );

  const data = useMemo(() => {
    const counts = log.reduce<Map<string, number>>((acc, row) => {
      if (row.type !== "spoke") return acc;
      const { challenger, success } = row;
      if (success) return acc;
      const count = acc.get(challenger) ?? 0;
      acc.set(challenger, count + 1);
      return acc;
    }, new Map());
    const data = [...counts.entries()]
      .toSorted(([, a], [, b]) => b - a)
      .map(([name, count]) => ({
        x: name,
        y: count,
      }));
    return { datasets: [{ data }] };
  }, [log]);

  const options: ChartOptions<"bar"> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: labelCallback,
        },
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          callback: generateTruncatedTick,
        },
      },
      y: {
        title: {
          text: "Total Failed Attempts",
          display: true,
        },
      },
    },
  };
  return (
    <Chart>
      <Bar options={options} data={data} />
    </Chart>
  );
};

const MostCommonWrongAnswers = ({
  log,
}: {
  log: WhatDoTheyCallYouLogRow[];
}) => {
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    if (ref.current) {
      sorttable.makeSortable(ref.current);
    }
  }, []);

  const data = useMemo(() => {
    const wrongAnswers = new Map<
      string /* guard */,
      Map<string /* answer */, number>
    >();

    let lastPerson: Person | undefined = undefined;
    let person: Person | undefined = FirstPerson;
    while (person !== undefined) {
      const answers = new Map<string, Set<string>>();
      for (const row of log) {
        if (row.type !== "spoke") continue;
        if (row.success) continue;
        if (row.challenger !== person.name) continue;
        const answer = canonicalizeInput(row.current_team_name);
        if (answer.length === 0) continue;
        if (lastPerson?.validAnswers.includes(answer)) continue;

        const teams = answers.get(answer) ?? new Set();
        teams.add(row.original_team_name);
        answers.set(answer, teams);
      }

      if (answers.size !== 0) {
        wrongAnswers.set(
          person.name,
          new Map([...answers.entries()].map(([k, v]) => [k, v.size])),
        );
      }

      lastPerson = person;
      person = person.nextPerson;
    }

    const data = [...wrongAnswers.entries()]
      .map(([name, answers]) => {
        const sortedAnswers = [...answers.entries()].toSorted(
          ([, a], [, b]) => b - a,
        );
        const highestCount = sortedAnswers[0]?.[1] ?? 0;
        const mostCommonWrong = sortedAnswers
          .filter(([, count]) => count === highestCount)
          .map(([answer]) => answer)
          .toSorted();
        return {
          challenger: name,
          answers: mostCommonWrong,
          count: highestCount,
        };
      })
      .toSorted(({ count: a }, { count: b }) => b - a);

    return data;
  }, [log]);

  return (
    <PuzzleStatsTable className="sortable" ref={ref}>
      <thead>
        <tr>
          <th>Challenger</th>
          <th>Most Common Wrong Answer(s)</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ challenger, answers, count }) => {
          return (
            <tr key={challenger}>
              <td>{challenger}</td>
              <td>
                {answers.map((answer, i) => (
                  <React.Fragment key={answer}>
                    {i !== 0 && <br />}
                    <Mono>{answer}</Mono>
                  </React.Fragment>
                ))}
              </td>
              <td>{count}</td>
            </tr>
          );
        })}
      </tbody>
    </PuzzleStatsTable>
  );
};

const PuzzleStats = () => {
  const { loading, error, data } = useCSV<WhatDoTheyCallYouLogRow>({
    url: whatDoTheyCallYouLogUrl,
    parseOptions: WhatDoTheyCallYouParseOptions,
  });

  if (loading) return <Loading />;
  if (error) {
    return (
      <ErrorText>
        An error occurred while loading additional statistics: {String(error)}
      </ErrorText>
    );
  }

  return (
    <>
      <p>
        (If you’d like to perform your own analysis on this puzzle, you can
        download the <a href={whatDoTheyCallYouLogUrl}>full log</a> of team name
        changes and interactions with the “Speak” button on the puzzle page. For
        everyone’s sanity, all teams are referred to by their name as of the
        start of Mystery Hunt.)
      </p>

      <h3>Time to Spartacus</h3>
      <p>
        How many times did teams try to speak to IULIUS before realizing they
        needed to change their team name?
      </p>
      <TimeToSpartacusGraph log={data} />

      <h3>Spartaci Per Hour</h3>
      <p>How many teams changed their name to Spartacus each hour?</p>
      <SpartaciPerHourGraph log={data} />

      <h3>Most Name Changes</h3>
      <p>Which teams changed their name the most?</p>
      <MostNameChangesGraph log={data} />

      <h3>Hardest Challengers</h3>
      <p>Which challenger required the most attempts to get past?</p>
      <HardestChallengesGraph log={data} />

      <h3>Most Common Wrong Answers</h3>
      <p>
        What were the most common incorrect team names that teams tried to
        bypass each guard? (We’ve excluded any answer that was valid for the
        immediately preceding guard, as that was a common and less interesting
        error. We’ve also only counted each team once for any given team name.)
      </p>
      <MostCommonWrongAnswers log={data} />
    </>
  );
};

export default PuzzleStats;
