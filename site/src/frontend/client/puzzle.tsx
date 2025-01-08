import React, { useCallback, useState } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { type z } from "zod";
import { type publicContract } from "../../../lib/api/contract";
import CopyToClipboard from "../components/CopyToClipboard";
import PuzzleGuessSection from "../components/PuzzleGuessSection";
import useAppendDataset from "./useAppendDataset";
import { PuzzleStateLogEntry } from "../../../lib/api/frontend_contract";

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
      type={"puzzle"}
      slug={slug}
      guesses={guesses}
      onGuessesUpdate={mergeGuesses}
    />
  );
};

const SubpuzzleGuessSectionManager = ({
  initialPuzzleStateLog,
  slug,
  parentSlug,
}: {
  initialPuzzleStateLog: PuzzleStateLogEntry[];
  slug: string;
  parentSlug: string;
}) => {
  const puzzleStateLog = useAppendDataset<PuzzleStateLogEntry>(
    "puzzle_state_log",
    { slug: parentSlug },
    initialPuzzleStateLog,
  );
  // Munge the puzzle state log into the shape of a Guess.
  const websocketGuesses = puzzleStateLog
    .filter(
      (entry) =>
        entry.slug === parentSlug &&
        entry.data.subpuzzleSlug === slug &&
        entry.data.type === "subpuzzle_guess_submitted",
    )
    .map<Guess>((entry) => {
      return {
        id: entry.id as number,
        timestamp: entry.timestamp as unknown as string,
        canonical_input: entry.data.canonical_input as string,
        response: entry.data.response as string,
        status: entry.data.status as "correct" | "incorrect",
      };
    });
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
      type={"subpuzzle"}
      slug={slug}
      guesses={guesses}
      onGuessesUpdate={mergeGuesses}
    />
  );
};

const puzzleGuessSectionElem = document.getElementById("puzzle-guesses");
const subpuzzleGuessSectionElem = document.getElementById("subpuzzle-guesses");
if (puzzleGuessSectionElem) {
  const initialGuesses = (
    window as unknown as { initialGuesses: PuzzleData["guesses"] }
  ).initialGuesses;
  // TODO: extract puzzleSlug from the URL instead of embedding it via script?
  const slug = (window as unknown as { puzzleSlug: string }).puzzleSlug;
  hydrateRoot(
    puzzleGuessSectionElem,
    <GuessSectionManager initialGuesses={initialGuesses} slug={slug} />,
  );
} else if (subpuzzleGuessSectionElem) {
  const initialPuzzleStateLog = (
    window as unknown as { initialPuzzleStateLog: PuzzleStateLogEntry[] }
  ).initialPuzzleStateLog;
  // TODO: extract puzzleSlug from the URL instead of embedding it via script?
  const slug = (window as unknown as { puzzleSlug: string }).puzzleSlug;
  const parentSlug = (window as unknown as { parentSlug: string }).parentSlug;
  hydrateRoot(
    subpuzzleGuessSectionElem,
    <SubpuzzleGuessSectionManager
      initialPuzzleStateLog={initialPuzzleStateLog}
      slug={slug}
      parentSlug={parentSlug}
    />,
  );
} else {
  console.error(
    "Couldn't mount PuzzleGuessSection because #puzzle-guesses and #subpuzzle-guesses were nowhere to be found",
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
