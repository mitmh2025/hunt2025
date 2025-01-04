import { Box } from "@mui/material";
import { useMemo, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useOpsData } from "../OpsDataProvider";
import BigBoardTeamDetail from "../components/BigBoardTeamDetail";
import SingleTeamStats from "../components/SingleTeamStats";
import TeamActivityLog from "../components/TeamActivityLog";
import TeamGateList from "../components/TeamGateList";
import TeamOverview from "../components/TeamOverview";
import TeamPuzzleList, {
  type TeamPuzzleListHandle,
} from "../components/TeamPuzzleList";
import { formatTeamData } from "../opsdata/bigBoard";

export default function Team() {
  const opsData = useOpsData();
  const username = useParams().username ?? "";

  const team = useMemo(
    () => opsData.teams.find((team) => team.username === username),
    [opsData, username],
  );

  const teamActivity = useMemo(
    () => opsData.activityLog.filter((entry) => entry.team_id === team?.teamId),
    [opsData, team],
  );

  const bigBoardTeam = useMemo(
    () => team && formatTeamData(team, opsData.puzzleMetadata),
    [team, opsData.puzzleMetadata],
  );

  const puzzleListRef = useRef<TeamPuzzleListHandle | null>(null);

  if (!username) {
    return <p>No team ID</p>;
  }

  if (!team) {
    return <p>Team not found</p>;
  }

  if (!bigBoardTeam) {
    return <p>Team not found</p>;
  }

  return (
    <>
      <p>
        <Link to="/teams">&laquo; Teams</Link>
      </p>
      <h1>
        {team.deactivated && `[DEACTIVATED] `}
        {team.username} ({team.name})
      </h1>

      <SingleTeamStats
        team={team}
        teamActivity={teamActivity}
        bigBoardTeam={bigBoardTeam}
      />

      <BigBoardTeamDetail
        team={bigBoardTeam}
        onClickPuzzle={(p) => {
          if (puzzleListRef.current) {
            puzzleListRef.current.filterToPuzzle(p.title);
          }
        }}
      />

      <Box sx={{ mt: 6 }}>
        <h2>Puzzles</h2>
        <TeamPuzzleList
          ref={puzzleListRef}
          activity={teamActivity}
          bigBoardTeam={bigBoardTeam}
        />
      </Box>

      <Box sx={{ mt: 6 }}>
        <h2>Team Overview</h2>
        <TeamOverview team={team} />
      </Box>

      {/* TODO: hints, maybe linking to Zammad tickets? */}

      <Box sx={{ mt: 6 }}>
        <h2>Activity</h2>
        <TeamActivityLog activity={teamActivity} />
      </Box>

      <Box sx={{ mt: 6 }}>
        <h2>Gates</h2>
        <TeamGateList team={team} />
      </Box>
    </>
  );
}
