import React, { useState } from "react";
import { type z } from "zod";
import { type TeamHuntState } from "../../../lib/api/client";
import { type publicContract } from "../../../lib/api/contract";
import renderRoot from "../../utils/renderRoot";
import PuzzleHints from "../components/PuzzleHints";
import useAppendDataset from "./useAppendDataset";
import useDataset from "./useDataset";

type PuzzleData = z.infer<
  (typeof publicContract.getPuzzleState.responses)["200"]
>;
type Hints = PuzzleData["hints"];
type Hint = Hints[number];

const mergeHints = (oldHints: Hint[], newHints: Hint[]): Hint[] => {
  // Merge the previous guess set and the new one together, retaining any common entries exactly once.
  const ids = new Set();
  const mergedHints: Hint[] = [];
  const processHint = (hint: Hint) => {
    if (!ids.has(hint.id)) {
      ids.add(hint.id);
      mergedHints.push(hint);
    }
  };
  oldHints.forEach(processHint);
  newHints.forEach(processHint);
  // Sort by id
  mergedHints.sort((a, b) => a.id - b.id);
  return mergedHints;
};

const HintsManager = ({
  initialHints,
  initialTeamState,
  slug,
}: {
  initialHints: Hints;
  initialTeamState: TeamHuntState;
  slug: string;
}) => {
  const websocketHints = useAppendDataset("hint_log", { slug }, initialHints);
  const [apiHints, setApiHints] = useState<Hint[]>([]);

  const teamState = useDataset("team_state", undefined, initialTeamState);

  return (
    <PuzzleHints
      slug={slug}
      hints={mergeHints(apiHints, websocketHints)}
      onReceiveHintsFromApi={setApiHints}
      teamState={teamState}
    />
  );
};

const puzzleHintsElem = document.getElementById("puzzle-hints");
if (puzzleHintsElem) {
  const initialHints = (
    window as unknown as { initialHints: PuzzleData["hints"] }
  ).initialHints;
  const initialTeamState = (
    window as unknown as { initialTeamState: TeamHuntState }
  ).initialTeamState;
  // TODO: extract puzzleSlug from the URL instead of embedding it via script?
  const slug = (window as unknown as { puzzleSlug: string }).puzzleSlug;
  renderRoot(
    puzzleHintsElem,
    <HintsManager
      initialHints={initialHints}
      initialTeamState={initialTeamState}
      slug={slug}
    />,
  );
} else {
  console.error(
    "Couldn't mount puzzleHints because #puzzle-hints was nowhere to be found",
  );
}
