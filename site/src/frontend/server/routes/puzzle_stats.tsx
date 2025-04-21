import { parse } from "csv-parse/sync";
import { type Request } from "express";
import { type DateTime } from "luxon";
import React from "react";
import { styled } from "styled-components";
import {
  ActivityLogParseOptions,
  type ActivityLogRow,
} from "../../archives/stats/activityLog";
import activityLogRaw from "../../archives/stats/assets/activity_log.csv?raw";
import { PUZZLE_STATS } from "../../archives/stats/puzzles";
import { NotoColorEmojiFont } from "../../assets/SharedFonts";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../../components/PageLayout";
import { PuzzleStatsTable } from "../../components/StatsLayout";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import { PUZZLES } from "../../puzzles";
import archiveMode from "../../utils/archiveMode";
import rootUrl from "../../utils/rootUrl";
import { type PuzzleParams } from "./puzzle";

const activityLog = parse(
  activityLogRaw,
  ActivityLogParseOptions,
) as ActivityLogRow[];

const NoWrapCell = styled.td`
  white-space: nowrap;
`;

export function puzzleStatsHandler(req: Request<PuzzleParams>) {
  if (!req.teamState) {
    console.log("weird no team state");
    return undefined;
  }
  // Only show solutions if we're in archive mode
  if (!archiveMode) {
    return undefined;
  }

  const slug = req.params.puzzleSlug;
  const puzzle = PUZZLES[slug];
  if (puzzle === undefined) {
    const node = (
      <div>
        <h1>Puzzle not found</h1>
        <p>
          The puzzle you requested stats for (<code>{slug}</code>) exists, but
          we can’t seem to find it.
        </p>
      </div>
    );
    return wrapContentWithNavBar(
      { node, title: `Missing Solution for ${slug}` },
      req.teamState,
    );
  }

  const log = activityLog.filter((row) => row.slug === slug);
  const unlockCount = log.filter(
    (row) => row.type === "puzzle_unlocked",
  ).length;
  const solveCount = log.filter((row) => row.type === "puzzle_solved").length;
  const purchasedCount = log.filter(
    (row) => row.type === "puzzle_answer_bought",
  ).length;
  const guessCount = log.filter(
    (row) => row.type === "puzzle_guess_submitted",
  ).length;
  const hintCount = log.filter(
    (row) => row.type === "puzzle_hint_requested",
  ).length;

  const teamStatsMap = log.reduce<
    Map<
      string,
      {
        unlockTime?: DateTime;
        solveTime?: DateTime;
        guessCount: number;
        purchased?: boolean;
      }
    >
  >((acc, row) => {
    const stats = acc.get(row.team_name) ?? { guessCount: 0 };
    if (row.type === "puzzle_unlocked") {
      stats.unlockTime = row.timestamp;
    } else if (row.type === "puzzle_solved") {
      stats.solveTime = row.timestamp;
    } else if (row.type === "puzzle_guess_submitted") {
      stats.guessCount += 1;
    } else if (row.type === "puzzle_answer_bought") {
      stats.purchased = true;
    }
    acc.set(row.team_name, stats);

    return acc;
  }, new Map());
  const teamStats = [...teamStatsMap.entries()]
    .flatMap(([teamName, stats]) => {
      const { solveTime, unlockTime } = stats;
      if (!solveTime || !unlockTime) {
        return [];
      }

      return {
        purchased: false,
        teamName,
        ...stats,
        unlockTime,
        solveTime,
        timeToSolve: solveTime.diff(unlockTime).rescale(),
      };
    })
    .toSorted(({ solveTime: a }, { solveTime: b }) => a.diff(b).milliseconds);

  const answerResults = new Map<string, "correct" | "incorrect" | "other">();
  const answerStatsMap = log.reduce<Map<string, number>>((acc, row) => {
    if (row.type === "puzzle_guess_submitted" && row.answer) {
      const count = acc.get(row.answer) ?? 0;
      acc.set(row.answer, count + 1);

      if (row.result === "correct") {
        answerResults.set(row.answer, "correct");
      } else if (row.result === "incorrect") {
        answerResults.set(row.answer, "incorrect");
      } else if (row.result === "other") {
        answerResults.set(row.answer, "other");
      }
    }
    return acc;
  }, new Map());
  const answerStats = [...answerStatsMap.entries()]
    .flatMap(([answer, count]) => {
      return {
        answer,
        count,
      };
    })
    .toSorted(({ count: a }, { count: b }) => b - a);

  const inlineScript = `window.statsSlug = "${slug}";`;
  const node = (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />
      <NotoColorEmojiFont />
      <PageWrapper fullWidth>
        <>
          <PageHeader>
            <PageTitle>Stats: {puzzle.title}</PageTitle>
          </PageHeader>
          <PageMain>
            <p>
              <a href={`${rootUrl}/puzzles/${slug}`}>← Back to puzzle</a>
            </p>

            <p>
              Total unlocks: {unlockCount}
              <br />
              Total solves: {solveCount} (including {purchasedCount} with Clue
              {purchasedCount !== 1 ? "s" : ""} 🔎)
              <br />
              Total guesses: {guessCount}
              <br />
              Total hints requested: {hintCount}
            </p>

            <p>(Click on headers to sort)</p>

            {PUZZLE_STATS[slug] && (
              <>
                <noscript>
                  This puzzle has additional statistics which require Javascript
                </noscript>
                <div id="puzzle-bonus-stats-root" />
              </>
            )}

            <h2>Team Stats</h2>

            <PuzzleStatsTable className="sortable">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Total Guesses</th>
                  <th>Unlock Time</th>
                  <th>Time to Solve</th>
                  <th>Solve Time</th>
                  <th>Purchased?</th>
                </tr>
              </thead>
              <tbody>
                {teamStats.map((team) => {
                  return (
                    <tr key={team.teamName}>
                      <td>{team.teamName}</td>
                      <td>{team.guessCount}</td>
                      <NoWrapCell
                        sorttable_customkey={team.unlockTime.toMillis()}
                      >
                        {team.unlockTime.toFormat("EEE, MMM d, TTT")}
                      </NoWrapCell>
                      <NoWrapCell
                        sorttable_customkey={team.timeToSolve.toMillis()}
                      >
                        {team.timeToSolve
                          .set({ milliseconds: 0 })
                          .rescale()
                          .toHuman({ unitDisplay: "short" })}
                      </NoWrapCell>
                      <NoWrapCell
                        sorttable_customkey={team.solveTime.toMillis()}
                      >
                        {team.solveTime.toFormat("EEE, MMM d, TTT")}
                      </NoWrapCell>
                      <td>{team.purchased ? "✅" : "❌"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </PuzzleStatsTable>

            <h2>Answer Stats</h2>

            <PuzzleStatsTable className="sortable">
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
                    answer.answer === puzzle.answer ? PuzzleAnswer : Mono;

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
            </PuzzleStatsTable>
          </PageMain>
        </>
      </PageWrapper>
    </>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: `Stats for ${puzzle.title}`,
      entrypoints: ["archive_puzzle_stats"],
    },
    req.teamState,
  );
}
