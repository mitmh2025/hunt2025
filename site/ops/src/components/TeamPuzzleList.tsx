import UnlockIcon from "@mui/icons-material/LockOpen";
import { Box, IconButton, Typography } from "@mui/material";
import { useDialogs, useNotifications } from "@toolpad/core";
import { DateTime } from "luxon";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnHelper,
  type MRT_Row,
} from "material-react-table";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { type InternalActivityLogEntry } from "../../../lib/api/frontend_contract";
import { useOpsClients } from "../OpsDataProvider";
import { type BigBoardTeam } from "../opsdata/bigBoard";
import useTime from "../util/useTime";
import { useIsOpsAdmin } from "./AdminOnly";

export type TeamPuzzleListHandle = {
  filterToPuzzle: (title: string) => void;
};

type TeamPuzzleListProps = {
  bigBoardTeam: BigBoardTeam;
  activity: InternalActivityLogEntry[];
};

// shared with PuzzleTeamList
export type TeamPuzzleStatus =
  | {
      state: "locked";
    }
  | {
      state: "unlocked";
      unlockedAt: Date;
    }
  | {
      state: "solved";
      solvedAt: Date;
    }
  | {
      state: "unlockable";
      unlockableAt: Date;
    };

export function teamPuzzleStatusColumn<
  Row extends { status: TeamPuzzleStatus },
>(columnHelper: MRT_ColumnHelper<Row>, now: Date) {
  const nowDt = DateTime.fromJSDate(now);

  return columnHelper.accessor((row) => row.status, {
    id: "status",
    header: "Status",
    filterVariant: "multi-select",
    filterSelectOptions: ["locked", "unlocked", "solved", "unlockable"],
    filterFn: (row, col, filter: string[]) => {
      if (filter.length === 0) {
        return true;
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- eslint bug, getValue returns unknown
      const value = row.getValue(col) as TeamPuzzleListEntry["status"];
      return filter.includes(value.state);
    },
    sortingFn: (rowA, rowB) => {
      const statusA = rowA.original.status;
      const statusB = rowB.original.status;

      if (statusA.state === "locked" && statusB.state === "locked") {
        return 0;
      }

      if (statusA.state === "unlockable" && statusB.state === "unlockable") {
        return statusA.unlockableAt.getTime() - statusB.unlockableAt.getTime();
      }

      if (statusA.state === "unlocked" && statusB.state === "unlocked") {
        return statusA.unlockedAt.getTime() - statusB.unlockedAt.getTime();
      }

      if (statusA.state === "solved" && statusB.state === "solved") {
        return statusA.solvedAt.getTime() - statusB.solvedAt.getTime();
      }

      const stateOrder = ["locked", "unlockable", "unlocked", "solved"];
      return (
        stateOrder.indexOf(statusA.state) - stateOrder.indexOf(statusB.state)
      );
    },
    Cell: ({ row }: { row: MRT_Row<Row> }) => {
      const { status } = row.original;

      return (
        <Box>
          <Typography>{status.state}</Typography>
          <Typography variant="caption">
            {status.state === "unlocked"
              ? `Unlocked ${DateTime.fromJSDate(status.unlockedAt).toRelative({ base: nowDt })}`
              : status.state === "solved"
                ? `Solved ${DateTime.fromJSDate(status.solvedAt).toRelative({ base: nowDt })}`
                : status.state === "unlockable"
                  ? `Unlockable ${DateTime.fromJSDate(status.unlockableAt).toRelative({ base: nowDt })}`
                  : null}
          </Typography>
        </Box>
      );
    },
  });
}

type TeamPuzzleListEntry = {
  name: string;
  slug: string;
  type: "puzzle" | "meta";
  round: string;
  puzzleOrder: number;
  status: TeamPuzzleStatus;
  guesses: number;
  hints: number | null;
};

const TeamPuzzleList = forwardRef<TeamPuzzleListHandle, TeamPuzzleListProps>(
  ({ bigBoardTeam, activity }, ref) => {
    const dialogs = useDialogs();
    const notifications = useNotifications();
    const { adminClient, appendActivityLogEntries } = useOpsClients();
    const isOpsAdmin = useIsOpsAdmin();

    const handleUnlockPuzzle = (puzzle: TeamPuzzleListEntry) => {
      dialogs
        .confirm(
          `Are you sure you want to unlock ${puzzle.name} for ${bigBoardTeam.username}?`,
          {
            title: "Unlock Puzzle",
            okText: "Unlock",
            cancelText: "Cancel",
            onClose: async (result) => {
              if (!result) {
                return;
              }

              try {
                const res = await adminClient.unlockPuzzle({
                  params: { slug: puzzle.slug },
                  body: { teamIds: [bigBoardTeam.id] },
                });

                if (res.status !== 200) {
                  throw new Error(`HTTP ${res.status}: ${res.body}`);
                }

                appendActivityLogEntries(res.body);
                updateNow();

                notifications.show(
                  `Unlocked ${puzzle.name} for ${bigBoardTeam.username}`,
                  {
                    severity: "success",
                    autoHideDuration: 3000,
                  },
                );
              } catch (err: unknown) {
                const msg =
                  err instanceof Error ? err.message : "Unknown error";
                notifications.show(`Failed to unlock puzzle: ${msg}`, {
                  severity: "error",
                  autoHideDuration: 3000,
                });
              }
            },
          },
        )
        .catch((err: unknown) => {
          console.error(err);
        });
    };

    const { now, updateNow } = useTime();

    const wrapperEl = useRef<HTMLDivElement | null>(null);

    const data: TeamPuzzleListEntry[] = useMemo(() => {
      const puzzleLogData: Record<
        string,
        {
          guesses?: number;
          hints?: number;
          unlockableAt?: Date;
          unlockedAt?: Date;
          solvedAt?: Date;
        }
      > = {};

      activity.forEach((entry) => {
        switch (entry.type) {
          case "puzzle_guess_submitted":
            puzzleLogData[entry.slug] = {
              ...puzzleLogData[entry.slug],
              guesses: (puzzleLogData[entry.slug]?.guesses ?? 0) + 1,
            };
            break;
          case "puzzle_unlockable":
            puzzleLogData[entry.slug] = {
              ...puzzleLogData[entry.slug],
              unlockableAt: entry.timestamp,
            };
            break;
          case "puzzle_unlocked":
            puzzleLogData[entry.slug] = {
              ...puzzleLogData[entry.slug],
              unlockedAt: entry.timestamp,
            };
            break;
          case "puzzle_solved":
            puzzleLogData[entry.slug] = {
              ...puzzleLogData[entry.slug],
              solvedAt: entry.timestamp,
            };
            break;
          // TODO: hints. Set to 0 if hints are unlocked
        }
      });

      return bigBoardTeam.rounds.flatMap((round, roundIndex) => {
        return (
          [
            ["puzzle", round.puzzles],
            ["meta", [...round.supermetas, ...round.metas]],
          ] as const
        ).flatMap(([type, puzzles]) => {
          return puzzles.map((puzzle, puzzleIndex) => {
            const slug = puzzle.slug;
            const logData = puzzleLogData[slug] ?? {};
            let status: TeamPuzzleListEntry["status"] = { state: "locked" };
            if (puzzle.state === "unlocked") {
              status = {
                state: "unlocked",
                unlockedAt: logData.unlockedAt ?? new Date(0),
              };
            } else if (puzzle.state === "solved") {
              status = {
                state: "solved",
                solvedAt: logData.solvedAt ?? new Date(0),
              };
            } else if (puzzle.state === "unlockable") {
              status = {
                state: "unlockable",
                unlockableAt: logData.unlockableAt ?? new Date(0),
              };
            }

            return {
              name: puzzle.title,
              slug,
              type,
              round: round.title,
              puzzleOrder:
                roundIndex * 1000 +
                (type === "puzzle" ? puzzleIndex + 100 : puzzleIndex),
              status,
              guesses: logData.guesses ?? 0,
              hints: null, // TODO
            };
          });
        });
      });
    }, [activity, bigBoardTeam]);

    const columns = useMemo(() => {
      const columnHelper = createMRTColumnHelper<TeamPuzzleListEntry>();

      return [
        columnHelper.accessor("name", { header: "Name" }),
        columnHelper.accessor("type", {
          header: "Type",
          filterVariant: "select",
          filterSelectOptions: ["puzzle", "meta"],
        }),
        columnHelper.accessor("round", {
          header: "Round",
          filterVariant: "multi-select",
          filterSelectOptions: bigBoardTeam.rounds.map((round) => round.title),
          sortingFn: (rowA, rowB) => {
            return rowA.original.puzzleOrder - rowB.original.puzzleOrder;
          },
        }),
        teamPuzzleStatusColumn(columnHelper, now),
        columnHelper.accessor("guesses", {
          header: "Guesses",
        }),
        columnHelper.accessor("hints", {
          header: "Hints",
          Cell: ({ cell }) => cell.getValue() ?? "unavailable",
        }),
      ];
    }, [bigBoardTeam, now]);

    const table = useMaterialReactTable({
      columns,
      data,
      initialState: {
        density: "compact",
        sorting: [
          {
            id: "status",
            desc: true,
          },
        ],
        columnFilters: [
          {
            id: "status",
            value: ["unlocked"],
          },
        ],
        showColumnFilters: true,
      },
      enableDensityToggle: false,
      enableRowActions: isOpsAdmin,
      renderRowActions: ({ row }) => {
        // TODO: add action for resetting rate limit

        if (
          row.original.status.state === "unlocked" ||
          row.original.status.state === "solved"
        ) {
          return null;
        }

        return (
          <Box>
            <IconButton
              onClick={() => {
                handleUnlockPuzzle(row.original);
              }}
            >
              <UnlockIcon />
            </IconButton>
          </Box>
        );
      },
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          filterToPuzzle: (title: string) => {
            table.setColumnFilters([
              {
                id: "name",
                value: [title],
              },
            ]);

            wrapperEl.current?.scrollIntoView({
              behavior: "smooth",
            });
          },
        };
      },
      [table],
    );

    return (
      <div ref={wrapperEl}>
        <MaterialReactTable table={table} />
      </div>
    );
  },
);

TeamPuzzleList.displayName = "TeamPuzzleList";

export default TeamPuzzleList;
