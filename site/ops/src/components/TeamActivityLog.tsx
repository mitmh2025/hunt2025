import {
  createMRTColumnHelper,
  MaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { type InternalActivityLogEntry } from "../../../lib/api/frontend_contract";
import HUNT, { GATE_LOOKUP } from "../../../src/huntdata";
import { useOpsData } from "../OpsDataProvider";
import { slugTitle } from "../opsdata/puzzleTitles";
import { useOpsTable } from "../util/useOpsTable";

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
            case "strong_currency_adjusted":
              activity = `Clues adjusted by ${entry.strong_currency_delta}`;
              break;
            case "strong_currency_exchanged":
              activity = `Clue exchanged for ${entry.currency_delta} keys`;
              break;
            case "puzzle_answer_bought":
              activity = `Puzzle answer bought: ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
              break;
            case "erratum_issued":
              activity = `Erratum issued for ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
              break;
            case "puzzle_hint_requested":
              activity = `Hint requested for ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
              break;
            case "puzzle_hint_responded":
              activity = `Hint request responded to for ${slugTitle(entry.slug, opsData.puzzleMetadata)}`;
              break;
            case "teams_notified":
              activity = entry.data.message;
              break;
            case "global_hints_unlocked":
              activity = `Global hint unlock for ${slugTitle(entry.slug, opsData.puzzleMetadata)} with time delay ${entry.data.minimum_unlock_hours} hours`;
              break;
            case "team_hints_unlocked":
              activity = `Team has unlocked hints for ${slugTitle(entry.slug, opsData.puzzleMetadata)} (after ${entry.data.hints_available_at})`;
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

  const table = useOpsTable({
    columns,
    data: activity,
    initialState: {
      sorting: [
        {
          id: "timestamp",
          desc: true,
        },
      ],
    },
    layoutMode: "grid-no-grow",
  });

  return <MaterialReactTable table={table} />;
}
