import { type InternalActivityLogEntry } from "../lib/api/frontend_contract";
import canonicalizeInput from "../lib/canonicalizeInput";
import { TeamStateIntermediate } from "../src/api/logic";
import HUNT from "../src/huntdata";
import { type Interaction, type Hunt } from "../src/huntdata/types";
import Touchpoints, { type TouchpointSlug } from "./Touchpoints";
import { type ZammadTicketType } from "./zammadApi";

const activityCreatesTouchpointTicket = (
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

const activityCreatesInteractionTicket = (
  entry: InternalActivityLogEntry,
): Interaction | undefined => {
  if (entry.type !== "interaction_unlocked") return undefined;

  const interaction = HUNT.rounds
    .flatMap((r) => r.interactions ?? [])
    .find((i) => i.id === entry.slug);
  if (!interaction) return undefined;
  return interaction.virtual ? undefined : interaction;
};

class TeamTicketState {
  teamState: TeamStateIntermediate;
  needTouchpointTickets: Set<TouchpointSlug>;
  haveTouchpointTickets: Map<TouchpointSlug, ZammadTicketType>;
  needInteractionTickets: Map<string, string>;
  haveInteractionTickets: Map<string, ZammadTicketType>;
  hintTickets: Map<string, ZammadTicketType>; // key is puzzle slug

  constructor(hunt: Hunt, initial?: Partial<TeamTicketState>) {
    this.teamState = new TeamStateIntermediate(hunt, initial?.teamState);
    this.needTouchpointTickets = new Set(initial?.needTouchpointTickets ?? []);
    this.haveTouchpointTickets = new Map(initial?.haveTouchpointTickets ?? []);
    this.needInteractionTickets = new Map(
      initial?.needInteractionTickets ?? [],
    );
    this.haveInteractionTickets = new Map(
      initial?.haveInteractionTickets ?? [],
    );
    this.hintTickets = new Map(initial?.hintTickets ?? []);
  }

  reduce(entry: InternalActivityLogEntry) {
    this.teamState.reduce(entry);
    for (const s of Object.keys(Touchpoints) as TouchpointSlug[]) {
      if (activityCreatesTouchpointTicket(entry, s)) {
        this.needTouchpointTickets.add(s);
      }

      const interaction = activityCreatesInteractionTicket(entry);
      if (interaction) {
        this.needInteractionTickets.set(interaction.id, interaction.title);
      }
    }

    // haveTouchpointTickets and haveInteractionTickets are populated by Zammad
    // ticket changes, not by the activity log. hintTickets is populated directly

    return this;
  }
}

export default TeamTicketState;
