import React, { type Dispatch } from "react";
import { styled } from "styled-components";
import { CombineThreeGroupView } from "./CombineThreePuzzleGroup";
import { CombineTwoGroupView } from "./CombineTwoPuzzleGroup";
import PanelViewer from "./PanelViewer";
import { StandardGroupView } from "./StandardPuzzleGroup";
import {
  type Group,
  GroupType,
  type MinimalGroup,
  type MinimalPuzzle,
  type MinimalSubgroup,
  type Puzzle,
  type Subgroup,
} from "./Typedefs";
import type { PuzzleAction } from "./usePuzzleState";

const GroupViewerWrapper = styled.div`
  display: flex;
`;

const GroupViewerGrid = styled.div<{ $rows: number }>`
  display: grid;
  place-items: center;
  margin-right: 96px;
  margin-bottom: 96px;
  grid-template-columns: repeat(5, 96px);
  grid-template-rows: repeat(${({ $rows }) => `${$rows}`}, 96px);
`;

type GroupViewerProps = {
  dispatch: Dispatch<PuzzleAction>;
  group: Group | MinimalGroup;
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
  selectedPuzzle: MinimalPuzzle | Puzzle | null;
  selectedSubgroup: MinimalSubgroup | Subgroup | null;
};

export default function GroupViewer({
  dispatch,
  guess,
  group,
  selectedPuzzle,
  selectedSubgroup,
}: GroupViewerProps): JSX.Element {
  let selectedPuzzles: (MinimalPuzzle | Puzzle)[] | null;
  if (!selectedPuzzle && selectedSubgroup) {
    selectedPuzzles = selectedSubgroup.puzzles;
  } else if (selectedPuzzle && !selectedSubgroup) {
    selectedPuzzles = [selectedPuzzle];
  } else {
    selectedPuzzles = null;
  }

  return (
    <GroupViewerWrapper>
      {group.type === GroupType.STANDARD && (
        <GroupViewerGrid $rows={9}>
          <StandardGroupView
            dispatch={dispatch}
            group={group}
            selectedPuzzle={selectedPuzzle}
            selectedSubgroup={selectedSubgroup}
          />
        </GroupViewerGrid>
      )}
      {group.type === GroupType.COMBINE_TWO && (
        <GroupViewerGrid $rows={9}>
          <CombineTwoGroupView
            dispatch={dispatch}
            group={group}
            selectedPuzzle={selectedPuzzle}
            selectedSubgroup={selectedSubgroup}
          />
        </GroupViewerGrid>
      )}
      {group.type === GroupType.COMBINE_THREE && (
        <GroupViewerGrid $rows={13}>
          <CombineThreeGroupView
            dispatch={dispatch}
            group={group}
            selectedPuzzle={selectedPuzzle}
            selectedSubgroup={selectedSubgroup}
          />
        </GroupViewerGrid>
      )}
      {selectedPuzzles && (
        <PanelViewer
          guess={guess}
          negativeMarginSorry={-104}
          puzzles={selectedPuzzles}
        />
      )}
    </GroupViewerWrapper>
  );
}
