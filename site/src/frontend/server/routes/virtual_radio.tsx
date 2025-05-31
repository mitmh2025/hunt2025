import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import ArchiveRadioPlayer from "../../components/ArchiveRadioPlayer";

export function virtualRadioHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const node = (
    <div id="virtual-radio-root">
      <ArchiveRadioPlayer />
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
