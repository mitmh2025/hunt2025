import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../../components/PageLayout";
import MinigamesHub from "../../components/minigames/MinigamesHub";

export function minigamesHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Minigames Archive</PageTitle>
        </PageHeader>
        <PageMain>
          <div id="minigames-root">
            <MinigamesHub />
          </div>
        </PageMain>
      </>
    </PageWrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      entrypoints: ["minigames" as const],
      title: "Minigames Archive",
    },
    teamState,
  );
}
