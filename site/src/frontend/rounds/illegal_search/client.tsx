import React from "react";
import { createRoot } from "react-dom/client";
import SearchEngine from "./client/SearchEngine";

const elem = document.getElementById("illegal-search-root");
if (elem) {
  const root = createRoot(elem);
  // We don't bother with hydrateRoot here because the round demands more
  // interactivity than is viable with just SSR, so we don't even bother
  // rendering SearchEngine serverside.
  root.render(<SearchEngine />);
} else {
  console.error(
    "Could not mount SearchEngine because #illegal-search-root was nowhere to be found",
  );
}
