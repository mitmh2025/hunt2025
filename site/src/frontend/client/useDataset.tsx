import { useEffect, useState } from "react";
import {
  type DatasetParams,
  type Dataset,
  type ObjectWithEpoch,
} from "../../../lib/api/websocket";
import globalDatasetManager from "@hunt_client/globalDatasetManager";

function useDataset<T extends ObjectWithEpoch>(
  dataset: Dataset,
  params: DatasetParams,
  initialValue: T,
): T {
  const [state, setState] = useState<T>(initialValue);
  useEffect(() => {
    const stop = globalDatasetManager.watch(
      dataset,
      params,
      state,
      (value: object) => {
        setState(value as T);
      },
    );
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We explicitly exclude `state` from the dependency set since we don't want to re-establish the watch on every update.
  }, [dataset, JSON.stringify(params)]);
  return state;
}

export default useDataset;
