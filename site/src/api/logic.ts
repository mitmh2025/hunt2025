import { type TeamInfo } from "../../lib/api/client";
import {
  type InteractionState,
  type TeamRegistration,
  type TeamRegistrationState,
} from "../../lib/api/contract";
import {
  type TeamRegistrationLogEntry,
  type InternalActivityLogEntry,
} from "../../lib/api/frontend_contract";
import { type Hydratable } from "../../lib/types";
import { generateSlugToSlotMap, type SlotLookup } from "../huntdata";
import { getSlotSlug, LogicTeamState } from "../huntdata/logic";
import type { Hunt } from "../huntdata/types";

export class TeamStateIntermediate extends LogicTeamState {
  epoch: number; // The largest value of `id` that was processed/relevant
  puzzles_unlocked_at: Map<string, number /* epoch */>;
  puzzles_partially_solved: Set<string>;
  private slugToSlotMap: Map<string, SlotLookup>;
  correct_answers: Map<string, string>;

  static redisKey = "team_state_intermediate";

  constructor(
    hunt: Hunt,
    initial?: Partial<Hydratable<TeamStateIntermediate>>,
  ) {
    super(initial);
    this.epoch = initial?.epoch ?? -1;
    this.puzzles_unlocked_at = new Map(initial?.puzzles_unlocked_at ?? []);
    this.puzzles_partially_solved = new Set(
      initial?.puzzles_partially_solved ?? [],
    );
    this.slugToSlotMap = generateSlugToSlotMap(hunt);
    this.correct_answers = new Map(initial?.correct_answers ?? []);
  }

  reduce(entry: InternalActivityLogEntry) {
    this.available_currency += entry.currency_delta;
    this.available_strong_currency += entry.strong_currency_delta;
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
        this.correct_answers.set(entry.slug, entry.data.answer);
      // fallthrough - solved implies unlocked
      case "puzzle_unlocked": {
        this.puzzles_unlocked.add(entry.slug);
        if (!this.puzzles_unlocked_at.has(entry.slug)) {
          this.puzzles_unlocked_at.set(entry.slug, entry.id);
        }
        // If this puzzle is not assigned to a round, or if the round to which
        // it is assigned is not unlocked at the time the puzzle unlocks, then
        // it will be included henceforth in the puzzle outlands (stray leads).
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
      case "puzzle_partially_solved":
        this.puzzles_partially_solved.add(entry.slug);
        break;
    }
    return this;
  }

  dehydrate(): Partial<Hydratable<TeamStateIntermediate>> {
    return {
      epoch: this.epoch,
      puzzles_unlocked_at: Array.from(this.puzzles_unlocked_at),
      puzzles_partially_solved: Array.from(this.puzzles_partially_solved),
      rounds_unlocked: Array.from(this.rounds_unlocked),
      puzzles_unlockable: Array.from(this.puzzles_unlockable),
      puzzles_unlocked: Array.from(this.puzzles_unlocked),
      puzzles_stray: Array.from(this.puzzles_stray),
      puzzles_solved: Array.from(this.puzzles_solved),
      gates_satisfied: Array.from(this.gates_satisfied),
      interactions_unlocked: Array.from(this.interactions_unlocked),
      interactions_started: Array.from(this.interactions_started),
      interactions_completed: Array.from(this.interactions_completed),
      correct_answers: Array.from(this.correct_answers),
      available_currency: this.available_currency,
      available_strong_currency: this.available_strong_currency,
    };
  }
}

// Converts from the serialized activity log entry (which e.g. has a string for timestamp)
// into the in-memory representation (which e.g. has a Date object).
export function hydrateLogEntry<D extends { timestamp: string | Date }>(
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
                {
                  title: interaction.title,
                  ...(data.interactions_completed.has(interaction.id)
                    ? {
                        state: "completed" as const,
                        result: data.interactions_completed.get(interaction.id),
                      }
                    : data.interactions_started.has(interaction.id)
                      ? { state: "running" as const }
                      : { state: "unlocked" as const }),
                },
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
    strong_currency: data.available_strong_currency,
    puzzles: Object.fromEntries(
      [...data.puzzles_visible].map((slug) => [
        slug,
        {
          round: puzzleRounds[slug] ?? "stray_leads", // TODO: Should this be hardcoded?
          locked: data.puzzles_unlocked.has(slug)
            ? ("unlocked" as const)
            : data.puzzles_unlockable.has(slug)
              ? ("unlockable" as const)
              : ("locked" as const),
          partially_solved: data.puzzles_partially_solved.has(slug),
          unlocked_at: data.puzzles_unlocked_at.get(slug),
          answer: data.correct_answers.get(slug),
          ...(data.puzzles_stray.has(slug) ? { stray: true } : {}),
        },
      ]),
    ),
    gates_satisfied: [...data.gates_satisfied],
  };
}

export class TeamInfoIntermediate {
  epoch: number; // The largest value of `id` that was processed/relevant
  registration?: TeamRegistration;
  deactivated: boolean;

  constructor(initial?: Partial<TeamInfoIntermediate>) {
    this.epoch = initial?.epoch ?? -1;
    this.registration = initial?.registration;
    this.deactivated = initial?.deactivated ?? false;
  }

  dehydrate(): Partial<Hydratable<TeamInfoIntermediate>> {
    return {
      epoch: this.epoch,
      registration: this.registration,
      deactivated: this.deactivated,
    };
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
          break;
        case "team_deactivated":
          this.deactivated = true;
          break;
        case "team_reactivated":
          this.deactivated = false;
          break;
        case "team_password_change":
          this.registration = {
            ...this.registration,
            password: entry.data.new_password,
          };
          break;
        default:
          entry satisfies never;
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
      teamUsername: this.registration.username,
    };
  }

  formatTeamInfoIfActive(): TeamInfo | undefined {
    const registration = this.formatTeamRegistrationIfActive();
    if (registration === undefined) {
      return undefined;
    }

    return {
      epoch: this.epoch,
      teamName: registration.name,
      teamUsername: registration.username,
    };
  }

  formatTeamRegistration(): TeamRegistration | undefined {
    return this.registration;
  }

  formatTeamRegistrationState(): TeamRegistrationState | undefined {
    if (this.registration === undefined) {
      return undefined;
    }
    return {
      epoch: this.epoch,
      ...this.registration,
    };
  }

  formatTeamRegistrationStateIfActive(): TeamRegistrationState | undefined {
    const registration = this.formatTeamRegistrationIfActive();
    if (registration === undefined) {
      return undefined;
    }

    return {
      epoch: this.epoch,
      ...registration,
    };
  }

  isActive(): boolean {
    return !!this.registration && !this.deactivated;
  }

  formatTeamRegistrationIfActive(): TeamRegistration | undefined {
    return this.isActive() ? this.registration : undefined;
  }
}

export class PuzzleStateIntermediate {
  private _slug: string;
  epoch: number;
  guesses: Extract<
    InternalActivityLogEntry,
    { type: "puzzle_guess_submitted" }
  >[];
  hints: Extract<
    InternalActivityLogEntry,
    {
      type: "puzzle_hint_requested" | "puzzle_hint_responded";
    }
  >[];

  constructor(
    slug: string,
    initial?: Partial<Hydratable<PuzzleStateIntermediate>>,
  ) {
    this._slug = slug;
    this.epoch = initial?.epoch ?? 0;
    this.guesses = Array.from(initial?.guesses ?? []).map(hydrateLogEntry);
    this.hints = Array.from(initial?.hints ?? []).map(hydrateLogEntry);
  }

  reduce(entry: InternalActivityLogEntry) {
    if (entry.id > this.epoch) {
      this.epoch = entry.id;
    } else {
      throw new Error(
        `Attempting to reduce activity log entry ${entry.id} on top of team state that already includes ${this.epoch}`,
      );
    }
    if (entry.type === "puzzle_guess_submitted" && entry.slug === this._slug) {
      this.guesses.push(entry);
    } else if (
      (entry.type === "puzzle_hint_requested" ||
        entry.type === "puzzle_hint_responded") &&
      entry.slug === this._slug
    ) {
      this.hints.push(entry);
    }
    return this;
  }

  get slug() {
    return this._slug;
  }

  static redisKey(slug: string) {
    return `puzzle_state_intermediate/${slug}`;
  }

  dehydrate(): Partial<Hydratable<PuzzleStateIntermediate>> {
    return {
      epoch: this.epoch,
      guesses: this.guesses,
      hints: this.hints,
    };
  }
}
