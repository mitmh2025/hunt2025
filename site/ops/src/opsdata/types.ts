import { type TeamRegistration } from "../../../lib/api/frontend_contract";
import {
  type formatTeamHuntState,
  type TeamStateIntermediate,
} from "../../../src/api/logic";

export type TeamData = {
  teamId: number;
  name: string;
  registration: TeamRegistration;
  state: TeamStateIntermediate;
  formattedState: ReturnType<typeof formatTeamHuntState>;
};
