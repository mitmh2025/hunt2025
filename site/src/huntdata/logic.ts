import type { Hydratable } from "../../lib/types";
import type { Hunt, Condition, PuzzleSlot } from "./types";

type ConditionState = {
  hunt: Hunt;
  rounds_unlocked: Set<string>;
  gates_satisfied: Set<string>;
  interactions_completed: Set<string>;
  puzzles_unlockable: Set<string>;
  puzzles_unlocked: Set<string>;
  puzzles_solved: Set<string>;
};

type ConditionStateInternal = {
  default_slots: string[] | undefined;
  slug_by_slot: Record<string, string>;
} & ConditionState;

function evaluateCondition(
  condition: Condition,
  condition_state: ConditionStateInternal,
): boolean {
  const {
    default_slots,
    gates_satisfied,
    interactions_completed,
    puzzles_unlocked,
    puzzles_solved,
    slug_by_slot,
    rounds_unlocked,
  } = condition_state;
  if (Array.isArray(condition)) {
    return condition.every((c) => evaluateCondition(c, condition_state));
  }
  if ("oneOf" in condition) {
    return condition.oneOf.some((c) => evaluateCondition(c, condition_state));
  }
  if ("slot_unlocked" in condition) {
    const { slot_unlocked } = condition;
    const slug = slug_by_slot[slot_unlocked];
    if (slug) {
      return puzzles_unlocked.has(slug);
    }
    return false;
  }
  if ("slot_solved" in condition) {
    const { slot_solved } = condition;
    const slug = slug_by_slot[slot_solved];
    if (slug) {
      return puzzles_solved.has(slug);
    }
    return false;
  }
  if ("puzzles_unlocked" in condition) {
    const { puzzles_unlocked } = condition;
    let { slots } = condition;
    if (!slots) {
      slots = default_slots;
    }
    if (!slots) {
      return false;
    }
    return (
      slots.filter((slot) =>
        evaluateCondition({ slot_unlocked: slot }, condition_state),
      ).length >= puzzles_unlocked
    );
  }
  if ("puzzles_solved" in condition) {
    const { puzzles_solved } = condition;
    let { slots } = condition;
    if (!slots) {
      slots = default_slots;
    }
    if (!slots) {
      return false;
    }
    return (
      slots.filter((slot) =>
        evaluateCondition({ slot_solved: slot }, condition_state),
      ).length >= puzzles_solved
    );
  }
  if ("interaction_completed" in condition) {
    return interactions_completed.has(condition.interaction_completed);
  }
  if ("gate_satisfied" in condition) {
    return gates_satisfied.has(condition.gate_satisfied);
  }
  if ("round_unlocked" in condition) {
    return rounds_unlocked.has(condition.round_unlocked);
  }
  // TODO: Can TypeScript prove this is unreachable?
  throw new Error("unknown condition");
}

export function getSlotSlug(slot: PuzzleSlot) {
  return (
    slot.slug ??
    ((process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test") &&
      slot.id)
  );
}

export function getSlugsBySlot(hunt: Hunt) {
  const slug_by_slot: Record<string, string> = {};
  hunt.rounds.forEach((round) => {
    round.puzzles.forEach((slot) => {
      const puzzleSlug = getSlotSlug(slot);
      if (!puzzleSlug) {
        // In dev, empty slugs are treated as fake puzzles with slug === slot.
        // In prod, empty slugs are invisible.
        return;
      }
      slug_by_slot[slot.id] = puzzleSlug;
    });
  });
  return slug_by_slot;
}

export class LogicTeamState {
  rounds_unlocked: Set<string>;
  puzzles_unlockable: Set<string>;
  puzzles_unlocked: Set<string>;
  puzzles_stray: Set<string>;
  puzzles_solved: Set<string>;
  puzzle_unlocked_timestamp: Map<string, Date>;
  global_hints_unlocked_delta: Map<string, number>;
  team_hints_unlocked_timestamp: Map<string, Date>;
  gates_satisfied: Set<string>;
  interactions_unlocked: Set<string>;
  interactions_started: Set<string>;
  interactions_completed: Map<string, string>;
  available_currency: number;
  available_strong_currency: number;

  constructor(initial?: Partial<Hydratable<LogicTeamState>>) {
    this.rounds_unlocked = new Set(initial?.rounds_unlocked ?? []);
    this.puzzles_unlockable = new Set(initial?.puzzles_unlockable ?? []);
    this.puzzles_unlocked = new Set(initial?.puzzles_unlocked ?? []);
    this.puzzles_stray = new Set(initial?.puzzles_stray ?? []);
    this.puzzles_solved = new Set(initial?.puzzles_solved ?? []);
    this.puzzle_unlocked_timestamp = new Map(
      Array.from(initial?.puzzle_unlocked_timestamp ?? []).map(([k, v]) => [
        k,
        new Date(v),
      ]),
    );
    this.global_hints_unlocked_delta = new Map(
      initial?.global_hints_unlocked_delta ?? [],
    );
    this.team_hints_unlocked_timestamp = new Map(
      Array.from(initial?.team_hints_unlocked_timestamp ?? []).map(([k, v]) => [
        k,
        new Date(v),
      ]),
    );
    this.gates_satisfied = new Set(initial?.gates_satisfied ?? []);
    this.interactions_unlocked = new Set(initial?.interactions_unlocked ?? []);
    this.interactions_started = new Set(initial?.interactions_started ?? []);
    this.interactions_completed = new Map(
      initial?.interactions_completed ?? [],
    );
    this.available_currency = initial?.available_currency ?? 0;
    this.available_strong_currency = initial?.available_strong_currency ?? 0;
  }

  get puzzles_visible() {
    // The current definition of "visible" is that a puzzle is either unlocked or unlockable.
    return this.puzzles_unlocked.union(this.puzzles_unlockable);
  }

  // recalculateTeamState uses `hunt` to decide what a team is now eligible for.
  recalculateTeamState(hunt: Hunt) {
    const next = new LogicTeamState(this);
    const condition_state: ConditionState = {
      // These three are immutable
      hunt,
      interactions_completed: new Set(next.interactions_completed.keys()),
      puzzles_solved: next.puzzles_solved,
      // The rest are mutable
      gates_satisfied: next.gates_satisfied,
      rounds_unlocked: next.rounds_unlocked,
      puzzles_unlockable: next.puzzles_unlockable,
      puzzles_unlocked: next.puzzles_unlocked,
    };
    const slug_by_slot = getSlugsBySlot(hunt);

    // We want to be able to specify unlockable_if with conditions based on
    // puzzles_unlocked.  In practice with our current understanding of the hunt
    // structure, we should never really need to run more than two iterations of
    // this loop, but for simplicity and theoretical correctness we'll keep
    // iterating until we reach a fix-point.
    let updated = false;
    do {
      updated = false;
      hunt.rounds.forEach((round) => {
        // Default set of slots to consider when evaluating puzzles_unlocked or
        // puzzles_solved conditions
        const default_slots = round.puzzles
          .filter((p) => !p.is_meta)
          .map((p) => p.id);
        const round_condition_state = Object.assign(
          {
            default_slots,
            slug_by_slot,
          },
          condition_state,
        );
        const roundEvaluateCondition = (condition: Condition) =>
          evaluateCondition(condition, round_condition_state);
        // Note: it is important to evaluate round unlocks before puzzle
        // unlocks, so that we can be sure that we don't generate spurious
        // puzzles_stray memberships.
        if (roundEvaluateCondition(round.unlock_if)) {
          if (!next.rounds_unlocked.has(round.slug)) {
            next.rounds_unlocked.add(round.slug);
            updated = true;
          }
        }
        round.puzzles.forEach((slot) => {
          const puzzleSlug = getSlotSlug(slot);
          if (!puzzleSlug) {
            // In dev, empty slugs are treated as fake puzzles with slug === slot.
            // In prod, empty slugs are invisible.
            return;
          }
          if (
            slot.unlockable_if !== undefined &&
            roundEvaluateCondition(slot.unlockable_if)
          ) {
            if (!next.puzzles_unlockable.has(puzzleSlug)) {
              next.puzzles_unlockable.add(puzzleSlug);
              updated = true;
            }
          }
          if (
            slot.unlocked_if !== undefined &&
            roundEvaluateCondition(slot.unlocked_if)
          ) {
            if (!next.puzzles_unlocked.has(puzzleSlug)) {
              next.puzzles_unlocked.add(puzzleSlug);
              if (!next.rounds_unlocked.has(round.slug)) {
                next.puzzles_stray.add(puzzleSlug);
              }
              updated = true;
            }
          }
          const globalHintsUnlockDelta =
            this.global_hints_unlocked_delta.get(puzzleSlug);
          const teamPuzzleUnlockTime =
            this.puzzle_unlocked_timestamp.get(puzzleSlug);
          if (
            globalHintsUnlockDelta !== undefined &&
            teamPuzzleUnlockTime !== undefined &&
            !next.team_hints_unlocked_timestamp.has(puzzleSlug)
          ) {
            // Unlock hints for this puzzle at puzzle unlock time + hint unlock delta.
            const teamHintsUnlockTime = new Date(teamPuzzleUnlockTime);
            teamHintsUnlockTime.setHours(
              teamHintsUnlockTime.getHours() + globalHintsUnlockDelta,
            );
            next.team_hints_unlocked_timestamp.set(
              puzzleSlug,
              teamHintsUnlockTime,
            );
          }
        });
        round.interactions?.forEach((interaction) => {
          if (roundEvaluateCondition(interaction.unlock_if)) {
            if (!next.interactions_unlocked.has(interaction.id)) {
              next.interactions_unlocked.add(interaction.id);
              updated = true;
            }
          }
        });
        round.gates?.forEach((gate) => {
          if (
            gate.satisfied_if !== undefined &&
            roundEvaluateCondition(gate.satisfied_if)
          ) {
            if (!next.gates_satisfied.has(gate.id)) {
              next.gates_satisfied.add(gate.id);
              updated = true;
            }
          }
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- for some reason, eslint believes this condition is always falsy
    } while (updated);
    return next;
  }
}
