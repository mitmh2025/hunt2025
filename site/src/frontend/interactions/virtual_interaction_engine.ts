import { type FrontendClient } from "../../../lib/api/frontend_client";
import {
  type TeamInteractionStateLogEntry,
  type InternalActivityLogEntry,
} from "../../../lib/api/frontend_contract";
import {
  activityLog,
  teamInteractionStateLog,
  type RedisClient,
} from "../../api/redis";
import { fixTimestamp } from "../../utils/fixTimestamp";
import { type DatasetTailer, newLogTailer } from "../server/dataset_tailer";
import {
  INTERACTION_START_TIMEOUT_MSEC,
  PROPAGATION_DELAY_FUDGE_FACTOR_MSEC,
} from "./constants";
import { isTerminalNode } from "./types";
import { type VirtualInteractionHandler } from "./virtual_interaction_handler";
import { INTERACTIONS } from ".";

const VIRTUAL_INTERACTION_HANDLERS = Object.fromEntries(
  Object.entries(INTERACTIONS).flatMap(([slug, interaction]) => {
    if (interaction.type === "virtual") {
      return [[slug, interaction.handler]];
    } else {
      return [];
    }
  }),
);

type UnlockEntry = InternalActivityLogEntry & {
  type: "interaction_unlocked";
  slug: string;
};

// Monitors a single (team_id, interaction id) to nudge it along as needed, by calling frontend API
// methods advanceInteraction and completeInteraction
class VirtualInteractionMonitor {
  // Used to call the API methods to nudge this interaction along.
  private frontendApiClient: FrontendClient;

  // Information to identify which team
  private teamId: number;
  private interactionId: string;

  private interactionHandler: VirtualInteractionHandler<
    object,
    unknown,
    string,
    string,
    unknown
  >;

  private stopHandle: (() => void) | undefined;

  // When state is "waiting" or "backoff", the handle for the callback that we will trigger
  private timeoutHandle: NodeJS.Timeout | number | undefined;

  // The possible states this interaction monitor can be in.
  // * learning: have not yet observed enough TeamInteractionStateLog entries to know what to do next
  // * waiting: timeoutHandle should be set, and the callback should be appropriate for the most recent TeamInteractionStateLog node.
  // * requesting: a request has been sent to attempt to move the interaction forward, but we have not seen its reply yet.
  // * retry-soon: (probably clock skew) we requested transition faster than the API server thinks we should have
  // * backoff: a request returned an error.  We should try again, but we should wait in case the server is overwhelmed.
  // * shutdown: the interaction is completed and we should release any resources
  private state:
    | "learning"
    | "waiting"
    | "requesting"
    | "retry-soon"
    | "backoff"
    | "shutdown";

  private latestEntry: TeamInteractionStateLogEntry | undefined;

  private failureCount: number;

  constructor({
    frontendApiClient,
    teamId,
    startableAt,
    interactionId,
    interactionHandler,
    teamInteractionStateLogTailer,
  }: {
    frontendApiClient: FrontendClient;
    teamId: number;
    startableAt: Date;
    interactionId: string;
    interactionHandler: VirtualInteractionHandler<
      object,
      unknown,
      string,
      string,
      unknown
    >;
    teamInteractionStateLogTailer: DatasetTailer<TeamInteractionStateLogEntry>;
  }) {
    console.log(
      `Starting VirtualInteractionMonitor for team ${teamId}, interaction ${interactionId}`,
    );
    this.frontendApiClient = frontendApiClient;
    this.teamId = teamId;
    this.interactionId = interactionId;
    this.interactionHandler = interactionHandler;
    this.failureCount = 0;
    this.state = "waiting";
    const unlockTime = startableAt.getTime();
    const startDeadline = unlockTime + INTERACTION_START_TIMEOUT_MSEC; // two minutes?
    const waitMsec = this.timeoutForTarget(startDeadline);
    // console.log(`Scheduling startInteraction (${this.interactionId}) in ${waitMsec} msec`);
    this.timeoutHandle = setTimeout(
      this.tryStartInteraction.bind(this),
      waitMsec,
    );
    // Start observing teamInteractionStateLog.
    this.stopHandle = teamInteractionStateLogTailer.watchLog((entries) => {
      for (const entry of entries) {
        this.processEntry(entry);
      }
    });
  }

  private timeoutForTarget(target: number) {
    const now = Date.now();
    // Always wait at least 5msec in case there are other events pending processing
    return Math.max(target - now, 5);
  }

  // Backoff delay in milliseconds
  private backoffDelay() {
    return Math.min(Math.pow(2, this.failureCount), 16) * 1000;
  }

  private processEntry(entry: TeamInteractionStateLogEntry) {
    // When new entries come in: if they are for this team/interaction:
    // * cancel any scheduled action timeout
    // * determine the next action to take and when to schedule it.  Actions are either:
    //   * request advanceInteraction or
    //   * request completeInteraction
    if (entry.team_id === this.teamId && entry.slug === this.interactionId) {
      // console.log(`VIM: team ${this.teamId} int ${this.interactionId} process entry ${entry.node}`);
      this.cancelTimeouts();
      this.latestEntry = entry;
      // Look up the node in this interaction graph.
      const nodeId = entry.node;
      const node = this.interactionHandler.lookupNode(nodeId);
      if (!node) {
        // console.warn(`no node ${nodeId} in ${this.interactionId}?`);
        return;
      }
      const actAfter = this.interactionHandler.advanceAfterTime(
        nodeId,
        fixTimestamp(entry.timestamp).getTime(),
      );
      if (actAfter === undefined) {
        // console.warn("no actAfter?");
        return;
      }
      // Always wait at least briefly, so that if we're processing a bunch of entries at once from
      // the log we won't actually take action on them too soon.
      const waitTime =
        this.timeoutForTarget(actAfter) + PROPAGATION_DELAY_FUDGE_FACTOR_MSEC;
      if (isTerminalNode(node)) {
        // console.log(`VIM: wait for ${waitTime} then tryCompleteInteraction`);
        this.state = "waiting";
        this.timeoutHandle = setTimeout(
          this.tryCompleteInteraction.bind(this, nodeId),
          waitTime,
        );
      } else {
        // console.log(`VIM: wait for ${waitTime} then tryAdvanceInteraction`);
        this.state = "waiting";
        this.timeoutHandle = setTimeout(
          this.tryAdvanceInteraction.bind(this, nodeId),
          waitTime,
        );
      }
    }
  }

  private cancelTimeouts() {
    if (this.timeoutHandle !== undefined) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = undefined;
    }
  }

  private tryStartInteraction() {
    console.log(
      `VIM: tryStartInteraction team ${this.teamId} int ${this.interactionId}`,
    );
    this.cancelTimeouts(); // this function *is* the timer callback
    if (
      (this.state !== "waiting" && this.state !== "retry-soon") ||
      this.latestEntry !== undefined
    ) {
      // Something else probably started the interaction before we got there, and our timer callback
      // didn't get cancelled (indicating a programming error.)
      console.warn(
        `tryStartInteraction called but state is ${this.state} and latestEntry is ${JSON.stringify(this.latestEntry)}`,
      );
      return;
    }

    this.state = "requesting";
    this.frontendApiClient
      .startInteraction({
        params: {
          teamId: `${this.teamId}`,
          interactionId: this.interactionId,
        },
      })
      .then(
        (res) => {
          // If this.state changed while our request was away, or this.latestEntry is now defined, then
          // the interaction has clearly started and we should move along -- no action needed.
          if (this.state === "requesting" && this.latestEntry === undefined) {
            if (res.status === 200) {
              // console.log(`VIM: Success starting interaction ${this.interactionId}, entering learning state`)
              // Interaction is started.  We should learn about the first team interaction state log
              // entry via dataset tailer soon.
              this.state = "learning";
              this.failureCount = 0;
            } else {
              // We should retry, after a bit.
              this.state = "retry-soon";
              this.failureCount += 1;
              this.timeoutHandle = setTimeout(
                this.tryStartInteraction.bind(this),
                this.backoffDelay(),
              );
            }
          }
        },
        (err) => {
          // Retry probably?
          console.error(
            `Failed to start interaction ${this.interactionId} for team ${this.teamId}:`,
            err,
          );
          if (this.state === "requesting" && this.latestEntry === undefined) {
            this.state = "retry-soon";
            this.failureCount += 1;
            this.timeoutHandle = setTimeout(
              this.tryStartInteraction.bind(this),
              this.backoffDelay(),
            );
          }
        },
      );
  }

  private tryAdvanceInteraction(fromNode: string) {
    this.cancelTimeouts(); // this function *is* the timer callback

    if (
      (this.state !== "waiting" &&
        this.state !== "backoff" &&
        this.state !== "retry-soon") ||
      this.latestEntry?.node !== fromNode
    ) {
      // Something else changed state out from under us.  Other codepaths are supposed to have
      // cancelled the timeout, so this is probably a programming error.  In any event, something
      // else set our state,
      console.warn(
        `tryAdvanceInteraction(${fromNode}) called but state is ${this.state} and node is ${JSON.stringify(this.latestEntry)}`,
      );
      return;
    }

    this.state = "requesting";
    this.frontendApiClient
      .advanceInteraction({
        params: {
          teamId: `${this.teamId}`,
          interactionId: this.interactionId,
          fromNode,
        },
        body: {},
      })
      .then(
        (res) => {
          // It's possible some other event happened while this request was away.  If our state
          // changed between when we issued the request and now, the new state takes precedence.
          if (
            this.state === "requesting" &&
            this.latestEntry?.node === fromNode
          ) {
            if (res.status === 200) {
              // If latestEntry is still fromNode, we won't know what to do until the next node is given to us.
              // console.log(`VIM: Success advancing interaction ${this.interactionId}, entering learning state`)
              this.state = "learning";
              this.failureCount = 0;
            } else if (res.status === 400) {
              // console.warn(`VIM: advanceInteraction failed with code ${res.body.reason}`);
              switch (res.body.reason) {
                case "invalid-from-node":
                  // Programming error.  We should have tried to completeInteraction.
                  this.state = "learning";
                  break;
                case "no-log":
                  // Also should not happen.  How would we know what fromNode should be until we have a log entry?
                  this.state = "learning";
                  break;
                case "too-soon":
                  // Probably some sort of time skew.  We should try again, soon.
                  // We are too early.  Reschedule with backoff.
                  this.state = "backoff";
                  this.failureCount += 1;
                  this.timeoutHandle = setTimeout(
                    this.tryAdvanceInteraction.bind(this, fromNode),
                    1000,
                  );
                  break;
                case "wrong-from-node":
                  // The server believes a different node is the latest.  We should go back into
                  // learning mode so we learn about it.
                  this.state = "learning";
              }
            } else {
              // console.error(`VIM: advanceInteraction failed with status code ${res.status} (unhandled!)`);
            }
          } else {
            // console.log(`VIM: interaction ${this.interactionId} changed out from under us while request was away; taking no action lest we clobber state`);
          }
        },
        (err) => {
          console.error("advanceInteraction failed", err);
          if (
            this.state === "requesting" &&
            this.latestEntry?.node === fromNode
          ) {
            this.state = "retry-soon";
            this.failureCount += 1;
            this.timeoutHandle = setTimeout(
              this.tryAdvanceInteraction.bind(this, fromNode),
              this.backoffDelay(),
            );
          }
        },
      );
  }

  private tryCompleteInteraction(fromNode: string) {
    this.cancelTimeouts(); // this function *is* the timer callback

    if (this.state !== "waiting" || this.latestEntry?.node !== fromNode) {
      console.warn(
        `tryCompleteInteraction(${fromNode}) called but state is ${this.state} and node is ${JSON.stringify(this.latestEntry)}`,
      );
      return;
    }

    this.state = "requesting";
    this.frontendApiClient
      .completeInteraction({
        params: {
          teamId: `${this.teamId}`,
          interactionId: this.interactionId,
        },
        body: {},
      })
      .then(
        (res) => {
          if (res.status === 200) {
            // We completed the interaction successfully and are done!
            this.shutdown();
          } else {
            this.state = "retry-soon";
            this.failureCount += 1;
            this.timeoutHandle = setTimeout(
              this.tryCompleteInteraction.bind(this, fromNode),
              this.backoffDelay(),
            );
          }
        },
        (err) => {
          console.error("completeInteraction failed", err);
          if (
            this.state === "requesting" &&
            this.latestEntry?.node === fromNode
          ) {
            this.state = "retry-soon";
            this.failureCount += 1;
            this.timeoutHandle = setTimeout(
              this.tryCompleteInteraction.bind(this, fromNode),
              this.backoffDelay(),
            );
          }
        },
      );
  }

  public shutdown() {
    // Can be called by us on successful tryCompleteInteraction or by VirtualInteractionEngine on
    // observing an interaction_completed event in the log.
    if (this.state !== "shutdown") {
      this.state = "shutdown";
      this.cancelTimeouts();
      this.stopHandle?.();
      this.stopHandle = undefined;
    }
  }
}

type VirtualInteractionState = {
  state: "unlocked" | "started" | "completed";

  // Only populated while this particular virtual interaction is active.
  monitor: VirtualInteractionMonitor | undefined;
};

type TeamInteractionsState = {
  active: UnlockEntry | undefined;
  queue: UnlockEntry[];
  interactions: Map<string, VirtualInteractionState>;
};

// Watches the activity log and holds a team interaction state log (which gets used by individual
// VirtualInteractionMonitor instances to watch team logs)
export class VirtualInteractionEngine {
  private activityLogTailer: DatasetTailer<InternalActivityLogEntry>;

  private teamInteractionStateLogTailer: DatasetTailer<TeamInteractionStateLogEntry>;
  private frontendApiClient: FrontendClient;

  private teamInteractionStates: Map<number, TeamInteractionsState>;

  constructor({
    redisClient,
    frontendApiClient,
  }: {
    redisClient: RedisClient;
    frontendApiClient: FrontendClient;
  }) {
    this.frontendApiClient = frontendApiClient;
    this.activityLogTailer = newLogTailer({
      redisClient,
      fetchMethod: frontendApiClient.getFullActivityLog.bind(frontendApiClient),
      log: activityLog,
    });
    this.teamInteractionStateLogTailer = newLogTailer({
      redisClient,
      fetchMethod:
        frontendApiClient.getFullTeamInteractionStateLog.bind(
          frontendApiClient,
        ),
      log: teamInteractionStateLog,
    });

    this.teamInteractionStates = new Map();
  }

  public start() {
    // Start up the dataset tailers.
    this.activityLogTailer.start();
    this.teamInteractionStateLogTailer.start();
    this.activityLogTailer.watchLog((entries: InternalActivityLogEntry[]) => {
      entries.forEach((entry) => {
        this.processActivityLogEntry(entry);
      });
    });
  }

  processActivityLogEntry(entry: InternalActivityLogEntry) {
    if (
      entry.type === "interaction_unlocked" ||
      entry.type === "interaction_started" ||
      entry.type === "interaction_completed"
    ) {
      // Only handle virtual interactions
      const handler = VIRTUAL_INTERACTION_HANDLERS[entry.slug];
      if (!handler) return;

      // All these entry types should have a team_id
      const teamId = entry.team_id;
      if (!teamId) return;

      // Backfill an empty team interaction state, if we don't have one yet
      let teamData = this.teamInteractionStates.get(teamId);
      if (!teamData) {
        teamData = {
          active: undefined,
          queue: [],
          interactions: new Map(),
        };
        this.teamInteractionStates.set(teamId, teamData);
      }

      switch (entry.type) {
        case "interaction_unlocked":
          {
            if (teamData.active === undefined) {
              console.log(
                `Running interaction ${entry.slug} for team ${entry.team_id}`,
              );
              // We can run this immediately.
              let interactionState = teamData.interactions.get(entry.slug);
              if (!interactionState) {
                const monitor = new VirtualInteractionMonitor({
                  frontendApiClient: this.frontendApiClient,
                  teamId,
                  startableAt: fixTimestamp(entry.timestamp),
                  interactionId: entry.slug,
                  interactionHandler: handler as VirtualInteractionHandler<
                    object,
                    unknown,
                    string,
                    string,
                    unknown
                  >,
                  teamInteractionStateLogTailer:
                    this.teamInteractionStateLogTailer,
                });
                interactionState = {
                  state: "unlocked",
                  monitor,
                };
                teamData.active = entry;
                teamData.interactions.set(entry.slug, interactionState);
              }
            } else {
              console.log(
                `Queueing interaction ${entry.slug} for team ${entry.team_id} (active: ${teamData.active.slug}, existing queue: ${teamData.queue.map((e) => ("slug" in e ? e.slug : "")).join(",")})`,
              );
              // We must queue this entry for re-processing later, when the active interaction is done.
              teamData.queue.push(entry);
              teamData.interactions.set(entry.slug, {
                state: "unlocked",
                monitor: undefined,
              });
            }
          }
          break;
        case "interaction_started":
          {
            const interactionState = teamData.interactions.get(entry.slug);
            if (interactionState?.state === "unlocked") {
              console.log(
                `Marking interaction ${entry.slug} started for team ${entry.team_id}`,
              );
              interactionState.state = "started";
            }
          }
          break;
        case "interaction_completed": {
          // Clean up any resources associated with the interaction that is now no longer running.
          const interactionState = teamData.interactions.get(entry.slug);
          if (interactionState) {
            if (interactionState.monitor) {
              interactionState.monitor.shutdown();
              interactionState.monitor = undefined;
            }
            console.log(
              `Marking interaction ${entry.slug} completed for team ${entry.team_id}`,
            );
            interactionState.state = "completed";
          }

          // If any interactions were queued, start the first one.
          const next = teamData.queue.shift();
          if (next) {
            console.log(`Starting queued interaction ${next.slug}`);
            teamData.active = next;
            const nextInteractionState = teamData.interactions.get(next.slug);
            if (nextInteractionState) {
              const nextHandler = VIRTUAL_INTERACTION_HANDLERS[next.slug];
              nextInteractionState.monitor = new VirtualInteractionMonitor({
                frontendApiClient: this.frontendApiClient,
                teamId,
                // If overlapping meta completions, we want to use the time of the previous
                // completion, since we don't allow overlapping virtual interactions
                startableAt: fixTimestamp(entry.timestamp),
                interactionId: next.slug,
                interactionHandler: nextHandler as VirtualInteractionHandler<
                  object,
                  unknown,
                  string,
                  string,
                  unknown
                >,
                teamInteractionStateLogTailer:
                  this.teamInteractionStateLogTailer,
              });
            }
          } else {
            teamData.active = undefined;
          }
        }
      }
    }
  }
}
