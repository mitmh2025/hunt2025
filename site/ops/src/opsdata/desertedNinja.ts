import { type OpsData } from "../OpsDataProvider";

export function retrieveDesertedNinjaData(data: OpsData, setQuestions, setSessions) {
  retrieveQuestions(data, setQuestions);
  retrieveSessions(data, setSessions);
}

function retrieveQuestions(data: OpsData, setQuestions) {
  data.adminClient.getDesertedNinjaQuestions().then(
    (result) => {
      setQuestions(result.body);
    },
    (result) => {
      throw new Error(`Failed to retrieve questions: ${result.status}`);
    }
  );
}

function retrieveSessions(data: OpsData, setSessions) {
  data.adminClient.getDesertedNinjaSessions().then(
    (result) => {
      setSessions(result.body);
    },
    (result) => {
      throw new Error(`Failed to load sessions: ${result.status}`);
    }
  );
}

function retrieveScores(data: OpsData, teamId: number, setScores) {
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
