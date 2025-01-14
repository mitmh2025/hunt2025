import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import TeamManager from "../../components/TeamManager";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../../components/PageLayout";

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
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Manage Team</PageTitle>
        </PageHeader>
        <PageMain>
          <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
          <div id="manage-team-root">
            <TeamManager registration={registration} />
          </div>
        </PageMain>
      </>
    </PageWrapper>
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
