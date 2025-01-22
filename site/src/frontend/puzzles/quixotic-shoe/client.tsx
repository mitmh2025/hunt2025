import React from "react";
import { createRoot } from "react-dom/client";
import { PuzzlingWordFromOurSponsors } from "./PuzzlingWordFromOurSponsors";

const elem = document.getElementById(
  "and-now-a-puzzling-word-from-our-sponsors-root",
);
if (elem) {
  const root = createRoot(elem);
  root.render(<PuzzlingWordFromOurSponsors />);
} else {
  console.error(
    "Could not mount App because #and-now-a-puzzling-word-from-our-sponsors-root was nowhere to be found",
  );
}
