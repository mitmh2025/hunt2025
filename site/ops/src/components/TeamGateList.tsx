import SatisfyIcon from "@mui/icons-material/LockOpen";
import { Box, IconButton } from "@mui/material";
import { useDialogs, useNotifications } from "@toolpad/core";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  type MRT_Cell,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import HUNT from "../../../src/huntdata";
import { useOpsData } from "../OpsDataProvider";
import { type TeamData } from "../opsdata/types";
import { useIsOpsAdmin } from "./AdminOnly";

type GateListEntry = {
  id: string;
  displayName: string;
  round: string;
  satisfied: boolean;
};

export default function TeamGateList({ team }: { team: TeamData }) {
  const dialogs = useDialogs();
  const notifications = useNotifications();
  const opsData = useOpsData();
  const isOpsAdmin = useIsOpsAdmin();

  const handleSatisfyGate = (gate: GateListEntry) => {
    dialogs
      .confirm(
        `Are you sure you want to mark ${gate.displayName} satisfied for ${team.username}?`,
        {
          title: "Satisfy Gate",
          okText: "Mark Satisfied",
          cancelText: "Cancel",
          onClose: async (result) => {
            if (!result) {
              return;
            }

            try {
              const res = await opsData.adminClient.markGateSatistfied({
                params: { gateId: gate.id },
                body: { teamIds: [team.teamId] },
              });

              if (res.status !== 200) {
                throw new Error(`HTTP ${res.status}: ${res.body}`);
              }

              opsData.appendActivityLogEntries(res.body);

              notifications.show(
                `Satisfied ${gate.displayName} for ${team.username}`,
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

  const data: GateListEntry[] = useMemo(() => {
    return HUNT.rounds.flatMap((round) =>
      (round.gates ?? []).map((gate) => ({
        id: gate.id,
        displayName: `${gate.title ?? gate.internal_description ?? "Untitled Gate"} (${gate.id})`,
        round: round.title,
        satisfied: team.state.gates_satisfied.has(gate.id),
      })),
    );
  }, [team]);

  const columns = useMemo(() => {
    const columnHelper = createMRTColumnHelper<GateListEntry>();

    const allRounds = HUNT.rounds.map((round) => round.title);

    return [
      columnHelper.accessor("displayName", {
        header: "Gate",
        grow: true,
      }),
      columnHelper.accessor("round", {
        header: "Round",
        filterVariant: "multi-select",
        filterSelectOptions: allRounds,
        grow: false,
        size: 200,
      }),
      columnHelper.accessor("satisfied", {
        header: "Satisfied",
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
        grow: false,
        size: 200,
        Cell({ cell }: { cell: MRT_Cell<GateListEntry, boolean> }) {
          return cell.getValue() ? "✅ Yes" : "❌ No";
        },
      }),
    ];
  }, []);

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      density: "compact",
      sorting: [
        {
          id: "displayName",
          desc: false,
        },
      ],
      showGlobalFilter: true,
    },
    layoutMode: "grid-no-grow",
    enableDensityToggle: false,
    enableRowActions: isOpsAdmin,
    renderRowActions: ({ row }) => {
      if (row.original.satisfied) {
        return null;
      }

      return (
        <Box>
          <IconButton
            onClick={() => {
              handleSatisfyGate(row.original);
            }}
          >
            <SatisfyIcon />
          </IconButton>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
}
