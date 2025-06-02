import {
  type Chart as ChartJS,
  Decimation,
  Filler,
  Legend,
  type ActiveElement,
  type ChartData,
  type ChartDataset,
  type ChartEvent,
  type ChartOptions,
  type ChartType,
  type TooltipItem,
} from "chart.js";
import { type Options } from "csv-parse";
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
  type IndicatorSeparatorProps,
  type StylesConfig,
} from "react-select";
import seedrandom from "seedrandom";
import canonicalizeInput from "../../../../lib/canonicalizeInput";
import HUNT, { generateSlugToSlotMap } from "../../../huntdata";
import { MI, Math as MathML } from "../../components/MathML";
import { StyledPuzzleStatsTable } from "../../components/StatsLayout";
import { ErrorText, Mono } from "../../components/StyledUI";
import { INTERACTIONS } from "../../interactions";
import { PUZZLES } from "../../puzzles";
import rootUrl from "../../utils/rootUrl";
import Loading from "./Loading";
import {
  HuntEnd,
  HuntHQClose,
  HuntStart,
  useActivityLog,
  type ActivityLogRow,
} from "./activityLog";
import hintAvailabilityUrl from "./assets/hint_availability.csv";
import teamInfoUrl from "./assets/team_info.csv";
import {
  Chart,
  TimeAxisOptions,
  ZoomConfig,
  generateTruncatedTick,
} from "./charts";
import useCSV from "./useCSV";

const slugToSlot = generateSlugToSlotMap(HUNT);
const puzzleSlugs = [...slugToSlot.entries()].map(([slug, _]) => slug);
const metaSlugs = [...slugToSlot.entries()]
  .filter(([_, lookup]) => lookup.slot.is_meta)
  .map(([slug, _]) => slug);
const supermetaSlugs = [...slugToSlot.entries()]
  .filter(([_, lookup]) => lookup.slot.is_supermeta)
  .map(([slug, _]) => slug);

type TeamInfo = Map<string, { people: number }>;
type HintAvailabilityRow = { timestamp: DateTime; slug: string };

const makeBackgroundColor = (baseColor?: string) =>
  baseColor?.replace(")", " / 50%)");

const useHighlightClickHandler = ({
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

const puzzleClickHandler = (
  _: ChartEvent,
  elements: ActiveElement[],
  chart: ChartJS,
) => {
  const [element, ...rest] = elements;
  if (!element || rest.length > 0) return;

  const point = chart.data.datasets[element.datasetIndex]?.data[element.index];
  if (
    !point ||
    typeof point !== "object" ||
    !("slug" in point) ||
    typeof point.slug !== "string"
  )
    return;

  const { slug } = point;
  window.open(`${rootUrl}/puzzles/${slug}`, "_blank");
};

const puzzleHoverHandler = (
  _: ChartEvent,
  elements: ActiveElement[],
  chart: ChartJS,
) => {
  chart.canvas.style.cursor = elements.length > 0 ? "pointer" : "default";
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
            ? {
                backgroundColor: makeBackgroundColor(deselectedColor),
                borderColor: deselectedColor,
              }
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
  activityLogByTeam: Map<string, ActivityLogRow[]>;
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
        backgroundColor: makeBackgroundColor(teamColors.get(teamName)),
        borderColor: makeBackgroundColor(teamColors.get(teamName)),
      };
    });
  }, [activityLogByTeam, puzzleSet, teamColors, teamSort]);

  const onChartClick = useHighlightClickHandler({
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
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHitRadius: 10,
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

const RoundSolveGraph = ({
  activityLogByTeam,
  teamSort,
  shownTeams,
  highlightedTeams,
}: {
  activityLogByTeam: Map<string, ActivityLogRow[]>;
  teamSort: string[];
  shownTeams: Set<string>;
  highlightedTeams: Set<string>;
}) => {
  const unfilteredData = useMemo(() => {
    // Because we want the series in the graph to be rounds, we need to generate
    // round -> [team, time][]

    // Map<round title, supermeta slug>
    const supermetas = new Map(
      HUNT.rounds.flatMap((r) => {
        const supermeta = r.puzzles.find((p) => p.is_supermeta);
        if (!supermeta?.slug) return [];
        return [[r.title, supermeta.slug]];
      }),
    );

    const datasets = [...supermetas.entries()].map(([round, supermeta]) => {
      return {
        label: round.replace(/^The /, ""),
        data: teamSort.flatMap((teamName) => {
          const activity = activityLogByTeam.get(teamName) ?? [];
          const solveTime = activity.find(
            (e) => e.type === "puzzle_solved" && e.slug === supermeta,
          )?.timestamp;
          return solveTime ? [{ x: solveTime, y: teamName }] : [];
        }),
      };
    });

    return { datasets };
  }, [activityLogByTeam, teamSort]);

  const filterSet = useMemo(
    () =>
      highlightedTeams.size === 0
        ? shownTeams
        : shownTeams.intersection(highlightedTeams),
    [highlightedTeams, shownTeams],
  );

  const filteredTeams = useMemo(
    () => teamSort.filter((t) => filterSet.has(t)).slice(0, 20),
    [teamSort, filterSet],
  );

  const data = useMemo(() => {
    const { datasets } = unfilteredData;
    const teamset = new Set(filteredTeams);

    return {
      datasets: datasets.map((d) => ({
        ...d,
        data: d.data.filter(({ y }) => teamset.has(y)),
      })),
    };
  }, [unfilteredData, filteredTeams]);

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
        type: "category",
        labels: filteredTeams,
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
  activityLogByTeam: Map<string, ActivityLogRow[]>;
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

  const onChartClick = useHighlightClickHandler({
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
        backgroundColor: makeBackgroundColor(color),
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
  activityLogByTeam: Map<string, ActivityLogRow[]>;
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

  const onChartClick = useHighlightClickHandler({
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
        backgroundColor: makeBackgroundColor(color),
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

type ResourceOverTime = {
  timestamp: DateTime;
  resources: Map<string, number>;
}[];

const ResourceOverTimeSingle = ({
  resourcesOverTime,
  resource,
  teamName,
  baseColor,
  aspectRatio,
}: {
  resourcesOverTime: ResourceOverTime;
  resource: string;
  teamName: string;
  baseColor: [r: number, g: number, b: number];
  aspectRatio?: number;
}) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    aspectRatio: aspectRatio ? 1 / aspectRatio : undefined,
    animation: {
      duration: 200,
    },
    scales: {
      x: TimeAxisOptions(),
      y: {
        title: {
          text: resource,
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
    const data = resourcesOverTime
      .map(({ timestamp, resources }) => ({
        x: timestamp,
        y: resources.get(teamName) ?? 0,
      }))
      .reduce<{ x: DateTime; y: number }[]>((acc, e) => {
        const last = acc[acc.length - 1];
        if (!last || last.y !== e.y) {
          acc.push(e);
        }
        return acc;
      }, []);

    const last = data[data.length - 1];
    if (last) {
      data.push({ x: HuntEnd, y: last.y });
    }

    const color = `rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]})`;
    return {
      datasets: [
        {
          data,
          backgroundColor: color,
          borderColor: color,
        },
      ],
    };
  }, [baseColor, resourcesOverTime, teamName]);

  return (
    <Chart $aspectRatio={aspectRatio}>
      <Line options={options} data={data} />
    </Chart>
  );
};

const ResourceOverTimeDistribution = ({
  resourcesOverTime,
  resource,
  shownTeams,
  baseColor,
  aspectRatio,
}: {
  resourcesOverTime: ResourceOverTime;
  resource: string;
  shownTeams: Set<string>;
  baseColor: [r: number, g: number, b: number];
  aspectRatio?: number;
}) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    aspectRatio: aspectRatio ? 1 / aspectRatio : undefined,
    animation: {
      duration: 200,
    },
    datasets: {
      line: {
        pointStyle: false,
        stepped: true,
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
          text: resource,
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
    return resourcesOverTime
      .reduce<ResourceOverTime>((acc, { timestamp, resources }) => {
        const last = acc[acc.length - 1];
        if (last && timestamp.diff(last.timestamp).as("minutes") < 1) {
          last.resources = resources;
        } else if (!last || timestamp.diff(last.timestamp).as("minutes") > 5) {
          acc.push({ timestamp, resources });
        }
        return acc;
      }, [])
      .map(({ timestamp, resources }) => {
        const values = [...shownTeams]
          .flatMap((t) => {
            const value = resources.get(t);
            return value !== undefined ? [value] : [];
          })
          .sort((a, b) => a - b);
        const p0 = values[0] ?? 0;
        const p1 = values[Math.floor(values.length * 0.01)] ?? 0;
        const p10 = values[Math.floor(values.length * 0.1)] ?? 0;
        const p25 = values[Math.floor(values.length * 0.25)] ?? 0;
        const p50 = values[Math.floor(values.length * 0.5)] ?? 0;
        const p75 = values[Math.floor(values.length * 0.75)] ?? 0;
        const p90 = values[Math.floor(values.length * 0.9)] ?? 0;
        const p99 = values[Math.floor(values.length * 0.99)] ?? 0;
        const p100 = values[values.length - 1] ?? 0;

        return { x: timestamp, p0, p1, p10, p25, p50, p75, p90, p99, p100 };
      });
  }, [resourcesOverTime, shownTeams]);

  const color = (a: number) =>
    `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${a})`;

  const data = {
    datasets: [
      {
        label: "min",
        data: distributions,
        parsing: {
          yAxisKey: "p0",
        },
        borderColor: color(0.1),
      },
      {
        label: "p1",
        data: distributions,
        parsing: {
          yAxisKey: "p1",
        },
        fill: "+1",
        borderColor: color(0.2),
        backgroundColor: color(0.2),
      },
      {
        label: "p10",
        data: distributions,
        parsing: {
          yAxisKey: "p10",
        },
        fill: "+1",
        borderColor: color(0.4),
        backgroundColor: color(0.4),
      },
      {
        label: "p25",
        data: distributions,
        parsing: {
          yAxisKey: "p25",
        },
        fill: "+1",
        borderColor: color(0.6),
        backgroundColor: color(0.6),
      },
      {
        label: "Median",
        data: distributions,
        parsing: {
          yAxisKey: "p50",
        },
        borderColor: color(1),
        backgroundColor: color(1),
      },
      {
        label: "p75",
        data: distributions,
        parsing: {
          yAxisKey: "p75",
        },
        fill: "-1",
        borderColor: color(0.6),
        backgroundColor: color(0.6),
      },
      {
        label: "p90",
        data: distributions,
        parsing: {
          yAxisKey: "p90",
        },
        fill: "-1",
        borderColor: color(0.4),
        backgroundColor: color(0.4),
      },
      {
        label: "p99",
        data: distributions,
        parsing: {
          yAxisKey: "p99",
        },
        fill: "-1",
        borderColor: color(0.2),
        backgroundColor: color(0.2),
      },
      {
        label: "max",
        data: distributions,
        parsing: {
          yAxisKey: "p100",
        },
        borderColor: color(0.1),
      },
    ],
  };

  return (
    <Chart $aspectRatio={aspectRatio}>
      <Line
        plugins={[Decimation, Legend, Filler]}
        options={options}
        data={data}
      />
    </Chart>
  );
};

const ResourceOverTimeGraph = ({
  resourcesOverTime,
  resource,
  chosenTeams,
  baseColor,
  aspectRatio,
}: {
  resourcesOverTime: ResourceOverTime;
  resource: string;
  chosenTeams: Set<string>;
  baseColor: [r: number, g: number, b: number];
  aspectRatio?: number;
}) => {
  if (chosenTeams.size === 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we just checked that shownTeams.size === 1
    const teamName = [...chosenTeams][0]!;
    return (
      <ResourceOverTimeSingle
        resourcesOverTime={resourcesOverTime}
        resource={resource}
        teamName={teamName}
        baseColor={baseColor}
        aspectRatio={aspectRatio}
      />
    );
  }
  return (
    <ResourceOverTimeDistribution
      resourcesOverTime={resourcesOverTime}
      resource={resource}
      shownTeams={chosenTeams}
      baseColor={baseColor}
      aspectRatio={aspectRatio}
    />
  );
};

const KeysCluesPuzzlesGraph = ({
  activityLog,
  teamSort,
  shownTeams,
  highlightedTeams,
}: {
  activityLog: ActivityLogRow[];
  teamSort: string[];
  shownTeams: Set<string>;
  highlightedTeams: Set<string>;
}) => {
  const { keysOverTime, cluesOverTime, puzzlesOverTime } = useMemo(() => {
    const runningKeyTally = new Map<string, number>(
      teamSort.map((t) => [t, 0]),
    );
    const keysOverTime: ResourceOverTime = [];
    const runningClueTally = new Map<string, number>(
      teamSort.map((t) => [t, 0]),
    );
    const cluesOverTime: ResourceOverTime = [
      { timestamp: HuntStart, resources: new Map(runningClueTally) },
    ];
    const runningPuzzleTally = new Map<string, number>(
      teamSort.map((t) => [t, 0]),
    );
    const puzzlesOverTime: ResourceOverTime = [
      { timestamp: HuntStart, resources: new Map(runningPuzzleTally) },
    ];

    activityLog.forEach(
      ({ timestamp, team_name, keys_delta, clues_delta, type }) => {
        const ts = timestamp < HuntStart ? HuntStart : timestamp;
        if (keys_delta !== 0) {
          runningKeyTally.set(
            team_name,
            (runningKeyTally.get(team_name) ?? 0) + keys_delta,
          );
          keysOverTime.push({
            timestamp: ts,
            resources: new Map(runningKeyTally),
          });
        }

        if (clues_delta !== 0) {
          runningClueTally.set(
            team_name,
            (runningClueTally.get(team_name) ?? 0) + clues_delta,
          );
          cluesOverTime.push({
            timestamp: ts,
            resources: new Map(runningClueTally),
          });
        }

        const puzzleDelta =
          type === "puzzle_unlocked" ? 1 : type === "puzzle_solved" ? -1 : 0;
        if (puzzleDelta !== 0) {
          runningPuzzleTally.set(
            team_name,
            (runningPuzzleTally.get(team_name) ?? 0) + puzzleDelta,
          );
          puzzlesOverTime.push({
            timestamp: ts,
            resources: new Map(runningPuzzleTally),
          });
        }
      },
    );

    keysOverTime.push({
      timestamp: HuntEnd,
      resources: new Map(runningKeyTally),
    });
    cluesOverTime.push({
      timestamp: HuntEnd,
      resources: new Map(runningClueTally),
    });
    puzzlesOverTime.push({
      timestamp: HuntEnd,
      resources: new Map(runningPuzzleTally),
    });
    return { keysOverTime, cluesOverTime, puzzlesOverTime };
  }, [activityLog, teamSort]);

  const chosen =
    highlightedTeams.size !== 0
      ? shownTeams.intersection(highlightedTeams)
      : shownTeams;

  return (
    <>
      <ResourceOverTimeGraph
        resourcesOverTime={puzzlesOverTime}
        resource="Unlocked Puzzles"
        chosenTeams={chosen}
        baseColor={[255, 99, 132]}
      />
      <ResourceOverTimeGraph
        resourcesOverTime={keysOverTime}
        resource="Keys 🗝️"
        chosenTeams={chosen}
        baseColor={[54, 162, 235]}
      />
      <ResourceOverTimeGraph
        resourcesOverTime={cluesOverTime}
        resource="Clues 🔎"
        chosenTeams={chosen}
        baseColor={[255, 159, 64]}
        aspectRatio={0.25}
      />
    </>
  );
};

const MostLeastSolvedPuzzleGraph = ({
  activityLog,
  mode,
}: {
  activityLog: ActivityLogRow[];
  mode: "most" | "least";
}) => {
  const ShowCount = 20;

  const options: ChartOptions<"bar"> = {
    onClick: puzzleClickHandler,
    onHover: puzzleHoverHandler,
    datasets: {
      bar: {
        hoverBorderWidth: 2,
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          callback: generateTruncatedTick,
        },
      },
    },
  };

  const data = useMemo(() => {
    const solves = activityLog.reduce((acc, row) => {
      if (row.type === "puzzle_solved" && row.slug) {
        acc.set(row.slug, (acc.get(row.slug) ?? 0) + 1);
      }
      return acc;
    }, new Map<string, number>());
    const sorted = [...solves.entries()]
      .sort((a, b) => a[1] - b[1])
      .map(([slug, count]) => ({
        x: PUZZLES[slug]?.title ?? slug,
        y: count,
        slug,
      }));

    if (mode === "most") {
      return sorted.slice(-ShowCount).reverse();
    } else {
      return sorted.slice(0, ShowCount);
    }
  }, [activityLog, mode]);

  return (
    <Chart>
      <Bar options={options} data={{ datasets: [{ data }] }} />
    </Chart>
  );
};

const MostPurchasedPuzzleGraph = ({
  activityLog,
}: {
  activityLog: ActivityLogRow[];
}) => {
  // Show puzzles that were purchased more than Threshold times
  const Threshold = 5;

  const options: ChartOptions<"bar"> = {
    onClick: puzzleClickHandler,
    onHover: puzzleHoverHandler,
    datasets: {
      bar: {
        hoverBorderWidth: 2,
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          callback: generateTruncatedTick,
        },
      },
    },
  };

  const data = useMemo(() => {
    const purchases = activityLog.reduce((acc, row) => {
      if (row.type === "puzzle_answer_bought" && row.slug) {
        acc.set(row.slug, (acc.get(row.slug) ?? 0) + 1);
      }
      return acc;
    }, new Map<string, number>());
    const sorted = [...purchases.entries()]
      .sort((a, b) => a[1] - b[1])
      .map(([slug, count]) => ({
        x: PUZZLES[slug]?.title ?? slug,
        y: count,
        slug,
      }))
      .filter(({ y }) => y > Threshold)
      .reverse();
    return sorted;
  }, [activityLog]);

  return (
    <Chart>
      <Bar options={options} data={{ datasets: [{ data }] }} />
    </Chart>
  );
};

const FastestSlowestUnlockGraphs = ({
  activityLogByTeam,
}: {
  activityLogByTeam: Map<string, ActivityLogRow[]>;
}) => {
  const ShowCount = 20;

  const averageUnlockDelay = useMemo(() => {
    return puzzleSlugs
      .flatMap((slug) => {
        const unlockDelays = [...activityLogByTeam.values()].flatMap((log) => {
          const unlockableIndex = log.findIndex(
            (e) => e.type === "puzzle_unlockable" && e.slug === slug,
          );
          const unlockedIndex = log.findIndex(
            (e) =>
              e.type === "puzzle_unlocked" &&
              e.slug === slug &&
              e.keys_delta !== 0,
          );

          if (unlockableIndex === -1 || unlockedIndex === -1) return [];

          return log
            .slice(unlockableIndex, unlockedIndex)
            .filter((e) => e.type === "puzzle_unlocked" && e.keys_delta !== 0)
            .length;
        });

        if (unlockDelays.length === 0) return [];

        return [
          [
            slug,
            unlockDelays.reduce((a, b) => a + b, 0) / unlockDelays.length,
          ] as const,
        ];
      })
      .sort(([, a], [, b]) => a - b);
  }, [activityLogByTeam]);

  const formatData = (d: (readonly [string, number])[]) => ({
    datasets: [
      {
        data: d.map(([slug, delay]) => ({
          x: PUZZLES[slug]?.title ?? slug,
          y: delay,
          slug,
        })),
      },
    ],
  });

  const fastestData = useMemo(
    () => formatData(averageUnlockDelay.slice(0, ShowCount)),
    [averageUnlockDelay],
  );
  const slowestData = useMemo(
    () => formatData(averageUnlockDelay.slice(-ShowCount).reverse()),
    [averageUnlockDelay],
  );

  const options: ChartOptions<"bar"> = {
    onClick: puzzleClickHandler,
    onHover: puzzleHoverHandler,
    datasets: {
      bar: {
        hoverBorderWidth: 2,
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: { callback: generateTruncatedTick },
      },
    },
  };

  return (
    <>
      <h2>Fastest Unlocks</h2>
      <p>
        This shows the puzzles that teams were most eager to unlock. For each
        puzzle, it shows the average number of <em>other</em> puzzles that were
        unlocked between when this puzzle became unlockable and when it was
        unlocked.
      </p>
      <Chart>
        <Bar options={options} data={fastestData} />
      </Chart>
      <h2>Slowest Unlocks</h2>
      <p>
        This shows the puzzles that teams were <em>least</em> eager to unlock.
      </p>
      <Chart>
        <Bar options={options} data={slowestData} />
      </Chart>
    </>
  );
};

const HintGraph = ({
  activityLog,
  hintAvailability,
}: {
  activityLog: ActivityLogRow[];
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
          stepped: true,
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

const RoundDistributionGraph = ({
  activityLogByTeam,
}: {
  activityLogByTeam: Map<string, ActivityLogRow[]>;
}) => {
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
      x: {
        type: "linear",
      },
      y: {
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
  const data = useMemo(() => {
    const maxUnlocks = Math.max(
      ...[...activityLogByTeam.values()].map(
        (t) =>
          t.filter((e) => e.type === "puzzle_unlocked" && e.keys_delta !== 0)
            .length,
      ),
    );

    const unlocks = new Map<string, number[]>(
      HUNT.rounds.map((r) => [r.slug, Array<number>(maxUnlocks).fill(0)]),
    );

    activityLogByTeam.forEach((log) => {
      let solveCount = 0;
      log.forEach((e) => {
        if (e.type !== "puzzle_unlocked" || e.keys_delta === 0) return;

        const { roundSlug } = slugToSlot.get(e.slug ?? "") ?? {};
        if (!roundSlug) return;

        const roundUnlocks = unlocks.get(roundSlug);
        if (!roundUnlocks) return;

        roundUnlocks[solveCount] = (roundUnlocks[solveCount] ?? 0) + 1;
        solveCount += 1;
      });
    });

    return {
      datasets: [...unlocks.entries()]
        .filter(
          ([roundSlug]) =>
            roundSlug !== "missing_diamond" &&
            roundSlug !== "floaters" &&
            roundSlug !== "events" &&
            roundSlug !== "endgame",
        )
        .map(([roundSlug, roundUnlocks], i) => {
          const label =
            HUNT.rounds.find((r) => r.slug === roundSlug)?.title ?? roundSlug;
          return {
            label,
            data: roundUnlocks.map((v, i) => ({ x: i + 1, y: v })),
            fill: i === 0 ? "origin" : "-1",
          };
        }),
    };
  }, [activityLogByTeam]);

  return (
    <Chart>
      <Line plugins={[Filler, Legend]} options={options} data={data} />
    </Chart>
  );
};

const InteractionResultGraph = ({
  activityLog,
}: {
  activityLog: ActivityLogRow[];
}) => {
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
      ): row is ActivityLogRow & {
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

    const datasets = [...results.entries()]
      .toSorted(([a], [b]) => a.localeCompare(b))
      .flatMap(([slug, resultMap]) => {
        const title = INTERACTIONS[slug]?.title ?? slug;
        return [...resultMap.entries()]
          .toSorted(([r1], [r2]) => r1.localeCompare(r2))
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

const MostBacksolvedTable = ({
  activityLog,
}: {
  activityLog: ActivityLogRow[];
}) => {
  const data = useMemo(() => {
    const allAnswers = new Map(
      Object.entries(PUZZLES).map(([slug, puzzle]) => [
        canonicalizeInput(puzzle.answer),
        slug,
      ]),
    );

    const wrongCount = activityLog.reduce<Map<string, number>>((acc, row) => {
      if (row.type !== "puzzle_guess_submitted") return acc;
      if (row.result === "correct") return acc;
      if (!row.answer) return acc;

      const correctSlug = allAnswers.get(row.answer);
      if (!correctSlug) return acc;

      acc.set(correctSlug, (acc.get(correctSlug) ?? 0) + 1);
      return acc;
    }, new Map());

    return [...wrongCount.entries()]
      .toSorted(([, a], [, b]) => b - a)
      .filter(([, count]) => count >= 5)
      .map(([slug, count]) => ({
        slug,
        title: PUZZLES[slug]?.title ?? slug,
        answer: PUZZLES[slug]?.answer ?? "",
        count,
      }));
  }, [activityLog]);

  return (
    <StyledPuzzleStatsTable>
      <thead>
        <tr>
          <th>Answer</th>
          <th>Correct Puzzle</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ slug, title, answer, count }) => (
          <tr key={slug}>
            <td>
              <Mono>{answer}</Mono>
            </td>
            <td>
              <a href={`${rootUrl}/puzzles/${slug}`}>{title}</a>
            </td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </StyledPuzzleStatsTable>
  );
};

const App = ({
  activityLog,
  teamInfo,
  hintAvailability,
}: {
  activityLog: ActivityLogRow[];
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

    const activityLogByTeam = new Map<string, ActivityLogRow[]>();
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
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "max-content 1fr",
            alignItems: "center",
            gap: "0.5rem",
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "var(--black)",
            padding: "1rem 0",
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

        <h2>Round Solve Times</h2>
        <RoundSolveGraph
          activityLogByTeam={activityLogByTeam}
          teamSort={teamSort}
          shownTeams={shownTeams}
          highlightedTeams={highlightedTeams}
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

        <h2>Available Puzzles, Keys, and Clues Over Time</h2>
        <p>
          If exactly one team is highlighted (or is the only team shown), this
          shows the number of puzzles, keys, and clues available to that team
          over time. Otherwise, it shows the distribution of all highlighted
          teams.
        </p>
        <KeysCluesPuzzlesGraph
          activityLog={activityLog}
          teamSort={teamSort}
          shownTeams={shownTeams}
          highlightedTeams={highlightedTeams}
        />
      </div>

      <h2>Unlock Round Distribution</h2>
      <p>
        This graph attempts to show if teams consistently chose to focus on
        rounds in the same sequence as they progressed through the Hunt. It
        shows, for the{" "}
        <MathML>
          <MI>n</MI>
        </MathML>
        th puzzle that a team unlocked, which round it was in. (It only
        considers puzzles which required a key to unlock, not puzzles which were
        released by us via Stray Leads).
      </p>
      <RoundDistributionGraph activityLogByTeam={activityLogByTeam} />
      <h2>Most Solved Puzzles</h2>
      <MostLeastSolvedPuzzleGraph activityLog={activityLog} mode="most" />

      <h2>Least Solved Puzzles</h2>
      <MostLeastSolvedPuzzleGraph activityLog={activityLog} mode="least" />

      <h2>Most Purchased Answers</h2>
      <MostPurchasedPuzzleGraph activityLog={activityLog} />

      <FastestSlowestUnlockGraphs activityLogByTeam={activityLogByTeam} />

      <h2>Most Backsolved Answers</h2>
      <p>
        This table shows how many times an answer was submitted that{" "}
        <em>would</em> have been correct…had it been submitted to the correct
        puzzle. (Perhaps unsurprisingly, this table is dominated by answers to
        the Shell Corporation metapuzzles from{" "}
        <a href={`${rootUrl}/rounds/paper_trail`}>The Paper Trail</a>.)
      </p>
      <MostBacksolvedTable activityLog={activityLog} />

      <h2>Hints</h2>
      <p>
        This does not include in-person hints given out at the Gala by our Press
        Corps. It is also possible that there are more responses than requests,
        as our hinters were able to provide unsolicited replies (if, e.g., they
        needed to follow up on a previous response). Hints were only available
        to a team after (a) we had released hints for that puzzle{" "}
        <strong>and</strong> (b) that team had the puzzle unlocked for a certain
        period of time (generally 1 hour for Missing Diamond and Stakeout
        puzzles; 2-3 hours for other late round puzzles). This latter condition
        is not reflected in the count of "puzzles with hints available" below.
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

const TeamInfoParseOptions: Options = {
  columns: true,
  cast: (value, context) => {
    if (context.column === "people") {
      return parseInt(value, 10);
    }
    return value;
  },
};

const useTeamInfo = () => {
  const { loading, error, data } = useCSV<{
    team_name: string;
    people: number;
  }>({
    url: teamInfoUrl,
    parseOptions: TeamInfoParseOptions,
  });

  return {
    loading,
    error,
    data: new Map(data.map((row) => [row.team_name, { people: row.people }])),
  };
};

const HintAvailabilityParseOptions: Options = {
  columns: true,
  cast: (value, context) => {
    if (context.column === "timestamp") {
      return DateTime.fromSQL(value, { zone: "America/New_York" });
    }
    return value;
  },
};

const useHintAvailability = () => {
  const { loading, error, data } = useCSV<HintAvailabilityRow>({
    url: hintAvailabilityUrl,
    parseOptions: HintAvailabilityParseOptions,
  });

  return {
    loading,
    error,
    data,
  };
};

const ActivityLogLoader = () => {
  const {
    loading: activityLogLoading,
    error: activityLogError,
    data: activityLog,
  } = useActivityLog();
  const {
    loading: teamInfoLoading,
    error: teamInfoError,
    data: teamInfo,
  } = useTeamInfo();
  const {
    loading: hintAvailabilityLoading,
    error: hintAvailabilityError,
    data: hintAvailability,
  } = useHintAvailability();

  const loading =
    activityLogLoading || teamInfoLoading || hintAvailabilityLoading;
  const error = activityLogError || teamInfoError || hintAvailabilityError;

  if (loading) {
    return <Loading />;
  }

  if (error) {
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
