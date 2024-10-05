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
      },
      unlocked_rounds: new Set(),
      gates_satisfied: new Set(),
      interactions_completed: new Set(),
      puzzles_unlockable: new Set(),
      puzzles_unlocked: new Set(["p11"]),
      puzzles_solved: new Set(["p11"]),
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
      },
      unlocked_rounds: new Set(),
      gates_satisfied: new Set(),
      interactions_completed: new Set(),
      puzzles_unlockable: new Set(),
      puzzles_unlocked: new Set(),
      puzzles_solved: new Set(),
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
      },
      unlocked_rounds: new Set(),
      gates_satisfied: new Set(["g1"]),
      interactions_completed: new Set(),
      puzzles_unlockable: new Set(),
      puzzles_unlocked: new Set(),
      puzzles_solved: new Set(),
    }),
  ).toStrictEqual({
    unlocked_rounds: new Set(["round"]),
    visible_puzzles: new Set(["p1", "p2"]),
    unlockable_puzzles: new Set(["p2"]),
    unlocked_puzzles: new Set(["p1"]),
    unlocked_interactions: new Set(),
  });
});

it("handles round unlock conditions", () => {
  expect(
    calculateTeamState({
      hunt: {
        rounds: [
          {
            slug: "round1",
            title: "Round",
            unlock_if: [],
            puzzles: [{ id: "p1", slug: "p1", unlocked_if: [] }],
          },
          {
            slug: "round2",
            title: "Round 2",
            unlock_if: { slot_solved: "p1" },
            puzzles: [
              {
                id: "p2",
                slug: "p2",
                unlocked_if: { round_unlocked: "round2" },
              },
              { id: "p3", slug: "p3", unlockable_if: { puzzles_unlocked: 1 } },
            ],
          },
        ],
      },
      unlocked_rounds: new Set(),
      gates_satisfied: new Set(),
      interactions_completed: new Set(),
      puzzles_unlockable: new Set(),
      puzzles_unlocked: new Set(["p1"]),
      puzzles_solved: new Set(["p1"]),
    }),
  ).toStrictEqual({
    unlocked_rounds: new Set(["round1", "round2"]),
    visible_puzzles: new Set(["p1", "p2", "p3"]),
    unlockable_puzzles: new Set(["p3"]),
    unlocked_puzzles: new Set(["p1", "p2"]),
    unlocked_interactions: new Set(),
  });
});
