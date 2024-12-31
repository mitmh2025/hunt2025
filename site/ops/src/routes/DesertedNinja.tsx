import { useEffect, useState } from "react";
import { useOpsData, type OpsData } from "../OpsDataProvider";
import { formatScores } from "../opsdata/desertedNinja.ts";
import { type DesertedNinjaScore } from "../../../lib/api/admin_contract";

export default function DesertedNinjaStub() {
  const [scores, setScores] = useState<DesertedNinjaScore>({
    sessionId: -1,
    teamId: -1,
    scores: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  });
  const opsData = useOpsData();
  
  useEffect( () => {
    formatScores(opsData, setScores);
  }, []);

  return (
    <>
      <h1>Temp</h1>
      {scores.scores}
    </>
  );
}
