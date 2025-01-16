import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import { Wrapper } from "../../components/StyledUI";
import TimelineBody from "../../timeline/TimelineBody";
import { generateActivityLogForTimeline } from "../../timeline/index";

export async function timelineHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const result = await req.api.getActivityLog();
  if (result.status !== 200) {
    throw new Error("Could not get activity log from API");
  }
  const log = result.body.flatMap((e) => {
    const mapped = generateActivityLogForTimeline(e);
    return mapped ? [mapped] : [];
  });
  log.sort((e1, e2) => e1.timestamp.valueOf() - e2.timestamp.valueOf());
  const inlineScript = `window.initialTimelineActivityLog = ${JSON.stringify(log)}`;

  const node = (
    <Wrapper>
      <h1>The Timeline</h1>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="timeline-root">
        <TimelineBody log={log} />
      </div>
    </Wrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      entrypoints: ["timeline" as const],
      title: "The Timeline",
    },
    teamState,
  );
}
