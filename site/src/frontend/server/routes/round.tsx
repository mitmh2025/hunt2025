import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import { ROUND_PAGE_MAP } from "../../rounds";

export type RoundParams = {
  roundSlug: string;
};
export type RoundQuery = {
  // Only the Illegal Search round currently makes use of query strings, but it
  // seems fine to pass it to other round components that will ignore it.
  node?: string;
};
export const roundHandler = (
  req: Request<RoundParams, unknown, unknown, RoundQuery>,
) => {
  const teamState = req.teamState;
  if (!teamState) {
    return undefined;
  }
  const { roundSlug } = req.params;
  if (
    !["stray_leads", "events"].includes(roundSlug) &&
    teamState.state.rounds[roundSlug] === undefined
  ) {
    return undefined;
  }
  const content = ROUND_PAGE_MAP[roundSlug];
  if (content === undefined) {
    return undefined;
  }
  const Component = content.component;

  return wrapContentWithNavBar(
    {
      node: (
        <Component
          teamState={teamState.state}
          teamInfo={teamState.info}
          node={req.query.node}
        />
      ),
      entrypoints: content.entrypoint ? [content.entrypoint] : undefined,
      title: content.title,
    },
    teamState,
  );
};
