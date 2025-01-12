import { type ActivityLogEntry } from "../../../lib/api/client";
import { type DehydratedActivityLogEntry } from "../../../lib/api/contract";
import { type TimelineActivityLogEntry } from "./types";

export function generateActivityLogForTimeline(
  entry: DehydratedActivityLogEntry | ActivityLogEntry,
): TimelineActivityLogEntry | undefined {
  if (entry.type !== "puzzle_solved") {
    return undefined;
  }

  return {
    id: entry.id,
    slug: entry.slug,
  };
}
