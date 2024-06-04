"use client";

import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { PuzzleState } from "../../../lib/api/client";
import { type SubmitState } from "./PuzzleGuessSection.server";

type Guesses = PuzzleState["guesses"];

const PuzzleGuessForm = ({ state }: { state: SubmitState }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {state.errors ? <div>Error: {state.errors}</div> : undefined}
      <label htmlFor="guess-input">Submit guess</label>
      <input
        id="guess-input"
        name="guess"
        type="text"
        required
        disabled={pending}
      />
      <button type="submit" disabled={pending}>
        Submit
      </button>
    </>
  );
};

const PuzzleGuessHistoryTable = ({ guesses }: { guesses: Guesses }) => {
  if (guesses.length === 0) {
    return undefined;
  }
  return (
    <table id="guess-history">
      <thead>
        <tr>
          <th>Guesses</th>
          <th>Response</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {guesses.map((g) => {
          return (
            <tr key={g.canonicalInput}>
              <td>{g.canonicalInput}</td>
              <td>{g.response}</td>
              <td>{g.timestamp}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const PuzzleGuessSection = ({
  submitGuess,
  initialPuzzleState,
}: {
  submitGuess: (
    prevState: SubmitState,
    formData: FormData,
  ) => Promise<SubmitState>;
  initialPuzzleState: PuzzleState;
}) => {
  const [state, formAction] = useActionState(submitGuess, {
    puzzleState: initialPuzzleState,
  });

  return (
    <section id="puzzle-guess-section">
      {state.puzzleState.solved ? undefined : (
        <form action={formAction}>
          <PuzzleGuessForm state={state} />
        </form>
      )}
      <PuzzleGuessHistoryTable guesses={state.puzzleState.guesses} />
    </section>
  );
};

export default PuzzleGuessSection;
