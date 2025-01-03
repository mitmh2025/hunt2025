import { Box, Typography } from "@mui/material";
import { DateTime } from "luxon";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  type MRT_Cell,
  useMaterialReactTable,
} from "material-react-table";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { type InternalActivityLogEntry } from "../../../lib/api/frontend_contract";
import { type BigBoardTeam } from "../opsdata/bigBoard";
import useTime from "../util/useTime";

export type TeamPuzzleListHandle = {
  filterToPuzzle: (title: string) => void;
};

type TeamPuzzleListProps = {
  bigBoardTeam: BigBoardTeam;
  activity: InternalActivityLogEntry[];
};

type TeamPuzzleListEntry = {
  name: string;
  type: "puzzle" | "meta";
  round: string;
  status:
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
  guesses: number;
  hints: number | null;
};

const TeamPuzzleList = forwardRef<TeamPuzzleListHandle, TeamPuzzleListProps>(
  ({ bigBoardTeam, activity }, ref) => {
    const now = DateTime.fromJSDate(useTime());

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

      return bigBoardTeam.rounds.flatMap((round) => {
        return (
          [
            ["puzzle", round.puzzles],
            ["meta", [...round.metas, ...round.supermetas]],
          ] as const
        ).flatMap(([type, puzzles]) => {
          return puzzles.map((puzzle) => {
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
              type,
              round: round.title,
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
        }),
        columnHelper.accessor("status", {
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
          sortingFn: (rowA, rowB, col) => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- eslint bug, getValue returns unknown
            const statusA = rowA.getValue(col) as TeamPuzzleListEntry["status"];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- eslint bug, getValue returns unknown
            const statusB = rowB.getValue(col) as TeamPuzzleListEntry["status"];

            if (statusA.state === "locked" && statusB.state === "locked") {
              return 0;
            }

            if (
              statusA.state === "unlockable" &&
              statusB.state === "unlockable"
            ) {
              return (
                statusA.unlockableAt.getTime() - statusB.unlockableAt.getTime()
              );
            }

            if (statusA.state === "unlocked" && statusB.state === "unlocked") {
              return (
                statusA.unlockedAt.getTime() - statusB.unlockedAt.getTime()
              );
            }

            if (statusA.state === "solved" && statusB.state === "solved") {
              return statusA.solvedAt.getTime() - statusB.solvedAt.getTime();
            }

            const stateOrder = ["locked", "unlockable", "unlocked", "solved"];
            return (
              stateOrder.indexOf(statusA.state) -
              stateOrder.indexOf(statusB.state)
            );
          },
          Cell: ({
            cell,
          }: {
            cell: MRT_Cell<TeamPuzzleListEntry, TeamPuzzleListEntry["status"]>;
          }) => {
            const status = cell.getValue();

            return (
              <Box>
                <Typography>{status.state}</Typography>
                <Typography variant="caption">
                  {status.state === "unlocked"
                    ? `Unlocked ${DateTime.fromJSDate(status.unlockedAt).toRelative({ base: now })}`
                    : status.state === "solved"
                      ? `Solved ${DateTime.fromJSDate(status.solvedAt).toRelative({ base: now })}`
                      : status.state === "unlockable"
                        ? `Unlockable ${DateTime.fromJSDate(status.unlockableAt).toRelative({ base: now })}`
                        : null}
                </Typography>
              </Box>
            );
          },
        }),
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
