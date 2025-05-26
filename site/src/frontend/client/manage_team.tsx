import React from "react";
import { type TeamRegistrationState } from "../../../lib/api/contract";
import renderRoot from "../../utils/renderRoot";
import TeamManager from "../components/TeamManager";
import useDataset from "./useDataset";

const ManageTeam = ({
  initialRegistration,
}: {
  initialRegistration: TeamRegistrationState;
}) => {
  const registration = useDataset(
    "team_registration",
    undefined,
    initialRegistration,
  );
  return <TeamManager registration={registration} />;
};

const manageTeamElem = document.getElementById("manage-team-root");
if (manageTeamElem) {
  const initialRegistration = (
    window as unknown as { initialRegistration: TeamRegistrationState }
  ).initialRegistration;
  renderRoot(
    manageTeamElem,
    <ManageTeam initialRegistration={initialRegistration} />,
  );
} else {
  console.error(
    "Couldn't mount Manage Team because #manage-team-root was nowhere to be found",
  );
}
