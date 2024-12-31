import { type OpsData } from "../OpsDataProvider";
import { type DesertedNinjaScore } from "../../../lib/api/admin_contract";

export function retrieveSessions(data: OpsData, setSessions) {
  data.adminClient.getDesertedNinjaSessions().then(
    (result) => {
      setSessions(result.body);
    },
    (result) => {
      throw new Error(`Failed to load sessions: ${result.status}`);
    }
  );
}

export function retrieveScores(data: OpsData, teamId: number, setScores) {
  data.adminClient.getDesertedNinjaScores({
    params: {
      teamId: teamId.toString()
    },
  }).then(
    (result) => {
      setScores(result.body);
    },
    (result) => {
      throw new Error(`Failed to load scores: ${result.status}`);
    }
  );
}
