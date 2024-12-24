import React, { type RefCallback } from "react";
import EmptyPanel from "./EmptyPanel";
import PuzzlePanel from "./PuzzlePanel";
import { Height, type MinimalPuzzle, type Puzzle } from "./Typedefs";

type PanelStackProps = {
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

export default function PanelStack({
  inputRefCallback,
  guess,
  onSolve,
  puzzle,
}: PanelStackProps): JSX.Element {
  const puzzlePanel = (
    <PuzzlePanel
      guess={guess}
      inputRefCallback={inputRefCallback}
      onSolve={onSolve}
      puzzle={puzzle}
    />
  );
  const emptyPanel = <EmptyPanel color={puzzle.color} />;
  return (
    <div>
      {puzzle.height === Height.HIGH ? puzzlePanel : emptyPanel}
      {puzzle.height === Height.MIDDLE ? puzzlePanel : emptyPanel}
      {puzzle.height === Height.LOW ? puzzlePanel : emptyPanel}
    </div>
  );
}
