import { type ActivityLogEntry } from "../../../lib/api/client";
import { type DehydratedActivityLogEntry } from "../../../lib/api/contract";
import { TIMELINE_NODES_BY_KEY, TIMELINE_SLUGS_AND_TYPES } from "./data";
import { type TimelineActivityLogEntry } from "./types";

export function generateActivityLogForTimeline(
  entry: DehydratedActivityLogEntry | ActivityLogEntry,
): TimelineActivityLogEntry | undefined {
  if (!("slug" in entry)) {
    return undefined;
  }
  const key = `${entry.type}-${entry.slug}`;
  if (!TIMELINE_SLUGS_AND_TYPES.has(key)) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it's thursday deal with it
  const node = TIMELINE_NODES_BY_KEY[key]!;
  const baseTime = Date.parse("2025-01-17T12:00:00.000-05:00");
  const timestamp =
    process.env.NODE_ENV === "development"
      ? new Date(baseTime + node.defaultTime * 60000)
      : new Date(entry.timestamp);

  return {
    id: entry.id,
    slug: entry.slug,
    type: entry.type,
    answer: "answer" in entry ? entry.answer : undefined,
    timestamp,
    node,
  };
}
