import { initClient } from "@ts-rest/core";
import { frontendContract } from "./frontend_contract";

export function newFrontendClient(baseUrl: string, secret: string | undefined) {
  const baseHeaders: Record<string, string> = {};

  if (secret) {
    baseHeaders.Authorization = "frontend-auth " + secret;
  }

  return initClient(frontendContract, {
    baseUrl: baseUrl,
    baseHeaders,
    // Uses `tsRestFetchApi` by default
  });
}

export type FrontendClient = ReturnType<typeof newFrontendClient>;
