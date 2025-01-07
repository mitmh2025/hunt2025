import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import { Wrapper } from "../../components/StyledUI";
import Characters from "../../components/Characters";

export async function charactersHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const node = (
    <Wrapper>
      <Characters />
    </Wrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      entrypoints: ["characters" as const],
      title: "Characters",
    },
    teamState,
  );
}
