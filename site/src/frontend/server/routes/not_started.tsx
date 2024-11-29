import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";

export function huntNotStartedHandler(
  req: Request<unknown, unknown, unknown, unknown>,
) {
  const teamState = req.teamState;
  if (!teamState) {
    return undefined;
  }

  const node = <div>The hunt has not started yet.</div>;
  return wrapContentWithNavBar({ node }, teamState);
}
