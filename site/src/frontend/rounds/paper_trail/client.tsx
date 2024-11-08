import React, { useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { type TeamHuntState } from "../../../../lib/api/client";
import globalDatasetManager from "../../client/DatasetManager";
import PaperTrailBody from "./PaperTrailBody";
import { type PaperTrailState } from "./types";

const PaperTrailManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: PaperTrailState;
  initialTeamState: TeamHuntState;
}) => {
  const [state, setState] = useState<PaperTrailState>(initialState);
  const [teamState, setTeamState] = useState<TeamHuntState>(initialTeamState);

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "paper_trail",
      undefined,
      (value: object) => {
        setState(value as PaperTrailState);
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

  return <PaperTrailBody state={state} teamState={teamState} />;
};

const elem = document.getElementById("paper-trail-root");
if (elem) {
  const state = (
    window as unknown as { initialPaperTrailState: PaperTrailState }
  ).initialPaperTrailState;
  const teamState = (window as unknown as { initialTeamState: TeamHuntState })
    .initialTeamState;
  hydrateRoot(
    elem,
    <PaperTrailManager initialState={state} initialTeamState={teamState} />,
  );
} else {
  console.error(
    "Could not mount PaperTrailManager because #paper-trail-root was nowhere to be found",
  );
}
