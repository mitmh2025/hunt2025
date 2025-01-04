import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import { useNotifications } from "@toolpad/core";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Cell,
} from "material-react-table";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useOpsData } from "../OpsDataProvider";
import { useIsOpsAdmin } from "../components/AdminOnly";
import { formatTeamData } from "../opsdata/bigBoard";

type TeamIndexData = {
  name: string;
  username: string;
  teamId: number;
  teamSize: number;
  onCampusSize: number;
  progress: number;
  puzzlesSolved: number;
  puzzlesSolvedLast3Hours: number;
  hintsRequested: number;
  keys: number;
};

function GrantKeysDialog({
  teamIds,
  open,
  onClose,
}: {
  teamIds: number[] | "all";
  open: boolean;
  onClose: () => void;
}) {
  const { adminClient, appendActivityLogEntries } = useOpsData();
  const [qty, setQty] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const notifications = useNotifications();

  const teamsDisplay =
    teamIds === "all" ? "all teams" : `${teamIds.length} teams`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (qty > 0) {
      setSubmitting(true);
      adminClient
        .grantKeys({
          body: {
            teamIds,
            amount: qty,
          },
        })
        .then((result) => {
          if (result.status !== 200) {
            throw new Error(`HTTP ${result.status}: ${result.body}`);
          }

          appendActivityLogEntries(result.body);
          notifications.show(`Granted ${qty} keys to ${teamsDisplay}`, {
            severity: "success",
            autoHideDuration: 3000,
          });
          onClose();
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to grant keys: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Grant Keys to <strong>{teamsDisplay}</strong>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <label>
            Amount:{" "}
            <Input
              type="number"
              name="amount"
              inputProps={{
                min: 1,
                max: 99,
                step: 1,
              }}
              required
              value={qty}
              onChange={(e) => {
                setQty(parseInt(e.target.value, 10));
              }}
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={submitting}>
            Grant {qty} Keys
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function TeamIndex() {
  const [grantKeysDialogTeams, setGrantKeysDialogTeams] = useState<
    null | "all" | number[]
  >(null);

  const opsData = useOpsData();
  const isOpsAdmin = useIsOpsAdmin();

  const indexData = useMemo(() => {
    const record: Record<number, TeamIndexData> = {};
    for (const team of opsData.teams) {
      if (team.deactivated) {
        continue;
      }

      const bigBoardTeam = formatTeamData(team, opsData.puzzleMetadata);
      record[team.teamId] = {
        name: team.name,
        username: team.username,
        teamId: team.teamId,
        teamSize: team.registration.peopleTotal,
        onCampusSize: team.registration.peopleOnCampus,
        progress: bigBoardTeam.progress,
        puzzlesSolved: team.state.puzzles_solved.size,
        puzzlesSolvedLast3Hours: 0, // computed below
        hintsRequested: 0, // computed below
        keys: team.state.available_currency,
      };
    }

    opsData.activityLog.forEach((entry) => {
      if (
        entry.type === "puzzle_solved" &&
        entry.timestamp.getTime() > Date.now() - 3 * 60 * 60 * 1000 &&
        entry.team_id
      ) {
        const team = record[entry.team_id];
        if (team) {
          team.puzzlesSolvedLast3Hours += 1;
        }
      }

      // TODO: hintsRequested
    });

    return Object.values(record);
  }, [opsData]);

  const columns = useMemo(() => {
    const columnHelper = createMRTColumnHelper<TeamIndexData>();

    return [
      columnHelper.accessor(
        (row) => ({
          username: row.username,
          name: row.name,
        }),
        {
          id: "username",
          header: "Username",
          Cell: ({
            cell,
          }: {
            cell: MRT_Cell<
              TeamIndexData,
              {
                username: string;
                name: string;
              }
            >;
          }) => (
            <>
              <Link to={`/teams/${cell.getValue().username}`}>
                {cell.getValue().username}
              </Link>
              <br />
              <span style={{ fontSize: "12px" }}>{cell.getValue().name}</span>
            </>
          ),
        },
      ),
      columnHelper.accessor("teamSize", {
        header: "Team Size",
        filterVariant: "range",
      }),
      columnHelper.accessor("onCampusSize", {
        header: "On-Campus Size",
        filterVariant: "range",
      }),
      columnHelper.accessor("progress", {
        header: "Progress Score (0-6)",
        filterVariant: "range",
        Cell: ({ cell }) => cell.getValue().toFixed(3),
      }),
      columnHelper.accessor("puzzlesSolved", {
        header: "Puzzles Solved",
        filterVariant: "range",
      }),
      columnHelper.accessor("puzzlesSolvedLast3Hours", {
        header: "Puzzles Solved, Last 3 Hours",
        filterVariant: "range",
      }),
      columnHelper.accessor("hintsRequested", {
        header: "Hints Requested",
        filterVariant: "range",
      }),
      columnHelper.accessor("keys", {
        header: "Keys",
        filterVariant: "range",
      }),
    ];
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: indexData,
    initialState: {
      density: "compact",
      sorting: [
        {
          id: "progress",
          desc: true,
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 100,
      },
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
              setGrantKeysDialogTeams(
                table.getIsAllRowsSelected()
                  ? "all"
                  : table
                      .getSelectedRowModel()
                      .rows.map((row) => row.original.teamId),
              );
            }}
          >
            Grant Keys
          </Button>
        </Box>
      );
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <GrantKeysDialog
        teamIds={grantKeysDialogTeams ?? []}
        open={grantKeysDialogTeams !== null}
        onClose={() => {
          setGrantKeysDialogTeams(null);
        }}
      />
    </>
  );
}
