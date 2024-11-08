import React, { useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { type TeamHuntState } from "../../../../lib/api/client";
import globalDatasetManager from "../../client/DatasetManager";
import MissingDiamondBody from "./MissingDiamondBody";
import { type MissingDiamondState } from "./types";

const MissingDiamondManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: MissingDiamondState;
  initialTeamState: TeamHuntState;
}) => {
  const [state, setState] = useState<MissingDiamondState>(initialState);
  const [teamState, setTeamState] = useState<TeamHuntState>(initialTeamState);

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "the_missing_diamond",
      undefined,
      (value: object) => {
        setState(value as MissingDiamondState);
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

  return <MissingDiamondBody state={state} teamState={teamState} />;
};

const elem = document.getElementById("missing-diamond-root");
if (elem) {
  const state = (
    window as unknown as { initialMissingDiamondState: MissingDiamondState }
  ).initialMissingDiamondState;
  const teamState = (window as unknown as { initialTeamState: TeamHuntState })
    .initialTeamState;
  hydrateRoot(
    elem,
    <MissingDiamondManager initialState={state} initialTeamState={teamState} />,
  );
} else {
  console.error(
    "Could not mount MissingDiamondManager because #missing-diamond-root was nowhere to be found",
  );
}
