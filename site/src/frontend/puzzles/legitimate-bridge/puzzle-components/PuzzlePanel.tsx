import React, { type ChangeEvent, type RefCallback, useState } from "react";
import { styled } from "styled-components";
import success from "../assets/success.wav";
import { CLEANSTRING_REGEX } from "./PuzzleConstants";
import {
  COLOR_TO_CSS,
  isCreamPuzzle,
  isSolvedPuzzle,
  type MinimalPuzzle,
  type Puzzle,
  type PuzzleColor,
} from "./Typedefs";

const PanelOuterWrapper = styled.div<{ $color: PuzzleColor; $solved: boolean }>`
  height: 132px;
  width: 132px;
  padding: 8px;
  font-size: 2em;
  cursor: ${({ $solved }) => ($solved ? "default" : "pointer")};
  ${({ $color }) => COLOR_TO_CSS[$color]}
`;

const PanelInnerWrapper = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
`;

const PuzzlePromptWrapper = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PuzzlePrompt = styled.div<{ $fontSize: number }>`
  color: white;
  margin: 8px;
  width: 100px;
  flex: 0 0 auto;
  text-align: center;
  font-size: ${({ $fontSize }) => $fontSize}%;
`;

const PuzzleAnswerInputWrapper = styled.div<{ $solved: boolean }>`
  height: 50%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: ${({ $solved }) => ($solved ? "center" : "normal")};
`;

const PuzzleAnswerInput = styled.input<{
  $fontSize: number;
  $invalid: boolean;
}>`
  background-color: #999;
  flex: 1 0 auto;
  border-radius: 8px;
  border-width: 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  text-align: center;
  width: 100px;
  font-family: "Jargon";
  font-size: ${({ $fontSize }) => $fontSize}%;
  &:hover {
    background-color: white;
    color: gray;
  }
  &:focus {
    background-color: white;
    color: ${({ $invalid }) => ($invalid ? "red" : "gray")};
  }
`;

const PuzzleAnswer = styled.div<{ $fontSize: number }>`
  color: #00ff00;
  width: 100px;
  flex: 0 0 auto;
  text-align: center;
  font-size: ${({ $fontSize }) => $fontSize}%;
`;

type PanelProps = {
  guess: ({
    uuid,
    guess,
    correctCallback,
    incorrectCallback,
  }: {
    uuid: string;
    guess: string;
    correctCallback: () => void;
    incorrectCallback: (value: string) => void;
  }) => void;
  inputRefCallback: RefCallback<HTMLInputElement>;
  onSolve?: () => void;
  puzzle: MinimalPuzzle | Puzzle;
};

export default function PuzzlePanel({
  guess,
  inputRefCallback,
  onSolve,
  puzzle,
}: PanelProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [isInvalidInput, setIsInvalidInput] = useState<boolean>(false);
  const solved = isSolvedPuzzle(puzzle);

  function correctCallback(): void {
    void new Audio(success).play();
    onSolve?.();
  }

  function incorrectCallback(value: string): void {
    setInputValue(value);
    setIsInvalidInput(true);
  }

  function onInput({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>): void {
    if (!solved) {
      const cleanValue = value.replaceAll(CLEANSTRING_REGEX, "").toUpperCase();
      const cleanSolution = puzzle.placeholder
        .replaceAll(" ", "")
        .toUpperCase();
      if (isInvalidInput && cleanValue.length < cleanSolution.length) {
        setIsInvalidInput(false);
        setInputValue(value);
      } else if (cleanValue.length === cleanSolution.length) {
        setInputValue(value);
        guess({
          uuid: puzzle.uuid,
          guess: cleanValue,
          correctCallback,
          incorrectCallback,
        });
      } else if (cleanValue.length > cleanSolution.length) {
        setInputValue(cleanValue.slice(cleanSolution.length));
        setIsInvalidInput(false);
      } else {
        setInputValue(value);
      }
    }
  }

  return (
    <PanelOuterWrapper $color={puzzle.color} $solved={solved}>
      <PanelInnerWrapper>
        <PuzzlePromptWrapper>
          <PuzzlePrompt
            $fontSize={isCreamPuzzle(puzzle) ? 100 : puzzle.fontSize}
          >
            {puzzle.prompt}
          </PuzzlePrompt>
        </PuzzlePromptWrapper>
        <PuzzleAnswerInputWrapper $solved={solved}>
          {solved && (
            <PuzzleAnswer $fontSize={puzzle.solutionFontSize}>
              {puzzle.solution}
            </PuzzleAnswer>
          )}
          {!solved && (
            <PuzzleAnswerInput
              $fontSize={puzzle.solutionFontSize}
              $invalid={isInvalidInput}
              ref={(el: HTMLInputElement) => {
                inputRefCallback(el);
              }}
              type={"text"}
              onInput={onInput}
              onFocus={() => {
                setInputValue("");
              }}
              onBlur={() => {
                setInputValue(undefined);
                setIsInvalidInput(false);
              }}
              value={inputValue ?? puzzle.placeholder}
            ></PuzzleAnswerInput>
          )}
        </PuzzleAnswerInputWrapper>
      </PanelInnerWrapper>
    </PanelOuterWrapper>
  );
}
