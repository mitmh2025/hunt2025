import React, { type Dispatch } from "react";
import Line, { LineType } from "./Line";
import Square, { SquareSide } from "./Square";
import {
  type CombineTwoGroup,
  isSolvedPuzzle,
  isSolvedSubgroup,
  type MinimalCombineTwoGroup,
  type MinimalPuzzle,
  type MinimalSubgroup,
  type Puzzle,
  type Subgroup,
} from "./Typedefs";
import { type PuzzleAction, PuzzleActionType } from "./usePuzzleState";

export type CombineTwoGroupProps = {
  dispatch: Dispatch<PuzzleAction>;
  group: CombineTwoGroup | MinimalCombineTwoGroup;
  selectedPuzzle: MinimalPuzzle | Puzzle | null;
  selectedSubgroup: MinimalSubgroup | Subgroup | null;
};

export function CombineTwoGroupView({
  dispatch,
  group,
  selectedPuzzle,
  selectedSubgroup,
}: CombineTwoGroupProps): JSX.Element {
  const initialPuzzleSolved = isSolvedPuzzle(group.firstPuzzle);

  const firstSubgroup =
    initialPuzzleSolved && group.subgroups ? group.subgroups[0] : null;
  const firstSubgroupPuzzle1 = firstSubgroup ? firstSubgroup.puzzles[0] : null;
  const firstSubgroupPuzzle2 =
    firstSubgroup &&
    firstSubgroupPuzzle1 &&
    isSolvedPuzzle(firstSubgroupPuzzle1)
      ? firstSubgroup.puzzles[1]
      : null;
  const firstSubgroupPuzzle3 =
    firstSubgroup &&
    firstSubgroupPuzzle2 &&
    isSolvedPuzzle(firstSubgroupPuzzle2)
      ? firstSubgroup.puzzles[2]
      : null;
  const firstSubgroupSolved =
    (firstSubgroup && isSolvedSubgroup(firstSubgroup)) ?? false;

  const secondSubgroup =
    group.subgroups && group.subgroups.length > 1 && firstSubgroupSolved
      ? group.subgroups[1]
      : null;
  const secondSubgroupPuzzle1 = secondSubgroup
    ? secondSubgroup.puzzles[0]
    : null;
  const secondSubgroupPuzzle2 =
    secondSubgroup &&
    secondSubgroupPuzzle1 &&
    isSolvedPuzzle(secondSubgroupPuzzle1)
      ? secondSubgroup.puzzles[1]
      : null;
  const secondSubgroupPuzzle3 =
    secondSubgroup &&
    secondSubgroupPuzzle2 &&
    isSolvedPuzzle(secondSubgroupPuzzle2)
      ? secondSubgroup.puzzles[2]
      : null;
  const secondSubgroupSolved =
    (secondSubgroup && isSolvedSubgroup(secondSubgroup)) ?? false;

  const lastPuzzle = group.lastPuzzle;

  return (
    <>
      {/* row 1 */}
      <Line type={LineType.TOP_LEFT_CORNER} show={initialPuzzleSolved} />
      <Line type={LineType.HORIZONTAL} show={initialPuzzleSolved} />
      <Line type={LineType.TOP_RIGHT_CORNER} show={initialPuzzleSolved} />
      <div />
      <div />
      {/* row 2 */}
      <Line type={LineType.VERTICAL} show={initialPuzzleSolved} />
      <div />
      {firstSubgroup && firstSubgroupPuzzle1 ? (
        <Square
          color={firstSubgroupPuzzle1.color}
          onClick={() => {
            dispatch({
              type: PuzzleActionType.SELECT_SUBGROUP,
              subgroup:
                selectedSubgroup?.uuid === firstSubgroup.uuid
                  ? null
                  : firstSubgroup,
            });
          }}
          selected={selectedSubgroup?.uuid === firstSubgroup.uuid}
          selectionSides={
            isSolvedPuzzle(firstSubgroupPuzzle1)
              ? [SquareSide.RIGHT, SquareSide.TOP, SquareSide.LEFT]
              : [SquareSide.ALL]
          }
        />
      ) : (
        <div />
      )}
      <div />
      <div />
      {/* row 3 */}
      <Line type={LineType.VERTICAL} show={initialPuzzleSolved} />
      <div />
      {firstSubgroup && firstSubgroupPuzzle2 ? (
        <Square
          color={firstSubgroupPuzzle2.color}
          onClick={() => {
            dispatch({
              type: PuzzleActionType.SELECT_SUBGROUP,
              subgroup:
                selectedSubgroup?.uuid === firstSubgroup.uuid
                  ? null
                  : firstSubgroup,
            });
          }}
          selected={selectedSubgroup?.uuid === firstSubgroup.uuid}
          selectionSides={
            isSolvedPuzzle(firstSubgroupPuzzle2)
              ? [SquareSide.RIGHT, SquareSide.LEFT]
              : [SquareSide.RIGHT, SquareSide.BOTTOM, SquareSide.LEFT]
          }
        />
      ) : (
        <div />
      )}
      <div />
      <div />
      {/* row 4 */}
      <Line type={LineType.VERTICAL} show={initialPuzzleSolved} />
      <div />
      {firstSubgroup && firstSubgroupPuzzle3 ? (
        <Square
          color={firstSubgroupPuzzle3.color}
          onClick={() => {
            dispatch({
              type: PuzzleActionType.SELECT_SUBGROUP,
              subgroup:
                selectedSubgroup?.uuid === firstSubgroup.uuid
                  ? null
                  : firstSubgroup,
            });
          }}
          selected={selectedSubgroup?.uuid === firstSubgroup.uuid}
          selectionSides={[
            SquareSide.LEFT,
            SquareSide.RIGHT,
            SquareSide.BOTTOM,
          ]}
        />
      ) : (
        <div />
      )}
      <div />
      <div />
      {/* row 5 */}
      <Square
        color={group.firstPuzzle.color}
        onClick={() => {
          dispatch({
            type: PuzzleActionType.SELECT_PUZZLE,
            puzzle:
              selectedPuzzle?.uuid === group.firstPuzzle.uuid
                ? null
                : group.firstPuzzle,
          });
        }}
        selected={selectedPuzzle?.uuid === group.firstPuzzle.uuid}
      />
      <div />
      <Line
        type={secondSubgroupSolved ? LineType.T_LEFT : LineType.VERTICAL}
        show={firstSubgroupSolved}
      />
      <Line type={LineType.HORIZONTAL} show={secondSubgroupSolved} />
      <Line type={LineType.TOP_RIGHT_CORNER} show={secondSubgroupSolved} />
      {/* row 6 */}
      <Line type={LineType.VERTICAL} show={secondSubgroupSolved} />
      <div />
      {secondSubgroup && secondSubgroupPuzzle1 ? (
        <Square
          color={secondSubgroupPuzzle1.color}
          onClick={() => {
            dispatch({
              type: PuzzleActionType.SELECT_SUBGROUP,
              subgroup:
                selectedSubgroup?.uuid === secondSubgroup.uuid
                  ? null
                  : secondSubgroup,
            });
          }}
          selected={selectedSubgroup?.uuid === secondSubgroup.uuid}
          selectionSides={
            isSolvedPuzzle(secondSubgroupPuzzle1)
              ? [SquareSide.RIGHT, SquareSide.TOP, SquareSide.LEFT]
              : [SquareSide.ALL]
          }
        />
      ) : (
        <div />
      )}
      <div />
      <Line type={LineType.VERTICAL} show={secondSubgroupSolved} />
      {/* row 7 */}
      <Line type={LineType.VERTICAL} show={secondSubgroupSolved} />
      <div />
      {secondSubgroup && secondSubgroupPuzzle2 ? (
        <Square
          color={secondSubgroupPuzzle2.color}
          onClick={() => {
            dispatch({
              type: PuzzleActionType.SELECT_SUBGROUP,
              subgroup:
                selectedSubgroup?.uuid === secondSubgroup.uuid
                  ? null
                  : secondSubgroup,
            });
          }}
          selected={selectedSubgroup?.uuid === secondSubgroup.uuid}
          selectionSides={
            isSolvedPuzzle(secondSubgroupPuzzle2)
              ? [SquareSide.RIGHT, SquareSide.LEFT]
              : [SquareSide.RIGHT, SquareSide.BOTTOM, SquareSide.LEFT]
          }
        />
      ) : (
        <div />
      )}
      <div />
      {secondSubgroupSolved && lastPuzzle ? (
        <Square
          color={lastPuzzle.color}
          onClick={() => {
            dispatch({
              type: PuzzleActionType.SELECT_PUZZLE,
              puzzle:
                selectedPuzzle?.uuid === lastPuzzle.uuid ? null : lastPuzzle,
            });
          }}
          selected={selectedPuzzle?.uuid === lastPuzzle.uuid}
        />
      ) : (
        <div />
      )}
      {/* row 8 */}
      <Line type={LineType.VERTICAL} show={secondSubgroupSolved} />
      <div />
      {secondSubgroup && secondSubgroupPuzzle3 ? (
        <Square
          color={secondSubgroupPuzzle3.color}
          onClick={() => {
            dispatch({
              type: PuzzleActionType.SELECT_SUBGROUP,
              subgroup:
                selectedSubgroup?.uuid === secondSubgroup.uuid
                  ? null
                  : secondSubgroup,
            });
          }}
          selected={selectedSubgroup?.uuid === secondSubgroup.uuid}
          selectionSides={[
            SquareSide.LEFT,
            SquareSide.BOTTOM,
            SquareSide.RIGHT,
          ]}
        />
      ) : (
        <div />
      )}
      <div />
      <Line type={LineType.VERTICAL} show={secondSubgroupSolved} />
      {/* row 9 */}
      <Line type={LineType.BOTTOM_LEFT_CORNER} show={secondSubgroupSolved} />
      <Line type={LineType.HORIZONTAL} show={secondSubgroupSolved} />
      <Line type={LineType.T_UP} show={secondSubgroupSolved} />
      <Line type={LineType.HORIZONTAL} show={secondSubgroupSolved} />
      <Line type={LineType.BOTTOM_RIGHT_CORNER} show={secondSubgroupSolved} />
    </>
  );
}
