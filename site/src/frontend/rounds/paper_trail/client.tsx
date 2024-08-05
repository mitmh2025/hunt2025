import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { type TeamState } from "../../../../lib/api/client";
import globalDatasetManager from "../../client/DatasetManager";
import PaperTrailBody from "./PaperTrailBody";
import { type PaperTrailState } from "./types";

const PaperTrailManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: PaperTrailState;
  initialTeamState: TeamState;
}) => {
  const [state, setState] = useState<PaperTrailState>(initialState);
  const [teamState, setTeamState] = useState<TeamState>(initialTeamState);

  useEffect(() => {
    const stop = globalDatasetManager.watch("paper_trail", (value: object) => {
      setState(value as PaperTrailState);
    });
    return stop;
  }, []);
  useEffect(() => {
    const stop = globalDatasetManager.watch("team_state", (value: object) => {
      setTeamState(value as TeamState);
    });
    return stop;
  }, []);

  return <PaperTrailBody state={state} teamState={teamState} />;
};

const elem = document.getElementById("paper-trail-root");
if (elem) {
  const state = (
    window as unknown as { initialPaperTrailState: PaperTrailState }
  ).initialPaperTrailState;
  const teamState = (window as unknown as { initialTeamState: TeamState })
    .initialTeamState;
  const root = createRoot(elem);
  root.render(
    <PaperTrailManager initialState={state} initialTeamState={teamState} />,
  );
}
