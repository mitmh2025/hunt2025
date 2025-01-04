import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import { Wrapper } from "../../components/StyledUI";

export function prototypeHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const inlineScript = `window.initialTeamState = ${JSON.stringify(teamState)};`;

  const node = (
    <Wrapper>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="minigame-root"></div>
    </Wrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      entrypoints: ["prototype" as const],
      title: "Minigame",
    },
    teamState,
  );
}
