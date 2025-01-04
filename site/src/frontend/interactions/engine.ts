import type { FrontendClient } from "../../../lib/api/frontend_client";
import type { InternalActivityLogEntry } from "../../../lib/api/frontend_contract";
import { type RedisClient, activityLog } from "../../api/redis";
import { type DatasetTailer, newLogTailer } from "../server/dataset_tailer";
import { INTERACTIONS } from "./index";

// Dialog tree interaction engine
//
// The interaction engine watches for interaction state transitions via DatasetTailer.
// It will take action for any interaction defined in INTERACTIONS which has a member `graph`.
// It

type InteractionGraphState = {
  node: string;
  state: unknown; // Actually the T of the corresponding InteractionGraph
};

type InteractionEngineState = {
  team_id: number;
  slug: string; // keyof typeof INTERACTIONS;
  // A maximum of one InteractionState per team may be in state "gathering" or "running" at a time.
  // queued: this interaction is unlocked, but will not be started until other interactions have moved to state "completed"
  // gathering: this interaction is unlocked and scheduled to auto-start.
  // running: this interaction is unlocked and started.  It should be regularly pushed forward.
  // completed: this interaction is completed.
  state: "queued" | "gathering" | "running" | "completed";
  unlockedAt: Date;
  startedAt?: Date;
  lastTransitionAt?: Date;
  executionState?: InteractionGraphState;
  log?: InteractionGraphState[]; // The series of nodes visited and the state at the time of arriving at each
  result?: string;
} & (
  | {
      state: "queued";
    }
  | {
      state: "gathering";
      readyAt: Date;
    }
  | {
      state: "running";
      startedAt: Date;
      lastTransitionAt: Date;
      executionState: InteractionGraphState;
      log: InteractionGraphState[];
    }
  | {
      state: "completed";
      startedAt: Date;
      lastTransitionAt: Date;
      log: InteractionGraphState[];
      result: string;
    }
);

type TeamInteractions = {
  actionHandle?: NodeJS.Timeout; // Timeout handle for the "do what's needed next" callback
  interactionStates: InteractionEngineState[]; // Ordered by unlock order (in the activity log), and will be run in that order.
};

/*
const FORCE_INTERACTION_START_TIMEOUT_MSEC = 10000;

function determineNextAction(teamInteractions: TeamInteractions) {
  // If any interaction is running, drive that one forward.
  const running = teamInteractions.interactionStates.find(
    (i) => i.state === "running",
  );
  if (running !== undefined) {
    return {
      kind: "run",
      interaction: running,
    };
  }
  // If any interaction is gathering, see if that one's start deadline is

  const gathering = teamInteractions.interactionStates.find(
    (i) => i.state === "gathering",
  );
  if (gathering !== undefined) {
    return {
      kind: "start",
      interaction: gathering,
    };
  }

  // If any interaction is queued, we can start it.
  const queued = teamInteractions.interactionStates.find(
    (i) => i.state === "queued",
  );
  if (queued) {
    return {
      kind: "gather",
      interaction: queued,
    };
  }

  return undefined;
}
*/

export class InteractionEngine {
  // Keys are strings of the form `${team_id}:{slug}`
  private activeInteractions: Map<string, InteractionEngineState>;
  private tailer: DatasetTailer<InternalActivityLogEntry>;
  //private _watchHandle: () => void;
  //private frontendApiClient: FrontendClient;

  // A map from team id to an array of interaction slugs for which the team has unlocked the interaction but not started them.
  // When
  private interactionsByTeam: Map<number, TeamInteractions>;

  // We also need something in here which tracks what each *team* is doing, since we want to limit
  // ourselves to a single interaction for a team at a time (since they are something we want everyone to see)

  constructor({
    redisClient,
    frontendApiClient,
  }: {
    redisClient: RedisClient;
    frontendApiClient: FrontendClient;
  }) {
    //this.frontendApiClient = frontendApiClient;
    this.activeInteractions = new Map<string, InteractionEngineState>();
    this.interactionsByTeam = new Map<number, TeamInteractions>();
    // instantiate DatasetTailer
    this.tailer = newLogTailer({
      redisClient,
      fetchMethod: frontendApiClient.getFullActivityLog.bind(frontendApiClient),
      log: activityLog,
    });
    this.tailer.start();
    /* this._watchHandle = */ this.tailer.watchLog(
      this.onActivityLogUpdate.bind(this),
    );
  }

  onActivityLogUpdate(items: InternalActivityLogEntry[]) {
    items.forEach((item: InternalActivityLogEntry) => {
      if (item.team_id !== undefined) {
        if (item.type === "interaction_unlocked" && item.slug in INTERACTIONS) {
          const interaction =
            INTERACTIONS[item.slug as keyof typeof INTERACTIONS];
          if ("graph" in interaction) {
            // Set up the interaction state and a timer for pushing the interaction into started
            const key = `${item.team_id}:${item.slug}`;
            let teamInteractions = this.interactionsByTeam.get(item.team_id);
            if (!teamInteractions) {
              teamInteractions = {
                actionHandle: undefined,
                interactionStates: [],
              };
              this.interactionsByTeam.set(item.team_id, teamInteractions);
            }

            const interactionState: InteractionEngineState = {
              team_id: item.team_id,
              slug: item.slug,
              state: "queued",
              unlockedAt: new Date(item.timestamp),
              //actionHandle: setTimeout(
              //  this.maybeDriveInteraction.bind(this, item.team_id, item.slug),
              //  5000,
              //),
            };
            this.activeInteractions.set(key, interactionState);
            teamInteractions.interactionStates.push(interactionState);
          }
        } else if (item.type === "interaction_started") {
          /*
          const interaction =
            INTERACTIONS[item.slug as keyof typeof INTERACTIONS];
          if ("graph" in interaction) {
            const key = `${item.team_id}:${item.slug}`;
            const interactionState = this.activeInteractions.get(key);
            if (interactionState) {
              if (interactionState.actionHandle !== undefined) {
                clearTimeout(interactionState.actionHandle);
                interactionState.actionHandle = undefined;
              }
              interactionState.state = "running";
              interactionState.startedAt = new Date(item.timestamp);
              const initialGraphState = {
                node: interaction.graph.starting_node,
                state: interaction.graph.starting_state,
              };
              interactionState.executionState = initialGraphState;
              interactionState.log = [initialGraphState];
              interactionState.actionHandle = setTimeout(
                this.maybeDriveInteraction.bind(this, item.team_id, item.slug),
                2000,
              );
            }
          }
          // Advance the interaction state.  Set a new timer based on the relevant interaction graph.
        } else if (item.type === "interaction_completed") {
          // Advance the interaction state.  Clear all timers.  We will not take action on this interaction again.
          const key = `${item.team_id}:${item.slug}`;
          const interactionState = this.activeInteractions.get(key);
          if (interactionState) {
            if (interactionState.actionHandle !== undefined) {
              clearTimeout(interactionState.actionHandle);
              interactionState.state = "completed";
              interactionState.actionHandle = undefined;
            }
          }
            */
        }
      }
    });
  }

  /*
  maybeDriveInteraction(team_id: number, slug: string) {
    // Self-rescheduling callback to attempt to take some action to move an interaction forward,
    // based on the graph and the current observed state.
    const key = `${team_id}:${slug}`;
    const now = Date.now();
    const interactionState = this.activeInteractions.get(key);
    if (!interactionState) {
      // This interaction is no longer live.  We can stop trying to drive it.
      return;
    }
    switch (interactionState.state) {
      case "unlocked":
        {
          const deadline =
            interactionState.unlockedAt.getTime() +
            FORCE_INTERACTION_START_TIMEOUT_MSEC;
          if (deadline < now) {
            // If FORCE_INTERACTION_START_TIMEOUT deadline has passed, try starting the interaction
            // Request via the internal API that the interaction be started.
            // This is still kinda shaky with respect to error handling.
            //  I haven't thought through how to make this ensure that we retry until we eventually succeed.
            this.frontendApiClient
              .startInteraction({
                params: { teamId: `${team_id}`, interactionId: slug },
              })
              .then(
                (result) => {
                  if (result.status === 200) {
                    // no-op on success
                  } else {
                    console.error(
                      `Failed to start interaction ${key}: got HTTP ${result.status}`,
                      result.body,
                    );
                  }
                },
                (err: unknown) => {
                  // check reason for failure
                  console.error(`Failed to start interaction ${key}`, err);
                },
              );
          } else {
            // If too soon, reschedule for after the deadline has passed
            interactionState.actionHandle = setTimeout(
              this.maybeDriveInteraction.bind(this, team_id, slug),
              deadline - now,
            );
          }
        }
        break;
      case "running":
        {
          const currentNode =
            interactionState.log[interactionState.log.length - 1];

          // See if we should
        }
        break;
      case "completed": {
        // Nothing more to be done.  Do not re-arm a setTimeout.
        interactionState.actionHandle = undefined;
      }
    }
  }
  */
}
