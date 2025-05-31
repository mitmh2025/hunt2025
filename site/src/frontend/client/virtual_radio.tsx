import React from "react";
import ArchiveRadioPlayer from "../components/ArchiveRadioPlayer";
import renderRoot from "../../utils/renderRoot";

const VirtualRadioManager = () => {
  return <ArchiveRadioPlayer />;
};

const radioElem = document.getElementById("virtual-radio-root");
if (radioElem) {
  renderRoot(radioElem, <VirtualRadioManager />);
} else {
  console.error(
    "Couldn't mount AllPuzzlesManager because #virtual-radio-root was nowhere to be found",
  );
}
