import { type Request } from "express";
import React from "react";
import ActivityLog from "../../components/ActivityLog";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../../components/PageLayout";

export async function activityLogHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const result = await req.api.getActivityLog();
  if (result.status !== 200) {
    throw new Error("Could not get activity log from API");
  }
  const log = result.body;
  const inlineScript = `window.initialActivityLog = ${JSON.stringify(log)}`;

  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Activity Log</PageTitle>
        </PageHeader>
        <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
        <PageMain>
          <div id="activity-log-root">
            <ActivityLog log={log} />
          </div>
        </PageMain>
      </>
    </PageWrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      entrypoints: ["activity_log" as const],
      title: "Activity log",
    },
    teamState,
  );
}
