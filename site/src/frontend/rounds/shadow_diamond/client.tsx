import React, { useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { type TeamState } from "../../../../lib/api/client";
import globalDatasetManager from "../../client/DatasetManager";
import ShadowDiamondBody from "./ShadowDiamondBody";
import { type ShadowDiamondState } from "./types";

const ShadowDiamondManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: ShadowDiamondState;
  initialTeamState: TeamState;
}) => {
  const [state, setState] = useState<ShadowDiamondState>(initialState);
  const [teamState, setTeamState] = useState<TeamState>(initialTeamState);

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "shadow_diamond",
      (value: object) => {
        setState(value as ShadowDiamondState);
      },
    );
    return stop;
  }, []);
  useEffect(() => {
    const stop = globalDatasetManager.watch("team_state", (value: object) => {
      setTeamState(value as TeamState);
    });
    return stop;
  }, []);

  return <ShadowDiamondBody state={state} teamState={teamState} />;
};

const elem = document.getElementById("shadow-diamond-root");
if (elem) {
  const state = (
    window as unknown as { initialShadowDiamondState: ShadowDiamondState }
  ).initialShadowDiamondState;
  const teamState = (window as unknown as { initialTeamState: TeamState })
    .initialTeamState;
  hydrateRoot(
    elem,
    <ShadowDiamondManager initialState={state} initialTeamState={teamState} />,
  );
} else {
  console.error(
    "Could not mount ShadowDiamondManager because #shadow-diamond-root was nowhere to be found",
  );
}
