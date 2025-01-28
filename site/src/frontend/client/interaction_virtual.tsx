import React from "react";
import { hydrateRoot } from "react-dom/client";
import VirtualInteraction from "../components/VirtualInteraction";

const elem = document.getElementById("interaction-root");
if (elem) {
  const match = window.location.pathname.match(/\/interactions\/([A-Za-z_]*)/);
  const slug = match?.[1];
  if (slug) {
    hydrateRoot(elem, <VirtualInteraction slug={slug} />);
  } else {
    console.error("Could not infer interaction slug from URL");
  }
} else {
  console.error(
    "Could not mount InteractionStateLogView because #interaction-root was nowhere to be found",
  );
}
