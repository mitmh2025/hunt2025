import type { ParamsDictionary } from "express-serve-static-core";
import React from "react";
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  PageMain,
} from "../../components/PageLayout";
import { type PageRenderer } from "../../utils/renderApp";
import rootUrl from "../../utils/rootUrl";
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
	timestamp AT TIME ZONE 'America/New_York' AS timestamp,
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

team_info.csv was generated with the following query:

WITH team_sizes AS (
  SELECT
    team_id,
    data->>'peopleTotal' AS people
  FROM
    team_registration_log l
  WHERE
    id = (
      SELECT
        id
      FROM
        team_registration_log
      WHERE
        team_id = l.team_id
        AND data->>'peopleTotal' IS NOT NULL
        AND timestamp < timestamp with time zone '2025-01-17 12:00 America/New_York'
      ORDER BY
        timestamp DESC
      LIMIT 1
    )
),
team_names AS (
  SELECT
    team_id,
    data->>'name' AS name
  FROM
    team_registration_log l
  WHERE
    id = (
      SELECT
        id
      FROM
        team_registration_log
      WHERE
        team_id = l.team_id
        AND data->>'name' IS NOT NULL
        AND timestamp < timestamp with time zone '2025-01-17 12:00 America/New_York'
      ORDER BY
        timestamp DESC
      LIMIT 1
    )
)
SELECT
  tn.name AS team_name,
  ts.people
FROM
  team_sizes ts
  JOIN team_names tn ON ts.team_id = tn.team_id
ORDER BY
  team_name;
*/

const statsHandler: PageRenderer<ParamsDictionary> = () => {
  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Statistics</PageTitle>
        </PageHeader>
        <PageMain>
          <p>
            <a href={`/2025/`}>← Back home</a>
          </p>

          <p>
            The 2025 MIT Mystery Hunt kicked off at 12:00 PM Eastern Standard
            Time on Friday, January 17th. The first puzzles became unlockable at
            1:00 PM. <strong>Cardinality</strong> solved the final metapuzzle at
            8:56 AM on Sunday, January 19th and, while failing to recover the
            Shadow Diamond, did receive a stash of coins at 12:17 PM. The Gala
            and HQ remained open until 10:00 PM on Sunday, although teams
            enthusiastically continued to solve even after HQ had closed. Stats
            are based on progress until 12:45 PM on Monday, January 20th when
            solutions were released.
          </p>

          <ul>
            <li>
              Roughly <strong>5,000</strong> people participated in the Hunt
              (according to teams’ self-reported sizes), of which roughly{" "}
              <strong>2,300</strong> joined us on-campus at MIT. Those 5,000
              people were split across <strong>219</strong> teams that
              registered for Hunt, of which <strong>103</strong> had any
              on-campus presence.
            </li>

            <li>
              <strong>195</strong> teams solved at least 1 puzzle.
            </li>

            <li>
              <strong>96</strong> teams solved at least 1 metapuzzle.
            </li>

            <li>
              <strong>64</strong> teams solved{" "}
              <a href={`${rootUrl}/puzzles/the_thief`}>The Thief</a> and learned
              who stole the Shadow Diamond.
            </li>

            <li>
              <strong>34</strong> teams solved at least one late round
              supermetapuzzle (either a character’s side investigation or The
              Murder in MITropolis)
            </li>

            <li>
              <strong>11</strong> teams finished the Hunt.
            </li>
          </ul>

          <p>(All timestamps below are in Eastern Standard Time.)</p>

          <noscript>Additional statistics displays require Javascript</noscript>
          <div id="stats-root">
            <p>Computing additional statistics...</p>
          </div>

          <h2>Activity Log</h2>
          <p>
            Download the <a href={activityLog}>full activity log</a>, including
            unlocks, answer submissions, interactions requests, and operations
            on both keys 🗝️ and clues 🔎. As with everything, timestamps are in
            Eastern Standard Time. (Note that hints were given out quite
            liberally on Sunday, and we therefore do not consider any rankings
            beyond first and second finish to be authoritative.)
          </p>
        </PageMain>
      </>
    </PageWrapper>
  );

  return { node, title: "Statistics", entrypoints: ["archive_stats"] };
};

export default statsHandler;
