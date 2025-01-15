import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNotifications } from "@toolpad/core";
import type { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { useOpsData, useOpsClients } from "../OpsDataProvider";

export default function ControlRoom() {
  const [teamId, setTeamId] = useState<number | undefined>(undefined);
  const [room, setRoom] = useState<string>("10-401");
  const [time, setTime] = useState<Dayjs | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { adminClient } = useOpsClients();
  const notifications = useNotifications();
  const opsData = useOpsData();

  const teamNamesAndIds = useMemo(() => {
    return opsData.teams
      .filter((team) => !team.deactivated)
      .map(({ teamId, name }) => ({
        teamId,
        name,
      }));
  }, [opsData]);

  function handleSchedule() {
    setSubmitting(true);
    const teamNameAndId = teamNamesAndIds.find(
      (nameAndId) => nameAndId.teamId === teamId,
    );
    if (teamId && time) {
      adminClient
        .scheduleControlRoom({
          params: {
            teamId: `${teamId}`,
          },
          body: {
            room,
            time: time.toISOString(),
          },
        })
        .then((result) => {
          if (result.status !== 200) {
            throw new Error(`HTTP ${result.status}: ${result.body}`);
          }

          notifications.show(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know the team data is here
            `${teamNameAndId!.name} scheduled for ${room} at ${time.format("dddd, MMMM DD,  hh:mm A Z")}`,
            { severity: "success", autoHideDuration: 3000 },
          );

          setTeamId(undefined);
          setTime(null);
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to schedule team: ${msg}`, {
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
      <p>
        N.B.: This is a fire-and-forget interface. It pushes scheduling
        information for teams and all records of that schedule disappear from
        the ops site forever.{" "}
        <strong>Please keep separate paper records.</strong>
      </p>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <InputLabel id="team-select">Team Name</InputLabel>
          <Select
            displayEmpty
            disabled={submitting}
            value={teamId}
            labelId="team-select"
            label="Team Name"
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                setTeamId(
                  typeof value === "string" ? parseInt(value, 10) : value,
                );
              }
            }}
          >
            <MenuItem disabled value={undefined}>
              <i>Select team</i>
            </MenuItem>
            {teamNamesAndIds.map(({ teamId, name }) => (
              <MenuItem key={teamId} value={teamId}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <InputLabel id="room-select">Room</InputLabel>
          <Select
            disabled={submitting}
            value={room}
            labelId="room-select"
            label="Room"
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                setRoom(value);
              }
            }}
          >
            <MenuItem value={"10-401"}>10-401</MenuItem>
            <MenuItem value={"10-481"}>10-481</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <InputLabel id="time-select">Time</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              disabled={submitting}
              label="Time"
              value={time}
              onChange={(value) => {
                setTime(value);
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Button
        disabled={time === null || teamId === undefined || submitting}
        onClick={handleSchedule}
      >
        Schedule Team
      </Button>
    </Box>
  );
}
