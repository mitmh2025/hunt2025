import {
  processCommand,
  internalizeState,
} from "../../../../src/frontend/puzzles/wiry-ray/logic";

// eslint-disable-next-line @typescript-eslint/require-await -- this function must be declared async for the API
export async function sendCommand({
  command,
  state,
}: {
  command: string;
  state: unknown;
}): Promise<{
  message: string;
  haveKey: boolean;
  error?: string;
  previousCommand: string;
  state: unknown;
}> {
  const parsed = internalizeState({ state, command });
  if (!parsed.valid) {
    throw new Error("Invalid request");
  }

  const { state: startState } = parsed;

  return processCommand({
    startState,
    command,
  });
}
