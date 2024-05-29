import type { Hunt, Condition, PuzzleSlot } from "./types";

type ConditionState = {
  hunt: Hunt;
  interactions_completed: Set<string>;
  puzzles_unlocked: Set<string>;
  puzzle_solution_count: Record<string, number>;
};

type ConditionStateInternal = {
  current_round: string;
  slug_by_slot: Record<string, string>;
} & ConditionState;

function defaultSlotsForRound(
  hunt: Hunt,
  round_slug: string,
): string[] | undefined {
  return hunt.rounds
    .find((r) => r.slug === round_slug)
    ?.puzzles.filter((p) => !p.is_meta)
    .map((p) => p.id);
}

function evaluateCondition(
  condition: Condition,
  condition_state: ConditionStateInternal,
): boolean {
  const {
    hunt,
    current_round,
    interactions_completed,
    puzzles_unlocked,
    puzzle_solution_count,
    slug_by_slot,
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
      return evaluateCondition({ slug_unlocked: slug }, condition_state);
    }
    return false;
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
  if ("slug_unlocked" in condition) {
    const { slug_unlocked } = condition;
    return puzzles_unlocked.has(slug_unlocked);
  }
  if ("slug_solved" in condition) {
    const { slug_solved, answer_count } = condition;
    return (puzzle_solution_count[slug_solved] ?? 0) >= (answer_count ?? 1);
  }
  if ("puzzles_unlocked" in condition) {
    const { puzzles_unlocked } = condition;
    let { slots } = condition;
    if (!slots) {
      slots = defaultSlotsForRound(hunt, current_round);
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
      slots = defaultSlotsForRound(hunt, current_round);
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

export function calculateTeamState(initial_condition_state: ConditionState) {
  const { hunt, puzzles_unlocked } = initial_condition_state;

  const unlocked_rounds = new Set<string>();
  const visible_puzzles = new Set<string>();
  const unlockable_puzzles = new Set<string>();
  const unlocked_puzzles = new Set<string>(puzzles_unlocked);

  const condition_state = { ...initial_condition_state };
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
        if (!unlocked_rounds.has(round.slug)) {
          unlocked_rounds.add(round.slug);
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
          slot.visible_if !== undefined &&
          roundEvaluateCondition(slot.visible_if)
        ) {
          if (!visible_puzzles.has(puzzleSlug)) {
            visible_puzzles.add(puzzleSlug);
            updated = true;
          }
        }
        if (
          slot.unlockable_if !== undefined &&
          roundEvaluateCondition(slot.unlockable_if)
        ) {
          if (!visible_puzzles.has(puzzleSlug)) {
            visible_puzzles.add(puzzleSlug);
            updated = true;
          }
          if (!unlockable_puzzles.has(puzzleSlug)) {
            unlockable_puzzles.add(puzzleSlug);
            updated = true;
          }
        }
        if (
          slot.unlocked_if !== undefined &&
          roundEvaluateCondition(slot.unlocked_if)
        ) {
          if (!visible_puzzles.has(puzzleSlug)) {
            visible_puzzles.add(puzzleSlug);
            updated = true;
          }
          if (!unlocked_puzzles.has(puzzleSlug)) {
            unlocked_puzzles.add(puzzleSlug);
            // Also ensure we're updating the condition state to reflect the
            // now-unlocked puzzle, in case there's a chain reaction resulting
            // from this condition being newly satisfied.
            condition_state.puzzles_unlocked.add(puzzleSlug);
            updated = true;
          }
        }
      });
    });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- for some reason, eslint believes this condition is always falsy
  } while (updated);

  return {
    unlocked_rounds,
    visible_puzzles,
    unlockable_puzzles,
    unlocked_puzzles,
  };
}
