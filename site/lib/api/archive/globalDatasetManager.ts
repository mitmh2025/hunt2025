import formatActivityLogEntryForApi from "../../../src/api/formatActivityLogEntryForApi";
import {
  TeamInfoIntermediate,
  TeamStateIntermediate,
  formatTeamHuntState,
} from "../../../src/api/logic";
import {
  DATASET_REGISTRY,
  type DatasetHandler,
} from "../../../src/frontend/server/datasets";
import HUNT from "../../../src/huntdata";
import { IMMUTABLE_TEAM_USERNAMES } from "../../../src/utils/teamIsImmutable";
import { actionForDataset } from "../../SocketManager";
import { genId } from "../../id";
import {
  type ObjectWithId,
  type Dataset,
  type DatasetParams,
  type DatasetValue,
} from "../websocket";
import {
  fetchActivityLog,
  fetchPuzzleStateLog,
  fetchTeamRegistrationLog,
} from "./log";
import { ALL_LOGS } from "./storage";
import type globalDatasetManager from "@hunt_client/globalDatasetManager";

type DatasetManager = typeof globalDatasetManager;

type Watch = {
  id: string;
  dataset: Dataset;
  params: DatasetParams;
  highWaterMark: number; // only used for append datasets
  handler: DatasetHandler;
  action: "replace" | "append";
  callback: (value: object) => void;
};

class ArchiveDatasetManager {
  public watches = new Map<string, Watch>();

  constructor() {
    ALL_LOGS.forEach((log) => {
      log.subscribe(() => {
        this.updateWatches();
      });
    });
  }

  updateWatches() {
    // For two reasons, it's easier to just recompute everything from scratch.
    // First, this makes us more impervious to data resets and loads (although
    // downstream will still struggle). Second, our localStorage usage doesn't
    // allow for incremental updates to the underlying log anyway.
    const log = fetchActivityLog();
    const teamLog = fetchTeamRegistrationLog();
    const puzzleLog = fetchPuzzleStateLog();

    const tsi = log.reduce(
      (acc, entry) => acc.reduce(entry),
      new TeamStateIntermediate(HUNT),
    );
    const teamHuntState = formatTeamHuntState(HUNT, tsi);
    const tii = teamLog.reduce(
      (acc, entry) => acc.reduce(entry),
      new TeamInfoIntermediate(),
    );

    this.watches.forEach((w) => {
      let newValue: DatasetValue;
      switch (w.handler.type) {
        case "team_state":
          newValue = w.handler.callback(teamHuntState, {
            username: IMMUTABLE_TEAM_USERNAMES[0],
          });
          break;
        case "activity_log": {
          const cb = w.handler.callback;
          newValue = log.flatMap((entry) => {
            const apiEntry = formatActivityLogEntryForApi(entry);
            if (!apiEntry) {
              return [];
            }

            const formattedEntry = cb(apiEntry);
            if (!formattedEntry) {
              return [];
            }

            return [formattedEntry];
          });
          break;
        }
        case "activity_log_with_slug": {
          const { slug } = w.params ?? {};
          const cb = w.handler.callback;
          newValue = log.flatMap((entry) => {
            if (!("slug" in entry) || entry.slug !== slug) {
              return [];
            }

            const formattedEntry = cb(entry);
            if (!formattedEntry) {
              return [];
            }

            return [formattedEntry];
          });
          break;
        }
        case "team_registration": {
          newValue = w.handler.callback(tii);
          break;
        }
        case "puzzle_state_log": {
          const { slug } = w.params ?? {};
          newValue = puzzleLog.filter((e) => e.slug === slug);
          break;
        }
        default:
          console.error("Unhandled subscription type");
          return;
      }

      switch (w.action) {
        case "append": {
          const entries = newValue as ObjectWithId[];
          entries
            .filter((e) => e.id > w.highWaterMark)
            .forEach((e) => {
              w.callback(e);
            });
          w.highWaterMark = Math.max(
            w.highWaterMark,
            ...entries.map((e) => e.id),
          );
          break;
        }
        case "replace":
          w.callback(newValue);
          break;
      }
    });
  }

  watch(
    dataset: Dataset,
    params: DatasetParams,
    _initialValue: DatasetValue,
    onUpdate: (value: object) => void,
  ): () => void {
    const handler = DATASET_REGISTRY[dataset];
    const action = actionForDataset(dataset);

    const id = genId();

    const watch: Watch = {
      id,
      dataset,
      params,
      highWaterMark: -1,
      handler,
      action,
      callback: onUpdate,
    };

    this.watches.set(id, watch);
    this.updateWatches();
    return () => {
      this.watches.delete(id);
    };
  }
}

export default new ArchiveDatasetManager() satisfies DatasetManager;
