import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  CLEANSTRING_REGEX,
  HAS_STORAGE,
  LOCAL_STORAGE_PREFIX,
} from "./puzzle-components/Constants";
import RoundView from "./puzzle-components/RoundView";
import { StyledDiv } from "./puzzle-components/Shared";
import SpellingBeeStatusViewProps from "./puzzle-components/SpellingBeeStatusView";
import type {
  GuessResponsesByUuid,
  MinimalRounds,
} from "./puzzle-components/Typedefs";
import { getGuessedUuids, getGuessesByUuid } from "./puzzle-components/Util";
import usePuzzleState, {
  PuzzleActionType,
} from "./puzzle-components/usePuzzleState";

const App = (): JSX.Element => {
  const [
    { availableRounds, disabledByUuid, guessResponsesByUuid, queryByUuid },
    dispatch,
  ] = usePuzzleState();
  const [guessedUuids, setGuessedUuids] =
    useState<Set<string>>(getGuessedUuids());

  useEffect(() => {
    fetch("/puzzles/the_annual_massachusetts_spelling_bee/state", {
      method: "POST",
      body: JSON.stringify({ guessesByUuid: getGuessesByUuid() }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(
      async (response) => {
        const { rounds, guessResponses } = (await response.json()) as {
          rounds: MinimalRounds;
          guessResponses: GuessResponsesByUuid;
        };
        dispatch({
          type: PuzzleActionType.REFRESH_STATE,
          availableRounds: rounds,
          guessResponsesByUuid: guessResponses,
        });
      },
      (rejectionReason) => {
        console.log("request failed", rejectionReason);
      },
    );
  }, [dispatch, guessedUuids]);

  const guess = useCallback(
    (uuid: string, guess: string) => {
      localStorage.setItem(
        `${LOCAL_STORAGE_PREFIX}${uuid}`,
        guess.toUpperCase().replace(CLEANSTRING_REGEX, ""),
      );
      setGuessedUuids(new Set(...guessedUuids, uuid));
      dispatch({
        type: PuzzleActionType.GUESS,
        uuid,
        guess,
      });
    },
    [dispatch, guessedUuids],
  );

  return (
    <>
      <StyledDiv>
        Welcome to the spelling bee! You’ll be competing before judges Merriam,
        Webster, and Dexter. Merriam will give you the word to be spelled
        correctly, Webster will give you the meaning, and Dexter will give you
        the usage. This spelling bee uses the fourth edition.
      </StyledDiv>
      {availableRounds.rounds.length === 0 && (
        <StyledDiv>Loading spelling bee...</StyledDiv>
      )}
      {availableRounds.rounds.map((round) => (
        <RoundView
          key={round.name}
          disabledByUuid={disabledByUuid}
          dispatch={dispatch}
          guess={guess}
          guessResponsesByUuid={guessResponsesByUuid}
          onRestart={() => {
            if (HAS_STORAGE) {
              const uuidsToRemove = new Set<string>();
              for (const puzzle of round.puzzles) {
                uuidsToRemove.add(puzzle.uuid);
                localStorage.removeItem(
                  `${LOCAL_STORAGE_PREFIX}${puzzle.uuid}`,
                );
              }
              dispatch({
                type: PuzzleActionType.RESTART_ROUND,
                round,
              });
              setGuessedUuids(guessedUuids.difference(uuidsToRemove));
            }
          }}
          queryByUuid={queryByUuid}
          round={round}
        />
      ))}
      {availableRounds.rounds.length > 1 && (
        <StyledDiv>
          <SpellingBeeStatusViewProps rounds={availableRounds} />
          <input
            type="submit"
            value="Restart Puzzle"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to reset the state of this puzzle?",
                )
              ) {
                if (HAS_STORAGE) {
                  const itemsToRemove: string[] = [];
                  for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key?.startsWith(LOCAL_STORAGE_PREFIX)) {
                      itemsToRemove.push(key);
                    }
                  }
                  for (const item of itemsToRemove) {
                    localStorage.removeItem(item);
                  }
                }
                setGuessedUuids(new Set<string>());
                dispatch({
                  type: PuzzleActionType.RESTART_PUZZLE,
                });
              }
            }}
          />{" "}
        </StyledDiv>
      )}
    </>
  );
};

const elem = document.getElementById(
  "the-annual-massachusetts-spelling-bee-root",
);
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #the-annual-massachusetts-spelling-bee-root was nowhere to be found",
  );
}
