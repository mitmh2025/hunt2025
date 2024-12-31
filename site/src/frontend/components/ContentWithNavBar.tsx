import React, { type ReactNode } from "react";
import { type TeamState, type TeamHuntState } from "../../../lib/api/client";
import { type RenderedPage } from "../utils/renderApp";
import NavBar, { type NavBarState } from "./NavBar";

export function navBarState(teamState: TeamHuntState): NavBarState {
  const rounds = Object.entries(teamState.rounds).map(([slug, roundObj]) => {
    return {
      href: `/rounds/${slug}`,
      title: roundObj.title,
    };
  });
  if (teamState.rounds.the_missing_diamond?.gates?.includes("hunt_started")) {
    rounds.push({
      href: "/rounds/stray_leads",
      title: "Stray Leads",
    });
  }
  const currency = teamState.currency;
  return {
    epoch: teamState.epoch,
    rounds,
    currency,
  };
}

// Server-only component, for embedding initial navbar data and including the navbar in a route
const ContentWithNavBar = ({
  teamState,
  children,
}: {
  teamState: TeamState;
  children: ReactNode;
}) => {
  const teamInfo = teamState.info;
  const navbarState = navBarState(teamState.state);
  const navbarStateJSON = JSON.stringify(navbarState);
  const inlineScript = `window.initialTeamInfo = ${JSON.stringify(teamInfo)}; window.initialNavBarState = ${navbarStateJSON};`;
  return (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />
      <div id="navbar">
        <NavBar info={teamState.info} state={navbarState} />
      </div>
      {children}
    </>
  );
};

export function wrapContentWithNavBar(
  page: RenderedPage,
  teamState: TeamState,
): RenderedPage {
  if (!page) return undefined;
  return {
    ...page,
    node: (
      <ContentWithNavBar teamState={teamState}>{page.node}</ContentWithNavBar>
    ),
    entrypoints: ["navbar", ...(page.entrypoints ?? [])],
  };
}
