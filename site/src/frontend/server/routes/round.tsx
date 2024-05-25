import { type Request } from "express";
import React from "react";
import Layout from "../../components/Layout";
import { ROUND_PAGE_MAP } from "../../rounds";
import { lookupScripts, lookupStylesheets } from "../assets";

export type RoundParams = {
  roundSlug: string;
};
export const roundHandler = (req: Request<RoundParams>) => {
  const teamState = req.teamState;
  if (!teamState) {
    return undefined;
  }
  const { roundSlug } = req.params;
  if (teamState.rounds[roundSlug] === undefined) {
    return undefined;
  }
  const content = ROUND_PAGE_MAP[roundSlug];
  if (content === undefined) {
    return undefined;
  }
  const Component = content.component;
  const scripts = content.entrypoint
    ? lookupScripts(content.entrypoint)
    : undefined;
  const stylesheets = content.entrypoint
    ? lookupStylesheets(content.entrypoint)
    : undefined;

  // TODO: pass props about current unlock state to Component
  return (
    <Layout scripts={scripts} stylesheets={stylesheets} teamState={teamState}>
      <Component teamState={teamState} />
    </Layout>
  );
};
