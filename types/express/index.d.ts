import type { Client } from "../../src/api/client";
export {};

declare global {
  namespace Express {
    export interface Request {
      api: Client;
    }
  }
}
