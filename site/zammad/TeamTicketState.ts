import { type InternalActivityLogEntry } from "../lib/api/frontend_contract";
import canonicalizeInput from "../lib/canonicalizeInput";
import { TeamStateIntermediate } from "../src/api/logic";
import { type Hunt } from "../src/huntdata/types";
import Touchpoints, { type TouchpointSlug } from "./Touchpoints";
import { type ZammadTicketType } from "./zammadApi";

const activityCreatesTicket = (
  entry: InternalActivityLogEntry,
  s: TouchpointSlug,
): boolean => {
  const trigger = Touchpoints[s];
  const { created_if } = trigger;
  switch (created_if.type) {
    case "slug_unlocked":
      return entry.type === "puzzle_unlocked" && entry.slug === created_if.slug;
    case "slug_partially_solved":
      return (
        entry.type === "puzzle_guess_submitted" &&
        entry.slug === created_if.slug &&
        canonicalizeInput(entry.data.canonical_input) ===
          canonicalizeInput(created_if.answer)
      );
    case "gate_satisfied":
      return entry.type === "gate_completed" && entry.slug === created_if.gate;
    default:
      created_if satisfies never;
      return false;
  }
};

class TeamTicketState {
  teamState: TeamStateIntermediate;
  needTouchpointTickets: Set<TouchpointSlug>;
  haveTouchpointTickets: Map<TouchpointSlug, ZammadTicketType>;

  constructor(hunt: Hunt, initial?: Partial<TeamTicketState>) {
    this.teamState = new TeamStateIntermediate(hunt, initial?.teamState);
    this.needTouchpointTickets = new Set(initial?.needTouchpointTickets ?? []);
    this.haveTouchpointTickets = new Map(initial?.haveTouchpointTickets ?? []);
  }

  reduce(entry: InternalActivityLogEntry) {
    this.teamState.reduce(entry);
    for (const s of Object.keys(Touchpoints) as TouchpointSlug[]) {
      if (activityCreatesTicket(entry, s)) {
        this.needTouchpointTickets.add(s);
      }
    }

    // haveTouchpointTickets is populated by Zammad ticket changes, not by the
    // activity log.

    return this;
  }
}

export default TeamTicketState;
