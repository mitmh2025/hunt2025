import React, { useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import GroupViewer from "./puzzle-components/GroupViewer";
import PanelViewer from "./puzzle-components/PanelViewer";
import {
  HAS_STORAGE,
  LOCAL_STORAGE_PREFIX,
  TUTORIAL_COLORS,
} from "./puzzle-components/PuzzleConstants";
import Square from "./puzzle-components/Square";
import {
  type Group,
  type MinimalGroup,
  NonPuzzleColor,
  type PuzzleColor,
} from "./puzzle-components/Typedefs";
import usePuzzleState, {
  PuzzleActionType,
} from "./puzzle-components/usePuzzleState";
import { getState, makeGuess } from "@hunt_client/puzzles/jargon";

const Wrapper = styled.div`
  font-family: "Jargon";
  line-height: normal;
`;

const HomeRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  overflow-x: auto;
`;

const ScrollWrapper = styled.div`
  overflow-x: auto;
`;

const App = (): JSX.Element => {
  const [
    {
      availablePuzzleGroups,
      availableTutorialPuzzles,
      selectedColor,
      selectedGroup,
      selectedPuzzle,
      selectedSubgroup,
      solvedUuids,
    },
    dispatch,
  ] = usePuzzleState();

  useEffect(() => {
    getState(solvedUuids).then(
      ({ tutorialPuzzles, puzzleGroups }) => {
        dispatch({
          type: PuzzleActionType.REFRESH_STATE,
          tutorialPuzzles: tutorialPuzzles,
          puzzleGroups: puzzleGroups,
        });
      },
      (rejectionReason) => {
        console.log("request failed", rejectionReason);
      },
    );
  }, [dispatch, solvedUuids]);

  const guess = useCallback(
    ({
      correctCallback,
      guess,
      incorrectCallback,
      uuid,
    }: {
      uuid: string;
      guess: string;
      correctCallback: () => void;
      incorrectCallback: (value: string) => void;
    }) => {
      makeGuess({ uuid, guess }).then(
        ({ solutionUuid }) => {
          if (solutionUuid) {
            correctCallback();
            if (HAS_STORAGE) {
              localStorage.setItem(
                `${LOCAL_STORAGE_PREFIX}${solutionUuid}`,
                "true",
              );
            }
            dispatch({
              type: PuzzleActionType.SET_SOLVED,
              solutionUuid,
            });
          } else {
            incorrectCallback(guess);
          }
        },
        (rejectionReason) => {
          console.log("request failed", rejectionReason);
        },
      );
    },
    [dispatch],
  );

  const handleTutorialClick = useCallback(
    (color: PuzzleColor | null) => {
      dispatch({
        type: PuzzleActionType.SELECT_COLOR,
        color,
      });
    },
    [dispatch],
  );

  const handleGroupClick = useCallback(
    (group: Group | MinimalGroup | null) => {
      dispatch({
        type: PuzzleActionType.SELECT_GROUP,
        group,
      });
    },
    [dispatch],
  );

  function reset(): void {
    if (HAS_STORAGE) {
      const itemsToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(LOCAL_STORAGE_PREFIX)) {
          itemsToRemove.push(key);
        }
      }
      for (const item of itemsToRemove) {
        localStorage.removeItem(item);
      }
    }
    dispatch({
      type: PuzzleActionType.RESET_STATE,
    });
  }

  return (
    <>
      <Wrapper>
        {
          <HomeRow>
            {TUTORIAL_COLORS.map((color: PuzzleColor) => (
              <Square
                key={color}
                color={color}
                onClick={() => {
                  handleTutorialClick(selectedColor === color ? null : color);
                }}
                selected={selectedColor === color}
              />
            ))}
            <Square
              color={NonPuzzleColor.GRAY}
              label={"RESET"}
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to reset the state of this puzzle?",
                  )
                ) {
                  reset();
                }
              }}
              selected={false}
            />
          </HomeRow>
        }
        {availablePuzzleGroups.length > 0 && (
          <HomeRow>
            {availablePuzzleGroups.map((group: Group | MinimalGroup) => (
              <Square
                key={group.uuid}
                color={NonPuzzleColor.GRAY}
                onClick={() => {
                  handleGroupClick(
                    selectedGroup?.uuid === group.uuid ? null : group,
                  );
                }}
                selected={selectedGroup?.uuid === group.uuid}
              />
            ))}
          </HomeRow>
        )}
        {selectedColor && (
          <ScrollWrapper>
            <PanelViewer
              guess={guess}
              puzzles={availableTutorialPuzzles[selectedColor]}
            />
          </ScrollWrapper>
        )}
        {selectedGroup && (
          <ScrollWrapper>
            <GroupViewer
              dispatch={dispatch}
              group={selectedGroup}
              guess={guess}
              selectedPuzzle={selectedPuzzle}
              selectedSubgroup={selectedSubgroup}
            />
          </ScrollWrapper>
        )}
      </Wrapper>
    </>
  );
};

const elem = document.getElementById("jargon-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #jargon-root was nowhere to be found",
  );
}
