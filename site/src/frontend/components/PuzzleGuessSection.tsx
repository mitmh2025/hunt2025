import React, { useCallback, useRef, useState } from "react";
import { styled } from "styled-components";
import { type z } from "zod";
import { type TeamHuntState, newClient } from "../../../lib/api/client";
import { type publicContract } from "../../../lib/api/contract";
import apiUrl from "../utils/apiUrl";
import archiveMode from "../utils/archiveMode";
import rootUrl from "../utils/rootUrl";
import PuzzleHintLink from "./PuzzleHintLink";
import Stamp from "./SparkleStamps";
import { Button, TextInput } from "./StyledUI";

type GetPuzzleStateResponse = z.infer<
  (typeof publicContract.getPuzzleState.responses)["200"]
>;
type Guesses = GetPuzzleStateResponse["guesses"];

type Guess = Guesses[number];

type FormState = "idle" | "submitting" | "error";

const GuessSectionWrapper = styled.section`
  background-color: var(--gray-200);
  color: var(--black);
  padding: 1rem;
  text-align: center;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media print {
    display: none;
  }
`;

const GuessTable = styled.table`
  text-align: left;
  border-collapse: collapse;

  th {
    border-bottom: 1px solid currentColor;
  }

  td,
  th {
    padding: 0.125rem 1rem 0.125rem 0;

    &.answer-attempt {
      font-weight: 900;
      font-family: monospace;
    }

    &.answer-reply {
      white-space: pre-wrap;
    }
  }
`;

const Label = styled.label`
  line-height: 1;
  margin-right: 4px;
  display: block;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const RateLimitNotice = styled.div`
  padding: 0.5rem 1rem;
  background: #ffffff33;
  margin-bottom: 0.5rem;
  font-family: var(--body-font);
  font-size: 1rem;
`;

const ErrorNotice = styled(RateLimitNotice)`
  background: var(--red-500);
  color: var(--white);
`;

const SolutionsLink = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const PuzzleGuessForm = ({
  type,
  slug,
  onGuessesUpdate,
}: {
  type: "puzzle" | "subpuzzle";
  slug: string;
  onGuessesUpdate: (guesses: Guesses) => void;
}) => {
  const [guessInput, setGuessInput] = useState<string>("");
  const [rateLimitedUntil, setRateLimitedUntil] = useState<Date | undefined>(
    undefined,
  );
  // If you want to access something from a setTimeout callback, it has to be via a ref, because
  // otherwise you're accessing the immutable old version of the variable, rather than the current
  // value.  Write to this ref any time you call `setRateLimitedUntil`.
  const rateLimitedUntilRef = useRef<Date | undefined>(undefined);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const checkClearRateLimit = useCallback(() => {
    const now = new Date();
    const until = rateLimitedUntilRef.current;
    if (until !== undefined && until < now) {
      rateLimitedUntilRef.current = undefined;
      setRateLimitedUntil(undefined);
    }
  }, []);
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
          const apiClient = newClient(apiUrl(), undefined);
          if (type === "puzzle") {
            result = await apiClient.submitGuess({
              body: {
                guess: guessInput,
              },
              params: {
                slug,
              },
            });
          } else {
            result = await apiClient.submitSubpuzzleGuess({
              body: {
                guess: guessInput,
              },
              params: {
                slug,
              },
            });
          }
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
        } else if (result.status === 429) {
          const then = new Date(result.body.retryAfter);
          const now = new Date();
          setRateLimitedUntil(then);
          rateLimitedUntilRef.current = then;
          setTimeout(
            checkClearRateLimit,
            then.getTime() - now.getTime() + 1000,
          );
          setFormState("idle");
        } else {
          // TODO: Handle other errors (rate-limit hit?)
          setFormError(`Server returned status ${result.status}`);
          setFormState("error");
        }
      })();
    },
    [guessInput, slug, type, checkClearRateLimit, onGuessesUpdate],
  );

  const formDisabled = formState === "submitting";
  const submitDisabled = formDisabled || rateLimitedUntil !== undefined;
  return (
    <Form
      method="post"
      action={`${rootUrl}/${type === "puzzle" ? "puzzles" : "subpuzzles"}/${slug}/guess`}
      onSubmit={onSubmit}
    >
      {formError ? <ErrorNotice>Error: {formError}</ErrorNotice> : undefined}
      {rateLimitedUntil ? (
        <RateLimitNotice id="rate-limit-notice">
          Your submissions are being rate-limited and will be rejected until{" "}
          {rateLimitedUntil.toLocaleTimeString()}
        </RateLimitNotice>
      ) : undefined}
      <FormContents>
        <Label htmlFor="guess-input">Submit guess</Label>
        <TextInput
          id="guess-input"
          name="guess"
          type="text"
          required
          disabled={formDisabled}
          value={guessInput}
          onChange={onInputChanged}
        />
        <Button type="submit" disabled={submitDisabled}>
          Submit
        </Button>
      </FormContents>
    </Form>
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
  const minutes = d.getMinutes().toString();
  return `${dayOfWeek} ${hours}:${minutes.length > 1 ? minutes : `0${minutes}`}`;
}

const PuzzleResponse = ({
  link,
  response,
}: Pick<Guess, "link" | "response">): JSX.Element => {
  return (
    <td className="answer-reply">
      {response}
      {link !== undefined && (
        <a href={link.href} target="_blank" rel="noreferrer">
          {link.display}
        </a>
      )}
    </td>
  );
};

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
        {guesses.toReversed().map((g) => {
          return (
            <tr key={g.canonical_input}>
              <td className="answer-attempt">{g.canonical_input}</td>
              <PuzzleResponse link={g.link} response={g.response} />
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
  guesses,
  teamState,
  onGuessesUpdate,
}: {
  slug: string;
  guesses: Guesses;
  teamState: TeamHuntState;
  onGuessesUpdate: (guesses: Guesses) => void;
}) => {
  const solved = guesses.some((g) => g.status === "correct");
  const puzzleState = teamState.puzzles[slug];

  const unstartedArchive = archiveMode && teamState.epoch === -1;
  const solutionAvailable =
    teamState.gates_satisfied.includes("solutions_released") ||
    unstartedArchive;

  return (
    <GuessSectionWrapper id="puzzle-guess-section">
      {solved ? (
        <Stamp />
      ) : (
        <PuzzleGuessForm
          type="puzzle"
          slug={slug}
          onGuessesUpdate={onGuessesUpdate}
        />
      )}
      <PuzzleGuessHistoryTable guesses={guesses} />

      {solutionAvailable && (
        <SolutionsLink>
          <a href={`${rootUrl}/puzzles/${slug}/solution`}>View solution</a>
          {archiveMode && (
            <a href={`${rootUrl}/puzzles/${slug}/stats`}>View stats</a>
          )}
        </SolutionsLink>
      )}
      {!solved && puzzleState && !solutionAvailable && (
        <PuzzleHintLink slug={slug} puzzleState={puzzleState} />
      )}
    </GuessSectionWrapper>
  );
};

export default PuzzleGuessSection;

export function SubpuzzleGuessSection({
  slug,
  guesses,
  onGuessesUpdate,
}: {
  slug: string;
  guesses: Guesses;
  onGuessesUpdate: (guesses: Guesses) => void;
}) {
  const solved = guesses.some((g) => g.status === "correct");

  return (
    <GuessSectionWrapper id="puzzle-guess-section">
      {solved ? null : (
        <PuzzleGuessForm
          type="subpuzzle"
          slug={slug}
          onGuessesUpdate={onGuessesUpdate}
        />
      )}
      <PuzzleGuessHistoryTable guesses={guesses} />
    </GuessSectionWrapper>
  );
}
