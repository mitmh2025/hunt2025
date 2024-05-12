import type { Client, TeamState } from "../../src/api/client";
export {};

declare global {
  namespace Express {
    export interface Request {
      api: Client;
      teamState?: TeamState;
    }
  }
}
