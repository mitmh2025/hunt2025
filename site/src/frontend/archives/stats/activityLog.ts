import { type Options } from "csv-parse";
import { DateTime } from "luxon";
import activityLogUrl from "./assets/activity_log.csv";
import useCSV from "./useCSV";

export const HuntStart = DateTime.fromISO("2025-01-17T12:00:00-05:00");
export const HuntEnd = DateTime.fromISO("2025-01-20T12:45:00-05:00");
export const HuntHQClose = DateTime.fromISO("2025-01-19T22:00:00-05:00");

/*

activity_log.csv was generated with the following SQL query:

WITH team_names AS (
  SELECT team_id,
    data->>'name' AS team_name
  FROM team_registration_log l
    JOIN teams t ON l.team_id = t.id
  WHERE t.username NOT LIKE 'dnm-%'
    AND t.username NOT IN ('public', 'public_access')
    AND l.team_id != 69
    AND NOT t.deactivated
    AND l.id = (
      SELECT id
      FROM team_registration_log
      WHERE team_id = l.team_id
        AND data->>'name' IS NOT NULL
        AND timestamp < timestamp with time zone '2025-01-17 12:00 America/New_York'
      ORDER BY timestamp DESC
      LIMIT 1
    )
), expanded_activity_log AS (
  SELECT al.id,
    timestamp,
    type,
    slug,
    data,
    currency_delta,
    strong_currency_delta,
    teams.id AS team_id
  FROM activity_log al
    CROSS JOIN teams
  WHERE al.team_id IS NULL
    OR al.team_id = teams.id
    AND timestamp < TIMESTAMP WITH TIME ZONE '2025-01-20 12:45:00 America/New_York'
),
activity_log_entries AS (
  SELECT id,
    CASE
      type
      WHEN 'team_hints_unlocked' THEN (data->>'hints_available_at')::timestamptz
      ELSE timestamp
    END AT TIME ZONE 'America/New_York' AS timestamp,
    team_name,
    CASE
      type
      WHEN 'strong_currency_adjusted' THEN 'clues_adjusted'
      WHEN 'strong_currency_exchanged' THEN 'clue_exchanged'
      WHEN 'currency_adjusted' THEN 'keys_adjusted'
      WHEN 'team_hints_unlocked' THEN 'puzzle_hints_unlocked'
      WHEN 'gate_completed' THEN CASE
        WHEN slug = 'ptg03' THEN 'ads_unlocked'
        WHEN slug = 'ptg16' THEN 'weather_unlocked'
        WHEN slug IN (
          'isg06',
          'isg07',
          'isg08',
          'isg09',
          'isg10',
          'isg16'
        ) THEN 'illegal_search_unlocked'
      END
      ELSE type
    END,
    CASE
      WHEN type = 'gate_completed' THEN CASE
        slug
        WHEN 'isg06' THEN 'desk_drawer'
        WHEN 'isg07' THEN 'breaker_box'
        WHEN 'isg08' THEN 'combo_safe'
        WHEN 'isg09' THEN 'numeric_lock'
        WHEN 'isg10' THEN 'cryptex'
        WHEN 'isg16' THEN 'bookcase'
        ELSE NULL
      END
      ELSE slug
    END AS slug,
    CASE
      type
      WHEN 'puzzle_guess_submitted' THEN data->>'canonical_input'
      WHEN 'puzzle_answer_bought' THEN data->>'answer'
      WHEN 'puzzle_solved' THEN data->>'answer'
    END AS answer,
    CASE
      type
      WHEN 'interaction_completed' THEN data->>'result'
      WHEN 'puzzle_guess_submitted' THEN data->>'status'
      ELSE NULL
    END AS result,
    currency_delta AS keys_delta,
    strong_currency_delta AS clues_delta
  FROM expanded_activity_log al
    JOIN team_names tn ON al.team_id = tn.team_id
  WHERE (
      type IN (
        'currency_adjusted',
        'interaction_completed',
        'interaction_started',
        'interaction_unlocked',
        'puzzle_answer_bought',
        'puzzle_guess_submitted',
        'puzzle_hint_requested',
        'puzzle_hint_responded',
        'puzzle_partially_solved',
        'puzzle_solved',
        'puzzle_unlockable',
        'puzzle_unlocked',
        'rate_limits_reset',
        'round_unlocked',
        'strong_currency_adjusted',
        'strong_currency_exchanged',
        'team_hints_unlocked'
      )
    )
    OR (
      type = 'gate_completed'
      AND slug IN (
        'ptg03',
        'ptg16',
        'isg06',
        'isg07',
        'isg08',
        'isg09',
        'isg10',
        'isg16'
      )
    )
),
puzzle_state_log_entries AS (
  SELECT id,
    timestamp AT TIME ZONE 'America/New_York' AS timestamp,
    team_name,
    CASE
      data->>'type'
      WHEN 'ad_frequency' THEN 'ads_frequency_adjusted'
      ELSE data->>'type'
    END AS type,
    slug || ':' || (data->>'subpuzzle_slug')::varchar AS slug,
    data->>'canonical_input' AS answer,
    CASE
      WHEN data->>'type' = 'ad_frequency'
      AND data->>'status' IS NULL THEN 'default'
      ELSE data->>'status'
    END AS result,
    0 AS keys_delta,
    0 AS clues_delta
  FROM puzzle_state_log pl
    JOIN team_names tn ON pl.team_id = tn.team_id
  WHERE data->>'type' IN (
      'subpuzzle_unlocked',
      'subpuzzle_guess_submitted',
      'subpuzzle_solved',
      'ad_frequency'
    )
)
SELECT timestamp,
  team_name,
  type,
  slug,
  answer,
  result,
  keys_delta,
  clues_delta
FROM (
    SELECT *
    FROM activity_log_entries
    UNION ALL
    SELECT *
    FROM puzzle_state_log_entries
    ORDER BY timestamp,
      id,
      team_name
  )

*/

export type ActivityLogRow = {
  timestamp: DateTime;
  team_name: string;
  type:
    | "ads_frequency_adjusted"
    | "ads_unlocked"
    | "clue_exchanged"
    | "clues_adjusted"
    | "illegal_search_unlocked"
    | "interaction_completed"
    | "interaction_started"
    | "interaction_unlocked"
    | "keys_adjusted"
    | "puzzle_answer_bought"
    | "puzzle_guess_submitted"
    | "puzzle_hint_requested"
    | "puzzle_hint_responded"
    | "puzzle_partially_solved"
    | "puzzle_solved"
    | "puzzle_unlockable"
    | "puzzle_unlocked"
    | "rate_limits_reset"
    | "round_unlocked"
    | "subpuzzle_guess_submitted"
    | "subpuzzle_solved"
    | "subpuzzle_unlocked"
    | "weather_unlocked";
  slug?: string;
  answer?: string;
  result?: string;
  keys_delta: number;
  clues_delta: number;
};

export const ActivityLogParseOptions: Options = {
  columns: true,
  cast: (value, context) => {
    if (context.column === "timestamp") {
      return DateTime.fromSQL(value, { zone: "America/New_York" });
    }
    if (context.column === "keys_delta") {
      return parseInt(value, 10);
    }
    if (context.column === "clues_delta") {
      return parseInt(value, 10);
    }
    return value;
  },
};

export const useActivityLog = () => {
  return useCSV<ActivityLogRow>({
    url: activityLogUrl,
    parseOptions: ActivityLogParseOptions,
  });
};
