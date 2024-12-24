import React, { type ChangeEvent, type RefCallback, useState } from "react";
import { styled } from "styled-components";
import success from "../assets/success.wav";
import { CLEANSTRING_REGEX } from "./PuzzleConstants";
import {
  COLOR_TO_HEX,
  isCreamPuzzle,
  isSolvedPuzzle,
  type MinimalPuzzle,
  type Puzzle,
} from "./Typedefs";

const PanelOuterWrapper = styled.div`
  height: 132px;
  width: 132px;
  padding: 8px;
  font-size: 2em;
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

const PuzzlePrompt = styled.div`
  color: white;
  margin: 8px;
  width: 100px;
  flex: 0 0 auto;
  text-align: center;
`;

const PuzzleAnswerInputWrapper = styled.div`
  height: 50%;
  padding: 8px;
  display: flex;
  justify-content: center;
`;

const PuzzleAnswerInput = styled.input`
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
  &:hover {
    background-color: white;
    color: gray;
  }
  &:focus {
    background-color: white;
  }
`;

const PuzzleAnswer = styled.div`
  color: #00ff00;
  width: 100px;
  flex: 0 0 auto;
  text-align: center;
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
  const [isFocused, setIsFocused] = useState<boolean>(false);
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
    <PanelOuterWrapper
      style={{
        backgroundColor: COLOR_TO_HEX[puzzle.color],
        cursor: solved ? "default" : "pointer",
      }}
    >
      <PanelInnerWrapper>
        <PuzzlePromptWrapper>
          <PuzzlePrompt
            style={{
              fontSize: isCreamPuzzle(puzzle) ? "100%" : `${puzzle.fontSize}%`,
            }}
          >
            {puzzle.prompt}
          </PuzzlePrompt>
        </PuzzlePromptWrapper>
        <PuzzleAnswerInputWrapper
          style={{ alignItems: solved ? "center" : "normal" }}
        >
          {solved && (
            <PuzzleAnswer style={{ fontSize: `${puzzle.solutionFontSize}%` }}>
              {puzzle.solution}
            </PuzzleAnswer>
          )}
          {!solved && (
            <PuzzleAnswerInput
              style={{
                fontSize: `${puzzle.solutionFontSize}%`,
                color: isFocused ? (isInvalidInput ? "red" : "gray") : "black",
              }}
              ref={(el: HTMLInputElement) => {
                inputRefCallback(el);
              }}
              type={"text"}
              onInput={onInput}
              onFocus={() => {
                setInputValue("");
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
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
