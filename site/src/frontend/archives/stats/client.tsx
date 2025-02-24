import {
  Chart as ChartJS,
  Colors,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  type ActiveElement,
  type ChartData,
  type ChartEvent,
  type ChartOptions,
  type ScaleOptions,
} from "chart.js";
import Zoom from "chartjs-plugin-zoom";
import { parse } from "csv-parse/browser/esm/sync";
import { DateTime } from "luxon";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Line } from "react-chartjs-2";
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
import activityLogUrl from "./assets/activity_log.csv";
import "chartjs-adapter-luxon";

ChartJS.register(
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
    | "puzzle_unlockable"
    | "round_unlocked"
    | "puzzle_unlocked"
    | "puzzle_guess_submitted"
    | "puzzle_solved"
    | "puzzle_partially_solved"
    | "keys_adjusted"
    | "interaction_unlocked"
    | "interaction_started"
    | "interaction_completed"
    | "clue_exchanged"
    | "puzzle_answer_bought"
    | "clues_adjusted"
    | "rate_limits_reset";
  slug?: string;
  result?: string;
  keys_delta: number;
  clues_delta: number;
};

const Chart = styled.div`
  position: relative;
  width: calc(min(1080px, 100vw) - 10rem);
  height: calc(0.5 * (min(1080px, 100vw) - 10rem));
  background-color: var(--white);
`;

const TimeAxisOptions: ScaleOptions = {
  type: "time",
  min: HuntStart.toJSDate().valueOf(),
  max: HuntEnd.toJSDate().valueOf(),
  adapters: {
    date: {
      zone: "America/New_York",
    },
  },
  time: {
    unit: "hour",
    displayFormats: {
      hour: "EEE h a",
    },
  },
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
}: {
  activityLogByTeam: Map<string, CSVRow[]>;
  teamColors: Map<string, string>;
  teamSort: string[];
}) => {
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
    return teamSort.flatMap((teamName) => {
      const solves = (activityLogByTeam.get(teamName) ?? []).filter(
        (row) =>
          row.type === "puzzle_solved" && puzzleSet.includes(row.slug ?? ""),
      );

      return [
        {
          teamName,
          data: [
            { x: HuntStart, y: 0 },
            ...solves.map((solve, i) => ({
              x: solve.timestamp,
              y: i + 1,
            })),
          ],
        },
      ];
    });
  }, [activityLogByTeam, puzzleSet, teamSort]);

  const onChartClick = useCallback(
    (_e: ChartEvent, elements: ActiveElement[], chart: ChartJS<"line">) => {
      const activeDataset = elements[0]?.datasetIndex;
      const team =
        activeDataset !== undefined
          ? chart.data.datasets[activeDataset]?.label
          : undefined;
      if (team) {
        toggleHighlight(team);
      } else {
        setHighlightedTeams(new Set());
      }
    },
    [toggleHighlight],
  );

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

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    animation: {
      duration: 200,
    },
    onClick: onChartClick,
    scales: {
      x: TimeAxisOptions,
      y: {
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
      zoom: {
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
      },
    },
    transitions: {
      zoom: {
        animation: {
          duration: 0,
        },
      },
    },
  };

  const chartData: ChartData<"line", { x: DateTime; y: number }[]> =
    useMemo(() => {
      const deselectedColor = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--gray-100");

      return {
        datasets: teamData.flatMap(({ teamName, data }) => {
          if (!shownTeams.has(teamName)) {
            return [];
          }

          const color =
            highlightedTeams.size === 0 || highlightedTeams.has(teamName)
              ? teamColors.get(teamName)
              : deselectedColor;
          return [
            {
              label: teamName,
              data,
              borderColor: color,
              backgroundColor: color,
              order: highlightedTeams.has(teamName) ? -1 : 0,
            },
          ];
        }),
      };
    }, [shownTeams, highlightedTeams, teamColors, teamData]);

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
        <Line options={chartOptions} data={chartData} />
      </Chart>
    </>
  );
};

const App = ({ activityLog }: { activityLog: CSVRow[] }) => {
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

  return (
    <>
      <h2>Solve Graph</h2>
      <SolveGraph
        activityLogByTeam={activityLogByTeam}
        teamColors={teamColors}
        teamSort={teamSort}
      />
    </>
  );
};

const ActivityLogLoader = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [activityLog, setActivityLog] = useState<CSVRow[]>([]);

  useEffect(() => {
    const abort = new AbortController();
    setLoading(true);
    void (async () => {
      try {
        const response = await fetch(activityLogUrl, {
          signal: abort.signal,
        });

        if (!response.ok) {
          setError(response.statusText);
          return;
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

        setActivityLog(log);
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
    return <p>Computing additional statistics...</p>;
  }

  if (error) {
    return (
      <ErrorText>
        An error occurred while loading additional statistics: {String(error)}
      </ErrorText>
    );
  }

  return <App activityLog={activityLog} />;
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
