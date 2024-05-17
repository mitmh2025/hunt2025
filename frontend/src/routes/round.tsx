import HUNT from "../../puzzledata";
import Layout from "../components/Layout";
import { ROUND_PAGE_MAP } from "../components/rounds";
import { Request } from "express";
import React from "react";

export type RoundParams = {
  roundSlug: string;
};
export const roundHandler = (req: Request<RoundParams>) => {
  const round = HUNT.rounds.filter(
    (round) => round.slug === req.params.roundSlug,
  )[0];
  if (round === undefined) {
    return undefined;
  }
  const content = ROUND_PAGE_MAP[round.key];
  if (content === undefined) {
    return undefined;
  }
  const Component = content.component;
  const scripts = content.scripts;
  const stylesheets = content.stylesheets;

  const teamState = req.teamState!;
  // TODO: pass props about current unlock state to Component
  return (
    <Layout scripts={scripts} stylesheets={stylesheets} teamState={teamState}>
      <Component teamState={teamState} />
    </Layout>
  );
};
