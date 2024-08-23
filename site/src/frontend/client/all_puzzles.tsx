import React, { useEffect, useState } from "react";
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

  return <AllPuzzlesList state={state} />;
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
