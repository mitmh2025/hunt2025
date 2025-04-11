import "chartjs-adapter-luxon";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Colors,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  type TooltipItem,
  type ActiveElement,
  type ChartEvent,
  type ChartOptions,
  type ChartType,
  type ChartDataset,
  type ChartData,
  Filler,
  Decimation,
} from "chart.js";
import Zoom from "chartjs-plugin-zoom";
import type { ZoomPluginOptions } from "chartjs-plugin-zoom/types/options";
import { parse } from "csv-parse/browser/esm/sync";
import { DateTime } from "luxon";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Bar, Bubble, Line, Scatter } from "react-chartjs-2";
import { createRoot } from "react-dom/client";
import Select, {
  components,
  type CSSObjectWithLabel,
  type StylesConfig,
  type IndicatorSeparatorProps,
} from "react-select";
import seedrandom from "seedrandom";
import { styled } from "styled-components";
import HUNT, { generateSlugToSlotMap } from "../../../huntdata";
import { ErrorText } from "../../components/StyledUI";
import { INTERACTIONS } from "../../interactions";
import { PUZZLES } from "../../puzzles";
import rootUrl from "../../utils/rootUrl";
import Loading from "./Loading";
import activityLogUrl from "./assets/activity_log.csv";
import hintAvailabilityUrl from "./assets/hint_availability.csv";
import teamInfoUrl from "./assets/team_info.csv";

ChartJS.register(
  BarElement,
  CategoryScale,
  Colors,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  Zoom,
);

const HuntStart = DateTime.fromISO("2025-01-17T12:00:00-05:00");
const HuntEnd = DateTime.fromISO("2025-01-20T12:45:00-05:00");
const HuntHQClose = DateTime.fromISO("2025-01-19T22:00:00-05:00");

const slugToSlot = generateSlugToSlotMap(HUNT);
const puzzleSlugs = [...slugToSlot.entries()].map(([slug, _]) => slug);
const metaSlugs = [...slugToSlot.entries()]
  .filter(([_, lookup]) => lookup.slot.is_meta)
  .map(([slug, _]) => slug);
const supermetaSlugs = [...slugToSlot.entries()]
  .filter(([_, lookup]) => lookup.slot.is_supermeta)
  .map(([slug, _]) => slug);

type CSVRow = {
  timestamp: DateTime;
  team_name: string;
  type:
    | "clue_exchanged"
    | "clues_adjusted"
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
    | "round_unlocked";
  slug?: string;
  result?: string;
  keys_delta: number;
  clues_delta: number;
};

type TeamInfo = Map<string, { people: number }>;
type HintAvailabilityRow = { timestamp: DateTime; slug: string };

const Chart = styled.div`
  position: relative;
  width: calc(min(1080px, 100vw) - 10rem);
  height: calc(0.5 * (min(1080px, 100vw) - 10rem));
  background-color: var(--white);
`;

const TimeAxisOptions = ({
  start = HuntStart,
  end = HuntEnd,
}: {
  start?: DateTime;
  end?: DateTime;
} = {}) => ({
  type: "time" as const,
  min: start.toJSDate().valueOf(),
  max: end.toJSDate().valueOf(),
  adapters: {
    date: {
      zone: "America/New_York",
    },
  },
  time: {
    unit: "hour" as const,
    displayFormats: {
      hour: "EEE h a",
    },
  },
});

const ZoomConfig: ZoomPluginOptions = {
  pan: {
    enabled: true,
  },
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    scaleMode: "xy",
  },
  limits: {
    x: { min: "original", max: "original" },
    y: { min: "original", max: "original" },
  },
};

const useChartClickHandler = ({
  toggleHighlight,
  clearHighlight,
}: {
  toggleHighlight: (teamName: string) => void;
  clearHighlight: () => void;
}) => {
  return useCallback(
    (_e: ChartEvent, elements: ActiveElement[], chart: ChartJS) => {
      const activeDataset = elements[0]?.datasetIndex;
      const team =
        activeDataset !== undefined
          ? chart.data.datasets[activeDataset]?.label
          : undefined;
      if (team) {
        toggleHighlight(team);
      } else {
        clearHighlight();
      }
    },
    [clearHighlight, toggleHighlight],
  );
};

const useFilteredDatasets = <TType extends ChartType, TData>({
  datasets,
  shownTeams,
  highlightedTeams,
}: {
  datasets: ChartDataset<TType, TData>[];
  shownTeams: Set<string>;
  highlightedTeams: Set<string>;
}) => {
  return useMemo(() => {
    const deselectedColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--gray-100");

    return datasets.flatMap((dataset) => {
      if (!dataset.label || !shownTeams.has(dataset.label)) {
        return [];
      }

      const deselected =
        highlightedTeams.size !== 0 && !highlightedTeams.has(dataset.label);

      return [
        {
          ...dataset,
          order: deselected ? 0 : -1,
          ...(deselected
            ? { backgroundColor: deselectedColor, borderColor: deselectedColor }
            : {}),
        },
      ];
    });
  }, [shownTeams, highlightedTeams, datasets]);
};

type TeamSelectOption = { value: string; label: string };

const TeamMultiSelectIndicatorSeparator = (
  props: IndicatorSeparatorProps<TeamSelectOption, true>,
) => {
  const { options, getValue, clearValue, setValue } = props;
  const count = getValue().length;

  const onChange = useCallback(() => {
    if (count === options.length) {
      clearValue();
    } else {
      setValue(
        options.flatMap((o) => ("options" in o ? o.options : [o])),
        "select-option",
      );
    }
  }, [clearValue, count, options, setValue]);

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = count > 0 && count < options.length;
    }
  }, [count, options.length]);

  return (
    <>
      <div style={{ display: "flex", paddingRight: "8px" }}>
        <input
          ref={ref}
          type="checkbox"
          checked={count === options.length}
          onChange={onChange}
        />
      </div>
      <components.IndicatorSeparator {...props} />
    </>
  );
};

const SolveGraph = ({
  activityLogByTeam,
  teamColors,
  teamSort,
  shownTeams,
  highlightedTeams,
  toggleHighlight,
  clearHighlight,
}: {
  activityLogByTeam: Map<string, CSVRow[]>;
  teamColors: Map<string, string>;
  teamSort: string[];
  shownTeams: Set<string>;
  highlightedTeams: Set<string>;
  toggleHighlight: (teamName: string) => void;
  clearHighlight: () => void;
}) => {
  const [mode, setMode] = useState<"puzzles" | "metas" | "supermetas">(
    "puzzles",
  );
  const setModePuzzles = useCallback(() => {
    setMode("puzzles");
  }, []);
  const setModeMetas = useCallback(() => {
    setMode("metas");
  }, []);
  const setModeSupermetas = useCallback(() => {
    setMode("supermetas");
  }, []);

  const puzzleSet = useMemo(() => {
    switch (mode) {
      case "puzzles":
        return puzzleSlugs;
      case "metas":
        return metaSlugs;
      case "supermetas":
        return supermetaSlugs;
    }
  }, [mode]);

  const teamData = useMemo(() => {
    return teamSort.map((teamName) => {
      const solves = (activityLogByTeam.get(teamName) ?? []).filter(
        (row) =>
          row.type === "puzzle_solved" && puzzleSet.includes(row.slug ?? ""),
      );

      return {
        label: teamName,
        data: [
          { x: HuntStart, y: 0 },
          ...solves.map((solve, i) => ({
            x: solve.timestamp,
            y: i + 1,
          })),
        ],
        backgroundColor: teamColors.get(teamName),
        borderColor: teamColors.get(teamName),
      };
    });
  }, [activityLogByTeam, puzzleSet, teamColors, teamSort]);

  const onChartClick = useChartClickHandler({
    toggleHighlight,
    clearHighlight,
  });

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    animation: {
      duration: 200,
    },
    onClick: onChartClick,
    scales: {
      x: TimeAxisOptions(),
      y: {
        title: {
          text: "Solves",
          display: true,
        },
        min: 0,
        suggestedMax: shownTeams.size === 0 ? puzzleSet.length : undefined,
      },
    },
    datasets: {
      line: {
        borderWidth: 2,
        pointRadius: 2,
        stepped: true,
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

  const datasets = useFilteredDatasets<"line", { x: DateTime; y: number }[]>({
    datasets: teamData,
    shownTeams,
    highlightedTeams,
  });

  return (
    <>
      <div>
        <input
          type="radio"
          id="puzzles"
          name="mode"
          checked={mode === "puzzles"}
          onChange={setModePuzzles}
        />
        <label htmlFor="puzzles">All puzzles</label>
        <input
          type="radio"
          id="metas"
          name="mode"
          checked={mode === "metas"}
          onChange={setModeMetas}
        />
        <label htmlFor="metas">Metapuzzless</label>
        <input
          type="radio"
          id="supermetas"
          name="mode"
          checked={mode === "supermetas"}
          onChange={setModeSupermetas}
        />
        <label htmlFor="supermetas">Supermetapuzzles</label>
      </div>
      <Chart>
        <Line options={chartOptions} data={{ datasets }} />
      </Chart>
    </>
  );
};

const TeamSizeVsSolveGraph = ({
  activityLogByTeam,
  teamInfo,
  teamColors,
  teamSort,
  shownTeams,
  highlightedTeams,
  toggleHighlight,
  clearHighlight,
}: {
  activityLogByTeam: Map<string, CSVRow[]>;
  teamInfo: TeamInfo;
  teamColors: Map<string, string>;
  teamSort: string[];
  shownTeams: Set<string>;
  highlightedTeams: Set<string>;
  toggleHighlight: (teamName: string) => void;
  clearHighlight: () => void;
}) => {
  const labelCallback = useCallback(
    (item: TooltipItem<"scatter">) => [
      item.dataset.label ?? "",
      `Team size: ${item.parsed.x}`,
      `Solves: ${item.parsed.y}`,
    ],
    [],
  );

  const onChartClick = useChartClickHandler({
    toggleHighlight,
    clearHighlight,
  });

  const chartOptions: ChartOptions<"scatter"> = {
    responsive: true,
    onClick: onChartClick,
    animation: {
      duration: 200,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Team Size (self-reported)",
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...[...teamInfo.values()].map((v) => v.people)),
      },
      y: {
        title: {
          display: true,
          text: "Solves",
        },
        suggestedMin: 0,
        suggestedMax: puzzleSlugs.length,
      },
    },
    elements: {
      point: {
        radius: 7,
        hoverRadius: 10,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: labelCallback,
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

  const allDatasets = useMemo(() => {
    return teamSort.map((teamName) => {
      const solves = (activityLogByTeam.get(teamName) ?? []).filter(
        (row) => row.type === "puzzle_solved",
      ).length;
      const teamSize = teamInfo.get(teamName)?.people ?? 0;
      const color = teamColors.get(teamName);
      return {
        label: teamName,
        data: [{ x: teamSize, y: solves }],
        backgroundColor: color,
      };
    });
  }, [activityLogByTeam, teamColors, teamInfo, teamSort]);
  const datasets = useFilteredDatasets<"scatter", { x: number; y: number }[]>({
    datasets: allDatasets,
    shownTeams,
    highlightedTeams,
  });

  return (
    <Chart>
      <Scatter options={chartOptions} data={{ datasets }} />
    </Chart>
  );
};

const GuessVsSolveGraph = ({
  activityLogByTeam,
  teamInfo,
  teamColors,
  teamSort,
  shownTeams,
  highlightedTeams,
  toggleHighlight,
  clearHighlight,
}: {
  activityLogByTeam: Map<string, CSVRow[]>;
  teamInfo: TeamInfo;
  teamColors: Map<string, string>;
  teamSort: string[];
  shownTeams: Set<string>;
  highlightedTeams: Set<string>;
  toggleHighlight: (teamName: string) => void;
  clearHighlight: () => void;
}) => {
  const SIZE_SCALE_FACTOR = 5;

  const labelCallback = useCallback((item: TooltipItem<"bubble">) => {
    return [
      item.dataset.label ?? "",
      `Team size: ${item.parsed._custom * SIZE_SCALE_FACTOR}`,
      `Guesses: ${item.parsed.x}`,
      `Solves: ${item.parsed.y}`,
    ];
  }, []);

  const onChartClick = useChartClickHandler({
    toggleHighlight,
    clearHighlight,
  });

  const options: ChartOptions<"bubble"> = {
    responsive: true,
    onClick: onChartClick,
    animation: {
      duration: 200,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Guesses",
        },
        suggestedMin: 0,
      },
      y: {
        title: {
          display: true,
          text: "Solves",
        },
        suggestedMin: 0,
        suggestedMax: puzzleSlugs.length,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: labelCallback,
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

  const allDatasets = useMemo(() => {
    return teamSort.map((teamName) => {
      const solves = (activityLogByTeam.get(teamName) ?? []).filter(
        (row) => row.type === "puzzle_solved",
      ).length;
      const guesses = (activityLogByTeam.get(teamName) ?? []).filter(
        (row) => row.type === "puzzle_guess_submitted",
      ).length;
      const teamSize = teamInfo.get(teamName)?.people ?? 0;
      const color = teamColors.get(teamName);
      return {
        label: teamName,
        data: [{ x: guesses, y: solves, r: teamSize / SIZE_SCALE_FACTOR }],
        backgroundColor: color,
        borderColor: color,
      };
    });
  }, [activityLogByTeam, teamColors, teamInfo, teamSort]);

  const datasets = useFilteredDatasets<
    "bubble",
    { x: number; y: number; r: number }[]
  >({
    datasets: allDatasets,
    shownTeams,
    highlightedTeams,
  });

  return (
    <Chart>
      <Bubble options={options} data={{ datasets }} />
    </Chart>
  );
};

type KeysOverTime = { timestamp: DateTime; keys: Map<string, number> }[];

const KeyGraphSingle = ({
  keysOverTime,
  teamName,
}: {
  keysOverTime: KeysOverTime;
  teamName: string;
}) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    animation: {
      duration: 200,
    },
    scales: {
      x: TimeAxisOptions(),
      y: {
        title: {
          text: "Keys",
          display: true,
        },
      },
    },
    datasets: {
      line: {
        stepped: true,
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

  const data = useMemo(() => {
    const data = keysOverTime.map(({ timestamp, keys }) => ({
      x: timestamp,
      y: keys.get(teamName) ?? 0,
    }));
    return {
      datasets: [
        {
          data: data.reduce<{ x: DateTime; y: number }[]>((acc, e) => {
            const last = acc[acc.length - 1];
            if (!last || last.y !== e.y) {
              acc.push(e);
            }
            return acc;
          }, []),
        },
      ],
    };
  }, [keysOverTime, teamName]);

  return (
    <Chart>
      <Line options={options} data={data} />
    </Chart>
  );
};

const KeyGraphDistribution = ({
  keysOverTime,
  shownTeams,
}: {
  keysOverTime: KeysOverTime;
  shownTeams: Set<string>;
}) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    animation: {
      duration: 200,
    },
    datasets: {
      line: {
        pointStyle: false,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: TimeAxisOptions(),
      y: {
        title: {
          text: "Keys",
          display: true,
        },
      },
    },
    plugins: {
      decimation: {
        enabled: true,
        algorithm: "lttb",
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

  const distributions = useMemo(() => {
    return keysOverTime.map(({ timestamp, keys }) => {
      const values = [...shownTeams]
        .flatMap((t) => {
          const value = keys.get(t);
          return value !== undefined ? [value] : [];
        })
        .sort((a, b) => a - b);
      const p1 = values[Math.floor(values.length * 0.01)] ?? 0;
      const p10 = values[Math.floor(values.length * 0.1)] ?? 0;
      const p25 = values[Math.floor(values.length * 0.25)] ?? 0;
      const p50 = values[Math.floor(values.length * 0.5)] ?? 0;
      const p75 = values[Math.floor(values.length * 0.75)] ?? 0;
      const p90 = values[Math.floor(values.length * 0.9)] ?? 0;
      const p99 = values[Math.floor(values.length * 0.99)] ?? 0;

      return { x: timestamp, p1, p10, p25, p50, p75, p90, p99 };
    });
  }, [keysOverTime, shownTeams]);

  const blue = (a: number) => `rgba(54, 162, 235, ${a})`;

  const data = {
    datasets: [
      {
        label: "p1",
        data: distributions,
        parsing: {
          yAxisKey: "p1",
        },
        fill: "+1",
        borderColor: blue(0.1),
        backgroundColor: blue(0.1),
      },
      {
        label: "p10",
        data: distributions,
        parsing: {
          yAxisKey: "p10",
        },
        fill: "+1",
        borderColor: blue(0.25),
        backgroundColor: blue(0.25),
      },
      {
        label: "p25",
        data: distributions,
        parsing: {
          yAxisKey: "p25",
        },
        fill: "+1",
        borderColor: blue(0.5),
        backgroundColor: blue(0.5),
      },
      {
        label: "Median",
        data: distributions,
        parsing: {
          yAxisKey: "p50",
        },
        borderColor: blue(1),
        backgroundColor: blue(1),
      },
      {
        label: "p75",
        data: distributions,
        parsing: {
          yAxisKey: "p75",
        },
        fill: "-1",
        borderColor: blue(0.5),
        backgroundColor: blue(0.5),
      },
      {
        label: "p90",
        data: distributions,
        parsing: {
          yAxisKey: "p90",
        },
        fill: "-1",
        borderColor: blue(0.25),
        backgroundColor: blue(0.25),
      },
      {
        label: "p99",
        data: distributions,
        parsing: {
          yAxisKey: "p99",
        },
        fill: "-1",
        borderColor: blue(0.1),
        backgroundColor: blue(0.1),
      },
    ],
  };

  return (
    <Chart>
      <Line
        plugins={[Decimation, Legend, Filler]}
        options={options}
        data={data}
      />
    </Chart>
  );
};

const KeyGraph = ({
  activityLog,
  teamSort,
  shownTeams,
  highlightedTeams,
}: {
  activityLog: CSVRow[];
  teamSort: string[];
  shownTeams: Set<string>;
  highlightedTeams: Set<string>;
}) => {
  const keysOverTime = useMemo(() => {
    const runningTally = new Map(teamSort.map((t) => [t, 9]));
    const keysOverTime: KeysOverTime = [
      { timestamp: HuntStart, keys: new Map(runningTally) },
    ];

    activityLog.forEach(({ timestamp, team_name, keys_delta }) => {
      if (keys_delta === 0) return;

      runningTally.set(
        team_name,
        (runningTally.get(team_name) ?? 0) + keys_delta,
      );
      keysOverTime.push({ timestamp, keys: new Map(runningTally) });
    });

    keysOverTime.push({ timestamp: HuntEnd, keys: new Map(runningTally) });
    return keysOverTime;
  }, [activityLog, teamSort]);

  const chosen =
    highlightedTeams.size !== 0
      ? shownTeams.intersection(highlightedTeams)
      : shownTeams;

  if (chosen.size === 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we just checked that shownTeams.size === 1
    const teamName = [...chosen][0]!;
    return <KeyGraphSingle keysOverTime={keysOverTime} teamName={teamName} />;
  }
  return (
    <KeyGraphDistribution keysOverTime={keysOverTime} shownTeams={chosen} />
  );
};

const MostLeastSolvedPuzzleGraph = ({
  activityLog,
  mode,
}: {
  activityLog: CSVRow[];
  mode: "most" | "least";
}) => {
  const ShowCount = 20;

  const data = useMemo(() => {
    const solves = activityLog.reduce((acc, row) => {
      if (row.type === "puzzle_solved" && row.slug) {
        acc.set(row.slug, (acc.get(row.slug) ?? 0) + 1);
      }
      return acc;
    }, new Map<string, number>());
    const sorted = [...solves.entries()]
      .sort((a, b) => a[1] - b[1])
      .map(([slug, count]) => ({ x: PUZZLES[slug]?.title ?? slug, y: count }));

    if (mode === "most") {
      return sorted.slice(-ShowCount).reverse();
    } else {
      return sorted.slice(0, ShowCount);
    }
  }, [activityLog, mode]);

  return (
    <Chart>
      <Bar data={{ datasets: [{ data }] }} />
    </Chart>
  );
};

const MostPurchasedPuzzleGraph = ({
  activityLog,
}: {
  activityLog: CSVRow[];
}) => {
  // Show puzzles that were purchased more than Threshold times
  const Threshold = 5;

  const data = useMemo(() => {
    const purchases = activityLog.reduce((acc, row) => {
      if (row.type === "puzzle_answer_bought" && row.slug) {
        acc.set(row.slug, (acc.get(row.slug) ?? 0) + 1);
      }
      return acc;
    }, new Map<string, number>());
    const sorted = [...purchases.entries()]
      .sort((a, b) => a[1] - b[1])
      .map(([slug, count]) => ({ x: PUZZLES[slug]?.title ?? slug, y: count }))
      .filter(({ y }) => y > Threshold)
      .reverse();
    return sorted;
  }, [activityLog]);

  return (
    <Chart>
      <Bar data={{ datasets: [{ data }] }} />
    </Chart>
  );
};

const HintGraph = ({
  activityLog,
  hintAvailability,
}: {
  activityLog: CSVRow[];
  hintAvailability: HintAvailabilityRow[];
}) => {
  const data: ChartData<"line", { x: DateTime; y: number }[]> = useMemo(() => {
    const requestsByHour = new Map<number, number>();
    const responsesByHour = new Map<number, number>();

    // Iterate from HuntStart to HuntHQClose and fill in any missing hours
    const start = HuntStart.startOf("hour");
    const end = HuntHQClose;
    const allHours: number[] = [];
    for (let hour = start; hour <= end; hour = hour.plus({ hours: 1 })) {
      allHours.push(hour.toMillis());
    }
    activityLog.forEach((row) => {
      const hour = allHours.findLast((h) => h <= row.timestamp.toMillis());
      if (!hour || row.timestamp > HuntHQClose) {
        return;
      }

      if (row.type === "puzzle_hint_requested") {
        requestsByHour.set(hour, (requestsByHour.get(hour) ?? 0) + 1);
      }
      if (row.type === "puzzle_hint_responded") {
        responsesByHour.set(hour, (responsesByHour.get(hour) ?? 0) + 1);
      }
    });

    const hintData: { x: DateTime; y: number }[] = [{ x: HuntStart, y: 0 }];
    hintAvailability.forEach((row) => {
      const last = hintData[hintData.length - 1];
      if (last && row.timestamp.diff(last.x).as("minutes") < 5) {
        last.y += 1;
      } else {
        hintData.push({ x: row.timestamp, y: 1 });
      }
    });
    hintData.push({ x: HuntEnd, y: 0 });
    let cumulativeHints = 0;
    hintData.forEach((row) => {
      cumulativeHints += row.y;
      row.y = cumulativeHints;
    });

    return {
      datasets: [
        {
          label: "Requests",
          data: allHours.map((hour) => ({
            x: DateTime.fromMillis(hour),
            y: requestsByHour.get(hour) ?? 0,
          })),
        },
        {
          label: "Responses",
          data: allHours.map((hour) => ({
            x: DateTime.fromMillis(hour),
            y: responsesByHour.get(hour) ?? 0,
          })),
        },
        {
          label: "Puzzles with Hints Available",
          yAxisID: "y2",
          data: hintData,
        },
      ],
    };
  }, [activityLog, hintAvailability]);

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
      x: TimeAxisOptions({ end: HuntHQClose }),
      y: {
        title: {
          text: "Hints",
          display: true,
        },
        min: 0,
      },
      y2: {
        position: "right",
        title: {
          text: "Puzzles with Hints Available",
          display: true,
        },
        min: 0,
        max: Math.max(
          0,
          ...data.datasets.map((d) =>
            d.yAxisID === "y2" ? d.data[d.data.length - 1]?.y ?? 0 : 0,
          ),
        ),
        grid: {
          drawOnChartArea: false,
        },
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
      <Line plugins={[Legend]} options={options} data={data} />
    </Chart>
  );
};

const InteractionResultGraph = ({ activityLog }: { activityLog: CSVRow[] }) => {
  const options: ChartOptions<"bar"> = {
    datasets: {
      bar: {
        maxBarThickness: 100,
      },
    },
    scales: { y: { stacked: true } },
  };

  const data = useMemo(() => {
    const resultLogs = activityLog.filter(
      (
        row,
      ): row is CSVRow & {
        type: "interaction_completed";
        slug: string;
        result: string;
      } =>
        row.type === "interaction_completed" &&
        row.slug !== undefined &&
        row.result !== undefined,
    );

    const allResults = new Map<
      string /* slug */,
      Map<string /* result */, number>
    >();
    resultLogs.forEach(({ slug, result }) => {
      if (!allResults.has(slug)) {
        allResults.set(slug, new Map());
      }
      const resultMap = allResults.get(slug);
      if (resultMap) {
        resultMap.set(result, (resultMap.get(result) ?? 0) + 1);
      }
    });

    // Filter to just slugs that have more than one result
    const results = new Map(
      [...allResults.entries()].filter(([_, resultMap]) => resultMap.size > 1),
    );

    const label = (slug: string) => INTERACTIONS[slug]?.title ?? slug;
    const labels = [...results.keys()].map((slug) => label(slug)).sort();

    const datasets = [...results.entries()].flatMap(([slug, resultMap]) => {
      const title = INTERACTIONS[slug]?.title ?? slug;
      return [...resultMap.entries()]
        .toSorted(([r1], [r2]) => (r1 < r2 ? -1 : 1))
        .map(([result, count]) => {
          const formatResult = result
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          return {
            label: formatResult,
            data: [{ x: title, y: count }],
            stack: "bar",
          };
        });
    });

    return { labels, datasets };
  }, [activityLog]);

  return (
    <Chart>
      <Bar options={options} data={data} />
    </Chart>
  );
};

const App = ({
  activityLog,
  teamInfo,
  hintAvailability,
}: {
  activityLog: CSVRow[];
  teamInfo: TeamInfo;
  hintAvailability: HintAvailabilityRow[];
}) => {
  const { activityLogByTeam, teamColors, teamSort } = useMemo(() => {
    const teamNames = new Set(activityLog.map((row) => row.team_name));

    const colorSeed = "69e9b9f788167e553590980effd498e9";
    const colorRandom = seedrandom(colorSeed);

    // Taken from https://github.com/ttbnl-2024/mitmh-2024-pre-posthunt/blob/e5ac8d23013c7f69fb2a48a696f0877e4d3ebd1c/server/spoilr/progress/views/graph_views.py#L324
    const teamColors = new Map(
      [...teamNames].map((teamName) => {
        const color = `hsl(${colorRandom() * 360} ${colorRandom() * 50 + 30}% ${colorRandom() * 50 + 25}%)`;
        return [teamName, color];
      }),
    );

    const activityLogByTeam = new Map<string, CSVRow[]>();
    activityLog.forEach((row) => {
      const teamActivity = activityLogByTeam.get(row.team_name) ?? [];
      teamActivity.push(row);
      activityLogByTeam.set(row.team_name, teamActivity);
    });

    // We need some way to sort teams for display purposes, even though this is not
    // an official placement order.
    //
    // We want teams that finished to sort first, then sort by number of puzzles
    // solved. To do that, we'll compute a sort index which is:
    // - If the team unlocked The Vault, the number of milliseconds that occurred
    //   before the largest timestamp in the log (this will be negative)
    // - Otherwise, the number of puzzles *un*solved
    const teamSort = [...activityLogByTeam.entries()]
      .map(([teamName, teamActivity]) => {
        const vaultUnlock = teamActivity.find(
          (row) =>
            row.type === "interaction_unlocked" && row.slug === "the_vault",
        );
        const puzzlesSolved = teamActivity.filter(
          (row) => row.type === "puzzle_solved",
        ).length;
        const sort = vaultUnlock
          ? vaultUnlock.timestamp.diff(HuntEnd).milliseconds
          : slugToSlot.size - puzzlesSolved;
        return { teamName, sort };
      })
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.teamName);

    return {
      activityLog,
      activityLogByTeam,
      teamNames,
      teamColors,
      teamSort,
    };
  }, [activityLog]);

  const [shownTeams, setShownTeams] = useState(new Set<string>());
  useEffect(() => {
    setShownTeams(new Set(teamSort));
  }, [teamSort]);

  const [highlightedTeams, setHighlightedTeams] = useState(new Set<string>());
  const toggleHighlight = useCallback((teamName: string) => {
    setHighlightedTeams((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(teamName)) {
        newSet.delete(teamName);
      } else {
        newSet.add(teamName);
      }
      return newSet;
    });
  }, []);
  const clearHighlight = useCallback(() => {
    setHighlightedTeams(new Set());
  }, []);

  const selectOptions = useMemo(
    () =>
      teamSort.toSorted().map((teamName) => ({
        value: teamName,
        label: teamName,
      })),
    [teamSort],
  );
  const selectStyles: StylesConfig<TeamSelectOption, true> = {
    container: useCallback((base: CSSObjectWithLabel) => {
      return { ...base, flex: "1" };
    }, []),
    option: useCallback((base: CSSObjectWithLabel) => {
      return { ...base, color: "var(--black)" };
    }, []),
  };

  const onHighlightSelectChange = useCallback(
    (option: readonly TeamSelectOption[] | null) => {
      setHighlightedTeams(new Set(option?.map((o) => o.value)));
    },
    [],
  );
  const highlightSelectValue = useMemo(
    () => selectOptions.filter((option) => highlightedTeams.has(option.value)),
    [highlightedTeams, selectOptions],
  );
  const onShowSelectChange = useCallback(
    (option: readonly TeamSelectOption[] | null) => {
      setShownTeams(new Set(option?.map((o) => o.value)));
    },
    [],
  );
  const showSelectValue = useMemo(
    () => selectOptions.filter((option) => shownTeams.has(option.value)),
    [shownTeams, selectOptions],
  );

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span>Show/hide team(s)</span>
        <Select
          components={{
            IndicatorSeparator: TeamMultiSelectIndicatorSeparator,
          }}
          controlShouldRenderValue={showSelectValue.length <= 5}
          placeholder={
            showSelectValue.length === selectOptions.length
              ? "All teams selected"
              : `${showSelectValue.length} teams selected`
          }
          styles={selectStyles}
          isClearable
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          value={showSelectValue}
          onChange={onShowSelectChange}
          options={selectOptions}
        />

        <span>Highlight team(s)</span>
        <Select
          styles={selectStyles}
          controlShouldRenderValue={highlightSelectValue.length <= 5}
          placeholder={
            highlightSelectValue.length === selectOptions.length
              ? "All teams selected"
              : `${highlightSelectValue.length} teams selected`
          }
          isClearable
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          value={highlightSelectValue}
          onChange={onHighlightSelectChange}
          options={selectOptions}
        />
      </div>

      <h2>Solve Graph</h2>
      <SolveGraph
        activityLogByTeam={activityLogByTeam}
        teamColors={teamColors}
        teamSort={teamSort}
        shownTeams={shownTeams}
        highlightedTeams={highlightedTeams}
        toggleHighlight={toggleHighlight}
        clearHighlight={clearHighlight}
      />

      <h2>Team Size vs. Solves</h2>
      <TeamSizeVsSolveGraph
        activityLogByTeam={activityLogByTeam}
        teamInfo={teamInfo}
        teamColors={teamColors}
        teamSort={teamSort}
        shownTeams={shownTeams}
        highlightedTeams={highlightedTeams}
        toggleHighlight={toggleHighlight}
        clearHighlight={clearHighlight}
      />

      <h2>Guesses vs. Solves</h2>
      <GuessVsSolveGraph
        activityLogByTeam={activityLogByTeam}
        teamInfo={teamInfo}
        teamColors={teamColors}
        teamSort={teamSort}
        shownTeams={shownTeams}
        highlightedTeams={highlightedTeams}
        toggleHighlight={toggleHighlight}
        clearHighlight={clearHighlight}
      />

      <h2>Available Keys Over Time</h2>
      <p>
        If exactly one team is highlighted (or is the only team shown), this
        shows the number of keys available to that team over time. Otherwise, it
        shows the distribution of all highlighted teams.
      </p>
      <KeyGraph
        activityLog={activityLog}
        teamSort={teamSort}
        shownTeams={shownTeams}
        highlightedTeams={highlightedTeams}
      />

      <h2>Most Solved Puzzles</h2>
      <MostLeastSolvedPuzzleGraph activityLog={activityLog} mode="most" />

      <h2>Least Solved Puzzles</h2>
      <MostLeastSolvedPuzzleGraph activityLog={activityLog} mode="least" />

      <h2>Most Purchased Answers</h2>
      <MostPurchasedPuzzleGraph activityLog={activityLog} />

      <h2>Hints</h2>
      <p>
        This does not include in-person hints given out at the Gala by our Press
        Corps. It is also possible that there are more responses than requests,
        as our hinters were able to provide unsolicited replies (if, e.g., they
        needed to follow up on a previous response).
      </p>
      <HintGraph
        activityLog={activityLog}
        hintAvailability={hintAvailability}
      />

      <h2>Virtual Interactions</h2>
      <p>
        Each of the virtual witness interviews gave teams an item that remained
        pinned to their cork board, based on the choices they made. Here is the
        breakdown of results for each of the three interactions with multiple
        potential rewards (the{" "}
        <a href={`${rootUrl}/interactions/interview_at_the_jewelry_store`}>
          Interview at the Jewelry Store
        </a>{" "}
        always resulted in getting Micah’s phone number)
      </p>
      <InteractionResultGraph activityLog={activityLog} />
    </>
  );
};

const fetchActivityLog = async ({ signal }: { signal: AbortSignal }) => {
  const response = await fetch(activityLogUrl, {
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch activity log: ${response.status} ${response.statusText}`,
    );
  }

  const raw = await response.text();
  const log = parse(raw, {
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
  }) as CSVRow[];

  return log;
};

const fetchTeamInfo = async ({ signal }: { signal: AbortSignal }) => {
  const response = await fetch(teamInfoUrl, {
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch team info: ${response.status} ${response.statusText}`,
    );
  }

  const raw = await response.text();
  const info = parse(raw, {
    columns: true,
    cast: (value, context) => {
      if (context.column === "people") {
        return parseInt(value, 10);
      }
      return value;
    },
  }) as { team_name: string; people: number }[];

  return new Map(info.map((row) => [row.team_name, { people: row.people }]));
};

const fetchHintAvailability = async ({ signal }: { signal: AbortSignal }) => {
  const response = await fetch(hintAvailabilityUrl, {
    signal,
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch hint availability: ${response.status} ${response.statusText}`,
    );
  }
  const raw = await response.text();
  const log = parse(raw, {
    columns: true,
    cast: (value, context) => {
      if (context.column === "timestamp") {
        return DateTime.fromSQL(value, { zone: "America/New_York" });
      }
      return value;
    },
  }) as HintAvailabilityRow[];
  return log;
};

const ActivityLogLoader = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [activityLog, setActivityLog] = useState<CSVRow[]>([]);
  const [teamInfo, setTeamInfo] = useState<TeamInfo | undefined>(undefined);
  const [hintAvailability, setHintAvailability] = useState<
    HintAvailabilityRow[]
  >([]);

  useEffect(() => {
    const abort = new AbortController();
    setLoading(true);
    void (async () => {
      try {
        const [log, info, hintAvailability] = await Promise.all([
          fetchActivityLog({ signal: abort.signal }),
          fetchTeamInfo({ signal: abort.signal }),
          fetchHintAvailability({ signal: abort.signal }),
        ]);

        setActivityLog(log);
        setTeamInfo(info);
        setHintAvailability(hintAvailability);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      abort.abort();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error || !teamInfo) {
    return (
      <ErrorText>
        An error occurred while loading additional statistics: {String(error)}
      </ErrorText>
    );
  }

  return (
    <App
      activityLog={activityLog}
      teamInfo={teamInfo}
      hintAvailability={hintAvailability}
    />
  );
};

const elem = document.getElementById("stats-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<ActivityLogLoader />);
} else {
  console.error(
    "Could not mount App because #stats-root was nowhere to be found",
  );
}
