import type { AuthClient } from "../../lib/api/auth_client";
import type { Client, TeamState } from "../../lib/api/client";
import type { TeamRegistration } from "../../lib/api/contract";
import type { FrontendClient } from "../../lib/api/frontend_client";
export {};

declare global {
  namespace Express {
    export interface AuthInfo {
      teamJwt?: string;
      adminUser?: string;
      permissionAdmin?: boolean;
      permissionOps?: boolean;
    }
    export interface Request {
      api: Client;
      authApi: AuthClient;
      frontendApi: FrontendClient;
      teamState?: TeamState;
      teamRegistration?: TeamRegistration;
    }
  }
}
