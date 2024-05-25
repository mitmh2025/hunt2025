import React, { useCallback, useState } from "react";
import { type z } from "zod";
import { type contract } from "../../../lib/api/contract";

type GetPuzzleStateResponse = z.infer<
  (typeof contract.public.getPuzzleState.responses)["200"]
>;
type Guesses = GetPuzzleStateResponse["guesses"];

type FormState = "idle" | "submitting" | "error";

const PuzzleGuessForm = ({
  slug,
  onGuessesUpdate,
}: {
  slug: string;
  onGuessesUpdate: (guesses: Guesses) => void;
}) => {
  const [guessInput, setGuessInput] = useState<string>("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const onInputChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("new value", e.target.value);
      setGuessInput(e.target.value);
    },
    [],
  );
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      setFormState("submitting");
      console.log("submit", guessInput);
      e.preventDefault();
      void (async () => {
        let result;
        try {
          result = await fetch(`/puzzles/${slug}/guess`, {
            method: "POST",
            body: JSON.stringify({
              guess: guessInput,
            }),
            headers: {
              "Content-Type": "application/json", // This body is JSON
              Accept: "application/json", // Indicate that we want to receive JSON back
            },
          });
        } catch (e) {
          // This should only happen if the fetch() network-fails
          setFormError("Network request failed");
          setFormState("error");
          return;
        }
        if (result.status === 200) {
          // TODO: validate schema of response from server with zod?
          const parsedResult = (await result.json()) as GetPuzzleStateResponse;
          setGuessInput("");
          setFormError(undefined);
          setFormState("idle");
          onGuessesUpdate(parsedResult.guesses);
        } else {
          // TODO: Handle other errors (rate-limit hit?)
          setFormError(`Server returned status ${result.status}`);
          setFormState("error");
        }
      })();
    },
    [guessInput, slug, onGuessesUpdate],
  );
  const formDisabled = formState === "submitting";
  return (
    <form method="post" action={`/puzzles/${slug}/guess`} onSubmit={onSubmit}>
      {formError ? <div>Error: {formError}</div> : undefined}
      <label htmlFor="guess-input">Submit guess</label>
      <input
        id="guess-input"
        name="guess"
        type="text"
        required
        disabled={formDisabled}
        value={guessInput}
        onChange={onInputChanged}
      />
      <button type="submit" disabled={formDisabled}>
        Submit
      </button>
    </form>
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
  slug,
  solved,
  initialGuesses,
}: {
  slug: string;
  solved: boolean;
  initialGuesses: Guesses;
}) => {
  console.log("initial guesses:", initialGuesses);
  const [guesses, setGuesses] = useState<Guesses>(initialGuesses);

  return (
    <section id="puzzle-guess-section">
      {solved ? undefined : (
        <PuzzleGuessForm slug={slug} onGuessesUpdate={setGuesses} />
      )}
      <PuzzleGuessHistoryTable guesses={guesses} />
    </section>
  );
};

export default PuzzleGuessSection;
