import { type ChartOptions } from "chart.js";
import { type Options } from "csv-parse";
import { DateTime } from "luxon";
import { useEffect, useMemo, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { styled } from "styled-components";
import tablesort from "tablesort";
import { geoguessrLookup } from "../../../../../ops/src/opsdata/desertedNinjaImages";
import {
  ALL_QUESTIONS,
  type FermitQuestion,
} from "../../../../../ops/src/opsdata/desertedNinjaQuestions";
import LinkedImage from "../../../components/LinkedImage";
import { StyledPuzzleStatsTable } from "../../../components/StatsLayout";
import { ErrorText } from "../../../components/StyledUI";
import { ALL_GEOGUESSR_LOCATIONS } from "../../../puzzles/deserted-ninja/solution";
import Loading from "../../components/Loading";
import { useActivityLog, type ActivityLogRow } from "../activityLog";
import puzzleLogUrl from "../assets/estimation_dot_jpg_log.csv";
import { Chart, generateTruncatedTick } from "../charts";
import useCSV from "../useCSV";

/* Stats generated with the following SQL query:

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
)
SELECT timestamp AT TIME ZONE 'America/New_York' AS timestamp,
  team_name,
  question_ids AS question_ids,
  data->>'scores' AS scores
FROM puzzle_state_log psl
  JOIN team_names tn ON tn.team_id = psl.team_id
  JOIN teams t ON t.id = psl.team_id
  JOIN fermit_sessions fs ON fs.id = (psl.data->>'sessionId')::NUMERIC
WHERE psl.slug = 'estimation_dot_jpg'
  AND t.username NOT LIKE 'dnm-%'
  AND t.username NOT IN ('public', 'public_access')
  AND psl.team_id != 69
  AND NOT t.deactivated
  AND timestamp >= TIMESTAMP WITH TIME ZONE '2025-01-17 12:00:00 America/New_York'
  AND timestamp < TIMESTAMP WITH TIME ZONE '2025-01-20 12:45:00 America/New_York'
ORDER BY timestamp;

*/

type PuzzleLogRow = {
  timestamp: DateTime;
  team_name: string;
  question_ids: number[];
  scores: number[];
};

const PuzzleLogParseOptions: Options = {
  columns: true,
  cast(value, context) {
    if (context.column === "timestamp") {
      return DateTime.fromSQL(value, { zone: "America/New_York" });
    } else if (context.column === "question_ids") {
      return JSON.parse(value) as number[];
    } else if (context.column === "scores") {
      return JSON.parse(value) as number[];
    }
    return value;
  },
};

const QuestionsByID = ALL_QUESTIONS.reduce<Map<number, FermitQuestion>>(
  (acc, question) => {
    acc.set(question.id, question);
    return acc;
  },
  new Map(),
);

const GamesToSolve = ({
  puzzleData,
  activityLog,
}: {
  puzzleData: PuzzleLogRow[];
  activityLog: ActivityLogRow[];
}) => {
  const data = useMemo(() => {
    const solveTeams = new Set<string>();
    const purchasedTeams = new Set<string>();
    activityLog.forEach((row) => {
      if (row.type === "puzzle_solved" && row.slug === "estimation_dot_jpg") {
        solveTeams.add(row.team_name);
      }
      if (
        row.type === "puzzle_answer_bought" &&
        row.slug === "estimation_dot_jpg"
      ) {
        purchasedTeams.add(row.team_name);
      }
    });

    const gamesPlayed = new Map<string, number>();
    puzzleData.forEach((row) => {
      gamesPlayed.set(row.team_name, (gamesPlayed.get(row.team_name) ?? 0) + 1);
    });

    const data = [...gamesPlayed.entries()]
      .filter(
        ([teamName]) =>
          solveTeams.has(teamName) && !purchasedTeams.has(teamName),
      )
      .toSorted(([ta, ca], [tb, cb]) =>
        ca === cb ? ta.localeCompare(tb) : ca - cb,
      )
      .map(([teamName, count]) => ({
        x: teamName,
        y: count,
      }));
    return { datasets: [{ data }] };
  }, [puzzleData, activityLog]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
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

const GeoguessrImg = styled(LinkedImage)`
  img {
    width: 200px;
  }
`;

const BestScores = ({ data }: { data: PuzzleLogRow[] }) => {
  const bestScores = useMemo(() => {
    const bestScore = new Map<string, number>();
    data.forEach((row) => {
      const total = row.scores.reduce((a, b) => a + b, 0);
      const max = bestScore.get(row.team_name) ?? 0;
      bestScore.set(row.team_name, Math.max(total, max));
    });

    const byScore = new Map<number, Set<string>>();
    bestScore.forEach((score, teamName) => {
      const teams = byScore.get(score) ?? new Set<string>();
      teams.add(teamName);
      byScore.set(score, teams);
    });
    return [...byScore.entries()]
      .toSorted(([a], [b]) => b - a)
      .map(([score, teams]) => ({
        score,
        teams: [...teams].toSorted(),
      }))
      .slice(0, 10);
  }, [data]);

  return (
    <StyledPuzzleStatsTable>
      <thead>
        <tr>
          <th>Score</th>
          <th>Teams</th>
        </tr>
      </thead>
      <tbody>
        {bestScores.map(({ score, teams }) => {
          return (
            <tr key={score}>
              <td>{score}</td>
              <td>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {teams.map((team) => (
                    <li key={team}>{team}</li>
                  ))}
                </ul>
              </td>
            </tr>
          );
        })}
      </tbody>
    </StyledPuzzleStatsTable>
  );
};

const QuestionDifficulty = ({ data }: { data: PuzzleLogRow[] }) => {
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    if (ref.current) {
      tablesort(ref.current);
    }
  }, []);

  const questionStats = useMemo(() => {
    const questionScores = new Map<
      number,
      { attempts: number; sum: number; high: number }
    >();
    data.forEach((row) => {
      row.question_ids.forEach((questionId, index) => {
        const score = row.scores[index];
        if (score === undefined) return;
        const stat = questionScores.get(questionId) ?? {
          attempts: 0,
          sum: 0,
          high: 0,
        };
        stat.attempts += 1;
        stat.sum += score;
        stat.high = Math.max(stat.high, score);
        questionScores.set(questionId, stat);
      });
    });

    return [...questionScores.entries()]
      .flatMap(([questionId, { attempts, sum, high }]) => {
        const question = QuestionsByID.get(questionId);
        if (!question) return [];

        return [
          {
            question,
            attempts,
            averageScore: sum / attempts,
            highScore: high,
          },
        ];
      })
      .toSorted(({ averageScore: a }, { averageScore: b }) => b - a);
  }, [data]);

  return (
    <StyledPuzzleStatsTable className="sortable" ref={ref}>
      <thead>
        <tr>
          <th>Question</th>
          <th>Correct Answer</th>
          <th>Attempts</th>
          <th>Average Score</th>
          <th>High Score</th>
        </tr>
      </thead>
      <tbody>
        {questionStats.map(
          ({ question, attempts, averageScore, highScore }) => {
            return (
              <tr key={question.id}>
                <td>
                  <p>{question.text}</p>
                  {question.geoguessr !== null && (
                    <p>
                      <GeoguessrImg
                        src={geoguessrLookup[question.geoguessr - 1] ?? ""}
                        alt="Geoguessr"
                      />
                    </p>
                  )}
                </td>
                <td>
                  {question.geoguessr !== null
                    ? ALL_GEOGUESSR_LOCATIONS[question.geoguessr - 1]
                    : question.answer}
                </td>
                <td>{attempts}</td>
                <td>{averageScore.toFixed(2)}</td>
                <td>{highScore}</td>
              </tr>
            );
          },
        )}
      </tbody>
    </StyledPuzzleStatsTable>
  );
};

const PuzzleStats = () => {
  const {
    loading: puzzleLoading,
    error: puzzleError,
    data: puzzleData,
  } = useCSV<PuzzleLogRow>({
    url: puzzleLogUrl,
    parseOptions: PuzzleLogParseOptions,
  });
  const {
    loading: activityLoading,
    error: activityError,
    data: activityLog,
  } = useActivityLog();

  const loading = puzzleLoading || activityLoading;
  const error = puzzleError || activityError;

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
      <h3>Quizzes Needed to Solve</h3>
      <GamesToSolve puzzleData={puzzleData} activityLog={activityLog} />

      <h3>Highest Scores</h3>
      <p>Which teams scored the highest (out of a possible 85 points)</p>
      <BestScores data={puzzleData} />

      <h3>Easiest (and Hardest) Questions</h3>
      <QuestionDifficulty data={puzzleData} />
    </>
  );
};

export default PuzzleStats;
