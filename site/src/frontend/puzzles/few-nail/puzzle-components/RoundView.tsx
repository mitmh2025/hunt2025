import React, { type Dispatch } from "react";
import RoundStatusView from "./RoundStatusView";
import RowView from "./RowView";
import { StyledDiv } from "./Shared";
import type { GuessResponsesByUuid, MinimalRound } from "./Typedefs";
import type { PuzzleAction } from "./usePuzzleState";

type RoundProps = {
  disabledByUuid: Record<string, boolean>;
  dispatch: Dispatch<PuzzleAction>;
  guess: (uuid: string, guess: string) => void;
  guessResponsesByUuid: GuessResponsesByUuid;
  onRestart: () => void;
  queryByUuid: Record<string, string>;
  round: MinimalRound;
};

export default function RoundView({
  disabledByUuid,
  dispatch,
  guess,
  guessResponsesByUuid,
  onRestart,
  queryByUuid,
  round,
}: RoundProps): JSX.Element {
  return (
    <StyledDiv>
      <h2>{round.name}</h2>
      {round.puzzles.map((puzzle) => (
        <RowView
          key={puzzle.uuid}
          disabled={disabledByUuid[puzzle.uuid] ?? false}
          dispatch={dispatch}
          guess={guess}
          guessResponse={guessResponsesByUuid[puzzle.uuid] ?? null}
          puzzle={puzzle}
          query={queryByUuid[puzzle.uuid] ?? ""}
        />
      ))}
      <RoundStatusView round={round} />
      <div>
        <input type="submit" value="Restart Round" onClick={onRestart} />
      </div>
    </StyledDiv>
  );
}
