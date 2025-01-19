import { type Request } from "express";
import React from "react";
import teamIsImmutable from "../../../utils/teamIsImmutable";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../../components/PageLayout";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
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

  const immutable =
    !!req.teamState && teamIsImmutable(req.teamState.info.teamUsername);

  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Manage Team</PageTitle>
        </PageHeader>
        <PageMain>
          <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
          {immutable ? (
            <AuthorsNoteBlock style={{ margin: "5em auto", maxWidth: "400px" }}>
              The Manage Team page is not currently available for the public
              access team. We are working on archival version of as much of the
              hunt as possible.
            </AuthorsNoteBlock>
          ) : (
            <div id="manage-team-root">
              <TeamManager registration={registration} />
            </div>
          )}
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
