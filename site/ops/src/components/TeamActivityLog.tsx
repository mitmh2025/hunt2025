import {
  createMRTColumnHelper,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { type InternalActivityLogEntry } from "../../../lib/api/frontend_contract";
import HUNT from "../../../src/huntdata";
import { useOpsData } from "../OpsDataProvider";
import { slugTitle } from "../opsdata/puzzleTitles";

export default function TeamActivityLog({
  activity,
}: {
  activity: InternalActivityLogEntry[];
}) {
  const opsData = useOpsData();

  const roundNames = useMemo(
    () =>
      HUNT.rounds.reduce<Record<string, string>>((acc, round) => {
        acc[round.slug] = round.title;
        return acc;
      }, {}),
    [],
  );

  const columns = useMemo(() => {
    const columnHelper = createMRTColumnHelper<InternalActivityLogEntry>();

    const allTypes = new Set<string>();
    activity.forEach((entry) => allTypes.add(entry.type));
    const allTypesArray = Array.from(allTypes).sort();

    return [
      columnHelper.accessor("timestamp", {
        header: "Time",
        Cell: ({ cell }) => cell.getValue().toLocaleString(),
        filterVariant: "datetime-range",
        grow: false,
        size: 300,
      }),
      columnHelper.accessor("type", {
        header: "Type",
        filterVariant: "multi-select",
        filterSelectOptions: allTypesArray,
        grow: false,
        size: 200,
      }),
      columnHelper.accessor(
        (entry) => {
          switch (entry.type) {
            case "currency_adjusted":
              return `Currency adjusted by ${entry.currency_delta}`;
            case "gate_completed": {
              const desc = opsData.gateDetails[entry.slug]?.title
                ? `(${opsData.gateDetails[entry.slug]?.title})`
                : "";
              return `Gate completed: ${entry.slug} ${desc} - ${opsData.gateDetails[entry.slug]?.roundTitle}`;
            }
            case "round_unlocked":
              return `Round unlocked: ${roundNames[entry.slug]}`;
            case "puzzle_unlockable":
              return `Puzzle unlockable: ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
            case "puzzle_unlocked":
              return `Puzzle unlocked: ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
            case "puzzle_solved":
              return `Puzzle solved: ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
            case "puzzle_partially_solved":
              return `Puzzle partially solved: ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
            case "puzzle_guess_submitted":
              return `Puzzle guess submitted: ${slugTitle(entry.slug, opsData.puzzleMetadata)} - ${entry.data.canonical_input}`;
            case "interaction_completed":
              return `Interaction completed: ${entry.slug}: ${entry.data.result}`;
            case "interaction_started":
              return `Interaction started: ${entry.slug}`;
            case "interaction_unlocked":
              return `Interaction unlocked: ${entry.slug}`;
            case "rate_limits_reset":
              return `Rate limits reset for ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
          }
        },
        {
          header: "Activity",
          grow: true,
        },
      ),
    ];
  }, [opsData, roundNames, activity]);

  const table = useMaterialReactTable({
    columns,
    data: activity,
    initialState: {
      density: "compact",
      sorting: [
        {
          id: "timestamp",
          desc: true,
        },
      ],
    },
    layoutMode: "grid-no-grow",
    enableDensityToggle: false,
  });

  return <MaterialReactTable table={table} />;
}
