import React, { useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { type TeamHuntState } from "../../../../lib/api/client";
import globalDatasetManager from "../../client/DatasetManager";
import MurderBody from "./MurderBody";
import { type MurderState } from "./types";

const MurderManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: MurderState;
  initialTeamState: TeamHuntState;
}) => {
  const [state, setState] = useState<MurderState>(initialState);
  const [teamState, setTeamState] = useState<TeamHuntState>(initialTeamState);

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "murder_in_mitropolis",
      undefined,
      (value: object) => {
        setState(value as MurderState);
      },
    );
    return stop;
  }, []);
  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "team_state",
      undefined,
      (value: object) => {
        setTeamState(value as TeamHuntState);
      },
    );
    return stop;
  }, []);

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
