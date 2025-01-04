import {
  Box,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNotifications } from "@toolpad/core";
import { useState } from "react";
import { useOpsData } from "../OpsDataProvider";

export default function EmailTeams() {
  const [submitting, setSubmitting] = useState(false);
  const [wholeTeam, setWholeTeam] = useState(false);
  const [templateAlias, setTemplateAlias] = useState("");
  const { adminClient } = useOpsData();
  const notifications = useNotifications();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (templateAlias) {
      setSubmitting(true);
      adminClient
        .sendTeamEmail({
          body: {
            templateAlias,
            wholeTeam,
            dryRun: false,
          },
        })
        .then((result) => {
          if (result.status !== 200) {
            throw new Error(`HTTP ${result.status}: ${result.body}`);
          }

          notifications.show(
            `Email sent to ${wholeTeam ? "all teams" : "primary & secondary contacts"}`,
            {
              severity: "success",
              autoHideDuration: 3000,
            },
          );

          setTemplateAlias("");
          setWholeTeam(false);
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to send email: ${msg}`, {
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
    <Box>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            name="templateAlias"
            label="Template Alias"
            value={templateAlias}
            onChange={(e) => {
              setTemplateAlias(e.target.value);
            }}
            sx={{ mb: 2 }}
            required
          />

          <FormControl fullWidth>
            <InputLabel id="recipients-label">Recipients</InputLabel>
            <Select
              label="Recipients"
              labelId="recipients-label"
              value={wholeTeam ? "true" : "false"}
              onChange={(e) => {
                setWholeTeam(e.target.value === "true");
              }}
            >
              <MenuItem value="false">Primary & Secondary Contacts</MenuItem>
              <MenuItem value="true">All Team Members</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit" disabled={submitting}>
            {wholeTeam
              ? "Email All Team Members"
              : "Email Primary & Secondary Contacts"}
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
}
