import React, { useCallback, useMemo, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { styled } from "styled-components";
import AllPuzzlesList from "../components/AllPuzzlesList";
import { PuzzleIcon } from "../components/PuzzleLink";
import { type AllPuzzlesState } from "./all_puzzles_types";
import useDataset from "./useDataset";

const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--gray-300);

    &:hover {
      color: var(--gray-200);
    }

    &.selected {
      color: var(--gray-100);
    }

    &.selected:hover {
      color: var(--true-white);
    }
  }

  .puzzle-link-status-icon {
    margin-right: 0.125rem;
  }
`;

const AllPuzzlesManager = ({
  initialState,
}: {
  initialState: AllPuzzlesState;
}) => {
  const [showUnlockable, setShowUnlockable] = useState<boolean>(true);
  const [showUnlocked, setShowUnlocked] = useState<boolean>(true);
  const [showSolved, setShowSolved] = useState<boolean>(true);

  const toggleShowUnlockable = useCallback(() => {
    setShowUnlockable((prevState) => !prevState);
  }, []);
  const toggleShowUnlocked = useCallback(() => {
    setShowUnlocked((prevState) => !prevState);
  }, []);
  const toggleShowSolved = useCallback(() => {
    setShowSolved((prevState) => !prevState);
  }, []);

  const state = useDataset("all_puzzles", undefined, initialState);

  const filteredState = useMemo(() => {
    const rounds = state.rounds.flatMap((round) => {
      const filteredPuzzles = round.puzzles.filter((p) => {
        if (p.answer !== undefined) {
          return showSolved;
        }
        if (p.state === "unlocked") {
          return showUnlocked;
        }
        if (p.state === "unlockable") {
          return showUnlockable;
        }
        return true;
      });
      return {
        ...round,
        puzzles: filteredPuzzles,
      };
    });
    return {
      ...state,
      rounds,
    };
  }, [state, showUnlockable, showUnlocked, showSolved]);

  return (
    <>
      <Filters>
        <h4>Show:</h4>
        <label className={`${showUnlockable && "selected"}`}>
          <input
            type="checkbox"
            checked={showUnlockable}
            onChange={toggleShowUnlockable}
          />
          <PuzzleIcon lockState="unlockable" size={24} />
          unlockable
        </label>
        <label className={`${showUnlocked && "selected"}`}>
          <input
            type="checkbox"
            checked={showUnlocked}
            onChange={toggleShowUnlocked}
          />
          <PuzzleIcon lockState="unlocked" size={24} />
          unlocked
        </label>
        <label className={`${showSolved && "selected"}`}>
          <input
            type="checkbox"
            checked={showSolved}
            onChange={toggleShowSolved}
          />
          <PuzzleIcon lockState="unlocked" answer="dummy" size={24} />
          solved
        </label>
      </Filters>
      <AllPuzzlesList state={filteredState} />
    </>
  );
};

const allPuzzlesElem = document.getElementById("all-puzzles-root");
if (allPuzzlesElem) {
  const initialAllPuzzlesState = (
    window as unknown as { initialAllPuzzlesState: AllPuzzlesState }
  ).initialAllPuzzlesState;
  hydrateRoot(
    allPuzzlesElem,
    <AllPuzzlesManager initialState={initialAllPuzzlesState} />,
  );
} else {
  console.error(
    "Couldn't mount AllPuzzlesManager because #all-puzzles-root was nowhere to be found",
  );
}
