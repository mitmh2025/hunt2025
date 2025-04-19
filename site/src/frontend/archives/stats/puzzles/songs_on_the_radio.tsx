import { ChartOptions, Legend } from "chart.js";
import { type Options } from "csv-parse";
import { DateTime, Duration } from "luxon";
import React, { useMemo } from "react";
import { Bar, Scatter } from "react-chartjs-2";
import { MI, Math as MathML } from "../../../components/MathML";
import { ErrorText, Mono } from "../../../components/StyledUI";
import Loading from "../Loading";
import { ActivityLogRow, useActivityLog } from "../activityLog";
import songsLogCsvUrl from "../assets/songs_on_the_radio_log.csv";
import { Chart, generateTruncatedTick } from "../charts";
import useCSV from "../useCSV";

/*
  Generating songs_on_the_radio_stats.csv turned out to require a handful of
  intermediate data sources due to the massive size of ThingsBoard's tables (and
  the poor indexing, at least for this likely unintended use case).

  First, hunt2025_teams was created from the following SQL query (which needed
  to be copied over stdin due to hunt2025 and thingsboard being separate
  databases):

SELECT team_id,
  data->'name' AS team_name
FROM team_registration_log l
  JOIN teams t ON l.team_id = t.id
WHERE l.id = (
    SELECT id
    FROM team_registration_log
    WHERE team_id = l.team_id
      AND data->>'name' IS NOT NULL
      AND timestamp < timestamp with time zone '2025-01-17 12:00 America/New_York'
    ORDER BY timestamp DESC
    LIMIT 1
  )
  AND t.username NOT LIKE 'dnm-%'
  AND t.username NOT IN ('public', 'public_access')
  AND l.team_id != 69
  AND NOT t.deactivated

  Then to track radios which were reassigned during Hunt due to magic smoke
  failures,

DROP TABLE IF EXISTS hunt2025_reassigned_teams;
CREATE TABLE hunt2025_reassigned_teams (device_label VARCHAR, team_id INTEGER);
INSERT INTO hunt2025_reassigned_teams (device_label, team_id)
VALUES ('0100', 126),
  ('0046', 8),
  ('0088', 72),
  ('0049', 51);

  Next, to pre-filter the telemetry data,

CREATE MATERIALIZED VIEW hunt2025_songs_on_the_radio_events AS
SELECT COALESCE(hunt2025_teams.team_name, reassigned_team.team_name) AS team_name,
  keys.key AS key,
  ts,
  bool_v,
  str_v,
  long_v,
  dbl_v
FROM ts_kv_2025_01 kv
  JOIN key_dictionary keys ON kv.key = keys.key_id
  JOIN device ON kv.entity_id = device.id
  JOIN customer ON device.customer_id = customer.id
  LEFT JOIN hunt2025_teams ON ((customer.additional_info)::json->>'teamId')::NUMERIC = hunt2025_teams.id
  LEFT JOIN hunt2025_reassigned_teams reassigned ON device.label = reassigned.device_label
  LEFT JOIN hunt2025_teams reassigned_team ON reassigned.team_id = reassigned_team.id
WHERE keys.key LIKE 'pi_%'
  AND ts > EXTRACT(
    EPOCH
    FROM TIMESTAMP WITH TIME ZONE '2025-01-17 12:00:00 America/New_York'
  )::BIGINT * 1000
  AND ts < EXTRACT(
    EPOCH
    FROM TIMESTAMP WITH TIME ZONE '2025-01-20 12:45:00 America/New_York'
  )::BIGINT * 1000;
CREATE UNIQUE INDEX ON hunt2025_songs_on_the_radio_events (team_name, key, ts);

  And finally, to generate the actual stats (which is a slow query, even with
  the precomputation):

WITH events AS (
  SELECT ts,
    team_name,
    CASE
      WHEN key = 'pi_enabled'
      AND bool_v THEN 'station_unlocked'
      WHEN key = 'pi_stage'
      AND long_v > 0 THEN 'stage_' || long_v || '_unlocked'
      WHEN key = 'pi_note_knock'
      AND bool_v THEN 'first_knock'
      WHEN key = 'pi_note_light'
      AND bool_v THEN 'first_light'
      WHEN key = 'pi_note_touch'
      AND bool_v THEN 'first_touch'
      WHEN key = 'pi_note_button'
      AND bool_v THEN 'first_button'
      WHEN key = 'pi_shift_magnet'
      AND bool_v THEN 'first_magnet'
      WHEN key = 'pi_shift_headphone'
      AND bool_v THEN 'first_headphone'
      ELSE NULL
    END AS type
  FROM hunt2025_songs_on_the_radio_events
  ORDER BY team_name,
    type,
    ts
),
earliest_events AS (
  SELECT DISTINCT ON (team_name, type) *
  FROM events
  WHERE type IS NOT NULL
  ORDER BY team_name,
    type,
    ts
)
SELECT TO_TIMESTAMP(e.ts / 1000.0) AT TIME ZONE 'America/New_York' AS timestamp,
  e.team_name,
  type,
  play_time.long_v AS total_play_time
FROM earliest_events e
  LEFT JOIN hunt2025_songs_on_the_radio_events play_time ON e.team_name = play_time.team_name
  AND play_time.key = 'pi_total_play_time'
  AND play_time.ts >= e.ts
WHERE NOT EXISTS (
    SELECT 1
    FROM hunt2025_songs_on_the_radio_events p2
    WHERE p2.team_name = e.team_name
      AND p2.key = 'pi_total_play_time'
      AND p2.ts >= e.ts
      AND p2.ts < play_time.ts
  )
ORDER BY timestamp;
*/

type SongsLogRow = {
  timestamp: DateTime;
  team_name: string;
  type:
    | "station_unlocked"
    | `stage_${1 | 2 | 3 | 4 | 5}_unlocked`
    | `first_${"knock" | "light" | "touch" | "button" | "magnet" | "headphone"}`;
  total_play_time?: Duration;
};

type SongsStatsRow = {
  team_name: string;
  activation_timestamp?: DateTime;
  stage_1_unlock_timestamp?: DateTime;
  stage_2_unlock_timestamp?: DateTime;
  stage_3_unlock_timestamp?: DateTime;
  stage_4_unlock_timestamp?: DateTime;
  stage_5_unlock_timestamp?: DateTime;
  stage_1_unlock_total_play_time?: Duration;
  stage_2_unlock_total_play_time?: Duration;
  stage_3_unlock_total_play_time?: Duration;
  stage_4_unlock_total_play_time?: Duration;
  stage_5_unlock_total_play_time?: Duration;
};

const SongsLogParseOptions: Options = {
  columns: true,
  cast: (value, context) => {
    if (context.column === "timestamp") {
      return DateTime.fromSQL(value, { zone: "America/New_York" });
    }
    if (context.column === "total_play_time") {
      return value !== ""
        ? Duration.fromObject({ seconds: parseFloat(value) })
        : undefined;
    }
    return value;
  },
};

const FastestCrissCrossGraph = ({
  songsLog,
  activityLog,
}: {
  songsLog: SongsLogRow[];
  activityLog: ActivityLogRow[];
}) => {
  const data = useMemo(() => {
    const teamStats = new Map<
      string,
      { unlockTime?: DateTime; activationTime?: DateTime }
    >();
    activityLog.forEach((row) => {
      if (row.type !== "puzzle_unlocked") return;
      if (row.slug !== "songs_on_the_radio") return;
      const teamName = row.team_name;
      const team = teamStats.get(teamName) ?? {};
      team.unlockTime = row.timestamp;
      teamStats.set(teamName, team);
    });
    songsLog.forEach(({ timestamp, team_name, type }) => {
      if (type !== "station_unlocked") return;
      const team = teamStats.get(team_name) ?? {};
      team.activationTime = timestamp;
      teamStats.set(team_name, team);
    });

    const data = [...teamStats.entries()]
      .flatMap(([teamName, { unlockTime, activationTime }]) => {
        if (!unlockTime || !activationTime) return [];

        const timeToActivate = activationTime
          .diff(unlockTime)
          .rescale()
          .as("minutes");

        return {
          x: teamName,
          y: timeToActivate,
        };
      })
      .toSorted(({ y: a }, { y: b }) => a - b)
      .slice(0, 20);

    return { datasets: [{ data }] };
  }, [songsLog, activityLog]);

  const options: ChartOptions<"bar"> = {
    scales: {
      x: {
        type: "category",
        ticks: {
          callback: generateTruncatedTick,
        },
      },
      y: {
        title: {
          text: "Time to Activate (minutes)",
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

const BestMusiciansGraph = ({
  songsStats,
}: {
  songsStats: SongsStatsRow[];
}) => {
  const data = useMemo(() => {
    const data = songsStats
      .flatMap((row) => {
        if (
          !row.stage_5_unlock_total_play_time ||
          row.stage_5_unlock_total_play_time.as("milliseconds") === 0
        )
          return [];

        return {
          ...row,
          stage_0: row.stage_1_unlock_total_play_time?.as("minutes"),
          stage_1: row.stage_2_unlock_total_play_time?.as("minutes"),
          stage_2: row.stage_3_unlock_total_play_time?.as("minutes"),
          stage_3: row.stage_4_unlock_total_play_time?.as("minutes"),
          stage_4: row.stage_5_unlock_total_play_time.as("minutes"),
        };
      })
      .toSorted(({ stage_4: a }, { stage_4: b }) => a - b)
      .slice(0, 20);

    return {
      datasets: [
        {
          label: "Mary Had a Little Lamb",
          data,
          parsing: {
            xAxisKey: "stage_0",
            yAxisKey: "team_name",
          },
        },
        {
          label: "Never Gonna Give You Up",
          data,
          parsing: {
            xAxisKey: "stage_1",
            yAxisKey: "team_name",
          },
        },
        {
          label: "Somewhere Over the Rainbow",
          data,
          parsing: {
            xAxisKey: "stage_2",
            yAxisKey: "team_name",
          },
        },
        {
          label: "Hot to Go",
          data,
          parsing: {
            xAxisKey: "stage_3",
            yAxisKey: "team_name",
          },
        },
        {
          label: "The Final Countdown",
          data,
          parsing: {
            xAxisKey: "stage_4",
            yAxisKey: "team_name",
          },
        },
      ],
    };
  }, [songsStats]);

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    aspectRatio: 4 / 3,
    animation: {
      duration: 200,
    },
    datasets: {
      scatter: {
        pointRadius: 8,
        pointHoverRadius: 12,
      },
    },
    indexAxis: "y",
    scales: {
      x: {
        title: {
          text: "Minutes",
          display: true,
        },
      },
      y: {
        labels: data.datasets[0]?.data.map(({ team_name }) => team_name),
        type: "category",
        ticks: {
          callback: generateTruncatedTick,
        },
      },
    },
  };

  return (
    <Chart $aspectRatio={0.75}>
      <Scatter plugins={[Legend]} options={options} data={data} />
    </Chart>
  );
};

const AdaptiveDifficultyGraph = ({
  songsStats,
}: {
  songsStats: SongsStatsRow[];
}) => {
  const data = useMemo(() => {
    const counts = songsStats.reduce(
      (acc, row) => {
        if (
          !row.stage_1_unlock_timestamp ||
          !row.stage_4_unlock_timestamp ||
          !row.stage_5_unlock_timestamp
        )
          return acc;

        const adapted =
          !row.stage_2_unlock_timestamp && !row.stage_3_unlock_timestamp;

        acc[adapted ? "adapted" : "not_adapted"]++;
        return acc;
      },
      { adapted: 0, not_adapted: 0 },
    );
    return {
      datasets: [
        {
          data: [
            { y: "Not Adapted", x: counts.not_adapted },
            { y: "Adapted", x: counts.adapted },
          ],
        },
      ],
    };
  }, [songsStats]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    aspectRatio: 4,
    animation: {
      duration: 200,
    },
    indexAxis: "y",
    scales: {
      x: {
        title: {
          text: "Number of Teams",
          display: true,
        },
      },
      y: {
        type: "category",
      },
    },
  };

  return (
    <Chart $aspectRatio={0.25}>
      <Bar options={options} data={data} />
    </Chart>
  );
};

const FirstInteractionGraph = ({ songsLog }: { songsLog: SongsLogRow[] }) => {
  const data = useMemo(() => {
    const byTeam = songsLog.reduce<Map<string, string>>(
      (acc, { team_name, type }) => {
        if (!type.startsWith("first_")) return acc;
        if (type === "first_headphone" || type === "first_magnet") return acc;
        const first = acc.get(team_name);
        if (first) return acc;
        acc.set(team_name, type);
        return acc;
      },
      new Map(),
    );
    const byType = [...byTeam.values()].reduce<Record<string, number>>(
      (acc, type) => {
        acc[type] = (acc[type] ?? 0) + 1;
        return acc;
      },
      {},
    );

    return {
      datasets: [
        {
          data: Object.entries(byType)
            .toSorted(([, a], [, b]) => b - a)
            .map(([type, count]) => {
              const label = type.replace("first_", "");
              return {
                y: `${label.charAt(0).toUpperCase()}${label.slice(1)}`,
                x: count,
              };
            }),
        },
      ],
    };
  }, [songsLog]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    animation: {
      duration: 200,
    },
    indexAxis: "y",
    scales: {
      x: {
        title: {
          text: "Number of Teams",
          display: true,
        },
      },
      y: {
        type: "category",
      },
    },
  };

  return (
    <Chart>
      <Bar options={options} data={data} />
    </Chart>
  );
};

const PuzzleStats = () => {
  const {
    loading: statsLoading,
    error: statsError,
    data: songsLog,
  } = useCSV<SongsLogRow>({
    url: songsLogCsvUrl,
    parseOptions: SongsLogParseOptions,
  });
  const {
    loading: activityLogLoading,
    error: activityLogError,
    data: activityLog,
  } = useActivityLog();

  const songsStats: SongsStatsRow[] = useMemo(() => {
    const teamStats = new Map<string, Omit<SongsStatsRow, "team_name">>();
    songsLog.forEach(({ timestamp, team_name, type, total_play_time }) => {
      const stats = teamStats.get(team_name) ?? {};
      switch (type) {
        case "station_unlocked":
          stats.activation_timestamp = timestamp;
          break;
        case "stage_1_unlocked":
          stats.stage_1_unlock_timestamp = timestamp;
          stats.stage_1_unlock_total_play_time = total_play_time;
          break;
        case "stage_2_unlocked":
          stats.stage_2_unlock_timestamp = timestamp;
          stats.stage_2_unlock_total_play_time = total_play_time;
          break;
        case "stage_3_unlocked":
          stats.stage_3_unlock_timestamp = timestamp;
          stats.stage_3_unlock_total_play_time = total_play_time;
          break;
        case "stage_4_unlocked":
          stats.stage_4_unlock_timestamp = timestamp;
          stats.stage_4_unlock_total_play_time = total_play_time;
          break;
        case "stage_5_unlocked":
          stats.stage_5_unlock_timestamp = timestamp;
          stats.stage_5_unlock_total_play_time = total_play_time;
          break;
        default:
          break;
      }
      teamStats.set(team_name, stats);
    });

    return [...teamStats.entries()].map(([team_name, stats]) => ({
      team_name,
      ...stats,
    }));
  }, [songsLog]);

  const loading = statsLoading || activityLogLoading;
  const error = statsError || activityLogError;

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
        These bonus statistics are based on telemetry data that the{" "}
        <a href="/2025/extras/radio">Radios</a> reported back to our central
        infrastructure. There are many reasons these stats could be inaccurate:
        the radio may not have been able to connect to our servers at critical
        moments, or we may have improperly tracked radios that were reassigned
        due to failure during Mystery Hunt weekend. This goes double for any log
        entries claiming to the the first time a team interacted with a given
        input (button, touch, etc.) on the radio.
      </p>

      <p>
        With those caveats, if you’d like to explore the raw data yourself, you
        can download the <a href={songsLogCsvUrl}>full log of stats</a>.
      </p>

      <h3>Fastest Criss Crossers</h3>
      <p>
        How much time elapsed between unlocking the puzzle and activating
        Station{" "}
        <MathML>
          <MI>π</MI>
        </MathML>{" "}
        by <Mono>KNOCK[ING] THREE TIMES</Mono>?
      </p>
      <FastestCrissCrossGraph activityLog={activityLog} songsLog={songsLog} />

      <h3>Quickest Musical Studies</h3>
      <p>
        How long did it take teams to complete each song? For this graph, we’re
        using our “total play time” metric, which attempted to track only time
        spent actively engaging with the radio, so, e.g., if a team walked away
        from the radio for an hour, that idle time would not count towards this
        chart.
      </p>
      <BestMusiciansGraph songsStats={songsStats} />

      <h3>Adaptive Difficulty</h3>
      <p>
        For this puzzle, we experimented with adaptive difficulty. In
        testsolving, we found that the challenge portion of the puzzle could
        become quite frustrating if teams were struggling with the musical
        aspects. To mitigate this, if teams took more than 40 minutes (of active
        interaction) to complete the first two songs, the radio delivered an
        abbreviated set of challenges. This graph shows how many teams (that
        successfully completed the puzzle) saw each version.
      </p>
      <AdaptiveDifficultyGraph songsStats={songsStats} />

      <h3>First Interaction</h3>
      <p>
        Which of the notes on the radio did teams discover first? (As a
        reminder, this data should be treated with extreme skepticism)
      </p>
      <FirstInteractionGraph songsLog={songsLog} />
    </>
  );
};

export default PuzzleStats;
