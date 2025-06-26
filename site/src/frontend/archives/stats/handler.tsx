import type { ParamsDictionary } from "express-serve-static-core";
import HUNT, { generateSlugToSlotMap } from "../../../huntdata";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../../components/PageLayout";
import { PUZZLES } from "../../puzzles";
import { type PageRenderer } from "../../utils/renderApp";
import rootUrl from "../../utils/rootUrl";
import Loading from "../components/Loading";
import activityLog from "./assets/activity_log.csv";
import parsedActivityLog from "./parsedActivityLog";
import { PUZZLE_STATS } from "./puzzles";

/*

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

hint_availability.csv was generated with the following query:

SELECT
  timestamp AT TIME ZONE 'America/New_York' AS timestamp,
  slug
FROM
  activity_log
WHERE
  type = 'global_hints_unlocked'

*/

const slugToSlot = generateSlugToSlotMap(HUNT);

const statsHandler: PageRenderer<ParamsDictionary> = () => {
  const solvedOne = new Set(
    parsedActivityLog
      .filter((row) => row.type === "puzzle_solved")
      .map((row) => row.team_name),
  ).size;
  const solvedOneMeta = new Set(
    parsedActivityLog
      .filter((row) => {
        if (row.type !== "puzzle_solved") return false;
        const { slot } = slugToSlot.get(row.slug ?? "") ?? {};
        return slot?.is_meta ?? slot?.is_supermeta ?? false;
      })
      .map((row) => row.team_name),
  ).size;
  const solvedThief = new Set(
    parsedActivityLog
      .filter((row) => row.type === "puzzle_solved" && row.slug === "the_thief")
      .map((row) => row.team_name),
  ).size;
  const solvedLateSuper = new Set(
    parsedActivityLog
      .filter((row) => {
        if (row.type !== "puzzle_solved") return false;
        if (row.slug === "the_thief") return false;
        const { slot } = slugToSlot.get(row.slug ?? "") ?? {};
        return slot?.is_supermeta;
      })
      .map((row) => row.team_name),
  ).size;
  const solvedHunt = new Set(
    parsedActivityLog
      .filter(
        (row) =>
          row.type === "interaction_unlocked" && row.slug === "the_vault",
      )
      .map((row) => row.team_name),
  ).size;

  const node = (
    <PageWrapper fullWidth>
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
              <strong>2,300</strong> joined us on-campus at MIT.
            </li>

            <li>
              Those 5,000 people were split across <strong>219</strong> teams
              that registered for Hunt, of which <strong>103</strong> had any
              on-campus presence.
            </li>

            <li>
              <strong>{solvedOne}</strong> teams solved at least 1 puzzle.
            </li>

            <li>
              <strong>{solvedOneMeta}</strong> teams solved at least 1
              metapuzzle.
            </li>

            <li>
              <strong>{solvedThief}</strong> teams solved{" "}
              <a href={`${rootUrl}/puzzles/the_thief`}>The Thief</a> and learned
              who stole the Shadow Diamond.
            </li>

            <li>
              <strong>{solvedLateSuper}</strong> teams solved at least one late
              round supermetapuzzle (either a character’s side investigation or
              The Murder in MITropolis)
            </li>

            <li>
              <strong>{solvedHunt}</strong> teams finished the Hunt.
            </li>
          </ul>

          <p>
            Statistics about the Hunt as a whole are on this page. Additionally,
            each puzzle page includes a link to stats specific to that puzzle. A
            few puzzles also include some bonus, specialized statistics:
          </p>

          <ul>
            {Object.keys(PUZZLE_STATS)
              .flatMap((slug) => {
                const puzzle = PUZZLES[slug];
                if (!puzzle) return [];
                return [{ slug, title: puzzle.title }];
              })
              .toSorted(({ title: a }, { title: b }) => a.localeCompare(b))
              .map(({ slug, title }) => {
                return [
                  <li key={slug}>
                    <a href={`${rootUrl}/puzzles/${slug}/stats`}>{title}</a>
                  </li>,
                ];
              })}
          </ul>

          <p>All timestamps are in Eastern Standard Time.</p>

          <h2>Activity Log</h2>
          <p>
            You can download the <a href={activityLog}>full activity log</a>,
            including unlocks, answer submissions, interactions requests, and
            operations on both keys 🗝️ and clues 🔎.
          </p>

          <noscript>Additional statistics displays require Javascript</noscript>
          <div id="stats-root">
            <Loading />
          </div>
        </PageMain>
      </>
    </PageWrapper>
  );

  return { node, title: "Statistics", entrypoints: ["archive_stats"] };
};

export default statsHandler;
