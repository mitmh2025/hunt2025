import React from "react";
import { hydrateRoot } from "react-dom/client";
import MinigamesHub from "../components/minigames/MinigamesHub";

const minigamesElem = document.getElementById("minigames-root");
if (minigamesElem) {
  hydrateRoot(minigamesElem, <MinigamesHub />);
} else {
  console.error(
    "Couldn't mount Minigames because #minigames-root was nowhere to be found",
  );
}
