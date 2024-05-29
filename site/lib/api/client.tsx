import { initClient, type ClientInferResponseBody } from "@ts-rest/core";
import { contract } from "./contract";

export function newClient(baseUrl: string, token?: string) {
  const baseHeaders: Record<string, string> = {};
  if (token) {
    baseHeaders.Authorization = "bearer " + token;
  }
  return initClient(contract, {
    baseUrl: baseUrl + "/api",
    baseHeaders,
    // Uses `tsRestFetchApi` by default
  });
}

export type TeamState = ClientInferResponseBody<
  typeof contract.public.getMyTeamState,
  200
>;

export type PuzzleState = ClientInferResponseBody<
  typeof contract.public.getPuzzleState,
  200
>;

export type Client = ReturnType<typeof newClient>;
