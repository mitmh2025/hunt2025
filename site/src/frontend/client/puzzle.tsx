import React from "react";
import { createRoot } from "react-dom/client";
import { type z } from "zod";
import { type publicContract } from "../../../lib/api/contract";
import PuzzleGuessSection from "../components/PuzzleGuessSection";

type PuzzleData = z.infer<
  (typeof publicContract.getPuzzleState.responses)["200"]
>;

const guessSectionElem = document.getElementById("puzzle-guesses");
if (guessSectionElem) {
  const guessSectionRoot = createRoot(guessSectionElem);
  const initialPuzzleData = (
    window as unknown as { initialPuzzleData: PuzzleData }
  ).initialPuzzleData;
  // TODO: extract puzzleSlug from the URL instead of embedding it via script?
  const slug = (window as unknown as { puzzleSlug: string }).puzzleSlug;
  guessSectionRoot.render(
    <PuzzleGuessSection
      initialGuesses={initialPuzzleData.guesses}
      slug={slug}
      solved={!!initialPuzzleData.answer}
    />,
  );
} else {
  console.error(
    "Couldn't mount PuzzleGuessSection because #puzzle-guesses was nowhere to be found",
  );
}
