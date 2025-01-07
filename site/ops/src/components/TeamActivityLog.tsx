import {
  createMRTColumnHelper,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { type InternalActivityLogEntry } from "../../../lib/api/frontend_contract";
import HUNT, { GATE_LOOKUP } from "../../../src/huntdata";
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
          let activity = "";

          switch (entry.type) {
            case "currency_adjusted":
              activity = `Keys adjusted by ${entry.currency_delta}`;
              break;
            case "gate_completed": {
              const gate = GATE_LOOKUP.get(entry.slug);
              const displayName = `${gate?.gate.title ?? gate?.gate.internal_description ?? "Untitled Gate"} (${entry.slug})`;
              activity = `Gate completed: ${displayName} - ${opsData.gateDetails[entry.slug]?.roundTitle}`;
              break;
            }
            case "round_unlocked":
              activity = `Round unlocked: ${roundNames[entry.slug]}`;
              break;
            case "puzzle_unlockable":
              activity = `Puzzle unlockable: ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
              break;
            case "puzzle_unlocked":
              activity = `Puzzle unlocked: ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
              break;
            case "puzzle_solved":
              activity = `Puzzle solved: ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
              break;
            case "puzzle_partially_solved":
              activity = `Puzzle partially solved: ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
              break;
            case "puzzle_guess_submitted":
              activity = `Puzzle guess submitted: ${slugTitle(entry.slug, opsData.puzzleMetadata)} - ${entry.data.canonical_input}`;
              break;
            case "interaction_completed":
              activity = `Interaction completed: ${entry.slug}: ${entry.data.result}`;
              break;
            case "interaction_started":
              activity = `Interaction started: ${entry.slug}`;
              break;
            case "interaction_unlocked":
              activity = `Interaction unlocked: ${entry.slug}`;
              break;
            case "rate_limits_reset":
              activity = `Rate limits reset for ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
              break;
          }

          if (entry.internal_data?.operator) {
            activity += ` (by operator: ${entry.internal_data.operator})`;
          }

          return activity;
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
