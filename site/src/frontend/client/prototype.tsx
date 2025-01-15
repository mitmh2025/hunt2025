import React from "react";
import { hydrateRoot } from "react-dom/client";
import Games from "../components/minigames/Games";

const minigameElem = document.getElementById("minigame-root");
if (minigameElem) {
  hydrateRoot(minigameElem, <Games />);
} else {
  console.error(
    "Couldn't mount minigames because #minigame-root was nowhere to be found",
  );
}
