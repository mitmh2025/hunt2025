import React, { useCallback, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { styled } from "styled-components";
import { type z } from "zod";
import { type TeamHuntState, newClient } from "../../../lib/api/client";
import { type publicContract } from "../../../lib/api/contract";
import apiUrl from "../utils/apiUrl";
import { Button, LabeledTextAreaWithError } from "./StyledUI";

type GetPuzzleStateResponse = z.infer<
  (typeof publicContract.getPuzzleState.responses)["200"]
>;
type Hints = GetPuzzleStateResponse["hints"];

type Hint = Hints[number];

type FormState = "idle" | "submitting" | "error";

const HintSectionWrapper = styled.section`
  color: var(--black);
  padding: 1rem;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 2rem 1rem 1rem;

  h3 {
    padding-bottom: 0;
  }
`;

const Form = styled.form`
  text-align: left;

  label {
    font-size: 2rem;
  }
`;

const PuzzleHintForm = ({
  slug,
  onReceiveHintsFromApi,
}: {
  slug: string;
  onReceiveHintsFromApi: (hints: Hint[]) => void;
}) => {
  const [hintInput, setHintInput] = useState<string>("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const onInputChanged = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHintInput(e.target.value);
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
          result = await apiClient.submitHintRequest({
            body: {
              request: hintInput,
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
          setHintInput("");
          setFormError(undefined);
          setFormState("idle");
          onReceiveHintsFromApi(parsedResult.hints);
        } else {
          setFormError(`Server returned status ${result.status}`);
          setFormState("error");
        }
      })();
    },
    [hintInput, slug, onReceiveHintsFromApi],
  );

  const formDisabled = formState === "submitting";
  return (
    <Form method="post" action="#" onSubmit={onSubmit}>
      <LabeledTextAreaWithError
        label="Request a Hint"
        error={formError}
        id="hint-input"
        name="hint"
        required
        disabled={formDisabled}
        value={hintInput}
        onChange={onInputChanged}
        style={{ width: "100%", minHeight: "200px" }}
        maxLength={2500}
      />
      <Button type="submit" disabled={formDisabled}>
        Submit
      </Button>
    </Form>
  );
};

function formatHintTimestamp(t: string) {
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

const PuzzleHintHistory = ({ hints }: { hints: Hints }) => {
  if (hints.length === 0) {
    return undefined;
  }

  return (
    <div>
      {hints.map((h) => {
        return (
          <div key={h.id}>
            {h.type === "puzzle_hint_requested" ? (
              <>
                <h3>Hint requested at {formatHintTimestamp(h.timestamp)}</h3>
                <p>{h.data.request}</p>
              </>
            ) : (
              <>
                <h3>Hunt HQ response at {formatHintTimestamp(h.timestamp)}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(h.data.response),
                  }}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

const PuzzleHints = ({
  slug,
  hints,
  onReceiveHintsFromApi,
  teamState,
}: {
  slug: string;
  hints: Hints;
  onReceiveHintsFromApi: (hints: Hints) => void;
  teamState: TeamHuntState;
}) => {
  let form: JSX.Element | null = null;
  // TODO: if there is a hint request pending,
  // tell the team to wait
  if (teamState.puzzles[slug]?.answer) {
    form = null;
  } else {
    form = (
      <PuzzleHintForm
        slug={slug}
        onReceiveHintsFromApi={onReceiveHintsFromApi}
      />
    );
  }
  return (
    <HintSectionWrapper id="puzzle-hint-section">
      <PuzzleHintHistory hints={hints} />

      {form}
    </HintSectionWrapper>
  );
};

export default PuzzleHints;
