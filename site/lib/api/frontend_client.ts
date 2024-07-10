import { initClient } from "@ts-rest/core";
import { frontendContract } from "./frontend_contract";

export function newFrontendClient(baseUrl: string, secret: string) {
  const baseHeaders: Record<string, string> = {};
  baseHeaders.Authorization = "frontend-auth " + secret;
  return initClient(frontendContract, {
    baseUrl: baseUrl,
    baseHeaders,
    // Uses `tsRestFetchApi` by default
  });
}

export type FrontendClient = ReturnType<typeof newFrontendClient>;
