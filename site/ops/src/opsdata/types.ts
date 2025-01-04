import { type TeamRegistration } from "../../../lib/api/contract";
import {
  type formatTeamHuntState,
  type TeamStateIntermediate,
} from "../../../src/api/logic";

export type TeamData = {
  teamId: number;
  name: string;
  username: string;
  deactivated: boolean;
  registration: TeamRegistration;
  state: TeamStateIntermediate;
  formattedState: ReturnType<typeof formatTeamHuntState>;
};
