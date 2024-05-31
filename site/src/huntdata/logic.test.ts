import { test, it, expect } from "@jest/globals";
import { getSlugsBySlot, calculateTeamState } from "./logic";

test("getSlugsBySlot", () => {
  expect(
    getSlugsBySlot({
      rounds: [
        {
          slug: "one",
          title: "One",
          unlock_if: [],
          puzzles: [{ id: "11", slug: "p11" }, { id: "12" }],
        },
        { slug: "two", title: "Two", unlock_if: [], puzzles: [{ id: "22" }] },
      ],
      interactions: [],
    }),
  ).toStrictEqual({
    "11": "p11",
    "12": "12",
    "22": "22",
  });
});

it("unlocks if solved", () => {
  expect(
    calculateTeamState({
      hunt: {
        rounds: [
          {
            slug: "round",
            title: "Round",
            unlock_if: [],
            puzzles: [
              { id: "11", slug: "p11", unlocked_if: [] },
              { id: "12", slug: "p12", unlocked_if: { slot_solved: "11" } },
            ],
          },
        ],
        interactions: [],
      },
      gates_satisfied: new Set(),
      interactions_completed: new Set(),
      puzzles_unlocked: new Set(["p11"]),
      puzzle_solution_count: {
        p11: 1,
      },
    }),
  ).toStrictEqual({
    unlocked_rounds: new Set(["round"]),
    visible_puzzles: new Set(["p11", "p12"]),
    unlockable_puzzles: new Set([]),
    unlocked_puzzles: new Set(["p11", "p12"]),
    unlocked_interactions: new Set(),
  });
});

it("becomes visible if unlocked", () => {
  expect(
    calculateTeamState({
      hunt: {
        rounds: [
          {
            slug: "round",
            title: "Round",
            unlock_if: [],
            puzzles: [
              { id: "p1", slug: "p1", unlocked_if: [] },
              { id: "p2", slug: "p2", unlocked_if: [] },
              { id: "p3", slug: "p3", unlockable_if: { puzzles_unlocked: 1 } },
              { id: "p4", slug: "p4", unlockable_if: { puzzles_unlocked: 2 } },
              { id: "p5", slug: "p5", unlockable_if: { puzzles_unlocked: 3 } },
            ],
          },
        ],
        interactions: [],
      },
      gates_satisfied: new Set(),
      interactions_completed: new Set(),
      puzzles_unlocked: new Set(),
      puzzle_solution_count: {},
    }),
  ).toStrictEqual({
    unlocked_rounds: new Set(["round"]),
    visible_puzzles: new Set(["p1", "p2", "p3", "p4"]),
    unlockable_puzzles: new Set(["p3", "p4"]),
    unlocked_puzzles: new Set(["p1", "p2"]),
    unlocked_interactions: new Set(),
  });
});

it("handles gate conditions", () => {
  expect(
    calculateTeamState({
      hunt: {
        rounds: [
          {
            slug: "round",
            title: "Round",
            unlock_if: [],
            puzzles: [
              { id: "p1", slug: "p1", unlocked_if: [] },
              { id: "p2", slug: "p2", unlockable_if: { gate_satisfied: "g1" } },
              { id: "p3", slug: "p3", unlockable_if: { gate_satisfied: "g2" } },
            ],
          },
        ],
        interactions: [],
      },
      gates_satisfied: new Set(["g1"]),
      interactions_completed: new Set(),
      puzzles_unlocked: new Set(),
      puzzle_solution_count: {},
    }),
  ).toStrictEqual({
    unlocked_rounds: new Set(["round"]),
    visible_puzzles: new Set(["p1", "p2"]),
    unlockable_puzzles: new Set(["p2"]),
    unlocked_puzzles: new Set(["p1"]),
    unlocked_interactions: new Set(),
  });
});
