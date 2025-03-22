import sanitizeHtml from "sanitize-html";
import type { z } from "zod";
import {
  type SubpuzzleState,
  type PuzzleState,
  type TeamHuntState,
  type TeamInfo,
} from "../../lib/api/client";
import {
  type GuessStatus,
  type InteractionState,
  type TeamRegistration,
  type TeamRegistrationState,
} from "../../lib/api/contract";
import {
  type TeamRegistrationLogEntry,
  type InternalActivityLogEntry,
  type PuzzleStateLogEntry,
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
  outstanding_hint_requests: Set<string>;

  private virtualInteractions: Set<string>;

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
    this.correct_answers = new Map(initial?.correct_answers ?? []);
    this.outstanding_hint_requests = new Set(
      initial?.outstanding_hint_requests,
    );

    this.slugToSlotMap = generateSlugToSlotMap(hunt);
    this.virtualInteractions = new Set(
      hunt.rounds
        .flatMap((round) => round.interactions ?? [])
        .filter((interaction) => interaction.virtual)
        .map((interaction) => interaction.id),
    );
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
        if (!this.puzzle_unlocked_timestamp.has(entry.slug)) {
          this.puzzle_unlocked_timestamp.set(entry.slug, entry.timestamp);
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
      case "interaction_completed": {
        this.interactions_completed.set(entry.slug, entry.data.result);

        if (this.virtualInteractions.has(entry.slug)) {
          if (this.queued_interactions.length > 0) {
            this.next_interaction = this.queued_interactions.shift();
            this.next_interaction_queued_at = entry.timestamp;
          } else {
            this.next_interaction = undefined;
            this.next_interaction_queued_at = undefined;
          }
        }

        break;
      }
      case "interaction_started":
        this.interactions_started.add(entry.slug);
        break;
      case "interaction_unlocked": {
        this.interactions_unlocked.add(entry.slug);

        if (this.virtualInteractions.has(entry.slug)) {
          if (!this.next_interaction) {
            // no queued interaction -- queue this one
            this.next_interaction = entry.slug;
            this.next_interaction_queued_at = entry.timestamp;
          } else {
            this.queued_interactions.push(entry.slug);
          }
        }
        break;
      }
      case "puzzle_partially_solved":
        this.puzzles_partially_solved.add(entry.slug);
        break;
      case "global_hints_unlocked": {
        this.global_hints_unlocked_delta.set(
          entry.slug,
          entry.data.minimum_unlock_hours,
        );
        break;
      }
      case "team_hints_unlocked": {
        this.team_hints_unlocked_timestamp.set(
          entry.slug,
          new Date(entry.data.hints_available_at),
        );
        break;
      }
      case "puzzle_hint_requested":
        this.outstanding_hint_requests.add(entry.slug);
        break;
      case "puzzle_hint_responded":
        this.outstanding_hint_requests.delete(entry.slug);
        break;
    }
    return this;
  }

  dehydrate(): Hydratable<TeamStateIntermediate> {
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
      puzzle_unlocked_timestamp: Array.from(this.puzzle_unlocked_timestamp),
      global_hints_unlocked_delta: Array.from(this.global_hints_unlocked_delta),
      outstanding_hint_requests: Array.from(this.outstanding_hint_requests),
      team_hints_unlocked_timestamp: Array.from(
        this.team_hints_unlocked_timestamp,
      ),
      puzzles_visible: Array.from(this.puzzles_visible),
      next_interaction: this.next_interaction,
      next_interaction_queued_at: this.next_interaction_queued_at,
      queued_interactions: this.queued_interactions,
    };
  }

  formatPuzzleState(slug: string, puzzle_state: PuzzleStateIntermediate) {
    // Look up the slot for this slug.  If the slot does not exist in the hunt, we do not provide a
    // puzzle state for it.
    const slotEntry = this.slugToSlotMap.get(slug);
    if (!slotEntry) {
      return undefined;
    }

    // The slot entry contains the round slug for the round that canonically contains this puzzle slug.
    let round = slotEntry.roundSlug;

    const round_unlocked = this.rounds_unlocked.has(round);
    // TODO: If the round to which the slug belongs is not unlocked, we mark it as in the "stray_leads" round.
    if (!round_unlocked) {
      round = "stray_leads"; // TODO: configurable?
    }

    // The puzzle must be either unlockable or unlocked.
    if (
      !this.puzzles_unlockable.has(slug) &&
      !this.puzzles_unlocked.has(slug)
    ) {
      return undefined;
    }

    const locked: "locked" | "unlockable" | "unlocked" =
      this.puzzles_unlocked.has(slug)
        ? "unlocked"
        : this.puzzles_unlockable.has(slug)
          ? "unlockable"
          : "locked";

    const correct_answers = puzzle_state.guesses
      .filter((e) => e.data.status === "correct")
      .map((e) => e.data.canonical_input)
      .sort();

    const result: PuzzleState = {
      epoch: puzzle_state.epoch,
      round,
      locked,
      guesses: puzzle_state.guesses.map(
        ({
          data: { canonical_input, link, status, response },
          id,
          timestamp,
        }) => ({
          id,
          canonical_input,
          ...(link !== undefined
            ? { link: { display: link.display, href: link.href } }
            : {}),
          status,
          response,
          timestamp: timestamp.toISOString(),
        }),
      ),
      hints: puzzle_state.hints.map((hint) => {
        if (hint.type === "puzzle_hint_requested") {
          return {
            id: hint.id,
            timestamp: hint.timestamp.toISOString(),
            type: "puzzle_hint_requested",
            data: hint.data,
          };
        } else {
          return {
            id: hint.id,
            timestamp: hint.timestamp.toISOString(),
            type: "puzzle_hint_responded",
            data: {
              response: sanitizeHtml(hint.data.response),
            },
          };
        }
      }),
    };
    if (correct_answers.length > 0) {
      result.answer = correct_answers.join(", ");
    }
    return result;
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

export function formatTeamHuntState(
  hunt: Hunt,
  data: TeamStateIntermediate,
): TeamHuntState {
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
                  virtual: interaction.virtual,
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
    outstanding_hint_requests: Array.from(data.outstanding_hint_requests),
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
          hints_unlocked_at: data.team_hints_unlocked_timestamp
            .get(slug)
            ?.toISOString(),
          answer: data.correct_answers.get(slug),
          ...(data.puzzles_stray.has(slug) ? { stray: true } : {}),
        },
      ]),
    ),
    gates_satisfied: [...data.gates_satisfied],
    next_interaction: data.next_interaction ?? undefined,
    next_interaction_queued_at: data.next_interaction_queued_at?.toISOString(),
  };
}

type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never;

type DistributivePick<T, K extends keyof T> = T extends unknown
  ? Pick<T, K>
  : never;

// This is effectively a re-derivation of InsertActivityLogEntry but this file
// shouldn't have any database dependencies
export type AppendableActivityLogEntry = DistributiveOmit<
  InternalActivityLogEntry,
  "id" | "timestamp" | "currency_delta" | "strong_currency_delta"
> &
  Partial<
    DistributivePick<
      InternalActivityLogEntry,
      "currency_delta" | "strong_currency_delta"
    >
  >;

export type ActivityLogMutatorInterface = {
  getTeamState(hunt: Hunt, teamId: number): TeamStateIntermediate;
  appendLog(entry: AppendableActivityLogEntry): Promise<unknown>;
};

export async function recalculateTeamState(
  hunt: Hunt,
  team_id: number,
  mutator: ActivityLogMutatorInterface,
) {
  const start = performance.now();

  // What is already present in the activity log?
  const old = mutator.getTeamState(hunt, team_id);

  // What /should/ be in the activity log, based on the hunt description?
  const next = old.recalculateTeamState(hunt);
  const calculate_team_state_done = performance.now();

  // Compute the differences, and generate the requisite inserts.
  for (const slug of next.rounds_unlocked.difference(old.rounds_unlocked)) {
    await mutator.appendLog({
      team_id,
      type: "round_unlocked",
      slug,
    });
  }
  const unlock_rounds_done = performance.now();
  // These diff against the next state to make sure we don't insert an activity log entry out-of-order.
  const diff = {
    // puzzles_visible: next.puzzles_visible.difference(old.puzzles_visible),
    puzzles_unlockable: next.puzzles_unlockable
      .difference(old.puzzles_unlockable)
      .difference(next.puzzles_unlocked),
    puzzles_unlocked: next.puzzles_unlocked
      .difference(old.puzzles_unlocked)
      .difference(next.puzzles_solved),
    interactions_unlocked: next.interactions_unlocked
      .difference(old.interactions_unlocked)
      .difference(next.interactions_started),
    gates_satisfied: next.gates_satisfied.difference(old.gates_satisfied),
  };
  const diff_done = performance.now();
  for (const slug of diff.puzzles_unlockable) {
    await mutator.appendLog({
      team_id,
      type: "puzzle_unlockable",
      slug,
    });
  }
  const puzzles_unlockable_done = performance.now();
  for (const slug of diff.puzzles_unlocked) {
    await mutator.appendLog({
      team_id,
      type: "puzzle_unlocked",
      slug,
    });
  }
  const puzzles_unlock_done = performance.now();
  for (const id of diff.interactions_unlocked) {
    await mutator.appendLog({
      team_id,
      type: "interaction_unlocked",
      slug: id,
    });
  }
  const interactions_unlock_done = performance.now();
  for (const id of diff.gates_satisfied) {
    await mutator.appendLog({
      team_id,
      type: "gate_completed",
      slug: id,
    });
  }
  const gates_completed_done = performance.now();
  for (const [slug, timestamp] of next.team_hints_unlocked_timestamp) {
    if (!old.team_hints_unlocked_timestamp.has(slug)) {
      await mutator.appendLog({
        team_id,
        type: "team_hints_unlocked",
        slug,
        data: {
          hints_available_at: timestamp.toISOString(),
        },
      });
    }
  }
  const team_hints_unlocked_done = performance.now();
  console.log(`recalculateTeamState for team ${team_id}: ${interactions_unlock_done - start} msec
  * calculateTeamState:  ${calculate_team_state_done - start} msec
  * unlock rounds:       ${unlock_rounds_done - calculate_team_state_done} msec
  * compute diffs:       ${diff_done - unlock_rounds_done} msec
  * unlockable puzzles:  ${puzzles_unlockable_done - diff_done} msec
  * unlock puzzles:      ${puzzles_unlock_done - puzzles_unlockable_done} msec
  * unlock interactions: ${interactions_unlock_done - puzzles_unlock_done} msec
  * complete gates:      ${gates_completed_done - interactions_unlock_done} msec
  * unlock hints:        ${team_hints_unlocked_done - gates_completed_done}msec`);
  return next;
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

  dehydrate(): Hydratable<TeamInfoIntermediate> {
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

  dehydrate(): Hydratable<PuzzleStateIntermediate> {
    return {
      epoch: this.epoch,
      guesses: this.guesses,
      hints: this.hints,
      slug: this._slug,
    };
  }
}

export const formatSubpuzzleState = (
  slug: string,
  parent_slug: string,
  state_log: PuzzleStateLogEntry[],
) => {
  const guesses = state_log.filter(
    (e) =>
      e.data.type === "subpuzzle_guess_submitted" &&
      e.slug === parent_slug &&
      e.data.subpuzzle_slug === slug,
  );
  const correct_answers = guesses
    .filter((e) => e.data.status === "correct")
    .map((e) => e.data.canonical_input)
    .sort();
  const result: SubpuzzleState = {
    guesses: guesses.map(
      ({ data: { canonical_input, status, response }, id, timestamp }) => ({
        id: id,
        canonical_input: canonical_input as string,
        status: status as z.TypeOf<typeof GuessStatus>,
        response: response as string,
        timestamp: timestamp.toISOString(),
      }),
    ),
    ...(correct_answers.length > 0
      ? { answer: correct_answers.join(", ") }
      : {}),
  };
  return result;
};
