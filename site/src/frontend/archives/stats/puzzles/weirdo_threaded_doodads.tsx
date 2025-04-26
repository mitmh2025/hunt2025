import { Legend, type ChartOptions } from "chart.js";
import { type DateTime } from "luxon";
import React, { useMemo } from "react";
import { Scatter } from "react-chartjs-2";
import { ErrorText } from "../../../components/StyledUI";
import Loading from "../Loading";
import { useActivityLog, type ActivityLogRow } from "../activityLog";
import { Chart, generateTruncatedTick } from "../charts";

const FastestKnittersGraph = ({
  puzzleEvents,
}: {
  puzzleEvents: ActivityLogRow[];
}) => {
  const data = useMemo(() => {
    const byTeam = puzzleEvents.reduce<
      Map<
        string,
        {
          unlockWeirdoThreadedDoodads?: DateTime;
          unlockIKidEweKnot?: DateTime;
          unlockStitchySituation?: DateTime;
          solve?: DateTime;
        }
      >
    >((acc, event) => {
      const team = acc.get(event.team_name) ?? {};
      if (event.type === "puzzle_unlocked") {
        team.unlockWeirdoThreadedDoodads = event.timestamp;
      } else if (event.type === "puzzle_solved") {
        team.solve = event.timestamp;
      } else if (event.type === "subpuzzle_unlocked") {
        switch (event.slug) {
          case "weirdo_threaded_doodads:i_kid_ewe_knot":
            team.unlockIKidEweKnot = event.timestamp;
            break;
          case "weirdo_threaded_doodads:stitchy_situation":
            team.unlockStitchySituation = event.timestamp;
            break;
        }
      }
      acc.set(event.team_name, team);
      return acc;
    }, new Map());

    const data = [...byTeam.entries()]
      .flatMap(([teamName, events]) => {
        if (
          !events.unlockWeirdoThreadedDoodads ||
          !events.unlockIKidEweKnot ||
          !events.unlockStitchySituation ||
          !events.solve
        ) {
          return [];
        }

        if (
          events.unlockIKidEweKnot <= events.unlockWeirdoThreadedDoodads ||
          events.unlockStitchySituation <= events.unlockIKidEweKnot ||
          events.solve <= events.unlockStitchySituation
        ) {
          return [];
        }

        return [
          {
            teamName,
            weirdoThreadedDoodads: 0,
            iKidEweKnot: events.unlockIKidEweKnot
              .diff(events.unlockWeirdoThreadedDoodads)
              .as("minutes"),
            stitchySituation: events.unlockStitchySituation
              .diff(events.unlockWeirdoThreadedDoodads)
              .as("minutes"),
            solve: events.solve
              .diff(events.unlockWeirdoThreadedDoodads)
              .as("minutes"),
          },
        ];
      })
      .toSorted(({ solve: a }, { solve: b }) => a - b)
      .slice(0, 20);

    return {
      datasets: [
        {
          label: "Unlocked Weirdo Threaded Doodads",
          data,
          parsing: {
            xAxisKey: "weirdoThreadedDoodads",
            yAxisKey: "teamName",
          },
        },
        {
          label: "Unlocked I Kid Ewe Knot",
          data,
          parsing: {
            xAxisKey: "iKidEweKnot",
            yAxisKey: "teamName",
          },
        },
        {
          label: "Unlocked Stitchy Situation",
          data,
          parsing: {
            xAxisKey: "stitchySituation",
            yAxisKey: "teamName",
          },
        },
        {
          label: "Solved",
          data,
          parsing: {
            xAxisKey: "solve",
            yAxisKey: "teamName",
          },
        },
      ],
    };
  }, [puzzleEvents]);

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
      x: {
        title: {
          text: "Minutes",
          display: true,
        },
      },
      y: {
        labels: data.datasets[0]?.data.map(({ teamName }) => teamName),
        type: "category",
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

const PuzzleStats = () => {
  const { loading, error, data } = useActivityLog();

  const puzzleEvents = useMemo(() => {
    return data.filter((row) =>
      row.slug?.startsWith("weirdo_threaded_doodads"),
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
      <h3>Fastest Knitters</h3>
      <p>
        How long did it take teams to go from unlocking this puzzle to knitting
        (or at least mapping) each of the three Doodads?
      </p>
      <FastestKnittersGraph puzzleEvents={puzzleEvents} />
    </>
  );
};

export default PuzzleStats;
