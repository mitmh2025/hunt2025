import { initClient } from "@ts-rest/core";
import { frontendContract } from "./frontend_contract";

export function newFrontendClient(
  baseUrl: string,
  auth:
    | { type: "frontend"; frontendSecret: string }
    | { type: "admin"; adminToken: string },
) {
  const baseHeaders: Record<string, string> = {};

  if (auth.type === "frontend") {
    baseHeaders.Authorization = "frontend-auth " + auth.frontendSecret;
  } else {
    baseHeaders.Authorization = "bearer " + auth.adminToken;
  }

  return initClient(frontendContract, {
    baseUrl: baseUrl,
    baseHeaders,
    // Uses `tsRestFetchApi` by default
  });
}

export type FrontendClient = ReturnType<typeof newFrontendClient>;
