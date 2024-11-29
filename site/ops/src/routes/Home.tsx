import { useMemo } from "react";
import { styled } from "styled-components";
import { useOpsData } from "../OpsDataProvider";
import BigBoardTeam from "../components/BigBoardTeam";
import { formatAllTeamsData } from "../opsdata/bigBoard";

const TeamsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function App() {
  const data = useOpsData();

  const bigBoardData = useMemo(() => formatAllTeamsData(data), [data]);

  return (
    <TeamsContainer>
      {bigBoardData.teams.map((team) => (
        <BigBoardTeam team={team} key={team.id} />
      ))}
    </TeamsContainer>
  );
}
