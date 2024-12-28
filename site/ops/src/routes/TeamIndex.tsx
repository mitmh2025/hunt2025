import {
  createMRTColumnHelper,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Cell,
} from "material-react-table";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useOpsData } from "../OpsDataProvider";
import { formatTeamData } from "../opsdata/bigBoard";

type TeamIndexData = {
  name: string;
  username: string;
  teamSize: number;
  onCampusSize: number;
  progress: number;
  puzzlesSolved: number;
  puzzlesSolvedLast3Hours: number;
  hintsRequested: number;
};

export default function TeamIndex() {
  const opsData = useOpsData();
  const indexData = useMemo(() => {
    const record: Record<number, TeamIndexData> = {};
    for (const team of opsData.teams) {
      const bigBoardTeam = formatTeamData(team, opsData.puzzleMetadata);
      record[team.teamId] = {
        name: team.name,
        username: team.username,
        teamSize: team.registration.peopleTotal,
        onCampusSize: team.registration.peopleOnCampus,
        progress: bigBoardTeam.progress,
        puzzlesSolved: team.state.puzzles_solved.size,
        puzzlesSolvedLast3Hours: 0, // computed below
        hintsRequested: 0, // computed below
      };
    }

    opsData.activityLog.forEach((entry) => {
      if (
        entry.type === "puzzle_solved" &&
        entry.timestamp.getTime() > Date.now() - 3 * 60 * 60 * 1000 &&
        entry.team_id
      ) {
        const team = record[entry.team_id];
        if (team) {
          team.puzzlesSolvedLast3Hours += 1;
        }
      }

      // TODO: hintsRequested
    });

    return Object.values(record);
  }, [opsData]);

  const columns = useMemo(() => {
    const columnHelper = createMRTColumnHelper<TeamIndexData>();

    return [
      columnHelper.accessor(
        (row) => ({
          username: row.username,
          name: row.name,
        }),
        {
          id: "username",
          header: "Username",
          Cell: ({
            cell,
          }: {
            cell: MRT_Cell<
              TeamIndexData,
              {
                username: string;
                name: string;
              }
            >;
          }) => (
            <>
              <Link to={`/teams/${cell.getValue().username}`}>
                {cell.getValue().username}
              </Link>
              <br />
              <span style={{ fontSize: "12px" }}>{cell.getValue().name}</span>
            </>
          ),
        },
      ),
      columnHelper.accessor("teamSize", {
        header: "Team Size",
        filterVariant: "range",
      }),
      columnHelper.accessor("onCampusSize", {
        header: "On-Campus Size",
        filterVariant: "range",
      }),
      columnHelper.accessor("progress", {
        header: "Progress Score (0-6)",
        filterVariant: "range",
        Cell: ({ cell }) => cell.getValue().toFixed(3),
      }),
      columnHelper.accessor("puzzlesSolved", {
        header: "Puzzles Solved",
        filterVariant: "range",
      }),
      columnHelper.accessor("puzzlesSolvedLast3Hours", {
        header: "Puzzles Solved, Last 3 Hours",
        filterVariant: "range",
      }),
      columnHelper.accessor("hintsRequested", {
        header: "Hints Requested",
        filterVariant: "range",
      }),
    ];
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: indexData,
    initialState: {
      density: "compact",
      sorting: [
        {
          id: "progress",
          desc: true,
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: 100,
      },
    },
    enableDensityToggle: false,
  });

  return <MaterialReactTable table={table} />;
}
