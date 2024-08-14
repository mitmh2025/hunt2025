import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import { type z } from "zod";
import { newClient } from "../../../lib/api/client";
import { type publicContract } from "../../../lib/api/contract";
import { deviceMax } from "../utils/breakpoints";
import { Button, TextInput } from "./StyledUI";

type GetPuzzleStateResponse = z.infer<
  (typeof publicContract.getPuzzleState.responses)["200"]
>;
type Guesses = GetPuzzleStateResponse["guesses"];

type FormState = "idle" | "submitting" | "error";

const GuessSectionWrapper = styled.section`
  background-color: var(--gray-200);
  color: var(--black);
  padding: 1rem 0.5rem;
  grid-column: 1 / 2;

  @media ${deviceMax.md} {
    grid-column: 1 / 3;
  }
`;

const GuessTable = styled.table`
  text-align: left;

  td {
    padding: 0.125rem 1rem 0.125rem 0;

    &.answer-attempt {
      font-weight: 900;
    }
  }
`;

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
      setGuessInput(e.target.value);
    },
    [],
  );
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      setFormState("submitting");
      e.preventDefault();

      void (async () => {
        let result;
        try {
          const apiClient = newClient(location.origin + "/api", undefined);
          result = await apiClient.submitGuess({
            body: {
              guess: guessInput,
            },
            params: {
              slug,
            },
          });
        } catch (e) {
          // This should only happen if the fetch() network-fails
          setFormError("Network request failed");
          setFormState("error");
          return;
        }
        if (result.status === 200) {
          const parsedResult = result.body;
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
      <TextInput
        id="guess-input"
        name="guess"
        type="text"
        required
        disabled={formDisabled}
        value={guessInput}
        onChange={onInputChanged}
      />
      <Button type="submit" disabled={formDisabled}>
        Submit
      </Button>
    </form>
  );
};

function formatGuessTimestamp(t: string) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date(t);
  const dayOfWeek = weekday[d.getDay()];
  const hours = d.getHours();
  const minutes = d.getMinutes();
  return `${dayOfWeek} ${hours}:${minutes}`;
}

const PuzzleGuessHistoryTable = ({ guesses }: { guesses: Guesses }) => {
  if (guesses.length === 0) {
    return undefined;
  }
  return (
    <GuessTable id="guess-history">
      <thead>
        <tr>
          <th>Guess</th>
          <th>Response</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {guesses.map((g) => {
          return (
            <tr key={g.canonicalInput}>
              <td className="answer-attempt">{g.canonicalInput}</td>
              <td>{g.response}</td>
              <td>{formatGuessTimestamp(g.timestamp)}</td>
            </tr>
          );
        })}
      </tbody>
    </GuessTable>
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
  const [guesses, setGuesses] = useState<Guesses>(initialGuesses);

  return (
    <GuessSectionWrapper id="puzzle-guess-section">
      {solved ? undefined : (
        <PuzzleGuessForm slug={slug} onGuessesUpdate={setGuesses} />
      )}
      <PuzzleGuessHistoryTable guesses={guesses} />
    </GuessSectionWrapper>
  );
};

export default PuzzleGuessSection;
