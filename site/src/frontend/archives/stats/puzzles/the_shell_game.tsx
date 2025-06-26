import {
  Chart as ChartJS,
  type Plugin,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Flow, SankeyController } from "chartjs-chart-sankey";
import React, { useCallback, useMemo } from "react";
import { Chart as ReactChart } from "react-chartjs-2";
import { ErrorText } from "../../../components/StyledUI";
import Loading from "../../components/Loading";
import { useActivityLog } from "../activityLog";
import { Chart } from "../charts";

ChartJS.register(SankeyController, Flow);

const Ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

const MetaColors = new Map<number, string>([
  [1, "#173729"],
  [2, "#3b3a2f"],
  [3, "#918758"],
  [4, "#7c4616"],
  [5, "#a96f38"],
  [6, "#51570b"],
  [7, "#c09115"],
  [8, "#536945"],
]);

const getColor = (k: string) => {
  const index = parseInt(k.split("-")[1] ?? "");
  if (isNaN(index)) return "#000000";
  const color = MetaColors.get(index);
  if (color) return color;
  return "#000000";
};

const HeightPlugin: Plugin = {
  id: "extraHeight",
  afterDatasetsUpdate(chart) {
    console.log(chart);
  },
};

const ShellSankey = ({
  solveSequence,
}: {
  solveSequence: Map<string, number[]>;
}) => {
  const data: ChartData<"sankey"> = useMemo(() => {
    const flows = Array(Ordinals.length - 1)
      .fill(0)
      .map(() => {
        return new Map<number, Map<number, number>>();
      });
    for (const sequence of solveSequence.values()) {
      for (let i = 0; i < sequence.length - 1; i++) {
        const from = sequence[i];
        const to = sequence[i + 1];
        const flow = flows[i];
        if (from === undefined || to === undefined || flow === undefined)
          continue;
        const fromMap = flow.get(from) ?? new Map<number, number>();
        const count = fromMap.get(to) ?? 0;
        fromMap.set(to, count + 1);
        flow.set(from, fromMap);
      }
    }

    const flattened = flows.flatMap((solve, i) => {
      return [...solve.entries()].flatMap(([from, toMap]) => {
        return [...toMap.entries()].map(([to, count]) => {
          return {
            solve: i,
            from,
            to,
            count,
          };
        });
      });
    });

    return {
      datasets: [
        {
          data: flattened.map(({ solve, from, to, count }) => {
            return {
              from: `${solve}-${from}`,
              to: `${solve + 1}-${to}`,
              flow: count,
            };
          }),
          labels: Object.fromEntries(
            flattened.flatMap(({ solve, from, to }) => {
              return [
                [`${solve}-${from}`, `Shell Corporation ${from}`],
                [`${solve + 1}-${to}`, `Shell Corporation ${to}`],
              ];
            }),
          ),
          column: Object.fromEntries(
            flattened.flatMap(({ solve, from, to }) => {
              return [
                [`${solve}-${from}`, solve],
                [`${solve + 1}-${to}`, solve + 1],
              ];
            }),
          ),
          colorFrom: (c) => getColor(c.dataset.data[c.dataIndex]?.from ?? ""),
          colorTo: (c) => getColor(c.dataset.data[c.dataIndex]?.to ?? ""),
        },
      ],
    };
  }, [solveSequence]);

  const tooltipCallback = useCallback((context: TooltipItem<"sankey">) => {
    const parsedCustom = context.parsed._custom;
    const from = parsedCustom.from.key.split("-")[1];
    const to = parsedCustom.to.key.split("-")[1];
    return `Shell Corporation ${from} -> Shell Corporation ${to}: ${parsedCustom.flow}`;
  }, []);

  const options: ChartOptions<"sankey"> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: tooltipCallback,
        },
      },
    },
  };

  return (
    <Chart>
      <ReactChart
        plugins={[HeightPlugin]}
        type="sankey"
        options={options}
        data={data}
      />
    </Chart>
  );
};

const PuzzleStats = () => {
  const { loading, error, data } = useActivityLog();

  const solveSequence = useMemo(() => {
    return data.reduce<Map<string, number[]>>(
      (acc, { team_name, type, slug }) => {
        if (type !== "puzzle_solved") return acc;
        if (!slug?.startsWith("shell_corporation_")) return acc;

        const shellCorporation = parseInt(slug.split("_")[2] ?? "");
        if (isNaN(shellCorporation)) return acc;

        const sequence = acc.get(team_name) ?? [];
        sequence.push(shellCorporation);
        acc.set(team_name, sequence);
        return acc;
      },
      new Map(),
    );
  }, [data]);

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
      <h3>Solve Sequencing</h3>
      <p>
        This Sankey diagram shows the sequence in which teams solved the 8 Shell
        Corporation metapuzzles, starting with the first meta solved on the
        left.
      </p>
      <ShellSankey solveSequence={solveSequence} />
    </>
  );
};

export default PuzzleStats;
