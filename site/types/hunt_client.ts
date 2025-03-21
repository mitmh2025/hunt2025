declare module "@hunt_client/public_api" {
  import { type ApiFetcher } from "@ts-rest/core";
  const clientApi: ApiFetcher;
  export default clientApi;
}

declare module "@hunt_client/auth_api" {
  import { type ApiFetcher } from "@ts-rest/core";
  const authApi: ApiFetcher;
  export default authApi;
}

declare module "@hunt_client/globalDatasetManager" {
  import type { Dataset, DatasetParams, DatasetValue } from "lib/api/websocket";

  class GlobalDatasetManager {
    watch(
      dataset: Dataset,
      params: DatasetParams,
      initialValue: DatasetValue,
      callback: (value: object) => void,
    ): () => void;
  }
  const globalDatasetManager: GlobalDatasetManager;
  export default globalDatasetManager;
}

declare module "@hunt_client/interactions" {
  export function completeInteraction(
    slug: string,
    result: string,
  ): Promise<void>;
}
