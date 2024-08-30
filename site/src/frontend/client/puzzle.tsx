import React, { useCallback, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { type z } from "zod";
import { type publicContract } from "../../../lib/api/contract";
import PuzzleGuessSection from "../components/PuzzleGuessSection";
import globalDatasetManager from "./DatasetManager";

type PuzzleData = z.infer<
  (typeof publicContract.getPuzzleState.responses)["200"]
>;
type Guesses = PuzzleData["guesses"];
type Guess = Guesses[number];

const GuessSectionManager = ({
  initialGuesses,
  slug,
}: {
  initialGuesses: Guesses;
  slug: string;
}) => {
  const [guesses, setGuesses] = useState<Guess[]>(initialGuesses);
  const mergeGuesses = useCallback((newGuesses: Guess[]) => {
    setGuesses((prevGuesses: Guess[]) => {
      // Merge the previous guess set and the new one together, retaining any common entries exactly once.
      const canonicalInputs = new Set();
      const mergedGuesses: Guess[] = [];
      const processGuess = (guess: Guess) => {
        if (!canonicalInputs.has(guess.canonical_input)) {
          canonicalInputs.add(guess.canonical_input);
          mergedGuesses.push(guess);
        }
      };
      prevGuesses.forEach(processGuess);
      newGuesses.forEach(processGuess);
      // sort in reverse chronological order (newest at top)
      mergedGuesses.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
      return mergedGuesses;
    });
  }, []);

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "guess_log",
      { slug },
      (value: object) => {
        console.log("guess log", value);
        mergeGuesses([value as Guess]);
      },
    );
    return stop;
  }, [mergeGuesses, slug]);

  return (
    <PuzzleGuessSection
      slug={slug}
      guesses={guesses}
      onGuessesUpdate={mergeGuesses}
    />
  );
};

const guessSectionElem = document.getElementById("puzzle-guesses");
if (guessSectionElem) {
  const initialGuesses = (
    window as unknown as { initialGuesses: PuzzleData["guesses"] }
  ).initialGuesses;
  // TODO: extract puzzleSlug from the URL instead of embedding it via script?
  const slug = (window as unknown as { puzzleSlug: string }).puzzleSlug;
  hydrateRoot(
    guessSectionElem,
    <GuessSectionManager initialGuesses={initialGuesses} slug={slug} />,
  );
} else {
  console.error(
    "Couldn't mount PuzzleGuessSection because #puzzle-guesses was nowhere to be found",
  );
}
