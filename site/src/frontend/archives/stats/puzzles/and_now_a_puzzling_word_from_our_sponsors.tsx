import { Filler, Legend, type ChartOptions } from "chart.js";
import { Duration, type DateTime } from "luxon";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import { styled } from "styled-components";
import tablesort from "tablesort";
import {
  NoWrapCell,
  PuzzleAnswerStatsTable,
  PuzzleTeamStatsTable,
  StyledPuzzleStatsTable,
} from "../../../components/StatsLayout";
import { ErrorText, Mono } from "../../../components/StyledUI";
import { SUBPUZZLES } from "../../../puzzles";
import Loading from "../Loading";
import { useActivityLog, type ActivityLogRow } from "../activityLog";
import {
  Chart,
  TimeAxisOptions,
  ZoomConfig,
  generateTruncatedTick,
} from "../charts";

const AdSubpuzzles = Object.entries(SUBPUZZLES)
  .filter(
    ([, subpuzzle]) =>
      subpuzzle.parent_slug === "and_now_a_puzzling_word_from_our_sponsors",
  )
  .toSorted(([, { title: a }], [, { title: b }]) => a.localeCompare(b))
  .map(([slug]) => slug);

const StyledSubpuzzleTabs = styled.div`
  position: relative;

  .subpuzzle-tabs {
    position: sticky;
    top: 0;
    background: var(--black);
    display: flex;
    list-style: none;
    padding: 1rem 0 0 0;
    margin: 0;
    height: 3rem;
    z-index: 1;

    li button {
      background: var(--gray-700);
      color: var(--gray-200);
      border: 0;
      margin: 0 0.25rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem 0.5rem 0 0;
      cursor: pointer;

      &.active {
        background: var(--gold-500);
        color: var(--black);
      }
    }
  }

  .subpuzzle {
    border: 1px var(--gray-500) solid;
    padding: 0 1rem 1rem 1rem;

    &:not(.active) {
      display: none;
    }

    thead {
      top: 3rem;
    }
  }
`;

const SubpuzzleTeamStats = ({
  activityLog,
  slug,
}: {
  activityLog: ActivityLogRow[];
  slug: string;
}) => {
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    if (ref.current) {
      tablesort(ref.current);
    }
  }, []);

  const teamStats = useMemo(() => {
    const fullSlug = `and_now_a_puzzling_word_from_our_sponsors:${slug}`;

    const teamStatsMap = activityLog.reduce<
      Map<
        string,
        {
          unlockTime?: DateTime;
          solveTime?: DateTime;
          guessCount: number;
        }
      >
    >((acc, row) => {
      if (row.slug !== fullSlug) return acc;

      const stats = acc.get(row.team_name) ?? { guessCount: 0 };
      if (row.type === "subpuzzle_unlocked") {
        stats.unlockTime = row.timestamp;
      } else if (row.type === "subpuzzle_solved") {
        stats.solveTime = row.timestamp;
      } else if (row.type === "subpuzzle_guess_submitted") {
        stats.guessCount += 1;
      }
      acc.set(row.team_name, stats);
      return acc;
    }, new Map());

    return [...teamStatsMap.entries()].flatMap(
      ([teamName, { unlockTime, solveTime, guessCount }]) => {
        if (!unlockTime || !solveTime) return [];

        return [
          {
            teamName,
            unlockTime,
            solveTime,
            guessCount,
            timeToSolve: solveTime.diff(unlockTime).rescale(),
          },
        ];
      },
    );
  }, [activityLog, slug]);

  return (
    <PuzzleTeamStatsTable teamStats={teamStats} purchasable={false} ref={ref} />
  );
};

const SubpuzzleAnswerStats = ({
  activityLog,
  slug,
}: {
  activityLog: ActivityLogRow[];
  slug: string;
}) => {
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    if (ref.current) {
      tablesort(ref.current);
    }
  }, []);

  const { answerResults, answerStats } = useMemo(() => {
    const fullSlug = `and_now_a_puzzling_word_from_our_sponsors:${slug}`;

    const answerResults = new Map<string, "correct" | "incorrect" | "other">();
    const answerStatsMap = activityLog.reduce<Map<string, number>>(
      (acc, row) => {
        if (row.slug !== fullSlug) return acc;
        if (row.type !== "subpuzzle_guess_submitted") return acc;
        if (!row.answer) return acc;

        const count = acc.get(row.answer) ?? 0;
        acc.set(row.answer, count + 1);

        if (row.result === "correct") {
          answerResults.set(row.answer, "correct");
        } else if (row.result === "incorrect") {
          answerResults.set(row.answer, "incorrect");
        } else if (row.result === "other") {
          answerResults.set(row.answer, "other");
        }

        return acc;
      },
      new Map(),
    );
    const answerStats = [...answerStatsMap.entries()]
      .toSorted(([, a], [, b]) => b - a)
      .map(([answer, count]) => ({ answer, count }));

    return { answerResults, answerStats };
  }, [activityLog, slug]);

  return (
    <PuzzleAnswerStatsTable
      answerStats={answerStats}
      answerResults={answerResults}
      ref={ref}
    />
  );
};

const SubpuzzleTabs = ({
  activityLog,
  Component,
}: {
  activityLog: ActivityLogRow[];
  Component: React.ComponentType<{
    activityLog: ActivityLogRow[];
    slug: string;
  }>;
}) => {
  const [activeSlug, setActiveSlug] = React.useState<string>(
    AdSubpuzzles[0] ?? "",
  );
  const onSelect = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const slug = target.dataset.slug;
    if (slug) {
      setActiveSlug(slug);
    }
  }, []);

  return (
    <StyledSubpuzzleTabs>
      <ul className="subpuzzle-tabs">
        {AdSubpuzzles.map((slug) => (
          <li key={slug}>
            <button
              type="button"
              data-slug={slug}
              onClick={onSelect}
              className={activeSlug === slug ? "active" : ""}
            >
              {SUBPUZZLES[slug]?.title ?? slug}
            </button>
          </li>
        ))}
      </ul>
      {AdSubpuzzles.map((slug) => (
        <div
          key={slug}
          className={`subpuzzle ${activeSlug === slug ? "active" : ""}`}
        >
          <Component activityLog={activityLog} slug={slug} />
        </div>
      ))}
    </StyledSubpuzzleTabs>
  );
};

const TimeToPuzzle = ({ activityLog }: { activityLog: ActivityLogRow[] }) => {
  const data = useMemo(() => {
    const teamStats = activityLog.reduce<
      Map<string, { adsTime?: DateTime; unlockTime?: DateTime }>
    >((acc, row) => {
      const stats = acc.get(row.team_name) ?? {};
      if (row.type === "ads_unlocked") {
        stats.adsTime = row.timestamp;
      } else if (
        row.type === "subpuzzle_unlocked" &&
        row.slug?.startsWith("and_now_a_puzzling_word_from_our_sponsors")
      ) {
        stats.unlockTime = row.timestamp;
      }
      acc.set(row.team_name, stats);
      return acc;
    }, new Map());

    const data = [...teamStats.entries()]
      .flatMap(([teamName, { adsTime, unlockTime }]) => {
        if (!adsTime || !unlockTime) return [];

        return [
          {
            x: teamName,
            y: unlockTime.diff(adsTime).as("minutes"),
          },
        ];
      })
      .toSorted(({ y: a }, { y: b }) => a - b)
      .slice(0, 30);

    return { datasets: [{ data }] };
  }, [activityLog]);

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
          text: "Minutes",
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

const SubpuzzleAggregates = ({
  activityLog,
}: {
  activityLog: ActivityLogRow[];
}) => {
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    if (ref.current) {
      tablesort(ref.current);
    }
  }, []);

  const data = useMemo(() => {
    type TeamSubpuzzleData = {
      unlockTime?: DateTime;
      solveTime?: DateTime;
      solveDuration?: Duration;
    };

    const teamData = new Map<string, Map<string, TeamSubpuzzleData>>();
    activityLog.forEach((row) => {
      if (!row.slug) return;

      const [parent, subpuzzle] = row.slug.split(":");
      if (
        !parent ||
        !subpuzzle ||
        parent !== "and_now_a_puzzling_word_from_our_sponsors" ||
        !AdSubpuzzles.includes(subpuzzle)
      )
        return;

      const teamStats =
        teamData.get(row.team_name) ?? new Map<string, TeamSubpuzzleData>();
      const stats = teamStats.get(subpuzzle) ?? {};
      if (row.type === "subpuzzle_unlocked") {
        stats.unlockTime = row.timestamp;
      } else if (row.type === "subpuzzle_solved") {
        stats.solveTime = row.timestamp;
      }
      teamStats.set(subpuzzle, stats);
      teamData.set(row.team_name, teamStats);
    });
    teamData.forEach((subpuzzles) => {
      subpuzzles.forEach((stats) => {
        if (stats.unlockTime && stats.solveTime) {
          stats.solveDuration = stats.solveTime
            .diff(stats.unlockTime)
            .rescale();
        }
      });
    });

    const data = new Map<
      string,
      {
        unlockCount: number;
        solveCount: number;
        firstSolveCount: number;
        fastestSolve: Duration;
      }
    >();
    teamData.forEach((subpuzzles) => {
      const fastestSolve = Math.max(
        ...[...subpuzzles.values()].map(
          ({ solveDuration }) => solveDuration?.as("milliseconds") ?? Infinity,
        ),
      );

      subpuzzles.forEach(({ unlockTime, solveDuration }, subpuzzle) => {
        if (!unlockTime) return;

        const stats = data.get(subpuzzle) ?? {
          unlockCount: 0,
          solveCount: 0,
          firstSolveCount: 0,
          fastestSolve: solveDuration ?? Duration.fromMillis(Infinity),
        };
        stats.unlockCount += 1;
        if (solveDuration) {
          stats.solveCount += 1;
          if (solveDuration.as("milliseconds") === fastestSolve) {
            stats.firstSolveCount += 1;
          }
          if (solveDuration < stats.fastestSolve) {
            stats.fastestSolve = solveDuration;
          }
        }
        data.set(subpuzzle, stats);
      });
    });

    return [...data.entries()]
      .toSorted(([, { solveCount: a }], [, { solveCount: b }]) => b - a)
      .map(([slug, stats]) => ({ slug, ...stats }));
  }, [activityLog]);

  return (
    <StyledPuzzleStatsTable className="sortable" ref={ref}>
      <thead>
        <tr>
          <th>Subpuzzle</th>
          <th>Unlock Count</th>
          <th>Solve Count</th>
          <th>First Solved</th>
          <th>Fastest Solve</th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          ({
            slug,
            unlockCount,
            solveCount,
            firstSolveCount,
            fastestSolve,
          }) => {
            return (
              <tr key={slug}>
                <td>{SUBPUZZLES[slug]?.title ?? slug}</td>
                <td>{unlockCount}</td>
                <td>{solveCount}</td>
                <td>{firstSolveCount}</td>
                <NoWrapCell data-sort={fastestSolve.as("milliseconds")}>
                  {fastestSolve
                    .set({ milliseconds: 0 })
                    .rescale()
                    .toHuman({ unitDisplay: "short" })}
                </NoWrapCell>
              </tr>
            );
          },
        )}
      </tbody>
    </StyledPuzzleStatsTable>
  );
};

const AdFrequency = ({ activityLog }: { activityLog: ActivityLogRow[] }) => {
  const data = useMemo(() => {
    const runningTeamStatus = new Map<
      string,
      "original" | "plus" | "minus" | "standard"
    >();
    const points: {
      x: DateTime;
      original: number;
      plus: number;
      minus: number;
      standard: number;
    }[] = [];
    const makePoint = (timestamp: DateTime) => {
      const tally = { original: 0, plus: 0, minus: 0, standard: 0 };
      runningTeamStatus.forEach((status) => {
        tally[status] += 1;
      });
      points.push({ x: timestamp, ...tally });
    };

    activityLog.forEach((row) => {
      switch (row.type) {
        case "ads_unlocked":
          runningTeamStatus.set(row.team_name, "original");
          break;
        case "ads_frequency_adjusted": {
          const status = row.result;
          switch (status) {
            case "plus":
              runningTeamStatus.set(row.team_name, "plus");
              break;
            case "minus":
              runningTeamStatus.set(row.team_name, "minus");
              break;
            case "default":
              runningTeamStatus.set(row.team_name, "standard");
              break;
            default:
              return;
          }
          break;
        }
        default:
          return;
      }
      makePoint(row.timestamp);
    });

    return {
      datasets: [
        {
          data: points,
          label: "Minus (Manual)",
          parsing: {
            yAxisKey: "minus",
          },
          fill: "origin",
        },
        {
          data: points,
          label: "Standard (Automatic)",
          parsing: {
            yAxisKey: "original",
          },
          fill: "-1",
        },
        {
          data: points,
          label: "Standard (Manually Selected)",
          parsing: {
            yAxisKey: "standard",
          },
          fill: "-1",
        },
        {
          data: points,
          label: "Plus (Manual)",
          parsing: {
            yAxisKey: "plus",
          },
          fill: "-1",
        },
      ],
    };
  }, [activityLog]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    animation: {
      duration: 200,
    },
    datasets: {
      line: {
        cubicInterpolationMode: "monotone",
      },
    },
    scales: {
      x: TimeAxisOptions(),
      y: {
        title: {
          text: "Number of Teams",
          display: true,
        },
        min: 0,
        stacked: true,
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
      <Line plugins={[Legend, Filler]} options={options} data={data} />
    </Chart>
  );
};

const PuzzleStats = () => {
  const { loading, error, data: activityLog } = useActivityLog();

  const minusCounter = useMemo(() => {
    return new Set(
      activityLog
        .filter(
          (row) =>
            row.type === "ads_frequency_adjusted" && row.result === "minus",
        )
        .map((row) => row.team_name),
    ).size;
  }, [activityLog]);

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
      <h3>Fastest Puzzle Discovery</h3>
      <p>
        How long did it take from when ads first started playing on a team’s
        radio until they first opened any minipuzzle page? (As a note, the{" "}
        <Mono>ads_unlocked</Mono> event used to calculate this is the time at
        which ads became eligible to be played. However, the WDNM 2π radio
        stream would only play ads during station breaks, so there may have been
        some additional delay between when ads were “unlocked” and when the
        first ad actually played.)
      </p>
      <TimeToPuzzle activityLog={activityLog} />

      <h3>Subpuzzle Aggregate Stats</h3>
      <p>
        (The “First Solved” column counts how many times this subpuzzle was the
        first of the subpuzzles that a team solved.)
      </p>
      <SubpuzzleAggregates activityLog={activityLog} />

      <h2>Ad Frequency</h2>
      <p>
        Teams had the option of changing how frequently ads were included in
        their radio stream, choosing between Mystery Hunt Standard (occasional
        ads, the default behavior after ads were initialy unlocked), Mystery
        Hunt Plus (no ads), and Mystery Hunt Minus (only ads). How often did
        they choose to change it?
      </p>
      <p>
        (In total, {minusCounter} teams switched to Mystery Hunt Minus at some
        point during Hunt.)
      </p>
      <AdFrequency activityLog={activityLog} />

      <h2>Subpuzzle Team Stats</h2>
      <SubpuzzleTabs activityLog={activityLog} Component={SubpuzzleTeamStats} />

      <h2>Subpuzzle Answer Stats</h2>
      <SubpuzzleTabs
        activityLog={activityLog}
        Component={SubpuzzleAnswerStats}
      />
    </>
  );
};

export default PuzzleStats;
