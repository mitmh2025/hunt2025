import React from "react";
import { hydrateRoot } from "react-dom/client";
import TeamManager from "../components/TeamManager";

const ManageTeam = () => {
  return <TeamManager />;
};

const manageTeamElem = document.getElementById("manage-team-root");
if (manageTeamElem) {
  hydrateRoot(manageTeamElem, <ManageTeam />);
} else {
  console.error(
    "Couldn't mount Manage Team because #manage-team-root was nowhere to be found",
  );
}
