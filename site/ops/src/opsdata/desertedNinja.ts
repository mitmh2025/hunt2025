import { type OpsData } from "../OpsDataProvider";
import { type DesertedNinjaScore } from "../../../lib/api/admin_contract";

export function formatScores(data: OpsData, setScores) : DesertedNinjaScore {
  data.adminClient.getDesertedNinjaScores({
    params: {
      teamId: "1"
    },
  }).then(
    (result) => {
      setScores(result.body);
    },
    () => {
      throw new Error(`Failed to load scores: ${result.status}`);
    }
  );
}
