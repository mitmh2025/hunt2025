import React, { useCallback, useState } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { type z } from "zod";
import { type publicContract } from "../../../lib/api/contract";
import CopyToClipboard from "../components/CopyToClipboard";
import PuzzleGuessSection from "../components/PuzzleGuessSection";
import useAppendDataset from "./useAppendDataset";

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
  const websocketGuesses = useAppendDataset(
    "guess_log",
    { slug },
    initialGuesses,
  );
  const [guesses, setGuesses] = useState<Guess[]>(websocketGuesses);
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
      // Sort by id
      mergedGuesses.sort((a, b) => a.id - b.id);
      return mergedGuesses;
    });
  }, []);

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

const puzzleContent = document.getElementById("puzzle-content");
if (puzzleContent?.dataset.copyable) {
  const container = document.createElement("div");
  container.style.display = "contents";
  puzzleContent.appendChild(container);
  const root = createRoot(container);
  root.render(<CopyToClipboard />);
}
