import { Box, Button } from "@mui/material";
import { useDialogs, useNotifications } from "@toolpad/core";
import {
  type MRT_Row,
  createMRTColumnHelper,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { useOpsData } from "../OpsDataProvider";
import { formatAllTeamsData } from "../opsdata/bigBoard";
import { type SinglePuzzleStats } from "../routes/Puzzle";
import useTime from "../util/useTime";
import { useIsOpsAdmin } from "./AdminOnly";
import {
  teamPuzzleStatusColumn,
  type TeamPuzzleStatus,
} from "./TeamPuzzleList";

type PuzzleTeamListData = {
  teamId: number;
  teamName: string;
  username: string;
  progress: number;
  status: TeamPuzzleStatus;
  hints: number;
  boughtAnswer: boolean;
};

export default function PuzzleTeamList({
  stats,
  title,
  slug,
}: {
  stats: SinglePuzzleStats;
  title: string;
  slug: string;
}) {
  const opsData = useOpsData();
  const bigBoardData = useMemo(() => formatAllTeamsData(opsData), [opsData]);
  const isOpsAdmin = useIsOpsAdmin();
  const dialogs = useDialogs();
  const notifications = useNotifications();
  const { now, updateNow } = useTime();

  function handleBulkUnlock(teamIds: number[] | "all") {
    const teamsDisplay =
      teamIds === "all" ? "all teams" : `${teamIds.length} teams`;

    dialogs
      .confirm(`Unlock this puzzle for ${teamsDisplay}?`, {
        okText: "Unlock",
        cancelText: "Cancel",
        title: `Unlock ${title}`,
        onClose: async (confirmed) => {
          if (!confirmed) {
            return;
          }

          try {
            const res = await opsData.adminClient.unlockPuzzle({
              body: {
                teamIds,
              },
              params: {
                slug,
              },
            });

            if (res.status !== 200) {
              throw new Error(`HTTP ${res.status}: ${res.body}`);
            }

            opsData.appendActivityLogEntries(res.body);
            updateNow();

            notifications.show(`Unlocked puzzle for ${teamsDisplay}`, {
              severity: "success",
              autoHideDuration: 3000,
            });
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            notifications.show(`Failed to unlock puzzle: ${msg}`, {
              severity: "error",
              autoHideDuration: 3000,
            });
          }
        },
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }
  const teams: PuzzleTeamListData[] = useMemo(() => {
    return bigBoardData.teams.map((team) => {
      const puzzleData = stats.teams[team.id];
      if (!puzzleData) {
        return {
          teamId: team.id,
          teamName: team.teamName,
          username: team.username,
          progress: team.progress,
          status: { state: "locked" },
          hints: 0,
          boughtAnswer: false,
        };
      }

      let status: PuzzleTeamListData["status"];
      if (puzzleData.solveTime !== null) {
        status = { state: "solved", solvedAt: new Date(puzzleData.solveTime) };
      } else if (puzzleData.unlockTime !== null) {
        status = {
          state: "unlocked",
          unlockedAt: new Date(puzzleData.unlockTime),
        };
      } else if (puzzleData.unlockableTime !== null) {
        status = {
          state: "unlockable",
          unlockableAt: new Date(puzzleData.unlockableTime),
        };
      } else {
        status = { state: "locked" };
      }

      return {
        teamId: team.id,
        teamName: team.teamName,
        username: team.username,
        progress: team.progress,
        status,
        hints: puzzleData.hints,
        boughtAnswer: puzzleData.boughtAnswer,
      };
    });
  }, [bigBoardData, stats.teams]);

  const columns = useMemo(() => {
    const columnHelper = createMRTColumnHelper<PuzzleTeamListData>();

    return [
      columnHelper.accessor((row) => `${row.username} | ${row.teamName}`, {
        size: 300,
        id: "username",
        header: "Username",
        Cell: ({ row }: { row: MRT_Row<PuzzleTeamListData> }) => (
          <>
            <Box>
              {row.original.username}
              <br />
              <span
                style={{
                  fontSize: "12px",
                  maxWidth: "250px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                }}
              >
                {row.original.teamName}
              </span>
            </Box>
          </>
        ),
      }),
      columnHelper.accessor("progress", {
        size: 200,
        header: "Hunt Progress",
        filterVariant: "range",
        Cell: ({ cell }) => cell.getValue().toFixed(3),
      }),
      teamPuzzleStatusColumn(columnHelper, now),
      columnHelper.accessor("hints", {
        size: 150,
        header: "Hints",
        filterVariant: "range",
      }),
      columnHelper.accessor("boughtAnswer", {
        size: 150,
        header: "Bought Answer",
        filterVariant: "select",
        filterSelectOptions: [
          {
            value: "true",
            label: "Yes",
          },
          {
            value: "false",
            label: "No",
          },
        ],
        Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
      }),
    ];
  }, [now]);

  const adminPermissionRequired = ![
    "in_communicado_tonight",
    "control_room",
    "estimation_dot_jpg",
  ].includes(slug);

  const userCanUnlock = adminPermissionRequired ? isOpsAdmin : true;

  const table = useMaterialReactTable({
    columns,
    data: teams,
    initialState: {
      density: "compact",
      sorting: [
        {
          id: "progress",
          desc: true,
        },
      ],
      showGlobalFilter: true,
    },
    enableDensityToggle: false,
    layoutMode: "grid-no-grow",
    enableRowSelection: userCanUnlock,
    selectAllMode: "all",
    enableSelectAll: true,
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
              const teamIds = table
                .getSelectedRowModel()
                .rows.map((r) => r.original.teamId);

              handleBulkUnlock(
                teamIds.length === teams.length ? "all" : teamIds,
              );
            }}
          >
            Unlock
          </Button>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
}
