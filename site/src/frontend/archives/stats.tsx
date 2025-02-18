import React from "react";
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  PageMain,
} from "../components/PageLayout";
import activityLog from "./assets/activity_log.csv";

/*

activity_log.csv was generated with the following SQL query:

WITH all_team_names AS (
	SELECT
		timestamp,
		team_id,
		data ->> 'name' AS name
	FROM
		team_registration_log
	WHERE
		timestamp < timestamp with time zone '2025-01-17 12:00 America/New_York'
),
latest_team_names AS (
	SELECT
		team_id,
		first_value(name) OVER (PARTITION BY team_id ORDER BY timestamp DESC) AS team_name
FROM
	all_team_names
	WHERE
		name IS NOT NULL
),
team_names AS (
	SELECT DISTINCT
		team_id,
		team_name
	FROM
		latest_team_names
	ORDER BY
		team_id
)
SELECT
	timestamp AT TIME ZONE 'America/New_York',
	team_name,
	CASE type
	WHEN 'strong_currency_adjusted' THEN
		'clues_adjusted'
	WHEN 'strong_currency_exchanged' THEN
		'clue_exchanged'
	WHEN 'currency_adjusted' THEN
		'keys_adjusted'
	ELSE
		type
	END,
	slug,
	CASE type
	WHEN 'puzzle_guess_submitted' THEN
		data ->> 'canonical_input'
	WHEN 'puzzle_answer_bought' THEN
		data ->> 'answer'
	WHEN 'puzzle_solved' THEN
		data ->> 'answer'
	END AS answer,
	CASE type
	WHEN 'interaction_completed' THEN
		data ->> 'result'
	WHEN 'puzzle_guess_submitted' THEN
		data ->> 'status'
	ELSE
		NULL
	END AS result,
	currency_delta AS keys_delta,
	strong_currency_delta AS clues_delta
FROM
	activity_log al
	JOIN team_names tn ON al.team_id = tn.team_id
	JOIN teams t ON al.team_id = t.id
WHERE
	t.username NOT LIKE 'dnm-%'
	AND t.username NOT IN ('public', 'public_access')
	AND NOT t.deactivated
	AND type IN ('currency_adjusted', 'interaction_completed', 'interaction_started', 'interaction_unlocked', 'puzzle_answer_bought', 'puzzle_guess_submitted', 'puzzle_partially_solved', 'puzzle_solved', 'puzzle_unlockable', 'puzzle_unlocked', 'rate_limits_reset', 'round_unlocked', 'strong_currency_adjusted', 'strong_currency_exchanged')
	AND timestamp < TIMESTAMP WITH TIME ZONE '2025-01-20 12:45:00 America/New_York'
ORDER BY
	timestamp

*/

export function statsHandler() {
  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Staistics</PageTitle>
        </PageHeader>
        <PageMain>
          <p>
            <a href={`/2025/`}>← Back home</a>
          </p>

          <p>
            Download the <a href={activityLog}>full activity log</a>, including
            unlocks, answer submissions, interactions requests, and operations
            on both keys 🗝️ and clues 🔎. (Note that hints were given out quite
            liberally on Sunday, and we therefore do not consider any rankings
            beyond first and second finish to be authoritative.)
          </p>
        </PageMain>
      </>
    </PageWrapper>
  );

  return { node, title: "Statistics" };
}
