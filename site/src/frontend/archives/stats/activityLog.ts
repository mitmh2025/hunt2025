import { type Options } from "csv-parse";
import { DateTime } from "luxon";
import activityLogUrl from "./assets/activity_log.csv";
import useCSV from "./useCSV";

export const HuntStart = DateTime.fromISO("2025-01-17T12:00:00-05:00");
export const HuntEnd = DateTime.fromISO("2025-01-20T12:45:00-05:00");
export const HuntHQClose = DateTime.fromISO("2025-01-19T22:00:00-05:00");

export type ActivityLogRow = {
  timestamp: DateTime;
  team_name: string;
  type:
    | "clue_exchanged"
    | "clues_adjusted"
    | "interaction_completed"
    | "interaction_started"
    | "interaction_unlocked"
    | "keys_adjusted"
    | "puzzle_answer_bought"
    | "puzzle_guess_submitted"
    | "puzzle_hint_requested"
    | "puzzle_hint_responded"
    | "puzzle_partially_solved"
    | "puzzle_solved"
    | "puzzle_unlockable"
    | "puzzle_unlocked"
    | "rate_limits_reset"
    | "round_unlocked";
  slug?: string;
  answer?: string;
  result?: string;
  keys_delta: number;
  clues_delta: number;
};

export const ActivityLogParseOptions: Options = {
  columns: true,
  cast: (value, context) => {
    if (context.column === "timestamp") {
      return DateTime.fromSQL(value, { zone: "America/New_York" });
    }
    if (context.column === "keys_delta") {
      return parseInt(value, 10);
    }
    if (context.column === "clues_delta") {
      return parseInt(value, 10);
    }
    return value;
  },
};

export const useActivityLog = () => {
  return useCSV<ActivityLogRow>({
    url: activityLogUrl,
    parseOptions: ActivityLogParseOptions,
  });
};
