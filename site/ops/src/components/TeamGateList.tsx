import {
  createMRTColumnHelper,
  MaterialReactTable,
  type MRT_Cell,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import HUNT from "../../../src/huntdata";
import { type TeamData } from "../opsdata/types";

type GateListEntry = {
  id: string;
  displayName: string;
  round: string;
  satisfied: boolean;
};

export default function TeamGateList({ team }: { team: TeamData }) {
  const data: GateListEntry[] = useMemo(() => {
    return HUNT.rounds.flatMap((round) =>
      (round.gates ?? []).map((gate) => ({
        id: gate.id,
        displayName: gate.title ? `${gate.title} (${gate.id})` : gate.id,
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
    },
    layoutMode: "grid-no-grow",
    enableDensityToggle: false,
  });

  return <MaterialReactTable table={table} />;
}
