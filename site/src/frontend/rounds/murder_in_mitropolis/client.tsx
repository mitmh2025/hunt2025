import React from "react";
import { hydrateRoot } from "react-dom/client";
import { type TeamHuntState } from "../../../../lib/api/client";
import useDataset from "../../client/useDataset";
import MurderBody from "./MurderBody";
import { type MurderState } from "./types";

const MurderManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: MurderState;
  initialTeamState: TeamHuntState;
}) => {
  const state = useDataset("murder_in_mitropolis", undefined, initialState);
  const teamState = useDataset("team_state", undefined, initialTeamState);

  return <MurderBody state={state} teamState={teamState} />;
};

const elem = document.getElementById("murder-in-mitropolis-root");
if (elem) {
  const state = (window as unknown as { initialMurderState: MurderState })
    .initialMurderState;
  const teamState = (window as unknown as { initialTeamState: TeamHuntState })
    .initialTeamState;
  hydrateRoot(
    elem,
    <MurderManager initialState={state} initialTeamState={teamState} />,
  );
} else {
  console.error(
    "Could not mount MurderManager because #murder-in-mitropolis-root was nowhere to be found",
  );
}
