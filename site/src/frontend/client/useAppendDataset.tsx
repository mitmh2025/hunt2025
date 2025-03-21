import { useState, useEffect } from "react";
import {
  type DatasetParams,
  type Dataset,
  type ObjectWithId,
} from "../../../lib/api/websocket";
import archiveMode from "../utils/archiveMode";
import globalDatasetManager from "@hunt_client/globalDatasetManager";

function useAppendDataset<T extends ObjectWithId>(
  dataset: Dataset,
  params: DatasetParams,
  initialValue: T[],
): T[] {
  const [state, setState] = useState<T[]>(() =>
    archiveMode ? [] : [...initialValue],
  );
  useEffect(() => {
    const stop = globalDatasetManager.watch(
      dataset,
      params,
      state,
      (value: object) => {
        setState((prevState: T[]) => {
          // Append if not already known
          if (
            prevState.findIndex((entry) => entry.id === (value as T).id) === -1
          ) {
            const newState = [...prevState, value as T];
            console.log("log is now", newState);
            return newState;
          } else {
            return prevState;
          }
        });
      },
    );
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We explicitly exclude `state` from the dependency set since we don't want to re-establish the watch on every update.
  }, [dataset, JSON.stringify(params)]);
  return state;
}

export default useAppendDataset;
