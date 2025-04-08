import rootUrl from "../../../../src/frontend/utils/rootUrl";

export async function speak(): Promise<void> {
  const response = await fetch(
    `${rootUrl}/puzzles/what_do_they_call_you/speak`,
    {
      method: "POST",
      body: "{}",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  if (!response.ok) {
    console.log("got error, code", response.status, response.body);
    throw new Error(`Error: ${response.status}`);
  }
}
