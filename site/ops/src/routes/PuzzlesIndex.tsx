import { Box, Button } from "@mui/material";
import { useNotifications } from "@toolpad/core";
import { Duration } from "luxon";
import {
  createMRTColumnHelper,
  useMaterialReactTable,
  MaterialReactTable,
  type MRT_Row,
} from "material-react-table";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import HUNT from "../../../src/huntdata";
import { type PuzzleSlot } from "../../../src/huntdata/types";
import { useOpsData, type OpsData } from "../OpsDataProvider";
import { useIsOpsAdmin } from "../components/AdminOnly";
import { median } from "../util/stats";

function slotNameAndSlug(slot: PuzzleSlot, opsData: OpsData) {
  if (!slot.slug) {
    return { name: slot.id, slug: slot.id, codeName: slot.id };
  }

  if (slot.slug in opsData.puzzleMetadata) {
    return {
      name: opsData.puzzleMetadata[slot.slug]?.title ?? slot.slug,
      slug: slot.slug,
      codeName: opsData.puzzleMetadata[slot.slug]?.code_name ?? slot.slug,
    };
  }

  return { name: slot.slug, slug: slot.slug, codeName: slot.slug };
}

type PuzzleIndexData = {
  name: string;
  slug: string;
  codeName: string;
  type: "puzzle" | "meta";
  round: string;
  puzzleOrder: number;
  unlockCount: number;
  solveCount: number;
  medianSolveTime: number;
  hintCount: number;
  openCount: number;
};

export default function PuzzlesIndex() {
  const opsData = useOpsData();

  const data = useMemo(() => {
    const puzzleDataBySlug: Record<
      string,
      {
        unlockCount: number;
        solveCount: number;
        hintCount: number;
        teams: Record<
          number,
          { unlockTime: number | null; solveTime: number | null }
        >;
      }
    > = {};

    function getOrCreatePuzzleData(slug: string) {
      const existingData = puzzleDataBySlug[slug];
      if (existingData) {
        return existingData;
      }

      const newData = {
        unlockCount: 0,
        solveCount: 0,
        hintCount: 0,
        teams: Object.fromEntries(
          opsData.teams.map((team) => [
            team.teamId,
            {
              unlockTime: null,
              solveTime: null,
            },
          ]),
        ),
      };

      puzzleDataBySlug[slug] = newData;
      return newData;
    }

    // Analyze activity log to compute unlock/solve data
    opsData.activityLog.forEach((entry) => {
      switch (entry.type) {
        case "puzzle_unlocked": {
          const puzzleData = getOrCreatePuzzleData(entry.slug);
          puzzleData.unlockCount += 1;

          if (entry.team_id) {
            const teamData = puzzleData.teams[entry.team_id];
            if (teamData) {
              teamData.unlockTime = entry.timestamp.getTime();
            }
          } else {
            Object.values(puzzleData.teams).forEach((teamData) => {
              teamData.unlockTime = entry.timestamp.getTime();
            });
          }

          break;
        }

        case "puzzle_solved": {
          const puzzleData = getOrCreatePuzzleData(entry.slug);
          puzzleData.solveCount += 1;

          if (entry.team_id) {
            const teamData = puzzleData.teams[entry.team_id];
            if (teamData) {
              teamData.solveTime = entry.timestamp.getTime();
            }
          } else {
            Object.values(puzzleData.teams).forEach((teamData) => {
              teamData.solveTime = entry.timestamp.getTime();
            });
          }

          break;
        }

        case "puzzle_hint_requested": {
          const puzzleData = getOrCreatePuzzleData(entry.slug);
          puzzleData.hintCount += 1;

          break;
        }
      }
    });

    // Assemble rows
    return HUNT.rounds.flatMap((round, roundIndex) =>
      round.puzzles.flatMap((slot, slotIndex) => {
        const { name, slug, codeName } = slotNameAndSlug(slot, opsData);

        let puzzleOrder = roundIndex * 1000;
        if (slot.is_supermeta) {
          puzzleOrder += slotIndex;
        } else if (slot.is_meta) {
          puzzleOrder += 100 + slotIndex;
        } else {
          puzzleOrder += 200 + slotIndex;
        }

        const solveTimes = Object.values(puzzleDataBySlug[slug]?.teams ?? {})
          .map((teamData) => {
            if (teamData.solveTime && teamData.unlockTime) {
              return teamData.solveTime - teamData.unlockTime;
            }
            return null;
          })
          .filter((time) => time !== null) as number[];

        const medianSolveTime = solveTimes.length > 0 ? median(solveTimes) : 0;

        const unlockCount = puzzleDataBySlug[slug]?.unlockCount ?? 0;
        const solveCount = puzzleDataBySlug[slug]?.solveCount ?? 0;
        const openCount = unlockCount - solveCount;

        return {
          name,
          slug,
          codeName,
          type: slot.is_meta ? "meta" : "puzzle",
          round: round.title,
          puzzleOrder,
          unlockCount,
          solveCount,
          openCount,
          medianSolveTime: medianSolveTime,
          hintCount: puzzleDataBySlug[slug]?.hintCount ?? 0,
        } satisfies PuzzleIndexData;
      }),
    );
  }, [opsData]);

  const columns = useMemo(() => {
    const columnHelper = createMRTColumnHelper<PuzzleIndexData>();

    return [
      columnHelper.accessor(
        (col) => `${col.name}|${col.slug}|${col.codeName}`,
        {
          header: "Name",
          Cell: ({ row }: { row: MRT_Row<PuzzleIndexData> }) => (
            <>
              <Link to={`/puzzles/${row.original.slug}`}>
                {row.original.name} ({row.original.codeName})
              </Link>
              <br />
              View:{" "}
              <a
                href={`https://dev.mitmh2025.com/puzzles/${row.original.slug}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Puzzle
              </a>{" "}
              <a
                href={`https://dev.mitmh2025.com/puzzles/${row.original.slug}/solution`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Solution
              </a>
            </>
          ),
        },
      ),
      columnHelper.accessor("type", {
        header: "Type",
        filterVariant: "select",
        filterSelectOptions: ["puzzle", "meta"],
      }),
      columnHelper.accessor("round", {
        header: "Round",
        filterVariant: "multi-select",
        filterSelectOptions: HUNT.rounds.map((round) => round.title),
        sortingFn: (rowA, rowB) => {
          return rowA.original.puzzleOrder - rowB.original.puzzleOrder;
        },
      }),
      columnHelper.accessor("unlockCount", {
        header: "Unlocks",
        filterVariant: "range",
      }),
      columnHelper.accessor("solveCount", {
        header: "Solves",
        filterVariant: "range",
      }),
      columnHelper.accessor("openCount", {
        header: "Open, Unsolved",
        filterVariant: "range",
      }),
      columnHelper.accessor("medianSolveTime", {
        header: "Median Solve Time",
        filterVariant: "range",
        Cell: ({ row }: { row: MRT_Row<PuzzleIndexData> }) => {
          const duration = Duration.fromMillis(row.original.medianSolveTime);
          return duration.toFormat("hh:mm:ss");
        },
      }),
      columnHelper.accessor("hintCount", {
        header: "Hints Requested",
        filterVariant: "range",
      }),
    ];
  }, []);

  const isOpsAdmin = useIsOpsAdmin();
  const notifications = useNotifications();

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      density: "compact",
      sorting: [
        {
          id: "round",
          desc: false,
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 25,
      },
      showGlobalFilter: true,
    },
    enableRowSelection: isOpsAdmin,
    selectAllMode: "all",
    enableSelectAll: true,
    enableDensityToggle: false,
    renderTopToolbarCustomActions: ({ table }) => {
      if (table.getSelectedRowModel().rows.length === 0) {
        return null;
      }

      return (
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            padding: "8px",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              notifications.show("Not implemented yet", {
                severity: "error",
                autoHideDuration: 3000,
              });
            }}
          >
            Enable Hints
          </Button>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
}
