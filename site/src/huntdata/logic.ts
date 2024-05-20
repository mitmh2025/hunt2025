import type { Hunt, Condition, PuzzleSlot } from "./types";

interface ConditionState {
  hunt: Hunt;
  interactions_completed: Set<string>;
  puzzle_solution_count: Record<string, number>;
}

interface ConditionStateInternal extends ConditionState {
  current_round?: string;
  slug_by_slot: Record<string, string>;
}

function evaluateCondition(
  condition: Condition,
  condition_state: ConditionStateInternal,
): boolean {
  const {
    hunt,
    current_round,
    interactions_completed,
    puzzle_solution_count,
    slug_by_slot,
  } = condition_state;
  if (Array.isArray(condition)) {
    return condition.every((c) => evaluateCondition(c, condition_state));
  }
  if ("oneOf" in condition) {
    return condition.oneOf.some((c) => evaluateCondition(c, condition_state));
  }
  if ("slot_solved" in condition) {
    const { slot_solved, answer_count } = condition;
    const slug = slug_by_slot[slot_solved];
    if (slug) {
      return evaluateCondition(
        { slug_solved: slug, answer_count },
        condition_state,
      );
    }
    return false;
  }
  if ("slug_solved" in condition) {
    const { slug_solved, answer_count } = condition;
    return (puzzle_solution_count[slug_solved] || 0) >= (answer_count || 1);
  }
  if ("puzzles_solved" in condition) {
    const { puzzles_solved } = condition;
    let { slots } = condition;
    if (!slots) {
      slots = hunt.rounds
        .find((r) => r.slug == current_round)
        ?.puzzles.map((p) => p.id);
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
  // TODO: Can TypeScript prove this is unreachable?
  throw new Error("unknown condition");
}

export function getSlotSlug(slot: PuzzleSlot) {
  return slot.slug || (process.env.NODE_ENV == "development" && slot.id);
}

export function getSlugsBySlot(hunt: Hunt) {
  const slug_by_slot: Record<string, string> = {};
  hunt.rounds.forEach((round) => {
    round.puzzles.forEach((slot) => {
      const puzzleSlug = getSlotSlug(slot);
      if (!puzzleSlug) {
        // In dev, empty slugs are treated as fake puzzles with slug == slot.
        // In prod, empty slugs are invisible.
        return;
      }
      slug_by_slot[slot.id] = puzzleSlug;
    });
  });
  return slug_by_slot;
}

export function calculateTeamState(condition_state: ConditionState) {
  const { hunt } = condition_state;

  const unlocked_rounds: Set<string> = new Set();
  const visible_puzzles: Set<string> = new Set();
  const unlockable_puzzles: Set<string> = new Set();
  const unlocked_puzzles: Set<string> = new Set();

  const slug_by_slot = getSlugsBySlot(hunt);

  hunt.rounds.forEach((round) => {
    const roundEvaluateCondition = (condition: Condition) =>
      evaluateCondition(
        condition,
        Object.assign(
          {
            current_round: round.slug,
            slug_by_slot,
          },
          condition_state,
        ),
      );
    if (roundEvaluateCondition(round.unlock_if)) {
      unlocked_rounds.add(round.slug);
    }
    round.puzzles.forEach((slot) => {
      const puzzleSlug = getSlotSlug(slot);
      if (!puzzleSlug) {
        // In dev, empty slugs are treated as fake puzzles with slug == slot.
        // In prod, empty slugs are invisible.
        return;
      }
      if (
        slot.visible_if !== undefined &&
        roundEvaluateCondition(slot.visible_if)
      ) {
        visible_puzzles.add(puzzleSlug);
      }
      if (
        slot.unlockable_if !== undefined &&
        roundEvaluateCondition(slot.unlockable_if)
      ) {
        visible_puzzles.add(puzzleSlug);
        unlockable_puzzles.add(puzzleSlug);
      }
      if (
        slot.unlocked_if !== undefined &&
        roundEvaluateCondition(slot.unlocked_if)
      ) {
        visible_puzzles.add(puzzleSlug);
        unlocked_puzzles.add(puzzleSlug);
      }
    });
  });
  return {
    unlocked_rounds,
    visible_puzzles,
    unlockable_puzzles,
    unlocked_puzzles,
  };
}
