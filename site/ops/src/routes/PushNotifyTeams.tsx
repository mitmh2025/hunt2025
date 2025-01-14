import { Box, Button, TextField } from "@mui/material";
import { useNotifications } from "@toolpad/core";
import React, { useState } from "react";
import { useOpsClients } from "../OpsDataProvider";

export default function PushNotifyTeams(): JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const [textValue, setTextValue] = useState("");
  const { adminClient } = useOpsClients();
  const notifications = useNotifications();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (textValue) {
      setSubmitting(true);
      adminClient
        .sendPushNotification({
          body: {
            message: textValue,
          },
        })
        .then((result) => {
          if (result.status !== 200) {
            throw new Error(`HTTP ${result.status}: ${result.body}`);
          }

          notifications.show("Push notification sent to all teams", {
            severity: "success",
            autoHideDuration: 3000,
          });

          setTextValue("");
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to send push notification: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  }

  return (
    <>
      <p>
        Send a push notification to all members of all teams who are logged in
        to the Hunt site. The notification will contain exactly the text you
        enter below, so be precise.
      </p>
      <Box sx={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="notificationText"
            label="Notification Text"
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
            }}
            sx={{ mb: 2 }}
            required
          />
          <Button
            variant="contained"
            type="submit"
            disabled={!textValue || submitting}
            sx={{ mt: 2 }}
          >
            Send push notification to all teams
          </Button>
        </form>
      </Box>
    </>
  );
}
