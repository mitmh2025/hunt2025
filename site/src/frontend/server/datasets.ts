import { type TeamHuntState } from "../../../lib/api/client";
import { type DehydratedActivityLogEntry } from "../../../lib/api/contract";
import { type InternalActivityLogEntry } from "../../../lib/api/frontend_contract";
import {
  type Dataset,
  type ObjectWithEpoch,
  type ObjectWithId,
} from "../../../lib/api/websocket";
import { type TeamInfoIntermediate } from "../../api/logic";
import { navBarState } from "../components/ContentWithNavBar";
import { hubState } from "../hub";
import virtualInteractionState from "../interactions/virtualInteractionState";
import { backgroundCheckState } from "../rounds/background_check";
import { eventsState } from "../rounds/events";
import {
  bookcaseState,
  cryptexState,
  painting2State,
  rugState,
} from "../rounds/illegal_search";
import { missingDiamondState } from "../rounds/missing_diamond";
import { murderState } from "../rounds/murder_in_mitropolis";
import { paperTrailState } from "../rounds/paper_trail";
import { stakeoutState } from "../rounds/stakeout";
import { strayLeadsState } from "../rounds/stray_leads";
import { devtoolsState } from "./devtools";
import { allPuzzlesState } from "./routes/all_puzzles";

export type DatasetHandler =
  | {
      type: "team_state";
      callback: (
        teamState: TeamHuntState,
        { username }: { username: string },
      ) => ObjectWithEpoch;
    }
  | {
      type: "activity_log";
      callback: (entry: DehydratedActivityLogEntry) => ObjectWithId | undefined;
    }
  | {
      type: "activity_log_with_slug";
      callback: (
        entry: InternalActivityLogEntry & { slug: string },
      ) => ObjectWithId | undefined;
    }
  | {
      type: "team_registration";
      callback: (teamInfoIntermediate: TeamInfoIntermediate) => ObjectWithEpoch;
    }
  | {
      type: "puzzle_state_log";
    }
  | {
      type: "interaction_state_log";
    }
  | {
      type: "poll_responses";
    };

export const DATASET_REGISTRY: Record<Dataset, DatasetHandler> = {
  activity_log: {
    type: "activity_log",
    callback: (e) => e,
  },
  all_puzzles: {
    type: "team_state",
    callback: allPuzzlesState,
  },
  dev: {
    type: "team_state",
    callback: devtoolsState,
  },
  guess_log: {
    type: "activity_log_with_slug",
    callback: (e) => {
      if (e.type !== "puzzle_guess_submitted") {
        return undefined;
      }

      return {
        id: e.id,
        status: e.data.status,
        canonical_input: e.data.canonical_input,
        link: e.data.link,
        response: e.data.response,
        timestamp: e.timestamp,
      };
    },
  },
  hint_log: {
    type: "activity_log_with_slug",
    callback: (e) => {
      if (
        e.type !== "puzzle_hint_requested" &&
        e.type !== "puzzle_hint_responded"
      ) {
        return undefined;
      }

      return {
        id: e.id,
        timestamp: e.timestamp,
        type: e.type,
        data: e.data,
      };
    },
  },
  hub: {
    type: "team_state",
    callback: hubState,
  },
  navbar: {
    type: "team_state",
    callback: navBarState,
  },
  paper_trail: {
    type: "team_state",
    callback: paperTrailState,
  },
  missing_diamond: {
    type: "team_state",
    callback: missingDiamondState,
  },
  stakeout: {
    type: "team_state",
    callback: stakeoutState,
  },
  stray_leads: {
    type: "team_state",
    callback: strayLeadsState,
  },
  team_info: {
    type: "team_registration",
    callback: (teamInfoIntermediate: TeamInfoIntermediate) => {
      const result = teamInfoIntermediate.formatTeamInfo();
      if (result) return result;
      return { epoch: -1 };
    },
  },
  team_registration: {
    type: "team_registration",
    callback: (teamInfoIntermediate: TeamInfoIntermediate) => {
      const result = teamInfoIntermediate.formatTeamRegistrationState();
      if (result) return result;
      return { epoch: -1 };
    },
  },
  team_state: {
    type: "team_state",
    callback: (teamState: TeamHuntState) => {
      return teamState;
    },
  },
  illegal_search_painting2: {
    type: "team_state",
    callback: painting2State,
  },
  illegal_search_rug: {
    type: "team_state",
    callback: rugState,
  },
  illegal_search_cryptex: {
    type: "team_state",
    callback: cryptexState,
  },
  illegal_search_bookcase: {
    type: "team_state",
    callback: bookcaseState,
  },
  background_check: {
    type: "team_state",
    callback: backgroundCheckState,
  },
  murder_in_mitropolis: {
    type: "team_state",
    callback: murderState,
  },
  puzzle_state_log: {
    type: "puzzle_state_log",
  },
  events: {
    type: "team_state",
    callback: eventsState,
  },
  interaction_state_log: {
    type: "interaction_state_log",
  },
  poll_responses: {
    type: "poll_responses",
  },
  virtual_interaction_state: {
    type: "team_state",
    callback: virtualInteractionState,
  },
};
