import { type DehydratedActivityLogEntry } from "../../lib/api/contract";
import { type InternalActivityLogEntry } from "../../lib/api/frontend_contract";
import { INTERACTIONS } from "../frontend/interactions";
import { PUZZLES } from "../frontend/puzzles";
import HUNT, { GATE_LOOKUP } from "../huntdata";
import { fixData } from "./db";

export default function formatActivityLogEntryForApi(
  e: InternalActivityLogEntry,
): DehydratedActivityLogEntry | undefined {
  switch (e.type) {
    case "puzzle_guess_submitted":
      return undefined;
  }
  let entry: Partial<DehydratedActivityLogEntry> = {
    id: e.id,
    timestamp: e.timestamp.toISOString(),
    currency_delta: e.currency_delta,
    strong_currency_delta: e.strong_currency_delta,
    type: e.type,
  };
  if ("team_id" in e && e.team_id) {
    (entry as { team_id: number }).team_id = e.team_id;
  }
  if ("slug" in e && e.slug) {
    (entry as { slug: string }).slug = e.slug;
    switch (entry.type) {
      case "currency_adjusted":
        break;
      case "round_unlocked":
        {
          const round = HUNT.rounds.find((round) => round.slug === e.slug);
          if (round) {
            entry = Object.assign(entry, { title: round.title });
          }
        }
        break;
      case "rate_limits_reset":
      case "puzzle_unlockable":
      case "puzzle_unlocked":
      case "puzzle_partially_solved":
      case "puzzle_solved":
      case "puzzle_answer_bought":
        {
          const title = PUZZLES[e.slug]?.title;
          entry = Object.assign(entry, {
            title: title ?? `Stub puzzle for slot ${e.slug}`,
          });
        }
        break;
      case "interaction_unlocked":
      case "interaction_started":
      case "interaction_completed":
        {
          const interaction = INTERACTIONS[
            e.slug as keyof typeof INTERACTIONS
          ] as undefined | (typeof INTERACTIONS)[keyof typeof INTERACTIONS];
          entry = Object.assign(entry, {
            title: interaction?.title ?? `Untitled interaction ${e.slug}`,
          });
        }
        break;
      case "gate_completed":
        {
          const gate = GATE_LOOKUP.get(e.slug);
          entry = Object.assign(entry, {
            title: gate?.gate.title,
            show_notification: gate?.gate.show_notification ?? false,
          });
        }
        break;
    }
  }
  // Note: API objects flatten `data` into the object.
  // We do not expose anything from `internal_data` in the public API.
  if ("data" in e) {
    // SQLite doesn't parse JSON automatically
    const data = fixData(e.data);
    entry = Object.assign(entry, data);
  }

  return entry as DehydratedActivityLogEntry;
}
