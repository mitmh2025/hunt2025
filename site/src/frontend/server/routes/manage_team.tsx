import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import { Wrapper } from "../../components/StyledUI";
import TeamManager from "../../components/TeamManager";

export async function manageTeamHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const resp = await req.authApi.getRegistration();
  if (resp.status !== 200) {
    console.log(resp);
    throw new Error(
      `Could not retrieve registration data for team ${req.teamState?.teamId}`,
    );
  }
  const registration = resp.body;
  const inlineScript = `window.initialRegistration = ${JSON.stringify(registration)};`;

  const node = (
    <Wrapper>
      <h1>Manage Team</h1>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="manage-team-root">
        <TeamManager registration={registration} />
      </div>
    </Wrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      entrypoints: ["manage_team" as const],
      title: "Team",
    },
    teamState,
  );
}
