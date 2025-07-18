import SatisfyIcon from "@mui/icons-material/LockOpen";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useDialogs, useNotifications } from "@toolpad/core";
import {
  type MRT_Row,
  createMRTColumnHelper,
  MaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import HUNT from "../../../src/huntdata";
import { useOpsClients, useOpsData } from "../OpsDataProvider";
import { useIsOpsAdmin } from "../components/AdminOnly";
import { useOpsTable } from "../util/useOpsTable";

type GatesIndexData = {
  id: string;
  displayName: string;
  round: string;
  order: number;
  satisfied: number;
  lastCompleteTime: Date | null;
  lastCompleteTeam: string | null;
};

export default function Gates() {
  const { adminClient, updateActivityLog } = useOpsClients();
  const opsData = useOpsData();
  const isOpsAdmin = useIsOpsAdmin();
  const dialogs = useDialogs();
  const notifications = useNotifications();

  const handleSatisfyGate = (gate: GatesIndexData) => {
    dialogs
      .confirm(
        `Are you sure you want to mark ${gate.displayName} satisfied for ALL TEAMS?`,
        {
          title: "Satisfy Gate",
          okText: "Mark Satisfied",
          cancelText: "Cancel",
          onClose: async (result) => {
            if (!result) {
              return;
            }

            try {
              const res = await adminClient.markGateSatistfied({
                params: { gateId: gate.id },
                body: { teamIds: "all" },
              });

              if (res.status !== 200) {
                throw new Error(`HTTP ${res.status}: ${res.body}`);
              }

              await updateActivityLog({ forceRequest: true });

              notifications.show(
                `Satisfied ${gate.displayName} for all teams`,
                {
                  severity: "success",
                  autoHideDuration: 3000,
                },
              );
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : "Unknown error";
              notifications.show(`Failed to satisfy gate: ${msg}`, {
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

  const gatesData: GatesIndexData[] = useMemo(() => {
    const gatesById: Record<string, GatesIndexData> = {};
    HUNT.rounds.forEach((round, roundIdx) => {
      (round.gates ?? []).forEach((gate, gateIdx) => {
        gatesById[gate.id] = {
          id: gate.id,
          displayName: `${gate.title ?? gate.internal_description ?? "Untitled Gate"} (${gate.id})`,
          round: round.title,
          order: roundIdx * 1000 + gateIdx,
          satisfied: 0,
          lastCompleteTime: null,
          lastCompleteTeam: null,
        };
      });
    });

    const teamUsernameById = Object.fromEntries(
      opsData.teams.map((team) => [team.teamId, team.username]),
    );

    opsData.activityLog.forEach((logEntry) => {
      if (logEntry.team_id && opsData.hiddenTeamIds.has(logEntry.team_id)) {
        return;
      }

      if (logEntry.type === "gate_completed") {
        const gate = gatesById[logEntry.slug];
        if (gate) {
          gate.lastCompleteTime = logEntry.timestamp;

          if (logEntry.team_id) {
            gate.satisfied = Math.min(gate.satisfied + 1, opsData.teams.length);
            gate.lastCompleteTeam = teamUsernameById[logEntry.team_id] ?? null;
          } else {
            gate.satisfied = opsData.teams.length;
            gate.lastCompleteTeam = null;
          }
        }
      }
    });

    return Object.values(gatesById);
  }, [opsData]);

  const columns = useMemo(() => {
    const columnHelper = createMRTColumnHelper<GatesIndexData>();

    return [
      columnHelper.accessor("displayName", {
        header: "Gate",
      }),
      columnHelper.accessor("round", {
        header: "Round",
        filterVariant: "multi-select",
        filterSelectOptions: HUNT.rounds.map((round) => round.title),
        sortingFn: (a, b) => a.original.order - b.original.order,
      }),
      columnHelper.accessor("satisfied", {
        header: "Teams Satisfied",
        filterVariant: "range",
      }),
      columnHelper.accessor("lastCompleteTime", {
        header: "Last Complete Time",
        Cell: ({ row }: { row: MRT_Row<GatesIndexData> }) => (
          <>
            {row.original.lastCompleteTime
              ? row.original.lastCompleteTime.toLocaleString()
              : "Never"}
            {row.original.lastCompleteTeam && (
              <>
                <br />
                <span
                  style={{
                    fontSize: "12px",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                  }}
                >
                  By {row.original.lastCompleteTeam}
                </span>
              </>
            )}
          </>
        ),
        filterVariant: "datetime-range",
      }),
    ];
  }, []);

  const table = useOpsTable({
    columns,
    data: gatesData,
    initialState: {
      sorting: [
        {
          id: "round",
          desc: false,
        },
      ],
    },
    enableRowActions: isOpsAdmin,
    renderRowActions: ({ row }) => {
      if (row.original.satisfied === opsData.teams.length) {
        return null;
      }

      return (
        <Box>
          <Tooltip title="Satisfy for all teams">
            <IconButton
              onClick={() => {
                handleSatisfyGate(row.original);
              }}
            >
              <SatisfyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
}
