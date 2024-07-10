import React from "react";
import { createRoot } from "react-dom/client";
import SearchEngine from "./client/SearchEngine";
import { type Node } from "./types";

const elem = document.getElementById("illegal-search-root");
if (elem) {
  const root = createRoot(elem);
  const initialNode = (window as unknown as { initialNode: Node }).initialNode;
  root.render(<SearchEngine initialNode={initialNode} />);
}
