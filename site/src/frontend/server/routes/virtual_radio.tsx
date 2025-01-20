import { type Request } from "express";
import React from "react";
import teamIsImmutable from "../../../utils/teamIsImmutable";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import RadioPlayer from "../../components/RadioPlayer";

export function virtualRadioHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const immutable = teamIsImmutable(teamState.info.teamUsername);

  const node = immutable ? (
    <AuthorsNoteBlock style={{ margin: "5em auto", maxWidth: "400px" }}>
      The virtual radio is not currently available for the public access team.
      We are working on archival version of as much of the hunt as possible.
    </AuthorsNoteBlock>
  ) : (
    <div id="virtual-radio-root">
      <RadioPlayer whepUrl={teamState.whepUrl} />
    </div>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: "Virtual Radio",
      entrypoints: ["virtual_radio"],
    },
    teamState,
  );
}
