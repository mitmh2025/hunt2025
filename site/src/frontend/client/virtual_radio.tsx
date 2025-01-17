import React from "react";
import { hydrateRoot } from "react-dom/client";
import RadioPlayer from "../components/RadioPlayer";

const VirtualRadioManager = ({ whepUrl }: { whepUrl: string }) => {
  return <RadioPlayer whepUrl={whepUrl} />;
};

const radioElem = document.getElementById("virtual-radio-root");
if (radioElem) {
  const whepUrl = (window as unknown as { whepUrl: string }).whepUrl;
  hydrateRoot(radioElem, <VirtualRadioManager whepUrl={whepUrl} />);
} else {
  console.error(
    "Couldn't mount AllPuzzlesManager because #virtual-radio-root was nowhere to be found",
  );
}
