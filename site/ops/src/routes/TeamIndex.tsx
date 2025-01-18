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
  type MRT_Row,
} from "material-react-table";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getTeamName } from "../../../src/utils/teamNames";
import { useOpsClients, useOpsData } from "../OpsDataProvider";
import { useIsOpsAdmin } from "../components/AdminOnly";
import { formatTeamData } from "../opsdata/bigBoard";
import { useOpsTable } from "../util/useOpsTable";

type TeamIndexData = {
  name: string;
  username: string;
  teamId: number;
  teamSize: number;
  onCampus: boolean;
  onCampusSize: number;
  progress: number;
  puzzlesSolved: number;
  puzzlesSolvedLast3Hours: number;
  hintsRequested: number;
  keys: number;
  clues: number;
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
  const { adminClient, updateActivityLog } = useOpsClients();
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

          return updateActivityLog({ forceRequest: true });
        })
        .then(() => {
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
        Grant Keys (puzzle unlocks) to <strong>{teamsDisplay}</strong>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <label>
            Amount:{" "}
            <Input
              type="number"
              sx={{ minWidth: "100px" }}
              name="amount"
              inputProps={{
                min: 1,
                max: 99,
                step: 1,
              }}
              required
              value={qty}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setQty(isNaN(val) ? 0 : val);
              }}
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button type="button" disabled={submitting} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            Grant {qty} Keys (puzzle unlocks)
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

function GrantCluesDialog({
  teamIds,
  open,
  onClose,
}: {
  teamIds: number[] | "all";
  open: boolean;
  onClose: () => void;
}) {
  const { adminClient, updateActivityLog } = useOpsClients();
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
        .grantStrongCurrency({
          body: {
            teamIds,
            amount: qty,
          },
        })
        .then((result) => {
          if (result.status !== 200) {
            throw new Error(`HTTP ${result.status}: ${result.body}`);
          }

          return updateActivityLog({ forceRequest: true });
        })
        .then(() => {
          notifications.show(`Granted ${qty} clues to ${teamsDisplay}`, {
            severity: "success",
            autoHideDuration: 3000,
          });
          onClose();
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to grant clues: ${msg}`, {
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
        Grant Clues (free answers) to <strong>{teamsDisplay}</strong>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <label>
            Amount:{" "}
            <Input
              type="number"
              sx={{ minWidth: "100px" }}
              name="amount"
              inputProps={{
                min: 1,
                max: 99,
                step: 1,
              }}
              required
              value={qty}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setQty(isNaN(val) ? 0 : val);
              }}
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button type="button" disabled={submitting} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            Grant {qty} Clues (free answers)
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
  const [grantCluesDialogTeams, setGrantCluesDialogTeams] = useState<
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

      if (opsData.hiddenTeamIds.has(team.teamId)) {
        continue;
      }

      const bigBoardTeam = formatTeamData(team, opsData.puzzleMetadata);
      record[team.teamId] = {
        name: getTeamName(team.username),
        username: team.username,
        teamId: team.teamId,
        teamSize: team.registration.peopleTotal,
        onCampus: team.registration.teamLocation !== "Fully Remote",
        onCampusSize: team.registration.peopleOnCampus,
        progress: bigBoardTeam.progress,
        puzzlesSolved: team.state.puzzles_solved.size,
        puzzlesSolvedLast3Hours: 0, // computed below
        hintsRequested: 0, // computed below
        keys: team.state.available_currency,
        clues: team.state.available_strong_currency,
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

      if (entry.type === "puzzle_hint_requested" && entry.team_id) {
        const team = record[entry.team_id];
        if (team) {
          team.hintsRequested += 1;
        }
      }
    });

    return Object.values(record);
  }, [opsData]);

  const columns = useMemo(() => {
    const columnHelper = createMRTColumnHelper<TeamIndexData>();

    return [
      columnHelper.accessor((row) => `${row.username} | ${row.name}`, {
        id: "username",
        header: "Username",
        Cell: ({ row }: { row: MRT_Row<TeamIndexData> }) => (
          <>
            <Link
              to={`/teams/${row.original.username}`}
              style={{
                maxWidth: "300px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
              }}
            >
              {row.original.name}
            </Link>
            Username: {row.original.username}
          </>
        ),
      }),
      columnHelper.accessor("teamSize", {
        header: "Team Size",
        filterVariant: "range",
      }),
      columnHelper.accessor("onCampus", {
        header: "On-Campus",
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
      columnHelper.accessor("clues", {
        header: "Clues",
        filterVariant: "range",
      }),
    ];
  }, []);

  const table = useOpsTable({
    columns,
    data: indexData,
    initialState: {
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
                .rows.map((row) => row.original.teamId);

              setGrantKeysDialogTeams(
                teamIds.length === indexData.length ? "all" : teamIds,
              );
            }}
          >
            🗝️ Grant Keys
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const teamIds = table
                .getSelectedRowModel()
                .rows.map((row) => row.original.teamId);

              setGrantCluesDialogTeams(
                teamIds.length === indexData.length ? "all" : teamIds,
              );
            }}
          >
            🔎 Grant Clues
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
      <GrantCluesDialog
        teamIds={grantCluesDialogTeams ?? []}
        open={grantCluesDialogTeams !== null}
        onClose={() => {
          setGrantCluesDialogTeams(null);
        }}
      />
    </>
  );
}
