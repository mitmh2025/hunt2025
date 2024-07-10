import type { AuthClient } from "../../lib/api/auth_client";
import type { Client, TeamState } from "../../lib/api/client";
export {};

declare global {
  namespace Express {
    export interface AuthInfo {
      adminUser?: string;
    }
    export interface Request {
      api: Client;
      authApi: AuthClient;
      teamState?: TeamState;
    }
  }
}
