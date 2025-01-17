import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import RadioPlayer from "../../components/RadioPlayer";

export function virtualRadioHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const node = (
    <div id="virtual-radio-root">
      <RadioPlayer whepUrl={teamState.whepUrl} />
    </div>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: "Virtual Radio",
    },
    teamState,
  );
}
