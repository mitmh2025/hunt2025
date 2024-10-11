import React, { useCallback, useEffect, useMemo, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import AllPuzzlesList from "../components/AllPuzzlesList";
import globalDatasetManager from "./DatasetManager";
import { type AllPuzzlesState } from "./all_puzzles_types";

const AllPuzzlesManager = ({
  initialState,
}: {
  initialState: AllPuzzlesState;
}) => {
  const [state, setState] = useState<AllPuzzlesState>(initialState);
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

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "all_puzzles",
      undefined,
      (value: object) => {
        setState(value as AllPuzzlesState);
      },
    );
    return stop;
  }, []);

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
      <div>
        Show:
        <label>
          <input
            type="checkbox"
            checked={showUnlockable}
            onChange={toggleShowUnlockable}
          />
          unlockable
        </label>
        <label>
          <input
            type="checkbox"
            checked={showUnlocked}
            onChange={toggleShowUnlocked}
          />
          unlocked
        </label>
        <label>
          <input
            type="checkbox"
            checked={showSolved}
            onChange={toggleShowSolved}
          />
          solved
        </label>
      </div>
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
