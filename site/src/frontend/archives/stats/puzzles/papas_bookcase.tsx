import {
  BoxAndWiskers,
  BoxPlotController,
} from "@sgratzl/chartjs-chart-boxplot";
import { Chart as ChartJS, Legend, type ChartOptions } from "chart.js";
import { type DateTime } from "luxon";
import React, { useMemo } from "react";
import { Bar, Chart as ReactChart, Scatter } from "react-chartjs-2";
import { ErrorText } from "../../../components/StyledUI";
import { PUZZLES } from "../../../puzzles";
import Loading from "../Loading";
import { useActivityLog } from "../activityLog";
import {
  Chart,
  TimeAxisOptions,
  ZoomConfig,
  generateTruncatedTick,
} from "../charts";

ChartJS.register(BoxPlotController, BoxAndWiskers);

const PuzzleToLock = new Map([
  ["a_puzzle_of_the_dead", "numeric_lock"],
  ["cross_spread", "cryptex"],
  ["paw_print_detective", "desk_drawer"],
  ["this_is_just_a_test", "breaker_box"],
  ["皇帝の暗号", "combo_safe"],
]);
const LockToPuzzle = new Map(
  [...PuzzleToLock.entries()].map(([puzzle, lock]) => [lock, puzzle]),
);
const LockNames: [slug: string, name: string][] = [
  ["breaker_box", "Breaker Box"],
  ["combo_safe", "Combo Safe"],
  ["cryptex", "Cryptex"],
  ["desk_drawer", "Desk Drawer"],
  ["numeric_lock", "Numeric Lock"],
];

// Colors taken from Chart.js
const LockColors = new Map<string, { r: number; g: number; b: number }>([
  ["breaker_box", { r: 54, g: 162, b: 235 }], // blue
  ["combo_safe", { r: 255, g: 99, b: 132 }], // red
  ["cryptex", { r: 255, g: 159, b: 64 }], // orange
  ["desk_drawer", { r: 255, g: 205, b: 86 }], // yellow
  ["numeric_lock", { r: 75, g: 192, b: 192 }], // green
]);

type LockStatRow = {
  team_name: string;
  lock: string;
  solveTime: DateTime;
  unlockTime: DateTime;
};

const FirstLockGraph = ({ lockStats }: { lockStats: LockStatRow[] }) => {
  const data = useMemo(() => {
    const byTeam = new Map<string, string>();
    lockStats
      .toSorted(({ unlockTime: a }, { unlockTime: b }) =>
        a.diff(b).as("milliseconds"),
      )
      .forEach(({ team_name, lock }) => {
        if (byTeam.has(team_name)) return;
        byTeam.set(team_name, lock);
      });

    const byLock = new Map<string, number>();
    byTeam.forEach((lock) => {
      byLock.set(lock, (byLock.get(lock) ?? 0) + 1);
    });

    return {
      datasets: [
        {
          data: LockNames.map(([s, l]) => ({ x: l, y: byLock.get(s) ?? 0 })),
        },
      ],
    };
  }, [lockStats]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      x: {
        type: "category",
        labels: data.datasets[0]?.data.map(({ x }) => x),
      },
      y: {
        title: {
          text: "Teams",
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

const UnlockGraph = ({ lockStats }: { lockStats: LockStatRow[] }) => {
  const data = useMemo(() => {
    const byLock = new Map<string, number[]>();
    lockStats.forEach(({ lock, solveTime, unlockTime }) => {
      const stats = byLock.get(lock) ?? [];
      const timeToUnlock = unlockTime.diff(solveTime).as("minutes");
      stats.push(timeToUnlock < 0 ? 0 : timeToUnlock);
      byLock.set(lock, stats);
    });

    return {
      labels: LockNames.map(([, n]) => n),
      datasets: [
        {
          data: LockNames.map(([l]) => byLock.get(l) ?? []),
        },
      ],
    };
  }, [lockStats]);

  const options: ChartOptions<"boxplot"> = {
    responsive: true,
    scales: {
      x: {
        type: "category",
      },
      y: {
        title: {
          display: true,
          text: "Minutes",
        },
      },
    },
    coef: 0,
    elements: {
      boxandwhiskers: {
        itemRadius: 2,
        meanRadius: 5,
      },
    },
  };

  return (
    <Chart>
      <ReactChart type="boxplot" options={options} data={data} />
    </Chart>
  );
};

const SolveSequenceGraph = ({ lockStats }: { lockStats: LockStatRow[] }) => {
  const data = useMemo(() => {
    const byTeam = new Map<string, Map<string, DateTime>>();
    lockStats.forEach(({ team_name, lock, unlockTime, solveTime }) => {
      const puzzle = LockToPuzzle.get(lock);
      if (!puzzle) return;

      const stats = byTeam.get(team_name) ?? new Map<string, DateTime>();
      stats.set(puzzle, solveTime);
      stats.set(lock, unlockTime);
      byTeam.set(team_name, stats);
    });
    byTeam.forEach((times, team_name) => {
      if (times.size < PuzzleToLock.size * 2) {
        byTeam.delete(team_name);
      }
    });

    const data = [...byTeam.entries()]
      .toSorted(([, a], [, b]) => {
        return (
          Math.max(...[...a.values()].map((d) => d.toMillis())) -
          Math.max(...[...b.values()].map((d) => d.toMillis()))
        );
      })
      .map(([team_name, times]) => ({
        team_name,
        ...Object.fromEntries(times.entries()),
      }))
      .slice(0, 20);

    return {
      datasets: [
        ...[...PuzzleToLock.entries()]
          .toSorted(([, a], [, b]) => {
            return (
              LockNames.findIndex(([s]) => s === a) -
              LockNames.findIndex(([s]) => s === b)
            );
          })
          .map(([slug, lock]) => {
            const color = LockColors.get(lock) ?? { r: 0, g: 0, b: 0 };
            return {
              data,
              label: `Solved ${PUZZLES[slug]?.title ?? slug}`,
              parsing: {
                yAxisKey: "team_name",
                xAxisKey: slug,
              },
              borderColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
              pointStyle: "rectRot" as const,
              backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
            };
          }),
        ...LockNames.map(([slug, name]) => {
          const color = LockColors.get(slug) ?? { r: 0, g: 0, b: 0 };
          return {
            data,
            label: `Unlocked ${name}`,
            parsing: {
              yAxisKey: "team_name",
              xAxisKey: slug,
            },
            borderColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
          };
        }),
      ],
    };
  }, [lockStats]);

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
      x: TimeAxisOptions(),
      y: {
        labels: data.datasets[0]?.data.map(({ team_name }) => team_name),
        type: "category",
        ticks: {
          callback: generateTruncatedTick,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
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
    <Chart $aspectRatio={0.75}>
      <Scatter plugins={[Legend]} options={options} data={data} />
    </Chart>
  );
};

const PuzzleStats = () => {
  const { loading, error, data: activityLog } = useActivityLog();

  const lockStats = useMemo(() => {
    type LockStat = { solveTime?: DateTime; unlockTime?: DateTime };
    const teamStats = new Map<string, Map<string, LockStat>>();
    activityLog.forEach((log) => {
      if (!log.slug) return;

      if (log.type === "puzzle_solved") {
        const lock = PuzzleToLock.get(log.slug);
        if (!lock) return;

        const stats =
          teamStats.get(log.team_name) ?? new Map<string, LockStat>();
        const lockStats = stats.get(lock) ?? {};
        lockStats.solveTime = log.timestamp;
        stats.set(lock, lockStats);
        teamStats.set(log.team_name, stats);
      } else if (
        log.type === "illegal_search_unlocked" &&
        LockToPuzzle.has(log.slug)
      ) {
        const stats =
          teamStats.get(log.team_name) ?? new Map<string, LockStat>();
        const lockStats = stats.get(log.slug) ?? {};
        lockStats.unlockTime = log.timestamp;
        stats.set(log.slug, lockStats);
        teamStats.set(log.team_name, stats);
      }
    });

    const stats: LockStatRow[] = [];
    teamStats.forEach((locks, team_name) => {
      locks.forEach(({ solveTime, unlockTime }, lock) => {
        if (!solveTime || !unlockTime) return;
        stats.push({
          team_name,
          lock,
          solveTime,
          unlockTime,
        });
      });
    });

    return stats;
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
      <h3>First Un-Locks (Get It?)</h3>
      <p>How many teams cracked a given lock in Papa’s study first?</p>
      <FirstLockGraph lockStats={lockStats} />

      <h3>Un-Lock Time</h3>
      <p>
        How long did it take for teams to go from solving a puzzle whose answer
        would open a lock to figuring out how to open that lock?
      </p>
      <UnlockGraph lockStats={lockStats} />

      <h3>Un-Lock Sequence</h3>
      <p>Matched colors indicate puzzles and locks that are paired.</p>
      <SolveSequenceGraph lockStats={lockStats} />
    </>
  );
};

export default PuzzleStats;
