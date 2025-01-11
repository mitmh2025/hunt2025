import { Button, Typography } from "@mui/material";
import { useDialogs, useNotifications } from "@toolpad/core";
import React from "react";
import { useOpsClients } from "../OpsDataProvider";
import { type TeamData } from "../opsdata/types";
import { AdminOnly } from "./AdminOnly";

// Team HQ location + how to access
// primary/secondary contacts
// Team-wide email
// Maybe: a way to email the team? Or the primary/secondary contacts?
// Team goal
// Team values

export default function TeamOverview({ team }: { team: TeamData }) {
  const dialogs = useDialogs();
  const notifications = useNotifications();
  const { adminClient, appendRegistrationLogEntries } = useOpsClients();

  function handleDeactivate() {
    dialogs
      .confirm(
        <>
          <p>Are you sure you want to deactivate this team?</p>
          <p>
            Hunters will not be able to access the hunt website at all while
            their team is deactivated. We will also shut down their radio
            stream, and exclude them from all-team announcements.
          </p>
          <p>
            The team will no longer show up on the Big Board or team list, but
            you can navigate to this page directly to reactivate them.
          </p>
        </>,
        {
          okText: "Deactivate Team",
          cancelText: "Cancel",
          severity: "error",
          title: `Deactivate ${team.username} (${team.name})`,
          onClose: async (result) => {
            if (!result) {
              return;
            }

            try {
              const result = await adminClient.deactivateTeam({
                params: {
                  teamId: String(team.teamId),
                },
              });

              if (result.status !== 200) {
                throw new Error(`HTTP ${result.status}: ${result.body}`);
              }

              appendRegistrationLogEntries(result.body);

              notifications.show(`Deactivated team`, {
                severity: "success",
                autoHideDuration: 3000,
              });
            } catch (e: unknown) {
              console.error(e);
              const msg = e instanceof Error ? e.message : "Unknown error";
              notifications.show(`Failed to deactivate team: ${msg}`, {
                severity: "error",
                autoHideDuration: 3000,
              });
            }
          },
        },
      )
      .catch((e: unknown) => {
        console.error(e);
      });
  }

  function handleReactivate() {
    dialogs
      .confirm(
        <>
          <p>Are you sure you want to Reactivate this team?</p>
        </>,
        {
          okText: "Reactivate Team",
          cancelText: "Cancel",
          severity: "success",
          title: `Reactivate ${team.username} (${team.name})`,
          onClose: async (result) => {
            if (!result) {
              return;
            }

            try {
              const result = await adminClient.reactivateTeam({
                params: {
                  teamId: String(team.teamId),
                },
              });

              if (result.status !== 200) {
                throw new Error(`HTTP ${result.status}: ${result.body}`);
              }

              appendRegistrationLogEntries(result.body);

              notifications.show(`Reactivated team`, {
                severity: "success",
                autoHideDuration: 3000,
              });
            } catch (e: unknown) {
              console.error(e);
              const msg = e instanceof Error ? e.message : "Unknown error";
              notifications.show(`Failed to reactivate team: ${msg}`, {
                severity: "error",
                autoHideDuration: 3000,
              });
            }
          },
        },
      )
      .catch((e: unknown) => {
        console.error(e);
      });
  }

  function handleChangePassword() {
    function handleCopy(evt: React.MouseEvent) {
      evt.preventDefault();

      navigator.clipboard
        .writeText(team.registration.password)
        .then(() => {
          notifications.show("Password copied to clipboard", {
            severity: "info",
            autoHideDuration: 3000,
          });
        })
        .catch((e: unknown) => {
          console.error(e);
          notifications.show("Failed to copy password to clipboard", {
            severity: "error",
            autoHideDuration: 3000,
          });
        });
    }

    dialogs
      .prompt(
        <>
          Current password:{" "}
          <Typography display="inline" fontFamily="monospace">
            {team.registration.password}
          </Typography>{" "}
          <button type="button" onClick={handleCopy}>
            📋
          </button>{" "}
        </>,
        {
          okText: "Change Password",
          cancelText: "Cancel",
          title: `Change Password for ${team.username} (${team.name})`,
          onClose: async (newPassword) => {
            if (!newPassword) {
              return;
            }

            try {
              const result = await adminClient.changeTeamPassword({
                params: {
                  teamId: String(team.teamId),
                },
                body: {
                  newPassword: newPassword,
                },
              });

              if (result.status !== 200) {
                throw new Error(`HTTP ${result.status}: ${result.body}`);
              }

              appendRegistrationLogEntries(result.body);

              notifications.show(`Changed team password`, {
                severity: "success",
                autoHideDuration: 3000,
              });
            } catch (e: unknown) {
              console.error(e);
              const msg = e instanceof Error ? e.message : "Unknown error";
              notifications.show(`Failed to change team password: ${msg}`, {
                severity: "error",
                autoHideDuration: 3000,
              });
            }
          },
        },
      )
      .catch((e: unknown) => {
        console.error(e);
      });
  }

  return (
    <div>
      <p>
        Location:{" "}
        <>
          {team.registration.teamLocation === "Fully Remote" && (
            <>
              Fully Remote. Contact details:{" "}
              {team.registration.teamLocationDetailsRemote}
            </>
          )}
          {team.registration.teamLocation === "Room Not Required" && (
            <>
              Arranged their own space. Access details:{" "}
              {team.registration.teamLocationDetailsNoRoomRequested}
            </>
          )}
          {team.registration.teamLocation === "Room Requested" && (
            <>
              Requested a room.
              {/* TODO: add room assignment */}
            </>
          )}
        </>
      </p>
      <p>
        Primary Contact:{" "}
        <a
          href={`mailto:${team.registration.contactEmail}?cc=info@mitmh2025.com`}
        >
          {team.registration.contactName}
        </a>{" "}
        (
        <a href={`tel:${team.registration.contactPhone}`}>
          {team.registration.contactPhone}
        </a>
        )
      </p>
      <p>
        Secondary Contact:{" "}
        <a
          href={`mailto:${team.registration.secondaryContactEmail}?cc=info@mitmh2025.com`}
        >
          {team.registration.secondaryContactName}
        </a>{" "}
        (
        <a href={`tel:${team.registration.secondaryContactPhone}`}>
          {team.registration.secondaryContactPhone}
        </a>
        )
      </p>
      <p>
        <a
          href={`mailto:${team.registration.contactEmail},${team.registration.secondaryContactEmail}?cc=info@mitmh2025.com`}
        >
          Email both contacts
        </a>
      </p>
      <p>
        <a
          href={`mailto:${team.registration.teamEmail},${team.registration.contactEmail},${team.registration.secondaryContactEmail}?cc=info@mitmh2025.com`}
        >
          Email team and both contacts
        </a>
      </p>
      <p>
        Team-wide email:{" "}
        <a href={`mailto:${team.registration.teamEmail}?cc=info@mitmh2025.com`}>
          {team.registration.teamEmail}
        </a>
      </p>
      <p>Team Goal: {team.registration.teamGoal}</p>
      <p>
        Team Values: {team.registration.teamValues.join(", ")}{" "}
        {team.registration.teamValuesOther
          ? `, ${team.registration.teamValuesOther}`
          : null}
      </p>
      <AdminOnly>
        <p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
            sx={{ mr: 2 }}
          >
            View / Change Password
          </Button>

          {team.deactivated ? (
            <Button
              variant="contained"
              color="warning"
              onClick={handleReactivate}
            >
              Reactivate Team
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeactivate}
            >
              Deactivate Team
            </Button>
          )}
        </p>
      </AdminOnly>
    </div>
  );
}
