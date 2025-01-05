import React, { type ChangeEvent, type Dispatch } from "react";
import { styled } from "styled-components";
import GuessResponseView from "./GuessResponseView";
import { BORDER_COLOR } from "./Shared";
import type { GuessResponse, MinimalPuzzle } from "./Typedefs";
import { type PuzzleAction, PuzzleActionType } from "./usePuzzleState";

const Row = styled.div`
  border: 1px solid ${BORDER_COLOR};
  padding: 1em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-contents: space-between;
  flex-wrap: wrap;
  gap: 1em;
`;

const AudioWrapper = styled.div`
  flex: 0 0 auto;
  border: 1px solid ${BORDER_COLOR};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  padding: 0.5em 1em;
`;

const StyledAudio = styled.audio`
  width: 250px;
`;

const StyledInput = styled.input`
  flex: 0 0 150px;
`;

type RowProps = {
  disabled: boolean;
  dispatch: Dispatch<PuzzleAction>;
  guess: (uuid: string, guess: string) => void;
  guessResponse: GuessResponse | null;
  puzzle: MinimalPuzzle;
  query: string;
};

export default function RowView({
  disabled,
  dispatch,
  guess,
  guessResponse,
  puzzle,
  query,
}: RowProps): JSX.Element {
  return (
    <Row key={puzzle.uuid}>
      <FlexWrapper>
        <AudioWrapper>
          <span>WORD</span>
          <StyledAudio controls src={puzzle.wordAudio} />
        </AudioWrapper>
        <AudioWrapper>
          <span>MEANING</span>
          <StyledAudio controls src={puzzle.meaningAudio} />
        </AudioWrapper>
        <AudioWrapper>
          <span>USE</span>
          <StyledAudio controls src={puzzle.useAudio} />
        </AudioWrapper>
      </FlexWrapper>
      <FlexWrapper>
        <StyledInput
          disabled={disabled}
          type="text"
          onInput={({
            currentTarget: { value },
          }: ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: PuzzleActionType.INPUT,
              uuid: puzzle.uuid,
              input: value,
            });
          }}
          onKeyUp={({ key }) => {
            if (key === "Enter") {
              guess(puzzle.uuid, query);
            }
          }}
          value={query}
        />
        <input
          disabled={disabled}
          type="submit"
          onClick={() => {
            guess(puzzle.uuid, query);
          }}
          value="Submit Query"
        />
      </FlexWrapper>
      {!guessResponse && disabled && <div>Checking spelling...</div>}
      {guessResponse && <GuessResponseView guessResponse={guessResponse} />}
    </Row>
  );
}
