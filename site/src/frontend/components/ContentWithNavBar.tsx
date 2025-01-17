import React, { type ReactNode } from "react";
import { type TeamState, type TeamHuntState } from "../../../lib/api/client";
import virtualInteractionState from "../interactions/virtualInteractionState";
import { eventsState } from "../rounds/events";
import { type RenderedPage } from "../utils/renderApp";
import NavBar, { type NavBarState } from "./NavBar";
import Notifications from "./Notifications";

export function navBarState(teamState: TeamHuntState): NavBarState {
  const rounds = Object.entries(teamState.rounds).flatMap(
    ([slug, roundObj]) => {
      if (slug === "endgame") return [];
      return [
        {
          href: `/rounds/${slug}`,
          title: roundObj.title,
        },
      ];
    },
  );
  if (teamState.rounds.missing_diamond?.gates?.includes("hunt_started")) {
    rounds.push({
      href: "/rounds/stray_leads",
      title: "Stray Leads",
    });
  }
  if (teamState.rounds.endgame?.interactions?.the_vault?.state) {
    rounds.push({
      href: "/interactions/the_vault",
      title: "The Vault",
    });
  }

  const { interactions } = virtualInteractionState(teamState);

  return {
    epoch: teamState.epoch,
    rounds,
    currency: teamState.currency,
    strongCurrency: teamState.strong_currency,
    virtualInteractions: interactions,
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
  const initialEventsState = eventsState(teamState.state, {
    username: teamInfo.teamUsername,
  });
  const navbarState = navBarState(teamState.state);
  const navbarStateJSON = JSON.stringify(navbarState);
  const whepUrlJSON = JSON.stringify(teamState.whepUrl);
  const inlineScript = `window.initialTeamInfo = ${JSON.stringify(teamInfo)}; window.initialEventsState = ${JSON.stringify(initialEventsState)}; window.initialNavBarState = ${navbarStateJSON}; window.whepUrl = ${whepUrlJSON}`;
  return (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />
      <div id="navbar">
        <Notifications ref={null} maxNotifications={5} />
        <NavBar
          info={teamState.info}
          state={navbarState}
          eventsState={initialEventsState}
          socketState="connected"
        />
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
