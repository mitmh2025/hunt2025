import HUNT from "../../puzzledata";
import Layout from "../components/Layout";
import { ROUND_PAGE_MAP } from "../components/rounds";
import { Request } from "express";
import React from "react";

export const roundHandler = (req: Request) => {
  const round = HUNT.rounds.filter(
    (round) => round.slug === req.params.roundSlug,
  )[0];
  if (round === undefined) {
    return undefined;
  }
  const Component = ROUND_PAGE_MAP[round.key];
  if (Component === undefined) {
    return undefined;
  }

  // TODO: pass props about current unlock state to Component
  return (
    <Layout teamState={req.teamState}>
      <Component />
    </Layout>
  );
};
