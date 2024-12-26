import React, { type Dispatch } from "react";
import Line, { LineType } from "./Line";
import Square, { SquareSide } from "./Square";
import {
  type CombineThreeGroup,
  isSolvedPuzzle,
  isSolvedSubgroup,
  type MinimalCombineThreeGroup,
  type MinimalPuzzle,
  type MinimalSubgroup,
  type Puzzle,
  type Subgroup,
} from "./Typedefs";
import { type PuzzleAction, PuzzleActionType } from "./usePuzzleState";

export type CombineThreeGroupProps = {
  dispatch: Dispatch<PuzzleAction>;
  group: CombineThreeGroup | MinimalCombineThreeGroup;
  selectedPuzzle: MinimalPuzzle | Puzzle | null;
  selectedSubgroup: MinimalSubgroup | Subgroup | null;
};

export function CombineThreeGroupView({
  dispatch,
  group,
  selectedPuzzle,
  selectedSubgroup,
}: CombineThreeGroupProps): JSX.Element {
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

  const thirdSubgroup =
    group.subgroups && group.subgroups.length > 2 && secondSubgroup
      ? group.subgroups[2]
      : null;
  const thirdSubgroupPuzzle1 = thirdSubgroup ? thirdSubgroup.puzzles[0] : null;
  const thirdSubgroupPuzzle2 =
    thirdSubgroup &&
    thirdSubgroupPuzzle1 &&
    isSolvedPuzzle(thirdSubgroupPuzzle1)
      ? thirdSubgroup.puzzles[1]
      : null;
  const thirdSubgroupPuzzle3 =
    thirdSubgroup &&
    thirdSubgroupPuzzle2 &&
    isSolvedPuzzle(thirdSubgroupPuzzle2)
      ? thirdSubgroup.puzzles[2]
      : null;
  const thirdSubgroupSolved =
    (thirdSubgroup && isSolvedSubgroup(thirdSubgroup)) ?? false;

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
            SquareSide.BOTTOM,
            SquareSide.RIGHT,
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
      <Line type={LineType.VERTICAL} show={firstSubgroupSolved} />
      <div />
      <div />
      {/* row 6 */}
      <Line type={LineType.VERTICAL} show={thirdSubgroupSolved} />
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
      <div />
      {/* row 7 */}
      <Line type={LineType.VERTICAL} show={thirdSubgroupSolved} />
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
      <div />
      {/* row 8 */}
      <Line type={LineType.VERTICAL} show={thirdSubgroupSolved} />
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
            SquareSide.RIGHT,
            SquareSide.BOTTOM,
            SquareSide.LEFT,
          ]}
        />
      ) : (
        <div />
      )}
      <div />
      <div />
      {/* row 9 */}
      <Line type={LineType.VERTICAL} show={thirdSubgroupSolved} />
      <div />
      <Line
        type={thirdSubgroupSolved ? LineType.T_LEFT : LineType.VERTICAL}
        show={secondSubgroupSolved}
      />
      <Line type={LineType.HORIZONTAL} show={thirdSubgroupSolved} />
      <Line type={LineType.TOP_RIGHT_CORNER} show={thirdSubgroupSolved} />
      {/* row 10 */}
      <Line type={LineType.VERTICAL} show={thirdSubgroupSolved} />
      <div />
      {thirdSubgroup && thirdSubgroupPuzzle1 ? (
        <Square
          color={thirdSubgroupPuzzle1.color}
          onClick={() => {
            dispatch({
              type: PuzzleActionType.SELECT_SUBGROUP,
              subgroup:
                selectedSubgroup?.uuid === thirdSubgroup.uuid
                  ? null
                  : thirdSubgroup,
            });
          }}
          selected={selectedSubgroup?.uuid === thirdSubgroup.uuid}
          selectionSides={
            isSolvedPuzzle(thirdSubgroupPuzzle1)
              ? [SquareSide.RIGHT, SquareSide.TOP, SquareSide.LEFT]
              : [SquareSide.ALL]
          }
        />
      ) : (
        <div />
      )}
      <div />
      <Line type={LineType.VERTICAL} show={thirdSubgroupSolved} />
      {/* row 11 */}
      <Line type={LineType.VERTICAL} show={thirdSubgroupSolved} />
      <div />
      {thirdSubgroup && thirdSubgroupPuzzle2 ? (
        <Square
          color={thirdSubgroupPuzzle2.color}
          onClick={() => {
            dispatch({
              type: PuzzleActionType.SELECT_SUBGROUP,
              subgroup:
                selectedSubgroup?.uuid === thirdSubgroup.uuid
                  ? null
                  : thirdSubgroup,
            });
          }}
          selected={selectedSubgroup?.uuid === thirdSubgroup.uuid}
          selectionSides={
            isSolvedPuzzle(thirdSubgroupPuzzle2)
              ? [SquareSide.RIGHT, SquareSide.LEFT]
              : [SquareSide.RIGHT, SquareSide.BOTTOM, SquareSide.LEFT]
          }
        />
      ) : (
        <div />
      )}
      <div />
      {thirdSubgroupSolved && lastPuzzle ? (
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
      {/* row 12 */}
      <Line type={LineType.VERTICAL} show={thirdSubgroupSolved} />
      <div />
      {thirdSubgroup && thirdSubgroupPuzzle3 ? (
        <Square
          color={thirdSubgroupPuzzle3.color}
          onClick={() => {
            dispatch({
              type: PuzzleActionType.SELECT_SUBGROUP,
              subgroup:
                selectedSubgroup?.uuid === thirdSubgroup.uuid
                  ? null
                  : thirdSubgroup,
            });
          }}
          selected={selectedSubgroup?.uuid === thirdSubgroup.uuid}
          selectionSides={[
            SquareSide.RIGHT,
            SquareSide.BOTTOM,
            SquareSide.LEFT,
          ]}
        />
      ) : (
        <div />
      )}
      <div />
      <Line type={LineType.VERTICAL} show={thirdSubgroupSolved} />
      {/* row 13 */}
      <Line type={LineType.BOTTOM_LEFT_CORNER} show={thirdSubgroupSolved} />
      <Line type={LineType.HORIZONTAL} show={thirdSubgroupSolved} />
      <Line type={LineType.T_UP} show={thirdSubgroupSolved} />
      <Line type={LineType.HORIZONTAL} show={thirdSubgroupSolved} />
      <Line type={LineType.BOTTOM_RIGHT_CORNER} show={thirdSubgroupSolved} />
    </>
  );
}
