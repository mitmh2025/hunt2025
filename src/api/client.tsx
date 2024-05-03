import { initClient } from "@ts-rest/core";
import { contract } from "./contract";
import { ClientInferResponseBody } from "@ts-rest/core";

export function newClient(baseUrl: string, token: string) {
  let baseHeaders: Record<string, string> = {};
  if (token) {
    baseHeaders["Authorization"] = "bearer " + token;
  }
  return initClient(contract, {
    baseUrl: baseUrl + "/api",
    baseHeaders,
    // Uses `tsRestFetchApi` by default
  });
}

export type TeamState = ClientInferResponseBody<typeof contract.public.getMyTeamState, 200>;

export type Client = ReturnType<typeof newClient>;
