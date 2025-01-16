import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import RadioPlayer from "../../components/RadioPlayer";

export function virtualRadioHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;
  const whepUrl = (window as unknown as { whepUrl: string }).whepUrl;

  const node = <RadioPlayer whepUrl={whepUrl} />;

  return wrapContentWithNavBar(
    {
      node,
      title: "Virtual Radio",
    },
    teamState,
  );
}
