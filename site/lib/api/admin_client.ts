import { initClient } from "@ts-rest/core";
import { adminContract } from "./admin_contract";

export function newAdminClient(baseUrl: string, token: string) {
  const baseHeaders: Record<string, string> = {};
  baseHeaders.Authorization = "bearer " + token;

  return initClient(adminContract, {
    baseUrl,
    baseHeaders,
    // Uses `tsRestFetchApi` by default
  });
}

export type AdminClient = ReturnType<typeof newAdminClient>;
