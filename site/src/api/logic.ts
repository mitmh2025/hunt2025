import { type TeamInfo } from "../../lib/api/client";
import { type InteractionState } from "../../lib/api/contract";
import {
  type TeamRegistrationLogEntry,
  type InternalActivityLogEntry,
  type TeamRegistration,
} from "../../lib/api/frontend_contract";
import { generateSlugToSlotMap, type SlotLookup } from "../huntdata";
import { getSlotSlug, LogicTeamState } from "../huntdata/logic";
import type { Hunt } from "../huntdata/types";

export class TeamStateIntermediate extends LogicTeamState {
  epoch: number; // The largest value of `id` that was processed/relevant
  private slugToSlotMap: Map<string, SlotLookup>;

  constructor(hunt: Hunt, initial?: Partial<TeamStateIntermediate>) {
    super(initial);
    this.epoch = initial?.epoch ?? -1;
    this.slugToSlotMap = generateSlugToSlotMap(hunt);
  }

  reduce(entry: InternalActivityLogEntry) {
    this.available_currency += entry.currency_delta;
    // Update the max known epoch if this entry is newer
    if (entry.id > this.epoch) {
      this.epoch = entry.id;
    } else {
      throw new Error(
        `Attempting to reduce activity log entry ${entry.id} on top of team state that already includes ${this.epoch}`,
      );
    }
    switch (entry.type) {
      case "currency_adjusted":
        break;
      case "round_unlocked":
        this.rounds_unlocked.add(entry.slug);
        break;
      case "gate_completed":
        this.gates_satisfied.add(entry.slug);
        break;
      case "puzzle_solved":
        this.puzzles_solved.add(entry.slug);
        this.correct_answers[entry.slug] = entry.data.answer;
      // fallthrough - solved implies unlocked
      case "puzzle_unlocked": {
        this.puzzles_unlocked.add(entry.slug);
        // If this puzzle is not assigned to a round, or if the round to which
        // it is assigned is not unlocked at the time the puzzle unlocks, then
        // it will be included henceforth in the puzzle outlands.
        const slot = this.slugToSlotMap.get(entry.slug);
        if (!slot || !this.rounds_unlocked.has(slot.roundSlug)) {
          this.puzzles_stray.add(entry.slug);
        }
        break;
      }
      case "puzzle_unlockable":
        this.puzzles_unlockable.add(entry.slug);
        break;
      case "interaction_completed":
        this.interactions_completed.set(entry.slug, entry.data.result);
      // fallthrough - completed implies started
      case "interaction_started":
        this.interactions_started.add(entry.slug);
      // fallthrough - started implies unlocked
      case "interaction_unlocked":
        this.interactions_unlocked.add(entry.slug);
        break;
    }
    return this;
  }
}

export function reducerDeriveTeamState(
  hunt: Hunt,
  teamActivityLogEntries: InternalActivityLogEntry[],
): LogicTeamState {
  const intermediate = teamActivityLogEntries.reduce(
    (acc, entry) => acc.reduce(entry),
    new TeamStateIntermediate(hunt),
  );
  // Return the LogicTeamState because the recalculated team state no longer represents a committed epoch.
  return intermediate.recalculateTeamState(hunt);
}

// Converts from the serialized activity log entry (which e.g. has a string for timestamp)
// into the in-memory representation (which e.g. has a Date object).
export function hydrateLogEntry<D extends { timestamp: string }>(
  ie: D,
): D & { timestamp: Date } {
  const ts = new Date(ie.timestamp);
  return { ...ie, timestamp: ts };
}

export function formatTeamHuntState(hunt: Hunt, data: TeamStateIntermediate) {
  const rounds = Object.fromEntries(
    hunt.rounds
      .filter(({ slug: roundSlug }) => data.rounds_unlocked.has(roundSlug))
      .map(({ slug, title, puzzles, gates, interactions }) => {
        const interactionsData: [string, InteractionState][] = (
          interactions ?? []
        ).flatMap((interaction) => {
          if (data.interactions_unlocked.has(interaction.id)) {
            return [
              [
                interaction.id,
                data.interactions_completed.has(interaction.id)
                  ? {
                      state: "completed" as const,
                      result: data.interactions_completed.get(interaction.id),
                    }
                  : data.interactions_started.has(interaction.id)
                    ? { state: "running" as const }
                    : { state: "unlocked" as const },
              ],
            ];
          }
          return [];
        });
        const interactionsMap =
          interactionsData.length > 0
            ? Object.fromEntries(interactionsData)
            : undefined;
        const interactionsMixin =
          interactionsMap !== undefined
            ? { interactions: interactionsMap }
            : {};
        return [
          slug,
          {
            title,
            slots: Object.fromEntries(
              puzzles.flatMap((slot) => {
                const slug = getSlotSlug(slot);
                if (slug && data.puzzles_visible.has(slug)) {
                  const obj = { slug, is_meta: slot.is_meta };
                  return [[slot.id, obj]];
                }
                return [];
              }),
            ),
            gates: gates?.flatMap((gate) => {
              if (gate.id && data.gates_satisfied.has(gate.id)) {
                return [gate.id];
              }
              return [];
            }),
            // Don't include interactions until one has been reached
            ...interactionsMixin,
          },
        ];
      }),
  );
  const puzzleRounds = Object.fromEntries(
    Object.entries(rounds).flatMap(([roundSlug, { slots }]) =>
      Object.entries(slots).map(([_id, { slug: puzzleSlug }]) => [
        puzzleSlug,
        roundSlug,
      ]),
    ),
  );
  return {
    epoch: data.epoch,
    rounds,
    currency: data.available_currency,
    puzzles: Object.fromEntries(
      [...data.puzzles_visible].map((slug) => [
        slug,
        {
          round: puzzleRounds[slug] ?? "outlands", // TODO: Should this be hardcoded?
          locked: data.puzzles_unlocked.has(slug)
            ? ("unlocked" as const)
            : data.puzzles_unlockable.has(slug)
              ? ("unlockable" as const)
              : ("locked" as const),
          answer: data.correct_answers[slug],
          ...(data.puzzles_stray.has(slug) ? { stray: true } : {}),
        },
      ]),
    ),
  };
}

export class TeamInfoIntermediate {
  epoch: number; // The largest value of `id` that was processed/relevant
  registration?: TeamRegistration;

  constructor(initial?: Partial<TeamInfoIntermediate>) {
    this.epoch = initial?.epoch ?? -1;
    this.registration = initial?.registration;
  }

  reduce(entry: TeamRegistrationLogEntry) {
    // Update the max known epoch if this entry is newer
    if (entry.id > this.epoch) {
      this.epoch = entry.id;
    } else {
      throw new Error(
        `Attempting to reduce team registration log entry ${entry.id} on top of team state that already includes ${this.epoch}`,
      );
    }
    if (entry.type === "team_registered") {
      if (this.registration !== undefined) {
        throw new Error(`Duplicate team registration entry ${entry.id}`);
      }
      this.registration = entry.data;
    } else {
      if (this.registration === undefined) {
        throw new Error(
          `Team registration log entry ${entry.id} predates the team_registered entry`,
        );
      }
      switch (entry.type) {
        case "team_name_changed":
          this.registration.name = entry.data.name;
          break;
        case "team_registration_updated":
          this.registration = {
            username: this.registration.username,
            password: this.registration.password,
            name: this.registration.name,
            ...entry.data,
          };
      }
    }
    return this;
  }

  formatTeamInfo(): TeamInfo | undefined {
    if (this.registration === undefined) {
      return undefined;
    }
    return {
      epoch: this.epoch,
      teamName: this.registration.name,
    };
  }

  formatTeamRegistration(): TeamRegistration | undefined {
    return this.registration;
  }
}
