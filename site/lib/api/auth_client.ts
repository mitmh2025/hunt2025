import { initClient } from "@ts-rest/core";
import { authContract } from "./contract";

export function newAuthClient(baseUrl: string) {
  const baseHeaders: Record<string, string> = {};
  return initClient(authContract, {
    baseUrl,
    baseHeaders,
    // Uses `tsRestFetchApi` by default
  });
}

export type AuthClient = ReturnType<typeof newAuthClient>;
