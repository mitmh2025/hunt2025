import { initClient } from "@ts-rest/core";
import { authContract } from "./contract";
import authApi from "@hunt_client/auth_api";

export function newAuthClient(baseUrl: string, token?: string) {
  const baseHeaders: Record<string, string> = {};
  if (token) {
    baseHeaders.Authorization = "bearer " + token;
  }

  return initClient(authContract, {
    baseUrl,
    baseHeaders,
    api: authApi,
  });
}

export type AuthClient = ReturnType<typeof newAuthClient>;
