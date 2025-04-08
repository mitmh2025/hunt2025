import rootUrl from "../../../../src/frontend/utils/rootUrl";

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
  const resp = await fetch(`${rootUrl}/puzzles/chatgpt/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      message,
      state,
    }),
  });
  if (!resp.ok) {
    throw new Error("An unexpected error occurred");
  }

  const {
    message: response,
    success,
    state: newState,
  } = (await resp.json()) as {
    message: string;
    success: boolean;
    state: string;
  };

  return { response, success, state: newState };
}
