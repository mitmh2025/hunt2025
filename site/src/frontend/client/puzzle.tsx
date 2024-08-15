import React from "react";
import { hydrateRoot } from "react-dom/client";
import { type z } from "zod";
import { type publicContract } from "../../../lib/api/contract";
import PuzzleGuessSection from "../components/PuzzleGuessSection";

type PuzzleData = z.infer<
  (typeof publicContract.getPuzzleState.responses)["200"]
>;

const guessSectionElem = document.getElementById("puzzle-guesses");
if (guessSectionElem) {
  const initialPuzzleData = (
    window as unknown as { initialPuzzleData: PuzzleData }
  ).initialPuzzleData;
  // TODO: extract puzzleSlug from the URL instead of embedding it via script?
  const slug = (window as unknown as { puzzleSlug: string }).puzzleSlug;
  hydrateRoot(
    guessSectionElem,
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
