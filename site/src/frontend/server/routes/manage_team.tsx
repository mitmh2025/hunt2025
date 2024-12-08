import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import { Wrapper } from "../../components/StyledUI";
import TeamManager from "../../components/TeamManager";

export function manageTeamHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const node = (
    <Wrapper>
      <h1>Manage Team</h1>
      <div id="manage-team-root">
        <TeamManager />
      </div>
    </Wrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      entrypoints: ["team" as const],
      title: "Team",
    },
    teamState,
  );
}
