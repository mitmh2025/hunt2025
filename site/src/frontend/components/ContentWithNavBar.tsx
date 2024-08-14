import React, { type ReactNode } from "react";
import { type TeamState } from "../../../lib/api/client";
import NavBar, { type NavBarState } from "./NavBar";

export function navBarState(teamState: TeamState): NavBarState {
  const teamName = teamState.teamName;
  const rounds = Object.entries(teamState.rounds).map(([slug, roundObj]) => {
    return {
      href: `/rounds/${slug}`,
      title: roundObj.title,
    };
  });
  const currency = teamState.currency;
  return {
    teamName,
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
  const navbarState = navBarState(teamState);
  const navbarStateJSON = JSON.stringify(navbarState);
  const inlineScript = `window.initialNavBarState = ${navbarStateJSON};`;
  return (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />
      <NavBar state={navbarState} />
      {children}
    </>
  );
};

export default ContentWithNavBar;
