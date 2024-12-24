import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import PanelStack from "./PanelStack";
import SignPanelStack from "./SignPanelStack";
import {
  Height,
  type MinimalPuzzle,
  type Puzzle,
  PuzzleColor,
  isCreamPuzzle,
} from "./Typedefs";

const PanelViewerWrapper = styled.div<{ $negativeMarginSorry?: number }>`
  display: flex;
  margin-left: ${({ $negativeMarginSorry }) => $negativeMarginSorry ?? 0}px;
  margin-bottom: 16px;
`;

const PanelViewerCreamWrapper = styled(PanelViewerWrapper)`
  margin-right: 16px;
  &:last-child {
    margin-right: 0;
  }
`;

type PanelViewProps = {
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
  negativeMarginSorry?: number;
  puzzles: (MinimalPuzzle | Puzzle)[];
};

export default function PanelViewer({
  guess,
  negativeMarginSorry,
  puzzles,
}: PanelViewProps): JSX.Element {
  const panelRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    panelRefs.current = panelRefs.current.slice(0, puzzles.length);
  }, [puzzles]);

  return (
    <PanelViewerWrapper $negativeMarginSorry={negativeMarginSorry}>
      {puzzles.map((puzzle, i) => {
        const panelStack = (
          <PanelStack
            guess={guess}
            inputRefCallback={(el: HTMLInputElement) => {
              panelRefs.current[i] = el;
            }}
            key={puzzle.uuid}
            onSolve={() => {
              if (i < puzzles.length - 1) {
                panelRefs.current[i + 1]?.focus();
              }
            }}
            puzzle={puzzle}
          />
        );
        if (isCreamPuzzle(puzzle)) {
          const numSignsLeft = Math.floor(puzzle.parts.length / 2);
          const signPanels = puzzle.parts.map(({ fontSize, prompt }, index) => (
            <SignPanelStack
              key={index}
              color={PuzzleColor.WHITE}
              fontSize={fontSize}
              height={Height.MIDDLE}
              text={prompt}
            />
          ));
          return (
            <PanelViewerCreamWrapper key={puzzle.uuid}>
              {signPanels.slice(0, numSignsLeft)}
              {panelStack}
              {signPanels.slice(numSignsLeft)}
            </PanelViewerCreamWrapper>
          );
        }
        return panelStack;
      })}
    </PanelViewerWrapper>
  );
}
