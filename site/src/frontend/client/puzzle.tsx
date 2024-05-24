import React from "react";
import { createRoot } from "react-dom/client";
import { type z } from "zod";
import { type contract } from "../../../lib/api/contract";
import PuzzleGuessSection from "../components/PuzzleGuessSection";

type Guesses = z.infer<
  (typeof contract.public.getPuzzleState.responses)["200"]
>["guesses"];

const guessSectionElem = document.getElementById("puzzle-guesses");
if (guessSectionElem) {
  const guessSectionRoot = createRoot(guessSectionElem);
  const initialGuesses = (
    window as unknown as { puzzle_initialGuesses: Guesses }
  ).puzzle_initialGuesses;
  const slug = (window as unknown as { puzzle_slug: string }).puzzle_slug;
  guessSectionRoot.render(
    <PuzzleGuessSection initialGuesses={initialGuesses} slug={slug} />,
  );
}
