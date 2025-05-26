import { useEffect, useState } from "react";
import {
  type DatasetParams,
  type Dataset,
  type ObjectWithEpoch,
} from "../../../lib/api/websocket";
import archiveMode from "../utils/archiveMode";
import clientIsBot from "../utils/clientIsBot";
import globalDatasetManager from "@hunt_client/globalDatasetManager";

function useDataset<T extends ObjectWithEpoch>(
  dataset: Dataset,
  params: DatasetParams,
  initialValue: T,
): T {
  // When the site is running in production mode, it's important to use the
  // initialValue provided by the server so that hydration of the
  // server-rendered content works correctly.
  //
  // In archive mode (with our client-side unlock implementation)), the
  // initialValue is a simulated end-of-hunt state, and we don't want to see
  // that content, but the archive implementation of globalDatasetManager will
  // replace the dataset with a locally-rendered one quickly enough that we
  // don't have to worry about flashes of content. (And continuing to pass in
  // the server-rendered `initialValue` means that we don't have to think too
  // hard about how to make TypeScript happy)
  //
  // However, in the specific case where we (a) are in archive mode (b) think
  // the client is a bot, disable live updates. We want the client to see a
  // static render of end-of-hunt state (including puzzle lists, etc.) so that
  // that's what ends up in (e.g.) search indexes.

  const [state, setState] = useState<T>(initialValue);
  useEffect(() => {
    if (archiveMode && clientIsBot) {
      return;
    }

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
