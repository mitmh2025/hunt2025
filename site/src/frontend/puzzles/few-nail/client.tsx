import { useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  CLEANSTRING_REGEX,
  SPELLING_BEE_STORAGE,
} from "./puzzle-components/Constants";
import RoundView from "./puzzle-components/RoundView";
import { StyledDiv } from "./puzzle-components/Shared";
import SpellingBeeStatusViewProps from "./puzzle-components/SpellingBeeStatusView";
import { getGuessesByUuid } from "./puzzle-components/Util";
import usePuzzleState, {
  PuzzleActionType,
} from "./puzzle-components/usePuzzleState";
import { getState } from "@hunt_client/puzzles/the_annual_massachusetts_spelling_bee";

const App = (): JSX.Element => {
  const [
    {
      availableRounds,
      disabledByUuid,
      guessedUuids,
      guessResponsesByUuid,
      queryByUuid,
    },
    dispatch,
  ] = usePuzzleState();

  const refreshState = useCallback(() => {
    getState({
      guessesByUuid: getGuessesByUuid(),
    }).then(
      ({ rounds, guessResponses }) => {
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
  }, [dispatch]);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  const guess = useCallback(
    (uuid: string, guess: string) => {
      SPELLING_BEE_STORAGE.setItem(
        uuid,
        guess.toUpperCase().replace(CLEANSTRING_REGEX, ""),
      );
      dispatch({
        type: PuzzleActionType.GUESS,
        uuid,
        guess,
      });
      refreshState();
    },
    [dispatch, refreshState],
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
      {availableRounds.rounds.map((round, i) => {
        const nextRound = availableRounds.rounds[i + 1];
        return (
          <RoundView
            key={round.name}
            disabledByUuid={disabledByUuid}
            dispatch={dispatch}
            guess={guess}
            guessResponsesByUuid={guessResponsesByUuid}
            onRestart={() => {
              const uuidsToRemove = new Set<string>();
              for (const puzzle of round.puzzles) {
                uuidsToRemove.add(puzzle.uuid);
                SPELLING_BEE_STORAGE.removeItem(puzzle.uuid);
              }
              dispatch({
                type: PuzzleActionType.RESTART_ROUND,
                round,
              });
              refreshState();
            }}
            queryByUuid={queryByUuid}
            round={round}
            // Show the restart button if we have not yet entered any new
            showRestartButton={
              !nextRound ||
              nextRound.puzzles.every(({ uuid }) => !guessedUuids.has(uuid))
            }
          />
        );
      })}
      {availableRounds.rounds.length > 0 && (
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
                SPELLING_BEE_STORAGE.clear();
                dispatch({
                  type: PuzzleActionType.RESTART_PUZZLE,
                });
                refreshState();
              }
            }}
          />
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
