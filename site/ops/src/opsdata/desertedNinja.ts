import { type AuthClient } from "../../../lib/api/admin_client";
import {
  type DesertedNinjaQuestion,
  type DesertedNinjaSession,
} from "../../../lib/api/admin_contract";
//import { useOpsData } from "../OpsDataProvider";

export function retrieveDesertedNinjaData(
  adminClient: AuthClient,
  setQuestions: React.Dispatch<
    React.SetStateAction<Map<number, DesertedNinjaQuestion>>
  >,
  setSessions: React.Dispatch<React.SetStateAction<DesertedNinjaSession[]>>,
) {
  adminClient.getDesertedNinjaQuestions().then(
    (obj) => {
      const m = new Map<number, DesertedNinjaQuestion>();
      (obj.body as DesertedNinjaQuestion[]).forEach((q) => {
        m.set(q.id, q);
      });
      setQuestions(m);
    },
    (reason) => {
      console.log(reason);
      ///throw new Error(`Failed to retrieve questions: ${reason}`);
    },
  );
  adminClient.getDesertedNinjaSessions().then(
    (obj) => {
      setSessions(obj.body as DesertedNinjaSession[]);
    },
    (reason) => {
      console.log(reason);
      //throw new Error(`Failed to retrieve questions: ${reason}`);
    },
  );
}
