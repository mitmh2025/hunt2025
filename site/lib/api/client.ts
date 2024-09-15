import { initClient, type ClientInferResponseBody } from "@ts-rest/core";
import { publicContract } from "./contract";

export function newClient(baseUrl: string, token?: string) {
  const baseHeaders: Record<string, string> = {};
  if (token) {
    baseHeaders.Authorization = "bearer " + token;
  }
  return initClient(publicContract, {
    baseUrl: baseUrl,
    baseHeaders,
    // Uses `tsRestFetchApi` by default
  });
}

export type TeamState = ClientInferResponseBody<
  typeof publicContract.getMyTeamState,
  200
>;

export type ActivityLogEntry = ClientInferResponseBody<
  typeof publicContract.getActivityLog,
  200
>[number];

export type Client = ReturnType<typeof newClient>;
