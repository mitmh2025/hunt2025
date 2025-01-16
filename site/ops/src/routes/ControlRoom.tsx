import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
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

  const teamNamesById = useMemo(() => {
    return opsData.teams
      .filter((team) => !team.deactivated)
      .reduce<Record<number, string>>((acc, { teamId, name }) => {
        acc[teamId] = name;
        return acc;
      }, {});
  }, [opsData.teams]);

  const solvedTeamIds = useMemo(() => {
    const solvedEntries = opsData.activityLog.filter(
      (entry) =>
        "slug" in entry &&
        entry.slug === "control_room" &&
        entry.type === "puzzle_solved",
    );
    return new Set(solvedEntries.map(({ team_id }) => team_id));
  }, [opsData.activityLog]);

  const plumpHimalayasSchedule = useMemo(() => {
    const ids = new Set<number>();
    const teamIds = new Set<number>();
    const schedule: {
      id: number;
      team_id: number;
      name: string;
      room: string;
      time: Date;
    }[] = [];
    for (const entry of opsData.plumpHimalayasLog.slice().reverse()) {
      const { id, team_id, data } = entry;
      // We get duplicate entries here sometimes
      if (
        !ids.has(id) &&
        !teamIds.has(team_id) &&
        !solvedTeamIds.has(team_id)
      ) {
        ids.add(id);
        teamIds.add(team_id);
        const room = data.room as string;
        const timestamp = data.time as string;
        schedule.push({
          id,
          team_id,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know the team data is here
          name: teamNamesById[team_id]!,
          room,
          time: new Date(Date.parse(timestamp)),
        });
      }
    }
    return schedule.sort((entry1, entry2) => {
      return entry1.time.valueOf() - entry2.time.valueOf();
    });
  }, [opsData.plumpHimalayasLog, solvedTeamIds, teamNamesById]);

  function handleSchedule() {
    setSubmitting(true);
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
            `${teamNamesById[teamId]!} scheduled for ${room} at ${time.format("dddd, MMMM DD,  hh:mm A Z")}`,
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
        N.B.: Once a team is scheduled, they cannot be de-scheduled, but that
        schedule can be overwritten.
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
            {Object.entries(teamNamesById).map(([teamId, name]) => (
              <MenuItem key={teamId} value={parseInt(teamId, 10)}>
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
      <hr />
      <h2>Outstanding Schedule</h2>
      <p>
        This displays all teams that have been scheduled but have not yet
        submitted a correct answer to the puzzle.
      </p>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Team ID</TableCell>
            <TableCell>Team Name</TableCell>
            <TableCell>Room</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plumpHimalayasSchedule.map(({ id, team_id, room, time }) => (
            <TableRow key={id}>
              <TableCell>{team_id}</TableCell>
              <TableCell>{teamNamesById[team_id]}</TableCell>
              <TableCell>{room}</TableCell>
              <TableCell>{time.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
