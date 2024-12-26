import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import { hubState } from "../../hub";
import HubBody from "../../hub/HubBody";

export function hubHandler(req: Request) {
  // The hub page is not the missing diamond round page.
  // For now, just render a page that is the list of available rounds.
  const teamState = req.teamState;
  if (!teamState) {
    return undefined;
  }

  const state = hubState(teamState.state);
  const inlineScript = `window.initialHubState = ${JSON.stringify(state)};`;
  const node = (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="hub-root">
        <HubBody state={state} />
      </div>
    </>
  );

  return wrapContentWithNavBar(
    {
      node,
      entrypoints: ["hub"],
    },
    teamState,
  );
}
