import rootUrl from "../../../../src/frontend/utils/rootUrl";

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
  const response = await fetch(`${rootUrl}/puzzles/deepfrost/command`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ command, state }),
  });
  if (!response.ok) {
    throw new Error("An unexpected error occurred.");
  }

  const {
    message,
    haveKey,
    error,
    previousCommand,
    state: newState,
  } = (await response.json()) as {
    message: string;
    haveKey: boolean;
    error: string | undefined;
    previousCommand: string;
    state: unknown;
  };

  return { message, haveKey, error, previousCommand, state: newState };
}
