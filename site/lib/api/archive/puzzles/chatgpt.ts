import { processChat } from "../../../../src/frontend/puzzles/giving-fighter/logic";

export async function chat({
  message,
  state,
}: {
  message: string;
  state: unknown;
}): Promise<{
  response: string;
  success: boolean;
  state: unknown;
}> {
  const { response, success, counter } = await processChat({
    message,
    counter: (state as number | undefined) ?? 0,
  });
  return { response, success, state: counter };
}
