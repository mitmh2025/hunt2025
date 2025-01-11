const IDB_VERSION = 1;

import { type DBSchema, type IDBPDatabase, openDB, deleteDB } from "idb";
import { type FrontendClient } from "../../lib/api/frontend_client";
import {
  type InternalActivityLogEntry,
  type TeamRegistrationLogEntry,
} from "../../lib/api/frontend_contract";

type HuntOpsDB = {
  registrationLog: {
    value: TeamRegistrationLogEntry;
    key: number;
  };
  activityLog: {
    value: InternalActivityLogEntry;
    key: number;
  };
} & DBSchema;

const REFRESH_INTERVAL = 15000;
export const IDB_NAME = "hunt2025_ops";

function formatEntry<T extends { timestamp: string | Date }>(
  entry: T,
): T & { timestamp: Date } {
  return {
    ...entry,
    timestamp: new Date(entry.timestamp),
  };
}

export class OpsDataLoader {
  private _registrationHighWaterMark = 0;
  private _activityHighWaterMark = 0;
  private frontendClient: FrontendClient;

  constructor(frontendClient: FrontendClient) {
    this.frontendClient = frontendClient;
  }

  async getNewRegistrationLogEntries({ forceRequest = false } = {}): Promise<
    TeamRegistrationLogEntry[]
  > {
    // load from indexeddb
    const db = await this.getDB();
    let dbNewRecords = await db.getAll(
      "registrationLog",
      IDBKeyRange.lowerBound(this._registrationHighWaterMark, true),
    );

    dbNewRecords = dbNewRecords.slice().sort((a, b) => a.id - b.id);
    if (dbNewRecords.length > 0) {
      console.log(
        "Got new registration log entries from indexeddb",
        dbNewRecords,
      );
    }

    this._registrationHighWaterMark =
      dbNewRecords[dbNewRecords.length - 1]?.id ??
      this._registrationHighWaterMark;

    const lastLoadTimeStr = localStorage.getItem("lastRegistrationLoadTime");
    const lastLoadTimeEpoch = lastLoadTimeStr
      ? parseInt(lastLoadTimeStr, 10)
      : 0;

    let serverNewRecords: TeamRegistrationLogEntry[] = [];
    if (forceRequest || Date.now() - lastLoadTimeEpoch > REFRESH_INTERVAL) {
      localStorage.setItem("lastRegistrationLoadTime", Date.now().toString());

      // fetch from server
      const serverResponse =
        await this.frontendClient.getFullTeamRegistrationLog({
          query: {
            since: this._registrationHighWaterMark,
          },
        });

      if (serverResponse.status === 200) {
        serverNewRecords = serverResponse.body.map(formatEntry);
        if (serverNewRecords.length > 0) {
          console.log(
            "Got new registration log entries from server",
            serverNewRecords,
          );
        }

        // Add to indexeddb
        const tx = db.transaction("registrationLog", "readwrite");
        for (const entry of serverNewRecords) {
          await tx.store.put(entry);
        }

        await tx.done;
      }
    }

    return [...dbNewRecords, ...serverNewRecords];
  }

  async getNewActivityLogEntries({ forceRequest = false } = {}): Promise<
    InternalActivityLogEntry[]
  > {
    // load from indexeddb
    const db = await this.getDB();
    let dbNewRecords = await db.getAll(
      "activityLog",
      IDBKeyRange.lowerBound(this._activityHighWaterMark, true),
    );

    dbNewRecords = dbNewRecords.slice().sort((a, b) => a.id - b.id);
    if (dbNewRecords.length > 0) {
      console.log("Got new activity log entries from indexeddb", dbNewRecords);
    }

    this._activityHighWaterMark =
      dbNewRecords[dbNewRecords.length - 1]?.id ?? this._activityHighWaterMark;

    const lastLoadTimeStr = localStorage.getItem("lastactivityLoadTime");
    const lastLoadTimeEpoch = lastLoadTimeStr
      ? parseInt(lastLoadTimeStr, 10)
      : 0;

    let serverNewRecords: InternalActivityLogEntry[] = [];
    if (forceRequest || Date.now() - lastLoadTimeEpoch > REFRESH_INTERVAL) {
      localStorage.setItem("lastactivityLoadTime", Date.now().toString());

      // fetch from server
      const serverResponse = await this.frontendClient.getFullActivityLog({
        query: {
          since: this._activityHighWaterMark,
        },
      });

      if (serverResponse.status === 200) {
        serverNewRecords = serverResponse.body.map(formatEntry);
        if (serverNewRecords.length > 0) {
          console.log(
            "Got new activity log entries from server",
            serverNewRecords,
          );
        }

        // Add to indexeddb
        const tx = db.transaction("activityLog", "readwrite");
        for (const entry of serverNewRecords) {
          await tx.store.put(entry);
        }

        await tx.done;

        this._activityHighWaterMark =
          serverNewRecords[serverNewRecords.length - 1]?.id ??
          this._activityHighWaterMark;
      }
    }

    return [...dbNewRecords, ...serverNewRecords];
  }

  async getDB(): Promise<IDBPDatabase<HuntOpsDB>> {
    const db = await openDB<HuntOpsDB>(IDB_NAME, IDB_VERSION, {
      upgrade(db, oldVersion, newVersion) {
        console.log(`DB Version change: ${oldVersion} -> ${newVersion}`);

        if (db.objectStoreNames.contains("registrationLog")) {
          db.deleteObjectStore("registrationLog");
        }

        if (db.objectStoreNames.contains("activityLog")) {
          db.deleteObjectStore("activityLog");
        }

        db.createObjectStore("registrationLog", { keyPath: "id" });
        db.createObjectStore("activityLog", { keyPath: "id" });
      },
    });

    return db;
  }

  static async dropDB() {
    await deleteDB(IDB_NAME);
  }
}
