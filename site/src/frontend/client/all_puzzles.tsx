import React from "react";
import { hydrateRoot } from "react-dom/client";
import AllPuzzlesList from "../components/AllPuzzlesList";
import { type AllPuzzlesState } from "./all_puzzles_types";
import useDataset from "./useDataset";

const AllPuzzlesManager = ({
  initialState,
}: {
  initialState: AllPuzzlesState;
}) => {
  const state = useDataset("all_puzzles", undefined, initialState);

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
