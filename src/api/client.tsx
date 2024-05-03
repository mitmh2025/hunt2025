import { initClient } from '@ts-rest/core';
import { contract } from './contract';

export function newClient(baseUrl: string, token: string) {
    let baseHeaders: Record<string, string> = {};
    if (token) {
        baseHeaders['Authorization'] = "bearer " + token;
    }
    return initClient(contract, {
        baseUrl: baseUrl + "/api",
        baseHeaders,
        // Uses `tsRestFetchApi` by default
    });
}
