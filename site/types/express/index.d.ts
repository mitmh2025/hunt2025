import type { Client, TeamState } from "../../lib/api/client";
export {};

declare global {
  namespace Express {
    export interface Request {
      api: Client;
      teamState?: TeamState;
    }
  }
}
