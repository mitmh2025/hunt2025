import React from "react";
import { createRoot } from "react-dom/client";
import { type TeamState } from "../../../../lib/api/client";
import SearchEngine from "./client/SearchEngine";
import { type Node } from "./types";

const elem = document.getElementById("illegal-search-root");
if (elem) {
  const root = createRoot(elem);
  const initialNode = (window as unknown as { initialNode: Node }).initialNode;
  const initialTeamState = (
    window as unknown as { initialTeamState: TeamState }
  ).initialTeamState;
  root.render(
    <SearchEngine
      initialNode={initialNode}
      initialTeamState={initialTeamState}
    />,
  );
}
