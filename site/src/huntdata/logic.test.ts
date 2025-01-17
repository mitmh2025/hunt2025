import { test, it, expect } from "@jest/globals";
import { getSlugsBySlot, LogicTeamState } from "./logic";

test("getSlugsBySlot", () => {
  expect(
    getSlugsBySlot({
      rounds: [
        {
          slug: "one",
          title: "One",
          final_puzzle_slot: "11",
          unlock_if: [],
          puzzles: [{ id: "11", slug: "p11" }, { id: "12" }],
        },
        {
          slug: "two",
          title: "Two",
          final_puzzle_slot: "22",
          unlock_if: [],
          puzzles: [{ id: "22" }],
        },
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
    new LogicTeamState({
      puzzles_unlocked: new Set(["p11"]),
      puzzles_solved: new Set(["p11"]),
    }).recalculateTeamState({
      rounds: [
        {
          slug: "round",
          title: "Round",
          final_puzzle_slot: "11",
          unlock_if: [],
          puzzles: [
            { id: "11", slug: "p11", unlocked_if: [] },
            { id: "12", slug: "p12", unlocked_if: { slot_solved: "11" } },
          ],
        },
      ],
    }),
  ).toStrictEqual(
    new LogicTeamState({
      rounds_unlocked: new Set(["round"]),
      puzzles_visible: new Set(["p11", "p12"]),
      puzzles_unlocked: new Set(["p11", "p12"]),
      puzzles_solved: new Set(["p11"]),
    }),
  );
});

it("becomes visible if unlocked", () => {
  expect(
    new LogicTeamState().recalculateTeamState({
      rounds: [
        {
          slug: "round",
          title: "Round",
          final_puzzle_slot: "p1",
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
    }),
  ).toStrictEqual(
    new LogicTeamState({
      rounds_unlocked: new Set(["round"]),
      puzzles_visible: new Set(["p1", "p2", "p3", "p4"]),
      puzzles_unlockable: new Set(["p3", "p4"]),
      puzzles_unlocked: new Set(["p1", "p2"]),
    }),
  );
});

it("handles gate conditions", () => {
  expect(
    new LogicTeamState({
      gates_satisfied: new Set(["g1"]),
    }).recalculateTeamState({
      rounds: [
        {
          slug: "round",
          title: "Round",
          final_puzzle_slot: "p1",
          unlock_if: [],
          puzzles: [
            { id: "p1", slug: "p1", unlocked_if: [] },
            { id: "p2", slug: "p2", unlockable_if: { gate_satisfied: "g1" } },
            { id: "p3", slug: "p3", unlockable_if: { gate_satisfied: "g2" } },
          ],
        },
      ],
    }),
  ).toStrictEqual(
    new LogicTeamState({
      gates_satisfied: new Set(["g1"]),
      rounds_unlocked: new Set(["round"]),
      puzzles_visible: new Set(["p1", "p2"]),
      puzzles_unlockable: new Set(["p2"]),
      puzzles_unlocked: new Set(["p1"]),
    }),
  );
});

it("handles round unlock conditions", () => {
  expect(
    new LogicTeamState({
      puzzles_unlocked: new Set(["p1"]),
      puzzles_solved: new Set(["p1"]),
    }).recalculateTeamState({
      rounds: [
        {
          slug: "round1",
          title: "Round",
          final_puzzle_slot: "p1",
          unlock_if: [],
          puzzles: [{ id: "p1", slug: "p1", unlocked_if: [] }],
        },
        {
          slug: "round2",
          title: "Round 2",
          final_puzzle_slot: "p2",
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
    }),
  ).toStrictEqual(
    new LogicTeamState({
      rounds_unlocked: new Set(["round1", "round2"]),
      puzzles_visible: new Set(["p1", "p2", "p3"]),
      puzzles_unlockable: new Set(["p3"]),
      puzzles_unlocked: new Set(["p1", "p2"]),
      puzzles_solved: new Set(["p1"]),
    }),
  );
});

it("unlock before round unlock is stray", () => {
  expect(
    new LogicTeamState({}).recalculateTeamState({
      rounds: [
        {
          slug: "locked",
          title: "locked round",
          final_puzzle_slot: "p1",
          unlock_if: { oneOf: [] }, // never unlocks
          puzzles: [{ id: "p1", slug: "p1", unlocked_if: [] }], // always unlocked
        },
      ],
    }),
  ).toStrictEqual(
    new LogicTeamState({
      puzzles_stray: new Set(["p1"]),
      puzzles_unlocked: new Set(["p1"]),
    }),
  );
});

it("satisfies gate with satisfied_if conditions met", () => {
  expect(
    new LogicTeamState({}).recalculateTeamState({
      rounds: [
        {
          slug: "round",
          title: "Round",
          final_puzzle_slot: "p1",
          unlock_if: [],
          puzzles: [],
          gates: [{ id: "g1", satisfied_if: [] }],
        },
      ],
    }),
  ).toStrictEqual(
    new LogicTeamState({
      rounds_unlocked: new Set(["round"]),
      gates_satisfied: new Set(["g1"]),
    }),
  );
});

it("unlockable implicitly requires the round be unlocked", () => {
  expect(
    new LogicTeamState({}).recalculateTeamState({
      rounds: [
        {
          slug: "unlocked",
          title: "unlocked round",
          final_puzzle_slot: "",
          unlock_if: [],
          puzzles: [],
          gates: [],
        },
        {
          slug: "locked",
          title: "locked",
          final_puzzle_slot: "",
          unlock_if: { oneOf: [] },
          puzzles: [{ id: "p1", slug: "p1", unlockable_if: [] }],
          gates: [],
        },
      ],
    }),
  ).toStrictEqual(
    new LogicTeamState({
      rounds_unlocked: new Set(["unlocked"]),
      gates_satisfied: new Set(),
    }),
  );
});
