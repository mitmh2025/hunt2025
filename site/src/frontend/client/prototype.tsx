import React from "react";
import { hydrateRoot } from "react-dom/client";
import BalloonPop from "../components/BalloonPop";

const minigameElem = document.getElementById("minigame-root");
if (minigameElem) {
  hydrateRoot(minigameElem, <BalloonPop />);
} else {
  console.error(
    "Couldn't mount minigame because #minigame-root was nowhere to be found",
  );
}
