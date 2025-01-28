import { type TeamHuntState } from "../../../../../lib/api/client";
import {
  MAX_TOLERANCE_DEGREES,
  isRoughlyEqual,
  simulatedTumblerPositions,
} from "../combolock";
import {
  LOCK_DATA,
  MODALS_BY_EXTRA_POSTCODE,
  MODALS_BY_POSTCODE,
  NODES_BY_ID,
  type Puzzles,
  filteredForFrontend,
} from "../graph";
import { type PluginName, type PostcodeResponse, type Node } from "../types";

export function illegalSearchTeamState(): TeamHuntState {
  const gatesStr = localStorage.getItem("illegalSearchGates") ?? "";
  const gates = gatesStr.split(",");

  return {
    gates_satisfied: gates,
    rounds: {
      illegal_search: {
        slots: {},
        title: "The Illegal Search",
        interactions: {},
        gates,
      },
    },
    epoch: 1,
    currency: 0,
    outstanding_hint_requests: [],
    puzzles: {},
    strong_currency: 0,
  };
}

export function markGateSatisfied(gateId: string): void {
  const gatesStr = localStorage.getItem("illegalSearchGates") ?? "";
  const gates = gatesStr.split(",");

  if (!gates.includes(gateId)) {
    gates.push(gateId);
    localStorage.setItem("illegalSearchGates", gates.join(","));
  }
}

export function getIllegalSearchPuzzleMetadata(): Puzzles {
  const { puzzleMetadata } = window as unknown as { puzzleMetadata: Puzzles };
  return puzzleMetadata;
}

export function fetchNode(nodeId: string): Node {
  const node = NODES_BY_ID.get(nodeId);
  if (!node) {
    throw new Error(`No such node: ${nodeId}`);
  }

  const { puzzleMetadata } = window as unknown as { puzzleMetadata: Puzzles };

  return filteredForFrontend(node, illegalSearchTeamState(), {
    immutable: true,
    puzzles: puzzleMetadata,
  });
}

export function fetchModal(postCode: string): PostcodeResponse {
  let match: { slotId: string; gateId: string } | undefined;
  const postcodeMatch = MODALS_BY_POSTCODE.get(postCode);
  const extraMatch = MODALS_BY_EXTRA_POSTCODE.get(postCode);

  if (postcodeMatch) {
    const { slotId, gateId } = postcodeMatch;
    match = { slotId, gateId };
  } else if (extraMatch) {
    const extra = extraMatch.extra;
    if (!extra) {
      throw new Error("No extra data for postcode match");
    }

    const { slotId, gateId } = extra;
    match = { slotId, gateId };
  }

  if (!match) {
    throw new Error(`No match for postcode: ${postCode}`);
  }

  const { slotId, gateId } = match;
  markGateSatisfied(gateId);

  const puzzle = Object.values(getIllegalSearchPuzzleMetadata()).find(
    (p) => p.slotId === slotId,
  );

  if (!puzzle) {
    throw new Error(`No puzzle for slot: ${slotId}`);
  }

  return {
    title: puzzle.title,
    desc: puzzle.initial_description,
    slug: puzzle.slug,
  };
}

export function submitLock(
  lock: Exclude<PluginName, "extra" | "telephone" | "safe">,
  submitted: string,
): Node | undefined {
  const lockData = LOCK_DATA[lock];

  const { gateId, node } = lockData;
  const answer = lockData.answer as string;

  let correct: boolean;
  if (lock === "deskdrawer") {
    correct = submitted.endsWith(answer);
  } else {
    correct = submitted === answer;
  }

  if (correct) {
    markGateSatisfied(gateId);
    return fetchNode(node);
  }
  return undefined;
}

export function submitSafe(
  tumblers: [number, number, number],
): Node | undefined {
  const lockData = LOCK_DATA.painting1;

  const { gateId, node } = lockData;

  const acceptableAnswers = lockData.answer as [number, number, number][];
  const expectedPositionsForAcceptableAnswers = acceptableAnswers.map(
    simulatedTumblerPositions,
  );

  if (
    expectedPositionsForAcceptableAnswers.some(
      (expectedPositions: [number, number, number]) => {
        return expectedPositions.every((expectedPosition, i) =>
          isRoughlyEqual(
            expectedPosition,
            tumblers[i] ?? 1000, // the ?? will never be taken, but TS doesn't know thatc
            MAX_TOLERANCE_DEGREES,
          ),
        );
      },
    )
  ) {
    markGateSatisfied(gateId);
    return fetchNode(node);
  }

  return undefined;
}
